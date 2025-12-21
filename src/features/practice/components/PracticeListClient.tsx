'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Pagination from '@/components/ui/Pagination';
import { PracticeListClientProps } from '@/features/practice/types/components';
import { Concept } from '@/features/algorithm/types/algorithm';

const ITEMS_PER_PAGE = 9;

const difficultyColors = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
} as const;

const difficultyLabels = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
} as const;

const PracticeListClient = ({ exercises }: PracticeListClientProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedConcept, setSelectedConcept] = useState<string>('전체');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('전체');
  const [currentPage, setCurrentPage] = useState(1);

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

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredExercises.length / ITEMS_PER_PAGE);
  const paginatedExercises = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredExercises.slice(startIndex, endIndex);
  }, [filteredExercises, currentPage]);

  // 필터 변경 시 첫 페이지로 이동
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // 필터 초기화
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('전체');
    setSelectedConcept('전체');
    setSelectedDifficulty('전체');
    setCurrentPage(1);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">문제 풀이</h1>
          <p className="text-gray-600">알고리즘과 데이터 구조 문제를 풀어보세요</p>
        </header>

        {/* 검색 및 필터 섹션 */}
        <div className="mb-8 space-y-4">
          {/* 검색 바 */}
          <div className="relative">
            <input
              type="text"
              placeholder="문제 제목, 설명, 태그, 개념으로 검색..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterChange();
              }}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* 필터 버튼들 */}
          <div className="space-y-3">
            {/* 첫 번째 줄: 카테고리와 난이도 */}
            <div className="flex flex-wrap gap-3">
              {/* 카테고리 필터 */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">카테고리:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        handleFilterChange();
                      }}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* 난이도 필터 */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">난이도:</span>
                <div className="flex gap-2">
                  {['전체', 'easy', 'medium', 'hard'].map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => {
                        setSelectedDifficulty(difficulty);
                        handleFilterChange();
                      }}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedDifficulty === difficulty
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {difficulty === '전체' ? '전체' : difficultyLabels[difficulty as keyof typeof difficultyLabels]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 두 번째 줄: 개념 필터 */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">개념:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedConcept('전체');
                    handleFilterChange();
                  }}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    selectedConcept === '전체'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  전체
                </button>
                {availableConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => {
                      setSelectedConcept(concept.id);
                      handleFilterChange();
                    }}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      selectedConcept === concept.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {concept.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 결과 개수 표시 */}
          <div className="text-sm text-gray-600">
            총 <span className="font-semibold text-gray-900">{filteredExercises.length}</span>개의 문제가
            있습니다
          </div>
        </div>

        {/* 문제 목록 */}
        {filteredExercises.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">검색 조건에 맞는 문제가 없습니다.</p>
            {(searchQuery || selectedCategory !== '전체' || selectedConcept !== '전체' || selectedDifficulty !== '전체') && (
              <button
                onClick={handleResetFilters}
                className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                필터 초기화
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedExercises.map((exercise) => (
                <Link
                  key={exercise.id}
                  href={`/concept/${exercise.conceptId}/practice?exerciseId=${exercise.id}`}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-lg font-semibold text-gray-900 flex-1">{exercise.title}</h2>
                    <Badge variant={difficultyColors[exercise.difficulty]} size="sm">
                      {difficultyLabels[exercise.difficulty]}
                    </Badge>
                  </div>

                  {exercise.concept && (
                    <div className="mb-3">
                      <span className="text-xs text-gray-500">관련 개념:</span>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {exercise.concept.title}
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{exercise.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exercise.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {exercise.tags.length > 3 && (
                      <span className="text-xs text-gray-400">+{exercise.tags.length - 3}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* 페이지네이션 */}
            {filteredExercises.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default PracticeListClient;

