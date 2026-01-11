type ControlButtonsProps = {
  array: number[];
  isAnimating: boolean;
  isAutoSorting: boolean;
  onStepSort: () => void;
  onAutoSort: () => void;
  onReset: () => void;
};

export const ControlButtons = ({
  isAnimating,
  isAutoSorting,
  onStepSort,
  onAutoSort,
  onReset,
}: ControlButtonsProps) => {
  const isDisabled = isAnimating || isAutoSorting;

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={onStepSort}
          disabled={isDisabled}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          다음 단계
        </button>
        <button
          onClick={onAutoSort}
          disabled={isDisabled}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          자동 정렬
        </button>
        <button
          onClick={onReset}
          disabled={isAnimating || isAutoSorting}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          초기화
        </button>
      </div>
    </div>
  );
};
