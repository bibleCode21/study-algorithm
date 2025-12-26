import { Exercise } from '@/features/practice/types/exercise';

export const heapExercises: Exercise[] = [
  {
    id: 'heap-max-heap',
    conceptId: 'heap',
    title: '최대 힙 구현하기',
    difficulty: 'medium',
    description:
      '최대 힙(Max Heap)을 구현하세요. 최대 힙은 각 노드의 값이 자식 노드의 값보다 크거나 같은 완전 이진 트리입니다. 배열 인덱스 1부터 시작하는 방식으로 구현하세요. insert 메서드와 pop 메서드를 구현해야 합니다.',
    examples: [
      {
        input: 'heap.insert(15); heap.insert(10); heap.insert(20); heap.insert(5); heap.pop()',
        output: '20',
        explanation: '최대 힙에 15, 10, 20, 5를 삽입하면 루트에 최대값인 20이 위치합니다. pop()을 호출하면 20이 반환됩니다.',
      },
      {
        input: 'heap.insert(3); heap.insert(1); heap.insert(2); heap.pop(); heap.pop()',
        output: '3, 2',
        explanation: '3, 1, 2를 삽입하면 루트에 3이 위치합니다. 첫 번째 pop()은 3을 반환하고, 두 번째 pop()은 2를 반환합니다.',
      },
    ],
    constraints: [
      '배열 인덱스 1부터 시작합니다 (0번 인덱스는 null로 초기화).',
      'insert 메서드는 O(log n) 시간 복잡도여야 합니다.',
      'pop 메서드는 O(log n) 시간 복잡도여야 합니다.',
      '힙이 비어있을 때 pop()을 호출하면 null을 반환해야 합니다.',
    ],
    testCases: [
      {
        input: {
          operations: [
            { type: 'insert', value: 15 },
            { type: 'insert', value: 10 },
            { type: 'insert', value: 20 },
            { type: 'insert', value: 5 },
            { type: 'pop' },
          ],
        },
        expectedOutput: 20,
      },
      {
        input: {
          operations: [
            { type: 'insert', value: 3 },
            { type: 'insert', value: 1 },
            { type: 'insert', value: 2 },
            { type: 'pop' },
            { type: 'pop' },
          ],
        },
        expectedOutput: [3, 2],
      },
      {
        input: {
          operations: [{ type: 'pop' }],
        },
        expectedOutput: null,
      },
    ],
    solution: {
      code: `class MaxHeap {
  private heapArray: (number | null)[] = [null];

  constructor(data?: number) {
    if (data !== undefined) {
      this.heapArray.push(data);
    }
  }

  private moveUp(insertedIdx: number): boolean {
    if (insertedIdx <= 1) {
      return false;
    }

    const parentIdx = Math.floor(insertedIdx / 2);
    if (this.heapArray[insertedIdx]! > this.heapArray[parentIdx]!) {
      return true;
    } else {
      return false;
    }
  }

  insert(data: number): boolean {
    if (this.heapArray.length === 1) {
      this.heapArray.push(data);
      return true;
    }

    this.heapArray.push(data);
    let insertedIdx = this.heapArray.length - 1;

    while (this.moveUp(insertedIdx)) {
      const parentIdx = Math.floor(insertedIdx / 2);
      [this.heapArray[insertedIdx], this.heapArray[parentIdx]] = [
        this.heapArray[parentIdx],
        this.heapArray[insertedIdx],
      ];
      insertedIdx = parentIdx;
    }

    return true;
  }

  private moveDown(poppedIdx: number): boolean {
    const leftChildPoppedIdx = poppedIdx * 2;
    const rightChildPoppedIdx = poppedIdx * 2 + 1;

    if (leftChildPoppedIdx >= this.heapArray.length) {
      return false;
    } else if (rightChildPoppedIdx >= this.heapArray.length) {
      if (this.heapArray[poppedIdx]! < this.heapArray[leftChildPoppedIdx]!) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        this.heapArray[leftChildPoppedIdx]! >
        this.heapArray[rightChildPoppedIdx]!
      ) {
        if (
          this.heapArray[poppedIdx]! < this.heapArray[leftChildPoppedIdx]!
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          this.heapArray[poppedIdx]! < this.heapArray[rightChildPoppedIdx]!
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  pop(): number | null {
    if (this.heapArray.length <= 1) {
      return null;
    }

    const returnedData = this.heapArray[1]!;
    this.heapArray[1] = this.heapArray[this.heapArray.length - 1]!;
    this.heapArray.pop();
    let poppedIdx = 1;

    while (this.moveDown(poppedIdx)) {
      const leftChildPoppedIdx = poppedIdx * 2;
      const rightChildPoppedIdx = poppedIdx * 2 + 1;

      if (rightChildPoppedIdx >= this.heapArray.length) {
        if (
          this.heapArray[poppedIdx]! < this.heapArray[leftChildPoppedIdx]!
        ) {
          [this.heapArray[poppedIdx], this.heapArray[leftChildPoppedIdx]] = [
            this.heapArray[leftChildPoppedIdx],
            this.heapArray[poppedIdx],
          ];
          poppedIdx = leftChildPoppedIdx;
        }
      } else {
        if (
          this.heapArray[leftChildPoppedIdx]! >
          this.heapArray[rightChildPoppedIdx]!
        ) {
          if (
            this.heapArray[poppedIdx]! < this.heapArray[leftChildPoppedIdx]!
          ) {
            [this.heapArray[poppedIdx], this.heapArray[leftChildPoppedIdx]] = [
              this.heapArray[leftChildPoppedIdx],
              this.heapArray[poppedIdx],
            ];
            poppedIdx = leftChildPoppedIdx;
          }
        } else {
          if (
            this.heapArray[poppedIdx]! < this.heapArray[rightChildPoppedIdx]!
          ) {
            [this.heapArray[poppedIdx], this.heapArray[rightChildPoppedIdx]] = [
              this.heapArray[rightChildPoppedIdx],
              this.heapArray[poppedIdx],
            ];
            poppedIdx = rightChildPoppedIdx;
          }
        }
      }
    }

    return returnedData;
  }
}`,
      language: 'typescript',
      explanation:
        '최대 힙은 배열 인덱스 1부터 시작하는 방식으로 구현합니다. insert 메서드는 배열 끝에 요소를 추가한 후 moveUp을 통해 부모 노드와 비교하여 힙 속성을 유지합니다. pop 메서드는 루트 노드를 반환하고, 마지막 요소를 루트로 이동한 후 moveDown을 통해 자식 노드와 비교하여 힙 속성을 유지합니다.',
    },
    hints: [
      '배열 인덱스 1부터 시작하므로 0번 인덱스는 null로 초기화합니다.',
      '부모 인덱스는 자식 인덱스를 2로 나눈 값입니다.',
      '왼쪽 자식 인덱스는 부모 인덱스 * 2, 오른쪽 자식 인덱스는 부모 인덱스 * 2 + 1입니다.',
      'insert 시에는 배열 끝에 추가한 후 부모 노드와 비교하여 위로 올라가며 힙 속성을 유지합니다.',
      'pop 시에는 루트를 제거하고 마지막 요소를 루트로 이동한 후, 자식 노드와 비교하여 아래로 내려가며 힙 속성을 유지합니다.',
    ],
    tags: ['힙', '최대 힙', 'Max Heap', '완전 이진 트리', '우선순위 큐'],
    templateCode: `class MaxHeap {
  private heapArray: (number | null)[] = [null];

  constructor(data?: number) {
    if (data !== undefined) {
      this.heapArray.push(data);
    }
  }

  // 삽입한 노드가 부모 노드보다 클 경우 위치 교환 여부 확인
  private moveUp(insertedIdx: number): boolean {
    // TODO: 루트 노드인지 확인 (insertedIdx <= 1)
    // TODO: 부모 인덱스 계산 (Math.floor(insertedIdx / 2))
    // TODO: 부모 노드보다 큰지 확인하여 반환
  }

  // 데이터 삽입
  insert(data: number): boolean {
    // TODO: 힙이 비어있는 경우 처리
    // TODO: 배열 끝에 데이터 추가
    // TODO: moveUp을 통해 힙 속성 유지 (부모 노드보다 클 경우 교환)
  }

  // root 노드가 자식 노드보다 작을 경우 위치 교환 여부 확인
  private moveDown(poppedIdx: number): boolean {
    const leftChildPoppedIdx = poppedIdx * 2;
    const rightChildPoppedIdx = poppedIdx * 2 + 1;

    // TODO: case1: 왼쪽 자식 노드도 없을 때
    // TODO: case2: 오른쪽 자식 노드만 없을 때
    // TODO: case3: 왼쪽, 오른쪽 자식 노드 모두 있을 때
    // TODO: 자식 노드 중 더 큰 값과 비교하여 교환 필요 여부 반환
  }

  // 최대값 제거 및 반환
  pop(): number | null {
    // TODO: 힙이 비어있는 경우 null 반환
    // TODO: 루트 노드 저장
    // TODO: 마지막 요소를 루트로 이동
    // TODO: moveDown을 통해 힙 속성 유지 (자식 노드보다 작을 경우 교환)
    // TODO: 저장한 루트 노드 반환
  }
}`,
    templateDescriptions: [
      'MaxHeap 클래스를 완성하세요. 배열 인덱스 1부터 시작하는 방식으로 구현합니다.',
    ],
  },
  {
    id: 'heap-min-heap',
    conceptId: 'heap',
    title: '최소 힙 구현하기',
    difficulty: 'medium',
    description:
      '최소 힙(Min Heap)을 구현하세요. 최소 힙은 각 노드의 값이 자식 노드의 값보다 작거나 같은 완전 이진 트리입니다. 배열 인덱스 0부터 시작하는 방식으로 구현하세요. insert 메서드와 extractMin 메서드를 구현해야 합니다.',
    examples: [
      {
        input: 'heap.insert(5); heap.insert(3); heap.insert(8); heap.insert(1); heap.extractMin()',
        output: '1',
        explanation: '최소 힙에 5, 3, 8, 1을 삽입하면 루트에 최소값인 1이 위치합니다. extractMin()을 호출하면 1이 반환됩니다.',
      },
      {
        input: 'heap.insert(10); heap.insert(5); heap.insert(7); heap.extractMin(); heap.extractMin()',
        output: '5, 7',
        explanation: '10, 5, 7을 삽입하면 루트에 5가 위치합니다. 첫 번째 extractMin()은 5를 반환하고, 두 번째 extractMin()은 7을 반환합니다.',
      },
    ],
    constraints: [
      '배열 인덱스 0부터 시작합니다.',
      'insert 메서드는 O(log n) 시간 복잡도여야 합니다.',
      'extractMin 메서드는 O(log n) 시간 복잡도여야 합니다.',
      '힙이 비어있을 때 extractMin()을 호출하면 null을 반환해야 합니다.',
    ],
    testCases: [
      {
        input: {
          operations: [
            { type: 'insert', value: 5 },
            { type: 'insert', value: 3 },
            { type: 'insert', value: 8 },
            { type: 'insert', value: 1 },
            { type: 'extractMin' },
          ],
        },
        expectedOutput: 1,
      },
      {
        input: {
          operations: [
            { type: 'insert', value: 10 },
            { type: 'insert', value: 5 },
            { type: 'insert', value: 7 },
            { type: 'extractMin' },
            { type: 'extractMin' },
          ],
        },
        expectedOutput: [5, 7],
      },
      {
        input: {
          operations: [{ type: 'extractMin' }],
        },
        expectedOutput: null,
      },
    ],
    solution: {
      code: `class MinHeap<T> {
  private heap: T[] = [];

  // 부모 인덱스
  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // 왼쪽 자식 인덱스
  private leftChild(index: number): number {
    return 2 * index + 1;
  }

  // 오른쪽 자식 인덱스
  private rightChild(index: number): number {
    return 2 * index + 2;
  }

  // 두 요소 교환
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // 힙 속성 유지 (위로 올라가며)
  private heapifyUp(index: number): void {
    while (index > 0 && this.heap[this.parent(index)] > this.heap[index]) {
      this.swap(this.parent(index), index);
      index = this.parent(index);
    }
  }

  // 힙 속성 유지 (아래로 내려가며)
  private heapifyDown(index: number): void {
    let smallest = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);

    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }

    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  // 요소 추가 (O(log n))
  insert(value: T): void {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  // 최소값 제거 및 반환 (O(log n))
  extractMin(): T | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return min;
  }

  // 최소값 확인 (O(1))
  peek(): T | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // 힙 크기
  size(): number {
    return this.heap.length;
  }

  // 힙이 비어있는지 확인
  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}`,
      language: 'typescript',
      explanation:
        '최소 힙은 배열 인덱스 0부터 시작하는 방식으로 구현합니다. insert 메서드는 배열 끝에 요소를 추가한 후 heapifyUp을 통해 부모 노드와 비교하여 힙 속성을 유지합니다. extractMin 메서드는 루트 노드를 반환하고, 마지막 요소를 루트로 이동한 후 heapifyDown을 통해 자식 노드와 비교하여 힙 속성을 유지합니다.',
    },
    hints: [
      '배열 인덱스 0부터 시작하므로 부모 인덱스는 Math.floor((자식 인덱스 - 1) / 2)입니다.',
      '왼쪽 자식 인덱스는 부모 인덱스 * 2 + 1, 오른쪽 자식 인덱스는 부모 인덱스 * 2 + 2입니다.',
      'insert 시에는 배열 끝에 추가한 후 부모 노드와 비교하여 위로 올라가며 힙 속성을 유지합니다.',
      'extractMin 시에는 루트를 제거하고 마지막 요소를 루트로 이동한 후, 자식 노드와 비교하여 아래로 내려가며 힙 속성을 유지합니다.',
      '최소 힙이므로 부모 노드는 자식 노드보다 작거나 같아야 합니다.',
    ],
    tags: ['힙', '최소 힙', 'Min Heap', '완전 이진 트리', '우선순위 큐'],
    templateCode: `class MinHeap<T> {
  private heap: T[] = [];

  // 부모 인덱스
  private parent(index: number): number {
    // TODO: 부모 인덱스 계산 (Math.floor((index - 1) / 2))
  }

  // 왼쪽 자식 인덱스
  private leftChild(index: number): number {
    // TODO: 왼쪽 자식 인덱스 계산 (부모 인덱스 * 2 + 1)
  }

  // 오른쪽 자식 인덱스
  private rightChild(index: number): number {
    // TODO: 오른쪽 자식 인덱스 계산 (부모 인덱스 * 2 + 2)
  }

  // 두 요소 교환
  private swap(i: number, j: number): void {
    // TODO: 배열의 두 요소 교환
  }

  // 힙 속성 유지 (위로 올라가며)
  private heapifyUp(index: number): void {
    // TODO: 루트 노드가 아니고 부모 노드보다 작을 경우
    // TODO: 부모 노드와 교환하고 계속 위로 올라가기
  }

  // 힙 속성 유지 (아래로 내려가며)
  private heapifyDown(index: number): void {
    let smallest = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);

    // TODO: 왼쪽 자식이 존재하고 더 작은지 확인
    // TODO: 오른쪽 자식이 존재하고 더 작은지 확인
    // TODO: smallest가 index와 다르면 교환하고 재귀 호출
  }

  // 요소 추가 (O(log n))
  insert(value: T): void {
    // TODO: 배열 끝에 요소 추가
    // TODO: heapifyUp을 통해 힙 속성 유지
  }

  // 최소값 제거 및 반환 (O(log n))
  extractMin(): T | null {
    // TODO: 힙이 비어있는 경우 null 반환
    // TODO: 요소가 하나만 있는 경우 pop() 반환
    // TODO: 루트 노드 저장
    // TODO: 마지막 요소를 루트로 이동
    // TODO: heapifyDown을 통해 힙 속성 유지
    // TODO: 저장한 루트 노드 반환
  }

  // 최소값 확인 (O(1))
  peek(): T | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // 힙 크기
  size(): number {
    return this.heap.length;
  }

  // 힙이 비어있는지 확인
  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}`,
    templateDescriptions: [
      'MinHeap 클래스를 완성하세요. 배열 인덱스 0부터 시작하는 방식으로 구현합니다.',
    ],
  },
];

