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
    // 초기값을 항상 'default'로 설정하여 서버와 클라이언트에서 동일하게 렌더링
    // localStorage는 useEffect에서만 읽어서 hydration mismatch 방지
    const [viewMode, setViewMode] = useState<ViewMode>('default');
    const prevConceptIdRef = useRef(concept.id);
    const isInitialMount = useRef(true);

    // 클라이언트에서만 localStorage 읽기 (hydration mismatch 방지)
    useEffect(() => {
        // 초기 마운트 시 localStorage에서 값 읽기
        if (isInitialMount.current) {
            isInitialMount.current = false;
            const savedView = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
            const validViews: ViewMode[] = hasVisualization(concept.id)
                ? ['default', 'compact', 'codeFirst', 'visual']
                : ['default', 'compact', 'codeFirst'];
            
            if (savedView && validViews.includes(savedView)) {
                setViewMode(savedView);
            }
        }

        // concept.id가 변경되었을 때 뷰 모드 업데이트
        if (prevConceptIdRef.current !== concept.id) {
            prevConceptIdRef.current = concept.id;
            const savedView = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
            const validViews: ViewMode[] = hasVisualization(concept.id)
                ? ['default', 'compact', 'codeFirst', 'visual']
                : ['default', 'compact', 'codeFirst'];
            
            if (savedView && validViews.includes(savedView)) {
                setViewMode(savedView);
            } else {
                setViewMode('default');
            }
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

