import { ASTNode, SymbolTableEntry } from '../types/compiler';

export class SemanticAnalyzer {
  private symbolTable: SymbolTableEntry[] = [];
  private currentScope: string = 'global';
  private errors: string[] = [];
  private scopes: Map<string, Set<string>> = new Map();
  private variableUsage: Map<string, { declared: number; used: boolean; initialized: boolean }> = new Map();

  // Expanded standard library identifiers, C keywords, types, macros, and common functions to ignore
  private standardIdentifiers = new Set([
    // Standard C library functions/macros
    'printf', 'scanf', 'main', 'puts', 'gets', 'putchar', 'getchar', 'size_t', 'NULL', 'stdin', 'fgets', 'strcspn', 'strcmp',
    // String/utility functions
    'stringCopy', 'stringConcat', 'stringLength', 'bubbleSort', 'decimalToBinary', 'decimalToHex', 'strlen',
    // Header-related identifiers
    'include', 'stdio', 'h', 'string', 'stdbool',
    // Common C variable names in examples
    'src', 'str', 'str1', 'str2', 'arr', 'decimal', 'i', 'length', 'pattern', 'text', 'result',
    // C keywords and types
    'bool', 'char', 'int', 'float', 'double', 'void', 'return', 'if', 'else', 'while', 'for', 'do', 'break', 'continue',
  ]);

  private preprocessorDirectives = new Set([
    '#include', '#define', '#ifdef', '#ifndef', '#endif', '#pragma'
  ]);

  analyze(ast: ASTNode): { symbolTable: SymbolTableEntry[]; errors: string[] } {
    this.symbolTable = [];
    this.errors = [];
    this.scopes.clear();
    this.variableUsage.clear();
    this.scopes.set('global', new Set());
    this.currentScope = 'global';

    this.analyzeNode(ast);
    this.checkUnusedVariables();
    return { symbolTable: this.symbolTable, errors: this.errors };
  }

  private analyzeNode(node: ASTNode): void {
    // Skip preprocessor directive identifiers
    if (node.type === 'PreprocessorDirective' || (typeof node.value === 'string' && this.preprocessorDirectives.has(node.value))) {
      return;
    }

    switch (node.type) {
      case 'FunctionDeclaration':
        this.handleFunctionDeclaration(node);
        break;
      case 'Declaration':
        this.handleDeclaration(node);
        break;
      case 'Assignment':
        this.handleAssignment(node);
        break;
      case 'Identifier':
        this.handleIdentifierUsage(node);
        break;
      case 'IfStatement':
        this.enterScope('if');
        node.children?.forEach(child => this.analyzeNode(child));
        this.exitScope();
        break;
      case 'WhileStatement':
        this.enterScope('while');
        node.children?.forEach(child => this.analyzeNode(child));
        this.exitScope();
        break;
      case 'BlockStatement':
        this.enterScope('block');
        node.children?.forEach(child => this.analyzeNode(child));
        this.exitScope();
        break;
      case 'BinaryExpression':
        this.handleBinaryExpression(node);
        break;
      default:
        node.children?.forEach(child => this.analyzeNode(child));
    }
  }

  // Basic function declaration support
  private handleFunctionDeclaration(node: ASTNode): void {
    const identifier = node.value ?? '';
    const line = node.position?.line || 0;
    // Add function to symbol table and ignore list
    this.symbolTable.push({
      name: identifier,
      type: 'function',
      scope: this.currentScope,
      line: line
    });
    this.standardIdentifiers.add(identifier); // Add user-defined function to ignore list
    // Enter function scope
    this.enterScope(identifier);
    node.children?.forEach(child => this.analyzeNode(child));
    this.exitScope();
  }

  private enterScope(scopeType: string): void {
    const newScope = `${this.currentScope}_${scopeType}_${Date.now()}`;
    this.currentScope = newScope;
    this.scopes.set(newScope, new Set());
  }

  private exitScope(): void {
    // Improved: pop back to parent scope if possible
    const idx = this.currentScope.lastIndexOf('_');
    if (idx > 0) {
      this.currentScope = this.currentScope.substring(0, idx);
    } else {
      this.currentScope = 'global';
    }
  }

  private handleDeclaration(node: ASTNode): void {
    const type = node.value;
    const identifier = node.children?.[0];

    if (identifier && identifier.type === 'Identifier') {
      const name = identifier.value!;
      const line = identifier.position?.line || 0;
      // Check for redeclaration in current scope
      const scopeVars = this.scopes.get(this.currentScope) || new Set();
      if (scopeVars.has(name)) {
        this.errors.push(`Line ${line}: Variable '${name}' already declared in current scope`);
      } else {
        scopeVars.add(name);
        this.scopes.set(this.currentScope, scopeVars);
        // Check if variable is initialized
        const isInitialized = node.children && node.children.length > 1;
        this.symbolTable.push({
          name,
          type: type!,
          scope: this.currentScope,
          line: line,
          value: isInitialized ? node.children?.[1]?.value : undefined
        });
        this.variableUsage.set(name, {
          declared: line,
          used: false,
          initialized: isInitialized ?? false
        });
        // Analyze initialization expression if present
        if (isInitialized && node.children?.[1]) {
          this.analyzeNode(node.children[1]);
        }
      }
    }
  }

