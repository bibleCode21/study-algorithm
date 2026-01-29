import { Exercise } from '@/features/practice/types/exercise';

export const selectionSortExercises: Exercise[] = [
  {
    id: 'selection-sort-practice',
    conceptId: 'selection-sort',
    title: '선택 정렬 구현하기',
    difficulty: 'medium',
    description:
      '선택 정렬 알고리즘을 구현하여 주어진 배열을 오름차순으로 정렬하세요. 각 단계마다 남은 구간에서 최소값을 찾아 맨 앞 위치와 교환합니다.',
    examples: [
      {
        input: '[64, 34, 25, 12, 22, 11, 90]',
        output: '[11, 12, 22, 25, 34, 64, 90]',
        explanation: '선택 정렬을 통해 배열이 오름차순으로 정렬됩니다.',
      },
      {
        input: '[9, 3, 2, 1]',
        output: '[1, 2, 3, 9]',
      },
    ],
    constraints: [
      '배열의 길이는 1 이상 100 이하입니다.',
      '배열의 각 요소는 -1000 이상 1000 이하의 정수입니다.',
    ],
    testCases: [
      {
        input: [64, 34, 25, 12, 22, 11, 90],
        expectedOutput: [11, 12, 22, 25, 34, 64, 90],
      },
      {
        input: [5, 2, 8, 1, 9],
        expectedOutput: [1, 2, 5, 8, 9],
      },
      {
        input: [1],
        expectedOutput: [1],
      },
      {
        input: [9, 3, 2, 1],
        expectedOutput: [1, 2, 3, 9],
      },
    ],
    solution: {
      code: `function solution(array: number[]): number[] {
  const n = array.length;
  const result = [...array];

  for (let stand = 0; stand < n - 1; stand++) {
    let lowest = stand;

    for (let index = stand + 1; index < n; index++) {
      if (result[lowest] > result[index]) {
        lowest = index;
      }
    }

    [result[stand], result[lowest]] = [result[lowest], result[stand]];
  }

  return result;
}`,
      language: 'typescript',
      explanation:
        '선택 정렬은 각 단계(stand)마다 stand 이후 구간에서 최소값(lowest)을 찾고, stand 위치와 교환합니다. 외부 루프는 n-1번, 내부 루프는 stand+1부터 n-1까지 반복됩니다.',
    },
    hints: [
      'stand 위치(0부터 n-2)에 올바른 값을 채우는 방식으로 진행합니다.',
      '내부 루프로 stand 이후 구간에서 최소값의 인덱스(lowest)를 찾습니다.',
      '최소값을 찾은 후 result[stand]와 result[lowest]를 교환합니다.',
    ],
    tags: ['정렬', '선택 정렬', '알고리즘'],
    templateCode: `function solution(array: number[]): number[] {
  // 여기에 코드를 작성하세요
  throw new Error('구현해주세요');
}`,
  },
];
