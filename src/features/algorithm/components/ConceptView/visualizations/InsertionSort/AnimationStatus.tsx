import type { AnimationState } from './types';

type AnimationStatusProps = {
  animationState: AnimationState;
  array: number[];
};

export const AnimationStatus = ({ animationState, array }: AnimationStatusProps) => {
  if (!animationState) return null;

  let statusText = '';
  let statusColor = 'bg-gray-100 text-gray-800';

  switch (animationState.type) {
    case 'key':
      statusText = `현재 정렬 중인 값: ${array[animationState.keyIndex!]}`;
      statusColor = 'bg-blue-100 text-blue-800';
      break;
    case 'comparing':
      statusText = `비교 중: ${array[animationState.comparingIndex!]}와 ${array[animationState.keyIndex!]} 비교`;
      statusColor = 'bg-yellow-100 text-yellow-800';
      break;
    case 'moving':
      statusText = `이동 중: ${array[animationState.movingIndex!]}를 뒤로 이동`;
      statusColor = 'bg-red-100 text-red-800';
      break;
    case 'inserting':
      statusText = `삽입 중: ${array[animationState.keyIndex!]}를 올바른 위치에 삽입`;
      statusColor = 'bg-purple-100 text-purple-800';
      break;
    case 'sorted':
      statusText = '정렬 완료!';
      statusColor = 'bg-green-100 text-green-800';
      break;
  }

  return (
    <div className={`mb-4 p-3 rounded-lg border ${statusColor}`}>
      <p className="text-sm font-medium">{statusText}</p>
    </div>
  );
};
