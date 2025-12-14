import { Concept } from '@/features/algorithm/types/algorithm';

/**
 * 개념을 검색어로 필터링합니다.
 * @param concepts 개념 배열
 * @param query 검색어
 * @returns 필터링된 개념 배열
 */
export const searchConcepts = (concepts: Concept[], query: string): Concept[] => {
    if (!query.trim()) {
        return concepts;
    }

    const lowerQuery = query.toLowerCase();

    return concepts.filter((concept) => {
        // 제목 검색
        if (concept.title.toLowerCase().includes(lowerQuery)) {
            return true;
        }

        // 설명 검색
        if (concept.description.toLowerCase().includes(lowerQuery)) {
            return true;
        }

        // 태그 검색
        if (concept.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))) {
            return true;
        }

        // 카테고리 검색
        if (concept.category.some((cat) => cat.toLowerCase().includes(lowerQuery))) {
            return true;
        }

        return false;
    });
}

/**
 * 개념을 카테고리로 필터링합니다.
 * @param concepts 개념 배열
 * @param categories 선택된 카테고리 배열
 * @returns 필터링된 개념 배열
 */
export function filterByCategories(
    concepts: Concept[],
    categories: string[]
): Concept[] {
    if (categories.length === 0) {
        return concepts;
    }

    return concepts.filter((concept) =>
        concept.category.some((cat) => categories.includes(cat))
    );
};

