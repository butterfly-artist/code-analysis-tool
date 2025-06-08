import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { CompilationStage } from '../types/compiler';

interface CompilationStagesProps {
  stages: CompilationStage[];
}

export function CompilationStages({ stages }: CompilationStagesProps) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Compilation Stages</h2>
      
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div
            key={stage.name}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              stage.active
                ? 'bg-primary-900/30 border-l-4 border-primary-500'
                : stage.completed
                ? 'bg-green-900/20 border-l-4 border-green-500'
                : 'bg-dark-700/50'
            }`}
          >
            <div className="flex-shrink-0">
              {stage.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : stage.active ? (
                <Clock className="w-6 h-6 text-primary-500 animate-spin" />
              ) : (
                <Circle className="w-6 h-6 text-gray-500" />
              )}
            </div>
            
            <div className="flex-1">
              <h3 className={`font-medium ${
                stage.active ? 'text-primary-300' : stage.completed ? 'text-green-300' : 'text-gray-300'
              }`}>
                {index + 1}. {stage.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}