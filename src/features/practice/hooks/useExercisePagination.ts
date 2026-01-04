import { useMemo, useState } from 'react';
import { ExerciseWithConcept } from '@/features/practice/types/components';
import { ITEMS_PER_PAGE } from '@/features/practice/constants';

export const useExercisePagination = (filteredExercises: ExerciseWithConcept[]) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredExercises.length / ITEMS_PER_PAGE);
  const paginatedExercises = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredExercises.slice(startIndex, endIndex);
  }, [filteredExercises, currentPage]);

  // 첫 페이지로 이동
  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    paginatedExercises,
    setCurrentPage,
    resetToFirstPage,
  };
};
