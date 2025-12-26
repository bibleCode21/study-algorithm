import { Exercise } from '@/features/practice/types/exercise';

export const stackExercises: Exercise[] = [
  {
    id: 'stack-push-pop',
    conceptId: 'stack',
    title: '스택의 Push와 Pop 구현하기',
    difficulty: 'easy',
    description:
      '리스트를 사용하여 스택의 push와 pop 기능을 구현하세요. 주어진 배열의 모든 요소를 순서대로 스택에 push한 후, 지정된 개수만큼 pop하여 반환하는 함수를 작성하세요.',
    examples: [
      {
        input: 'items = [1, 2, 3], count = 2',
        output: '[3, 2]',
        explanation: '1, 2, 3을 순서대로 push한 후, 2개를 pop하면 3, 2가 반환됩니다 (LIFO).',
      },
      {
        input: 'items = [10, 20, 30], count = 3',
        output: '[30, 20, 10]',
        explanation: '모든 요소를 push한 후 모두 pop하면 역순으로 반환됩니다 (LIFO).',
      },
    ],
    constraints: [
      'items 배열의 길이는 0 이상 100 이하입니다.',
      'count는 0 이상 items 배열의 길이 이하입니다.',
      '배열의 각 요소는 정수입니다.',
      'LIFO(Last-In, First-Out) 원칙을 따라야 합니다.',
    ],
    testCases: [
      {
        input: [[1, 2, 3], 2],
        expectedOutput: [3, 2],
      },
      {
        input: [[10, 20, 30, 40, 50], 3],
        expectedOutput: [50, 40, 30],
      },
      {
        input: [[5, 15, 25], 1],
        expectedOutput: [25],
      },
      {
        input: [[1, 2, 3], 3],
        expectedOutput: [3, 2, 1],
      },
      {
        input: [[3], 1],
        expectedOutput: [3],
      },
      {
        input: [[3], 2],
        expectedOutput: [3],
      },
      {
        input: [[7, 8, 9], 1],
        expectedOutput: [9],
      },
      {
        input: [[1, 2], 1],
        expectedOutput: [2],
      },
      {
        input: [[100, 200, 300, 400], 2],
        expectedOutput: [400, 300],
      },
    ],
    solution: {
      code: `const solution = (items: number[], count: number): number[] => {
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
  for (const item of items) {
    push(item);
  }

  // 지정된 개수만큼 pop
  for (let i = 0; i < count; i++) {
    const item = pop();
    if (item !== undefined) {
      results.push(item);
    }
  }

  return results;
};`,
      language: 'typescript',
      explanation:
        '리스트를 사용하여 스택을 구현합니다. push는 배열의 push 메서드를 사용하여 끝에 추가하고, pop은 배열의 pop 메서드를 사용하여 마지막 요소를 제거합니다. LIFO 원칙에 따라 가장 나중에 추가된 요소가 가장 먼저 제거됩니다.',
    },
    hints: [
      '리스트의 push 메서드를 사용하여 스택에 데이터를 추가합니다.',
      '리스트의 pop 메서드를 사용하여 스택에서 데이터를 제거합니다.',
      '모든 요소를 push한 후, 지정된 개수만큼 pop하여 결과 배열에 추가합니다. LIFO 원칙에 따라 역순으로 반환됩니다.',
    ],
    tags: ['스택', 'LIFO', 'Push', 'Pop'],
    templateCode: `const solution = (items: number[], count: number): number[] => {
  // 여기에 코드를 작성하세요
  return [];
};`,
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
        input: 'xyz',
        expectedOutput: 'zyx',
      },
      {
        input: 'algorithm',
        expectedOutput: 'mhtirogla',
      },
    ],
    solution: {
      code: `const solution = (str: string): string => {
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
};

// 더 간단한 방법 (배열 메서드 활용)
// const solution = (str: string): string => {
//   return str.split('').reverse().join('');
// };`,
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
    templateCode: `const solution = (str: string): string => {
  // 여기에 코드를 작성하세요
  return '';
};`,
  },
];

