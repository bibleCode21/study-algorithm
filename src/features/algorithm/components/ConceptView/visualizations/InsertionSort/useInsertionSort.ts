import { useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_ARRAY } from './constants';
import type { AnimationState, Step } from './types';

export const useInsertionSort = () => {
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>(null);
  const [isAutoSorting, setIsAutoSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(null);

  // 한 단계씩 정렬 (수동)
  const stepSort = useCallback(() => {
    // TODO: 구현 필요
  }, []);

  // 자동 정렬
  const autoSort = useCallback(() => {
    // TODO: 구현 필요
  }, []);

  // 초기화
  const reset = useCallback(() => {
    const initialArray = [...INITIAL_ARRAY];
    setArray(initialArray);
    setAnimationState(null);
    setCurrentStep(null);
    setIsAnimating(false);
    setIsAutoSorting(false);
  }, []);

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
