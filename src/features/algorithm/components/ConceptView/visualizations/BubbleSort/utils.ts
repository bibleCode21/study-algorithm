/**
 * 두 요소를 비교하고 필요시 교환
 */
export const performComparison = (
  arr: number[],
  i: number,
  j: number
): { newArray: number[]; swapped: boolean } => {
  const newArray = [...arr];
  let swapped = false;

  if (newArray[j] > newArray[j + 1]) {
    // 교환
    [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
    swapped = true;
  }

  return { newArray, swapped };
};

/**
 * 배열이 정렬되었는지 확인
 */
export const isArraySorted = (arr: number[]): boolean => {
  return arr.every((val, idx) => idx === 0 || arr[idx - 1] <= val);
};
