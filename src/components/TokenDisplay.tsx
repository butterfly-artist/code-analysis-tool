import React from 'react';
import { Token } from '../types/compiler';

interface TokenDisplayProps {
  tokens: Token[];
}

export function TokenDisplay({ tokens }: TokenDisplayProps) {
  const getTokenColor = (type: string) => {
    switch (type) {
      case 'keyword': return 'text-purple-400 bg-purple-900/20';
      case 'identifier': return 'text-blue-400 bg-blue-900/20';
      case 'operator': return 'text-orange-400 bg-orange-900/20';
      case 'literal': return 'text-green-400 bg-green-900/20';
      case 'delimiter': return 'text-gray-400 bg-gray-900/20';
      case 'comment': return 'text-gray-500 bg-gray-900/10';
      default: return 'text-gray-300 bg-gray-900/20';
    }
  };

  const tokenTypes = ['keyword', 'identifier', 'operator', 'literal', 'delimiter', 'comment'];
  const tokenCounts = tokenTypes.reduce((acc, type) => {
    acc[type] = tokens.filter(token => token.type === type).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Lexical Analysis - Tokens</h2>
      
      {/* Token Statistics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {tokenTypes.map(type => (
          <div key={type} className="text-center p-2 bg-dark-700 rounded">
            <div className={`text-sm font-medium ${getTokenColor(type).split(' ')[0]}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
            <div className="text-xl font-bold text-white">{tokenCounts[type]}</div>
          </div>
        ))}
      </div>
      
      {/* Token List */}
      <div className="max-h-96 overflow-y-auto">
        {tokens.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No tokens generated yet. Run compilation to see tokens.
          </div>
        ) : (
          <div className="space-y-2">
            {tokens.map((token, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg ${getTokenColor(token.type)} border border-opacity-30`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-bold">
                    {token.value}
                  </span>
                  <span className="text-xs px-2 py-1 bg-dark-900/50 rounded">
                    {token.type}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {token.line}:{token.column}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}