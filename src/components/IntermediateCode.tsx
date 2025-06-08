import React from 'react';
import { IntermediateCode as IIntermediateCode } from '../types/compiler';

interface IntermediateCodeProps {
  code: IIntermediateCode[];
}

export function IntermediateCode({ code }: IntermediateCodeProps) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Code Generation - Intermediate Code</h2>
      
      {code.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No intermediate code generated yet. Run compilation to see the intermediate representation.
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {code.map((instruction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-dark-700 rounded-lg font-mono text-sm"
            >
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 w-8">{index + 1}</span>
                <span className="text-orange-400 font-bold min-w-16">{instruction.operation}</span>
                
                <div className="flex items-center space-x-2">
                  {instruction.operand1 && (
                    <span className="text-blue-300">{instruction.operand1}</span>
                  )}
                  {instruction.operand2 && (
                    <>
                      <span className="text-gray-500">,</span>
                      <span className="text-blue-300">{instruction.operand2}</span>
                    </>
                  )}
                  {instruction.result && (
                    <>
                      <span className="text-gray-500">→</span>
                      <span className="text-green-300">{instruction.result}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {code.length > 0 && (
        <div className="mt-4 text-xs text-gray-400">
          Generated {code.length} intermediate instructions
        </div>
      )}
    </div>
  );
}