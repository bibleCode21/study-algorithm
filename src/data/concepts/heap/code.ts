import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 최소 힙 구현
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
console.log(minHeap.peek()); // 1 (최소값)
console.log(minHeap.extractMin()); // 1`,
  },
];

