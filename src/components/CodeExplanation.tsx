import React from 'react';
import { AnalysisResult } from '../types/analyzer';
import { BookOpen, MessageSquare } from 'lucide-react';

interface CodeExplanationProps {
  analysis: AnalysisResult | null;
}

export function CodeExplanation({ analysis }: CodeExplanationProps) {
  if (!analysis) {
    return (
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-primary-400" />
          Code Explanation
        </h2>
        <div className="text-center text-gray-400 py-8">
          No explanation available. Run code analysis to see detailed explanations.
        </div>
      </div>
    );
  }

  const formatExplanation = (text: string) => {
    // Convert markdown-like formatting to JSX
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={index} className="text-lg font-semibold text-white mt-6 mb-3 first:mt-0">
            {line.replace('## ', '')}
          </h3>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h4 key={index} className="text-md font-semibold text-primary-300 mt-4 mb-2">
            {line.replace('### ', '')}
          </h4>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        const content = line.replace(/\*\*/g, '');
        const [label, ...rest] = content.split(': ');
        elements.push(
          <div key={index} className="mb-2">
            <span className="font-semibold text-white">{label}:</span>
            <span className="text-gray-300 ml-1">{rest.join(': ')}</span>
          </div>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <div key={index} className="flex items-start space-x-2 mb-1">
            <span className="text-primary-400 mt-1">•</span>
            <span className="text-gray-300 text-sm">{line.replace('- ', '')}</span>
          </div>
        );
      } else if (line.trim()) {
        elements.push(
          <p key={index} className="text-gray-300 mb-3 leading-relaxed">
            {line}
          </p>
        );
      }
    });
    
    return elements;
  };

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-primary-400" />
        Code Explanation
      </h2>
      
      <div className="prose prose-invert max-w-none">
        <div className="bg-dark-700 p-4 rounded-lg border-l-4 border-primary-500 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Natural Language Analysis</span>
          </div>
          <p className="text-sm text-gray-300">
            This analysis provides a human-readable explanation of your code's behavior, 
            structure, and potential improvements.
          </p>
        </div>
        
        <div className="space-y-2">
          {formatExplanation(analysis.explanation)}
        </div>
      </div>
    </div>
  );
}