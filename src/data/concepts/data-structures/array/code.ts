import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
    {
        language: 'typescript',
        code: `// 1차원 배열: 리스트로 구현
const dataList: number[] = [1, 2, 3, 4, 5];

// 요소 접근 (O(1))
const first = dataList[0]; // 1
const second = dataList[1]; // 2

// 요소 추가/제거
dataList.push(6);        // 끝에 추가 (O(1))
dataList.pop();          // 끝에서 제거 (O(1))
dataList.unshift(0);     // 앞에 추가 (O(n))
dataList.shift();        // 앞에서 제거 (O(n))

// 배열 순회: 모든 요소의 합 구하기
let sum = 0;
for (let i = 0; i < dataList.length; i++) {
  sum += dataList[i];
}`,
    },
    {
        language: 'typescript',
        code: `// 2차원 배열: 리스트로 구현
const dataList: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// 2차원 배열 접근
const row0 = dataList[0];      // [1, 2, 3]
const value00 = dataList[0][0];   // 1
const value01 = dataList[0][1];   // 2
const value02 = dataList[0][2];   // 3
const value10 = dataList[1][0];   // 4
const value11 = dataList[1][1];   // 5

// 2차원 배열 순회: 모든 요소의 합 구하기
let total = 0;
for (let i = 0; i < dataList.length; i++) {
  for (let j = 0; j < dataList[i].length; j++) {
    total += dataList[i][j];
  }
}

// 역순으로 순회하여 1차원 배열로 변환 (9, 8, 7, 6, 5, 4, 3, 2, 1 순서)
const reversed: number[] = [];
for (let i = dataList.length - 1; i >= 0; i--) {
  for (let j = dataList[i].length - 1; j >= 0; j--) {
    reversed.push(dataList[i][j]);
  }
}`,
    },
    {
        language: 'typescript',
        code: `// range 함수 활용 (배열 생성)
// 연속된 숫자 배열을 생성하는 기능 (Python의 range()와 유사)

// 0부터 9까지 배열 생성
const range1: number[] = Array.from({ length: 10 }, (_, i) => i);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 1부터 10까지 배열 생성
const range2: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 0부터 20까지 2씩 증가 (0, 2, 4, 6, ...)
const range3: number[] = Array.from({ length: 11 }, (_, i) => i * 2);
// [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// for 루프에서 range 활용: 0부터 9까지 배열 생성
const arr1: number[] = [];
for (let i = 0; i < 10; i++) {
  arr1.push(i);
}
// arr1은 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 시작값, 종료값 지정: 1부터 10까지 배열 생성
const arr2: number[] = [];
for (let i = 1; i <= 10; i++) {
  arr2.push(i);
}
// arr2는 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 2씩 증가: 짝수만 배열에 추가
const evenNumbers: number[] = [];
for (let i = 0; i < 20; i += 2) {
  evenNumbers.push(i);
}
// evenNumbers는 [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]`,
    },
    {
        language: 'typescript',
        code: `// 문자열 배열에서 특정 문자 빈도수 찾기
const dataset: string[] = [
  'Braund, Mr. Owen Harris',
  'Cumings, Mrs. John Bradley (Florence Briggs Thayer)',
  'Heikkinen, Miss. Laina',
  'Futrelle, Mrs. Jacques Heath (Lily May Peel)',
  'Allen, Mr. William Henry',
  'Moran, Mr. James',
  'McCarthy, Mr. Timothy J',
  'Palsson, Master. Gosta Leonard',
  'Johnson, Mrs. Oscar W (Elisabeth Vilhelmina Berg)',
  'Nasser, Mrs. Nicholas (Adele Achem)',
  'Sandstrom, Miss. Marguerite Rut',
  'Bonnell, Miss. Elizabeth',
  'Saundercock, Mr. William Henry',
  'Andersson, Mr. Anders Johan',
  'Vestrom, Miss. Hulda Amanda Adolfina',
  'Hewlett, Mrs. (Mary D Kingcome) ',
  'Rice, Master. Eugene',
  'Williams, Mr. Charles Eugene',
  'Vander Planke, Mrs. Julius (Emelia Maria Vandemoortele)',
  'Masselmani, Mrs. Fatima',
  'Fynney, Mr. Joseph J',
  'Beesley, Mr. Lawrence',
  'McGowan, Miss. Anna "Annie"',
  'Sloper, Mr. William Thompson',
  'Palsson, Miss. Torborg Danira',
  'Asplund, Mrs. Carl Oscar (Selma Augusta Emilia Johansson)',
  'Emir, Mr. Farred Chehab',
  'Fortune, Mr. Charles Alexander',
  'Dwyer, Miss. Ellen "Nellie"',
  'Todoroff, Mr. Lalio'
];

// 'M' 문자의 빈도수 찾기
let mCount = 0;
for (const data of dataset) {
  for (let index = 0; index < data.length; index++) {
    if (data[index] === 'M') {
      mCount++;
    }
  }
}
// mCount는 38

// 더 간단한 방법 (정규표현식 사용)
let mCount2 = 0;
for (const data of dataset) {
  mCount2 += (data.match(/M/g) || []).length;
}
// mCount2는 38`,
    },
];

