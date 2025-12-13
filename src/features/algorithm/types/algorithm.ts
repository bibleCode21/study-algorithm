// 알고리즘 및 데이터 구조 관련 타입

export interface CodeExample {
    language: string;
    code: string;
}

export interface Concept {
    id: string;
    title: string;
    type: 'data-structure' | 'algorithm'; // 데이터 구조 또는 알고리즘 구분
    category: string[]; // 예: ['정렬', '그래프', '탐색', '데이터 구조']
    description: string;
    // 알고리즘인 경우에만 필요 (데이터 구조는 선택적)
    timeComplexity?: {
        best: string;
        average: string;
        worst: string;
    };
    spaceComplexity?: string;
    problems?: string[]; // 관련 문제 ID 목록 (알고리즘인 경우)
    tags: string[];
}

