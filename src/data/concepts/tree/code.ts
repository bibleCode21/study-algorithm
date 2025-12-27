import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 이진 트리 노드
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// 이진 트리 구현
class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  constructor(value?: T) {
    if (value !== undefined) {
      this.root = new TreeNode(value);
    }
  }

  // 전위 순회 (Pre-order): 루트 -> 왼쪽 -> 오른쪽
  preOrderTraversal(node: TreeNode<T> | null, result: T[] = []): T[] {
    if (node) {
      result.push(node.value);
      this.preOrderTraversal(node.left, result);
      this.preOrderTraversal(node.right, result);
    }
    return result;
  }

  // 중위 순회 (In-order): 왼쪽 -> 루트 -> 오른쪽
  inOrderTraversal(node: TreeNode<T> | null, result: T[] = []): T[] {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }

  // 후위 순회 (Post-order): 왼쪽 -> 오른쪽 -> 루트
  postOrderTraversal(node: TreeNode<T> | null, result: T[] = []): T[] {
    if (node) {
      this.postOrderTraversal(node.left, result);
      this.postOrderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // 레벨 순회 (Level-order, BFS)
  levelOrderTraversal(): T[] {
    if (!this.root) return [];

    const result: T[] = [];
    const queue: TreeNode<T>[] = [this.root];

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.value);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  // 트리 높이 계산
  height(node: TreeNode<T> | null): number {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  // 노드 개수 계산
  size(node: TreeNode<T> | null): number {
    if (!node) return 0;
    return 1 + this.size(node.left) + this.size(node.right);
  }
}

// 이진 탐색 트리 (BST) 구현
class BinarySearchTree<T> {
  root: TreeNode<T> | null = null;

  constructor(value?: T) {
    if (value !== undefined) {
      this.root = new TreeNode(value);
    }
  }

  // 값 삽입 (O(log n) 평균, O(n) 최악)
  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) {
      return new TreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  // 값 검색 (O(log n) 평균, O(n) 최악)
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | null, value: T): boolean {
    if (!node) return false;
    if (node.value === value) return true;
    if (value < node.value) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  // 최소값 찾기
  findMin(node: TreeNode<T> | null = this.root): T | null {
    if (!node) return null;
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }

  // 최대값 찾기
  findMax(node: TreeNode<T> | null = this.root): T | null {
    if (!node) return null;
    while (node.right) {
      node = node.right;
    }
    return node.value;
  }

  // 값 삭제 (O(log n) 평균, O(n) 최악)
  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // 삭제할 노드를 찾은 경우
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // 두 자식이 모두 있는 경우: 오른쪽 서브트리의 최소값으로 대체
      node.value = this.findMin(node.right)!;
      node.right = this.deleteNode(node.right, node.value);
    }

    return node;
  }
}

// 사용 예제
const bst = new BinarySearchTree<number>();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
bst.insert(6);
bst.insert(8);

const found = bst.search(4); // true
const min = bst.findMin(); // 2
const max = bst.findMax(); // 8`,
  },
];

