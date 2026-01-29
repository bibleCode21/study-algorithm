/**
 * 코드 해석 데이터
 * 각 개념의 코드 라인별 해석을 제공합니다.
 */

export interface CodeAnnotation {
  line: number;
  comment: string;
}

/**
 * 각 언어별 코드 예제 해석 배열
 * Record<language, CodeAnnotation[][]> - 각 코드 예제별로 해석 배열
 */
export type LanguageAnnotations = Record<string, CodeAnnotation[][]>;

/**
 * 지원되는 개념 ID 타입
 */
export type ConceptId =
  | 'array'
  | 'stack'
  | 'queue'
  | 'linked-list'
  | 'heap'
  | 'hash-table'
  | 'tree'
  | 'binary-search'
  | 'bubble-sort'
  | 'insertion-sort'
  | 'selection-sort';

/**
 * 모든 개념의 해석을 저장하는 타입
 */
type CodeAnnotationsMap = Record<ConceptId, LanguageAnnotations>;

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
import { insertionSortAnnotations } from './annotations/insertion-sort';
import { selectionSortAnnotations } from './annotations/selection-sort';

/**
 * 모든 해석을 통합한 맵
 * 타입 안정성을 위해 ConceptId를 키로 사용합니다.
 */
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
  'insertion-sort': insertionSortAnnotations,
  'selection-sort': selectionSortAnnotations,
} as const;

/**
 * 특정 개념과 언어, 코드 예제 인덱스에 대한 코드 해석을 가져옵니다.
 * @param conceptId 개념 ID
 * @param language 프로그래밍 언어
 * @param code 실제 코드 (라인 수 검증용)
 * @param exampleIndex 코드 예제 인덱스 (0부터 시작)
 * @returns 코드 해석 배열
 */
export const getCodeAnnotations = (
  conceptId: ConceptId | string,
  language: string,
  code: string,
  exampleIndex: number = 0
): CodeAnnotation[] => {
  // 타입 가드: conceptId가 유효한 ConceptId인지 확인
  if (!(conceptId in annotations)) {
    return [];
  }

  const codeLines = code.split('\n');
  const conceptAnnotations = annotations[conceptId as ConceptId]?.[language];
  
  if (!conceptAnnotations || conceptAnnotations.length === 0) {
    return [];
  }

  // 예제 인덱스가 범위를 벗어나면 첫 번째 예제의 해석 사용
  const exampleAnnotations = conceptAnnotations[exampleIndex] || conceptAnnotations[0] || [];

  // 실제 코드 라인 수에 맞춰 필터링
  return exampleAnnotations.filter((ann) => ann.line <= codeLines.length);
};

/**
 * 특정 개념이 annotation을 지원하는지 확인합니다.
 * @param conceptId 개념 ID
 * @returns annotation 지원 여부
 */
export const hasAnnotations = (conceptId: string): conceptId is ConceptId => {
  return conceptId in annotations;
};

/**
 * 특정 개념의 지원 언어 목록을 가져옵니다.
 * @param conceptId 개념 ID
 * @returns 지원 언어 배열
 */
export const getSupportedLanguages = (conceptId: ConceptId): string[] => {
  const conceptAnnotations = annotations[conceptId];
  return conceptAnnotations ? Object.keys(conceptAnnotations) : [];
};
