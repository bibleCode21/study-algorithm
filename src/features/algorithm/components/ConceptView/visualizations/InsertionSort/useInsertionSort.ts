import { useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_ARRAY } from './constants';
import type { AnimationState, Step } from './types';

type GeneratorState = {
  type: 'selecting' | 'comparing' | 'shifting' | 'inserting' | 'sorted';
  array: number[]; // 실제 동작 배열
  visualizationArray: (number | null)[]; // 시각화용 배열
  keyIndex: number;
  keyValue: number;
  comparingIndex?: number;
  shiftingIndex?: number;
};

// Generator 함수: 삽입 정렬
const insertionSortGenerator = function* (inputArray: number[]): Generator<GeneratorState, number[], unknown> {
  const array = [...inputArray]; // 실제 동작 배열
  const visualizationArray: (number | null)[] = [...inputArray]; // 시각화용 배열
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    // key 선택: 시각화 배열에서 key 위치를 null로
    visualizationArray[i] = null;
    yield {
      type: 'selecting',
      array: [...array],
      visualizationArray: [...visualizationArray],
      keyIndex: i,
      keyValue: key,
    };

    // 비교 및 이동
    while (j >= 0 && array[j] > key) {
      // 비교 단계: 시각화 배열은 그대로
      yield {
        type: 'comparing',
        array: [...array],
        visualizationArray: [...visualizationArray],
        keyIndex: i,
        keyValue: key,
        comparingIndex: j,
      };

      // 이동 단계: 실제 배열 업데이트 + 시각화 배열 업데이트
      array[j + 1] = array[j];
      visualizationArray[j + 1] = array[j];
      visualizationArray[j] = null;
      yield {
        type: 'shifting',
        array: [...array],
        visualizationArray: [...visualizationArray],
        keyIndex: i,
        keyValue: key,
        shiftingIndex: j,
      };

      j--;
    }

    // 삽입 단계: key를 시각화 배열에 삽입
    array[j + 1] = key;
    visualizationArray[j + 1] = key;
    yield {
      type: 'inserting',
      array: [...array],
      visualizationArray: [...visualizationArray],
      keyIndex: j + 1,
      keyValue: key,
    };
  }

  // 정렬 완료: 시각화 배열도 최종 상태
  yield {
    type: 'sorted',
    array: [...array],
    visualizationArray: [...array],
    keyIndex: 0,
    keyValue: 0,
  };

  return array;
};

export const useInsertionSort = () => {
  const [visualizationArray, setVisualizationArray] = useState<(number | null)[]>([...INITIAL_ARRAY]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>(null);
  const [isAutoSorting, setIsAutoSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(null);
  const generatorRef = useRef<Generator<GeneratorState, number[], unknown> | null>(null);
  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutRefs.current.clear();
    };
  }, []);

  // 한 단계씩 정렬 (수동)
  const stepSort = useCallback(() => {
    if (isAnimating || isAutoSorting) return;

    if (!generatorRef.current) {
      generatorRef.current = insertionSortGenerator([...INITIAL_ARRAY]);
    }

    const result = generatorRef.current.next();

    if (result.done) {
      setAnimationState({
        type: 'sorted',
        keyIndex: 0,
        keyValue: 0,
      });
      generatorRef.current = null;
      return;
    }

    const state = result.value;
    setVisualizationArray(state.visualizationArray);
    setAnimationState({
      type: state.type,
      keyIndex: state.keyIndex,
      keyValue: state.keyValue,
      comparingIndex: state.comparingIndex,
      shiftingIndex: state.shiftingIndex,
    });
  }, [isAnimating, isAutoSorting]);

  // 자동 정렬
  const autoSort = useCallback(() => {
    if (isAutoSorting) return;

    setIsAutoSorting(true);
    generatorRef.current = insertionSortGenerator([...INITIAL_ARRAY]);

    const processNext = () => {
      if (!generatorRef.current) return;

      const result = generatorRef.current.next();

      if (result.done) {
        setAnimationState({
          type: 'sorted',
          keyIndex: 0,
          keyValue: 0,
        });
        setIsAutoSorting(false);
        generatorRef.current = null;
        return;
      }

      const state = result.value;
      setVisualizationArray(state.visualizationArray);
      setAnimationState({
        type: state.type,
        keyIndex: state.keyIndex,
        keyValue: state.keyValue,
        comparingIndex: state.comparingIndex,
        shiftingIndex: state.shiftingIndex,
      });

      const delay = state.type === 'inserting' ? 600 : 300;
      const timeoutId = setTimeout(() => {
        processNext();
        timeoutRefs.current.delete(timeoutId);
      }, delay);
      timeoutRefs.current.add(timeoutId);
    };

    processNext();
  }, [isAutoSorting]);

  // 초기화
  const reset = useCallback(() => {
    timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutRefs.current.clear();

    const initialArray = [...INITIAL_ARRAY];
    setVisualizationArray(initialArray);
    setAnimationState(null);
    setCurrentStep(null);
    setIsAnimating(false);
    setIsAutoSorting(false);
    generatorRef.current = null;
  }, []);

  return {
    array: visualizationArray,
    animationState,
    currentStep,
    isAnimating,
    isAutoSorting,
    stepSort,
    autoSort,
    reset,
  };
};
