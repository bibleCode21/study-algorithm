// 삽입 정렬 시각화 타입 정의
export type AnimationState = {
  type: 'idle' | 'selecting' | 'comparing' | 'shifting' | 'inserting' | 'sorted';
  keyIndex: number;
  keyValue: number;
  comparingIndex?: number;
  shiftingIndex?: number;
} | null;

export type Step = {
  pass: number; // 회전 번호 (1부터 시작)
  i: number; // 현재 정렬할 인덱스
  j: number; // 비교할 인덱스
  keyIndex: number;
  keyValue: number;
} | null;
