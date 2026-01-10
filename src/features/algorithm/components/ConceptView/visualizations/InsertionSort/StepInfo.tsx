import type { Step } from './types';

type StepInfoProps = {
  currentStep: Step;
};

export const StepInfo = ({ currentStep }: StepInfoProps) => {
  if (!currentStep) return null;

  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-sm text-blue-800">
        <span className="font-semibold">i = {currentStep.i}</span> - key 값: 배열[{currentStep.keyIndex}] = 현재 정렬 중인 값
        {currentStep.j >= 0 && (
          <>
            {' '}
            | 비교 중: 배열[{currentStep.j}]와 비교
          </>
        )}
      </p>
    </div>
  );
};
