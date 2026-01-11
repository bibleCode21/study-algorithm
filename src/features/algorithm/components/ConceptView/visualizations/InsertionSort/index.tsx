'use client';

import { useInsertionSort } from './useInsertionSort';
import { Header } from './Header';
import { ArrayVisualization } from './ArrayVisualization';
import { AnimationStatus } from './AnimationStatus';
import { ControlButtons } from './ControlButtons';

const InsertionSortVisualization = () => {
  const {
    array,
    animationState,
    isAnimating,
    isAutoSorting,
    stepSort,
    autoSort,
    reset,
  } = useInsertionSort();

  return (
    <div className="space-y-6">
      <Header />

      {/* 배열 시각화 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">정렬 과정</h3>

        <div className="mb-10">
          <ArrayVisualization array={array} animationState={animationState} />
        </div>

        <AnimationStatus animationState={animationState} array={array} />

        <ControlButtons
          array={array}
          isAnimating={isAnimating}
          isAutoSorting={isAutoSorting}
          onStepSort={stepSort}
          onAutoSort={autoSort}
          onReset={reset}
        />
      </div>
    </div>
  );
};

export default InsertionSortVisualization;
