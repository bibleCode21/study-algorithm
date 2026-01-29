// 선택 정렬 시각화 타입 정의
export type AnimationState =
  | {
      type: 'comparing';
      stand: number;
      comparingIndex: number;
      lowestIndex: number;
    }
  | {
      type: 'swapping';
      stand: number;
      lowestIndex: number;
    }
  | {
      type: 'sorted';
    }
  | null;

export type Step = {
  stand: number;
  comparingIndex: number;
  lowestIndex: number;
} | null;
