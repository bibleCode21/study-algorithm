import { Exercise } from '@/features/practice/types/exercise';

export const treeExercises: Exercise[] = [
  {
    id: 'tree-max-depth',
    conceptId: 'tree',
    title: '이진 트리의 최대 깊이 구하기',
    difficulty: 'easy',
    description: '이진 트리의 루트 노드가 주어졌을 때, 트리의 최대 깊이를 구하는 함수를 작성하세요. 트리의 깊이는 루트 노드에서 가장 먼 리프 노드까지의 경로에 있는 노드의 개수입니다.',
    examples: [
      {
        input: '[3, 9, 20, null, null, 15, 7]',
        output: '3',
        explanation: '트리의 깊이는 3입니다 (3 -> 20 -> 15 또는 3 -> 20 -> 7).',
      },
      {
        input: '[1, null, 2]',
        output: '2',
        explanation: '트리의 깊이는 2입니다 (1 -> 2).',
      },
    ],
    constraints: [
      '트리의 노드 개수는 0 이상 10^4 이하입니다.',
      '-100 <= Node.val <= 100',
    ],
    testCases: [
      {
        input: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } },
        expectedOutput: 3,
      },
      {
        input: { val: 1, left: null, right: { val: 2, left: null, right: null } },
        expectedOutput: 2,
      },
      {
        input: { val: 1, left: null, right: null },
        expectedOutput: 1,
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: null }, right: null },
        expectedOutput: 3,
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } } },
        expectedOutput: 3,
      },
    ],
    solution: {
      code: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number => {
  if (root === null) {
    return 0;
  }
  
  const leftDepth = solution(root.left);
  const rightDepth = solution(root.right);
  
  return Math.max(leftDepth, rightDepth) + 1;
};`,
      language: 'typescript',
      explanation: '재귀적으로 왼쪽 서브트리와 오른쪽 서브트리의 최대 깊이를 구한 후, 더 큰 값에 1을 더하여 현재 노드의 깊이를 계산합니다.',
    },
    hints: [
      '재귀 함수를 사용하여 각 서브트리의 깊이를 계산합니다.',
      'null 노드의 깊이는 0입니다.',
      '현재 노드의 깊이는 왼쪽과 오른쪽 서브트리 중 더 깊은 것에 1을 더한 값입니다.',
    ],
    tags: ['트리', '이진 트리', '재귀', 'DFS'],
    templateCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number => {
  // 여기에 코드를 작성하세요
  return 0;
};`,
  },
  {
    id: 'tree-node-count',
    conceptId: 'tree',
    title: '이진 트리 노드 개수 구하기',
    difficulty: 'easy',
    description: '이진 트리의 루트 노드가 주어졌을 때, 트리에 포함된 모든 노드의 개수를 구하는 함수를 작성하세요.',
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        output: '5',
        explanation: '트리에 5개의 노드가 있습니다.',
      },
      {
        input: '[1]',
        output: '1',
        explanation: '트리에 1개의 노드만 있습니다.',
      },
    ],
    constraints: [
      '트리의 노드 개수는 0 이상 10^4 이하입니다.',
      '-100 <= Node.val <= 100',
    ],
    testCases: [
      {
        input: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } },
        expectedOutput: 3,
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: null } },
        expectedOutput: 5,
      },
      {
        input: { val: 1, left: null, right: null },
        expectedOutput: 1,
      },
      {
        input: { val: 1, left: { val: 2, left: null, right: null }, right: null },
        expectedOutput: 2,
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } } },
        expectedOutput: 7,
      },
    ],
    solution: {
      code: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number => {
  if (root === null) {
    return 0;
  }
  
  return 1 + solution(root.left) + solution(root.right);
};`,
      language: 'typescript',
      explanation: '재귀적으로 왼쪽 서브트리와 오른쪽 서브트리의 노드 개수를 구한 후, 현재 노드(1)를 더하여 전체 노드 개수를 계산합니다.',
    },
    hints: [
      '재귀 함수를 사용하여 각 서브트리의 노드 개수를 계산합니다.',
      'null 노드의 개수는 0입니다.',
      '현재 노드의 개수는 1 + 왼쪽 서브트리 노드 개수 + 오른쪽 서브트리 노드 개수입니다.',
    ],
    tags: ['트리', '이진 트리', '재귀', 'DFS'],
    templateCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number => {
  // 여기에 코드를 작성하세요
  return 0;
};`,
  },
  {
    id: 'tree-preorder-traversal',
    conceptId: 'tree',
    title: '이진 트리 전위 순회',
    difficulty: 'easy',
    description: '이진 트리의 루트 노드가 주어졌을 때, 전위 순회(Pre-order Traversal)를 수행하여 노드의 값을 배열로 반환하는 함수를 작성하세요. 전위 순회는 루트 -> 왼쪽 -> 오른쪽 순서로 방문합니다.',
    examples: [
      {
        input: '[1, 2, 3]',
        output: '[1, 2, 3]',
        explanation: '루트(1) -> 왼쪽(2) -> 오른쪽(3) 순서로 방문합니다.',
      },
      {
        input: '[1, null, 2, 3]',
        output: '[1, 2, 3]',
        explanation: '루트(1) -> 오른쪽(2) -> 왼쪽(3) 순서로 방문합니다.',
      },
    ],
    constraints: [
      '트리의 노드 개수는 0 이상 100 이하입니다.',
      '-100 <= Node.val <= 100',
    ],
    testCases: [
      {
        input: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } },
        expectedOutput: [1, 2, 3],
      },
      {
        input: { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } },
        expectedOutput: [1, 2, 3],
      },
      {
        input: { val: 1, left: null, right: null },
        expectedOutput: [1],
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: null } },
        expectedOutput: [1, 2, 4, 5, 3],
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } } },
        expectedOutput: [1, 2, 4, 5, 3, 6, 7],
      },
    ],
    solution: {
      code: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number[] => {
  const result: number[] = [];
  
  const preorder = (node: TreeNode | null): void => {
    if (node === null) {
      return;
    }
    
    result.push(node.val);
    preorder(node.left);
    preorder(node.right);
  };
  
  preorder(root);
  return result;
};`,
      language: 'typescript',
      explanation: '재귀 함수를 사용하여 루트 노드를 먼저 결과 배열에 추가한 후, 왼쪽 서브트리와 오른쪽 서브트리를 순회합니다.',
    },
    hints: [
      '재귀 함수를 사용하여 트리를 순회합니다.',
      '전위 순회는 루트 -> 왼쪽 -> 오른쪽 순서입니다.',
      '현재 노드의 값을 먼저 결과 배열에 추가한 후, 왼쪽과 오른쪽 서브트리를 재귀적으로 방문합니다.',
    ],
    tags: ['트리', '이진 트리', '재귀', 'DFS', '전위 순회'],
    templateCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number[] => {
  // 여기에 코드를 작성하세요
  return [];
};`,
  },
  {
    id: 'tree-inorder-traversal',
    conceptId: 'tree',
    title: '이진 트리 중위 순회',
    difficulty: 'easy',
    description: '이진 트리의 루트 노드가 주어졌을 때, 중위 순회(In-order Traversal)를 수행하여 노드의 값을 배열로 반환하는 함수를 작성하세요. 중위 순회는 왼쪽 -> 루트 -> 오른쪽 순서로 방문합니다. 이진 탐색 트리의 경우 중위 순회는 정렬된 순서로 값을 반환합니다.',
    examples: [
      {
        input: '[1, 2, 3]',
        output: '[2, 1, 3]',
        explanation: '왼쪽(2) -> 루트(1) -> 오른쪽(3) 순서로 방문합니다.',
      },
      {
        input: '[1, null, 2, 3]',
        output: '[1, 3, 2]',
        explanation: '루트(1) -> 왼쪽(3) -> 오른쪽(2) 순서로 방문합니다.',
      },
    ],
    constraints: [
      '트리의 노드 개수는 0 이상 100 이하입니다.',
      '-100 <= Node.val <= 100',
    ],
    testCases: [
      {
        input: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } },
        expectedOutput: [2, 1, 3],
      },
      {
        input: { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } },
        expectedOutput: [1, 3, 2],
      },
      {
        input: { val: 1, left: null, right: null },
        expectedOutput: [1],
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: null } },
        expectedOutput: [4, 2, 5, 1, 3],
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } } },
        expectedOutput: [4, 2, 5, 1, 6, 3, 7],
      },
    ],
    solution: {
      code: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number[] => {
  const result: number[] = [];
  
  const inorder = (node: TreeNode | null): void => {
    if (node === null) {
      return;
    }
    
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  };
  
  inorder(root);
  return result;
};`,
      language: 'typescript',
      explanation: '재귀 함수를 사용하여 왼쪽 서브트리를 먼저 순회한 후, 현재 노드의 값을 결과 배열에 추가하고, 오른쪽 서브트리를 순회합니다.',
    },
    hints: [
      '재귀 함수를 사용하여 트리를 순회합니다.',
      '중위 순회는 왼쪽 -> 루트 -> 오른쪽 순서입니다.',
      '왼쪽 서브트리를 먼저 재귀적으로 방문한 후, 현재 노드의 값을 결과 배열에 추가하고, 오른쪽 서브트리를 방문합니다.',
    ],
    tags: ['트리', '이진 트리', '재귀', 'DFS', '중위 순회'],
    templateCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number[] => {
  // 여기에 코드를 작성하세요
  return [];
};`,
  },
  {
    id: 'tree-level-order-traversal',
    conceptId: 'tree',
    title: '이진 트리 레벨 순회',
    difficulty: 'medium',
    description: '이진 트리의 루트 노드가 주어졌을 때, 레벨 순회(Level-order Traversal, BFS)를 수행하여 각 레벨의 노드 값을 배열로 반환하는 함수를 작성하세요. 레벨 순회는 위에서 아래로, 왼쪽에서 오른쪽으로 각 레벨을 순서대로 방문합니다.',
    examples: [
      {
        input: '[3, 9, 20, null, null, 15, 7]',
        output: '[3, 9, 20, 15, 7]',
        explanation: '레벨 0: [3], 레벨 1: [9, 20], 레벨 2: [15, 7]',
      },
      {
        input: '[1]',
        output: '[1]',
        explanation: '레벨 0: [1]',
      },
    ],
    constraints: [
      '트리의 노드 개수는 0 이상 2000 이하입니다.',
      '-1000 <= Node.val <= 1000',
    ],
    testCases: [
      {
        input: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } },
        expectedOutput: [3, 9, 20, 15, 7],
      },
      {
        input: { val: 1, left: null, right: null },
        expectedOutput: [1],
      },
      {
        input: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } },
        expectedOutput: [1, 2, 3],
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: null }, right: { val: 3, left: null, right: { val: 5, left: null, right: null } } },
        expectedOutput: [1, 2, 3, 4, 5],
      },
      {
        input: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } } },
        expectedOutput: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
    solution: {
      code: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number[] => {
  if (root === null) {
    return [];
  }
  
  const result: number[] = [];
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.val);
    
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }
  
  return result;
};`,
      language: 'typescript',
      explanation: '큐를 사용하여 BFS 방식으로 트리를 순회합니다. 루트 노드를 큐에 넣고, 큐에서 노드를 꺼내 값을 결과 배열에 추가한 후, 자식 노드들을 큐에 추가하는 과정을 반복합니다.',
    },
    hints: [
      '큐(Queue) 자료구조를 사용하여 BFS를 구현합니다.',
      '루트 노드를 큐에 넣고 시작합니다.',
      '큐에서 노드를 꺼내 값을 결과 배열에 추가한 후, 왼쪽과 오른쪽 자식 노드가 있으면 큐에 추가합니다.',
      '큐가 빌 때까지 반복합니다.',
    ],
    tags: ['트리', '이진 트리', 'BFS', '레벨 순회', '큐'],
    templateCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): number[] => {
  // 여기에 코드를 작성하세요
  return [];
};`,
  },
  {
    id: 'tree-symmetric',
    conceptId: 'tree',
    title: '대칭 이진 트리 확인',
    difficulty: 'medium',
    description: '이진 트리의 루트 노드가 주어졌을 때, 트리가 대칭인지 확인하는 함수를 작성하세요. 트리가 대칭이라는 것은 루트 노드를 중심으로 왼쪽과 오른쪽이 거울상처럼 대칭이라는 의미입니다.',
    examples: [
      {
        input: '[1, 2, 2, 3, 4, 4, 3]',
        output: 'true',
        explanation: '트리가 대칭입니다. 왼쪽과 오른쪽이 거울상처럼 대칭입니다.',
      },
      {
        input: '[1, 2, 2, null, 3, null, 3]',
        output: 'false',
        explanation: '트리가 대칭이 아닙니다.',
      },
    ],
    constraints: [
      '트리의 노드 개수는 1 이상 1000 이하입니다.',
      '-100 <= Node.val <= 100',
    ],
    testCases: [
      {
        input: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: null } }, right: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 3, left: null, right: null } } },
        expectedOutput: true,
      },
      {
        input: { val: 1, left: { val: 2, left: null, right: { val: 3, left: null, right: null } }, right: { val: 2, left: null, right: { val: 3, left: null, right: null } } },
        expectedOutput: false,
      },
      {
        input: { val: 1, left: null, right: null },
        expectedOutput: true,
      },
      {
        input: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 2, left: null, right: null } },
        expectedOutput: true,
      },
      {
        input: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } },
        expectedOutput: false,
      },
    ],
    solution: {
      code: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): boolean => {
  if (root === null) {
    return true;
  }
  
  const isMirror = (left: TreeNode | null, right: TreeNode | null): boolean => {
    if (left === null && right === null) {
      return true;
    }
    
    if (left === null || right === null) {
      return false;
    }
    
    return left.val === right.val &&
           isMirror(left.left, right.right) &&
           isMirror(left.right, right.left);
  };
  
  return isMirror(root.left, root.right);
};`,
      language: 'typescript',
      explanation: '재귀 함수를 사용하여 왼쪽 서브트리와 오른쪽 서브트리가 거울상인지 확인합니다. 왼쪽의 왼쪽과 오른쪽의 오른쪽, 왼쪽의 오른쪽과 오른쪽의 왼쪽을 재귀적으로 비교합니다.',
    },
    hints: [
      '재귀 함수를 사용하여 왼쪽과 오른쪽 서브트리를 비교합니다.',
      '기저 케이스: 비교하는 두 서브트리가 모두 비어있으면(null이면) 대칭입니다.',
      '한쪽 서브트리만 비어있으면 대칭이 아닙니다.',
      '두 노드의 값이 같고, 왼쪽의 왼쪽과 오른쪽의 오른쪽, 왼쪽의 오른쪽과 오른쪽의 왼쪽이 각각 대칭이어야 합니다.',
    ],
    tags: ['트리', '이진 트리', '재귀', 'DFS', '대칭'],
    templateCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const solution = (root: TreeNode | null): boolean => {
  // 여기에 코드를 작성하세요
  return false;
};`,
  },
];
