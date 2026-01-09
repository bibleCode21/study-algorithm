type ControlButtonsProps = {
  target: number;
  isAnimating: boolean;
  isAutoSearching: boolean;
  isSearchComplete: boolean;
  onStepSearch: () => void;
  onAutoSearch: () => void;
  onReset: () => void;
  onTargetChange: (target: number) => void;
};

export const ControlButtons = ({
  target,
  isAnimating,
  isAutoSearching,
  isSearchComplete,
  onStepSearch,
  onAutoSearch,
  onReset,
  onTargetChange,
}: ControlButtonsProps) => {
  const isDisabled = isAnimating || isAutoSearching || isSearchComplete;

  return (
    <div className="relative space-y-4">
      {/* 타겟 입력 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          찾는 값 (Target)
        </label>
        <input
          type="number"
          value={target}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value)) {
              onTargetChange(value);
            }
          }}
          disabled={isAnimating || isAutoSearching}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="찾을 값을 입력하세요"
        />
      </div>

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
                <span className="text-sm font-semibold text-gray-700">단계별 탐색</span>
                <span className="ml-2 text-xs text-gray-500">(O(log n))</span>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={onStepSearch}
                  disabled={isDisabled}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  다음 단계
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4">
                <span className="text-sm font-semibold text-gray-700">자동 탐색</span>
                <span className="ml-2 text-xs text-gray-500">(O(log n))</span>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={onAutoSearch}
                  disabled={isDisabled}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  자동 탐색 시작
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onReset}
          disabled={isAnimating || isAutoSearching}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          초기화
        </button>
      </div>
    </div>
  );
};
