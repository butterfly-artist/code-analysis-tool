import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { CodeEditor } from './components/CodeEditor';
import { CompilationStages } from './components/CompilationStages';
import { TokenDisplay } from './components/TokenDisplay';
import { ASTVisualization } from './components/ASTVisualization';
import { SymbolTable } from './components/SymbolTable';
import { IntermediateCode } from './components/IntermediateCode';
import { CodeAnalysisPanel } from './components/CodeAnalysisPanel';
import { CodeExplanation } from './components/CodeExplanation';
import { SampleLibrary } from './components/SampleLibrary';
import { tokenize } from './utils/lexer';
import { Parser } from './utils/parser';
import { SemanticAnalyzer } from './utils/semanticAnalyzer';
import { CodeGenerator } from './utils/codeGenerator';
import { CodeAnalyzer } from './utils/codeAnalyzer';
import { Token, ASTNode, SymbolTableEntry, IntermediateCode as ICode, CompilationStage } from './types/compiler';
import { AnalysisResult } from './types/analyzer';

const INITIAL_STAGES: CompilationStage[] = [
  {
    name: 'Lexical Analysis',
    description: 'Breaking source code into tokens (keywords, identifiers, operators, literals)',
    active: false,
    completed: false
  },
  {
    name: 'Syntax Analysis',
    description: 'Parsing tokens into Abstract Syntax Tree (AST) using grammar rules',
    active: false,
    completed: false
  },
  {
    name: 'Semantic Analysis',
    description: 'Type checking, symbol table construction, and scope validation',
    active: false,
    completed: false
  },
  {
    name: 'Code Generation',
    description: 'Generating intermediate code representation for optimization',
    active: false,
    completed: false
  }
];

const SAMPLE_CODE = `int main() {
    int x = 10;
    int y = 20;
    int sum = x + y;
    
    if (sum > 25) {
        return sum;
    }
    
    return 0;
}`;

