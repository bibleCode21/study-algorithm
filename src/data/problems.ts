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
  {
    id: 'linked-list-append',
    conceptId: 'linked-list',
    title: '링크드 리스트에 데이터 추가하기',
    difficulty: 'easy',
    description:
      '링크드 리스트의 끝에 데이터를 추가하는 함수를 구현하세요. 주어진 숫자 배열의 모든 요소를 순서대로 링크드 리스트에 추가한 후, 링크드 리스트의 모든 데이터를 배열로 반환하세요.',
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        output: '[1, 2, 3, 4, 5]',
        explanation: '1부터 5까지 순서대로 링크드 리스트에 추가됩니다.',
      },
      {
        input: '[10, 20, 30]',
        output: '[10, 20, 30]',
        explanation: '10, 20, 30이 순서대로 링크드 리스트에 추가됩니다.',
      },
    ],
    constraints: [
      '배열의 길이는 0 이상 100 이하입니다.',
      '배열의 각 요소는 정수입니다.',
      '링크드 리스트의 Node 클래스를 사용해야 합니다.',
    ],
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        expectedOutput: [1, 2, 3, 4, 5],
      },
      {
        input: [10, 20, 30],
        expectedOutput: [10, 20, 30],
      },
      {
        input: [5],
        expectedOutput: [5],
      },
      {
        input: [],
        expectedOutput: [],
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(arr: number[]): number[] {
  if (arr.length === 0) {
    return [];
  }

  let head: ListNode<number> | null = new ListNode(arr[0]);
  let current = head;

  // 나머지 요소들을 링크드 리스트에 추가
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  // 링크드 리스트를 배열로 변환
  const result: number[] = [];
  current = head;
  while (current !== null) {
    result.push(current.data);
    current = current.next;
  }

  return result;
}`,
      language: 'typescript',
      explanation:
        '첫 번째 요소로 head 노드를 생성하고, 나머지 요소들을 순회하면서 각각을 새로운 노드로 만들어 연결합니다. 마지막으로 링크드 리스트를 순회하여 배열로 변환합니다.',
    },
    hints: [
      '첫 번째 요소로 head 노드를 생성합니다.',
      '나머지 요소들을 순회하면서 각각을 새로운 노드로 만들어 이전 노드의 next에 연결합니다.',
      '링크드 리스트를 순회하여 배열로 변환합니다.',
    ],
    tags: ['링크드 리스트', '노드', '추가', '기초'],
  },
  {
    id: 'linked-list-delete',
    conceptId: 'linked-list',
    title: '링크드 리스트에서 노드 삭제하기',
    difficulty: 'medium',
    description:
      '링크드 리스트에서 특정 값을 가진 노드를 삭제하는 함수를 구현하세요. 주어진 숫자 배열로 링크드 리스트를 만든 후, 지정된 값을 가진 노드를 삭제하고, 남은 링크드 리스트의 모든 데이터를 배열로 반환하세요.',
    examples: [
      {
        input: '{ values: [1, 2, 3, 4, 5], deleteValue: 3 }',
        output: '[1, 2, 4, 5]',
        explanation: '값이 3인 노드를 삭제하면 [1, 2, 4, 5]가 됩니다.',
      },
      {
        input: '{ values: [10, 20, 30], deleteValue: 10 }',
        output: '[20, 30]',
        explanation: 'head 노드(값 10)를 삭제하면 [20, 30]이 됩니다.',
      },
    ],
    constraints: [
      '배열의 길이는 1 이상 100 이하입니다.',
      '삭제할 값은 배열에 반드시 존재합니다.',
      'head 노드를 삭제하는 경우도 고려해야 합니다.',
    ],
    testCases: [
      {
        input: { values: [1, 2, 3, 4, 5], deleteValue: 3 },
        expectedOutput: [1, 2, 4, 5],
      },
      {
        input: { values: [10, 20, 30], deleteValue: 10 },
        expectedOutput: [20, 30],
      },
      {
        input: { values: [1, 2, 3], deleteValue: 2 },
        expectedOutput: [1, 3],
      },
      {
        input: { values: [5], deleteValue: 5 },
        expectedOutput: [],
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(input: { values: number[]; deleteValue: number }): number[] {
  if (input.values.length === 0) {
    return [];
  }

  // 링크드 리스트 생성
  let head: ListNode<number> | null = new ListNode(input.values[0]);
  let current = head;
  for (let i = 1; i < input.values.length; i++) {
    current.next = new ListNode(input.values[i]);
    current = current.next;
  }

  // head 노드를 삭제해야 하는 경우
  if (head.data === input.deleteValue) {
    head = head.next;
  } else {
    // 중간 노드나 마지막 노드를 삭제하는 경우
    current = head;
    while (current.next !== null) {
      if (current.next.data === input.deleteValue) {
        current.next = current.next.next;
        break;
      }
      current = current.next;
    }
  }

  // 링크드 리스트를 배열로 변환
  const result: number[] = [];
  current = head;
  while (current !== null) {
    result.push(current.data);
    current = current.next;
  }

  return result;
}`,
      language: 'typescript',
      explanation:
        'head 노드를 삭제하는 경우와 중간/마지막 노드를 삭제하는 경우를 분리하여 처리합니다. head 노드를 삭제할 때는 head를 head.next로 변경하고, 그 외의 경우에는 이전 노드의 next를 다음 노드로 연결합니다.',
    },
    hints: [
      'head 노드를 삭제하는 경우와 그 외의 경우를 분리하여 처리합니다.',
      'head 노드를 삭제할 때는 head를 head.next로 변경합니다.',
      '중간 노드를 삭제할 때는 이전 노드의 next를 다음 노드로 연결합니다.',
    ],
    tags: ['링크드 리스트', '노드', '삭제', '중급'],
  },
  {
    id: 'linked-list-reverse',
    conceptId: 'linked-list',
    title: '링크드 리스트 역순으로 만들기',
    difficulty: 'medium',
    description:
      '링크드 리스트를 역순으로 만드는 함수를 구현하세요. 주어진 숫자 배열로 링크드 리스트를 만든 후, 링크드 리스트를 역순으로 만들고, 모든 데이터를 배열로 반환하세요.',
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: '링크드 리스트가 역순으로 변경됩니다.',
      },
      {
        input: '[10, 20, 30]',
        output: '[30, 20, 10]',
        explanation: '링크드 리스트가 역순으로 변경됩니다.',
      },
    ],
    constraints: [
      '배열의 길이는 0 이상 100 이하입니다.',
      '원본 링크드 리스트를 직접 수정해야 합니다 (새로운 링크드 리스트를 만들지 않음).',
      'O(1) 공간 복잡도로 구현해야 합니다.',
    ],
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        expectedOutput: [5, 4, 3, 2, 1],
      },
      {
        input: [10, 20, 30],
        expectedOutput: [30, 20, 10],
      },
      {
        input: [1, 2],
        expectedOutput: [2, 1],
      },
      {
        input: [5],
        expectedOutput: [5],
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(arr: number[]): number[] {
  if (arr.length === 0) {
    return [];
  }

  // 링크드 리스트 생성
  let head: Node<number> | null = new Node(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new Node(arr[i]);
    current = current.next;
  }

  // 링크드 리스트 역순으로 만들기
  let prev: Node<number> | null = null;
  current = head;
  
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  head = prev;

  // 링크드 리스트를 배열로 변환
  const result: number[] = [];
  current = head;
  while (current !== null) {
    result.push(current.data);
    current = current.next;
  }

  return result;
}`,
      language: 'typescript',
      explanation:
        '세 개의 포인터(prev, current, next)를 사용하여 링크드 리스트를 역순으로 만듭니다. 각 노드의 next 포인터를 이전 노드를 가리키도록 변경하면서 순회합니다.',
    },
    hints: [
      '세 개의 포인터(prev, current, next)를 사용합니다.',
      '각 노드의 next 포인터를 이전 노드를 가리키도록 변경합니다.',
      '순회가 끝나면 prev가 새로운 head가 됩니다.',
    ],
    tags: ['링크드 리스트', '역순', '포인터', '중급'],
  },
  {
    id: 'linked-list-middle',
    conceptId: 'linked-list',
    title: '링크드 리스트의 중간 노드 찾기',
    difficulty: 'easy',
    description:
      '링크드 리스트의 중간 노드를 찾는 함수를 구현하세요. 주어진 숫자 배열로 링크드 리스트를 만든 후, 중간 노드의 값을 반환하세요. 노드의 개수가 짝수인 경우 두 번째 중간 노드의 값을 반환하세요.',
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        output: '3',
        explanation: '5개의 노드 중 중간 노드는 3번째 노드(값: 3)입니다.',
      },
      {
        input: '[1, 2, 3, 4, 5, 6]',
        output: '4',
        explanation: '6개의 노드 중 두 번째 중간 노드는 4번째 노드(값: 4)입니다.',
      },
    ],
    constraints: [
      '배열의 길이는 1 이상 100 이하입니다.',
      '한 번의 순회로 해결해야 합니다 (O(n) 시간, O(1) 공간).',
    ],
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        expectedOutput: 3,
      },
      {
        input: [1, 2, 3, 4, 5, 6],
        expectedOutput: 4,
      },
      {
        input: [1, 2],
        expectedOutput: 2,
      },
      {
        input: [1],
        expectedOutput: 1,
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(arr: number[]): number {
  // 링크드 리스트 생성
  let head: Node<number> | null = new Node(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new Node(arr[i]);
    current = current.next;
  }

  // 두 개의 포인터를 사용: slow는 한 칸씩, fast는 두 칸씩 이동
  let slow: ListNode<number> | null = head;
  let fast: ListNode<number> | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow!.data;
}`,
      language: 'typescript',
      explanation:
        '두 개의 포인터(slow, fast)를 사용합니다. slow는 한 칸씩, fast는 두 칸씩 이동합니다. fast가 끝에 도달하면 slow는 중간 노드를 가리키게 됩니다. 이를 "토끼와 거북이" 알고리즘이라고도 합니다.',
    },
    hints: [
      '두 개의 포인터(slow, fast)를 사용합니다.',
      'slow는 한 칸씩, fast는 두 칸씩 이동합니다.',
      'fast가 끝에 도달하면 slow는 중간 노드를 가리키게 됩니다.',
    ],
    tags: ['링크드 리스트', '중간 노드', '투 포인터', '기초'],
  },
  {
    id: 'linked-list-cycle',
    conceptId: 'linked-list',
    title: '링크드 리스트에 사이클이 있는지 확인하기',
    difficulty: 'medium',
    description:
      '링크드 리스트에 사이클(순환)이 있는지 확인하는 함수를 구현하세요. 주어진 숫자 배열로 링크드 리스트를 만든 후, 마지막 노드가 특정 인덱스의 노드를 가리키도록 연결하여 사이클을 만들 수 있습니다. 사이클이 있으면 true, 없으면 false를 반환하세요.',
    examples: [
      {
        input: '{ values: [3, 2, 0, -4], cycleIndex: 1 }',
        output: 'true',
        explanation: '마지막 노드(-4)가 인덱스 1의 노드(2)를 가리켜 사이클이 형성됩니다.',
      },
      {
        input: '{ values: [1, 2], cycleIndex: 0 }',
        output: 'true',
        explanation: '마지막 노드(2)가 첫 번째 노드(1)를 가리켜 사이클이 형성됩니다.',
      },
      {
        input: '{ values: [1], cycleIndex: -1 }',
        output: 'false',
        explanation: '사이클이 없습니다.',
      },
    ],
    constraints: [
      '배열의 길이는 0 이상 100 이하입니다.',
      'cycleIndex가 -1이면 사이클이 없습니다.',
      'O(1) 공간 복잡도로 해결해야 합니다.',
    ],
    testCases: [
      {
        input: { values: [3, 2, 0, -4], cycleIndex: 1 },
        expectedOutput: true,
      },
      {
        input: { values: [1, 2], cycleIndex: 0 },
        expectedOutput: true,
      },
      {
        input: { values: [1], cycleIndex: -1 },
        expectedOutput: false,
      },
      {
        input: { values: [1, 2, 3], cycleIndex: -1 },
        expectedOutput: false,
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(input: { values: number[]; cycleIndex: number }): boolean {
  if (input.values.length === 0) {
    return false;
  }

  // 링크드 리스트 생성
  const nodes: Node<number>[] = [];
  let head: Node<number> | null = new Node(input.values[0]);
  nodes.push(head);
  let current = head;

  for (let i = 1; i < input.values.length; i++) {
    current.next = new Node(input.values[i]);
    current = current.next;
    nodes.push(current);
  }

  // 사이클 생성
  if (input.cycleIndex >= 0 && input.cycleIndex < nodes.length) {
    current.next = nodes[input.cycleIndex];
  }

  // Floyd's Cycle Detection Algorithm (토끼와 거북이 알고리즘)
  let slow: ListNode<number> | null = head;
  let fast: ListNode<number> | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // 사이클 발견
    }
  }

  return false; // 사이클 없음
}`,
      language: 'typescript',
      explanation:
        "Floyd's Cycle Detection Algorithm(토끼와 거북이 알고리즘)을 사용합니다. 두 개의 포인터를 사용하여 slow는 한 칸씩, fast는 두 칸씩 이동합니다. 사이클이 있으면 언젠가 두 포인터가 만나게 됩니다.",
    },
    hints: [
      "Floyd's Cycle Detection Algorithm을 사용합니다.",
      '두 개의 포인터(slow, fast)를 사용하여 slow는 한 칸씩, fast는 두 칸씩 이동합니다.',
      '사이클이 있으면 두 포인터가 만나게 됩니다.',
    ],
    tags: ['링크드 리스트', '사이클', '투 포인터', '중급'],
  },
  {
    id: 'linked-list-node-mgmt',
    conceptId: 'linked-list',
    title: 'NodeMgmt 클래스 구현하기',
    difficulty: 'medium',
    description:
      '링크드 리스트를 관리하는 NodeMgmt 클래스를 구현하세요. Node 클래스와 NodeMgmt 클래스를 작성하고, add, desc, delete, searchNode 메서드를 구현하세요.',
    examples: [
      {
        input: '{ operations: ["add", "add", "add", "desc"], values: [1, 2, 3] }',
        output: '[1, 2, 3]',
        explanation: '1, 2, 3을 순서대로 추가한 후 desc()로 모든 데이터를 반환합니다.',
      },
    ],
    constraints: [
      'Node 클래스와 NodeMgmt 클래스를 모두 구현해야 합니다.',
      'add 메서드는 링크드 리스트 끝에 데이터를 추가합니다.',
      'desc 메서드는 링크드 리스트의 모든 데이터를 배열로 반환합니다.',
      'delete 메서드는 특정 값을 가진 노드를 삭제합니다.',
      'searchNode 메서드는 특정 값을 가진 노드를 반환합니다.',
    ],
    testCases: [
      {
        input: {
          operations: ['add', 'add', 'add', 'desc'],
          values: [1, 2, 3],
        },
        expectedOutput: [1, 2, 3],
      },
      {
        input: {
          operations: ['add', 'add', 'delete', 'desc'],
          values: [1, 2, 1],
        },
        expectedOutput: [2],
      },
    ],
    templateCode: [
      `// ListNode 클래스와 NodeMgmt 클래스를 구현하세요
class ListNode<T> {
  // 여기에 ListNode 클래스를 작성하세요
}

class NodeMgmt<T> {
  // 여기에 NodeMgmt 클래스를 작성하세요
}

const solution = (input: { operations: string[]; values: number[] }): any => {
  // NodeMgmt 인스턴스를 생성하고 operations를 수행한 후 결과를 반환하세요
  // delete 연산의 경우, values 배열에서 다음 값을 가져와서 삭제합니다
  return [];
};`,
    ],
    templateDescriptions: ['클래스 작성'],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: ListNode<T> | null = null;

  constructor(data: T) {
    this.head = new ListNode(data);
  }

  add(data: T): void {
    if (this.head === null) {
      this.head = new ListNode(data);
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    node.next = new ListNode(data);
  }

  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }

  delete(data: T): boolean {
    if (this.head === null) {
      return false;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      return true;
    }

    let node = this.head;
    while (node.next !== null) {
      if (node.next.data === data) {
        node.next = node.next.next;
        return true;
      }
      node = node.next;
    }

    return false;
  }

  searchNode(data: T): ListNode<T> | null {
    let node = this.head;
    
    while (node !== null) {
      if (node.data === data) {
        return node;
      }
      node = node.next;
    }
    
    return null;
  }
}

const solution = (input: { operations: string[]; values: number[] }): any => {
  if (input.values.length === 0) {
    return [];
  }

  const nodeMgmt = new NodeMgmt(input.values[0]);
  let valueIndex = 1;

  for (const op of input.operations) {
    if (op === 'add' && valueIndex < input.values.length) {
      nodeMgmt.add(input.values[valueIndex++]);
    } else if (op === 'delete' && valueIndex < input.values.length) {
      // delete 연산: values 배열에서 다음 값을 가져와서 삭제
      nodeMgmt.delete(input.values[valueIndex++]);
    } else if (op === 'desc') {
      return nodeMgmt.desc();
    }
  }

  return nodeMgmt.desc();
};`,
      language: 'typescript',
      explanation:
        'Node 클래스는 데이터와 next 포인터를 가지고 있고, NodeMgmt 클래스는 head를 관리하며 add, desc, delete, searchNode 메서드를 제공합니다.',
    },
    hints: [
      'Node 클래스는 data와 next 필드를 가져야 합니다.',
      'NodeMgmt 클래스는 head를 private 필드로 관리합니다.',
      'add 메서드는 링크드 리스트의 끝까지 순회한 후 새 노드를 추가합니다.',
      'delete 메서드는 head 노드 삭제와 중간 노드 삭제를 구분하여 처리합니다.',
    ],
    tags: ['링크드 리스트', '클래스', 'NodeMgmt', '중급'],
  },
  {
    id: 'linked-list-doubly',
    conceptId: 'linked-list',
    title: '더블 링크드 리스트 (Doubly Linked List) 구현하기',
    difficulty: 'medium',
    description:
      '양방향으로 연결된 더블 링크드 리스트를 구현하세요. Node 클래스에 prev 포인터를 추가하고, NodeMgmt 클래스에 head와 tail을 관리하며, insert, desc, searchFromHead, searchFromTail 메서드를 구현하세요.',
    examples: [
      {
        input: '{ operations: ["insert", "insert", "insert", "desc"], values: [1, 2, 3] }',
        output: '[1, 2, 3]',
        explanation: '1, 2, 3을 순서대로 삽입한 후 desc()로 모든 데이터를 반환합니다.',
      },
    ],
    constraints: [
      'Node 클래스는 prev와 next 포인터를 모두 가져야 합니다.',
      'NodeMgmt 클래스는 head와 tail을 모두 관리해야 합니다.',
      'insert 메서드는 링크드 리스트 끝에 데이터를 추가합니다.',
      'searchFromHead는 head에서부터 검색합니다.',
      'searchFromTail은 tail에서부터 검색합니다.',
    ],
    testCases: [
      {
        input: {
          operations: ['insert', 'insert', 'insert', 'desc'],
          values: [1, 2, 3],
        },
        expectedOutput: [1, 2, 3],
      },
      {
        input: {
          operations: ['insert', 'insert', 'searchFromHead', 'desc'],
          values: [1, 2, 1],
        },
        expectedOutput: [1, 2],
      },
    ],
    templateCode: [
      `// 더블 링크드 리스트의 Node 클래스와 NodeMgmt 클래스를 구현하세요
class Node<T> {
  // prev, data, next 필드를 가진 Node 클래스를 작성하세요
}

class NodeMgmt<T> {
  // head와 tail을 관리하는 NodeMgmt 클래스를 작성하세요
  // insert, desc, searchFromHead, searchFromTail 메서드를 구현하세요
}

const solution = (input: { operations: string[]; values: number[] }): any => {
  // NodeMgmt 인스턴스를 생성하고 operations를 수행한 후 결과를 반환하세요
  return [];
};`,
    ],
    templateDescriptions: ['더블 링크드 리스트 클래스 작성'],
    solution: {
      code: `class ListNode<T> {
  prev: ListNode<T> | null = null;
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, prev: ListNode<T> | null = null, next: ListNode<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data: T) {
    this.head = new Node(data);
    this.tail = this.head;
  }

  insert(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const new_node = new Node(data);
    node.next = new_node;
    new_node.prev = node;
    this.tail = new_node;
  }

  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }

  searchFromHead(data: T): ListNode<T> | null {
    if (this.head === null) {
      return null;
    }

    let node = this.head;
    while (node !== null) {
      if (node.data === data) {
        return node;
      }
      node = node.next;
    }
    
    return null;
  }

  searchFromTail(data: T): ListNode<T> | null {
    if (this.tail === null) {
      return null;
    }

    let node = this.tail;
    while (node !== null) {
      if (node.data === data) {
        return node;
      }
      node = node.prev;
    }
    
    return null;
  }
}

const solution = (input: { operations: string[]; values: number[] }): any => {
  if (input.values.length === 0) {
    return [];
  }

  const nodeMgmt = new NodeMgmt(input.values[0]);
  let valueIndex = 1;

  for (const op of input.operations) {
    if (op === 'insert' && valueIndex < input.values.length) {
      nodeMgmt.insert(input.values[valueIndex++]);
    } else if (op === 'desc') {
      return nodeMgmt.desc();
    } else if (op === 'searchFromHead' && valueIndex < input.values.length) {
      const node = nodeMgmt.searchFromHead(input.values[valueIndex++]);
      return node ? node.data : null;
    } else if (op === 'searchFromTail' && valueIndex < input.values.length) {
      const node = nodeMgmt.searchFromTail(input.values[valueIndex++]);
      return node ? node.data : null;
    }
  }

  return nodeMgmt.desc();
};`,
      language: 'typescript',
      explanation:
        '더블 링크드 리스트는 각 노드가 prev와 next 포인터를 모두 가지고 있어 양방향 탐색이 가능합니다. head와 tail을 모두 관리하여 양쪽 끝에서 검색할 수 있습니다.',
    },
    hints: [
      'Node 클래스는 prev, data, next 세 개의 필드를 가져야 합니다.',
      'insert 시 이전 노드의 next와 새 노드의 prev를 연결해야 합니다.',
      'searchFromHead는 next 포인터를 따라가며 검색합니다.',
      'searchFromTail은 prev 포인터를 따라가며 검색합니다.',
    ],
    tags: ['링크드 리스트', '더블 링크드 리스트', '양방향', '중급'],
  },
  {
    id: 'linked-list-insert-before',
    conceptId: 'linked-list',
    title: '더블 링크드 리스트: 특정 노드 앞에 데이터 추가하기',
    difficulty: 'hard',
    description:
      '더블 링크드 리스트에서 특정 노드 앞에 데이터를 추가하는 insertBefore 메서드를 구현하세요. tail에서부터 검색하여 특정 값을 가진 노드를 찾은 후, 그 노드 앞에 새 데이터를 삽입하세요.',
    examples: [
      {
        input: '{ values: [1, 2, 3, 4], insertBefore: [{ data: 1.5, beforeData: 2 }] }',
        output: '[1, 1.5, 2, 3, 4]',
        explanation: '값이 2인 노드 앞에 1.5를 삽입합니다.',
      },
    ],
    constraints: [
      'tail에서부터 검색하여 특정 노드를 찾아야 합니다.',
      'head 앞에 삽입하는 경우도 처리해야 합니다.',
      '중간 노드 앞에 삽입하는 경우도 처리해야 합니다.',
      '찾는 노드가 없으면 false를 반환합니다.',
    ],
    testCases: [
      {
        input: {
          values: [1, 2, 3, 4],
          insertBefore: [{ data: 1.5, beforeData: 2 }],
        },
        expectedOutput: [1, 1.5, 2, 3, 4],
      },
      {
        input: {
          values: [1, 2, 3],
          insertBefore: [{ data: 0.5, beforeData: 1 }],
        },
        expectedOutput: [0.5, 1, 2, 3],
      },
    ],
    templateCode: [
      `// 더블 링크드 리스트의 insertBefore 메서드를 구현하세요
class ListNode<T> {
  prev: ListNode<T> | null = null;
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, prev: ListNode<T> | null = null, next: ListNode<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  constructor(data: T) {
    this.head = new ListNode(data);
    this.tail = this.head;
  }

  insert(data: T): void {
    if (this.head === null) {
      this.head = new ListNode(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const new_node = new ListNode(data);
    node.next = new_node;
    new_node.prev = node;
    this.tail = new_node;
  }

  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }

  // insertBefore 메서드를 구현하세요
  insertBefore(data: T, beforeData: T): boolean {
    // tail에서부터 검색하여 beforeData를 가진 노드를 찾고, 그 앞에 data를 삽입하세요
    return false;
  }
}

const solution = (input: { values: number[]; insertBefore: Array<{ data: number; beforeData: number }> }): number[] => {
  if (input.values.length === 0) {
    return [];
  }

  const nodeMgmt = new NodeMgmt(input.values[0]);
  for (let i = 1; i < input.values.length; i++) {
    nodeMgmt.insert(input.values[i]);
  }

  for (const { data, beforeData } of input.insertBefore) {
    nodeMgmt.insertBefore(data, beforeData);
  }

  return nodeMgmt.desc();
};`,
    ],
    templateDescriptions: ['insertBefore 메서드 작성'],
    solution: {
      code: `class ListNode<T> {
  prev: ListNode<T> | null = null;
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, prev: ListNode<T> | null = null, next: ListNode<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data: T) {
    this.head = new Node(data);
    this.tail = this.head;
  }

  insert(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const new_node = new Node(data);
    node.next = new_node;
    new_node.prev = node;
    this.tail = new_node;
  }

  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }

  insertBefore(data: T, beforeData: T): boolean {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
      return true;
    }

    let node = this.tail;
    while (node !== null && node.data !== beforeData) {
      node = node.prev;
    }

    if (node === null) {
      return false;
    }

    // head 앞에 삽입하는 경우
    if (node.prev === null) {
      const new_node = new ListNode(data);
      new_node.next = node;
      node.prev = new_node;
      this.head = new_node;
      return true;
    }

    // 중간에 삽입
    const new_node = new ListNode(data);
    const before_new = node.prev;
    before_new.next = new_node;
    new_node.prev = before_new;
    new_node.next = node;
    node.prev = new_node;
    
    return true;
  }
}

const solution = (input: { values: number[]; insertBefore: Array<{ data: number; beforeData: number }> }): number[] => {
  if (input.values.length === 0) {
    return [];
  }

  const nodeMgmt = new NodeMgmt(input.values[0]);
  for (let i = 1; i < input.values.length; i++) {
    nodeMgmt.insert(input.values[i]);
  }

  for (const { data, beforeData } of input.insertBefore) {
    nodeMgmt.insertBefore(data, beforeData);
  }

  return nodeMgmt.desc();
};`,
      language: 'typescript',
      explanation:
        'tail에서부터 검색하여 특정 노드를 찾은 후, 그 노드 앞에 새 노드를 삽입합니다. head 앞에 삽입하는 경우와 중간에 삽입하는 경우를 구분하여 처리합니다.',
    },
    hints: [
      'tail에서부터 prev 포인터를 따라가며 beforeData를 가진 노드를 찾습니다.',
      'head 앞에 삽입하는 경우 head를 새 노드로 변경해야 합니다.',
      '중간에 삽입할 때는 이전 노드, 새 노드, 현재 노드의 포인터를 모두 연결해야 합니다.',
    ],
    tags: ['링크드 리스트', '더블 링크드 리스트', '삽입', '고급'],
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

