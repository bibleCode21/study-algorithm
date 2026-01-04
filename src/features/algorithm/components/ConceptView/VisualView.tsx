'use client';

import { ConceptViewProps } from '@/features/algorithm/types/components';
import { getVisualizationComponent, hasVisualization } from './visualizations';

type VisualViewProps = Omit<ConceptViewProps, 'viewMode'>;

/**
 * VisualView 컴포넌트
 * 
 * 각 시각화 컴포넌트는 완전히 독립적으로 동작하며, 자신만의 고유한 UI와 옵션을 가질 수 있습니다.
 * 예를 들어:
 * - Array: 1차원 배열 / 2차원 배열 선택 옵션
 * - LinkedList: 선형 그래프 형태의 시각화
 * - Tree: 트리 구조 그래프
 * - Stack/Queue: 1차원 그래프 형태
 * 
 * 각 시각화 컴포넌트는 자체적으로 필요한 모든 UI 요소(제목, 설명, 옵션 선택, 시각화 영역 등)를 포함합니다.
 */
const VisualView = ({ concept }: VisualViewProps) => {
  // 시각화가 없는 개념인 경우
  if (!hasVisualization(concept.id)) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          시각화 뷰는 현재 이 개념에 사용할 수 없습니다.
        </p>
      </div>
    );
  }

  // 레지스트리에서 시각화 컴포넌트 가져오기
  const VisualizationComponent = getVisualizationComponent(concept.id);
  if (!VisualizationComponent) {
    return null;
  }

  // 각 시각화 컴포넌트는 완전히 독립적으로 자신의 UI를 렌더링합니다.
  // VisualView는 단순히 컴포넌트를 렌더링하는 역할만 수행합니다.
  return <VisualizationComponent />;
};

export default VisualView;
