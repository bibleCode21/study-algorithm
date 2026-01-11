# 삽입 정렬 시각화 구현 계획

## 목표
정석적이고 최적화된 삽입 정렬 알고리즘을 기반으로 단계별 시각화 구현

## 알고리즘 구조

### 기본 삽입 정렬 알고리즘
```javascript
function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  return arr;
}
```

## 구현 단계

### 1단계: Generator 함수 구현
- **목적**: 각 단계에서 yield로 상태 반환
- **구조**: Arrow function 사용
  ```typescript
  const insertionSortGenerator = function* (arr: number[]): Generator<GeneratorState, number[], unknown>
  ```
- **Yield 지점**:
  1. `selecting`: key 선택 (i 위치의 값)
  2. `comparing`: key와 arr[j] 비교
  3. `shifting`: arr[j]를 arr[j+1]로 이동
  4. `inserting`: key를 arr[j+1]에 삽입
  5. `sorted`: 정렬 완료

### 2단계: 상태 관리 (useInsertionSort)
- **Generator ref**: 현재 진행 상태 유지
- **stepSort**: 
  - Generator.next() 호출
  - 상태 업데이트 (array, animationState)
- **autoSort**:
  - Generator를 순회하며 각 단계마다 딜레이 (300-600ms)
  - `for...of` 또는 재귀 함수로 자동 진행
  - 각 yield 지점에서 일시 중지 후 다음 단계 진행

### 3단계: 시각화 (ArrayVisualization)
- **기본**: 배열 요소 표시
- **애니메이션**: CSS transition으로 부드러운 전환 효과
- **상태별 스타일**:
  - `selecting`: key 위치 강조 (파란색)
  - `comparing`: 비교 중인 위치 강조 (노란색)
  - `shifting`: 이동 중인 위치 강조 (빨간색)
  - `inserting`: 삽입 위치 강조 (보라색)
  - `sorted`: 전체 강조 (초록색)
- **참고**: [bluewings.github.io](https://bluewings.github.io/sorting-algorithms-at-a-glance/)와 동일한 Generator 방식 사용

### 4단계: 구현 순서
1. ✅ Generator 함수 구현
2. ✅ stepSort 구현 (수동 진행)
3. ✅ autoSort 구현 (자동 진행)
4. ✅ 시각화 스타일 추가

## 원칙
- 코드 간결성 유지
- 각 함수는 단일 책임
- 불필요한 로직 제거
- 명확한 yield 지점
- **Arrow function 사용** (가능한 경우)

## 타입 정의
```typescript
type GeneratorState = {
  type: 'selecting' | 'comparing' | 'shifting' | 'inserting' | 'sorted';
  array: number[];
  keyIndex: number;
  keyValue: number;
  comparingIndex?: number;
  shiftingIndex?: number;
};
```
