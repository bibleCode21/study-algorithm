import { useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_ARRAY } from './constants';
import type { AnimationState } from './types';

type GeneratorState = {
  type: 'comparing' | 'swapping' | 'sorted';
  array: number[];
  stand?: number;
  comparingIndex?: number;
  lowestIndex?: number;
};

// Generator 함수: 선택 정렬
const selectionSortGenerator = function* (
  inputArray: number[]
): Generator<GeneratorState, number[], unknown> {
  const array = [...inputArray];
  const n = array.length;

  for (let stand = 0; stand < n - 1; stand++) {
    let lowest = stand;

    for (let index = stand + 1; index < n; index++) {
      yield {
        type: 'comparing',
        array: [...array],
        stand,
        comparingIndex: index,
        lowestIndex: lowest,
      };

      if (array[lowest] > array[index]) {
        lowest = index;
      }
    }

    yield {
      type: 'swapping',
      array: [...array],
      stand,
      lowestIndex: lowest,
    };

    [array[stand], array[lowest]] = [array[lowest], array[stand]];
  }

  yield {
    type: 'sorted',
    array: [...array],
  };

  return array;
};

export const useSelectionSort = () => {
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>(null);
  const [isAutoSorting, setIsAutoSorting] = useState(false);
  const generatorRef = useRef<Generator<GeneratorState, number[], unknown> | null>(null);
  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutRefs.current.clear();
    };
  }, []);

  const stepSort = useCallback(() => {
    if (isAnimating || isAutoSorting) return;

    if (!generatorRef.current) {
      generatorRef.current = selectionSortGenerator([...INITIAL_ARRAY]);
    }

    const result = generatorRef.current.next();

    if (result.done) {
      setAnimationState({ type: 'sorted' });
      generatorRef.current = null;
      return;
    }

    const state = result.value;
    setArray(state.array);

    if (state.type === 'comparing' && state.stand !== undefined && state.comparingIndex !== undefined && state.lowestIndex !== undefined) {
      setAnimationState({
        type: 'comparing',
        stand: state.stand,
        comparingIndex: state.comparingIndex,
        lowestIndex: state.lowestIndex,
      });
    } else if (state.type === 'swapping' && state.stand !== undefined && state.lowestIndex !== undefined) {
      setAnimationState({
        type: 'swapping',
        stand: state.stand,
        lowestIndex: state.lowestIndex,
      });
    } else if (state.type === 'sorted') {
      setAnimationState({ type: 'sorted' });
    }
  }, [isAnimating, isAutoSorting]);

  const autoSort = useCallback(() => {
    if (isAutoSorting) return;

    setIsAutoSorting(true);
    generatorRef.current = selectionSortGenerator([...INITIAL_ARRAY]);

    const processNext = () => {
      if (!generatorRef.current) return;

      const result = generatorRef.current.next();

      if (result.done) {
        setAnimationState({ type: 'sorted' });
        setIsAutoSorting(false);
        generatorRef.current = null;
        return;
      }

      const state = result.value;
      setArray(state.array);

      if (state.type === 'comparing' && state.stand !== undefined && state.comparingIndex !== undefined && state.lowestIndex !== undefined) {
        setAnimationState({
          type: 'comparing',
          stand: state.stand,
          comparingIndex: state.comparingIndex,
          lowestIndex: state.lowestIndex,
        });
      } else if (state.type === 'swapping' && state.stand !== undefined && state.lowestIndex !== undefined) {
        setAnimationState({
          type: 'swapping',
          stand: state.stand,
          lowestIndex: state.lowestIndex,
        });
      } else if (state.type === 'sorted') {
        setAnimationState({ type: 'sorted' });
      }

      const delay = state.type === 'swapping' ? 500 : 300;
      const timeoutId = setTimeout(() => {
        processNext();
        timeoutRefs.current.delete(timeoutId);
      }, delay);
      timeoutRefs.current.add(timeoutId);
    };

    processNext();
  }, [isAutoSorting]);

  const reset = useCallback(() => {
    timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutRefs.current.clear();

    setArray([...INITIAL_ARRAY]);
    setAnimationState(null);
    setIsAnimating(false);
    setIsAutoSorting(false);
    generatorRef.current = null;
  }, []);

  return {
    array,
    animationState,
    isAnimating,
    isAutoSorting,
    stepSort,
    autoSort,
    reset,
  };
};
