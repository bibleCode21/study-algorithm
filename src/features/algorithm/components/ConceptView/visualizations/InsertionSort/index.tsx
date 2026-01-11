'use client';

import { useEffect } from 'react';
import { useInsertionSort } from './useInsertionSort';
import { Header } from './Header';
import { ArrayVisualization } from './ArrayVisualization';
import { AnimationStatus } from './AnimationStatus';

const InsertionSortVisualization = () => {
  const {
    array,
    animationState,
    autoSort,
  } = useInsertionSort();

  // 컴포넌트 마운트 시 자동 정렬 시작
  useEffect(() => {
    autoSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </div>
    </div>
  );
};

export default InsertionSortVisualization;
