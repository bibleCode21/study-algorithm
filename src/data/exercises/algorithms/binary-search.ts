import { Exercise } from '@/features/practice/types/exercise';

export const binarySearchExercises: Exercise[] = [
  {
    id: 'binary-search-basic',
    conceptId: 'binary-search',
    title: '이진 탐색 구현하기',
    difficulty: 'medium',
    description: '정렬된 배열에서 특정 값을 찾는 이진 탐색 알고리즘을 구현하세요. 값을 찾으면 인덱스를 반환하고, 찾지 못하면 -1을 반환하세요.',
    examples: [
      {
        input: 'arr = [1, 3, 5, 7, 9, 11, 13, 15], target = 7',
        output: '3',
        explanation: '배열에서 7은 인덱스 3에 위치합니다.',
      },
      {
        input: 'arr = [2, 3, 8, 12, 20], target = 5',
        output: '-1',
        explanation: '배열에 5가 존재하지 않으므로 -1을 반환합니다.',
      },
    ],
    constraints: [
      '배열은 오름차순으로 정렬되어 있습니다.',
      '배열의 길이는 1 이상 10^4 이하입니다.',
      '배열의 각 요소는 -10^4 이상 10^4 이하의 정수입니다.',
      '배열의 모든 요소는 유일합니다.',
    ],
    testCases: [
      {
        input: [[1, 3, 5, 7, 9, 11, 13, 15], 7],
        expectedOutput: 3,
      },
      {
        input: [[2, 3, 8, 12, 20], 5],
        expectedOutput: -1,
      },
      {
        input: [[1, 2, 3, 4, 5], 1],
        expectedOutput: 0,
      },
      {
        input: [[1, 2, 3, 4, 5], 5],
        expectedOutput: 4,
      },
      {
        input: [[10], 10],
        expectedOutput: 0,
      },
      {
        input: [[10], 5],
        expectedOutput: -1,
      },
    ],
    solution: {
      code: `function solution(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
      language: 'typescript',
      explanation:
        '이진 탐색은 정렬된 배열에서 중간값을 선택하고, 찾는 값과 비교하여 탐색 범위를 절반씩 줄여나가는 알고리즘입니다. left와 right 포인터를 사용하여 탐색 범위를 관리하고, 중간값과 비교하여 범위를 좁혀나갑니다.',
    },
    hints: [
      '정렬된 배열에서 중간 인덱스를 계산하여 찾는 값과 비교하세요.',
      '찾는 값이 중간값보다 크면 오른쪽 절반에서, 작으면 왼쪽 절반에서 탐색하세요.',
      'left와 right 포인터를 사용하여 탐색 범위를 관리하세요.',
    ],
    tags: ['탐색', '이진 탐색', '분할 정복'],
    templateCode: `function solution(arr: number[], target: number): number {
  // 여기에 코드를 작성하세요
  throw new Error('구현해주세요');
}`,
  },
  {
    id: 'binary-search-recursive',
    conceptId: 'binary-search',
    title: '재귀를 사용한 이진 탐색 구현하기',
    difficulty: 'medium',
    description: '재귀 함수를 사용하여 이진 탐색 알고리즘을 구현하세요. 값을 찾으면 인덱스를 반환하고, 찾지 못하면 -1을 반환하세요.',
    examples: [
      {
        input: 'arr = [1, 3, 5, 7, 9, 11, 13, 15], target = 7',
        output: '3',
        explanation: '배열에서 7은 인덱스 3에 위치합니다.',
      },
      {
        input: 'arr = [2, 3, 8, 12, 20], target = 5',
        output: '-1',
        explanation: '배열에 5가 존재하지 않으므로 -1을 반환합니다.',
      },
    ],
    constraints: [
      '배열은 오름차순으로 정렬되어 있습니다.',
      '배열의 길이는 1 이상 10^4 이하입니다.',
      '배열의 각 요소는 -10^4 이상 10^4 이하의 정수입니다.',
      '배열의 모든 요소는 유일합니다.',
    ],
    testCases: [
      {
        input: [[1, 3, 5, 7, 9, 11, 13, 15], 7],
        expectedOutput: 3,
      },
      {
        input: [[2, 3, 8, 12, 20], 5],
        expectedOutput: -1,
      },
      {
        input: [[1, 2, 3, 4, 5], 1],
        expectedOutput: 0,
      },
      {
        input: [[1, 2, 3, 4, 5], 5],
        expectedOutput: 4,
      },
    ],
    solution: {
      code: `function solution(arr: number[], target: number): number {
  const binarySearchRecursive = (
    arr: number[],
    target: number,
    left: number = 0,
    right: number = arr.length - 1
  ): number => {
    if (left > right) {
      return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
      return binarySearchRecursive(arr, target, left, mid - 1);
    }
  };

  return binarySearchRecursive(arr, target);
}`,
      language: 'typescript',
      explanation:
        '재귀를 사용한 이진 탐색은 탐색 범위를 파라미터로 받아 재귀적으로 호출합니다. 기저 조건은 left > right일 때 -1을 반환하는 것이고, 중간값과 비교하여 왼쪽 또는 오른쪽 절반에서 재귀적으로 탐색합니다.',
    },
    hints: [
      '기저 조건을 먼저 작성하세요 (left > right일 때 -1 반환).',
      '중간 인덱스를 계산하여 찾는 값과 비교하세요.',
      '찾는 값이 중간값보다 크면 오른쪽 절반에서, 작으면 왼쪽 절반에서 재귀적으로 탐색하세요.',
    ],
    tags: ['탐색', '이진 탐색', '재귀', '분할 정복'],
    templateCode: `function solution(arr: number[], target: number): number {
  // 여기에 코드를 작성하세요
  // 재귀 함수를 사용하여 이진 탐색을 구현하세요
  throw new Error('구현해주세요');
}`,
  },
  {
    id: 'binary-search-find-insert-position',
    conceptId: 'binary-search',
    title: '삽입 위치 찾기',
    difficulty: 'medium',
    description: '정렬된 배열과 타겟 값이 주어졌을 때, 타겟이 삽입되어야 할 인덱스를 찾으세요. 타겟이 배열에 존재하면 해당 인덱스를, 존재하지 않으면 삽입되어야 할 위치의 인덱스를 반환하세요.',
    examples: [
      {
        input: 'arr = [1, 3, 5, 6], target = 5',
        output: '2',
        explanation: '5는 배열에 존재하므로 인덱스 2를 반환합니다.',
      },
      {
        input: 'arr = [1, 3, 5, 6], target = 2',
        output: '1',
        explanation: '2는 배열에 존재하지 않지만, 인덱스 1에 삽입되어야 합니다.',
      },
      {
        input: 'arr = [1, 3, 5, 6], target = 7',
        output: '4',
        explanation: '7은 배열에 존재하지 않지만, 배열의 끝에 삽입되어야 하므로 인덱스 4를 반환합니다.',
      },
    ],
    constraints: [
      '배열은 오름차순으로 정렬되어 있습니다.',
      '배열의 길이는 1 이상 10^4 이하입니다.',
      '배열의 각 요소는 -10^4 이상 10^4 이하의 정수입니다.',
      '타겟 값은 -10^4 이상 10^4 이하의 정수입니다.',
    ],
    testCases: [
      {
        input: [[1, 3, 5, 6], 5],
        expectedOutput: 2,
      },
      {
        input: [[1, 3, 5, 6], 2],
        expectedOutput: 1,
      },
      {
        input: [[1, 3, 5, 6], 7],
        expectedOutput: 4,
      },
      {
        input: [[1, 3, 5, 6], 0],
        expectedOutput: 0,
      },
      {
        input: [[1], 0],
        expectedOutput: 0,
      },
      {
        input: [[1], 2],
        expectedOutput: 1,
      },
    ],
    solution: {
      code: `function solution(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}`,
      language: 'typescript',
      explanation:
        '이진 탐색을 사용하여 타겟 값을 찾거나 삽입 위치를 찾습니다. 값을 찾으면 해당 인덱스를 반환하고, 찾지 못하면 left 포인터가 가리키는 위치가 삽입되어야 할 인덱스입니다. 이는 이진 탐색이 종료될 때 left가 항상 올바른 삽입 위치를 가리키기 때문입니다.',
    },
    hints: [
      '기본 이진 탐색 로직을 사용하되, 값을 찾지 못했을 때 left를 반환하세요.',
      '이진 탐색이 종료될 때 left는 항상 타겟이 삽입되어야 할 위치를 가리킵니다.',
    ],
    tags: ['탐색', '이진 탐색', '배열'],
    templateCode: `function solution(arr: number[], target: number): number {
  // 여기에 코드를 작성하세요
  throw new Error('구현해주세요');
}`,
  },
];
