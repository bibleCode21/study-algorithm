import { useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_ARRAY, DEFAULT_TARGET } from './constants';
import type { AnimationState, SearchState } from './types';

export const useBinarySearch = () => {
  const [array] = useState<number[]>([...INITIAL_ARRAY]);
  const [target, setTarget] = useState<number>(DEFAULT_TARGET);
  const [searchState, setSearchState] = useState<SearchState>(null);
  const [animationState, setAnimationState] = useState<AnimationState>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoSearching, setIsAutoSearching] = useState(false);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  
  const searchHistoryRef = useRef<SearchState[]>([]);
  const currentStepRef = useRef<number>(0);
  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // 컴포넌트 언마운트 시 모든 timeout 정리
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
      timeoutRefs.current.clear();
    };
  }, []);

  // 이진 탐색 알고리즘 실행
  const performBinarySearch = useCallback((arr: number[], targetValue: number): SearchState[] => {
    const history: SearchState[] = [];
    let left = 0;
    let right = arr.length - 1;
    let found = false;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      const state: SearchState = {
        left,
        right,
        mid,
        target: targetValue,
        found: null, // 탐색 중
      };

      if (arr[mid] === targetValue) {
        // 찾은 경우
        state.found = true;
        found = true;
        history.push(state);
        break;
      } else if (arr[mid] < targetValue) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }

      history.push(state);
    }

    // 못 찾은 경우 (while 루프가 종료되었지만 found가 false인 경우)
    if (!found && history.length > 0) {
      history[history.length - 1].found = false;
    }

    return history;
  }, []);

  // 한 단계씩 탐색 (수동)
  const stepSearch = useCallback(() => {
    if (isAnimating || isAutoSearching || isSearchComplete) return;

    if (searchHistoryRef.current.length === 0) {
      // 첫 탐색 시작
      searchHistoryRef.current = performBinarySearch(array, target);
      currentStepRef.current = 0;
    }

    if (currentStepRef.current >= searchHistoryRef.current.length) {
      setIsSearchComplete(true);
      return;
    }

    setIsAnimating(true);
    const currentState = searchHistoryRef.current[currentStepRef.current];
    setSearchState(currentState);

    // 비교 중 애니메이션
    setAnimationState({
      type: currentState.found === true ? 'found' : currentState.found === false ? 'not-found' : 'comparing',
      left: currentState.left,
      right: currentState.right,
      mid: currentState.mid,
    });

    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
      currentStepRef.current++;
      
      if (currentStepRef.current >= searchHistoryRef.current.length) {
        setIsSearchComplete(true);
      }
      
      timeoutRefs.current.delete(timeoutId);
    }, 600);
    timeoutRefs.current.add(timeoutId);
  }, [array, target, isAnimating, isAutoSearching, isSearchComplete, performBinarySearch]);

  // 자동 탐색 (전체 과정)
  const autoSearch = useCallback(() => {
    if (isAnimating || isAutoSearching || isSearchComplete) return;

    setIsAutoSearching(true);
    searchHistoryRef.current = performBinarySearch(array, target);
    currentStepRef.current = 0;

    const playStep = (stepIndex: number): void => {
      if (stepIndex >= searchHistoryRef.current.length) {
        setIsAutoSearching(false);
        setIsSearchComplete(true);
        return;
      }

      const currentState = searchHistoryRef.current[stepIndex];
      setSearchState(currentState);
      setAnimationState({
        type: currentState.found === true ? 'found' : currentState.found === false ? 'not-found' : 'comparing',
        left: currentState.left,
        right: currentState.right,
        mid: currentState.mid,
      });

      const timeoutId = setTimeout(() => {
        playStep(stepIndex + 1);
        timeoutRefs.current.delete(timeoutId);
      }, 800);
      timeoutRefs.current.add(timeoutId);
    };

    playStep(0);
  }, [array, target, isAnimating, isAutoSearching, isSearchComplete, performBinarySearch]);

  // 초기화
  const reset = useCallback(() => {
    // 모든 timeout 정리
    timeoutRefs.current.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    timeoutRefs.current.clear();

    setSearchState(null);
    setAnimationState(null);
    setIsAnimating(false);
    setIsAutoSearching(false);
    setIsSearchComplete(false);
    searchHistoryRef.current = [];
    currentStepRef.current = 0;
  }, []);

  // 타겟 변경
  const handleTargetChange = useCallback((newTarget: number) => {
    if (isAnimating || isAutoSearching) return;
    setTarget(newTarget);
    reset();
  }, [isAnimating, isAutoSearching, reset]);

  return {
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
    setTarget: handleTargetChange,
  };
};
