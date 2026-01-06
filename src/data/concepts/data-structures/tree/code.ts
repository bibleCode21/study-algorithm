import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 노드 클래스 만들기
class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// 사용 예제
const node = new Node<number>(1);
console.log(node.value); // 1`,
  },
  {
    language: 'typescript',
    code: `// 이진 탐색 트리에 데이터 넣기
// 이진 탐색 트리 조건에 부합하게 데이터를 넣어야 함
class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class NodeMgmt<T> {
  head: Node<T>;

  constructor(head: Node<T>) {
    this.head = head;
  }

  // 값 삽입
  insert(value: T): void {
    let currentNode: Node<T> = this.head;
    
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = new Node(value);
          break;
        }
      } else {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = new Node(value);
          break;
        }
      }
    }
  }
}

// 사용 예제
const head = new Node<number>(1);
const bst = new NodeMgmt(head);
bst.insert(2);
bst.insert(3);
bst.insert(0);`,
  },
  {
    language: 'typescript',
    code: `// 이진 탐색 트리 탐색
class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class NodeMgmt<T> {
  head: Node<T>;

  constructor(head: Node<T>) {
    this.head = head;
  }

  insert(value: T): void {
    let currentNode: Node<T> = this.head;
    
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = new Node(value);
          break;
        }
      } else {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = new Node(value);
          break;
        }
      }
    }
  }

  // 값 검색
  search(value: T): boolean {
    let currentNode: Node<T> | null = this.head;
    
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    
    return false;
  }
}

// 사용 예제
const head = new Node<number>(1);
const bst = new NodeMgmt(head);
bst.insert(2);
bst.insert(3);
bst.insert(0);
bst.insert(4);
bst.insert(8);

const found = bst.search(4); // true
const notFound = bst.search(-1); // false`,
  },
  {
    language: 'typescript',
    code: `// 이진 탐색 트리 삭제 - Case 1: Leaf Node 삭제
// Leaf Node: Child Node가 없는 Node
// 삭제할 Node의 Parent Node가 삭제할 Node를 가리키지 않도록 함
class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class NodeMgmt<T> {
  head: Node<T>;
  private currentNode: Node<T> | null = null;
  private parent: Node<T> | null = null;

  constructor(head: Node<T>) {
    this.head = head;
  }

  insert(value: T): void {
    let currentNode: Node<T> = this.head;
    
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = new Node(value);
          break;
        }
      } else {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = new Node(value);
          break;
        }
      }
    }
  }

  search(value: T): boolean {
    let currentNode: Node<T> | null = this.head;
    
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    
    return false;
  }

  // 삭제할 노드 탐색
  private findNode(value: T): boolean {
    let searched = false;
    this.currentNode = this.head;
    this.parent = this.head;
    
    while (this.currentNode !== null) {
      if (this.currentNode.value === value) {
        searched = true;
        break;
      } else if (value < this.currentNode.value) {
        this.parent = this.currentNode;
        this.currentNode = this.currentNode.left;
      } else {
        this.parent = this.currentNode;
        this.currentNode = this.currentNode.right;
      }
    }
    
    return searched;
  }

  // Case 1: Leaf Node 삭제
  delete(value: T): boolean {
    const searched = this.findNode(value);
    
    if (!searched) {
      return false;
    }

    // Case 1: Leaf Node 삭제
    if (this.currentNode!.left === null && this.currentNode!.right === null) {
      if (value < this.parent!.value) {
        this.parent!.left = null;
      } else {
        this.parent!.right = null;
      }
      return true;
    }

    return false;
  }
}

// 사용 예제
const head = new Node<number>(5);
const bst = new NodeMgmt(head);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);

bst.delete(2); // Leaf Node 삭제
const found = bst.search(2); // false`,
  },
  {
    language: 'typescript',
    code: `// 이진 탐색 트리 삭제 - Case 2: Child Node가 하나인 Node 삭제
// 삭제할 Node의 Parent Node가 삭제할 Node의 Child Node를 가리키도록 함
class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class NodeMgmt<T> {
  head: Node<T>;
  private currentNode: Node<T> | null = null;
  private parent: Node<T> | null = null;

  constructor(head: Node<T>) {
    this.head = head;
  }

  insert(value: T): void {
    let currentNode: Node<T> = this.head;
    
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = new Node(value);
          break;
        }
      } else {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = new Node(value);
          break;
        }
      }
    }
  }

  search(value: T): boolean {
    let currentNode: Node<T> | null = this.head;
    
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    
    return false;
  }

  private findNode(value: T): boolean {
    let searched = false;
    this.currentNode = this.head;
    this.parent = this.head;
    
    while (this.currentNode !== null) {
      if (this.currentNode.value === value) {
        searched = true;
        break;
      } else if (value < this.currentNode.value) {
        this.parent = this.currentNode;
        this.currentNode = this.currentNode.left;
      } else {
        this.parent = this.currentNode;
        this.currentNode = this.currentNode.right;
      }
    }
    
    return searched;
  }

  // Case 2: Child Node가 하나인 Node 삭제
  delete(value: T): boolean {
    const searched = this.findNode(value);
    
    if (!searched) {
      return false;
    }

    // Case 1: Leaf Node 삭제
    if (this.currentNode!.left === null && this.currentNode!.right === null) {
      if (value < this.parent!.value) {
        this.parent!.left = null;
      } else {
        this.parent!.right = null;
      }
      return true;
    }

    // Case 2: Child Node가 하나인 Node 삭제
    if (this.currentNode!.left !== null && this.currentNode!.right === null) {
      if (value < this.parent!.value) {
        this.parent!.left = this.currentNode!.left;
      } else {
        this.parent!.right = this.currentNode!.left;
      }
    } else if (this.currentNode!.left === null && this.currentNode!.right !== null) {
      if (value < this.parent!.value) {
        this.parent!.left = this.currentNode!.right;
      } else {
        this.parent!.right = this.currentNode!.right;
      }
    }

    return true;
  }
}

// 사용 예제
const head = new Node<number>(5);
const bst = new NodeMgmt(head);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);

bst.delete(3); // Child Node가 하나인 Node 삭제
const found = bst.search(3); // false`,
  },
  {
    language: 'typescript',
    code: `// 이진 탐색 트리 삭제 - Case 3: Child Node가 두 개인 Node 삭제
// 삭제할 Node의 오른쪽 자식 중, 가장 작은 값을 삭제할 Node의 Parent Node가 가리키도록 함
class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class NodeMgmt<T> {
  head: Node<T>;
  private currentNode: Node<T> | null = null;
  private parent: Node<T> | null = null;

  constructor(head: Node<T>) {
    this.head = head;
  }

  insert(value: T): void {
    let currentNode: Node<T> = this.head;
    
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = new Node(value);
          break;
        }
      } else {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = new Node(value);
          break;
        }
      }
    }
  }

  search(value: T): boolean {
    let currentNode: Node<T> | null = this.head;
    
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    
    return false;
  }

  private findNode(value: T): boolean {
    let searched = false;
    this.currentNode = this.head;
    this.parent = this.head;
    
    while (this.currentNode !== null) {
      if (this.currentNode.value === value) {
        searched = true;
        break;
      } else if (value < this.currentNode.value) {
        this.parent = this.currentNode;
        this.currentNode = this.currentNode.left;
      } else {
        this.parent = this.currentNode;
        this.currentNode = this.currentNode.right;
      }
    }
    
    return searched;
  }

  delete(value: T): boolean {
    const searched = this.findNode(value);
    
    if (!searched) {
      return false;
    }

    // Case 1: Leaf Node 삭제
    if (this.currentNode!.left === null && this.currentNode!.right === null) {
      if (value < this.parent!.value) {
        this.parent!.left = null;
      } else {
        this.parent!.right = null;
      }
      return true;
    }

    // Case 2: Child Node가 하나인 Node 삭제
    if (this.currentNode!.left !== null && this.currentNode!.right === null) {
      if (value < this.parent!.value) {
        this.parent!.left = this.currentNode!.left;
      } else {
        this.parent!.right = this.currentNode!.left;
      }
      return true;
    } else if (this.currentNode!.left === null && this.currentNode!.right !== null) {
      if (value < this.parent!.value) {
        this.parent!.left = this.currentNode!.right;
      } else {
        this.parent!.right = this.currentNode!.right;
      }
      return true;
    }

    // Case 3: Child Node가 두 개인 Node 삭제
    if (this.currentNode!.left !== null && this.currentNode!.right !== null) {
      // Case 3-1: 삭제할 Node가 Parent Node 왼쪽에 있을 때
      if (value < this.parent!.value) {
        let changeNode = this.currentNode!.right;
        let changeNodeParent = this.currentNode!.right;
        
        while (changeNode.left !== null) {
          changeNodeParent = changeNode;
          changeNode = changeNode.left;
        }
        
        if (changeNode.right !== null) {
          changeNodeParent.left = changeNode.right;
        } else {
          changeNodeParent.left = null;
        }
        
        this.parent!.left = changeNode;
        changeNode.right = this.currentNode!.right;
        changeNode.left = this.currentNode!.left;
      } 
      // Case 3-2: 삭제할 Node가 Parent Node 오른쪽에 있을 때
      else {
        let changeNode = this.currentNode!.right;
        let changeNodeParent = this.currentNode!.right;
        
        while (changeNode.left !== null) {
          changeNodeParent = changeNode;
          changeNode = changeNode.left;
        }
        
        if (changeNode.right !== null) {
          changeNodeParent.left = changeNode.right;
        } else {
          changeNodeParent.left = null;
        }
        
        this.parent!.right = changeNode;
        changeNode.left = this.currentNode!.left;
        changeNode.right = this.currentNode!.right;
      }
    }

    return true;
  }
}

// 사용 예제
const head = new Node<number>(5);
const bst = new NodeMgmt(head);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
bst.insert(6);
bst.insert(8);

bst.delete(5); // Child Node가 두 개인 Node 삭제
const found = bst.search(5); // false`,
  },
  {
    language: 'typescript',
    code: `// 깔끔하게 정리된 이진 탐색 트리 (BST) 구현
class Node<T> {
  value: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class BinarySearchTree<T> {
  private root: Node<T> | null = null;

  constructor(value?: T) {
    if (value !== undefined) {
      this.root = new Node(value);
    }
  }

  // 값 삽입
  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: Node<T> | null, value: T): Node<T> {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  // 값 검색
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: Node<T> | null, value: T): boolean {
    if (node === null) {
      return false;
    }
    
    if (node.value === value) {
      return true;
    }
    
    if (value < node.value) {
      return this.searchNode(node.left, value);
    }
    
    return this.searchNode(node.right, value);
  }

  // 최소값 찾기
  findMin(): T | null {
    if (this.root === null) {
      return null;
    }
    
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    
    return current.value;
  }

  // 최대값 찾기
  findMax(): T | null {
    if (this.root === null) {
      return null;
    }
    
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    
    return current.value;
  }

  // 값 삭제
  delete(value: T): boolean {
    const existed = this.search(value);
    this.root = this.deleteNode(this.root, value);
    return existed;
  }

  private deleteNode(node: Node<T> | null, value: T): Node<T> | null {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // 삭제할 노드를 찾은 경우
      if (node.left === null) {
        return node.right;
      }
      
      if (node.right === null) {
        return node.left;
      }

      // 두 자식이 모두 있는 경우: 오른쪽 서브트리의 최소값으로 대체
      const minValue = this.findMinNode(node.right).value;
      node.value = minValue;
      node.right = this.deleteNode(node.right, minValue);
    }

    return node;
  }

  private findMinNode(node: Node<T>): Node<T> {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // 전위 순회 (Pre-order): 루트 -> 왼쪽 -> 오른쪽
  preOrderTraversal(node: Node<T> | null = this.root, result: T[] = []): T[] {
    if (node !== null) {
      result.push(node.value);
      this.preOrderTraversal(node.left, result);
      this.preOrderTraversal(node.right, result);
    }
    return result;
  }

  // 중위 순회 (In-order): 왼쪽 -> 루트 -> 오른쪽 (정렬된 순서)
  inOrderTraversal(node: Node<T> | null = this.root, result: T[] = []): T[] {
    if (node !== null) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }

  // 후위 순회 (Post-order): 왼쪽 -> 오른쪽 -> 루트
  postOrderTraversal(node: Node<T> | null = this.root, result: T[] = []): T[] {
    if (node !== null) {
      this.postOrderTraversal(node.left, result);
      this.postOrderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // 레벨 순회 (Level-order, BFS)
  levelOrderTraversal(): T[] {
    if (this.root === null) {
      return [];
    }

    const result: T[] = [];
    const queue: Node<T>[] = [this.root];

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.value);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result;
  }
}

// 사용 예제
const bst = new BinarySearchTree<number>(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
bst.insert(6);
bst.insert(8);

const found = bst.search(4); // true
const min = bst.findMin(); // 2
const max = bst.findMax(); // 8

bst.delete(5);
const deleted = bst.search(5); // false

const preOrder = bst.preOrderTraversal(); // [6, 3, 2, 4, 7, 8]
const inOrder = bst.inOrderTraversal(); // [2, 3, 4, 6, 7, 8] (정렬된 순서)
const postOrder = bst.postOrderTraversal(); // [2, 4, 3, 8, 7, 6]
const levelOrder = bst.levelOrderTraversal(); // [6, 3, 7, 2, 4, 8]`,
  },
  {
    language: 'typescript',
    code: `// 이진 트리 순회 구현
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

// 사용 예제
const tree = new BinaryTree<number>(1);
tree.root!.left = new TreeNode(2);
tree.root!.right = new TreeNode(3);
tree.root!.left.left = new TreeNode(4);
tree.root!.left.right = new TreeNode(5);

const preOrder = tree.preOrderTraversal(tree.root); // [1, 2, 4, 5, 3]
const inOrder = tree.inOrderTraversal(tree.root); // [4, 2, 5, 1, 3]
const postOrder = tree.postOrderTraversal(tree.root); // [4, 5, 2, 3, 1]
const levelOrder = tree.levelOrderTraversal(); // [1, 2, 3, 4, 5]
const treeHeight = tree.height(tree.root); // 2
const treeSize = tree.size(tree.root); // 5`,
  },
];

