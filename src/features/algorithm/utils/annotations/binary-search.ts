import { CodeAnnotation } from '../codeAnnotations';

// 각 코드 예제별 해석 배열
export const binarySearchAnnotations: Record<string, CodeAnnotation[][]> = {
  typescript: [
    // 첫 번째 예제: 반복문과 재귀를 사용한 이진 탐색
    [
      {
        line: 7,
        comment:
          'binarySearch 함수: 반복문을 사용한 이진 탐색 구현입니다. 정렬된 배열에서 특정 값을 O(log n) 시간에 찾을 수 있습니다.',
      },
      {
        line: 8,
        comment:
          'left 변수: 탐색 범위의 왼쪽 끝 인덱스입니다. 초기값은 0으로 배열의 시작 위치입니다.',
      },
      {
        line: 9,
        comment:
          'right 변수: 탐색 범위의 오른쪽 끝 인덱스입니다. 초기값은 배열의 마지막 인덱스입니다.',
      },
      {
        line: 11,
        comment:
          'while 루프: left가 right보다 작거나 같을 때까지 반복합니다. 탐색 범위가 유효한 동안 계속 탐색합니다.',
      },
      {
        line: 12,
        comment:
          'mid 계산: 탐색 범위의 중간 인덱스를 계산합니다. Math.floor를 사용하여 정수 부분만 사용합니다. (left + right) / 2의 정수 부분이 중간 인덱스입니다.',
      },
      {
        line: 14,
        comment:
          '값 비교: 중간 위치의 값이 찾는 값과 같으면 해당 인덱스를 반환합니다. 찾은 경우입니다.',
      },
      {
        line: 16,
        comment:
          '오른쪽 절반 탐색: 중간 값이 찾는 값보다 작으면 오른쪽 절반에서 탐색합니다. left를 mid + 1로 업데이트하여 탐색 범위를 좁힙니다.',
      },
      {
        line: 19,
        comment:
          '왼쪽 절반 탐색: 중간 값이 찾는 값보다 크면 왼쪽 절반에서 탐색합니다. right를 mid - 1로 업데이트하여 탐색 범위를 좁힙니다.',
      },
      {
        line: 23,
        comment:
          '찾지 못한 경우: 탐색 범위를 모두 확인했지만 값을 찾지 못했으면 -1을 반환합니다.',
      },
      {
        line: 27,
        comment:
          'binarySearchRecursive 함수: 재귀를 사용한 이진 탐색 구현입니다. 반복문 버전과 동일한 로직을 재귀적으로 구현합니다.',
      },
      {
        line: 30,
        comment:
          '기본 파라미터: left와 right에 기본값을 설정하여 함수 호출 시 생략할 수 있도록 합니다. 초기값은 전체 배열 범위입니다.',
      },
      {
        line: 33,
        comment:
          '기저 조건: left가 right보다 크면 탐색 범위가 유효하지 않으므로 -1을 반환합니다. 재귀를 종료하는 조건입니다.',
      },
      {
        line: 35,
        comment:
          'mid 계산: 탐색 범위의 중간 인덱스를 계산합니다. 반복문 버전과 동일한 방식입니다.',
      },
      {
        line: 37,
        comment:
          '값 비교: 중간 위치의 값이 찾는 값과 같으면 해당 인덱스를 반환합니다.',
      },
      {
        line: 39,
        comment:
          '재귀 호출 (오른쪽): 중간 값이 찾는 값보다 작으면 오른쪽 절반에서 재귀적으로 탐색합니다. mid + 1부터 right까지 탐색합니다.',
      },
      {
        line: 42,
        comment:
          '재귀 호출 (왼쪽): 중간 값이 찾는 값보다 크면 왼쪽 절반에서 재귀적으로 탐색합니다. left부터 mid - 1까지 탐색합니다.',
      },
    ],
  ],
};

