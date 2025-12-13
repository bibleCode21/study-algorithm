'use client';

import { ViewSwitcherProps } from '@/features/algorithm/types/components';

const viewOptions: { value: ViewSwitcherProps['currentView']; label: string; icon: string }[] = [
    { value: 'default', label: '기본', icon: '📄' },
    { value: 'compact', label: '컴팩트', icon: '📋' },
    { value: 'codeFirst', label: '코드 중심', icon: '💻' },
];

export default function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
    return (
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
            {viewOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onViewChange(option.value)}
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentView === option.value
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
}

