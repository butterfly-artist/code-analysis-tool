import { AnalysisResult, SyntaxIssue, LogicalAnalysis, CodeQuality, Suggestion, ControlFlowAnalysis, DataFlowAnalysis, ComplexityMetrics, BranchInfo, LoopInfo, VariableLifetime, CodeLocation } from '../types/analyzer';
import { Token } from '../types/compiler';

export class CodeAnalyzer {
  private code: string;
  private lines: string[];
  private tokens: Token[];

  constructor(code: string, tokens: Token[]) {
    this.code = code;
    this.lines = code.split('\n');
    this.tokens = tokens;
  }

  analyze(): AnalysisResult {
    const syntaxIssues = this.analyzeSyntax();
    const logicalAnalysis = this.analyzeLogic();
    const codeQuality = this.analyzeQuality();
    const suggestions = this.generateSuggestions();
    const explanation = this.generateExplanation();

    return {
      syntaxIssues,
      logicalAnalysis,
      codeQuality,
      suggestions,
      explanation
    };
  }

  private analyzeSyntax(): SyntaxIssue[] {
    const issues: SyntaxIssue[] = [];
    const declaredVariables = new Map<string, { line: number; type: string; initialized: boolean }>();
    const usedVariables = new Set<string>();
    
    // First pass: collect variable declarations
    this.lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmedLine = line.trim();
      
      // Variable declarations
      const varDeclaration = line.match(/(?:int|float|char|double)\s+(\w+)(?:\s*=\s*(.+?))?(?:\s*;|$)/);
      if (varDeclaration) {
        const varName = varDeclaration[1];
        const isInitialized = !!varDeclaration[2];
        const typeMatch = line.match(/(int|float|char|double)/);
        const varType = typeMatch ? typeMatch[1] : 'unknown';
        
        // Check for redeclaration
        if (declaredVariables.has(varName)) {
          const prevDecl = declaredVariables.get(varName)!;
          issues.push({
            line: lineNum,
            column: line.indexOf(varName) + 1,
            severity: 'error',
            message: `Variable '${varName}' redeclared (previously declared at line ${prevDecl.line})`,
            type: 'redeclaration'
          });
        } else {
          declaredVariables.set(varName, { line: lineNum, type: varType, initialized: isInitialized });
        }
      }
      
      // Variable usage
      const identifiers = line.match(/\b[a-zA-Z_]\w*\b/g);
      if (identifiers) {
        identifiers.forEach(identifier => {
          // Skip keywords and function names
          if (!['int', 'float', 'char', 'double', 'if', 'else', 'while', 'for', 'return', 'main'].includes(identifier)) {
            usedVariables.add(identifier);
          }
        });
      }
    });
    
    // Second pass: check for semantic issues
    this.lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmedLine = line.trim();
      
      // Check for undefined variables
      const identifiers = line.match(/\b[a-zA-Z_]\w*\b/g);
      if (identifiers) {
        identifiers.forEach(identifier => {
          if (!['int', 'float', 'char', 'double', 'if', 'else', 'while', 'for', 'return', 'main'].includes(identifier) &&
              !declaredVariables.has(identifier)) {
            issues.push({
              line: lineNum,
              column: line.indexOf(identifier) + 1,
              severity: 'error',
              message: `Undefined variable '${identifier}'`,
              type: 'undefined'
            });
          }
        });
      }
      
      // Check for uninitialized variable usage
      const assignment = line.match(/(\w+)\s*=\s*(.+)/);
      if (assignment) {
        const rightSide = assignment[2];
        const usedVars = rightSide.match(/\b[a-zA-Z_]\w*\b/g);
        if (usedVars) {
          usedVars.forEach(varName => {
            const varInfo = declaredVariables.get(varName);
            if (varInfo && !varInfo.initialized && !['int', 'float', 'char', 'double'].includes(varName)) {
              issues.push({
                line: lineNum,
                column: rightSide.indexOf(varName) + 1,
                severity: 'warning',
                message: `Variable '${varName}' used before initialization`,
                type: 'uninitialized'
              });
            }
          });
        }
      }
      
      // Type mismatch checking
      const varAssignment = line.match(/(\w+)\s*=\s*(.+?);/);
      if (varAssignment) {
        const varName = varAssignment[1];
        const value = varAssignment[2].trim();
        const varInfo = declaredVariables.get(varName);
        
        if (varInfo) {
          let valueType = 'unknown';
          if (/^\d+$/.test(value)) valueType = 'int';
          else if (/^\d*\.\d+$/.test(value)) valueType = 'float';
          else if (/^".*"$/.test(value)) valueType = 'string';
          else if (/^'.'$/.test(value)) valueType = 'char';
          
          if (valueType !== 'unknown' && varInfo.type !== valueType) {
            // Allow some implicit conversions
            const allowedConversions = [
              ['int', 'float'], ['float', 'int'], ['char', 'int'], ['int', 'char']
            ];
            const isAllowed = allowedConversions.some(([from, to]) => 
              (valueType === from && varInfo.type === to) || (valueType === to && varInfo.type === from)
            );
            
            if (!isAllowed) {
              issues.push({
                line: lineNum,
                column: line.indexOf(value) + 1,
                severity: 'warning',
                message: `Type mismatch: assigning ${valueType} to ${varInfo.type} variable '${varName}'`,
                type: 'type-mismatch'
              });
            }
          }
        }
      }
      
      // Missing semicolons
      if (trimmedLine && 
          !trimmedLine.endsWith(';') && 
          !trimmedLine.endsWith('{') && 
          !trimmedLine.endsWith('}') &&
          !trimmedLine.startsWith('#') &&
          !trimmedLine.startsWith('//') &&
          !trimmedLine.includes('if') &&
          !trimmedLine.includes('while') &&
          !trimmedLine.includes('for') &&
          !trimmedLine.includes('else') &&
          trimmedLine.length > 0) {
        issues.push({
          line: lineNum,
          column: line.length,
          severity: 'warning',
          message: 'Missing semicolon at end of statement',
          type: 'syntax'
        });
      }

      // Unmatched braces
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      if (openBraces !== closeBraces && (openBraces > 0 || closeBraces > 0)) {
        issues.push({
          line: lineNum,
          column: 1,
          severity: 'error',
          message: 'Unmatched braces detected',
          type: 'syntax'
        });
      }

      // Memory management issues
      if (line.includes('malloc') && !this.code.includes('free')) {
        issues.push({
          line: lineNum,
          column: line.indexOf('malloc') + 1,
          severity: 'warning',
          message: 'malloc() called but no corresponding free() found',
          type: 'memory'
        });
      }
    });
    
    // Check for unused variables
    declaredVariables.forEach((varInfo, varName) => {
      if (!usedVariables.has(varName)) {
        issues.push({
          line: varInfo.line,
          column: 1,
          severity: 'info',
          message: `Variable '${varName}' declared but never used`,
          type: 'unused'
        });
      }
    });

    return issues;
  }

  private analyzeLogic(): LogicalAnalysis {
    const controlFlow = this.analyzeControlFlow();
    const dataFlow = this.analyzeDataFlow();
    const complexity = this.calculateComplexity();

    return {
      controlFlow,
      dataFlow,
      complexity
    };
  }

  private analyzeControlFlow(): ControlFlowAnalysis {
    const branches: BranchInfo[] = [];
    const loops: LoopInfo[] = [];
    const unreachableCode: CodeLocation[] = [];
    const potentialInfiniteLoops: CodeLocation[] = [];

    this.lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmedLine = line.trim();

      // Analyze if statements
      if (trimmedLine.includes('if')) {
        const condition = this.extractCondition(trimmedLine, 'if');
        branches.push({
          line: lineNum,
          type: 'if',
          condition,
          alwaysTrue: this.isAlwaysTrue(condition),
          alwaysFalse: this.isAlwaysFalse(condition),
          edgeCases: this.findEdgeCases(condition)
        });
      }

      // Analyze loops
      if (trimmedLine.includes('while')) {
        const condition = this.extractCondition(trimmedLine, 'while');
        loops.push({
          line: lineNum,
          type: 'while',
          condition,
          potentialIssues: this.analyzeLoopIssues(condition, 'while')
        });
      }

      if (trimmedLine.includes('for')) {
        const condition = this.extractCondition(trimmedLine, 'for');
        loops.push({
          line: lineNum,
          type: 'for',
          condition,
          potentialIssues: this.analyzeLoopIssues(condition, 'for')
        });
      }

      // Check for unreachable code after return
      if (trimmedLine.includes('return') && index < this.lines.length - 1) {
        const nextLine = this.lines[index + 1].trim();
        if (nextLine && !nextLine.startsWith('}') && !nextLine.startsWith('//')) {
          unreachableCode.push({
            line: lineNum + 1,
            column: 1,
            description: 'Code after return statement is unreachable'
          });
        }
      }
    });

    return {
      branches,
      loops,
      unreachableCode,
      potentialInfiniteLoops
    };
  }

  private analyzeDataFlow(): DataFlowAnalysis {
    const uninitializedVariables: string[] = [];
    const unusedVariables: string[] = [];
    const variableLifetime: VariableLifetime[] = [];
    const memoryLeaks: CodeLocation[] = [];

    const variables = new Map<string, { declared: number; lastUsed: number; initialized: boolean }>();

    this.lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      // Track variable declarations
      const varDeclaration = line.match(/(?:int|float|char|double)\s+(\w+)/g);
      if (varDeclaration) {
        varDeclaration.forEach(decl => {
          const varName = decl.split(/\s+/)[1];
          const isInitialized = line.includes('=');
          variables.set(varName, {
            declared: lineNum,
            lastUsed: lineNum,
            initialized: isInitialized
          });
        });
      }

      // Track variable usage
      variables.forEach((info, varName) => {
        if (line.includes(varName) && !line.includes(`int ${varName}`) && !line.includes(`float ${varName}`)) {
          info.lastUsed = lineNum;
        }
      });

      // Check for memory leaks
      if (line.includes('malloc') || line.includes('calloc')) {
        const varMatch = line.match(/(\w+)\s*=.*(?:malloc|calloc)/);
        if (varMatch) {
          const varName = varMatch[1];
          if (!this.code.includes(`free(${varName})`)) {
            memoryLeaks.push({
              line: lineNum,
              column: line.indexOf(varName) + 1,
              description: `Memory allocated to '${varName}' is never freed`
            });
          }
        }
      }
    });

    // Analyze variable usage patterns
    variables.forEach((info, varName) => {
      if (!info.initialized && info.lastUsed > info.declared) {
        uninitializedVariables.push(varName);
      }
      
      if (info.lastUsed === info.declared) {
        unusedVariables.push(varName);
      }

      variableLifetime.push({
        name: varName,
        declared: info.declared,
        lastUsed: info.lastUsed,
        scope: 'local' // Simplified scope analysis
      });
    });

    return {
      uninitializedVariables,
      unusedVariables,
      variableLifetime,
      memoryLeaks
    };
  }

  private calculateComplexity(): ComplexityMetrics {
    let cyclomaticComplexity = 1; // Base complexity
    let cognitiveComplexity = 0;
    let nestingDepth = 0;
    let maxNesting = 0;
    const linesOfCode = this.lines.filter(line => line.trim().length > 0).length;

    this.lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Count decision points for cyclomatic complexity
      if (trimmedLine.includes('if') || 
          trimmedLine.includes('while') || 
          trimmedLine.includes('for') ||
          trimmedLine.includes('case') ||
          trimmedLine.includes('&&') ||
          trimmedLine.includes('||')) {
        cyclomaticComplexity++;
      }

      // Track nesting depth
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      nestingDepth += openBraces - closeBraces;
      maxNesting = Math.max(maxNesting, nestingDepth);

      // Cognitive complexity (simplified)
      if (trimmedLine.includes('if')) cognitiveComplexity += 1 + nestingDepth;
      if (trimmedLine.includes('while') || trimmedLine.includes('for')) cognitiveComplexity += 1 + nestingDepth;
      if (trimmedLine.includes('switch')) cognitiveComplexity += 1 + nestingDepth;
    });

    return {
      cyclomaticComplexity,
      cognitiveComplexity,
      linesOfCode,
      nestingDepth: maxNesting
    };
  }

  private analyzeQuality(): CodeQuality {
    const complexity = this.calculateComplexity();
    const issues = this.analyzeSyntax();
    
    // Calculate quality scores (0-100)
    const maintainability = Math.max(0, 100 - complexity.cyclomaticComplexity * 5);
    const readability = Math.max(0, 100 - complexity.nestingDepth * 10 - issues.length * 5);
    const testability = Math.max(0, 100 - complexity.cognitiveComplexity * 3);
    const performance = this.analyzePerformance();
    const security = this.analyzeSecurity();

    return {
      maintainability,
      readability,
      testability,
      performance,
      security
    };
  }

  private analyzePerformance(): number {
    let score = 100;
    
    // Check for performance issues
    this.lines.forEach(line => {
      if (line.includes('malloc') && line.includes('for')) score -= 10; // Memory allocation in loop
      if (line.includes('printf') && line.includes('for')) score -= 5; // I/O in loop
      if (line.match(/for.*for/)) score -= 15; // Nested loops
    });

    return Math.max(0, score);
  }

  private analyzeSecurity(): number {
    let score = 100;
    
    this.lines.forEach(line => {
      if (line.includes('gets(')) score -= 30; // Unsafe function
      if (line.includes('strcpy(') && !line.includes('strncpy(')) score -= 15; // Unsafe string copy
      if (line.includes('sprintf(') && !line.includes('snprintf(')) score -= 15; // Unsafe formatting
      if (line.includes('scanf(') && line.includes('%s')) score -= 10; // Unsafe input
    });

    return Math.max(0, score);
  }

  private generateSuggestions(): Suggestion[] {
    const suggestions: Suggestion[] = [];
    const complexity = this.calculateComplexity();

    // Complexity suggestions
    if (complexity.cyclomaticComplexity > 10) {
      suggestions.push({
        line: 1,
        type: 'best-practice',
        priority: 'high',
        title: 'High Cyclomatic Complexity',
        description: 'Consider breaking this function into smaller, more focused functions.',
        example: 'Split complex logic into helper functions with single responsibilities.'
      });
    }

    if (complexity.nestingDepth > 3) {
      suggestions.push({
        line: 1,
        type: 'readability',
        priority: 'medium',
        title: 'Deep Nesting',
        description: 'Reduce nesting depth by using early returns or extracting functions.',
        example: 'Use guard clauses: if (!condition) return; instead of if (condition) { ... }'
      });
    }

    // Memory management suggestions
    this.lines.forEach((line, index) => {
      if (line.includes('malloc') && !this.code.includes('free')) {
        suggestions.push({
          line: index + 1,
          type: 'security',
          priority: 'high',
          title: 'Memory Leak Risk',
          description: 'Always free dynamically allocated memory to prevent memory leaks.',
          example: 'Add free(ptr); when the memory is no longer needed.'
        });
      }

      if (line.includes('gets(')) {
        suggestions.push({
          line: index + 1,
          type: 'security',
          priority: 'high',
          title: 'Unsafe Function',
          description: 'Replace gets() with fgets() to prevent buffer overflow.',
          example: 'fgets(buffer, sizeof(buffer), stdin);'
        });
      }
    });

    return suggestions;
  }

  private generateExplanation(): string {
    const complexity = this.calculateComplexity();
    const issues = this.analyzeSyntax();
    const quality = this.analyzeQuality();

    let explanation = "## Code Analysis Summary\n\n";
    
    explanation += "### Structure and Flow\n";
    explanation += `This code consists of ${complexity.linesOfCode} lines with a cyclomatic complexity of ${complexity.cyclomaticComplexity}. `;
    
    if (complexity.cyclomaticComplexity <= 5) {
      explanation += "The code has low complexity and should be easy to understand and maintain. ";
    } else if (complexity.cyclomaticComplexity <= 10) {
      explanation += "The code has moderate complexity. Consider refactoring if it grows further. ";
    } else {
      explanation += "The code has high complexity and would benefit from being broken into smaller functions. ";
    }

    explanation += "\n\n### Control Flow Analysis\n";
    const branches = this.analyzeControlFlow().branches;
    const loops = this.analyzeControlFlow().loops;
    
    if (branches.length > 0) {
      explanation += `The code contains ${branches.length} conditional branch(es). `;
      branches.forEach(branch => {
        if (branch.alwaysTrue) {
          explanation += `The condition on line ${branch.line} appears to always be true. `;
        } else if (branch.alwaysFalse) {
          explanation += `The condition on line ${branch.line} appears to always be false. `;
        }
      });
    }

    if (loops.length > 0) {
      explanation += `There are ${loops.length} loop(s) in the code. `;
      loops.forEach(loop => {
        if (loop.potentialIssues.length > 0) {
          explanation += `The ${loop.type} loop on line ${loop.line} has potential issues: ${loop.potentialIssues.join(', ')}. `;
        }
      });
    }

    explanation += "\n\n### Quality Assessment\n";
    explanation += `**Maintainability**: ${quality.maintainability.toFixed(0)}/100 - `;
    if (quality.maintainability >= 80) {
      explanation += "Excellent. The code is well-structured and easy to modify.\n";
    } else if (quality.maintainability >= 60) {
      explanation += "Good. Some improvements could make the code more maintainable.\n";
    } else {
      explanation += "Needs improvement. Consider refactoring for better maintainability.\n";
    }

    explanation += `**Readability**: ${quality.readability.toFixed(0)}/100 - `;
    if (quality.readability >= 80) {
      explanation += "Excellent. The code is clear and easy to understand.\n";
    } else if (quality.readability >= 60) {
      explanation += "Good. Some formatting or structure improvements would help.\n";
    } else {
      explanation += "Needs improvement. Consider simplifying complex expressions and reducing nesting.\n";
    }

    if (issues.length > 0) {
      explanation += `\n### Issues Found\n`;
      explanation += `${issues.length} potential issue(s) were identified:\n`;
      issues.slice(0, 3).forEach(issue => {
        explanation += `- Line ${issue.line}: ${issue.message}\n`;
      });
      if (issues.length > 3) {
        explanation += `- And ${issues.length - 3} more...\n`;
      }
    }

    explanation += "\n### Recommendations\n";
    const suggestions = this.generateSuggestions();
    if (suggestions.length > 0) {
      suggestions.slice(0, 3).forEach(suggestion => {
        explanation += `- **${suggestion.title}**: ${suggestion.description}\n`;
      });
    } else {
      explanation += "No major improvements needed. The code follows good practices!";
    }

    return explanation;
  }

  // Helper methods
  private extractCondition(line: string, keyword: string): string {
    const match = line.match(new RegExp(`${keyword}\\s*\\(([^)]+)\\)`));
    return match ? match[1] : '';
  }

  private isAlwaysTrue(condition: string): boolean {
    return condition === '1' || condition === 'true' || condition.match(/^\d+$/) !== null;
  }

  private isAlwaysFalse(condition: string): boolean {
    return condition === '0' || condition === 'false';
  }

  private findEdgeCases(condition: string): string[] {
    const edgeCases: string[] = [];
    
    if (condition.includes('>') || condition.includes('<')) {
      edgeCases.push('boundary values');
    }
    if (condition.includes('==')) {
      edgeCases.push('exact equality');
    }
    if (condition.includes('&&') || condition.includes('||')) {
      edgeCases.push('complex boolean logic');
    }
    
    return edgeCases;
  }

  private analyzeLoopIssues(condition: string, type: string): string[] {
    const issues: string[] = [];
    
    if (type === 'while' && condition === '1') {
      issues.push('potential infinite loop');
    }
    if (condition.includes('++') && condition.includes('--')) {
      issues.push('conflicting increment/decrement');
    }
    
    return issues;
  }
}