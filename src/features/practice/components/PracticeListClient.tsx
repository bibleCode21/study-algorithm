'use client';

import Pagination from '@/components/ui/Pagination';
import { PracticeListClientProps } from '@/features/practice/types/components';
import { useExerciseFilters } from '@/features/practice/hooks/useExerciseFilters';
import { useExercisePagination } from '@/features/practice/hooks/useExercisePagination';
import { ITEMS_PER_PAGE } from '@/features/practice/constants';
import ExerciseCard from './ExerciseCard';
import ExerciseSearchBar from './ExerciseSearchBar';
import ExerciseFilters from './ExerciseFilters';
import EmptyState from './EmptyState';

const PracticeListClient = ({ exercises }: PracticeListClientProps) => {
  const {
    searchQuery,
    selectedCategory,
    selectedConcept,
    selectedDifficulty,
    setSearchQuery,
    setSelectedCategory,
    setSelectedConcept,
    setSelectedDifficulty,
    categories,
    availableConcepts,
    filteredExercises,
    resetFilters,
  } = useExerciseFilters(exercises);

  const {
    currentPage,
    totalPages,
    paginatedExercises,
    setCurrentPage,
    resetToFirstPage,
  } = useExercisePagination(filteredExercises);

  // 필터 변경 시 첫 페이지로 이동
  const handleFilterChange = (changeFn: () => void) => {
    changeFn();
    resetToFirstPage();
  };

  // 필터 초기화
  const handleResetFilters = () => {
    resetFilters();
    resetToFirstPage();
  };

  // 활성 필터 확인
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== '전체' ||
    selectedConcept !== '전체' ||
    selectedDifficulty !== '전체';

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">문제 풀이</h1>
          <p className="text-gray-600">알고리즘과 데이터 구조 문제를 풀어보세요</p>
        </header>

        {/* 검색 및 필터 섹션 */}
        <div className="mb-8 space-y-4">
          <ExerciseSearchBar
            value={searchQuery}
            onChange={(value) => handleFilterChange(() => setSearchQuery(value))}
          />

          <ExerciseFilters
            categories={categories}
            availableConcepts={availableConcepts}
            selectedCategory={selectedCategory}
            selectedConcept={selectedConcept}
            selectedDifficulty={selectedDifficulty}
            onCategoryChange={(category) => handleFilterChange(() => setSelectedCategory(category))}
            onConceptChange={(conceptId) => handleFilterChange(() => setSelectedConcept(conceptId))}
            onDifficultyChange={(difficulty) => handleFilterChange(() => setSelectedDifficulty(difficulty))}
          />

          {/* 결과 개수 표시 */}
          <div className="text-sm text-gray-600">
            총 <span className="font-semibold text-gray-900">{filteredExercises.length}</span>개의 문제가
            있습니다
          </div>
        </div>

        {/* 문제 목록 */}
        {filteredExercises.length === 0 ? (
          <EmptyState hasActiveFilters={hasActiveFilters} onResetFilters={handleResetFilters} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedExercises
                .filter((exercise) => exercise.conceptId) // conceptId가 없는 문제는 제외
                .map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
            </div>

            {/* 페이지네이션 */}
            {filteredExercises.length > ITEMS_PER_PAGE && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default PracticeListClient;

