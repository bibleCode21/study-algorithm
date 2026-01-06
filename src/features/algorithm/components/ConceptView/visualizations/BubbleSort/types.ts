export type AnimationState = {
  type: 'comparing' | 'swapping' | 'sorted';
  indices: number[];
} | null;

export type Step = {
  pass: number;
  comparison: number;
} | null;
