export const Header = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">버블 정렬 시각화</h2>
      <p className="text-gray-600 mb-6">
        버블 정렬의 동작 과정을 시각적으로 확인해보세요. 인접한 두 요소를 비교하여 순서가
        잘못된 경우 교환하는 과정을 단계별로 확인할 수 있습니다.
      </p>
    </div>
  );
};
