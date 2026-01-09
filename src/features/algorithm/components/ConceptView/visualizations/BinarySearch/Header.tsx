export const Header = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">이진 탐색 시각화</h2>
      <p className="text-gray-600 mb-6">
        이진 탐색의 동작 과정을 시각적으로 확인해보세요. 정렬된 배열에서 중간값을 선택하고, 찾는 값과 비교하여 탐색 범위를 절반씩 줄여나가는 과정을 단계별로 확인할 수 있습니다.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">범례</h3>
        <div className="flex flex-wrap gap-4 text-xs text-blue-800">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 border-2 border-blue-400 rounded"></div>
            <span>L (Left): 탐색 범위의 시작</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 border-2 border-red-400 rounded"></div>
            <span>R (Right): 탐색 범위의 끝</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 border-2 border-yellow-600 rounded"></div>
            <span>M (Mid): 중간값 (비교 중)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 border-2 border-green-600 rounded"></div>
            <span>✓: 값을 찾음</span>
          </div>
        </div>
      </div>
    </div>
  );
};
