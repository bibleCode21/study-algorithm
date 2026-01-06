import type { AnimationState } from './types';

type ArrayVisualizationProps = {
  array: number[];
  animationState: AnimationState;
};

export const ArrayVisualization = ({ array, animationState }: ArrayVisualizationProps) => {
  return (
    <div className="flex flex-wrap items-end justify-center gap-3 min-h-[200px]">
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
  );
};
