import { isArraySorted } from './utils';

type ControlButtonsProps = {
  array: (number | null)[];
  isAnimating: boolean;
  isAutoSorting: boolean;
  onStepSort: () => void;
  onAutoSort: () => void;
  onReset: () => void;
};

export const ControlButtons = ({
  array,
  isAnimating,
  isAutoSorting,
  onStepSort,
  onAutoSort,
  onReset,
}: ControlButtonsProps) => {
  const isSorted = isArraySorted(array.filter((v): v is number => v !== null));
  const isDisabled = isAnimating || isAutoSorting || isSorted;

  return (
    <div className="relative space-y-4">
      {/* 컨트롤 버튼 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">연산</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">버튼</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4">
                <span className="text-sm font-semibold text-gray-700">단계별 정렬</span>
                <span className="ml-2 text-xs text-gray-500">(O(n²))</span>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={onStepSort}
                  disabled={isDisabled}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  다음 단계
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4">
                <span className="text-sm font-semibold text-gray-700">자동 정렬</span>
                <span className="ml-2 text-xs text-gray-500">(O(n²))</span>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={onAutoSort}
                  disabled={isDisabled}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  자동 정렬 시작
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onReset}
          disabled={isAnimating || isAutoSorting}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          초기화
        </button>
      </div>
    </div>
  );
};
