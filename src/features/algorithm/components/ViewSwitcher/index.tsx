'use client';

import { ViewSwitcherProps } from '@/features/algorithm/types/components';
import { hasVisualization } from '../ConceptView/visualizations';

const baseViewOptions: { value: ViewSwitcherProps['currentView']; label: string; icon: string }[] = [
    { value: 'default', label: '개념 설명', icon: '📄' },
    { value: 'compact', label: '컴팩트', icon: '📋' },
    { value: 'codeFirst', label: '코드 예제', icon: '💻' },
];

const visualViewOption = { value: 'visual' as const, label: '시각화', icon: '🎨' };

const ViewSwitcher = ({ currentView, onViewChange, conceptId }: ViewSwitcherProps) => {
    // 시각화가 있는 개념일 때만 visual 옵션 추가
    const viewOptions = conceptId && hasVisualization(conceptId)
        ? [...baseViewOptions, visualViewOption]
        : baseViewOptions;

    return (
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
            {viewOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onViewChange(option.value)}
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${currentView === option.value
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    aria-label={`${option.label} 뷰로 전환`}
                    aria-pressed={currentView === option.value}
                >
                    <span>{option.icon}</span>
                    <span className="hidden sm:inline">{option.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ViewSwitcher;

