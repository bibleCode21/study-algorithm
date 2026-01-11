'use client';

import type { AnimationState } from './types';

type ArrayVisualizationProps = {
  array: number[];
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
          const height = 48 + value * 2;
          const isKeyPosition = keyIndex === index && animationState?.type === 'selecting';

          return (
            <div key={`${index}-${value}`} className="relative">
              <div
                className="relative w-16 flex items-center justify-center rounded-lg border-2 border-gray-300 font-mono font-bold text-lg bg-gray-50 text-gray-900 shadow-md"
                style={{
                  height: `${height}px`,
                  minHeight: '48px',
                }}
              >
                <span>{value}</span>
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
