import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 힙 기본 개념
// 힙: 데이터에서 최대값과 최소값을 빠르게 찾기 위해 고안된 완전 이진 트리
// 완전 이진 트리: 노드를 삽입할 때 최하단 왼쪽 노드부터 차례대로 삽입하는 트리

// 힙과 배열의 관계
// 배열 인덱스 0부터 시작하는 경우 (표준):
// - 부모 인덱스 = Math.floor((자식 인덱스 - 1) / 2)
// - 왼쪽 자식 인덱스 = 부모 인덱스 * 2 + 1
// - 오른쪽 자식 인덱스 = 부모 인덱스 * 2 + 2

// 예제: 인덱스 0부터 시작하는 경우
const parent = (index: number): number => {
  return Math.floor((index - 1) / 2);
};

const leftChild = (index: number): number => {
  return index * 2 + 1;
};

const rightChild = (index: number): number => {
  return index * 2 + 2;
};

// 사용 예제
const childIdx = 5;
const parentIdx = parent(childIdx); // 2
const leftIdx = leftChild(0); // 1
const rightIdx = rightChild(0); // 2`,
  },
  {
    language: 'typescript',
    code: `// 최대 힙 구현 (Max Heap)
// 배열 인덱스 0부터 시작하는 방식 (표준)
// 각 노드의 값은 자식 노드의 값보다 크거나 같아야 함

class MaxHeap<T> {
  private heap: T[] = [];

  // 부모 인덱스
  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // 삽입한 노드가 부모 노드보다 클 경우 위치 교환 여부 확인
  private moveUp(insertedIdx: number): boolean {
    if (insertedIdx <= 0) {
      return false;
    }

    const parentIdx = this.parent(insertedIdx);
    if (this.heap[insertedIdx] > this.heap[parentIdx]) {
      return true;
    } else {
      return false;
    }
  }

  // 데이터 삽입
  insert(data: T): boolean {
    this.heap.push(data);
    let insertedIdx = this.heap.length - 1;

    // 부모 노드보다 클 경우 위치 교환 반복
    while (this.moveUp(insertedIdx)) {
      const parentIdx = this.parent(insertedIdx);
      [this.heap[insertedIdx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[insertedIdx],
      ];
      insertedIdx = parentIdx;
    }

    return true;
  }
}

// 사용 예제
// const heap = new MaxHeap<number>();
// heap.insert(15);
// heap.insert(10);
// heap.insert(8);
// heap.insert(5);
// heap.insert(4);
// heap.insert(20);
// heap: [20, 15, 10, 5, 4, 8]`,
  },
  {
    language: 'typescript',
    code: `// 최대 힙 데이터 삭제 구현
// 보통 최상단 노드(root 노드)를 삭제하는 것이 일반적
// 힙의 용도는 최대값 또는 최소값을 root 노드에 놓아서 바로 꺼내 쓸 수 있도록 하는 것

class MaxHeap<T> {
  private heap: T[] = [];

  // insert 메서드는 이전 예제 참고
  insert(data: T): boolean {
    // 이전 예제의 insert 구현
    return true;
  }

  // 왼쪽 자식 인덱스
  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  // 오른쪽 자식 인덱스
  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  // root 노드가 자식 노드보다 작을 경우 위치 교환 여부 확인
  private moveDown(poppedIdx: number): boolean {
    const leftChildPoppedIdx = this.leftChild(poppedIdx);
    const rightChildPoppedIdx = this.rightChild(poppedIdx);

    // case1: 왼쪽 자식 노드도 없을 때
    if (leftChildPoppedIdx >= this.heap.length) {
      return false;
    }
    // case2: 오른쪽 자식 노드만 없을 때
    else if (rightChildPoppedIdx >= this.heap.length) {
      if (this.heap[poppedIdx] < this.heap[leftChildPoppedIdx]) {
        return true;
      } else {
        return false;
      }
    }
    // case3: 왼쪽, 오른쪽 자식 노드 모두 있을 때
    else {
      if (
        this.heap[leftChildPoppedIdx] >
        this.heap[rightChildPoppedIdx]
      ) {
        if (this.heap[poppedIdx] < this.heap[leftChildPoppedIdx]) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.heap[poppedIdx] < this.heap[rightChildPoppedIdx]) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  // 최대값 제거 및 반환
  pop(): T | null {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop()!;
    }

    const returnedData = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    let poppedIdx = 0;

    // 자식 노드보다 작을 경우 위치 교환 반복
    while (this.moveDown(poppedIdx)) {
      const leftChildPoppedIdx = this.leftChild(poppedIdx);
      const rightChildPoppedIdx = this.rightChild(poppedIdx);

      // case2: 오른쪽 자식 노드만 없을 때
      if (rightChildPoppedIdx >= this.heap.length) {
        if (this.heap[poppedIdx] < this.heap[leftChildPoppedIdx]) {
          [this.heap[poppedIdx], this.heap[leftChildPoppedIdx]] = [
            this.heap[leftChildPoppedIdx],
            this.heap[poppedIdx],
          ];
          poppedIdx = leftChildPoppedIdx;
        }
      }
      // case3: 왼쪽, 오른쪽 자식 노드 모두 있을 때
      else {
        if (
          this.heap[leftChildPoppedIdx] >
          this.heap[rightChildPoppedIdx]
        ) {
          if (this.heap[poppedIdx] < this.heap[leftChildPoppedIdx]) {
            [this.heap[poppedIdx], this.heap[leftChildPoppedIdx]] = [
              this.heap[leftChildPoppedIdx],
              this.heap[poppedIdx],
            ];
            poppedIdx = leftChildPoppedIdx;
          }
        } else {
          if (this.heap[poppedIdx] < this.heap[rightChildPoppedIdx]) {
            [this.heap[poppedIdx], this.heap[rightChildPoppedIdx]] = [
              this.heap[rightChildPoppedIdx],
              this.heap[poppedIdx],
            ];
            poppedIdx = rightChildPoppedIdx;
          }
        }
      }
    }

    return returnedData;
  }
}

// 사용 예제
// const heap = new MaxHeap<number>();
// heap.insert(15);
// heap.insert(10);
// heap.insert(8);
// heap.insert(5);
// heap.insert(4);
// heap.insert(20);
// heap: [20, 15, 10, 5, 4, 8]
// const max = heap.pop(); // 20 (최대값)
// heap: [15, 10, 8, 5, 4]`,
  },
  {
    language: 'typescript',
    code: `// 최대 힙 완전 구현 (Max Heap)
// 배열 인덱스 0부터 시작하는 방식 (표준)

class MaxHeap<T> {
  private heap: T[] = [];

  constructor(data?: T) {
    if (data !== undefined) {
      this.heap.push(data);
    }
  }

  // 부모 인덱스
  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // 왼쪽 자식 인덱스
  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  // 오른쪽 자식 인덱스
  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  // 두 요소 교환
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // 힙 속성 유지 (위로 올라가며)
  private heapifyUp(index: number): void {
    while (index > 0 && this.heap[this.parent(index)] < this.heap[index]) {
      this.swap(this.parent(index), index);
      index = this.parent(index);
    }
  }

  // 힙 속성 유지 (아래로 내려가며)
  private heapifyDown(index: number): void {
    let largest = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);

    if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
      largest = left;
    }

    if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(index, largest);
      this.heapifyDown(largest);
    }
  }

  // 요소 추가 (O(log n))
  insert(value: T): void {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  // 최대값 제거 및 반환 (O(log n))
  pop(): T | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return max;
  }

  // 최대값 확인 (O(1))
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
}

// 사용 예제
const heap = new MaxHeap<number>(15);
heap.insert(10);
heap.insert(8);
heap.insert(5);
heap.insert(4);
heap.insert(20);
const max1 = heap.pop(); // 20
const max2 = heap.pop(); // 15
const max3 = heap.pop(); // 10`,
  },
  {
    language: 'typescript',
    code: `// 최소 힙 구현 (Min Heap)
// 배열 인덱스 0부터 시작하는 방식
// 각 노드의 값은 자식 노드의 값보다 작거나 같아야 함

class MinHeap<T> {
  private heap: T[] = [];

  constructor(data?: T) {
    if (data !== undefined) {
      this.heap.push(data);
    }
  }

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
}

// 사용 예제
const minHeap = new MinHeap<number>();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(1);
const min = minHeap.peek(); // 1 (최소값)
const extracted = minHeap.extractMin(); // 1`,
  },
];

