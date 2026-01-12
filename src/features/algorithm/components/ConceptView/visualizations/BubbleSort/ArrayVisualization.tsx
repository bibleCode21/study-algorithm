import type { AnimationState } from './types';

type ArrayVisualizationProps = {
  array: number[];
  animationState: AnimationState;
};

export const ArrayVisualization = ({ array, animationState }: ArrayVisualizationProps) => {
  const maxValue = Math.max(...array, 1);
  
  return (
    <div className="space-y-4">
      {/* 모바일: 막대바 형태 */}
      <div className="flex items-end justify-center gap-1 md:hidden min-h-[200px] px-2">
        {array.map((value, index) => {
          let bgColor = 'bg-gray-400';
          let borderColor = 'border-gray-500';
          let textColor = 'text-white';
          let scale = 'scale-100';

          if (animationState) {
            if (animationState.type === 'comparing' && animationState.indices.includes(index)) {
              bgColor = 'bg-yellow-500';
              borderColor = 'border-yellow-600';
              textColor = 'text-gray-900';
              scale = 'scale-105';
            } else if (
              animationState.type === 'swapping' &&
              animationState.indices.includes(index)
            ) {
              bgColor = 'bg-red-600';
              borderColor = 'border-red-700';
              textColor = 'text-white';
              scale = 'scale-105';
            } else if (animationState.type === 'sorted') {
              bgColor = 'bg-green-500';
              borderColor = 'border-green-600';
              textColor = 'text-white';
            }
          }

          const heightPercent = (value / maxValue) * 100;

          return (
            <div
              key={`${index}-${value}`}
              className="flex-1 flex flex-col items-center justify-end min-w-[24px] max-w-[48px]"
            >
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

      {/* 데스크톱: 블록 형태 */}
      <div className="hidden md:flex md:flex-wrap md:items-end md:justify-center md:gap-3 min-h-[200px]">
        {array.map((value, index) => {
          let bgColor = 'bg-gray-50';
          let borderColor = 'border-gray-300';
          let textColor = 'text-gray-900';
          let scale = 'scale-100';

          if (animationState) {
            if (animationState.type === 'comparing' && animationState.indices.includes(index)) {
              bgColor = 'bg-yellow-400';
              borderColor = 'border-yellow-500';
              textColor = 'text-gray-900';
              scale = 'scale-110';
            } else if (
              animationState.type === 'swapping' &&
              animationState.indices.includes(index)
            ) {
              bgColor = 'bg-red-500';
              borderColor = 'border-red-600';
              textColor = 'text-white';
              scale = 'scale-110';
            } else if (animationState.type === 'sorted') {
              bgColor = 'bg-green-400';
              borderColor = 'border-green-500';
              textColor = 'text-gray-900';
            }
          }

          return (
            <div
              key={`${index}-${value}`}
              className={`relative w-16 h-16 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-lg transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${scale} shadow-md`}
              style={{
                height: `${48 + value * 2}px`,
                minHeight: '48px',
              }}
            >
              <span className="z-10">{value}</span>
              {/* 인덱스 표시 */}
              <div className="absolute -bottom-6 text-xs font-normal text-gray-500">
                [{index}]
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
