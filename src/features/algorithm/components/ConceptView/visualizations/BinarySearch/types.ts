export type AnimationState = {
  type: 'comparing' | 'found' | 'not-found';
  left?: number;
  right?: number;
  mid?: number;
} | null;

export type SearchState = {
  left: number;
  right: number;
  mid: number;
  target: number;
  found: boolean | null; // null: 탐색 중, true: 찾음, false: 못 찾음
} | null;
