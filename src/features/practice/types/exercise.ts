// 연습 문제 관련 타입

export interface Exercise {
    id: string;
    conceptId: string; // 관련 개념 ID (데이터 구조 또는 알고리즘)
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    constraints?: string[];
    testCases: {
        input: any;
        expectedOutput: any;
    }[];
    solution?: {
        code: string;
        language: string;
        explanation: string;
    };
    hints?: string[];
    tags: string[];
    // 문제별 코드 템플릿 (선택적)
    // 여러 템플릿이 있는 경우 배열로 제공 (예: 함수 작성, 클래스 작성 등)
    templateCode?: string | string[];
    // 템플릿 설명 (여러 템플릿이 있는 경우)
    templateDescriptions?: string[];
}

