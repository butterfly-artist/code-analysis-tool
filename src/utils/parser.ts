import { Token, ASTNode } from '../types/compiler';

export class Parser {
  private tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens.filter(token => token.type !== 'comment');
  }

  parse(): ASTNode {
    return this.parseProgram();
  }

  private parseProgram(): ASTNode {
    const program: ASTNode = {
      type: 'Program',
      children: []
    };

    while (!this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) {
        program.children!.push(stmt);
      }
    }

    return program;
  }

  private parseStatement(): ASTNode | null {
    if (this.match('keyword')) {
      const keyword = this.previous();
      
      if (keyword.value === 'int' || keyword.value === 'float' || keyword.value === 'char') {
        return this.parseDeclaration(keyword.value);
      }
      
      if (keyword.value === 'if') {
        return this.parseIfStatement();
      }
      
      if (keyword.value === 'while') {
        return this.parseWhileStatement();
      }
      
      if (keyword.value === 'return') {
        return this.parseReturnStatement();
      }
    }

    if (this.check('identifier')) {
      return this.parseAssignment();
    }

    // Skip unrecognized tokens
    if (!this.isAtEnd()) {
      this.advance();
    }
    return null;
  }

  private parseDeclaration(type: string): ASTNode {
    const node: ASTNode = {
      type: 'Declaration',
      value: type,
      children: []
    };

    if (this.match('identifier')) {
      const identifier = this.previous();
      node.children!.push({
        type: 'Identifier',
        value: identifier.value,
        position: { line: identifier.line, column: identifier.column }
      });

      if (this.match('operator') && this.previous().value === '=') {
        const expr = this.parseExpression();
        if (expr) {
          node.children!.push(expr);
        }
      }
    }

    this.consume('delimiter', ';');
    return node;
  }

  private parseIfStatement(): ASTNode {
    const node: ASTNode = {
      type: 'IfStatement',
      children: []
    };

    this.consume('delimiter', '(');
    const condition = this.parseExpression();
    if (condition) {
      node.children!.push(condition);
    }
    this.consume('delimiter', ')');

    // Handle block statements
    if (this.check('delimiter') && this.peek().value === '{') {
      this.advance(); // consume '{'
      while (!this.check('delimiter') || this.peek().value !== '}') {
        if (this.isAtEnd()) break;
        const stmt = this.parseStatement();
        if (stmt) {
          node.children!.push(stmt);
        }
      }
      this.consume('delimiter', '}');
    } else {
      const stmt = this.parseStatement();
      if (stmt) {
        node.children!.push(stmt);
      }
    }

    return node;
  }

  private parseWhileStatement(): ASTNode {
    const node: ASTNode = {
      type: 'WhileStatement',
      children: []
    };

    this.consume('delimiter', '(');
    const condition = this.parseExpression();
    if (condition) {
      node.children!.push(condition);
    }
    this.consume('delimiter', ')');

    const body = this.parseStatement();
    if (body) {
      node.children!.push(body);
    }

    return node;
  }

  private parseReturnStatement(): ASTNode {
    const node: ASTNode = {
      type: 'ReturnStatement',
      children: []
    };

    if (!this.check('delimiter') || this.peek().value !== ';') {
      const expr = this.parseExpression();
      if (expr) {
        node.children!.push(expr);
      }
    }

    this.consume('delimiter', ';');
    return node;
  }

  private parseAssignment(): ASTNode {
    const identifier = this.advance();
    const node: ASTNode = {
      type: 'Assignment',
      children: [
        {
          type: 'Identifier',
          value: identifier.value,
          position: { line: identifier.line, column: identifier.column }
        }
      ]
    };

    if (this.match('operator') && this.previous().value === '=') {
      const expr = this.parseExpression();
      if (expr) {
        node.children!.push(expr);
      }
    }

    this.consume('delimiter', ';');
    return node;
  }

  private parseExpression(): ASTNode | null {
    return this.parseComparison();
  }

  private parseComparison(): ASTNode | null {
    let expr = this.parseAddition();

    while (this.match('operator') && ['==', '!=', '<', '>', '<=', '>='].includes(this.previous().value)) {
      const operator = this.previous();
      const right = this.parseAddition();
      expr = {
        type: 'BinaryExpression',
        value: operator.value,
        children: expr && right ? [expr, right] : []
      };
    }

    return expr;
  }

  private parseAddition(): ASTNode | null {
    let expr = this.parseMultiplication();

    while (this.match('operator') && ['+', '-'].includes(this.previous().value)) {
      const operator = this.previous();
      const right = this.parseMultiplication();
      expr = {
        type: 'BinaryExpression',
        value: operator.value,
        children: expr && right ? [expr, right] : []
      };
    }

    return expr;
  }

  private parseMultiplication(): ASTNode | null {
    let expr = this.parsePrimary();

    while (this.match('operator') && ['*', '/', '%'].includes(this.previous().value)) {
      const operator = this.previous();
      const right = this.parsePrimary();
      expr = {
        type: 'BinaryExpression',
        value: operator.value,
        children: expr && right ? [expr, right] : []
      };
    }

    return expr;
  }

  private parsePrimary(): ASTNode | null {
    if (this.match('literal')) {
      const token = this.previous();
      return {
        type: 'Literal',
        value: token.value,
        position: { line: token.line, column: token.column }
      };
    }

    if (this.match('identifier')) {
      const token = this.previous();
      return {
        type: 'Identifier',
        value: token.value,
        position: { line: token.line, column: token.column }
      };
    }

    if (this.match('delimiter') && this.previous().value === '(') {
      const expr = this.parseExpression();
      this.consume('delimiter', ')');
      return expr;
    }

    return null;
  }

  private match(type: string): boolean {
    if (this.check(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  private check(type: string): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.current >= this.tokens.length;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private consume(type: string, value: string): Token | null {
    if (this.check(type) && this.peek().value === value) {
      return this.advance();
    }
    
    // For demo purposes, we'll be lenient and continue parsing
    return null;
  }
}