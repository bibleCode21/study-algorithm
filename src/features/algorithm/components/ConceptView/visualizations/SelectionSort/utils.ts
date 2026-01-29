/**
 * 배열이 정렬되었는지 확인
 */
export const isArraySorted = (array: number[]): boolean => {
  return array.every((value, index) => index === 0 || array[index - 1] <= value);
};
