import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 힙 기본 개념
// 힙: 데이터에서 최대값과 최소값을 빠르게 찾기 위해 고안된 완전 이진 트리
// 완전 이진 트리: 노드를 삽입할 때 최하단 왼쪽 노드부터 차례대로 삽입하는 트리

// 힙과 배열의 관계
// 배열 인덱스 0부터 시작하는 경우:
// - 부모 인덱스 = Math.floor((자식 인덱스 - 1) / 2)
// - 왼쪽 자식 인덱스 = 부모 인덱스 * 2 + 1
// - 오른쪽 자식 인덱스 = 부모 인덱스 * 2 + 2

// 배열 인덱스 1부터 시작하는 경우 (구현 편의):
// - 부모 인덱스 = 자식 인덱스 // 2
// - 왼쪽 자식 인덱스 = 부모 인덱스 * 2
// - 오른쪽 자식 인덱스 = 부모 인덱스 * 2 + 1

// 예제: 인덱스 1부터 시작하는 경우
const parentIndex = (childIndex: number): number => {
  return Math.floor(childIndex / 2);
};

const leftChildIndex = (parentIndex: number): number => {
  return parentIndex * 2;
};

const rightChildIndex = (parentIndex: number): number => {
  return parentIndex * 2 + 1;
};

// 사용 예제
const childIdx = 10;
const parentIdx = parentIndex(childIdx); // 5
const leftIdx = leftChildIndex(1); // 2
const rightIdx = rightChildIndex(2); // 5`,
  },
  {
    language: 'typescript',
    code: `// 최대 힙 구현 (Max Heap)
// 배열 인덱스 1부터 시작하는 방식 (구현 편의)
// 각 노드의 값은 자식 노드의 값보다 크거나 같아야 함

class MaxHeap {
  private heapArray: (number | null)[] = [null];

  // 삽입한 노드가 부모 노드보다 클 경우 위치 교환 여부 확인
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

  // 데이터 삽입
  insert(data: number): boolean {
    if (this.heapArray.length === 1) {
      this.heapArray.push(data);
      return true;
    }

    this.heapArray.push(data);
    let insertedIdx = this.heapArray.length - 1;

    // 부모 노드보다 클 경우 위치 교환 반복
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
}

// 사용 예제
// const heap = new MaxHeap();
// heap.insert(15);
// heap.insert(10);
// heap.insert(8);
// heap.insert(5);
// heap.insert(4);
// heap.insert(20);
// heapArray: [null, 20, 10, 15, 5, 4, 8]`,
  },
  {
    language: 'typescript',
    code: `// 최대 힙 데이터 삭제 구현
// 보통 최상단 노드(root 노드)를 삭제하는 것이 일반적
// 힙의 용도는 최대값 또는 최소값을 root 노드에 놓아서 바로 꺼내 쓸 수 있도록 하는 것

class MaxHeap {
  private heapArray: (number | null)[] = [null];

  // insert 메서드는 이전 예제 참고
  insert(data: number): boolean {
    // 이전 예제의 insert 구현
    return true;
  }

  // root 노드가 자식 노드보다 작을 경우 위치 교환 여부 확인
  private moveDown(poppedIdx: number): boolean {
    const leftChildPoppedIdx = poppedIdx * 2;
    const rightChildPoppedIdx = poppedIdx * 2 + 1;

    // case1: 왼쪽 자식 노드도 없을 때
    if (leftChildPoppedIdx >= this.heapArray.length) {
      return false;
    }
    // case2: 오른쪽 자식 노드만 없을 때
    else if (rightChildPoppedIdx >= this.heapArray.length) {
      if (this.heapArray[poppedIdx]! < this.heapArray[leftChildPoppedIdx]!) {
        return true;
      } else {
        return false;
      }
    }
    // case3: 왼쪽, 오른쪽 자식 노드 모두 있을 때
    else {
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

  // 최대값 제거 및 반환
  pop(): number | null {
    if (this.heapArray.length <= 1) {
      return null;
    }

    const returnedData = this.heapArray[1]!;
    this.heapArray[1] = this.heapArray[this.heapArray.length - 1]!;
    this.heapArray.pop();
    let poppedIdx = 1;

    // 자식 노드보다 작을 경우 위치 교환 반복
    while (this.moveDown(poppedIdx)) {
      const leftChildPoppedIdx = poppedIdx * 2;
      const rightChildPoppedIdx = poppedIdx * 2 + 1;

      // case2: 오른쪽 자식 노드만 없을 때
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
      }
      // case3: 왼쪽, 오른쪽 자식 노드 모두 있을 때
      else {
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
}

// 사용 예제
// const heap = new MaxHeap();
// heap.insert(15);
// heap.insert(10);
// heap.insert(8);
// heap.insert(5);
// heap.insert(4);
// heap.insert(20);
// heapArray: [null, 20, 10, 15, 5, 4, 8]
// const max = heap.pop(); // 20 (최대값)
// heapArray: [null, 15, 10, 8, 5, 4]`,
  },
  {
    language: 'typescript',
    code: `// 최대 힙 완전 구현 (Max Heap)
// 배열 인덱스 1부터 시작하는 방식

class MaxHeap {
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
}

// 사용 예제
const heap = new MaxHeap(15);
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

