/**
 * 코드 해석 데이터
 * 각 개념의 코드 라인별 해석을 제공합니다.
 */

export interface CodeAnnotation {
  line: number;
  comment: string;
}

type CodeAnnotationsMap = Record<string, Record<string, CodeAnnotation[]>>;

const annotations: CodeAnnotationsMap = {
  array: {
    typescript: [
      {
        line: 2,
        comment:
          '배열 선언: 타입을 명시하여 타입 안정성을 보장합니다. number[]는 숫자 배열을 의미합니다.',
      },
      {
        line: 5,
        comment:
          '인덱스 접근: O(1) 시간에 특정 위치의 요소에 접근할 수 있습니다. 배열은 연속된 메모리 공간에 저장되어 있어 직접 접근이 가능합니다.',
      },
      {
        line: 8,
        comment:
          'push/pop 연산: 배열의 끝에서 추가/제거하는 연산은 O(1) 시간이 소요됩니다. 메모리 재할당이 필요 없기 때문입니다.',
      },
      {
        line: 9,
        comment:
          'unshift/shift 연산: 배열의 앞에서 추가/제거하는 연산은 O(n) 시간이 소요됩니다. 모든 요소를 한 칸씩 이동시켜야 하기 때문입니다.',
      },
      {
        line: 12,
        comment:
          '배열 순회: 모든 요소를 순회하는 경우 O(n) 시간이 소요됩니다. n은 배열의 길이입니다.',
      },
    ],
  },
  'bubble-sort': {
    typescript: [
      {
        line: 7,
        comment:
          '배열 복사: 원본 배열을 보호하기 위해 스프레드 연산자로 복사합니다. 원본 배열은 변경되지 않습니다.',
      },
      {
        line: 10,
        comment:
          '외부 루프: 배열의 길이만큼 반복합니다. 최악의 경우 n-1번 반복되어 O(n) 시간이 소요됩니다.',
      },
      {
        line: 13,
        comment:
          '내부 루프: 각 반복마다 인접한 요소들을 비교합니다. n-i-1번 반복되므로 전체적으로 O(n²) 시간이 소요됩니다.',
      },
      {
        line: 15,
        comment:
          '비교 및 교환: 인접한 두 요소를 비교하여 순서가 잘못되었으면 교환합니다. 이 과정에서 스왑이 발생합니다.',
      },
      {
        line: 23,
        comment:
          '최적화: 이미 정렬된 경우 조기 종료하여 불필요한 반복을 방지합니다. swapped가 false이면 정렬이 완료된 것으로 간주합니다.',
      },
    ],
  },
};

/**
 * 특정 개념과 언어에 대한 코드 해석을 가져옵니다.
 * @param conceptId 개념 ID
 * @param language 프로그래밍 언어
 * @param code 실제 코드 (라인 수 검증용)
 * @returns 코드 해석 배열
 */
export function getCodeAnnotations(
  conceptId: string,
  language: string,
  code: string
): CodeAnnotation[] {
  const codeLines = code.split('\n');
  const rawAnnotations = annotations[conceptId]?.[language] || [];

  // 실제 코드 라인 수에 맞춰 필터링
  return rawAnnotations.filter((ann) => ann.line <= codeLines.length);
}

