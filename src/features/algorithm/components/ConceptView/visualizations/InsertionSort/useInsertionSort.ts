import { useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_ARRAY } from './constants';
import type { AnimationState, Step } from './types';

export const useInsertionSort = () => {
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

    let pass: number;
    let i: number;
    let j: number;
    let keyIndex: number;
    let keyValue: number;

    // 현재 위치 찾기
    if (currentStepValue === null) {
      // 1회전 시작: i=1, key=34 선택
      pass = 1;
      i = 1;
      keyIndex = i;
      keyValue = currentArray[keyIndex];
      j = i - 1;
    } else {
      // 다음 단계 찾기
      pass = currentStepValue.pass;
      i = currentStepValue.i;
      keyIndex = currentStepValue.keyIndex;
      keyValue = currentStepValue.keyValue;
      j = currentStepValue.j;

      // j가 0 이상이고 arr[j] > key인 경우 - 비교 후 이동
      if (j >= 0 && currentArray[j] > keyValue) {
        // 값을 뒤로 이동
        currentArray[j + 1] = currentArray[j];
        j--;
      } else {
        // key를 올바른 위치에 삽입하고 다음 회전으로 이동
        currentArray[j + 1] = keyValue;
        i++;
        if (i >= n) {
          // 정렬 완료
          setArray(currentArray);
          arrayRef.current = currentArray;
          setAnimationState({
            type: 'sorted',
            keyIndex: 0,
            keyValue: 0,
          });
          setIsAnimating(false);
          setCurrentStep(null);
          currentStepRef.current = null;
          const timeoutId = setTimeout(() => {
            setAnimationState(null);
            timeoutRefs.current.delete(timeoutId);
          }, 1000);
          timeoutRefs.current.add(timeoutId);
          return;
        }
        // 다음 회전 시작
        pass++;
        keyIndex = i;
        keyValue = currentArray[keyIndex];
        j = i - 1;
      }
    }

    setIsAnimating(true);
    const newStep = { pass, i, j, keyIndex, keyValue };
    setCurrentStep(newStep);
    currentStepRef.current = newStep;

    // 애니메이션 상태 설정
    if (j >= 0 && currentArray[j] > keyValue) {
      // 비교 단계
      setAnimationState({
        type: 'comparing',
        keyIndex,
        keyValue,
        comparingIndex: j,
      });
      setArray([...currentArray]);

      const timeoutId1 = setTimeout(() => {
        // 이동 단계
        const newArray = [...currentArray];
        newArray[j + 1] = newArray[j];
        
        setAnimationState({
          type: 'shifting',
          keyIndex,
          keyValue,
          shiftingIndex: j,
        });
        setArray(newArray);
        arrayRef.current = newArray;

        const timeoutId2 = setTimeout(() => {
          setIsAnimating(false);
          // key 선택 상태로 유지
          setAnimationState({
            type: 'selecting',
            keyIndex,
            keyValue,
          });
          timeoutRefs.current.delete(timeoutId2);
        }, 400);
        timeoutRefs.current.add(timeoutId2);
        timeoutRefs.current.delete(timeoutId1);
      }, 400);
      timeoutRefs.current.add(timeoutId1);
    } else {
      // 삽입 단계
      setAnimationState({
        type: 'inserting',
        keyIndex: j + 1,
        keyValue,
      });
      const newArray = [...currentArray];
      newArray[j + 1] = keyValue;
      setArray(newArray);
      arrayRef.current = newArray;

      const timeoutId = setTimeout(() => {
        setIsAnimating(false);
        // 다음 회전이 있으면 key 선택 상태로, 없으면 null
        if (i < n) {
          setAnimationState({
            type: 'selecting',
            keyIndex: i,
            keyValue: newArray[i],
          });
        } else {
          setAnimationState(null);
        }
        timeoutRefs.current.delete(timeoutId);
      }, 600);
      timeoutRefs.current.add(timeoutId);
    }
  }, [isAnimating, isAutoSorting]);

  // 자동 정렬
  const autoSort = useCallback(() => {
    if (isAnimating || isAutoSorting) return;

    setIsAutoSorting(true);
    const arr = [...arrayRef.current];
    const n = arr.length;
    let currentArray = [...arr];
    let pass = 1;
    let i = 1;
    let keyIndex = i;
    let keyValue = currentArray[keyIndex];
    let j = i - 1;

    // 첫 번째 key 선택
    setAnimationState({
      type: 'selecting',
      keyIndex,
      keyValue,
    });
    setCurrentStep({ pass, i, j, keyIndex, keyValue });
    setArray([...currentArray]);

    const sortStep = () => {
      if (i >= n) {
        // 정렬 완료
        setArray(currentArray);
        arrayRef.current = currentArray;
        setAnimationState({
          type: 'sorted',
          keyIndex: 0,
          keyValue: 0,
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

      if (j >= 0 && currentArray[j] > keyValue) {
        // 비교 단계
        setAnimationState({
          type: 'comparing',
          keyIndex,
          keyValue,
          comparingIndex: j,
        });
        setCurrentStep({ pass, i, j, keyIndex, keyValue });
        setArray([...currentArray]);

        const timeoutId1 = setTimeout(() => {
          // 이동 단계
          currentArray[j + 1] = currentArray[j];
          
          setAnimationState({
            type: 'shifting',
            keyIndex,
            keyValue,
            shiftingIndex: j,
          });
          setArray([...currentArray]);
          arrayRef.current = [...currentArray];

          const timeoutId2 = setTimeout(() => {
            j--;
            setAnimationState({
              type: 'selecting',
              keyIndex,
              keyValue,
            });
            sortStep();
            timeoutRefs.current.delete(timeoutId2);
          }, 300);
          timeoutRefs.current.add(timeoutId2);
          timeoutRefs.current.delete(timeoutId1);
        }, 300);
        timeoutRefs.current.add(timeoutId1);
      } else {
        // 삽입 단계
        setAnimationState({
          type: 'inserting',
          keyIndex: j + 1,
          keyValue,
        });
        currentArray[j + 1] = keyValue;
        setArray([...currentArray]);
        arrayRef.current = [...currentArray];

        const timeoutId = setTimeout(() => {
          i++;
          if (i < n) {
            pass++;
            keyIndex = i;
            keyValue = currentArray[keyIndex];
            j = i - 1;
            setAnimationState({
              type: 'selecting',
              keyIndex,
              keyValue,
            });
            setCurrentStep({ pass, i, j, keyIndex, keyValue });
          }
          sortStep();
          timeoutRefs.current.delete(timeoutId);
        }, 300);
        timeoutRefs.current.add(timeoutId);
      }
    };

    const startTimeout = setTimeout(() => {
      sortStep();
      timeoutRefs.current.delete(startTimeout);
    }, 600);
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
    currentStepRef.current = null;
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
