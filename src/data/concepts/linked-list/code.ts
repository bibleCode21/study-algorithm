import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// Node 구현
// 링크드 리스트의 기본 단위인 노드 클래스
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

// Node와 Node 연결하기 (포인터 활용)
const node1 = new Node(1);
const node2 = new Node(2);
node1.next = node2;
const head = node1;

// head (node1(1)) -> node2(2) -> null`,
  },
  {
    language: 'typescript',
    code: `// 링크드 리스트로 데이터 추가하기
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

// 전역 head 변수 사용
let head: Node<number> | null = null;

// 링크드 리스트 끝에 데이터 추가
const add = (data: number): void => {
  if (head === null) {
    head = new Node(data);
    return;
  }
  
  let node = head;
  while (node.next !== null) {
    node = node.next;
  }
  node.next = new Node(data);
};

// 사용 예제: 1부터 9까지 추가
head = new Node(0);
for (let index = 1; index < 10; index++) {
  add(index);
}

// 결과: head (0) -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> null`,
  },
  {
    language: 'typescript',
    code: `// 링크드 리스트 데이터 출력하기 (검색하기)
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

// 링크드 리스트를 배열로 변환하여 반환
const getAllData = <T>(head: Node<T> | null): T[] => {
  const result: T[] = [];
  let node = head;
  
  while (node !== null) {
    result.push(node.data);
    node = node.next;
  }
  
  return result;
};

// 사용 예제
let head: Node<number> | null = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);

const allData = getAllData(head); // [1, 2, 3]`,
  },
  {
    language: 'typescript',
    code: `// 링크드 리스트 데이터 사이에 데이터를 추가
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

// 특정 값 앞에 새 노드 삽입
const insertBefore = <T>(head: Node<T> | null, targetData: T, newData: T): Node<T> | null => {
  if (head === null) {
    return new Node(newData);
  }

  // head가 target인 경우
  if (head.data === targetData) {
    const newNode = new Node(newData);
    newNode.next = head;
    return newNode;
  }

  // 중간에 삽입
  let node = head;
  while (node.next !== null) {
    if (node.next.data === targetData) {
      const newNode = new Node(newData);
      newNode.next = node.next;
      node.next = newNode;
      return head;
    }
    node = node.next;
  }

  return head;
};

// 사용 예제: 1과 2 사이에 1.5 삽입
let head: Node<number> | null = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);

head = insertBefore(head, 2, 1.5);
// 결과: head -> 1 -> 1.5 -> 2 -> 3 -> null`,
  },
  {
    language: 'typescript',
    code: `// 파이썬 객체지향 프로그래밍으로 링크드 리스트 구현하기
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: Node<T> | null = null;

  constructor(data: T) {
    this.head = new Node(data);
  }

  // 링크드 리스트 끝에 데이터 추가
  add(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    node.next = new Node(data);
  }

  // 링크드 리스트의 모든 데이터를 배열로 반환
  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }
}

// 사용 예제
const linkedList1 = new NodeMgmt(0);
for (let data = 1; data < 10; data++) {
  linkedList1.add(data);
}

const allData = linkedList1.desc(); 
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`,
  },
  {
    language: 'typescript',
    code: `// 링크드 리스트의 복잡한 기능: 특정 노드 삭제
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: Node<T> | null = null;

  constructor(data: T) {
    this.head = new Node(data);
  }

  add(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    node.next = new Node(data);
  }

  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }

  // 특정 데이터를 가진 노드 삭제
  delete(data: T): boolean {
    if (this.head === null) {
      return false;
    }

    // 경우의 수1: head를 삭제해야 할 경우
    if (this.head.data === data) {
      this.head = this.head.next;
      return true;
    }

    // 경우의 수2: head가 아닌 노드를 삭제해야 할 경우
    let node = this.head;
    while (node.next !== null) {
      if (node.next.data === data) {
        node.next = node.next.next;
        return true;
      }
      node = node.next;
    }

    return false;
  }
}

// 사용 예제
const linkedList1 = new NodeMgmt(0);
for (let data = 1; data < 10; data++) {
  linkedList1.add(data);
}

linkedList1.delete(4); // 4 삭제
const afterDelete = linkedList1.desc(); 
// [0, 1, 2, 3, 5, 6, 7, 8, 9]`,
  },
  {
    language: 'typescript',
    code: `// 특정 숫자인 노드를 찾는 함수
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: Node<T> | null = null;

  constructor(data: T) {
    this.head = new Node(data);
  }

  add(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    node.next = new Node(data);
  }

  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }

  delete(data: T): boolean {
    if (this.head === null) {
      return false;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      return true;
    }

    let node = this.head;
    while (node.next !== null) {
      if (node.next.data === data) {
        node.next = node.next.next;
        return true;
      }
      node = node.next;
    }

    return false;
  }

  // 특정 데이터를 가진 노드 검색
  searchNode(data: T): Node<T> | null {
    let node = this.head;
    
    while (node !== null) {
      if (node.data === data) {
        return node;
      }
      node = node.next;
    }
    
    return null;
  }
}

// 사용 예제
const nodeMgmt = new NodeMgmt(0);
for (let data = 1; data < 10; data++) {
  nodeMgmt.add(data);
}

const node = nodeMgmt.searchNode(4);
const foundData = node?.data; // 4`,
  },
  {
    language: 'typescript',
    code: `// 더블 링크드 리스트 (Doubly Linked List) 기본 구조
// 이중 연결 리스트: 양방향으로 연결되어 있어서 노드 탐색이 양쪽으로 모두 가능

class Node<T> {
  prev: Node<T> | null = null;
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, prev: Node<T> | null = null, next: Node<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data: T) {
    this.head = new Node(data);
    this.tail = this.head;
  }

  // 링크드 리스트 끝에 데이터 추가
  insert(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const newNode = new Node(data);
    node.next = newNode;
    newNode.prev = node;
    this.tail = newNode;
  }

  // 링크드 리스트의 모든 데이터를 배열로 반환
  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }
}

// 사용 예제
const doubleLinkedList = new NodeMgmt(0);
for (let data = 1; data < 10; data++) {
  doubleLinkedList.insert(data);
}

const allData = doubleLinkedList.desc(); 
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`,
  },
  {
    language: 'typescript',
    code: `// 더블 링크드 리스트: head에서부터 검색, tail에서부터 검색
class Node<T> {
  prev: Node<T> | null = null;
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, prev: Node<T> | null = null, next: Node<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data: T) {
    this.head = new Node(data);
    this.tail = this.head;
  }

  insert(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const newNode = new Node(data);
    node.next = newNode;
    newNode.prev = node;
    this.tail = newNode;
  }

  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }

  // head에서부터 특정 데이터 검색
  searchFromHead(data: T): Node<T> | null {
    if (this.head === null) {
      return null;
    }

    let node = this.head;
    while (node !== null) {
      if (node.data === data) {
        return node;
      }
      node = node.next;
    }
    
    return null;
  }

  // tail에서부터 특정 데이터 검색
  searchFromTail(data: T): Node<T> | null {
    if (this.tail === null) {
      return null;
    }

    let node = this.tail;
    while (node !== null) {
      if (node.data === data) {
        return node;
      }
      node = node.prev;
    }
    
    return null;
  }
}

// 사용 예제
const doubleLinkedList = new NodeMgmt(0);
for (let data = 1; data < 10; data++) {
  doubleLinkedList.insert(data);
}

const nodeFromHead = doubleLinkedList.searchFromHead(3);
const nodeFromTail = doubleLinkedList.searchFromTail(7);
const dataFromHead = nodeFromHead?.data; // 3
const dataFromTail = nodeFromTail?.data; // 7`,
  },
  {
    language: 'typescript',
    code: `// 더블 링크드 리스트: 특정 노드 앞에 데이터 추가
// tail에서부터 뒤로 이동하며, 특정 숫자인 노드를 찾는 방식
class Node<T> {
  prev: Node<T> | null = null;
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, prev: Node<T> | null = null, next: Node<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data: T) {
    this.head = new Node(data);
    this.tail = this.head;
  }

  insert(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const newNode = new Node(data);
    node.next = newNode;
    newNode.prev = node;
    this.tail = newNode;
  }

  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }

  searchFromTail(data: T): Node<T> | null {
    if (this.tail === null) {
      return null;
    }

    let node = this.tail;
    while (node !== null) {
      if (node.data === data) {
        return node;
      }
      node = node.prev;
    }
    
    return null;
  }

  // 특정 데이터 앞에 새 노드 삽입 (tail에서부터 검색)
  insertBefore(data: T, beforeData: T): boolean {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
      return true;
    }

    let node = this.tail;
    while (node !== null && node.data !== beforeData) {
      node = node.prev;
    }

    if (node === null) {
      return false;
    }

    // head 앞에 삽입하는 경우
    if (node.prev === null) {
    const newNode = new Node(data);
    newNode.next = node;
    node.prev = newNode;
    this.head = newNode;
      return true;
    }

    // 중간에 삽입
    const newNode = new Node(data);
    const beforeNew = node.prev;
    beforeNew.next = newNode;
    newNode.prev = beforeNew;
    newNode.next = node;
    node.prev = newNode;
    
    return true;
  }
}

// 사용 예제: 2 앞에 1.5 삽입
const doubleLinkedList = new NodeMgmt(0);
for (let data = 1; data < 10; data++) {
  doubleLinkedList.insert(data);
}

doubleLinkedList.insertBefore(1.5, 2);
const allData = doubleLinkedList.desc(); 
// [0, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9]`,
  },
  {
    language: 'typescript',
    code: `// 더블 링크드 리스트: 특정 노드 뒤에 데이터 추가
// head에서부터 다음으로 이동하며, 특정 숫자인 노드를 찾는 방식
class Node<T> {
  prev: Node<T> | null = null;
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, prev: Node<T> | null = null, next: Node<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data: T) {
    this.head = new Node(data);
    this.tail = this.head;
  }

  insert(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const newNode = new Node(data);
    node.next = newNode;
    newNode.prev = node;
    this.tail = newNode;
  }

  desc(): T[] {
    const result: T[] = [];
    let node = this.head;
    
    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }
    
    return result;
  }

  searchFromHead(data: T): Node<T> | null {
    if (this.head === null) {
      return null;
    }

    let node = this.head;
    while (node !== null) {
      if (node.data === data) {
        return node;
      }
      node = node.next;
    }
    
    return null;
  }

  // 특정 데이터 뒤에 새 노드 삽입 (head에서부터 검색)
  insertAfter(data: T, afterData: T): boolean {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
      return true;
    }

    let node = this.head;
    while (node !== null && node.data !== afterData) {
      node = node.next;
    }

    if (node === null) {
      return false;
    }

    // tail 뒤에 삽입하는 경우
    if (node.next === null) {
      const newNode = new Node(data);
      node.next = newNode;
      newNode.prev = node;
      this.tail = newNode;
      return true;
    }

    // 중간에 삽입
    const newNode = new Node(data);
    const afterNew = node.next;
    newNode.next = afterNew;
    newNode.prev = node;
    node.next = newNode;
    if (afterNew !== null) {
      afterNew.prev = newNode;
    }
    
    return true;
  }
}

// 사용 예제: 1 뒤에 1.7 삽입
const nodeMgmt = new NodeMgmt(0);
for (let data = 1; data < 10; data++) {
  nodeMgmt.insert(data);
}

nodeMgmt.insertAfter(1.7, 1);
const allData = nodeMgmt.desc(); 
// [0, 1, 1.7, 2, 3, 4, 5, 6, 7, 8, 9]`,
  },
];
