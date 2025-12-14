'use client';

import { useState } from 'react';
import { Problem } from '@/features/practice/types/problem';
import { PracticePageClientProps } from '@/features/practice/types/components';
import ProblemHeader from './ProblemHeader';
import ProblemDescription from './ProblemDescription';
import CodeEditor from './CodeEditor';
import TestRunner from './TestRunner';
import SolutionView from './SolutionView';

const getDefaultCode = (problem: Problem): string => {
  // 문제에 템플릿이 있으면 사용, 없으면 기본 템플릿
  if (problem.templateCode) {
    if (Array.isArray(problem.templateCode)) {
      return problem.templateCode[0]; // 첫 번째 템플릿을 기본값으로
    }
    return problem.templateCode;
  }
  
  // 기본 템플릿 (arrow function)
  return `const solution = (data: any): any => {
  // 여기에 코드를 작성하세요
  return data;
};`;
};

const PracticePageClient = ({
  concept,
  problem,
  highlightedSolutionCode,
}: PracticePageClientProps) => {
  const [code, setCode] = useState(() => getDefaultCode(problem));
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽: 문제 설명 */}
          <div className="space-y-6">
            <ProblemHeader concept={concept} problem={problem} />
            <ProblemDescription problem={problem} />
          </div>

          {/* 오른쪽: 코드 에디터 및 실행 */}
          <div className="space-y-6">
            <CodeEditor 
              problem={problem} 
              code={code} 
              onCodeChange={setCode}
              selectedTemplateIndex={selectedTemplateIndex}
              onTemplateChange={setSelectedTemplateIndex}
            />
            <TestRunner problem={problem} code={code} />
            <SolutionView problem={problem} highlightedSolutionCode={highlightedSolutionCode} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PracticePageClient;

