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
          <p className="text-sm text-yellow-700 font-medium">
            비교 중: {array[animationState.indices[0]]}와 {array[animationState.indices[1]]}{' '}
            비교
          </p>
        )}
        {animationState.type === 'swapping' && (
          <p className="text-sm text-red-700 font-medium">
            교환 중: {array[animationState.indices[1]]}와 {array[animationState.indices[0]]}{' '}
            교환
          </p>
        )}
        {animationState.type === 'sorted' && (
          <p className="text-sm text-green-700 font-medium">정렬 완료!</p>
        )}
      </div>
    </div>
  );
};
