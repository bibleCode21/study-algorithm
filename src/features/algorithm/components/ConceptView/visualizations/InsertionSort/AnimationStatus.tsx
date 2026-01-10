import type { AnimationState } from './types';

type AnimationStatusProps = {
  animationState: AnimationState;
  array: number[];
};

export const AnimationStatus = ({ animationState, array }: AnimationStatusProps) => {
  let statusText = '';
  let statusColor = 'bg-gray-100 text-gray-800';

  if (animationState) {
    switch (animationState.type) {
      case 'selecting':
        statusText = `key 값 선택: ${animationState.keyValue} (배열[${animationState.keyIndex}])`;
        statusColor = 'bg-blue-100 text-blue-800';
        break;
      case 'comparing':
        statusText = `비교 중: key(${animationState.keyValue}) vs 배열[${animationState.comparingIndex}](${array[animationState.comparingIndex!]})`;
        statusColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'shifting':
        statusText = `이동 중: 배열[${animationState.shiftingIndex}](${array[animationState.shiftingIndex!]})를 뒤로 이동`;
        statusColor = 'bg-red-100 text-red-800';
        break;
      case 'inserting':
        statusText = `삽입 중: key(${animationState.keyValue})를 배열[${animationState.keyIndex}]에 삽입`;
        statusColor = 'bg-purple-100 text-purple-800';
        break;
      case 'sorted':
        statusText = '정렬 완료!';
        statusColor = 'bg-green-100 text-green-800';
        break;
      default:
        statusText = '';
    }
  }

  return (
    <div className={`mb-4 p-3 rounded-lg border ${statusColor}`} style={{ minHeight: '48px' }}>
      {statusText && <p className="text-sm font-medium">{statusText}</p>}
    </div>
  );
};
