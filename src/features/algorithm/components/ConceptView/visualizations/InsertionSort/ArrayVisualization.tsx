import type { AnimationState } from './types';

type ArrayVisualizationProps = {
  array: number[];
  animationState: AnimationState;
};

export const ArrayVisualization = ({ array, animationState }: ArrayVisualizationProps) => {
  // 서버와 클라이언트에서 동일한 렌더링을 보장하기 위해 항상 같은 구조 유지
  const keyIndex = animationState?.keyIndex ?? -1;
  const keyValue = animationState?.keyValue ?? 0;
  const comparingIndex = animationState?.comparingIndex ?? -1;
  const shiftingIndex = animationState?.shiftingIndex ?? -1;
  const type = animationState?.type ?? 'idle';

  // key가 추출된 상태인지 확인
  const isKeyExtracted = type === 'selecting' || type === 'comparing' || type === 'shifting';
  const showKey = isKeyExtracted && keyIndex >= 0;

  return (
    <div className="space-y-6">
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

      {/* 배열 표시 */}
      <div className="flex flex-wrap items-end justify-center gap-3 min-h-[200px]">
        {array.map((value, index) => {
          // key 위치이고 key가 추출된 상태면 비워둠
          const isKeyPosition = keyIndex === index && isKeyExtracted;
          
          let bgColor = 'bg-gray-50';
          let borderColor = 'border-gray-300';
          let textColor = 'text-gray-900';
          let scale = 'scale-100';
          let opacity = 'opacity-100';
          let borderStyle = 'border-solid';

          // 정렬된 부분 표시 (keyIndex 이전)
          if (keyIndex > 0 && index < keyIndex) {
            bgColor = 'bg-green-100';
            borderColor = 'border-green-300';
          }

          // 애니메이션 상태에 따른 스타일
          if (type === 'comparing') {
            if (comparingIndex === index) {
              bgColor = 'bg-yellow-400';
              borderColor = 'border-yellow-500';
              scale = 'scale-110';
            }
          } else if (type === 'shifting') {
            if (shiftingIndex === index) {
              bgColor = 'bg-red-500';
              borderColor = 'border-red-600';
              textColor = 'text-white';
              scale = 'scale-110';
            }
          } else if (type === 'inserting') {
            if (keyIndex === index) {
              bgColor = 'bg-purple-500';
              borderColor = 'border-purple-600';
              textColor = 'text-white';
              scale = 'scale-110';
            }
          } else if (type === 'sorted') {
            bgColor = 'bg-green-400';
            borderColor = 'border-green-500';
          }

          // key 위치는 비워둠
          if (isKeyPosition) {
            bgColor = 'bg-gray-100';
            borderColor = 'border-gray-300';
            borderStyle = 'border-dashed';
            opacity = 'opacity-40';
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
                <span className="z-10">
                  {isKeyPosition ? (
                    <span className="text-gray-400 text-sm">비어있음</span>
                  ) : (
                    value
                  )}
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

      {/* 정렬된 부분 표시 */}
      <div className="text-center text-xs text-gray-500" style={{ minHeight: '20px' }}>
        {keyIndex > 0 ? (
          <span>
            <span className="text-green-600 font-semibold">정렬된 부분</span> (인덱스 0 ~ {keyIndex - 1})
          </span>
        ) : (
          <span style={{ opacity: 0 }}> </span>
        )}
      </div>
    </div>
  );
};
