import type { AnimationState } from './types';

type ArrayVisualizationProps = {
  array: number[];
  target: number;
  animationState: AnimationState;
};

export const ArrayVisualization = ({ array, target, animationState }: ArrayVisualizationProps) => {
  const maxValue = Math.max(...array, 1);
  
  return (
    <div className="space-y-6">
      {/* 타겟 값 표시 */}
      <div className="text-center">
        <span className="text-sm text-gray-600">찾는 값: </span>
        <span className="text-lg font-bold text-blue-600">{target}</span>
      </div>

      {/* 모바일: 막대바 형태 */}
      <div className="md:hidden space-y-4">
        <div className="flex items-end justify-center gap-1 min-h-[200px] px-2">
          {array.map((value, index) => {
            let bgColor = 'bg-gray-400';
            let borderColor = 'border-gray-500';
            let textColor = 'text-white';
            let scale = 'scale-100';
            let label = '';

            if (animationState) {
              // left 인덱스
              if (animationState.left === index) {
                bgColor = 'bg-blue-500';
                borderColor = 'border-blue-600';
                label = 'L';
              }
              // right 인덱스
              if (animationState.right === index) {
                bgColor = 'bg-red-500';
                borderColor = 'border-red-600';
                label = label ? 'L/R' : 'R';
              }
              // mid 인덱스
              if (animationState.mid === index) {
                if (animationState.type === 'found') {
                  bgColor = 'bg-green-500';
                  borderColor = 'border-green-600';
                  textColor = 'text-white';
                  label = '✓';
                } else if (animationState.type === 'not-found') {
                  bgColor = 'bg-gray-500';
                  borderColor = 'border-gray-600';
                  textColor = 'text-white';
                } else {
                  bgColor = 'bg-yellow-500';
                  borderColor = 'border-yellow-600';
                  label = label ? `${label}/M` : 'M';
                }
                scale = 'scale-105';
              }
            }

            // 탐색 범위 밖의 요소는 흐리게
            if (animationState && animationState.left !== undefined && animationState.right !== undefined) {
              if (index < animationState.left || index > animationState.right) {
                bgColor = 'bg-gray-200';
                borderColor = 'border-gray-300';
                textColor = 'text-gray-500';
              }
            }

            const heightPercent = (value / maxValue) * 100;

            return (
              <div
                key={`${index}-${value}`}
                className="flex-1 flex flex-col items-center justify-end min-w-[24px] max-w-[48px]"
              >
                {/* 라벨 표시 (막대 위) */}
                {label && (
                  <div className="text-xs font-semibold text-gray-700 mb-1 bg-white px-1 rounded">
                    {label}
                  </div>
                )}
                
                {/* 값 표시 (막대 위) */}
                <div className="text-xs font-bold text-gray-700 mb-1">{value}</div>
                
                {/* 막대 */}
                <div
                  className={`relative w-full rounded-t border-2 transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${scale} shadow-md flex items-center justify-center`}
                  style={{
                    height: `${Math.max(heightPercent, 10)}%`,
                    minHeight: '40px',
                  }}
                >
                  <span className="text-xs font-bold">{value}</span>
                </div>
                
                {/* 인덱스 표시 */}
                <div className="text-xs font-normal text-gray-500 mt-1">
                  [{index}]
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 데스크톱: 블록 형태 */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="flex flex-wrap items-end justify-center gap-3 min-h-[200px]">
            {array.map((value, index) => {
              let bgColor = 'bg-gray-50';
              let borderColor = 'border-gray-300';
              let textColor = 'text-gray-900';
              let scale = 'scale-100';
              let label = '';

              if (animationState) {
                // left 인덱스
                if (animationState.left === index) {
                  bgColor = 'bg-blue-200';
                  borderColor = 'border-blue-400';
                  label = 'L';
                }
                // right 인덱스
                if (animationState.right === index) {
                  bgColor = 'bg-red-200';
                  borderColor = 'border-red-400';
                  label = label ? 'L/R' : 'R';
                }
                // mid 인덱스
                if (animationState.mid === index) {
                  if (animationState.type === 'found') {
                    bgColor = 'bg-green-400';
                    borderColor = 'border-green-600';
                    textColor = 'text-white';
                    label = '✓';
                  } else if (animationState.type === 'not-found') {
                    bgColor = 'bg-gray-400';
                    borderColor = 'border-gray-600';
                    textColor = 'text-white';
                  } else {
                    bgColor = 'bg-yellow-400';
                    borderColor = 'border-yellow-600';
                    label = label ? `${label}/M` : 'M';
                  }
                  scale = 'scale-110';
                }
              }

              // 탐색 범위 밖의 요소는 흐리게
              if (animationState && animationState.left !== undefined && animationState.right !== undefined) {
                if (index < animationState.left || index > animationState.right) {
                  bgColor = 'bg-gray-100';
                  borderColor = 'border-gray-200';
                  textColor = 'text-gray-400';
                }
              }

              return (
                <div
                  key={`${index}-${value}`}
                  className={`relative w-16 flex flex-col items-center justify-center rounded-lg border-2 font-mono font-bold text-lg transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${scale} shadow-md`}
                  style={{
                    height: `${48 + value * 2}px`,
                    minHeight: '48px',
                  }}
                >
                  <span className="z-10">{value}</span>
                  {label && (
                    <span className="absolute -top-6 text-xs font-semibold text-gray-700 bg-white px-1 rounded">
                      {label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {/* 인덱스 표시 - 동일한 라인에 정렬 */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {array.map((value, index) => (
              <div key={`index-${index}`} className="w-16 flex justify-center">
                <span className="text-xs font-normal text-gray-500">[{index}]</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 범위 정보 */}
      {animationState && animationState.left !== undefined && animationState.right !== undefined && (
        <div className="text-center text-sm text-gray-600 mt-6">
          탐색 범위: [{animationState.left}] ~ [{animationState.right}]
          {animationState.mid !== undefined && (
            <span className="ml-2">
              (중간값: [{animationState.mid}] = {array[animationState.mid]})
            </span>
          )}
        </div>
      )}
    </div>
  );
};
