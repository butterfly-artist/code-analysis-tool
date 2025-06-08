export interface CodeSample {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  concepts: string[];
}

export interface AnalysisResult {
  syntaxIssues: SyntaxIssue[];
  logicalAnalysis: LogicalAnalysis;
  codeQuality: CodeQuality;
  suggestions: Suggestion[];
  explanation: string;
}

export interface SyntaxIssue {
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  type: string;
}

export interface LogicalAnalysis {
  controlFlow: ControlFlowAnalysis;
  dataFlow: DataFlowAnalysis;
  complexity: ComplexityMetrics;
}

export interface ControlFlowAnalysis {
  branches: BranchInfo[];
  loops: LoopInfo[];
  unreachableCode: CodeLocation[];
  potentialInfiniteLoops: CodeLocation[];
}

export interface BranchInfo {
  line: number;
  type: 'if' | 'switch' | 'ternary';
  condition: string;
  alwaysTrue: boolean;
  alwaysFalse: boolean;
  edgeCases: string[];
}

export interface LoopInfo {
  line: number;
  type: 'for' | 'while' | 'do-while';
  condition: string;
  potentialIssues: string[];
}

export interface DataFlowAnalysis {
  uninitializedVariables: string[];
  unusedVariables: string[];
  variableLifetime: VariableLifetime[];
  memoryLeaks: CodeLocation[];
}

export interface VariableLifetime {
  name: string;
  declared: number;
  lastUsed: number;
  scope: string;
}

export interface ComplexityMetrics {
  cyclomaticComplexity: number;
  cognitiveComplexity: number;
  linesOfCode: number;
  nestingDepth: number;
}

export interface CodeQuality {
  maintainability: number;
  readability: number;
  testability: number;
  performance: number;
  security: number;
}

export interface Suggestion {
  line: number;
  type: 'optimization' | 'best-practice' | 'security' | 'readability';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  example?: string;
}

export interface CodeLocation {
  line: number;
  column: number;
  description: string;
}