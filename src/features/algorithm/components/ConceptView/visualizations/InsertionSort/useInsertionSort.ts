import { useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_ARRAY } from './constants';
import type { AnimationState, Step } from './types';

// Generator가 yield하는 상태 타입
type GeneratorState =
  | {
      type: 'selecting';
      array: number[];
      pass: number;
      keyIndex: number;
      keyValue: number;
      aux: number;
    }
  | {
      type: 'comparing';
      array: number[];
      pass: number;
      keyIndex: number;
      keyValue: number;
      comparingIndex: number;
      aux: number;
    }
  | {
      type: 'shifting';
      array: number[];
      pass: number;
      keyIndex: number;
      keyValue: number;
      shiftingIndex: number; // 이동되는 값의 원래 위치 (aux)
      shiftedToIndex: number; // 이동된 값의 새로운 위치 (aux + 1)
      aux: number;
    }
  | {
      type: 'inserting';
      array: number[];
      pass: number;
      keyIndex: number;
      keyValue: number;
      aux: number;
    }
  | {
      type: 'sorted';
      array: number[];
      pass: number;
      keyIndex: number;
      keyValue: number;
      aux: number;
    };

// Generator 함수: 삽입 정렬 알고리즘
function* insertionSortGenerator(arr: number[]): Generator<GeneratorState, number[], unknown> {
  const array = [...arr]; // 원본 배열 복사
  const n = array.length;

  for (let index = 1; index < n; index++) {
    const temp = array[index];
    const keyIndex = index;
    const keyValue = temp;
    let aux = index - 1;
    const pass = index; // 회전 번호 (1부터 시작)

    // key 선택
    yield {
      type: 'selecting' as const,
      array: [...array],
      pass,
      keyIndex,
      keyValue,
      aux,
    };

    // 비교 및 이동
    while (aux >= 0 && array[aux] > temp) {
      // 비교 단계
      yield {
        type: 'comparing' as const,
        array: [...array],
        pass,
        keyIndex,
        keyValue,
        comparingIndex: aux,
        aux,
      };

      // 이동 단계
      const beforeMove = array[aux];
      const beforeArray = [...array];
      array[aux + 1] = array[aux];
      const shiftingState = {
        type: 'shifting' as const,
        array: [...array],
        pass,
        keyIndex,
        keyValue,
        shiftingIndex: aux,
        shiftedToIndex: aux + 1,
        aux,
      };
      console.log('🔄 Generator - shifting 단계:', {
        ...shiftingState,
        이동전배열: beforeArray,
        이동후배열: [...array],
        이동전값: beforeMove,
        설명: `배열[${aux}](${beforeMove})를 배열[${aux + 1}]로 이동`,
        주의: `keyIndex(${keyIndex})와 shiftedToIndex(${aux + 1})가 겹치는가? ${keyIndex === aux + 1}`,
      });
      yield shiftingState;

      aux--;
    }

    // 삽입 단계
    array[aux + 1] = temp;
    yield {
      type: 'inserting' as const,
      array: [...array],
      pass,
      keyIndex: aux + 1,
      keyValue,
      aux,
    };
  }

  // 정렬 완료
  yield {
    type: 'sorted' as const,
    array: [...array],
    pass: n,
    keyIndex: 0,
    keyValue: 0,
    aux: -1,
  };

  return array;
}

