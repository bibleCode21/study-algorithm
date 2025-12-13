// 문제 풀이 관련 타입

export interface Problem {
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
}

