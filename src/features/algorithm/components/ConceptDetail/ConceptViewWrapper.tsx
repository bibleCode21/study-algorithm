'use client';

import { useEffect, useRef, useState } from 'react';
import { Concept } from '@/features/algorithm/types/algorithm';
import { CodeExample } from '@/features/algorithm/types/algorithm';
import { ViewMode } from '@/features/algorithm/types/components';
import ViewSwitcher from '@/features/algorithm/components/ViewSwitcher';
import ConceptView from '@/features/algorithm/components/ConceptView';
import { hasVisualization } from '@/features/algorithm/components/ConceptView/visualizations';

interface ConceptViewWrapperProps {
    concept: Concept;
    codeExamples: (CodeExample & { highlightedHtml: string })[];
}

const STORAGE_KEY = 'concept-view-mode';

const ConceptViewWrapper = ({ concept, codeExamples }: ConceptViewWrapperProps) => {
    // 초기 뷰 모드를 로컬 스토리지에서 가져오기
    const getInitialViewMode = (): ViewMode => {
        if (typeof window === 'undefined') return 'default';
        const savedView = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
        const validViews: ViewMode[] = hasVisualization(concept.id)
            ? ['default', 'compact', 'codeFirst', 'visual']
            : ['default', 'compact', 'codeFirst'];
        if (savedView && validViews.includes(savedView)) {
            return savedView;
        }
        return 'default';
    };

    const [viewMode, setViewMode] = useState<ViewMode>(() => getInitialViewMode());
    const prevConceptIdRef = useRef(concept.id);

    // concept.id가 변경될 때 뷰 모드 업데이트
    // useLayoutEffect를 사용하여 동기적으로 처리하되, 조건부로만 실행
    useEffect(() => {
        // concept.id가 변경되었을 때만 뷰 모드 업데이트
        if (prevConceptIdRef.current !== concept.id) {
            prevConceptIdRef.current = concept.id;
            const savedView = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
            const validViews: ViewMode[] = hasVisualization(concept.id)
                ? ['default', 'compact', 'codeFirst', 'visual']
                : ['default', 'compact', 'codeFirst'];
            
            // 상태 업데이트를 다음 렌더 사이클로 지연 (동기 호출 방지)
            requestAnimationFrame(() => {
                if (savedView && validViews.includes(savedView)) {
                    setViewMode(savedView);
                } else {
                    setViewMode('default');
                }
            });
        }
    }, [concept.id]);

    // 뷰 모드 변경 시 로컬 스토리지에 저장
    const handleViewChange = (view: ViewMode) => {
        setViewMode(view);
        localStorage.setItem(STORAGE_KEY, view);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end mb-4">
                <ViewSwitcher 
                    currentView={viewMode} 
                    onViewChange={handleViewChange} 
                    conceptId={concept.id}
                />
            </div>
            <ConceptView concept={concept} codeExamples={codeExamples} viewMode={viewMode} />
        </div>
    );
};

export default ConceptViewWrapper;

