'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const INITIAL_ARRAY = [64, 34, 25, 12, 22, 11, 90];

type AnimationState = {
  type: 'comparing' | 'swapping' | 'sorted';
  indices: number[];
} | null;

const BubbleSortVisualization = () => {
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  const arrayRef = useRef<number[]>([...INITIAL_ARRAY]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>(null);
  const [isAutoSorting, setIsAutoSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState<{
    pass: number;
    comparison: number;
  } | null>(null);

  // array 상태가 변경될 때마다 ref 업데이트
  useEffect(() => {
    arrayRef.current = array;
  }, [array]);

  const animate = useCallback((callback: () => void, duration = 600) => {
    setIsAnimating(true);
    callback();
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationState(null);
    }, duration);
  }, []);

  // 한 번의 비교와 교환 수행
  const performComparison = useCallback(
    (arr: number[], i: number, j: number): { newArray: number[]; swapped: boolean } => {
      const newArray = [...arr];
      let swapped = false;

      if (newArray[j] > newArray[j + 1]) {
        // 교환
        [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
        swapped = true;
      }

      return { newArray, swapped };
    },
    []
  );

  // 한 단계씩 정렬 (수동)
  const stepSort = useCallback(() => {
    if (isAnimating || isAutoSorting) return;

    const arr = [...arrayRef.current];
    const n = arr.length;
    let found = false;
    let pass = 0;
    let comparison = 0;

    // 현재 위치 찾기
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (i === 0 && j === 0 && currentStep === null) {
          // 첫 번째 비교
          pass = 0;
          comparison = 0;
          found = true;
          break;
        } else if (
          currentStep &&
          (i > currentStep.pass || (i === currentStep.pass && j > currentStep.comparison))
        ) {
          pass = i;
          comparison = j;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      // 이미 정렬 완료
      return;
    }

    setIsAnimating(true);

    // 비교 중 표시
    setAnimationState({
      type: 'comparing',
      indices: [comparison, comparison + 1],
    });
    setCurrentStep({ pass, comparison });

    setTimeout(() => {
      const { newArray, swapped: didSwap } = performComparison(arr, pass, comparison);

      if (didSwap) {
        // 교환 중 표시
        setAnimationState({
          type: 'swapping',
          indices: [comparison, comparison + 1],
        });
      }

      setTimeout(() => {
        setArray(newArray);

        // 다음 단계로 이동
        if (comparison < n - pass - 2) {
          setCurrentStep({ pass, comparison: comparison + 1 });
        } else if (pass < n - 2) {
          setCurrentStep({ pass: pass + 1, comparison: 0 });
        } else {
          // 정렬 완료
          setCurrentStep(null);
          setAnimationState({
            type: 'sorted',
            indices: [],
          });
          setTimeout(() => {
            setAnimationState(null);
          }, 1000);
        }

        setIsAnimating(false);
      }, 300);
    }, 300);
  }, [isAnimating, isAutoSorting, currentStep, performComparison]);

  // 자동 정렬 (전체 과정)
  const autoSort = useCallback(() => {
    if (isAnimating || isAutoSorting) return;

    setIsAutoSorting(true);
    const arr = [...arrayRef.current];
    const n = arr.length;
    let currentArray = [...arr];
    let pass = 0;
    let comparison = 0;

    const sortStep = () => {
      if (pass >= n - 1) {
        // 정렬 완료
        setArray(currentArray);
        setAnimationState({
          type: 'sorted',
          indices: [],
        });
        setIsAutoSorting(false);
        setCurrentStep(null);
        setTimeout(() => {
          setAnimationState(null);
        }, 1000);
        return;
      }

      if (comparison >= n - pass - 1) {
        // 한 패스 완료
        pass++;
        comparison = 0;
        sortStep();
        return;
      }

      // 비교 중 표시
      setAnimationState({
        type: 'comparing',
        indices: [comparison, comparison + 1],
      });
      setCurrentStep({ pass, comparison });
      setArray([...currentArray]);

      setTimeout(() => {
        const { newArray, swapped } = performComparison(currentArray, pass, comparison);
        currentArray = newArray;

        if (swapped) {
          // 교환 중 표시
          setAnimationState({
            type: 'swapping',
            indices: [comparison, comparison + 1],
          });
        }

        setArray([...currentArray]);
        arrayRef.current = [...currentArray];

        setTimeout(() => {
          comparison++;
          sortStep();
        }, 300);
      }, 300);
    };

    sortStep();
  }, [isAnimating, isAutoSorting, performComparison]);

  const reset = useCallback(() => {
    if (isAnimating || isAutoSorting) return;
    const resetArray = [...INITIAL_ARRAY];
    setArray(resetArray);
    arrayRef.current = resetArray;
    setCurrentStep(null);
    setAnimationState(null);
    setIsAutoSorting(false);
  }, [isAnimating, isAutoSorting]);

  // 배열이 정렬되었는지 확인
  const isSorted = array.every((val, idx) => idx === 0 || array[idx - 1] <= val);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">버블 정렬 시각화</h2>
        <p className="text-gray-600 mb-6">
          버블 정렬의 동작 과정을 시각적으로 확인해보세요. 인접한 두 요소를 비교하여 순서가
          잘못된 경우 교환하는 과정을 단계별로 확인할 수 있습니다.
        </p>
      </div>

      {/* 배열 시각화 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">정렬 과정</h3>

        <div className="mb-10">
          {/* 현재 단계 정보 */}
          {currentStep && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">패스 {currentStep.pass + 1}</span> - 비교{' '}
                {currentStep.comparison + 1}번째
              </p>
            </div>
          )}

          {/* 배열 표시 */}
          <div className="flex flex-wrap items-end justify-center gap-3 min-h-[200px]">
            {array.map((value, index) => {
              let bgColor = 'bg-gray-50';
              let borderColor = 'border-gray-300';
              let textColor = 'text-gray-900';
              let scale = 'scale-100';

              if (animationState) {
                if (animationState.type === 'comparing' && animationState.indices.includes(index)) {
                  bgColor = 'bg-yellow-400';
                  borderColor = 'border-yellow-500';
                  textColor = 'text-gray-900';
                  scale = 'scale-110';
                } else if (
                  animationState.type === 'swapping' &&
                  animationState.indices.includes(index)
                ) {
                  bgColor = 'bg-red-500';
                  borderColor = 'border-red-600';
                  textColor = 'text-white';
                  scale = 'scale-110';
                } else if (animationState.type === 'sorted') {
                  bgColor = 'bg-green-400';
                  borderColor = 'border-green-500';
                  textColor = 'text-gray-900';
                }
              }

              return (
                <div
                  key={`${index}-${value}`}
                  className={`relative w-16 h-16 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-lg transition-all duration-300 ${bgColor} ${borderColor} ${textColor} ${scale} shadow-md`}
                  style={{
                    height: `${48 + value * 2}px`,
                    minHeight: '48px',
                  }}
                >
                  <span className="z-10">{value}</span>
                  {/* 인덱스 표시 */}
                  <div className="absolute -bottom-6 text-xs font-normal text-gray-500">
                    [{index}]
                  </div>
                </div>
              );
            })}
          </div>

          {/* 상태 표시 */}
          {animationState && (
            <div className="mt-6 text-center">
              {animationState.type === 'comparing' && (
                <p className="text-sm text-yellow-700 font-medium">
                  비교 중: {array[animationState.indices[0]]}와 {array[animationState.indices[1]]}{' '}
                  비교
                </p>
              )}
              {animationState.type === 'swapping' && (
                <p className="text-sm text-red-700 font-medium">
                  교환 중: {array[animationState.indices[1]]}와 {array[animationState.indices[0]]}{' '}
                  교환
                </p>
              )}
              {animationState.type === 'sorted' && (
                <p className="text-sm text-green-700 font-medium">정렬 완료!</p>
              )}
            </div>
          )}
        </div>

        {/* 컨트롤 버튼 */}
        <div className="relative">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    연산
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    버튼
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="text-sm font-semibold text-gray-700">단계별 정렬</span>
                    <span className="ml-2 text-xs text-gray-500">(한 단계씩)</span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={stepSort}
                      disabled={isAnimating || isAutoSorting || isSorted}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      다음 단계
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="text-sm font-semibold text-gray-700">자동 정렬</span>
                    <span className="ml-2 text-xs text-gray-500">(전체 과정)</span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={autoSort}
                      disabled={isAnimating || isAutoSorting || isSorted}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      자동 정렬 시작
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={reset}
              disabled={isAnimating || isAutoSorting}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortVisualization;
