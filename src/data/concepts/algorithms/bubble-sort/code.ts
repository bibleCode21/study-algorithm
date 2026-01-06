import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  const result = [...arr]; // 원본 배열 보호

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // 인접한 두 요소 비교
      if (result[j] > result[j + 1]) {
        // 순서가 잘못된 경우 교환
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    
    // 한 번도 교환이 없었다면 이미 정렬된 상태
    if (!swapped) break;
  }

  return result;
}

// 사용 예제
const arr = [64, 34, 25, 12, 22, 11, 90];
const sorted = bubbleSort(arr);
// sorted는 [11, 12, 22, 25, 34, 64, 90]`,
  },
];

