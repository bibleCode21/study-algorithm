'use client';

import { useState } from 'react';
import { Concept } from '@/features/algorithm/types/algorithm';
import { Problem } from '@/features/practice/types/problem';
import ProblemHeader from './ProblemHeader';
import ProblemDescription from './ProblemDescription';
import CodeEditor from './CodeEditor';
import TestRunner from './TestRunner';
import SolutionView from './SolutionView';

interface PracticePageClientProps {
  concept: Concept;
  problem: Problem;
  highlightedSolutionCode: string;
}

const defaultCode = `function solution(input: any): any {
  // 여기에 코드를 작성하세요
  return input;
}`;

const PracticePageClient = ({
  concept,
  problem,
  highlightedSolutionCode,
}: PracticePageClientProps) => {
  const [code, setCode] = useState(defaultCode);

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
            <CodeEditor problem={problem} code={code} onCodeChange={setCode} />
            <TestRunner problem={problem} code={code} />
            <SolutionView problem={problem} highlightedSolutionCode={highlightedSolutionCode} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PracticePageClient;

