/**
 * 배열이 정렬되었는지 확인
 */
export const isArraySorted = (arr: number[]): boolean => {
  return arr.every((val, idx) => idx === 0 || arr[idx - 1] <= val);
};
