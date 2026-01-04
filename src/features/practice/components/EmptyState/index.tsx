interface EmptyStateProps {
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

const EmptyState = ({ hasActiveFilters, onResetFilters }: EmptyStateProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
      <p className="text-gray-500">검색 조건에 맞는 문제가 없습니다.</p>
      {hasActiveFilters && (
        <button
          onClick={onResetFilters}
          className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
        >
          필터 초기화
        </button>
      )}
    </div>
  );
};

export default EmptyState;
