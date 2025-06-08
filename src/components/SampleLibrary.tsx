import React, { useState } from 'react';
import { CODE_SAMPLES, getRandomSample } from '../data/codeSamples';
import { CodeSample } from '../types/analyzer';
import { Shuffle, Code, BookOpen, Filter, Search } from 'lucide-react';

interface SampleLibraryProps {
  onLoadSample: (code: string) => void;
}

export function SampleLibrary({ onLoadSample }: SampleLibraryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRandomSample = () => {
    const sample = getRandomSample();
    onLoadSample(sample.code);
    setIsOpen(false);
  };

  const handleSelectSample = (sample: CodeSample) => {
    onLoadSample(sample.code);
    setIsOpen(false);
  };

  const filteredSamples = CODE_SAMPLES.filter(sample => {
    const matchesDifficulty = selectedDifficulty === 'all' || sample.difficulty === selectedDifficulty;
    const matchesSearch = searchTerm === '' || 
      sample.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.concepts.some(concept => concept.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-900/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-900/20';
      case 'advanced': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleRandomSample}
          className="btn-primary flex items-center space-x-2 text-sm px-3 py-2"
        >
          <Shuffle className="w-4 h-4" />
          <span className="hidden sm:inline">Random</span>
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-secondary flex items-center space-x-2 text-sm px-3 py-2"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Browse</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-dark-600 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden min-w-96">
          {/* Header */}
          <div className="p-4 border-b border-dark-600">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Code className="w-5 h-5 mr-2 text-primary-400" />
                Code Sample Library
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search samples..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-dark-700 border border-dark-600 rounded text-white text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-dark-700 border border-dark-600 rounded px-3 py-2 text-white text-sm focus:border-primary-500 focus:outline-none"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sample List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredSamples.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No samples found matching your criteria.
              </div>
            ) : (
              <div className="p-2">
                {filteredSamples.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className="w-full text-left p-3 hover:bg-dark-700 rounded transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{sample.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(sample.difficulty)}`}>
                        {sample.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-2">{sample.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {sample.concepts.slice(0, 3).map((concept, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-primary-900/30 text-primary-300 rounded"
                        >
                          {concept}
                        </span>
                      ))}
                      {sample.concepts.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{sample.concepts.length - 3} more
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-dark-600 bg-dark-900/50">
            <div className="text-xs text-gray-400 text-center">
              {filteredSamples.length} of {CODE_SAMPLES.length} samples shown
            </div>
          </div>
        </div>
      )}
    </div>
  );
}