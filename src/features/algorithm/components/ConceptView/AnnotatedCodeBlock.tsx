'use client';

import { useState, useRef, useEffect } from 'react';
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
    const [selectedLine, setSelectedLine] = useState<number | null>(null);
    const codeContainerRef = useRef<HTMLDivElement>(null);
    const annotationPanelRef = useRef<HTMLDivElement>(null);

    // 코드나 annotations가 변경될 때 해석 패널 스크롤을 맨 위로 초기화
    useEffect(() => {
        if (annotationPanelRef.current) {
            annotationPanelRef.current.scrollTop = 0;
        }
    }, [code, annotations]);

    const toggleLine = (line: number) => {
        const newExpanded = new Set(expandedLines);
        if (newExpanded.has(line)) {
            newExpanded.delete(line);
        } else {
            newExpanded.add(line);
        }
        setExpandedLines(newExpanded);
    };

    const scrollToLine = (line: number) => {
        setSelectedLine(line);
        // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 찾기
        setTimeout(() => {
            if (codeContainerRef.current) {
                const lineElement = codeContainerRef.current.querySelector(
                    `[data-line-number="${line}"]`
                );
                if (lineElement) {
                    lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // 하이라이트 효과를 위한 클래스 추가
                    const lineContent = lineElement as HTMLElement;
                    lineContent.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
                    lineContent.style.transition = 'background-color 0.3s';
                    setTimeout(() => {
                        lineContent.style.backgroundColor = '';
                    }, 2000);
                }
            }
        }, 100);
    };

    const hasAnnotations = annotations.length > 0;

    if (!hasAnnotations) {
        // 주석이 없으면 일반 코드 블록 표시
        return <CodeBlockClient language={language} code={code} highlightedHtml={highlightedHtml} />;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* 코드 블록 - PC에서는 왼쪽, 모바일에서는 위 */}
            <div className="flex-1 lg:flex-[1.2] min-w-0" ref={codeContainerRef}>
                <CodeBlockClient language={language} code={code} highlightedHtml={highlightedHtml} />
            </div>

            {/* 해석 패널 - PC에서는 오른쪽, 모바일에서는 아래 */}
            <div className="lg:flex-1 lg:max-w-lg">
                <div 
                    ref={annotationPanelRef}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:sticky lg:top-16 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto"
                >
                    <h3 className="text-sm font-semibold text-blue-900 mb-3">코드 해석</h3>
                    <div className="space-y-3">
                        {annotations.map((annotation, index) => {
                            const isExpanded = expandedLines.has(annotation.line);
                            return (
                                <div
                                    key={index}
                                    className={`border-l-4 border-blue-400 pl-3 transition-all rounded ${
                                        selectedLine === annotation.line
                                            ? 'bg-blue-100 border-blue-600'
                                            : ''
                                    } ${isExpanded ? 'py-2 mb-4' : ''}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => scrollToLine(annotation.line)}
                                            className="font-mono text-xs bg-blue-200 hover:bg-blue-300 px-2 py-0.5 rounded transition-colors cursor-pointer"
                                            title="해당 줄로 이동"
                                        >
                                            {annotation.line}번째 줄
                                        </button>
                                        <button
                                            onClick={() => toggleLine(annotation.line)}
                                            className="flex items-center gap-1 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors cursor-pointer"
                                        >
                                            <span
                                                className={`inline-block transition-transform ${
                                                    isExpanded ? 'rotate-90' : ''
                                                }`}
                                            >
                                                ▶
                                            </span>
                                        </button>
                                    </div>
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
        </div>
    );
};

export default AnnotatedCodeBlock;

