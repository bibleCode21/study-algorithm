'use client';

import { useState } from 'react';
import { Exercise } from '@/features/practice/types/exercise';
import { PracticePageClientProps } from '@/features/practice/types/components';
import ExerciseHeader from './ExerciseHeader';
import ExerciseDescription from './ExerciseDescription';
import CodeEditor from './CodeEditor';
import TestRunner from './TestRunner';
import SolutionView from './SolutionView';

const getDefaultCode = (exercise: Exercise): string => {
  // 문제에 템플릿이 있으면 사용, 없으면 기본 템플릿
  if (exercise.templateCode) {
    if (Array.isArray(exercise.templateCode)) {
      return exercise.templateCode[0]; // 첫 번째 템플릿을 기본값으로
    }
    return exercise.templateCode;
  }
  
  // 기본 템플릿 (arrow function)
  return `const solution = (data: any): any => {
  // 여기에 코드를 작성하세요
  return data;
};`;
};

const PracticePageClient = ({
  concept,
  exercise,
  highlightedSolutionCode,
}: PracticePageClientProps) => {
  const [code, setCode] = useState(() => getDefaultCode(exercise));
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽: 문제 설명 */}
          <div className="space-y-6">
            <ExerciseHeader concept={concept} exercise={exercise} />
            <ExerciseDescription exercise={exercise} />
          </div>

          {/* 오른쪽: 코드 에디터 및 실행 */}
          <div className="space-y-6">
            <CodeEditor 
              exercise={exercise} 
              code={code} 
              onCodeChange={setCode}
              selectedTemplateIndex={selectedTemplateIndex}
              onTemplateChange={setSelectedTemplateIndex}
            />
            <TestRunner exercise={exercise} code={code} />
            <SolutionView exercise={exercise} highlightedSolutionCode={highlightedSolutionCode} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PracticePageClient;

