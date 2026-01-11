import type { Step } from './types';

type StepInfoProps = {
  currentStep: Step;
};

export const StepInfo = ({ currentStep }: StepInfoProps) => {
  if (!currentStep) {
    return null;
  }

  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200" style={{ minHeight: '48px' }}>
      <p className="text-sm text-blue-800">
        <span className="font-semibold">{currentStep.pass}회전</span> - key 값: {currentStep.keyValue} (배열[{currentStep.keyIndex}])
      </p>
    </div>
  );
};
