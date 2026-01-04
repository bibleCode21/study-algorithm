import { TreeNode } from './types';

/**
 * 이진 탐색 트리에 노드 삽입
 */
export const insertNode = (root: TreeNode | null, value: number, nextId: number): { root: TreeNode; newNodeId: string } => {
  if (root === null) {
    const newNode: TreeNode = {
      value,
      id: `node-${nextId}`,
      left: null,
      right: null,
    };
    return { root: newNode, newNodeId: newNode.id };
  }

  if (value < root.value) {
    const { root: leftRoot, newNodeId } = insertNode(root.left, value, nextId);
    return {
      root: {
        ...root,
        left: leftRoot,
      },
      newNodeId,
    };
  } else if (value > root.value) {
    const { root: rightRoot, newNodeId } = insertNode(root.right, value, nextId);
    return {
      root: {
        ...root,
        right: rightRoot,
      },
      newNodeId,
    };
  } else {
    // 같은 값이 이미 존재하는 경우
    return { root, newNodeId: root.id };
  }
};

/**
 * 이진 탐색 트리에서 노드 검색
 */
export const searchNode = (root: TreeNode | null, value: number): TreeNode | null => {
  if (root === null) {
    return null;
  }

  if (value === root.value) {
    return root;
  } else if (value < root.value) {
    return searchNode(root.left, value);
  } else {
    return searchNode(root.right, value);
  }
};

/**
 * 이진 탐색 트리에서 최소값 노드 찾기
 */
export const findMinNode = (root: TreeNode): TreeNode => {
  let current = root;
  while (current.left !== null) {
    current = current.left;
  }
  return current;
};

/**
 * 이진 탐색 트리에서 노드 삭제
 */
export const deleteNode = (root: TreeNode | null, value: number): TreeNode | null => {
  if (root === null) {
    return null;
  }

  if (value < root.value) {
    root.left = deleteNode(root.left, value);
    return root;
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value);
    return root;
  } else {
    // 삭제할 노드를 찾은 경우
    // Case 1: 자식이 없는 경우 (Leaf Node)
    if (root.left === null && root.right === null) {
      return null;
    }

    // Case 2: 자식이 하나인 경우
    if (root.left === null) {
      return root.right;
    }
    if (root.right === null) {
      return root.left;
    }

    // Case 3: 자식이 두 개인 경우
    // 오른쪽 서브트리의 최소값을 찾아서 대체
    const minNode = findMinNode(root.right);
    root.value = minNode.value;
    root.right = deleteNode(root.right, minNode.value);
    return root;
  }
};

/**
 * 전위 순회 (Pre-order): 루트 -> 왼쪽 -> 오른쪽
 */
export const preOrderTraversal = (root: TreeNode | null, result: TreeNode[] = []): TreeNode[] => {
  if (root !== null) {
    result.push(root);
    preOrderTraversal(root.left, result);
    preOrderTraversal(root.right, result);
  }
  return result;
};

/**
 * 중위 순회 (In-order): 왼쪽 -> 루트 -> 오른쪽
 */
export const inOrderTraversal = (root: TreeNode | null, result: TreeNode[] = []): TreeNode[] => {
  if (root !== null) {
    inOrderTraversal(root.left, result);
    result.push(root);
    inOrderTraversal(root.right, result);
  }
  return result;
};

/**
 * 후위 순회 (Post-order): 왼쪽 -> 오른쪽 -> 루트
 */
export const postOrderTraversal = (root: TreeNode | null, result: TreeNode[] = []): TreeNode[] => {
  if (root !== null) {
    postOrderTraversal(root.left, result);
    postOrderTraversal(root.right, result);
    result.push(root);
  }
  return result;
};

/**
 * 레벨 순회 (Level-order, BFS)
 */
export const levelOrderTraversal = (root: TreeNode | null): TreeNode[] => {
  if (root === null) {
    return [];
  }

  const result: TreeNode[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  return result;
};

/**
 * 트리 높이 계산
 */
export const getTreeHeight = (root: TreeNode | null): number => {
  if (root === null) {
    return -1;
  }
  return 1 + Math.max(getTreeHeight(root.left), getTreeHeight(root.right));
};

/**
 * 트리 레벨별로 노드를 그룹화
 */
export const getNodesByLevel = (root: TreeNode | null): (TreeNode | null)[][] => {
  if (!root) return [];

  const levels: (TreeNode | null)[][] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: (TreeNode | null)[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift() || null;
      currentLevel.push(node);

      if (node) {
        queue.push(node.left);
        queue.push(node.right);
      } else {
        queue.push(null, null);
      }
    }

    // 레벨에 실제 노드가 하나라도 있으면 추가
    if (currentLevel.some((n) => n !== null)) {
      levels.push(currentLevel);
    } else {
      break;
    }
  }

  return levels;
};

/**
 * 노드의 위치 정보 계산 (시각화용)
 */
