'use client';

import { useState } from 'react';
import { Problem } from '@/features/practice/types/problem';

interface ProblemDescriptionProps {
  problem: Problem;
}

export default function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">문제 설명</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {problem.description}
        </p>
      </section>

      {problem.examples && problem.examples.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">예제</h2>
          <div className="space-y-4">
            {problem.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">입력:</span>
                  <pre className="mt-1 text-sm bg-white p-2 rounded border border-gray-200 overflow-x-auto">
                    {example.input}
                  </pre>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">출력:</span>
                  <pre className="mt-1 text-sm bg-white p-2 rounded border border-gray-200 overflow-x-auto">
                    {example.output}
                  </pre>
                </div>
                {example.explanation && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">설명:</span>
                    <p className="mt-1 text-sm text-gray-700">{example.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {problem.constraints && problem.constraints.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">제약 조건</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </section>
      )}

      {problem.hints && problem.hints.length > 0 && (
        <section>
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mb-3"
          >
            <span>💡 힌트 {showHints ? '숨기기' : '보기'}</span>
          </button>
          {showHints && (
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 bg-blue-50 p-4 rounded-lg">
              {problem.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}

