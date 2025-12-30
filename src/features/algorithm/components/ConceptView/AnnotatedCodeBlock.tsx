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
    const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
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

    // 컴포넌트 unmount 시 모든 타이머 정리
    useEffect(() => {
        return () => {
            timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
            timeoutRefs.current.clear();
        };
    }, []);

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

    // 부드러운 스크롤 애니메이션 함수
    const smoothScrollTo = (targetY: number, duration: number = 600) => {
        const startY = window.scrollY || window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();

        const easeInOutCubic = (t: number): number => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + distance * eased);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    // 라인 요소 찾기
    const findLineElement = (codeBlock: Element, line: number): HTMLElement | null => {
        const allLineElements = codeBlock.querySelectorAll('[data-line-number]');
        
        // 정확히 해당 라인 번호를 가진 최상위 요소 찾기
        for (let i = 0; i < allLineElements.length; i++) {
            const el = allLineElements[i] as HTMLElement;
            const lineNum = el.getAttribute('data-line-number');
            if (lineNum === String(line)) {
                const parent = el.parentElement;
                if (!parent || !parent.classList.contains('line')) {
                    return el;
                }
            }
        }
        
        // 최상위를 찾지 못했다면 첫 번째로 찾은 요소 사용
        return codeBlock.querySelector(`[data-line-number="${line}"]`) as HTMLElement;
    };

    // 라인 요소로 스크롤
    const scrollToLineElement = (lineElement: HTMLElement) => {
        const headerHeight = 80;
        const elementRect = lineElement.getBoundingClientRect();
        const currentScrollY = window.scrollY || window.pageYOffset;
        const targetScrollY = currentScrollY + elementRect.top - headerHeight;
        smoothScrollTo(targetScrollY, 600);
    };

    // 라인 하이라이트
    const highlightLine = (lineElement: HTMLElement, codeBlock: Element) => {
        // 모든 라인에서 기존 하이라이트 제거
        const allLineElements = codeBlock.querySelectorAll('[data-line-number]');
        allLineElements.forEach((el) => {
            (el as HTMLElement).style.backgroundColor = '';
        });

        const nestedLines = lineElement.querySelectorAll('[data-line-number]');
        const firstChild = lineElement.children[0] as HTMLElement;
        const secondChild = lineElement.children[1] as HTMLElement;

        if (firstChild && secondChild) {
            // 첫 번째 줄 높이 계산
            const firstChildRect = firstChild.getBoundingClientRect();
            const secondChildRect = secondChild.getBoundingClientRect();
            const firstLineHeight = Math.max(firstChildRect.height, secondChildRect.height);

            // lineElement를 relative로 설정
            const originalPosition = lineElement.style.position;
            lineElement.style.position = 'relative';

            // 하이라이트 overlay 생성
            const highlightOverlay = document.createElement('div');
            highlightOverlay.style.cssText = `
                position: absolute;
                top: 0;
                width: 100%;
                height: ${firstLineHeight}px;
                background-color: rgba(59, 130, 246, 0.3);
                pointer-events: none;
                z-index: 10;
            `;
            highlightOverlay.setAttribute('data-highlight-overlay', 'true');
            lineElement.appendChild(highlightOverlay);

            // 중첩된 line 요소들의 배경색 제거
            nestedLines.forEach((nested) => {
                if (nested !== lineElement) {
                    (nested as HTMLElement).style.backgroundColor = '';
                    (nested as HTMLElement).style.background = '';
                }
            });

            // 1.5초 후 하이라이트 제거
            const timeoutId = setTimeout(() => {
                highlightOverlay.remove();
                lineElement.style.position = originalPosition;
                timeoutRefs.current.delete(timeoutId);
            }, 1500);
            timeoutRefs.current.add(timeoutId);
        } else {
            // fallback: 기존 방식
            lineElement.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
            lineElement.style.transition = 'background-color 0.3s';
            lineElement.setAttribute('data-highlighted', 'true');

            nestedLines.forEach((nested) => {
                if (nested !== lineElement) {
                    (nested as HTMLElement).style.backgroundColor = '';
                }
            });

            const timeoutId = setTimeout(() => {
                lineElement.style.backgroundColor = '';
                lineElement.removeAttribute('data-highlighted');
                timeoutRefs.current.delete(timeoutId);
            }, 1500);
            timeoutRefs.current.add(timeoutId);
        }
    };

    // 해석 패널 스크롤
    const scrollAnnotationPanel = (line: number) => {
        if (!annotationPanelRef.current) return;

        const annotationItem = annotationPanelRef.current.querySelector(
            `[data-annotation-line="${line}"]`
        ) as HTMLElement;

        if (annotationItem) {
            const panelRect = annotationPanelRef.current.getBoundingClientRect();
            const itemRect = annotationItem.getBoundingClientRect();
            const itemTop = itemRect.top - panelRect.top + annotationPanelRef.current.scrollTop;

            annotationPanelRef.current.scrollTo({
                top: itemTop - 20,
                behavior: 'smooth'
            });
        }
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
        
        // DOM이 완전히 렌더링된 후 실행
        const timeoutId = setTimeout(() => {
            if (!codeContainerRef.current) {
                timeoutRefs.current.delete(timeoutId);
                return;
            }

            const codeBlock = codeContainerRef.current.querySelector('div[class*="overflow-x-auto"]');
            if (!codeBlock) {
                timeoutRefs.current.delete(timeoutId);
                return;
            }

            const lineElement = findLineElement(codeBlock, line);
            if (!lineElement) {
                timeoutRefs.current.delete(timeoutId);
                return;
            }

            scrollToLineElement(lineElement);
            highlightLine(lineElement, codeBlock);
            scrollAnnotationPanel(line);
            timeoutRefs.current.delete(timeoutId);
        }, 100);
        timeoutRefs.current.add(timeoutId);
    };

    const hasAnnotations = annotations.length > 0;

    if (!hasAnnotations) {
        // 주석이 없으면 일반 코드 블록 표시
        return <CodeBlockClient language={language} code={code} highlightedHtml={highlightedHtml} />;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4">
                {/* 코드 블록 - PC에서는 왼쪽, 모바일에서는 위 */}
                <div className="flex-1 lg:flex-[1.8] min-w-0" ref={codeContainerRef}>
                    <CodeBlockClient language={language} code={code} highlightedHtml={highlightedHtml} />
                </div>

            {/* 해석 패널 - PC에서는 오른쪽, 모바일에서는 아래 */}
            <div className="lg:flex-1 lg:max-w-md">
                <div 
                    ref={annotationPanelRef}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:sticky lg:top-16 lg:overflow-y-auto max-h-[60vh] overflow-y-auto mb-4 lg:mb-0"
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

