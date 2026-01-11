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

  return (
    <div className="space-y-6">
      {/* 배열 표시 */}
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

      {/* key 값 별도 표시 영역 */}
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
  );
};
