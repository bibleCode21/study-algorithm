import { useMemo, useState } from 'react';
import { ExerciseWithConcept } from '@/features/practice/types/components';
import { Concept } from '@/features/algorithm/types/algorithm';

export interface ExerciseFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedConcept: string;
  selectedDifficulty: string;
}

export const useExerciseFilters = (exercises: ExerciseWithConcept[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedConcept, setSelectedConcept] = useState<string>('전체');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('전체');

  // 모든 카테고리 추출
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    exercises.forEach((exercise) => {
      if (exercise.concept?.category) {
        exercise.concept.category.forEach((cat) => categorySet.add(cat));
      }
    });
    return ['전체', ...Array.from(categorySet).sort()];
  }, [exercises]);

  // 모든 개념 추출 (문제가 있는 개념만)
  const availableConcepts = useMemo(() => {
    const conceptMap = new Map<string, Concept>();
    exercises.forEach((exercise) => {
      if (exercise.concept) {
        conceptMap.set(exercise.concept.id, exercise.concept);
      }
    });
    return Array.from(conceptMap.values()).sort((a, b) => a.title.localeCompare(b.title));
  }, [exercises]);

  // 필터링된 문제들
  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      // 검색어 필터
      const matchesSearch =
        searchQuery === '' ||
        exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        exercise.concept?.title.toLowerCase().includes(searchQuery.toLowerCase());

      // 카테고리 필터
      const matchesCategory =
        selectedCategory === '전체' ||
        exercise.concept?.category.includes(selectedCategory);

      // 개념 필터
      const matchesConcept =
        selectedConcept === '전체' || exercise.conceptId === selectedConcept;

      // 난이도 필터
      const matchesDifficulty =
        selectedDifficulty === '전체' || exercise.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesConcept && matchesDifficulty;
    });
  }, [exercises, searchQuery, selectedCategory, selectedConcept, selectedDifficulty]);

  // 필터 초기화
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('전체');
    setSelectedConcept('전체');
    setSelectedDifficulty('전체');
  };

  return {
    // 상태
    searchQuery,
    selectedCategory,
    selectedConcept,
    selectedDifficulty,
    // 세터
    setSearchQuery,
    setSelectedCategory,
    setSelectedConcept,
    setSelectedDifficulty,
    // 계산된 값
    categories,
    availableConcepts,
    filteredExercises,
    // 유틸리티
    resetFilters,
  };
};
