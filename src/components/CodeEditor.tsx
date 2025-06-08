import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
}

const SAMPLE_CODE = `int main() {
    int x = 10;
    int y = 20;
    int sum = x + y;
    
    if (sum > 25) {
        return sum;
    }
    
    return 0;
}`;

export function CodeEditor({ code, onChange, onRun, onReset, isRunning }: CodeEditorProps) {
  const [localCode, setLocalCode] = useState(code || SAMPLE_CODE);

  useEffect(() => {
    setLocalCode(code || SAMPLE_CODE);
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setLocalCode(newCode);
    onChange(newCode);
  };

  const handleLoadSample = () => {
    setLocalCode(SAMPLE_CODE);
    onChange(SAMPLE_CODE);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Source Code</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLoadSample}
            className="btn-secondary text-sm"
          >
            Load Sample
          </button>
          <button
            onClick={onReset}
            className="btn-secondary flex items-center space-x-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={onRun}
            disabled={isRunning}
            className={`btn-primary flex items-center space-x-2 ${
              isRunning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Compiling...' : 'Compile'}</span>
          </button>
        </div>
      </div>
      
      <textarea
        value={localCode}
        onChange={handleChange}
        className="w-full h-80 bg-dark-900 text-white font-mono text-sm p-4 rounded-lg border border-dark-600 focus:border-primary-500 focus:outline-none resize-none"
        placeholder="Enter your C code here..."
        spellCheck={false}
      />
      
      <div className="mt-2 text-xs text-gray-400">
        Lines: {localCode.split('\n').length} | Characters: {localCode.length}
      </div>
    </div>
  );
}