function App() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [stages, setStages] = useState<CompilationStage[]>(INITIAL_STAGES);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [ast, setAst] = useState<ASTNode | null>(null);
  const [symbolTable, setSymbolTable] = useState<SymbolTableEntry[]>([]);
  const [semanticErrors, setSemanticErrors] = useState<string[]>([]);
  const [intermediateCode, setIntermediateCode] = useState<ICode[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [activeTab, setActiveTab] = useState<'compiler' | 'analysis'>('compiler');

  // Initialize with sample code compilation on first load
  useEffect(() => {
    if (code === SAMPLE_CODE) {
      runCompilation();
    }
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runCompilation = async () => {
    if (!code.trim()) return;
    
    setIsCompiling(true);
    setStages(INITIAL_STAGES);
    setTokens([]);
    setAst(null);
    setSymbolTable([]);
    setSemanticErrors([]);
    setIntermediateCode([]);

    try {
      // Stage 1: Lexical Analysis
      setStages(prev => prev.map((stage, i) => ({ 
        ...stage, 
        active: i === 0, 
        completed: false 
      })));
      
      await sleep(800);
      const generatedTokens = tokenize(code);
      setTokens(generatedTokens);
      
      setStages(prev => prev.map((stage, i) => ({ 
        ...stage, 
        active: false, 
        completed: i === 0 
      })));

      await sleep(400);

      // Stage 2: Syntax Analysis
      setStages(prev => prev.map((stage, i) => ({ 
        ...stage, 
        active: i === 1, 
        completed: i < 1 
      })));
      
      await sleep(800);
      const parser = new Parser(generatedTokens);
      const generatedAst = parser.parse();
      setAst(generatedAst);
      
      setStages(prev => prev.map((stage, i) => ({ 
        ...stage, 
        active: false, 
        completed: i <= 1 
      })));

      await sleep(400);

      // Stage 3: Semantic Analysis
      setStages(prev => prev.map((stage, i) => ({ 
        ...stage, 
        active: i === 2, 
        completed: i < 2 
      })));
      
      await sleep(800);
      const analyzer = new SemanticAnalyzer();
      const { symbolTable: generatedSymbolTable, errors } = analyzer.analyze(generatedAst);
      setSymbolTable(generatedSymbolTable);
      setSemanticErrors(errors);
      
      setStages(prev => prev.map((stage, i) => ({ 
        ...stage, 
        active: false, 
        completed: i <= 2 
      })));

      await sleep(400);

      // Stage 4: Code Generation
      setStages(prev => prev.map((stage, i) => ({ 
        ...stage, 
        active: i === 3, 
        completed: i < 3 
      })));
      
      await sleep(800);
      const generator = new CodeGenerator();
      const generatedCode = generator.generate(generatedAst);
      setIntermediateCode(generatedCode);
      
      setStages(prev => prev.map((stage, i) => ({ 
        ...stage, 
        active: false, 
        completed: true 
      })));

    } catch (error) {
      console.error('Compilation error:', error);
    } finally {
      setIsCompiling(false);
    }
  };

  const runAnalysis = async () => {
    if (!code.trim()) return;
    
    setIsCompiling(true);
    
    try {
      // Generate tokens for analysis
      const generatedTokens = tokenize(code);
      
      // Run code analysis
      const codeAnalyzer = new CodeAnalyzer(code, generatedTokens);
      const analysisResult = codeAnalyzer.analyze();
      setAnalysis(analysisResult);
      
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsCompiling(false);
    }
  };

  const resetCompilation = () => {
    setStages(INITIAL_STAGES);
    setTokens([]);
    setAst(null);
    setSymbolTable([]);
    setSemanticErrors([]);
    setIntermediateCode([]);
    setAnalysis(null);
    setIsCompiling(false);
  };

  const handleLoadSample = (sampleCode: string) => {
    setCode(sampleCode);
    resetCompilation();
  };

  const exportResults = useCallback(async () => {
    try {
      const results = {
        sourceCode: code,
        tokens,
        ast,
        symbolTable,
        semanticErrors,
        intermediateCode,
        analysis,
        timestamp: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(results, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `code-analysis-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  }, [code, tokens, ast, symbolTable, semanticErrors, intermediateCode, analysis]);

  return (
    <div className="min-h-screen bg-dark-900">
      <Header onExport={exportResults} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 mb-6 bg-dark-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('compiler')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'compiler'
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-700'
            }`}
          >
            Compiler Workflow
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'analysis'
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-700'
            }`}
          >
            Code Analysis
          </button>
        </div>

        {activeTab === 'compiler' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Source Code</h2>
                </div>
                
                {/* Button Row - Improved Layout */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <SampleLibrary onLoadSample={handleLoadSample} />
                  <button
                    onClick={resetCompilation}
                    className="btn-secondary text-sm px-3 py-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={runCompilation}
                    disabled={isCompiling}
                    className={`btn-primary text-sm px-4 py-2 ${
                      isCompiling ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isCompiling ? 'Compiling...' : 'Compile'}
                  </button>
                </div>
                
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-80 bg-dark-900 text-white font-mono text-sm p-4 rounded-lg border border-dark-600 focus:border-primary-500 focus:outline-none resize-none"
                  placeholder="Enter your C code here..."
                  spellCheck={false}
                />
                
                <div className="mt-2 text-xs text-gray-400">
                  Lines: {code.split('\n').length} | Characters: {code.length}
                </div>
              </div>
              
              <CompilationStages stages={stages} />
            </div>
            
            {/* Middle Column */}
            <div className="lg:col-span-1 space-y-6">
              <TokenDisplay tokens={tokens} />
              
              <ASTVisualization ast={ast} />
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              <SymbolTable 
                symbolTable={symbolTable} 
                errors={semanticErrors} 
              />
              
              <IntermediateCode code={intermediateCode} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Source Code</h2>
                </div>
                
                {/* Button Row - Improved Layout */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <SampleLibrary onLoadSample={handleLoadSample} />
                  <button
                    onClick={resetCompilation}
                    className="btn-secondary text-sm px-3 py-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={runAnalysis}
                    disabled={isCompiling}
                    className={`btn-primary text-sm px-4 py-2 ${
                      isCompiling ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isCompiling ? 'Analyzing...' : 'Analyze'}
                  </button>
                </div>
                
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-80 bg-dark-900 text-white font-mono text-sm p-4 rounded-lg border border-dark-600 focus:border-primary-500 focus:outline-none resize-none"
                  placeholder="Enter your C code here..."
                  spellCheck={false}
                />
                
                <div className="mt-2 text-xs text-gray-400">
                  Lines: {code.split('\n').length} | Characters: {code.length}
                </div>
              </div>
            </div>
            
            {/* Middle Column */}
            <div className="lg:col-span-1 space-y-6">
              <CodeAnalysisPanel analysis={analysis} />
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              <CodeExplanation analysis={analysis} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;