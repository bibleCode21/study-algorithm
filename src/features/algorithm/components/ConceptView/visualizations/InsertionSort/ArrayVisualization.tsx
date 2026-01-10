import type { AnimationState } from './types';

type ArrayVisualizationProps = {
  array: number[];
  animationState: AnimationState;
};

export const ArrayVisualization = ({ array, animationState }: ArrayVisualizationProps) => {

  const keyIndex = animationState?.keyIndex;
  const keyValue = animationState?.keyValue;
  const comparingIndex = animationState?.comparingIndex;
  const movingIndex = animationState?.movingIndex;
  const sortedRange = animationState?.sortedRange;

  // key가 있는 경우 key 위치는 비워둠 (시각적으로)
  // 서버와 클라이언트에서 동일한 렌더링을 보장하기 위해 animationState가 null이 아닐 때만 처리
  const displayArray = [...array];
  const isKeyExtracted = 
    animationState !== null &&
    keyIndex !== undefined && 
    keyValue !== undefined && 
    (animationState.type === 'key' || animationState.type === 'comparing' || animationState.type === 'moving');

  return (
    <div className="space-y-6">
      {/* key 값 별도 표시 영역 */}
      {isKeyExtracted && keyValue !== undefined && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <div className="text-xs font-semibold text-gray-600 mb-2">임시 저장 (key)</div>
            <div
              className="w-16 flex items-center justify-center rounded-lg border-2 border-blue-500 bg-blue-400 text-white font-mono font-bold text-lg shadow-lg"
              style={{
                height: `${48 + keyValue * 2}px`,
                minHeight: '48px',
              }}
            >
              <span>{keyValue}</span>
            </div>
          </div>
        </div>
      )}

      {/* 배열 표시 */}
      <div className="flex flex-wrap items-end justify-center gap-3 min-h-[200px]">
        {displayArray.map((value, index) => {
          // key 위치이고 key가 추출된 상태면 투명하게 표시
          const isKeyPosition = keyIndex === index && isKeyExtracted;
          
          let bgColor = 'bg-gray-50';
          let borderColor = 'border-gray-300';
          let textColor = 'text-gray-900';
          let scale = 'scale-100';
          let opacity = 'opacity-100';
          let borderStyle = 'border-solid';

          if (animationState) {
            // 정렬된 부분 표시
            if (sortedRange) {
              const [start, end] = sortedRange;
              if (index >= start && index <= end) {
                bgColor = 'bg-green-100';
                borderColor = 'border-green-300';
              }
            } else if (keyIndex !== undefined && index < keyIndex) {
              // keyIndex 이전은 정렬된 부분
              bgColor = 'bg-green-100';
              borderColor = 'border-green-300';
            }

            if (isKeyPosition) {
              // key 위치는 비워둠 (투명하게)
              bgColor = 'bg-gray-100';
              borderColor = 'border-gray-300';
              borderStyle = 'border-dashed';
              opacity = 'opacity-40';
            } else if (animationState.type === 'comparing') {
              if (comparingIndex === index) {
                // 비교 중인 요소
                bgColor = 'bg-yellow-400';
                borderColor = 'border-yellow-500';
                textColor = 'text-gray-900';
                scale = 'scale-110';
              }
            } else if (animationState.type === 'moving') {
              if (movingIndex === index) {
                // 이동 중인 요소 (원래 위치)
                bgColor = 'bg-red-500';
                borderColor = 'border-red-600';
                textColor = 'text-white';
                scale = 'scale-110';
              }
              // key 위치는 isKeyPosition에서 이미 처리됨 (비워둠)
            } else if (animationState.type === 'inserting') {
              if (keyIndex === index) {
                // 삽입 중
                bgColor = 'bg-purple-500';
                borderColor = 'border-purple-600';
                textColor = 'text-white';
                scale = 'scale-110';
              }
            } else if (animationState.type === 'sorted') {
              bgColor = 'bg-green-400';
              borderColor = 'border-green-500';
              textColor = 'text-gray-900';
            }
          }

          return (
            <div key={`${index}-${value}`} className="relative">
            <div
              className={`relative w-16 flex items-center justify-center rounded-lg border-2 ${borderStyle} font-mono font-bold text-lg transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${scale} ${opacity} shadow-md`}
              style={{
                height: isKeyPosition ? '48px' : `${48 + value * 2}px`,
                minHeight: '48px',
              }}
            >
              {!isKeyPosition && <span className="z-10">{value}</span>}
              {isKeyPosition && (
                <span className="z-10 text-gray-400 text-sm">비어있음</span>
              )}
              {/* 인덱스 표시 */}
              <div className="absolute -bottom-6 text-xs font-normal text-gray-500">
                [{index}]
              </div>
            </div>
            </div>
          );
        })}
      </div>

      {/* 정렬된 부분 표시 */}
      {animationState !== null && typeof keyIndex === 'number' && keyIndex > 0 && (
        <div className="text-center text-xs text-gray-500">
          <span className="text-green-600 font-semibold">정렬된 부분</span> (인덱스 0 ~ {keyIndex - 1})
        </div>
      )}
    </div>
  );
};
