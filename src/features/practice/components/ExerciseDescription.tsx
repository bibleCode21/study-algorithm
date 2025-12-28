'use client';

import { useState } from 'react';
import { ExerciseDescriptionProps } from '@/features/practice/types/components';

const ExerciseDescription = ({ exercise }: ExerciseDescriptionProps) => {
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">문제 설명</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {exercise.description}
        </p>
      </section>

      {exercise.examples && exercise.examples.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">예제</h2>
          <div className="space-y-4">
            {exercise.examples.map((example, index) => (
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

      {exercise.constraints && exercise.constraints.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">제약 조건</h2>
          <ul className="list-disc list-outside space-y-1 text-sm text-gray-700 pl-4">
            {exercise.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </section>
      )}

      {exercise.hints && exercise.hints.length > 0 && (
        <section>
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mb-3 cursor-pointer"
          >
            <span>💡 힌트 {showHints ? '숨기기' : '보기'}</span>
          </button>
          {showHints && (
            <ul className="list-disc list-outside space-y-2 text-sm text-gray-700 bg-blue-50 p-4 rounded-lg pl-4">
              {exercise.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};

export default ExerciseDescription;

