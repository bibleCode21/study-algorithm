'use client';

import { useState } from 'react';
import CodeBlockClient from '@/components/CodeBlock/CodeBlockClient';

interface AnnotatedCodeBlockProps {
    language: string;
    code: string;
    highlightedHtml: string;
    annotations?: { line: number; comment: string }[];
}

const AnnotatedCodeBlock = ({
    language,
    code,
    highlightedHtml,
    annotations = [],
}: AnnotatedCodeBlockProps) => {
    const [expandedLines, setExpandedLines] = useState<Set<number>>(new Set());

    const toggleLine = (line: number) => {
        const newExpanded = new Set(expandedLines);
        if (newExpanded.has(line)) {
            newExpanded.delete(line);
        } else {
            newExpanded.add(line);
        }
        setExpandedLines(newExpanded);
    };

    const hasAnnotations = annotations.length > 0;

    if (!hasAnnotations) {
        // 주석이 없으면 일반 코드 블록 표시
        return <CodeBlockClient language={language} code={code} highlightedHtml={highlightedHtml} />;
    }

    return (
        <div className="space-y-4">
            <CodeBlockClient language={language} code={code} highlightedHtml={highlightedHtml} />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">코드 해석</h3>
                <div className="space-y-3">
                    {annotations.map((annotation, index) => {
                        const isExpanded = expandedLines.has(annotation.line);
                        return (
                            <div key={index} className="border-l-4 border-blue-400 pl-3">
                                <button
                                    onClick={() => toggleLine(annotation.line)}
                                    className="flex items-center gap-2 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors cursor-pointer"
                                >
                                    <span className="font-mono text-xs bg-blue-200 px-2 py-0.5 rounded">
                                        {annotation.line}번째 줄
                                    </span>
                                    <span className={isExpanded ? 'rotate-90' : ''}>▶</span>
                                </button>
                                {isExpanded && (
                                    <p className="mt-2 text-sm text-blue-800 leading-relaxed">
                                        {annotation.comment}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AnnotatedCodeBlock;

