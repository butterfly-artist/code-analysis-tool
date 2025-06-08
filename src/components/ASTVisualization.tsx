import React from 'react';
import { ASTNode } from '../types/compiler';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface ASTVisualizationProps {
  ast: ASTNode | null;
}

interface TreeNodeProps {
  node: ASTNode;
  depth: number;
}

function TreeNode({ node, depth }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = React.useState(depth < 2);
  
  const hasChildren = node.children && node.children.length > 0;
  const indent = depth * 20;

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Program': return 'text-purple-400 bg-purple-900/20';
      case 'Declaration': return 'text-blue-400 bg-blue-900/20';
      case 'Assignment': return 'text-green-400 bg-green-900/20';
      case 'BinaryExpression': return 'text-orange-400 bg-orange-900/20';
      case 'Identifier': return 'text-cyan-400 bg-cyan-900/20';
      case 'Literal': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="select-none">
      <div
        className={`flex items-center py-1 px-2 rounded cursor-pointer hover:bg-dark-700/50 transition-colors`}
        style={{ marginLeft: indent }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400 mr-1" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400 mr-1" />
          )
        ) : (
          <div className="w-5 mr-1" />
        )}
        
        <span className={`px-2 py-1 rounded text-xs font-medium ${getNodeColor(node.type)}`}>
          {node.type}
        </span>
        
        {node.value && (
          <span className="ml-2 text-white font-mono text-sm">
            {node.value}
          </span>
        )}
        
        {node.position && (
          <span className="ml-2 text-xs text-gray-500">
            ({node.position.line}:{node.position.column})
          </span>
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div className="animate-fade-in">
          {node.children!.map((child, index) => (
            <TreeNode key={index} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ASTVisualization({ ast }: ASTVisualizationProps) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Syntax Analysis - AST</h2>
      
      <div className="max-h-96 overflow-y-auto">
        {!ast ? (
          <div className="text-center text-gray-400 py-8">
            No AST generated yet. Run compilation to see the abstract syntax tree.
          </div>
        ) : (
          <div className="font-mono text-sm">
            <TreeNode node={ast} depth={0} />
          </div>
        )}
      </div>
    </div>
  );
}