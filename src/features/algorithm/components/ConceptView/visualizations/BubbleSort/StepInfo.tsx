import type { Step } from './types';

type StepInfoProps = {
  currentStep: Step;
};

export const StepInfo = ({ currentStep }: StepInfoProps) => {
  if (!currentStep) return null;

  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-sm text-blue-800">
        <span className="font-semibold">패스 {currentStep.pass + 1}</span> - 비교{' '}
        {currentStep.comparison + 1}번째
      </p>
    </div>
  );
};
