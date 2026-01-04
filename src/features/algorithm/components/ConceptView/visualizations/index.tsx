/**
 * 시각화 컴포넌트들을 concept ID에 따라 매핑하는 레지스트리
 * 
 * 각 시각화 컴포넌트는 완전히 독립적으로 동작하며, 자신만의 고유한 UI와 옵션을 가질 수 있습니다.
 * 
 * 예시:
 * - Array: 1차원 배열 / 2차원 배열 선택 옵션을 내부에 포함
 * - LinkedList: 선형 그래프 형태의 시각화, 노드 추가/삭제 옵션 등
 * - Tree: 트리 구조 그래프, 순회 방식 선택 등
 * - Stack/Queue: 1차원 그래프 형태, push/pop 연산 시각화
 * 
 * 새로운 시각화를 추가할 때:
 * 1. visualizations/[ConceptName]/index.tsx 파일 생성
 * 2. 아래 레지스트리에 등록
 * 3. 각 시각화는 자체적으로 필요한 모든 UI 요소를 포함해야 함
 */

import { ComponentType } from 'react';
import ArrayVisualization from './Array';
import StackVisualization from './Stack';
import QueueVisualization from './Queue';
import LinkedListVisualization from './LinkedList';
import HeapVisualization from './Heap';
import HashTableVisualization from './HashTable';

// 시각화 컴포넌트의 공통 Props 타입
// 각 시각화는 필요에 따라 자신만의 props를 가질 수 있지만,
// 현재는 레지스트리 시스템을 위해 공통 인터페이스를 사용합니다.
export interface VisualizationProps {
  [key: string]: unknown;
}

// concept ID와 시각화 컴포넌트를 매핑하는 레지스트리
export const visualizationRegistry: Record<string, ComponentType<VisualizationProps>> = {
  array: ArrayVisualization,
  stack: StackVisualization,
  queue: QueueVisualization,
  'linked-list': LinkedListVisualization,
  heap: HeapVisualization,
  'hash-table': HashTableVisualization,
  // 여기에 다른 시각화들을 추가할 수 있습니다:
  // 'tree': TreeVisualization,              // 트리 구조 그래프
  // 등등...
};

/**
 * concept ID에 해당하는 시각화 컴포넌트를 반환합니다.
 * @param conceptId - 개념의 ID
 * @returns 시각화 컴포넌트 또는 null
 */
export const getVisualizationComponent = (conceptId: string): ComponentType<VisualizationProps> | null => {
  return visualizationRegistry[conceptId] || null;
};

/**
 * concept ID에 시각화가 있는지 확인합니다.
 * @param conceptId - 개념의 ID
 * @returns 시각화가 있으면 true, 없으면 false
 */
export const hasVisualization = (conceptId: string): boolean => {
  return conceptId in visualizationRegistry;
};