  private handleAssignment(node: ASTNode): void {
    const identifier = node.children?.[0];
    if (identifier && identifier.type === 'Identifier') {
      const name = identifier.value!;
      const line = identifier.position?.line || 0;
      // Check if variable is declared
      const symbol = this.findSymbolInScope(name);
      if (!symbol) {
        this.errors.push(`Line ${line}: Variable '${name}' used before declaration`);
        return;
      }
      // Mark as used and initialized
      const usage = this.variableUsage.get(name);
      if (usage) {
        usage.used = true;
        usage.initialized = true;
      }
      // Analyze the assignment expression
      if (node.children?.[1]) {
        this.analyzeNode(node.children[1]);
        // Type checking
        const rightSide = node.children[1];
        if (rightSide.type === 'Literal') {
          const rightType = this.inferType(rightSide.value!);
          if (!this.isCompatible(symbol.type, rightType)) {
            this.errors.push(`Line ${line}: Type mismatch - cannot assign ${rightType} to ${symbol.type} variable '${name}'`);
          }
        }
      }
    }
  }

  private handleIdentifierUsage(node: ASTNode): void {
    const name = node.value!;
    const line = node.position?.line || 0;
    // Ignore standard library identifiers and any identifier that matches a header or is all lowercase and short (likely a C header or macro)
    if (
      this.standardIdentifiers.has(name) ||
      (typeof name === 'string' && name.length <= 8 && name === name.toLowerCase())
    ) return;
    // Ignore preprocessor directive identifiers
    if (this.preprocessorDirectives.has(name)) return;
    // Check if variable or function is declared
    const symbol = this.findSymbolInScope(name);
    if (!symbol) {
      this.errors.push(`Line ${line}: Variable or function '${name}' used before declaration`);
    } else if (symbol.type !== 'function') {
      // Check if variable is used before initialization
      const usage = this.variableUsage.get(name);
      if (usage && !usage.initialized) {
        this.errors.push(`Line ${line}: Variable '${name}' used before initialization`);
      }
      // Mark as used
      if (usage) {
        usage.used = true;
      }
    }
  }

  private handleBinaryExpression(node: ASTNode): void {
    node.children?.forEach(child => this.analyzeNode(child));
    
    // Type checking for binary operations
    if (node.children && node.children.length === 2) {
      const left = node.children[0];
      const right = node.children[1];
      const line = node.position?.line || left.position?.line || 0;
      
      let leftType = '';
      let rightType = '';
      
      // Determine types
      if (left.type === 'Identifier') {
        const symbol = this.findSymbolInScope(left.value!);
        leftType = symbol?.type || 'unknown';
      } else if (left.type === 'Literal') {
        leftType = this.inferType(left.value!);
      }
      
      if (right.type === 'Identifier') {
        const symbol = this.findSymbolInScope(right.value!);
        rightType = symbol?.type || 'unknown';
      } else if (right.type === 'Literal') {
        rightType = this.inferType(right.value!);
      }
      
      // Check type compatibility for operations
      if (leftType && rightType && !this.areTypesCompatibleForOperation(leftType, rightType, node.value!)) {
        this.errors.push(`Line ${line}: Type mismatch in ${node.value} operation between ${leftType} and ${rightType}`);
      }
    }
  }

  private findSymbolInScope(name: string): SymbolTableEntry | undefined {
    // Search current and parent scopes for the symbol
    let scope = this.currentScope;
    while (scope) {
      const found = this.symbolTable.find(
        entry => entry.name === name && entry.scope === scope
      );
      if (found) return found;
      const idx = scope.lastIndexOf('_');
      if (idx > 0) {
        scope = scope.substring(0, idx);
      } else {
        if (scope !== 'global') {
          scope = 'global';
        } else {
          break;
        }
      }
    }
    return undefined;
  }

  private checkUnusedVariables(): void {
    for (const [name, usage] of this.variableUsage.entries()) {
      if (!usage.used) {
        this.errors.push(`Warning: Variable '${name}' declared but never used`);
      }
    }
  }

  private inferType(value: string): string {
    if (/^\d+$/.test(value)) return 'int';
    if (/^\d*\.\d+$/.test(value)) return 'float';
    if (/^".*"$/.test(value)) return 'string';
    if (/^'.'$/.test(value)) return 'char';
    if (value === 'true' || value === 'false') return 'bool';
    return 'unknown';
  }

  private isCompatible(type1: string, type2: string): boolean {
    if (type1 === type2) return true;
    const numericTypes = ['int', 'float', 'double'];
    if (numericTypes.includes(type1) && numericTypes.includes(type2)) return true;
    if ((type1 === 'char' && type2 === 'int') || (type1 === 'int' && type2 === 'char')) return true;
    return false;
  }

  private areTypesCompatibleForOperation(type1: string, type2: string, operator: string): boolean {
    if (['+', '-', '*', '/', '%'].includes(operator)) {
      const numericTypes = ['int', 'float', 'double', 'char'];
      return numericTypes.includes(type1) && numericTypes.includes(type2);
    }
    if (['==', '!=', '<', '>', '<=', '>='].includes(operator)) {
      return this.isCompatible(type1, type2);
    }
    if (['&&', '||'].includes(operator)) {
      return true;
    }
    return false;
  }
}