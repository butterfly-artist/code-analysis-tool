import React from 'react';
import { SymbolTableEntry } from '../types/compiler';
import { AlertTriangle } from 'lucide-react';

interface SymbolTableProps {
  symbolTable: SymbolTableEntry[];
  errors: string[];
}

export function SymbolTable({ symbolTable, errors }: SymbolTableProps) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Semantic Analysis</h2>
      
      {/* Errors */}
      {errors.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-red-400 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Semantic Errors
          </h3>
          <div className="space-y-1">
            {errors.map((error, index) => (
              <div key={index} className="text-sm text-red-300 bg-red-900/20 p-2 rounded border-l-2 border-red-500">
                {error}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Symbol Table */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-2">Symbol Table</h3>
        
        {symbolTable.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No symbols found. Run compilation to populate the symbol table.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-600">
                  <th className="text-left py-2 px-3 text-gray-300">Name</th>
                  <th className="text-left py-2 px-3 text-gray-300">Type</th>
                  <th className="text-left py-2 px-3 text-gray-300">Scope</th>
                  <th className="text-left py-2 px-3 text-gray-300">Line</th>
                  <th className="text-left py-2 px-3 text-gray-300">Value</th>
                </tr>
              </thead>
              <tbody>
                {symbolTable.map((entry, index) => (
                  <tr key={index} className="border-b border-dark-700 hover:bg-dark-700/50">
                    <td className="py-2 px-3 text-blue-300 font-mono">{entry.name}</td>
                    <td className="py-2 px-3 text-purple-300">{entry.type}</td>
                    <td className="py-2 px-3 text-gray-400">{entry.scope}</td>
                    <td className="py-2 px-3 text-gray-400">{entry.line}</td>
                    <td className="py-2 px-3 text-green-300 font-mono">{entry.value || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}