'use client';

import { useState } from 'react';
import { ConceptCodeExamplesProps } from '@/features/algorithm/types/components';
import CodeBlockClient from '@/components/CodeBlock/CodeBlockClient';
import Pagination from '@/components/ui/Pagination';

const ConceptCodeExamples = ({ codeExamples }: ConceptCodeExamplesProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    if (codeExamples.length === 0) {
        return null;
    }

    const currentExample = codeExamples[currentPage - 1];
    const totalPages = codeExamples.length;

    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">코드 예제</h2>
                {totalPages > 1 && (
                    <span className="text-sm text-gray-500">
                        {currentPage} / {totalPages}
                    </span>
                )}
            </div>
            
            <div className="mb-6">
                <CodeBlockClient
                    language={currentExample.language}
                    code={currentExample.code}
                    highlightedHtml={currentExample.highlightedHtml}
                />
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="mt-6"
                />
            )}
        </section>
    );
};

export default ConceptCodeExamples;

