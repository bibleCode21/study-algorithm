/**
 * 코드 해석 데이터
 * 각 개념의 코드 라인별 해석을 제공합니다.
 */

export interface CodeAnnotation {
  line: number;
  comment: string;
}

// 각 코드 예제별 해석 배열을 저장하는 타입
// Record<language, CodeAnnotation[][]> - 각 코드 예제별로 해석 배열
type CodeAnnotationsMap = Record<string, Record<string, CodeAnnotation[][]>>;

// 각 개념별 해석 파일에서 import
import { arrayAnnotations } from './annotations/array';
import { stackAnnotations } from './annotations/stack';
import { queueAnnotations } from './annotations/queue';
import { linkedListAnnotations } from './annotations/linked-list';
import { heapAnnotations } from './annotations/heap';
import { hashTableAnnotations } from './annotations/hash-table';
import { treeAnnotations } from './annotations/tree';
import { binarySearchAnnotations } from './annotations/binary-search';
import { bubbleSortAnnotations } from './annotations/bubble-sort';

// 모든 해석을 통합
const annotations: CodeAnnotationsMap = {
  array: arrayAnnotations,
  stack: stackAnnotations,
  queue: queueAnnotations,
  'linked-list': linkedListAnnotations,
  heap: heapAnnotations,
  'hash-table': hashTableAnnotations,
  tree: treeAnnotations,
  'binary-search': binarySearchAnnotations,
  'bubble-sort': bubbleSortAnnotations,
};

/**
 * 특정 개념과 언어, 코드 예제 인덱스에 대한 코드 해석을 가져옵니다.
 * @param conceptId 개념 ID
 * @param language 프로그래밍 언어
 * @param code 실제 코드 (라인 수 검증용)
 * @param exampleIndex 코드 예제 인덱스 (0부터 시작)
 * @returns 코드 해석 배열
 */
export const getCodeAnnotations = (
  conceptId: string,
  language: string,
  code: string,
  exampleIndex: number = 0
): CodeAnnotation[] => {
  const codeLines = code.split('\n');
  const conceptAnnotations = annotations[conceptId]?.[language];
  
  if (!conceptAnnotations || conceptAnnotations.length === 0) {
    return [];
  }

  // 예제 인덱스가 범위를 벗어나면 첫 번째 예제의 해석 사용
  const exampleAnnotations = conceptAnnotations[exampleIndex] || conceptAnnotations[0] || [];

  // 실제 코드 라인 수에 맞춰 필터링
  return exampleAnnotations.filter((ann) => ann.line <= codeLines.length);
};

