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

    let i: number;
    let j: number;
    let keyIndex: number;
    let keyValue: number;

    // 현재 위치 찾기
    if (currentStepValue === null) {
      // 첫 번째 단계: i=1부터 시작, key 선택
      i = 1;
      keyIndex = i;
      keyValue = currentArray[keyIndex];
      j = i - 1;
      
      // key 선택 상태 표시 (key는 계속 표시되도록)
      setIsAnimating(true);
      const newStep = { i, j, keyIndex, keyValue };
      setCurrentStep(newStep);
      currentStepRef.current = newStep;
      
      setAnimationState({
        type: 'key',
        keyIndex,
        keyValue,
      });
      setArray([...currentArray]);
      
      const timeoutId = setTimeout(() => {
        setIsAnimating(false);
        // key는 계속 표시되도록 상태 유지
        setAnimationState({
          type: 'key',
          keyIndex,
          keyValue,
        });
        timeoutRefs.current.delete(timeoutId);
      }, 600);
      timeoutRefs.current.add(timeoutId);
      return;
    } else {
      // 다음 단계 찾기
      i = currentStepValue.i;
      keyIndex = currentStepValue.keyIndex;
      keyValue = currentStepValue.keyValue;
      j = currentStepValue.j;

      // j가 0 이상이고 arr[j] > key인 경우
      if (j >= 0 && currentArray[j] > keyValue) {
        // 값을 뒤로 이동 (key 위치는 비워둠)
        currentArray[j + 1] = currentArray[j];
        j--;
      } else {
        // key를 올바른 위치에 삽입하고 다음 i로 이동
        currentArray[j + 1] = keyValue;
        i++;
        if (i >= n) {
          // 정렬 완료
          setArray(currentArray);
          arrayRef.current = currentArray;
          setAnimationState({
            type: 'sorted',
            sortedRange: [0, n - 1],
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
        keyIndex = i;
        keyValue = currentArray[keyIndex];
        j = i - 1;
      }
    }

    setIsAnimating(true);
    const newStep = { i, j, keyIndex, keyValue };
    setCurrentStep(newStep);
    currentStepRef.current = newStep;

    // 애니메이션 상태 설정
    if (j >= 0 && currentArray[j] > keyValue) {
      // 비교와 이동을 한 번에 처리
      const newArray = [...currentArray];
      newArray[j + 1] = newArray[j];
      
      // 이동 완료 상태 표시 (key는 계속 표시)
      setAnimationState({
        type: 'moving',
        keyIndex,
        keyValue,
        movingIndex: j,
      });
      setArray(newArray);
      arrayRef.current = newArray;

      const timeoutId = setTimeout(() => {
        setIsAnimating(false);
        // key는 계속 표시되도록 상태 유지
        setAnimationState({
          type: 'key',
          keyIndex,
          keyValue,
        });
        timeoutRefs.current.delete(timeoutId);
      }, 600);
      timeoutRefs.current.add(timeoutId);
    } else {
      // 삽입 중
      setAnimationState({
        type: 'inserting',
        keyIndex,
        keyValue,
      });
      const newArray = [...currentArray];
      newArray[j + 1] = keyValue;
      setArray(newArray);
      arrayRef.current = newArray;

      const timeoutId = setTimeout(() => {
        setIsAnimating(false);
        setAnimationState(null);
        timeoutRefs.current.delete(timeoutId);
      }, 600);
      timeoutRefs.current.add(timeoutId);
    }
  }, [isAnimating, isAutoSorting]);

  // 자동 정렬 (전체 과정)
  const autoSort = useCallback(() => {
    if (isAnimating || isAutoSorting) return;

    setIsAutoSorting(true);
    const arr = [...arrayRef.current];
    const n = arr.length;
    let currentArray = [...arr];
    let i = 1;
    let keyIndex = i;
    let keyValue = currentArray[keyIndex];
    let j = i - 1;

    // 첫 번째 key 선택
    setAnimationState({
      type: 'key',
      keyIndex,
      keyValue,
    });
    setCurrentStep({ i, j, keyIndex, keyValue });
    setArray([...currentArray]);

    const sortStep = () => {
      if (i >= n) {
        // 정렬 완료
        setArray(currentArray);
        arrayRef.current = currentArray;
        setAnimationState({
          type: 'sorted',
          sortedRange: [0, n - 1],
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
        // 비교와 이동을 한 번에 처리
        currentArray[j + 1] = currentArray[j];
        
        // 이동 완료 상태 표시 (key는 계속 표시)
        setAnimationState({
          type: 'moving',
          keyIndex,
          keyValue,
          movingIndex: j,
        });
        setCurrentStep({ i, j, keyIndex, keyValue });
        setArray([...currentArray]);
        arrayRef.current = [...currentArray];

        const timeoutId = setTimeout(() => {
          j--;
          // key는 계속 표시
          setAnimationState({
            type: 'key',
            keyIndex,
            keyValue,
          });
          sortStep();
          timeoutRefs.current.delete(timeoutId);
        }, 600);
        timeoutRefs.current.add(timeoutId);
      } else {
        // 삽입 중 표시
        setAnimationState({
          type: 'inserting',
          keyIndex,
          keyValue,
        });
        currentArray[j + 1] = keyValue;
        setArray([...currentArray]);
        arrayRef.current = [...currentArray];

        const timeoutId = setTimeout(() => {
          i++;
          if (i < n) {
            keyIndex = i;
            keyValue = currentArray[keyIndex];
            j = i - 1;
            // 다음 key 선택
            setAnimationState({
              type: 'key',
              keyIndex,
              keyValue,
            });
            setCurrentStep({ i, j, keyIndex, keyValue });
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
