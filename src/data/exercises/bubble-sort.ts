import { Exercise } from '@/features/practice/types/exercise';

export const bubbleSortExercises: Exercise[] = [
  {
    id: 'bubble-sort-practice',
    conceptId: 'bubble-sort',
    title: '버블 정렬 구현하기',
    difficulty: 'medium',
    description: '버블 정렬 알고리즘을 구현하여 주어진 배열을 오름차순으로 정렬하세요.',
    examples: [
      {
        input: '[64, 34, 25, 12, 22, 11, 90]',
        output: '[11, 12, 22, 25, 34, 64, 90]',
        explanation: '버블 정렬을 통해 배열이 오름차순으로 정렬됩니다.',
      },
      {
        input: '[5, 2, 8, 1, 9]',
        output: '[1, 2, 5, 8, 9]',
      },
    ],
    constraints: ['배열의 길이는 1 이상 100 이하입니다.', '배열의 각 요소는 -1000 이상 1000 이하의 정수입니다.'],
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
        input: [3, 2, 1],
        expectedOutput: [1, 2, 3],
      },
    ],
    solution: {
      code: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  const result = [...arr];

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    
    if (!swapped) break;
  }

  return result;
}`,
      language: 'typescript',
      explanation:
        '버블 정렬은 인접한 두 요소를 비교하여 순서가 잘못된 경우 교환합니다. 외부 루프는 n-1번, 내부 루프는 n-i-1번 반복됩니다. 최적화를 위해 한 번도 교환이 없으면 조기 종료합니다.',
    },
    hints: [
      '인접한 두 요소를 비교하여 순서가 잘못된 경우 교환해야 합니다.',
      '이중 루프를 사용하여 모든 요소를 비교합니다.',
      '이미 정렬된 경우를 위해 조기 종료 최적화를 고려해보세요.',
    ],
    tags: ['정렬', '버블 정렬', '알고리즘'],
  },
];

