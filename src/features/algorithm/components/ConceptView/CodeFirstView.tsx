'use client';

import { useState, useEffect } from 'react';
import { ConceptViewProps } from '@/features/algorithm/types/components';
import AnnotatedCodeBlock from './AnnotatedCodeBlock';
import { getCodeAnnotations } from '@/features/algorithm/utils/codeAnnotations';
import Pagination from '@/components/ui/Pagination';

const CodeFirstView = ({ concept, codeExamples }: ConceptViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지가 변경될 때 스크롤을 최상위로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (codeExamples.length === 0) {
    return null;
  }

  const currentExample = codeExamples[currentPage - 1];
  const totalPages = codeExamples.length;
  const exampleIndex = currentPage - 1; // 0부터 시작하는 인덱스
  const annotations = getCodeAnnotations(concept.id, currentExample.language, currentExample.code, exampleIndex);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">코드 예제</h2>
          {totalPages > 1 && (
            <span className="text-sm text-gray-500">
              {currentPage} / {totalPages}
            </span>
          )}
        </div>
        
        <div className="mb-6">
          <AnnotatedCodeBlock
            language={currentExample.language}
            code={currentExample.code}
            highlightedHtml={currentExample.highlightedHtml}
            annotations={annotations}
          />
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-8 md:mt-6"
          />
        )}
      </section>
    </div>
  );
};

export default CodeFirstView;

