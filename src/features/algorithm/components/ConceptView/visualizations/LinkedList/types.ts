export interface LinkedListVisualizationProps {
  [key: string]: unknown;
}

export type LinkedListType = 'singly' | 'doubly';

export interface Node {
  id: string;
  data: number;
  next: Node | null;
  prev?: Node | null; // 이중 연결 리스트용
}
