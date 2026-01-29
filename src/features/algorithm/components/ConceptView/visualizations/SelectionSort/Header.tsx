export const Header = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">선택 정렬 시각화</h2>
      <p className="text-gray-600 mb-6">
        선택 정렬의 동작 과정을 시각적으로 확인해보세요. 각 단계마다 남은 구간에서 최소값을
        찾아 맨 앞(stand) 위치와 교환하는 과정을 단계별로 확인할 수 있습니다. 파란색은 현재
        채울 위치(stand), 노란색은 비교 중인 값, 초록색은 현재 최소값입니다.
      </p>
    </div>
  );
};
