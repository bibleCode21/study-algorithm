export type HeapType = 'max' | 'min';

export interface HeapVisualizationProps {
  [key: string]: unknown;
}

export interface HeapNode {
  value: number;
  index: number;
}
