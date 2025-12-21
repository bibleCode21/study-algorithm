'use client';

import { useState } from 'react';
import CodeBlockClient from '@/components/CodeBlock/CodeBlockClient';
import { SolutionViewProps } from '@/features/practice/types/components';

const SolutionView = ({ exercise, highlightedSolutionCode }: SolutionViewProps) => {
  const [showSolution, setShowSolution] = useState(false);

  if (!exercise.solution) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <button
        onClick={() => setShowSolution(!showSolution)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-4"
      >
        <span>{showSolution ? '▼' : '▶'}</span>
        <span>정답 보기</span>
      </button>

      {showSolution && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">해설</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {exercise.solution.explanation}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">정답 코드</h3>
            <CodeBlockClient
              language={exercise.solution.language}
              code={exercise.solution.code}
              highlightedHtml={highlightedSolutionCode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionView;

