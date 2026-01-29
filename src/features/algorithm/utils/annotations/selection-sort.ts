import { CodeAnnotation, LanguageAnnotations } from '../codeAnnotations';

// 각 코드 예제별 해석 배열
export const selectionSortAnnotations: LanguageAnnotations = {
  typescript: [
    // 첫 번째 예제: 선택 정렬 기본 구현 (1-32줄)
    [
      {
        line: 4,
        comment:
          'selectionSort 함수: 선택 정렬 알고리즘을 구현합니다. 원본 배열을 보호하기 위해 복사본을 사용합니다.',
      },
      {
        line: 5,
        comment:
          '배열 길이 저장: n 변수에 배열의 길이를 저장합니다. 반복문에서 여러 번 사용되므로 미리 저장하여 성능을 향상시킵니다.',
      },
      {
        line: 6,
        comment:
          '배열 복사: 원본 배열을 보호하기 위해 스프레드 연산자로 복사합니다. 원본 배열은 변경되지 않습니다.',
      },
      {
        line: 9,
        comment:
          '외부 루프: n-1번 반복합니다. 각 반복마다 맨 앞(stand) 위치에 올바른 값이 들어갑니다. stand는 현재 정렬할 위치(인덱스)를 나타냅니다.',
      },
      {
        line: 10,
        comment:
          'lowest 초기화: 현재 구간(stand 이후)에서 최소값의 인덱스를 저장합니다. 처음에는 stand를 최소값 위치로 가정합니다.',
      },
      {
        line: 13,
        comment:
          '내부 루프: stand 다음 인덱스부터 배열 끝까지 순회하며 최소값의 인덱스를 찾습니다. O(n) 시간이 소요되므로 전체적으로 O(n²) 시간이 소요됩니다.',
      },
      {
        line: 14,
        comment:
          '최소값 비교: 현재까지의 최소값(result[lowest])과 현재 요소(result[index])를 비교하여, 현재 요소가 더 작으면 lowest를 index로 갱신합니다.',
      },
      {
        line: 18,
        comment:
          '교환: 찾은 최소값(result[lowest])을 맨 앞 위치(result[stand])와 교환합니다. 구조 분해 할당을 사용하여 두 값을 한 번에 교환합니다.',
      },
      {
        line: 21,
        comment:
          '정렬된 배열 반환: 정렬이 완료된 배열을 반환합니다. 원본 배열은 변경되지 않았습니다.',
      },
    ],
    // 두 번째 예제: 선택 정렬 단계별 이해
    [
      {
        line: 10,
        comment:
          'selectionSort 함수: 위에서 설명한 단계를 자동으로 수행하는 함수입니다.',
      },
      {
        line: 11,
        comment:
          '배열 길이 저장: n 변수에 배열의 길이를 저장합니다.',
      },
      {
        line: 12,
        comment:
          '배열 복사: 원본 배열을 보호하기 위해 스프레드 연산자로 복사합니다.',
      },
      {
        line: 14,
        comment:
          '외부 루프: n-1번 반복합니다. 각 반복마다 stand 위치에 올바른 값이 들어갑니다.',
      },
      {
        line: 15,
        comment:
          'lowest 초기화: 현재 구간에서 최소값의 인덱스를 저장합니다.',
      },
      {
        line: 17,
        comment:
          '내부 루프: stand 다음 인덱스부터 끝까지 최소값을 찾습니다.',
      },
      {
        line: 18,
        comment:
          '최소값 비교: result[lowest] > result[index]이면 lowest를 index로 갱신합니다.',
      },
      {
        line: 22,
        comment:
          '교환: 최소값을 stand 위치와 교환합니다.',
      },
    ],
    // 세 번째 예제: 데이터 개수별 동작 예시
    [
      {
        line: 6,
        comment:
          'selectionSort 함수: 선택 정렬 알고리즘을 구현합니다. 데이터 개수에 관계없이 동일한 방식으로 동작합니다.',
      },
      {
        line: 7,
        comment:
          '배열 길이 저장: n 변수에 배열의 길이를 저장합니다.',
      },
      {
        line: 8,
        comment:
          '배열 복사: 원본 배열을 보호하기 위해 스프레드 연산자로 복사합니다.',
      },
      {
        line: 10,
        comment:
          '외부 루프: n-1번 반복합니다. 데이터가 두 개일 때 1번, 세 개일 때 2번, 네 개일 때 3번 반복됩니다.',
      },
      {
        line: 11,
        comment:
          'lowest 초기화: 현재 구간에서 최소값의 인덱스를 저장합니다.',
      },
      {
        line: 13,
        comment:
          '내부 루프: stand 이후부터 끝까지 최소값을 찾습니다.',
      },
      {
        line: 14,
        comment:
          '최소값 비교: 더 작은 값을 찾으면 lowest를 갱신합니다.',
      },
      {
        line: 18,
        comment:
          '교환: 찾은 최소값을 stand 위치와 교환합니다. 각 패스마다 최대 1번만 교환합니다.',
      },
    ],
  ],
};
