import { HeapType } from './types';

/**
 * 부모 노드의 인덱스를 반환합니다.
 */
export const getParentIndex = (index: number): number => {
  return Math.floor((index - 1) / 2);
};

/**
 * 왼쪽 자식 노드의 인덱스를 반환합니다.
 */
export const getLeftChildIndex = (index: number): number => {
  return index * 2 + 1;
};

/**
 * 오른쪽 자식 노드의 인덱스를 반환합니다.
 */
export const getRightChildIndex = (index: number): number => {
  return index * 2 + 2;
};

/**
 * 힙의 높이를 계산합니다.
 */
export const getHeapHeight = (size: number): number => {
  if (size === 0) return 0;
  return Math.floor(Math.log2(size)) + 1;
};

/**
 * 힙 속성을 유지하며 위로 올라갑니다 (heapify up).
 */
export const heapifyUp = (heap: number[], index: number, type: HeapType): void => {
  if (index === 0) return;

  const parentIndex = getParentIndex(index);
  const shouldSwap =
    type === 'max'
      ? heap[index] > heap[parentIndex]
      : heap[index] < heap[parentIndex];

  if (shouldSwap) {
    [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
    heapifyUp(heap, parentIndex, type);
  }
};

/**
 * 힙 속성을 유지하며 아래로 내려갑니다 (heapify down).
 */
export const heapifyDown = (heap: number[], index: number, type: HeapType): void => {
  const leftIndex = getLeftChildIndex(index);
  const rightIndex = getRightChildIndex(index);
  let targetIndex = index;

  if (leftIndex < heap.length) {
    const shouldSwapLeft =
      type === 'max'
        ? heap[leftIndex] > heap[targetIndex]
        : heap[leftIndex] < heap[targetIndex];
    if (shouldSwapLeft) {
      targetIndex = leftIndex;
    }
  }

  if (rightIndex < heap.length) {
    const shouldSwapRight =
      type === 'max'
        ? heap[rightIndex] > heap[targetIndex]
        : heap[rightIndex] < heap[targetIndex];
    if (shouldSwapRight) {
      targetIndex = rightIndex;
    }
  }

  if (targetIndex !== index) {
    [heap[index], heap[targetIndex]] = [heap[targetIndex], heap[index]];
    heapifyDown(heap, targetIndex, type);
  }
};

/**
 * 힙에 값을 삽입합니다.
 */
export const insertToHeap = (heap: number[], value: number, type: HeapType): number[] => {
  const newHeap = [...heap, value];
  heapifyUp(newHeap, newHeap.length - 1, type);
  return newHeap;
};

/**
 * 힙에서 루트 값을 제거하고 반환합니다.
 */
export const popFromHeap = (heap: number[], type: HeapType): { newHeap: number[]; value: number | null } => {
  if (heap.length === 0) {
    return { newHeap: [], value: null };
  }

  if (heap.length === 1) {
    return { newHeap: [], value: heap[0] };
  }

  const rootValue = heap[0];
  const newHeap = [...heap];
  newHeap[0] = newHeap[newHeap.length - 1];
  newHeap.pop();
  heapifyDown(newHeap, 0, type);

  return { newHeap, value: rootValue };
};
