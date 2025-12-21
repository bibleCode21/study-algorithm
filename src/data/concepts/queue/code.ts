import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 기본 큐 구현 (FIFO - First-In, First-Out)
class Queue<T> {
  private items: T[] = [];

  // Enqueue: 큐에 데이터를 넣는 기능
  enqueue(item: T): void {
    this.items.push(item);
  }

  // Dequeue: 큐에서 데이터를 꺼내는 기능
  dequeue(): T | undefined {
    return this.items.shift();
  }

  // front: 가장 앞에 있는 데이터 확인 (제거하지 않음)
  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 사용 예제
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
const first = queue.dequeue(); // 1 (가장 먼저 추가된 요소)
const second = queue.dequeue(); // 2`,
  },
  {
    language: 'typescript',
    code: `// LifoQueue 구현 (LIFO - Last-In, First-Out, 스택과 동일)
class LifoQueue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.pop(); // 마지막 요소 제거
  }

  top(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 사용 예제
const lifoQueue = new LifoQueue<number>();
lifoQueue.enqueue(1);
lifoQueue.enqueue(2);
lifoQueue.enqueue(3);
const last = lifoQueue.dequeue(); // 3 (가장 나중에 추가된 요소)
const second = lifoQueue.dequeue(); // 2`,
  },
  {
    language: 'typescript',
    code: `// PriorityQueue 구현 (우선순위 큐)
// 우선순위가 높은 순서대로 데이터 출력
class PriorityQueue<T> {
  private items: Array<[number, T]> = [];

  // 우선순위와 데이터를 함께 저장
  enqueue(priority: number, item: T): void {
    this.items.push([priority, item]);
    // 우선순위 순으로 정렬 (낮은 숫자가 높은 우선순위)
    this.items.sort((a, b) => a[0] - b[0]);
  }

  dequeue(): T | undefined {
    const item = this.items.shift();
    return item ? item[1] : undefined;
  }

  peek(): T | undefined {
    return this.items.length > 0 ? this.items[0][1] : undefined;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 사용 예제
const priorityQueue = new PriorityQueue<string>();
priorityQueue.enqueue(10, 'korea');
priorityQueue.enqueue(5, 'japan');   // 우선순위 5 (가장 높음)
priorityQueue.enqueue(15, 'china');

const first = priorityQueue.dequeue(); // 'japan' (우선순위 5)
const second = priorityQueue.dequeue(); // 'korea' (우선순위 10)
const third = priorityQueue.dequeue(); // 'china' (우선순위 15)`,
  },
  {
    language: 'typescript',
    code: `// 리스트를 이용한 큐 구현 (간단한 방법)
const queueList: number[] = [];

// Enqueue 함수
const enqueue = (data: number): void => {
  queueList.push(data);
};

// Dequeue 함수
const dequeue = (): number | undefined => {
  if (queueList.length === 0) {
    return undefined;
  }
  const data = queueList[0];
  queueList.shift(); // 첫 번째 요소 제거
  return data;
};

// 사용 예제
for (let index = 0; index < 10; index++) {
  enqueue(index);
}

const size = queueList.length; // 10

const first = dequeue(); // 0 (가장 먼저 추가된 요소)
const second = dequeue(); // 1
const third = dequeue(); // 2`,
  },
];

