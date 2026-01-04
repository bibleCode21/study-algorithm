import { Exercise } from '@/features/practice/types/exercise';

export const arrayExercises: Exercise[] = [
  {
    id: 'array-sum',
    conceptId: 'array',
    title: '배열의 합 구하기',
    difficulty: 'easy',
    description: '정수 배열이 주어졌을 때, 모든 요소의 합을 구하는 함수를 작성하세요.',
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        output: '15',
        explanation: '1 + 2 + 3 + 4 + 5 = 15',
      },
      {
        input: '[-1, 0, 1]',
        output: '0',
        explanation: '-1 + 0 + 1 = 0',
      },
    ],
    constraints: ['배열의 길이는 1 이상 1000 이하입니다.', '배열의 각 요소는 -1000 이상 1000 이하의 정수입니다.'],
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        expectedOutput: 15,
      },
      {
        input: [-1, 0, 1],
        expectedOutput: 0,
      },
      {
        input: [10],
        expectedOutput: 10,
      },
      {
        input: [],
        expectedOutput: 0,
      },
    ],
    solution: {
      code: `function sumArray(arr: number[]): number {
  return arr.reduce((sum, num) => sum + num, 0);
}`,
      language: 'typescript',
      explanation: 'reduce 메서드를 사용하여 배열의 모든 요소를 더합니다. 초기값은 0으로 설정합니다.',
    },
    hints: ['배열을 순회하면서 각 요소를 더해야 합니다.', 'reduce 메서드나 for 루프를 사용할 수 있습니다.'],
    tags: ['배열', '기초', '순회'],
  },
  {
    id: 'array-2d-reverse',
    conceptId: 'array',
    title: '2차원 배열 역순 출력',
    difficulty: 'easy',
    description: '2차원 배열이 주어졌을 때, 배열의 요소를 역순으로 출력하는 함수를 작성하세요. 예를 들어 [[1, 2, 3], [4, 5, 6], [7, 8, 9]]가 주어지면 9, 8, 7, 6, 5, 4, 3, 2, 1 순서로 출력해야 합니다.',
    examples: [
      {
        input: '[[1, 2, 3], [4, 5, 6], [7, 8, 9]]',
        output: '[9, 8, 7, 6, 5, 4, 3, 2, 1]',
        explanation: '2차원 배열의 마지막 행의 마지막 요소부터 첫 번째 행의 첫 번째 요소까지 역순으로 출력합니다.',
      },
      {
        input: '[[1, 2], [3, 4]]',
        output: '[4, 3, 2, 1]',
        explanation: '4, 3, 2, 1 순서로 출력됩니다.',
      },
    ],
    constraints: [
      '배열의 행 수는 1 이상 100 이하입니다.',
      '각 행의 길이는 1 이상 100 이하입니다.',
      '배열의 각 요소는 -1000 이상 1000 이하의 정수입니다.',
    ],
    testCases: [
      {
        input: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        expectedOutput: [9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
      {
        input: [
          [1, 2],
          [3, 4],
        ],
        expectedOutput: [4, 3, 2, 1],
      },
      {
        input: [[1]],
        expectedOutput: [1],
      },
    ],
    solution: {
      code: `function solution(arr: number[][]): number[] {
  const result: number[] = [];
  
  // 바깥쪽 루프: 마지막 행부터 첫 번째 행까지
  for (let i = arr.length - 1; i >= 0; i--) {
    // 안쪽 루프: 마지막 열부터 첫 번째 열까지
    for (let j = arr[i].length - 1; j >= 0; j--) {
      result.push(arr[i][j]);
    }
  }
  
  return result;
}`,
      language: 'typescript',
      explanation:
        '2차원 배열을 역순으로 순회하기 위해 바깥쪽 루프는 행을 역순으로, 안쪽 루프는 열을 역순으로 순회합니다. 각 요소를 결과 배열에 추가하여 반환합니다.',
    },
    hints: [
      '이중 루프를 사용하여 2차원 배열을 순회해야 합니다.',
      '바깥쪽 루프는 행을 역순으로, 안쪽 루프는 열을 역순으로 순회합니다.',
      '배열의 인덱스는 0부터 시작하므로 마지막 인덱스는 length - 1입니다.',
    ],
    tags: ['배열', '2차원 배열', '역순', '순회'],
  },
  {
    id: 'array-char-frequency',
    conceptId: 'array',
    title: '문자열 배열에서 "M" 문자 빈도수 찾기',
    difficulty: 'easy',
    description:
      '문자열 배열이 주어졌을 때, 모든 문자열에서 "M" 문자가 나타나는 총 빈도수를 구하는 함수를 작성하세요. 대소문자를 구분하므로 "M"과 "m"은 다릅니다.',
    examples: [
      {
        input: `["Mr. John", "Mrs. Jane", "Miss. Alice"]`,
        output: '3',
        explanation: '"Mr. John"에 M이 1번, "Mrs. Jane"에 M이 1번, "Miss. Alice"에 M이 1번 나와서 총 3번입니다.',
      },
      {
        input: `["Hello", "World"]`,
        output: '0',
        explanation: 'M 문자가 없으므로 0을 반환합니다.',
      },
    ],
    constraints: [
      '배열의 길이는 1 이상 1000 이하입니다.',
      '각 문자열의 길이는 1 이상 100 이하입니다.',
      '대소문자를 구분합니다 (M과 m은 다릅니다).',
      '찾아야 할 문자는 "M"입니다.',
    ],
    testCases: [
      {
        input: ['Mr. John', 'Mrs. Jane', 'Miss. Alice'],
        expectedOutput: 3,
      },
      {
        input: ['Hello', 'World'],
        expectedOutput: 0,
      },
      {
        input: ['Braund, Mr. Owen Harris', 'Cumings, Mrs. John Bradley'],
        expectedOutput: 2,
      },
      {
        input: ['M'],
        expectedOutput: 1,
      },
    ],
    solution: {
      code: `function solution(dataset: string[]): number {
  let mCount = 0;
  
  // 각 문자열을 순회
  for (const data of dataset) {
    // 각 문자열의 각 문자를 순회
    for (let index = 0; index < data.length; index++) {
      if (data[index] === 'M') {
        mCount++;
      }
    }
  }
  
  return mCount;
}

// 더 간단한 방법 (정규표현식 사용)
// function solution(dataset: string[]): number {
//   let mCount = 0;
//   const regex = /M/g;
//   
//   for (const data of dataset) {
//     const matches = data.match(regex);
//     if (matches) {
//       mCount += matches.length;
//     }
//   }
//   
//   return mCount;
// }`,
      language: 'typescript',
      explanation:
        '이중 루프를 사용하여 각 문자열의 각 문자를 확인합니다. 첫 번째 방법은 인덱스를 사용하여 각 문자를 직접 비교하고, 두 번째 방법(주석 처리됨)은 정규표현식을 사용하여 더 간결하게 구현할 수 있습니다.',
    },
    hints: [
      '이중 루프를 사용해야 합니다: 바깥쪽 루프는 문자열 배열을, 안쪽 루프는 각 문자열의 문자를 순회합니다.',
      '문자열의 각 문자에 접근하려면 인덱스를 사용합니다: data[index]',
      '정규표현식 match() 메서드를 사용하면 더 간단하게 구현할 수 있습니다.',
    ],
    tags: ['배열', '문자열', '빈도수', '순회'],
  },
];

