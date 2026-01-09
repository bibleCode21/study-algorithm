'use client';

import { useBinarySearch } from './useBinarySearch';
import { Header } from './Header';
import { ArrayVisualization } from './ArrayVisualization';
import { ControlButtons } from './ControlButtons';

const BinarySearchVisualization = () => {
  const {
    array,
    target,
    searchState,
    animationState,
    isAnimating,
    isAutoSearching,
    isSearchComplete,
    stepSearch,
    autoSearch,
    reset,
    setTarget,
  } = useBinarySearch();

  return (
    <div className="space-y-6">
      <Header />

      {/* 배열 시각화 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">탐색 과정</h3>

        <div className="mb-10">
          <ArrayVisualization array={array} target={target} animationState={animationState} />
        </div>

        {/* 탐색 결과 표시 */}
        {searchState && searchState.found !== null && (
          <div className={`mb-4 p-4 rounded-lg ${
            searchState.found
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-center font-semibold ${
              searchState.found ? 'text-green-800' : 'text-red-800'
            }`}>
              {searchState.found
                ? `✓ 값을 찾았습니다! 인덱스 [${searchState.mid}]에 위치합니다.`
                : `✗ 값을 찾지 못했습니다. 배열에 ${target}이(가) 존재하지 않습니다.`}
            </p>
          </div>
        )}

        <ControlButtons
          target={target}
          isAnimating={isAnimating}
          isAutoSearching={isAutoSearching}
          isSearchComplete={isSearchComplete}
          onStepSearch={stepSearch}
          onAutoSearch={autoSearch}
          onReset={reset}
          onTargetChange={setTarget}
        />
      </div>
    </div>
  );
};

export default BinarySearchVisualization;