export const useInsertionSort = () => {
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  const arrayRef = useRef<number[]>([...INITIAL_ARRAY]);
  const generatorRef = useRef<Generator<GeneratorState, number[], unknown> | null>(null);
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

    // generator가 없으면 새로 생성
    if (!generatorRef.current) {
      generatorRef.current = insertionSortGenerator(arrayRef.current);
    }

    setIsAnimating(true);
    const result = generatorRef.current.next();

    if (result.done) {
      // 정렬 완료
      if (result.value) {
        setArray(result.value);
        arrayRef.current = result.value;
      }
      setAnimationState({
        type: 'sorted',
        keyIndex: 0,
        keyValue: 0,
      });
      setIsAnimating(false);
      setCurrentStep(null);
      generatorRef.current = null;
      const timeoutId = setTimeout(() => {
        setAnimationState(null);
        timeoutRefs.current.delete(timeoutId);
      }, 1000);
      timeoutRefs.current.add(timeoutId);
      return;
    }

    const state = result.value;
    console.log('📤 useInsertionSort - state 받음:', {
      type: state.type,
      array: state.array,
      keyIndex: state.keyIndex,
      shiftingIndex: state.type === 'shifting' ? state.shiftingIndex : undefined,
      shiftedToIndex: state.type === 'shifting' ? state.shiftedToIndex : undefined,
    });
    setArray(state.array);
    arrayRef.current = state.array;

    // Step 정보 업데이트
    const step: Step = {
      pass: state.pass,
      i: state.keyIndex,
      j: state.aux,
      keyIndex: state.keyIndex,
      keyValue: state.keyValue,
    };
    setCurrentStep(step);

    // AnimationState 설정
    if (state.type === 'selecting') {
      setAnimationState({
        type: 'selecting',
        keyIndex: state.keyIndex,
        keyValue: state.keyValue,
      });
      setIsAnimating(false);
    } else if (state.type === 'comparing') {
      setAnimationState({
        type: 'comparing',
        keyIndex: state.keyIndex,
        keyValue: state.keyValue,
        comparingIndex: state.comparingIndex,
      });
      setIsAnimating(false);
    } else if (state.type === 'shifting') {
      const animationState = {
        type: 'shifting' as const,
        keyIndex: state.keyIndex,
        keyValue: state.keyValue,
        shiftingIndex: state.shiftingIndex,
        shiftedToIndex: state.shiftedToIndex,
      };
      console.log('📝 AnimationState 설정 (shifting):', animationState);
      setAnimationState(animationState);
      setIsAnimating(false);
    } else if (state.type === 'inserting') {
      setAnimationState({
        type: 'inserting',
        keyIndex: state.keyIndex,
        keyValue: state.keyValue,
      });
      setIsAnimating(false);
    }
  }, [isAnimating, isAutoSorting]);

  // 자동 정렬
  const autoSort = useCallback(() => {
    if (isAnimating || isAutoSorting) return;

    setIsAutoSorting(true);
    generatorRef.current = insertionSortGenerator(arrayRef.current);

    const processNextStep = () => {
      if (!generatorRef.current) return;

      const result = generatorRef.current.next();

      if (result.done) {
        // 정렬 완료
        if (result.value) {
          setArray(result.value);
          arrayRef.current = result.value;
        }
        setAnimationState({
          type: 'sorted',
          keyIndex: 0,
          keyValue: 0,
        });
        setIsAutoSorting(false);
        setCurrentStep(null);
        generatorRef.current = null;
        const timeoutId = setTimeout(() => {
          setAnimationState(null);
          timeoutRefs.current.delete(timeoutId);
        }, 1000);
        timeoutRefs.current.add(timeoutId);
        return;
      }

      const state = result.value;
      setArray(state.array);
      arrayRef.current = state.array;

      // Step 정보 업데이트
      const step: Step = {
        pass: state.pass,
        i: state.keyIndex,
        j: state.aux,
        keyIndex: state.keyIndex,
        keyValue: state.keyValue,
      };
      setCurrentStep(step);

      // AnimationState 설정
      if (state.type === 'selecting') {
        setAnimationState({
          type: 'selecting',
          keyIndex: state.keyIndex,
          keyValue: state.keyValue,
        });
      } else if (state.type === 'comparing') {
        setAnimationState({
          type: 'comparing',
          keyIndex: state.keyIndex,
          keyValue: state.keyValue,
          comparingIndex: state.comparingIndex,
        });
      } else if (state.type === 'shifting') {
        setAnimationState({
          type: 'shifting',
          keyIndex: state.keyIndex,
          keyValue: state.keyValue,
          shiftingIndex: state.shiftingIndex,
          shiftedToIndex: state.shiftedToIndex,
        });
      } else if (state.type === 'inserting') {
        setAnimationState({
          type: 'inserting',
          keyIndex: state.keyIndex,
          keyValue: state.keyValue,
        });
      }

      // 다음 단계로 진행 (약간의 딜레이)
      const delay = state.type === 'inserting' ? 600 : 300;
      const timeoutId = setTimeout(() => {
        processNextStep();
        timeoutRefs.current.delete(timeoutId);
      }, delay);
      timeoutRefs.current.add(timeoutId);
    };

    // 첫 단계 시작
    const startTimeout = setTimeout(() => {
      processNextStep();
      timeoutRefs.current.delete(startTimeout);
    }, 300);
    timeoutRefs.current.add(startTimeout);
  }, [isAnimating, isAutoSorting]);

  // 초기화
  const reset = useCallback(() => {
    // 모든 timeout 정리
    timeoutRefs.current.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    timeoutRefs.current.clear();

    const initialArray = [...INITIAL_ARRAY];
    setArray(initialArray);
    arrayRef.current = initialArray;
    setAnimationState(null);
    setCurrentStep(null);
    generatorRef.current = null;
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
