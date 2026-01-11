import type { AnimationState } from './types';

type AnimationStatusProps = {
  animationState: AnimationState;
  array: (number | null)[];
};

export const AnimationStatus = ({ animationState, array }: AnimationStatusProps) => {
  if (!animationState) {
    return null;
  }

  return (
    <div className="mb-4 p-3 rounded-lg border bg-gray-100 text-gray-800" style={{ minHeight: '48px' }}>
      <p className="text-sm font-medium">
        {animationState.type === 'selecting' && `key 값 선택: ${animationState.keyValue} (배열[${animationState.keyIndex}])`}
        {animationState.type === 'comparing' && `비교 중: key(${animationState.keyValue}) vs 배열[${animationState.comparingIndex}]`}
        {animationState.type === 'shifting' && `이동 중: 배열[${animationState.shiftingIndex}]를 뒤로 이동`}
        {animationState.type === 'inserting' && `삽입 중: key(${animationState.keyValue})를 배열[${animationState.keyIndex}]에 삽입`}
        {animationState.type === 'sorted' && '정렬 완료!'}
      </p>
    </div>
  );
};
