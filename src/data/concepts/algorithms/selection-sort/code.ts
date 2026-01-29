import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 선택 정렬 기본 구현
// 주어진 데이터 중 최소값을 찾아 맨 앞의 값과 교체하는 과정을 반복

const selectionSort = (array: number[]): number[] => {
  const n = array.length;
  const result = [...array]; // 원본 배열 보호

  // 외부 루프: n-1번 반복 (각 반복마다 맨 앞 위치가 결정됨)
  for (let stand = 0; stand < n - 1; stand++) {
    let lowest = stand; // 현재 구간에서 최소값의 인덱스

    // 내부 루프: stand 이후부터 끝까지 최소값 찾기
    for (let index = stand + 1; index < n; index++) {
      if (result[lowest] > result[index]) {
        lowest = index;
      }
    }

    // 최소값을 맨 앞(stand) 위치와 교환
    [result[stand], result[lowest]] = [result[lowest], result[stand]];
  }

  return result;
};

// 사용 예제
const array = [64, 34, 25, 12, 22, 11, 90];
const sorted = selectionSort(array);
// sorted는 [11, 12, 22, 25, 34, 64, 90]`,
  },
  {
    language: 'typescript',
    code: `// 선택 정렬 단계별 이해
// 데이터가 4개일 때 선택 정렬의 동작 과정을 단계별로 확인

// 예: data_list = [9, 3, 2, 1]

// 1차 (stand=0): 최소값 1을 찾아 index 0과 교환 → [1, 3, 2, 9]
// 2차 (stand=1): 최소값 2를 찾아 index 1과 교환 → [1, 2, 3, 9]
// 3차 (stand=2): 최소값 3은 이미 index 2에 있음 → [1, 2, 3, 9] (변화 없음)

const selectionSort = (array: number[]): number[] => {
  const n = array.length;
  const result = [...array];

  for (let stand = 0; stand < n - 1; stand++) {
    let lowest = stand;

    for (let index = stand + 1; index < n; index++) {
      if (result[lowest] > result[index]) {
        lowest = index;
      }
    }

    [result[stand], result[lowest]] = [result[lowest], result[stand]];
  }

  return result;
};

// 사용 예제
const sorted = selectionSort([9, 3, 2, 1]);
// sorted는 [1, 2, 3, 9]`,
  },
  {
    language: 'typescript',
    code: `// 선택 정렬 - 데이터 개수별 동작 예시
// 두 개: [9, 1] → stand=0, lowest=1 → [1, 9]
// 세 개: [9, 1, 7] → 1차 [1, 9, 7], 2차 [1, 7, 9]
// 네 개: [9, 3, 2, 1] → 1차 [1, 3, 2, 9], 2차 [1, 2, 3, 9], 3차 변화 없음

const selectionSort = (array: number[]): number[] => {
  const n = array.length;
  const result = [...array];

  for (let stand = 0; stand < n - 1; stand++) {
    let lowest = stand;

    for (let index = stand + 1; index < n; index++) {
      if (result[lowest] > result[index]) {
        lowest = index;
      }
    }

    [result[stand], result[lowest]] = [result[lowest], result[stand]];
  }

  return result;
};

// 사용 예제
const list1 = [9, 1];
const list2 = [9, 1, 7];
const list3 = [9, 3, 2, 1];
// selectionSort(list1) → [1, 9]
// selectionSort(list2) → [1, 7, 9]
// selectionSort(list3) → [1, 2, 3, 9]`,
  },
];
