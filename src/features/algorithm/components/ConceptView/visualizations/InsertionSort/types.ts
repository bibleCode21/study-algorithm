export type AnimationState = {
  type: 'key' | 'comparing' | 'moving' | 'inserting' | 'sorted';
  keyIndex?: number;
  keyValue?: number;
  comparingIndex?: number;
  movingIndex?: number;
  sortedRange?: [number, number];
} | null;

export type Step = {
  i: number;
  j: number;
  keyIndex: number;
  keyValue: number;
} | null;
