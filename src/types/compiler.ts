export interface Token {
  type: 'keyword' | 'identifier' | 'operator' | 'literal' | 'delimiter' | 'comment';
  value: string;
  line: number;
  column: number;
}

export interface ASTNode {
  type: string;
  value?: string;
  children?: ASTNode[];
  position?: {
    line: number;
    column: number;
  };
}

export interface SymbolTableEntry {
  name: string;
  type: string;
  scope: string;
  line: number;
  value?: string;
}

export interface IntermediateCode {
  operation: string;
  operand1?: string;
  operand2?: string;
  result?: string;
}

export interface CompilationStage {
  name: string;
  description: string;
  active: boolean;
  completed: boolean;
  data?: any;
}