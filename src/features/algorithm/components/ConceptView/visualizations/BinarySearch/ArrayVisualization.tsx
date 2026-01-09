import type { AnimationState } from './types';

type ArrayVisualizationProps = {
  array: number[];
  target: number;
  animationState: AnimationState;
};

export const ArrayVisualization = ({ array, target, animationState }: ArrayVisualizationProps) => {
  return (
    <div className="space-y-6">
      {/* 타겟 값 표시 */}
      <div className="text-center">
        <span className="text-sm text-gray-600">찾는 값: </span>
        <span className="text-lg font-bold text-blue-600">{target}</span>
      </div>

      {/* 배열 시각화 */}
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
              className={`relative w-16 h-16 flex flex-col items-center justify-center rounded-lg border-2 font-mono font-bold text-lg transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${scale} shadow-md`}
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
              {/* 인덱스 표시 */}
              <div className="absolute -bottom-6 text-xs font-normal text-gray-500">
                [{index}]
              </div>
            </div>
          );
        })}
      </div>

      {/* 범위 정보 */}
      {animationState && animationState.left !== undefined && animationState.right !== undefined && (
        <div className="text-center text-sm text-gray-600">
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
