export const Header = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">삽입 정렬 시각화</h2>
      <p className="text-gray-600 mb-6">
        삽입 정렬의 동작 과정을 시각적으로 확인해보세요. 두 번째 인덱스부터 시작하여 각 요소를
        앞의 정렬된 부분에 올바른 위치에 삽입하는 과정을 단계별로 확인할 수 있습니다.
      </p>
    </div>
  );
};
