import { ASTNode, IntermediateCode } from '../types/compiler';

export class CodeGenerator {
  private code: IntermediateCode[] = [];
  private tempCounter: number = 0;

  generate(ast: ASTNode): IntermediateCode[] {
    this.code = [];
    this.tempCounter = 0;
    this.generateNode(ast);
    return this.code;
  }

  private generateNode(node: ASTNode): string {
    switch (node.type) {
      case 'Program':
        node.children?.forEach(child => this.generateNode(child));
        return '';
        
      case 'Declaration':
        return this.generateDeclaration(node);
        
      case 'Assignment':
        return this.generateAssignment(node);
        
      case 'BinaryExpression':
        return this.generateBinaryExpression(node);
        
      case 'Identifier':
        return node.value!;
        
      case 'Literal':
        return node.value!;
        
      default:
        node.children?.forEach(child => this.generateNode(child));
        return '';
    }
  }

  private generateDeclaration(node: ASTNode): string {
    const type = node.value;
    const identifier = node.children?.[0];
    
    if (identifier) {
      this.code.push({
        operation: 'DECLARE',
        operand1: type!,
        result: identifier.value!
      });
      
      if (node.children?.[1]) {
        const value = this.generateNode(node.children[1]);
        this.code.push({
          operation: 'ASSIGN',
          operand1: value,
          result: identifier.value!
        });
      }
    }
    
    return '';
  }

  private generateAssignment(node: ASTNode): string {
    const identifier = node.children?.[0];
    const expression = node.children?.[1];
    
    if (identifier && expression) {
      const value = this.generateNode(expression);
      this.code.push({
        operation: 'ASSIGN',
        operand1: value,
        result: identifier.value!
      });
    }
    
    return '';
  }

  private generateBinaryExpression(node: ASTNode): string {
    const left = node.children?.[0];
    const right = node.children?.[1];
    
    if (left && right) {
      const leftOperand = this.generateNode(left);
      const rightOperand = this.generateNode(right);
      const temp = `t${this.tempCounter++}`;
      
      this.code.push({
        operation: node.value!,
        operand1: leftOperand,
        operand2: rightOperand,
        result: temp
      });
      
      return temp;
    }
    
    return '';
  }
}