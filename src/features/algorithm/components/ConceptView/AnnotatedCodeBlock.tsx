'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
    const pathname = usePathname();

    // 코드나 annotations가 변경될 때 해석 패널 스크롤을 맨 위로 초기화
    useEffect(() => {
        if (annotationPanelRef.current) {
            annotationPanelRef.current.scrollTop = 0;
        }
    }, [code, annotations]);

    // 코드, annotations, 또는 경로가 변경될 때 확장된 줄과 선택된 줄 초기화
    useEffect(() => {
        setExpandedLines(new Set());
        setSelectedLine(null);
    }, [code, annotations, pathname]);

    // 코드 블록의 높이에 맞춰 해석 패널의 높이 조정
    useEffect(() => {
        const updatePanelHeight = () => {
            if (codeContainerRef.current && annotationPanelRef.current) {
                const codeBlock = codeContainerRef.current.querySelector('div[class*="bg-gray-900"]');
                if (codeBlock) {
                    const codeHeight = codeBlock.getBoundingClientRect().height;
                    const viewportHeight = window.innerHeight;
                    const topOffset = 64; // lg:top-16 = 64px
                    
                    // 코드 블록 높이에 맞춰 해석 패널 높이 설정
                    // 최소한 뷰포트 높이만큼은 보장하되, 코드 블록이 길면 그에 맞춰 높이 설정
                    // 단, 뷰포트를 넘지 않도록 제한 (sticky 유지)
                    const calculatedHeight = Math.min(
                        Math.max(codeHeight, viewportHeight - topOffset - 32),
                        viewportHeight - topOffset
                    );
                    
                    annotationPanelRef.current.style.maxHeight = `${calculatedHeight}px`;
                }
            }
        };

        // 초기 설정
        const timeoutId = setTimeout(updatePanelHeight, 100);

        // 리사이즈 이벤트 리스너
        window.addEventListener('resize', updatePanelHeight);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updatePanelHeight);
        };
    }, [code, highlightedHtml]);


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
        
        // 해당 라인의 해석을 자동으로 열거나 닫기
        const newExpanded = new Set(expandedLines);
        if (newExpanded.has(line)) {
            newExpanded.delete(line);
        } else {
            newExpanded.add(line);
        }
        setExpandedLines(newExpanded);
        
        // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 찾기
        setTimeout(() => {
            // 코드 블록에서 해당 라인으로 스크롤
            if (codeContainerRef.current) {
                // CodeBlockClient 내부의 실제 코드 컨테이너를 찾기
                const codeBlock = codeContainerRef.current.querySelector('div[class*="overflow-x-auto"]');
                if (codeBlock) {
                    const lineElement = codeBlock.querySelector(
                        `[data-line-number="${line}"]`
                    ) as HTMLElement;
                    if (lineElement) {
                        // Header 높이 계산 (h-16 = 64px, 추가 여백 포함)
                        const headerHeight = 80; // Header 높이 + 여백
                        
                        // 요소의 현재 위치 계산
                        const elementRect = lineElement.getBoundingClientRect();
                        const currentScrollY = window.scrollY || window.pageYOffset;
                        
                        // Header 아래에 보이도록 스크롤 위치 계산
                        const targetScrollY = currentScrollY + elementRect.top - headerHeight;
                        
                        // 스크롤 실행
                        window.scrollTo({
                            top: targetScrollY,
                            behavior: 'smooth'
                        });
                        
                        // 하이라이트 효과를 위한 클래스 추가
                        lineElement.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
                        lineElement.style.transition = 'background-color 0.3s';
                        setTimeout(() => {
                            lineElement.style.backgroundColor = '';
                        }, 2000);
                    }
                }
            }
            
            // 해석 패널에서도 해당 항목으로 스크롤
            if (annotationPanelRef.current) {
                const annotationItem = annotationPanelRef.current.querySelector(
                    `[data-annotation-line="${line}"]`
                ) as HTMLElement;
                if (annotationItem) {
                    annotationItem.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest',
                        inline: 'nearest'
                    });
                }
            }
        }, 150);
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
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:sticky lg:top-16 lg:overflow-y-auto"
                >
                    <h3 className="text-sm font-semibold text-blue-900 mb-3">코드 해석</h3>
                    <div className="space-y-3">
                        {annotations.map((annotation, index) => {
                            const isExpanded = expandedLines.has(annotation.line);
                            return (
                                <div
                                    key={index}
                                    data-annotation-line={annotation.line}
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

