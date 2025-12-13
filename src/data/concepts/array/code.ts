import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
    {
        language: 'typescript',
        code: `// 배열 선언 및 초기화
const arr: number[] = [1, 2, 3, 4, 5];

// 요소 접근 (O(1))
const first = arr[0]; // 1

// 요소 추가/제거
arr.push(6);        // 끝에 추가 (O(1))
arr.pop();          // 끝에서 제거 (O(1))
arr.unshift(0);     // 앞에 추가 (O(n))
arr.shift();        // 앞에서 제거 (O(n))

// 배열 순회
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}`,
    },
];

