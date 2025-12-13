'use client';

import { useEffect, useState } from 'react';
import { Concept } from '@/features/algorithm/types/algorithm';
import { CodeExample } from '@/features/algorithm/types/algorithm';
import { ViewMode } from '@/features/algorithm/types/components';
import ViewSwitcher from '@/features/algorithm/components/ViewSwitcher';
import ConceptView from '@/features/algorithm/components/ConceptView';

interface ConceptViewWrapperProps {
    concept: Concept;
    codeExamples: (CodeExample & { highlightedHtml: string })[];
}

const STORAGE_KEY = 'concept-view-mode';

export default function ConceptViewWrapper({ concept, codeExamples }: ConceptViewWrapperProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('default');

  // 로컬 스토리지에서 저장된 뷰 모드 불러오기
  useEffect(() => {
    const savedView = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
    if (savedView && ['default', 'compact', 'codeFirst'].includes(savedView)) {
      setViewMode(savedView);
    }
  }, []);

    // 뷰 모드 변경 시 로컬 스토리지에 저장
    const handleViewChange = (view: ViewMode) => {
        setViewMode(view);
        localStorage.setItem(STORAGE_KEY, view);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end mb-4">
                <ViewSwitcher currentView={viewMode} onViewChange={handleViewChange} />
            </div>
            <ConceptView concept={concept} codeExamples={codeExamples} viewMode={viewMode} />
        </div>
    );
}

