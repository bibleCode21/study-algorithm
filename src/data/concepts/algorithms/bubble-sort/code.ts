import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 버블 정렬 기본 구현
// 인접한 두 요소를 비교하여 순서가 잘못된 경우 교환하는 방식으로 정렬

const bubbleSort = (arr: number[]): number[] => {
  const n = arr.length;
  const result = [...arr]; // 원본 배열 보호

  // 외부 루프: n-1번 반복 (각 반복마다 가장 큰 요소가 끝으로 이동)
  for (let i = 0; i < n - 1; i++) {
    // 내부 루프: 인접한 요소들을 비교
    // n-i-1번 반복 (이미 정렬된 끝부분은 제외)
    for (let j = 0; j < n - i - 1; j++) {
      // 인접한 두 요소 비교
      if (result[j] > result[j + 1]) {
        // 순서가 잘못된 경우 교환
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }

  return result;
};

// 사용 예제
const arr = [64, 34, 25, 12, 22, 11, 90];
const sorted = bubbleSort(arr);
// sorted는 [11, 12, 22, 25, 34, 64, 90]`,
  },
  {
    language: 'typescript',
    code: `// 버블 정렬 최적화 버전 (조기 종료)
// 이미 정렬된 배열의 경우 불필요한 반복을 방지하는 최적화

const bubbleSortOptimized = (arr: number[]): number[] => {
  const n = arr.length;
  const result = [...arr]; // 원본 배열 보호

  // 외부 루프: n-1번 반복
  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // 교환 발생 여부 추적

    // 내부 루프: 인접한 요소들을 비교
    for (let j = 0; j < n - i - 1; j++) {
      // 인접한 두 요소 비교
      if (result[j] > result[j + 1]) {
        // 순서가 잘못된 경우 교환
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true; // 교환 발생 표시
      }
    }

    // 한 번도 교환이 없었다면 이미 정렬된 상태
    if (!swapped) {
      break; // 조기 종료
    }
  }

  return result;
};

// 사용 예제
const arr1 = [64, 34, 25, 12, 22, 11, 90];
const sorted1 = bubbleSortOptimized(arr1);
// sorted1는 [11, 12, 22, 25, 34, 64, 90]

// 이미 정렬된 배열 (최적화 효과 확인)
const arr2 = [1, 2, 3, 4, 5];
const sorted2 = bubbleSortOptimized(arr2);
// sorted2는 [1, 2, 3, 4, 5] (한 번의 순회로 종료)`,
  },
  {
    language: 'typescript',
    code: `// 버블 정렬 단계별 이해
// 데이터가 4개일 때 버블 정렬의 동작 과정을 단계별로 확인

const dataList = [1, 9, 3, 2];

// 1차 로직 적용
// 1과 9 비교, 자리바꿈 없음 [1, 9, 3, 2]
// 9와 3 비교, 자리바꿈 [1, 3, 9, 2]
// 9와 2 비교, 자리바꿈 [1, 3, 2, 9]

// 2차 로직 적용
// 1과 3 비교, 자리바꿈 없음 [1, 3, 2, 9]
// 3과 2 비교, 자리바꿈 [1, 2, 3, 9]
// 3과 9 비교, 자리바꿈 없음 [1, 2, 3, 9]

// 3차 로직 적용
// 1과 2 비교, 자리바꿈 없음 [1, 2, 3, 9]
// 2와 3 비교, 자리바꿈 없음 [1, 2, 3, 9]
// 3과 9 비교, 자리바꿈 없음 [1, 2, 3, 9]

// 버블 정렬 함수로 확인
const bubbleSort = (arr: number[]): number[] => {
  const n = arr.length;
  const result = [...arr];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }

  return result;
};

// 사용 예제
const sorted = bubbleSort([1, 9, 3, 2]);
// sorted는 [1, 2, 3, 9]`,
  },
];
