import { Exercise } from '@/features/practice/types/exercise';

export const queueExercises: Exercise[] = [
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
];

