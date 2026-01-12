'use client';

import type { AnimationState } from './types';

type ArrayVisualizationProps = {
  array: (number | null)[];
  animationState: AnimationState;
};

export const ArrayVisualization = ({ array, animationState }: ArrayVisualizationProps) => {
  const keyValue = animationState?.keyValue ?? 0;
  const keyIndex = animationState?.keyIndex ?? -1;
  const showKey = animationState !== null && animationState.type !== 'sorted';
  
  const maxValue = Math.max(...array.filter((v): v is number => v !== null), 1);

  return (
    <div className="space-y-6">
      {/* 모바일: 막대바 형태 */}
      <div className="md:hidden space-y-4">
        <div className="flex items-end justify-center gap-1 min-h-[200px] px-2">
          {array.map((value, index) => {
            const isNull = value === null;
            
            // 상태별 스타일
            const isKeyPosition = keyIndex === index && animationState?.type === 'selecting';
            const isComparing = animationState?.comparingIndex === index && animationState?.type === 'comparing';
            const isShifting = animationState?.shiftingIndex === index && animationState?.type === 'shifting';
            const isInserting = keyIndex === index && animationState?.type === 'inserting';
            const isSorted = animationState?.type === 'sorted';

            let borderColor = 'border-gray-400';
            let bgColor = 'bg-gray-300';
            let textColor = 'text-gray-700';

            if (isNull) {
              borderColor = 'border-gray-200';
              bgColor = 'bg-gray-100';
              textColor = 'text-gray-400';
            } else if (isSorted) {
              borderColor = 'border-green-600';
              bgColor = 'bg-green-500';
              textColor = 'text-white';
            } else if (isInserting) {
              borderColor = 'border-purple-600';
              bgColor = 'bg-purple-500';
              textColor = 'text-white';
            } else if (isShifting) {
              borderColor = 'border-red-600';
              bgColor = 'bg-red-500';
              textColor = 'text-white';
            } else if (isComparing) {
              borderColor = 'border-yellow-600';
              bgColor = 'bg-yellow-500';
              textColor = 'text-gray-900';
            } else if (isKeyPosition) {
              borderColor = 'border-blue-600';
              bgColor = 'bg-blue-500';
              textColor = 'text-white';
            }

            const heightPercent = isNull ? 10 : (value / maxValue) * 100;

            return (
              <div
                key={`${index}-${value ?? 'null'}`}
                className="flex-1 flex flex-col items-center justify-end min-w-[24px] max-w-[48px]"
              >
                {/* 값 표시 (막대 위) */}
                <div className="text-xs font-bold text-gray-700 mb-1">
                  {isNull ? '빈' : value}
                </div>
                
                {/* 막대 */}
                <div
                  className={`relative w-full rounded-t border-2 transition-all duration-300 ${bgColor} ${borderColor} ${textColor} shadow-md flex items-center justify-center`}
                  style={{
                    height: `${Math.max(heightPercent, 10)}%`,
                    minHeight: isNull ? '20px' : '40px',
                  }}
                >
                  <span className="text-xs font-bold">{isNull ? '' : value}</span>
                </div>
                
                {/* 인덱스 표시 */}
                <div className="text-xs font-normal text-gray-500 mt-1">
                  [{index}]
                </div>
              </div>
            );
          })}
        </div>

        {/* key 값 별도 표시 영역 (모바일) */}
        <div className="flex justify-center pt-4">
          <div className="flex flex-col items-center w-full max-w-[120px]">
            <div className="text-xs font-semibold text-gray-600 mb-2">임시 저장 (key)</div>
            <div className="w-full">
              <div className="text-xs font-bold text-gray-700 mb-1 text-center">{showKey ? keyValue : 0}</div>
              <div
                className="w-full rounded-t border-2 border-blue-600 bg-blue-500 text-white font-bold text-sm shadow-lg flex items-center justify-center"
                style={{
                  height: showKey ? `${Math.max((keyValue / maxValue) * 100, 10)}%` : '40px',
                  minHeight: '40px',
                }}
              >
                <span style={{ opacity: showKey ? 1 : 0 }}>{showKey ? keyValue : 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 데스크톱: 블록 형태 */}
      <div className="hidden md:block space-y-6">
        <div className="flex flex-wrap items-end justify-center gap-3">
          {array.map((value, index) => {
            const isNull = value === null;
            const height = isNull ? 48 : 48 + value * 2;
            
            // 상태별 스타일
            const isKeyPosition = keyIndex === index && animationState?.type === 'selecting';
            const isComparing = animationState?.comparingIndex === index && animationState?.type === 'comparing';
            const isShifting = animationState?.shiftingIndex === index && animationState?.type === 'shifting';
            const isInserting = keyIndex === index && animationState?.type === 'inserting';
            const isSorted = animationState?.type === 'sorted';

            let borderColor = 'border-gray-300';
            let bgColor = 'bg-gray-50';
            let textColor = 'text-gray-900';

            if (isNull) {
              borderColor = 'border-gray-200';
              bgColor = 'bg-gray-100';
              textColor = 'text-gray-400';
            } else if (isSorted) {
              borderColor = 'border-green-500';
              bgColor = 'bg-green-100';
            } else if (isInserting) {
              borderColor = 'border-purple-500';
              bgColor = 'bg-purple-100';
            } else if (isShifting) {
              borderColor = 'border-red-500';
              bgColor = 'bg-red-100';
            } else if (isComparing) {
              borderColor = 'border-yellow-500';
              bgColor = 'bg-yellow-100';
            } else if (isKeyPosition) {
              borderColor = 'border-blue-500';
              bgColor = 'bg-blue-100';
            }

            return (
              <div key={`${index}-${value ?? 'null'}`} className="relative">
                <div
                  className={`relative w-16 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-lg shadow-md ${borderColor} ${bgColor} ${textColor}`}
                  style={{
                    height: `${height}px`,
                    minHeight: '48px',
                  }}
                >
                  <span 
                    className={isNull ? 'text-xs whitespace-nowrap' : ''}
                  >
                    {isNull ? '빈칸' : value}
                  </span>
                  {/* 인덱스 표시 */}
                  <div className="absolute -bottom-6 text-xs font-normal text-gray-500">
                    [{index}]
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* key 값 별도 표시 영역 (데스크톱) */}
        <div className="flex justify-center" style={{ minHeight: '80px' }}>
          <div className="flex flex-col items-center">
            <div className="text-xs font-semibold text-gray-600 mb-2">임시 저장 (key)</div>
            <div
              className="w-16 flex items-center justify-center rounded-lg border-2 border-blue-500 bg-blue-400 text-white font-mono font-bold text-lg shadow-lg"
              style={{
                height: showKey ? `${48 + keyValue * 2}px` : '48px',
                minHeight: '48px',
              }}
            >
              <span style={{ opacity: showKey ? 1 : 0 }}>{showKey ? keyValue : 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
