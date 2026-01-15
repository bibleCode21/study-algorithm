import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 삽입 정렬 기본 구현
// 두 번째 인덱스부터 시작하여 해당 인덱스의 값을 앞의 정렬된 부분에 삽입하는 방식

const insertionSort = (array: number[]): number[] => {
  const n = array.length;
  const result = [...array]; // 원본 배열 보호

  // 두 번째 인덱스부터 시작 (인덱스 1부터)
  for (let i = 1; i < n; i++) {
    const key = result[i]; // 현재 정렬할 값
    let j = i - 1; // key 값보다 앞에 있는 인덱스

    // key 값보다 큰 값들을 뒤로 이동
    // j가 0 이상이고, result[j]가 key보다 큰 동안 반복
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j]; // 큰 값을 뒤로 이동
      j--; // 앞쪽으로 이동
    }

    // key 값을 올바른 위치에 삽입
    result[j + 1] = key;
  }

  return result;
};

// 사용 예제
const array = [9, 3, 2, 5];
const sorted = insertionSort(array);
// sorted는 [2, 3, 5, 9]`,
  },
  {
    language: 'typescript',
    code: `// 삽입 정렬 단계별 이해
// 데이터가 4개일 때 삽입 정렬의 동작 과정을 단계별로 확인

// 예: array = [9, 3, 2, 5]

// 첫 번째 실행 (i=1, key=3)
// 3과 9 비교, 3이 작으므로 9를 뒤로 이동: [3, 9, 2, 5]
// j가 0보다 작으므로 종료, key(3)를 result[0]에 삽입: [3, 9, 2, 5]

// 두 번째 실행 (i=2, key=2)
// 2와 9 비교, 2가 작으므로 9를 뒤로 이동: [3, 9, 9, 5]
// 2와 3 비교, 2가 작으므로 3을 뒤로 이동: [3, 3, 9, 5]
// j가 0보다 작으므로 종료, key(2)를 result[0]에 삽입: [2, 3, 9, 5]

// 세 번째 실행 (i=3, key=5)
// 5와 9 비교, 5가 작으므로 9를 뒤로 이동: [2, 3, 9, 9]
// 5와 3 비교, 5가 크므로 종료, key(5)를 result[2]에 삽입: [2, 3, 5, 9]

const insertionSort = (array: number[]): number[] => {
  const n = array.length;
  const result = [...array];

  for (let i = 1; i < n; i++) {
    const key = result[i];
    let j = i - 1;

    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j--;
    }

    result[j + 1] = key;
  }

  return result;
};

// 사용 예제
const sorted = insertionSort([9, 3, 2, 5]);
// sorted는 [2, 3, 5, 9]`,
  },
  {
    language: 'typescript',
    code: `// 삽입 정렬 최적화 버전 (조기 종료)
// 이미 정렬된 부분에서 올바른 위치를 찾으면 즉시 종료

const insertionSortOptimized = (array: number[]): number[] => {
  const n = array.length;
  const result = [...array];

  for (let i = 1; i < n; i++) {
    const key = result[i];
    let j = i - 1;

    // key 값보다 큰 값들을 뒤로 이동
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j--;
    }

    // key 값을 올바른 위치에 삽입
    result[j + 1] = key;
  }

  return result;
};

// 사용 예제
const array1 = [64, 34, 25, 12, 22, 11, 90];
const sorted1 = insertionSortOptimized(array1);
// sorted1는 [11, 12, 22, 25, 34, 64, 90]

// 이미 정렬된 배열 (최적화 효과)
const array2 = [1, 2, 3, 4, 5];
const sorted2 = insertionSortOptimized(array2);
// sorted2는 [1, 2, 3, 4, 5] (각 요소가 이미 올바른 위치에 있어 빠르게 처리)`,
  },
];
