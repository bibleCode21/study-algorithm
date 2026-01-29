import type { AnimationState } from './types';

type AnimationStatusProps = {
  animationState: AnimationState;
  array: number[];
};

export const AnimationStatus = ({ animationState, array }: AnimationStatusProps) => {
  if (!animationState) return null;

  return (
    <div className="mb-10 py-2">
      <div className="text-center">
        {animationState.type === 'comparing' && (
          <p className="text-sm text-gray-700 font-medium">
            비교 중: stand[{animationState.stand}] = {array[animationState.stand]}, 현재 최소
            배열[{animationState.lowestIndex}] = {array[animationState.lowestIndex]}, 비교 대상
            배열[{animationState.comparingIndex}] = {array[animationState.comparingIndex]}
          </p>
        )}
        {animationState.type === 'swapping' && (
          <p className="text-sm text-red-700 font-medium">
            교환 중: 배열[{animationState.stand}]({array[animationState.stand]})와 배열[
            {animationState.lowestIndex}]({array[animationState.lowestIndex]}) 교환
          </p>
        )}
        {animationState.type === 'sorted' && (
          <p className="text-sm text-green-700 font-medium">정렬 완료!</p>
        )}
      </div>
    </div>
  );
};
