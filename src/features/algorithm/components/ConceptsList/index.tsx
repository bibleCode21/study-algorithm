'use client';

import { useState } from 'react';
import { ConceptsListProps } from '@/features/algorithm/types/components';
import ConceptCard from '@/features/algorithm/components/ConceptCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/features/algorithm/components/CategoryFilter';
import { searchConcepts, filterByCategories } from '@/utils/search';

export default function ConceptsList({ concepts }: ConceptsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 모든 카테고리 추출
  const categories = new Set<string>();
  concepts.forEach((concept) => {
    concept.category.forEach((cat) => categories.add(cat));
  });
  const allCategories = Array.from(categories).sort();

  // 필터링된 개념 목록
  let filteredConcepts = concepts;

  // 검색 필터
  if (searchQuery.trim()) {
    filteredConcepts = searchConcepts(filteredConcepts, searchQuery);
  }

  // 카테고리 필터
  if (selectedCategories.length > 0) {
    filteredConcepts = filterByCategories(filteredConcepts, selectedCategories);
  }

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="space-y-4">
        <SearchBar
          placeholder="제목, 설명, 태그로 검색..."
          onSearch={setSearchQuery}
        />
        {allCategories.length > 0 && (
          <CategoryFilter
            categories={allCategories}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
        )}
      </div>

      {/* 결과 개수 */}
      {filteredConcepts.length !== concepts.length && (
        <p className="text-sm text-gray-600">
          {filteredConcepts.length}개의 결과를 찾았습니다.
        </p>
      )}

      {/* 개념 카드 그리드 */}
      {filteredConcepts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">
          {searchQuery || selectedCategories.length > 0
            ? '검색 결과가 없습니다.'
            : '개념이 아직 없습니다.'}
        </p>
      )}
    </div>
  );
}

