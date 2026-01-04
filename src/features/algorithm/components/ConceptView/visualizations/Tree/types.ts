export interface TreeNode {
  value: number;
  id: string;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface TreeVisualizationProps {
  [key: string]: unknown;
}

export type TraversalType = 'pre-order' | 'in-order' | 'post-order' | 'level-order';
