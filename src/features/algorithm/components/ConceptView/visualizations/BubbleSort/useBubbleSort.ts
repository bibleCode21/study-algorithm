import { useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_ARRAY } from './constants';
import { performComparison } from './utils';
import type { AnimationState, Step } from './types';

export const useBubbleSort = () => {
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  const arrayRef = useRef<number[]>([...INITIAL_ARRAY]);
  const currentStepRef = useRef<Step>(null);
  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>(null);
  const [isAutoSorting, setIsAutoSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(null);

  // array 상태가 변경될 때마다 ref 업데이트
  useEffect(() => {
    arrayRef.current = array;
  }, [array]);

  // 컴포넌트 언마운트 시 모든 timeout 정리
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
      timeoutRefs.current.clear();
    };
  }, []);

  // 한 단계씩 정렬 (수동)
  const stepSort = useCallback(() => {
    if (isAnimating || isAutoSorting) return;

    const currentArray = [...arrayRef.current];
    const n = currentArray.length;
    const currentStepValue = currentStepRef.current;
    let pass = 0;
    let comparison = 0;

    // 현재 위치 찾기
    if (currentStepValue === null) {
      // 첫 번째 비교
      pass = 0;
      comparison = 0;
    } else {
      // 다음 비교 위치 찾기
      pass = currentStepValue.pass;
      comparison = currentStepValue.comparison + 1;

      // 현재 패스의 마지막 비교를 넘었는지 확인
      if (comparison >= n - pass - 1) {
        // 다음 패스로 이동
        pass++;
        comparison = 0;

        // 모든 패스가 완료되었는지 확인
        if (pass >= n - 1) {
          // 정렬 완료
          return;
        }
      }
    }

    setIsAnimating(true);

    // 비교 중 표시
    setAnimationState({
      type: 'comparing',
      indices: [comparison, comparison + 1],
    });
    const newStep = { pass, comparison };
    setCurrentStep(newStep);
    currentStepRef.current = newStep;
    setArray([...currentArray]);

    const timeoutId1 = setTimeout(() => {
      const { newArray, swapped: didSwap } = performComparison(currentArray, pass, comparison);

      if (didSwap) {
        // 교환 중 표시
        setAnimationState({
          type: 'swapping',
          indices: [comparison, comparison + 1],
        });
      }

      setArray([...newArray]);
      arrayRef.current = [...newArray];

      const timeoutId2 = setTimeout(() => {
        setIsAnimating(false);
        timeoutRefs.current.delete(timeoutId2);
      }, 300);
      timeoutRefs.current.add(timeoutId2);
      timeoutRefs.current.delete(timeoutId1);
    }, 300);
    timeoutRefs.current.add(timeoutId1);
  }, [isAnimating, isAutoSorting]);

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
        arrayRef.current = currentArray;
        setAnimationState({
          type: 'sorted',
          indices: [],
        });
        setIsAutoSorting(false);
        setCurrentStep(null);
        const timeoutId = setTimeout(() => {
          setAnimationState(null);
          timeoutRefs.current.delete(timeoutId);
        }, 1000);
        timeoutRefs.current.add(timeoutId);
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

      const timeoutId1 = setTimeout(() => {
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

        const timeoutId2 = setTimeout(() => {
          comparison++;
          sortStep();
          timeoutRefs.current.delete(timeoutId2);
        }, 300);
        timeoutRefs.current.add(timeoutId2);
        timeoutRefs.current.delete(timeoutId1);
      }, 300);
      timeoutRefs.current.add(timeoutId1);
    };

    sortStep();
  }, [isAnimating, isAutoSorting]);

  const reset = useCallback(() => {
    if (isAnimating || isAutoSorting) return;
    // 모든 timeout 정리
    timeoutRefs.current.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    timeoutRefs.current.clear();

    const resetArray = [...INITIAL_ARRAY];
    setArray(resetArray);
    arrayRef.current = resetArray;
    setCurrentStep(null);
    currentStepRef.current = null;
    setAnimationState(null);
    setIsAutoSorting(false);
    setIsAnimating(false);
  }, [isAnimating, isAutoSorting]);

  return {
    array,
    animationState,
    currentStep,
    isAnimating,
    isAutoSorting,
    stepSort,
    autoSort,
    reset,
  };
};