export interface NodePosition {
  node: TreeNode;
  x: number;
  y: number;
  level: number;
  indexInLevel: number;
  parentId: string | null;
}

/**
 * 서브트리의 너비 계산 (노드 개수 기준, 깊이 고려)
 */
const getSubtreeWidth = (node: TreeNode | null, level: number, maxDepth: number, horizontalSpacing: number): number => {
  if (!node) return 0;
  
  // 깊이를 고려하여 레벨이 깊어질수록 너비 증가
  const depthFactor = 1 + (level / maxDepth) * 0.5;
  const adjustedSpacing = horizontalSpacing * depthFactor;
  
  const leftWidth = getSubtreeWidth(node.left, level + 1, maxDepth, horizontalSpacing);
  const rightWidth = getSubtreeWidth(node.right, level + 1, maxDepth, horizontalSpacing);
  
  // 왼쪽 서브트리 + 현재 노드 공간 + 오른쪽 서브트리
  // 최소 너비는 adjustedSpacing
  return Math.max(adjustedSpacing, leftWidth + adjustedSpacing + rightWidth);
};

/**
 * 트리의 모든 노드에 위치 정보 할당 (재귀적 방식, 서브트리 독립 배치)
 */
export const calculateNodePositions = (root: TreeNode | null, nodeSize: number = 48, levelHeight: number = 100, horizontalSpacing: number = 70): NodePosition[] => {
  if (!root) return [];

  const positions: NodePosition[] = [];
  const positionMap = new Map<string, NodePosition>();
  const levels = getNodesByLevel(root);
  const maxDepth = levels.length;

  /**
   * 재귀적으로 노드 위치 계산 (서브트리 독립 배치)
   * @param node 현재 노드
   * @param level 현재 레벨
   * @param x 현재 x 좌표 (서브트리의 시작 위치)
   * @param parentId 부모 노드 ID
   * @returns 다음 노드가 시작할 x 좌표
   */
  const calculatePosition = (node: TreeNode | null, level: number, x: number, parentId: string | null): number => {
    if (!node) return x;

    // y 좌표는 노드의 중심을 나타냄
    // level * levelHeight: 각 레벨의 기본 위치
    // nodeSize / 2: 노드의 반지름 (중심에서 상단까지의 거리)
    // 50: 상단 여백 (충분한 여백 확보)
    const y = level * levelHeight + nodeSize / 2 + 50;

    // 왼쪽 서브트리 너비 계산
    const leftWidth = getSubtreeWidth(node.left, level + 1, maxDepth, horizontalSpacing);
    
    // 현재 노드의 x 좌표 = 시작 위치 + 왼쪽 서브트리 너비 + 간격
    const nodeX = x + leftWidth + horizontalSpacing;

    const position: NodePosition = {
      node,
      x: nodeX,
      y,
      level,
      indexInLevel: 0, // 나중에 업데이트
      parentId,
    };

    positions.push(position);
    positionMap.set(node.id, position);

    // 왼쪽 자식 위치 계산 (왼쪽 서브트리 영역)
    let currentX = x;
    if (node.left) {
      currentX = calculatePosition(node.left, level + 1, currentX, node.id);
    }

    // 오른쪽 자식 위치 계산 (현재 노드 오른쪽부터 시작)
    if (node.right) {
      // 오른쪽 서브트리 너비 계산
      const rightWidth = getSubtreeWidth(node.right, level + 1, maxDepth, horizontalSpacing);
      // 오른쪽 자식의 시작 위치 = 현재 노드 위치 + 간격
      currentX = calculatePosition(node.right, level + 1, nodeX + horizontalSpacing, node.id);
    }

    // 현재 서브트리의 총 너비 반환
    const rightWidth = getSubtreeWidth(node.right, level + 1, maxDepth, horizontalSpacing);
    return nodeX + horizontalSpacing + rightWidth;
  };

  // 루트 노드부터 시작 (x = 0에서 시작)
  calculatePosition(root, 0, 0, null);

  // 각 레벨별로 indexInLevel 업데이트
  const actualLevels = levels.map((level) => level.filter((node) => node !== null) as TreeNode[]);
  actualLevels.forEach((level, levelIndex) => {
    level.forEach((node, nodeIndex) => {
      if (node) {
        const pos = positionMap.get(node.id);
        if (pos) {
          pos.indexInLevel = nodeIndex;
        }
      }
    });
  });

  // 모든 노드의 최소 x 좌표 찾기
  const minX = Math.min(...positions.map((p) => p.x));
  
  // 최소 x가 0보다 작으면 모든 노드를 오른쪽으로 이동
  if (minX < 0) {
    const offset = -minX + horizontalSpacing / 2; // 여유 공간 추가
    positions.forEach((pos) => {
      pos.x += offset;
    });
  } else {
    // 최소 x가 0 이상이면 여유 공간만 추가
    const offset = horizontalSpacing / 2;
    positions.forEach((pos) => {
      pos.x += offset;
    });
  }

  return positions;
};
