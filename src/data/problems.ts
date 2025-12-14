import { Problem } from '@/features/practice/types/problem';

export const problems: Problem[] = [
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
  {
    id: 'queue-enqueue-dequeue',
    conceptId: 'queue',
    title: '큐의 Enqueue와 Dequeue 구현하기',
    difficulty: 'easy',
    description:
      '리스트를 사용하여 큐의 enqueue와 dequeue 기능을 구현하세요. 주어진 객체는 enqueue할 숫자 배열과 dequeue할 횟수를 포함합니다. 모든 숫자를 순서대로 enqueue한 후, 지정된 횟수만큼 dequeue하여 반환하는 함수를 작성하세요.',
    examples: [
      {
        input: '{ enqueue: [1, 2, 3], dequeueCount: 2 }',
        output: '[1, 2]',
        explanation: '1, 2, 3을 순서대로 enqueue한 후, 2번 dequeue하면 1, 2가 반환됩니다 (FIFO).',
      },
      {
        input: '{ enqueue: [10, 20, 30], dequeueCount: 3 }',
        output: '[10, 20, 30]',
        explanation: '모든 요소를 enqueue한 후 모두 dequeue하면 입력 순서대로 반환됩니다.',
      },
    ],
    constraints: [
      'enqueue 배열의 길이는 0 이상 100 이하입니다.',
      'dequeueCount는 0 이상 enqueue 배열의 길이 이하입니다.',
      '배열의 각 요소는 정수입니다.',
      'FIFO(First-In, First-Out) 원칙을 따라야 합니다.',
    ],
    testCases: [
      {
        input: { enqueue: [1, 2, 3], dequeueCount: 2 },
        expectedOutput: [1, 2],
      },
      {
        input: { enqueue: [10, 20, 30, 40, 50], dequeueCount: 3 },
        expectedOutput: [10, 20, 30],
      },
      {
        input: { enqueue: [5, 15, 25], dequeueCount: 1 },
        expectedOutput: [5],
      },
      {
        input: { enqueue: [1, 2, 3], dequeueCount: 3 },
        expectedOutput: [1, 2, 3],
      },
      {
        input: { enqueue: [3], dequeueCount: 1 },
        expectedOutput: [3],
      },
      {
        input: { enqueue: [3], dequeueCount: 2 },
        expectedOutput: [3],
      },
      {
        input: { enqueue: [7, 8, 9], dequeueCount: 1 },
        expectedOutput: [7],
      },
      {
        input: { enqueue: [1, 2], dequeueCount: 1 },
        expectedOutput: [1],
      },
      {
        input: { enqueue: [], dequeueCount: 0 },
        expectedOutput: [],
      },
    ],
    solution: {
      code: `function solution(input: { enqueue: number[]; dequeueCount: number }): number[] {
  const queue: number[] = [];
  const results: number[] = [];

  // Enqueue: 큐에 데이터 추가
  function enqueue(data: number): void {
    queue.push(data);
  }

  // Dequeue: 큐에서 데이터 제거 및 반환
  function dequeue(): number | undefined {
    if (queue.length === 0) {
      return undefined;
    }
    const data = queue[0];
    queue.shift();
    return data;
  }

  // 모든 요소를 enqueue
  for (const item of input.enqueue) {
    enqueue(item);
  }

  // 지정된 횟수만큼 dequeue
  for (let i = 0; i < input.dequeueCount; i++) {
    const item = dequeue();
    if (item !== undefined) {
      results.push(item);
    }
  }

  return results;
}`,
      language: 'typescript',
      explanation:
        '리스트를 사용하여 큐를 구현합니다. enqueue는 push를 사용하여 끝에 추가하고, dequeue는 shift를 사용하여 앞에서 제거합니다. FIFO 원칙에 따라 가장 먼저 추가된 요소가 가장 먼저 제거됩니다.',
    },
    hints: [
      '리스트의 push 메서드를 사용하여 enqueue를 구현합니다.',
      '리스트의 shift 메서드를 사용하여 dequeue를 구현합니다.',
      '모든 요소를 enqueue한 후, 순서대로 dequeue하여 결과 배열에 추가합니다.',
    ],
    tags: ['큐', 'FIFO', 'Enqueue', 'Dequeue'],
  },
  {
    id: 'stack-push-pop',
    conceptId: 'stack',
    title: '스택의 Push와 Pop 구현하기',
    difficulty: 'easy',
    description:
      '리스트를 사용하여 스택의 push와 pop 기능을 구현하세요. 주어진 객체는 push할 숫자 배열과 pop할 횟수를 포함합니다. 모든 숫자를 순서대로 push한 후, 지정된 횟수만큼 pop하여 반환하는 함수를 작성하세요.',
    examples: [
      {
        input: '{ push: [1, 2, 3], popCount: 2 }',
        output: '[3, 2]',
        explanation: '1, 2, 3을 순서대로 push한 후, 2번 pop하면 3, 2가 반환됩니다 (LIFO).',
      },
      {
        input: '{ push: [10, 20, 30], popCount: 3 }',
        output: '[30, 20, 10]',
        explanation: '모든 요소를 push한 후 모두 pop하면 역순으로 반환됩니다 (LIFO).',
      },
    ],
    constraints: [
      'push 배열의 길이는 0 이상 100 이하입니다.',
      'popCount는 0 이상 push 배열의 길이 이하입니다.',
      '배열의 각 요소는 정수입니다.',
      'LIFO(Last-In, First-Out) 원칙을 따라야 합니다.',
    ],
    testCases: [
      {
        input: { push: [1, 2, 3], popCount: 2 },
        expectedOutput: [3, 2],
      },
      {
        input: { push: [10, 20, 30, 40, 50], popCount: 3 },
        expectedOutput: [50, 40, 30],
      },
      {
        input: { push: [5, 15, 25], popCount: 1 },
        expectedOutput: [25],
      },
      {
        input: { push: [1, 2, 3], popCount: 3 },
        expectedOutput: [3, 2, 1],
      },
      {
        input: { push: [3], popCount: 1 },
        expectedOutput: [3],
      },
      {
        input: { push: [3], popCount: 2 },
        expectedOutput: [3],
      },
      {
        input: { push: [7, 8, 9], popCount: 1 },
        expectedOutput: [9],
      },
      {
        input: { push: [1, 2], popCount: 1 },
        expectedOutput: [2],
      },
      {
        input: { push: [], popCount: 0 },
        expectedOutput: [],
      },
    ],
    solution: {
      code: `function solution(input: { push: number[]; popCount: number }): number[] {
  const stack: number[] = [];
  const results: number[] = [];

  // Push: 스택에 데이터 추가
  function push(data: number): void {
    stack.push(data);
  }

  // Pop: 스택에서 데이터 제거 및 반환
  function pop(): number | undefined {
    return stack.pop();
  }

  // 모든 요소를 push
  for (const item of input.push) {
    push(item);
  }

  // 지정된 횟수만큼 pop
  for (let i = 0; i < input.popCount; i++) {
    const item = pop();
    if (item !== undefined) {
      results.push(item);
    }
  }

  return results;
}`,
      language: 'typescript',
      explanation:
        '리스트를 사용하여 스택을 구현합니다. push는 배열의 push 메서드를 사용하여 끝에 추가하고, pop은 배열의 pop 메서드를 사용하여 마지막 요소를 제거합니다. LIFO 원칙에 따라 가장 나중에 추가된 요소가 가장 먼저 제거됩니다.',
    },
    hints: [
      '리스트의 push 메서드를 사용하여 스택에 데이터를 추가합니다.',
      '리스트의 pop 메서드를 사용하여 스택에서 데이터를 제거합니다.',
      '모든 요소를 push한 후, pop하여 결과 배열에 추가합니다. LIFO 원칙에 따라 역순으로 반환됩니다.',
    ],
    tags: ['스택', 'LIFO', 'Push', 'Pop'],
  },
  {
    id: 'stack-reverse-string',
    conceptId: 'stack',
    title: '스택을 이용한 문자열 역순 만들기',
    difficulty: 'easy',
    description:
      '스택을 사용하여 주어진 문자열을 역순으로 만드는 함수를 작성하세요. 문자열의 각 문자를 스택에 push한 후, 모두 pop하여 역순 문자열을 반환하세요.',
    examples: [
      {
        input: '"hello"',
        output: '"olleh"',
        explanation: 'h, e, l, l, o를 스택에 push한 후 pop하면 o, l, l, e, h가 됩니다.',
      },
      {
        input: '"world"',
        output: '"dlrow"',
        explanation: 'w, o, r, l, d를 스택에 push한 후 pop하면 d, l, r, o, w가 됩니다.',
      },
    ],
    constraints: [
      '문자열의 길이는 0 이상 100 이하입니다.',
      '문자열은 영문자로만 구성됩니다.',
      '스택의 LIFO 특성을 활용해야 합니다.',
    ],
    testCases: [
      {
        input: 'hello',
        expectedOutput: 'olleh',
      },
      {
        input: 'world',
        expectedOutput: 'dlrow',
      },
      {
        input: 'a',
        expectedOutput: 'a',
      },
      {
        input: 'abc',
        expectedOutput: 'cba',
      },
      {
        input: '',
        expectedOutput: '',
      },
      {
        input: 'algorithm',
        expectedOutput: 'mhtirogla',
      },
    ],
    solution: {
      code: `function solution(str: string): string {
  const stack: string[] = [];
  let result = '';

  // 각 문자를 스택에 push
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }

  // 스택에서 모두 pop하여 역순 문자열 만들기
  while (stack.length > 0) {
    result += stack.pop();
  }

  return result;
}

// 더 간단한 방법 (배열 메서드 활용)
// function solution(str: string): string {
//   return str.split('').reverse().join('');
// }`,
      language: 'typescript',
      explanation:
        '문자열의 각 문자를 스택에 push한 후, 모두 pop하여 역순 문자열을 만듭니다. 스택의 LIFO 특성 덕분에 마지막에 push한 문자가 가장 먼저 pop되어 역순이 됩니다.',
    },
    hints: [
      '문자열의 각 문자를 순회하면서 스택에 push합니다.',
      '스택에서 모든 요소를 pop하여 결과 문자열에 추가합니다.',
      '스택의 LIFO 특성 덕분에 자동으로 역순이 됩니다.',
    ],
    tags: ['스택', 'LIFO', '문자열', '역순'],
  },
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

/**
 * 특정 개념 ID에 해당하는 문제들을 가져옵니다.
 */
export const getProblemsByConceptId = (conceptId: string): Problem[] => {
  return problems.filter((problem) => problem.conceptId === conceptId);
};

/**
 * 특정 문제 ID로 문제를 가져옵니다.
 */
export const getProblemById = (problemId: string): Problem | undefined => {
  return problems.find((problem) => problem.id === problemId);
};

/**
 * 랜덤 문제를 가져옵니다.
 * @param conceptId 선택적. 특정 개념의 문제만 가져올 수 있습니다.
 * @param difficulty 선택적. 특정 난이도의 문제만 가져올 수 있습니다.
 */
export const getRandomProblem = (
  conceptId?: string,
  difficulty?: Problem['difficulty']
): Problem | undefined => {
  let filteredProblems = problems;

  if (conceptId) {
    filteredProblems = filteredProblems.filter((p) => p.conceptId === conceptId);
  }

  if (difficulty) {
    filteredProblems = filteredProblems.filter((p) => p.difficulty === difficulty);
  }

  if (filteredProblems.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * filteredProblems.length);
  return filteredProblems[randomIndex];
};

