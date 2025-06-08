import { ASTNode, SymbolTableEntry } from '../types/compiler';

export class SemanticAnalyzer {
  private symbolTable: SymbolTableEntry[] = [];
  private currentScope: string = 'global';
  private errors: string[] = [];
  private scopes: Map<string, Set<string>> = new Map(); // Track variables per scope
  private variableUsage: Map<string, { declared: number; used: boolean; initialized: boolean }> = new Map();

  analyze(ast: ASTNode): { symbolTable: SymbolTableEntry[]; errors: string[] } {
    this.symbolTable = [];
    this.errors = [];
    this.scopes.clear();
    this.variableUsage.clear();
    this.scopes.set('global', new Set());
    
    this.analyzeNode(ast);
    this.checkUnusedVariables();
    return { symbolTable: this.symbolTable, errors: this.errors };
  }

  private analyzeNode(node: ASTNode): void {
    switch (node.type) {
      case 'Program':
        node.children?.forEach(child => this.analyzeNode(child));
        break;
        
      case 'Declaration':
        this.handleDeclaration(node);
        break;
        
      case 'Assignment':
        this.handleAssignment(node);
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
        
      case 'BinaryExpression':
        this.handleBinaryExpression(node);
        break;
        
      case 'Identifier':
        this.handleIdentifierUsage(node);
        break;
        
      default:
        node.children?.forEach(child => this.analyzeNode(child));
    }
  }

  private enterScope(scopeType: string): void {
    const newScope = `${this.currentScope}_${scopeType}_${Date.now()}`;
    this.currentScope = newScope;
    this.scopes.set(newScope, new Set());
  }

  private exitScope(): void {
    // Return to parent scope (simplified - in real implementation would use scope stack)
    this.currentScope = 'global';
  }

  private handleDeclaration(node: ASTNode): void {
    const type = node.value;
    const identifier = node.children?.[0];
    
    if (identifier && identifier.type === 'Identifier') {
      const name = identifier.value!;
      const line = identifier.position?.line || 0;
      
      // Check for redeclaration in current scope
      const currentScopeVars = this.scopes.get(this.currentScope);
      if (currentScopeVars?.has(name)) {
        this.errors.push(`Line ${line}: Variable '${name}' already declared in current scope`);
        return;
      }
      
      // Check for shadowing (variable with same name in outer scope)
      const existingGlobal = this.symbolTable.find(entry => entry.name === name && entry.scope === 'global');
      if (existingGlobal && this.currentScope !== 'global') {
        this.errors.push(`Line ${line}: Variable '${name}' shadows variable declared at line ${existingGlobal.line}`);
      }
      
      // Add to current scope
      currentScopeVars?.add(name);
      
      // Check if variable is initialized
      const isInitialized = node.children && node.children.length > 1;
      
      this.symbolTable.push({
        name,
        type: type!,
        scope: this.currentScope,
        line,
        value: isInitialized ? node.children?.[1]?.value : undefined
      });
      
      this.variableUsage.set(name, {
        declared: line,
        used: false,
        initialized: isInitialized
      });
      
      // Analyze initialization expression if present
      if (isInitialized && node.children?.[1]) {
        this.analyzeNode(node.children[1]);
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
    
    // Check if variable is declared
    const symbol = this.findSymbolInScope(name);
    if (!symbol) {
      this.errors.push(`Line ${line}: Undefined variable '${name}'`);
      return;
    }
    
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

  private handleBinaryExpression(node: ASTNode): void {
    // Analyze operands first
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
    // Look for symbol starting from current scope, then global
    return this.symbolTable.find(entry => 
      entry.name === name && 
      (entry.scope === this.currentScope || entry.scope === 'global')
    );
  }

  private checkUnusedVariables(): void {
    this.variableUsage.forEach((usage, name) => {
      if (!usage.used) {
        this.errors.push(`Line ${usage.declared}: Variable '${name}' declared but never used`);
      }
    });
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
    // Exact match
    if (type1 === type2) return true;
    
    // Numeric compatibility
    const numericTypes = ['int', 'float', 'double'];
    if (numericTypes.includes(type1) && numericTypes.includes(type2)) return true;
    
    // Character and integer compatibility
    if ((type1 === 'char' && type2 === 'int') || (type1 === 'int' && type2 === 'char')) return true;
    
    return false;
  }

  private areTypesCompatibleForOperation(type1: string, type2: string, operator: string): boolean {
    // Arithmetic operations
    if (['+', '-', '*', '/', '%'].includes(operator)) {
      const numericTypes = ['int', 'float', 'double', 'char'];
      return numericTypes.includes(type1) && numericTypes.includes(type2);
    }
    
    // Comparison operations
    if (['==', '!=', '<', '>', '<=', '>='].includes(operator)) {
      return this.isCompatible(type1, type2);
    }
    
    // Logical operations
    if (['&&', '||'].includes(operator)) {
      // In C, any non-zero value is true, so most types work
      return true;
    }
    
    return false;
  }
}