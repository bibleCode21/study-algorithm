/**
 * 두 요소를 비교하고 필요시 교환
 */
export const performComparison = (
  array: number[],
  i: number,
  j: number
): { newArray: number[]; swapped: boolean } => {
  const newArray = [...array];
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
export const isArraySorted = (array: number[]): boolean => {
  return array.every((value, index) => index === 0 || array[index - 1] <= value);
};
