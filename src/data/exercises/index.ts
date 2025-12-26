import { Exercise } from '@/features/practice/types/exercise';
import { arrayExercises } from './array';
import { queueExercises } from './queue';
import { stackExercises } from './stack';
import { bubbleSortExercises } from './bubble-sort';
import { linkedListExercises } from './linked-list';
import { hashTableExercises } from './hash-table';
import { heapExercises } from './heap';

export const exercises: Exercise[] = [
  ...arrayExercises,
  ...queueExercises,
  ...stackExercises,
  ...bubbleSortExercises,
  ...linkedListExercises,
  ...hashTableExercises,
  ...heapExercises,
];

/**
 * 특정 개념 ID에 해당하는 연습 문제들을 가져옵니다.
 */
export const getExercisesByConceptId = (conceptId: string): Exercise[] => {
  return exercises.filter((exercise) => exercise.conceptId === conceptId);
};

/**
 * 특정 연습 문제 ID로 문제를 가져옵니다.
 */
export const getExerciseById = (exerciseId: string): Exercise | undefined => {
  return exercises.find((exercise) => exercise.id === exerciseId);
};

/**
 * 랜덤 연습 문제를 가져옵니다.
 * @param conceptId 선택적. 특정 개념의 문제만 가져올 수 있습니다.
 * @param difficulty 선택적. 특정 난이도의 문제만 가져올 수 있습니다.
 */
export const getRandomExercise = (
  conceptId?: string,
  difficulty?: Exercise['difficulty']
): Exercise | undefined => {
  let filteredExercises = exercises;

  if (conceptId) {
    filteredExercises = filteredExercises.filter((e) => e.conceptId === conceptId);
  }

  if (difficulty) {
    filteredExercises = filteredExercises.filter((e) => e.difficulty === difficulty);
  }

  if (filteredExercises.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * filteredExercises.length);
  return filteredExercises[randomIndex];
};

