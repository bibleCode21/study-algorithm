import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 재귀를 사용한 이진 탐색 (분할 정복 알고리즘)
// 탐색할 자료를 둘로 나누어 해당 데이터가 있을만한 곳을 탐색하는 방법
const binarySearch = (array: number[], target: number): boolean => {
  // 데이터가 1개이고 찾는 값과 같으면 true 반환
  if (array.length === 1 && target === array[0]) {
    return true;
  }
  // 데이터가 1개이지만 찾는 값과 다르면 false 반환
  if (array.length === 1 && target !== array[0]) {
    return false;
  }
  // 데이터가 없으면 false 반환
  if (array.length === 0) {
    return false;
  }

  // 중간값 계산
  const midIndex = Math.floor(array.length / 2);
  
  // 중간값이 찾는 값과 같으면 true 반환
  if (target === array[midIndex]) {
    return true;
  } else {
    // 찾는 값이 중간값보다 크면 뒷 부분의 서브 리스트에서 검색
    if (target > array[midIndex]) {
      return binarySearch(array.slice(midIndex + 1), target);
    } else {
      // 찾는 값이 중간값보다 작으면 앞 부분의 서브 리스트에서 검색
      return binarySearch(array.slice(0, midIndex), target);
    }
  }
};

// 사용 예제
const sortedArray = [2, 3, 8, 12, 20];
const found1 = binarySearch(sortedArray, 8); // true
const found2 = binarySearch(sortedArray, 5); // false`,
  },
  {
    language: 'typescript',
    code: `// 반복문을 사용한 이진 탐색 (인덱스 반환)
const binarySearch = (array: number[], target: number): number => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid; // 찾은 경우 인덱스 반환
    } else if (array[mid] < target) {
      left = mid + 1; // 오른쪽 절반 탐색
    } else {
      right = mid - 1; // 왼쪽 절반 탐색
    }
  }

  return -1; // 찾지 못한 경우
};

// 사용 예제
const sortedArray = [2, 3, 8, 12, 20];
const index = binarySearch(sortedArray, 8); // 2 (인덱스)`,
  },
  {
    language: 'typescript',
    code: `// 재귀를 사용한 이진 탐색 (인덱스 반환)
const binarySearchRecursive = (
  array: number[],
  target: number,
  left: number = 0,
  right: number = array.length - 1
): number => {
  // 기저 조건: 탐색 범위가 유효하지 않으면 -1 반환
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  if (array[mid] === target) {
    return mid; // 찾은 경우 인덱스 반환
  } else if (array[mid] < target) {
    // 오른쪽 절반에서 재귀적으로 탐색
    return binarySearchRecursive(array, target, mid + 1, right);
  } else {
    // 왼쪽 절반에서 재귀적으로 탐색
    return binarySearchRecursive(array, target, left, mid - 1);
  }
};

// 사용 예제
const sortedArray = [2, 3, 8, 12, 20];
const index = binarySearchRecursive(sortedArray, 8); // 2 (인덱스)`,
  },
];

