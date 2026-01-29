import { isArraySorted } from './utils';

type ControlButtonsProps = {
  array: number[];
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
  const isSorted = isArraySorted(array);
  const isDisabled = isAnimating || isAutoSorting || isSorted;

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700 break-keep">
                연산
              </th>
              <th className="text-left py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700 break-keep">
                버튼
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">
                  단계별 정렬
                </span>
                <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">
                  (한 단계씩)
                </span>
              </td>
              <td className="py-2 px-2 md:py-3 md:px-4">
                <button
                  onClick={onStepSort}
                  disabled={isDisabled}
                  className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                >
                  다음 단계
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">
                  자동 정렬
                </span>
                <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">
                  (전체 과정)
                </span>
              </td>
              <td className="py-2 px-2 md:py-3 md:px-4">
                <button
                  onClick={onAutoSort}
                  disabled={isDisabled}
                  className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                >
                  자동 정렬 시작
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-3 md:mt-4">
        <button
          onClick={onReset}
          disabled={isAnimating || isAutoSorting}
          className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
        >
          초기화
        </button>
      </div>
    </div>
  );
};
