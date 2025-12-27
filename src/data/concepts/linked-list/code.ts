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
    code: `// 객체지향 프로그래밍으로 링크드 리스트 구현하기
// TypeScript 클래스를 사용하여 링크드 리스트 구현
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList<T> {
  private head: Node<T> | null = null;

  constructor(data?: T) {
    if (data !== undefined) {
      this.head = new Node(data);
    }
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
  toArray(): T[] {
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
const linkedList1 = new LinkedList(0);
for (let data = 1; data < 10; data++) {
  linkedList1.add(data);
}

const allData = linkedList1.toArray(); 
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

class LinkedList<T> {
  private head: Node<T> | null = null;

  constructor(data?: T) {
    if (data !== undefined) {
      this.head = new Node(data);
    }
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

  toArray(): T[] {
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

    // Case 1: head 노드를 삭제하는 경우
    if (this.head.data === data) {
      this.head = this.head.next;
      return true;
    }

    // Case 2: head가 아닌 노드를 삭제하는 경우
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
const linkedList1 = new LinkedList(0);
for (let data = 1; data < 10; data++) {
  linkedList1.add(data);
}

linkedList1.delete(4); // 4 삭제
const afterDelete = linkedList1.toArray(); 
// [0, 1, 2, 3, 5, 6, 7, 8, 9]`,
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

class DoublyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data?: T) {
    if (data !== undefined) {
      this.head = new Node(data);
      this.tail = this.head;
    }
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
  toArray(): T[] {
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
const doubleLinkedList = new DoublyLinkedList(0);
for (let data = 1; data < 10; data++) {
  doubleLinkedList.insert(data);
}

const allData = doubleLinkedList.toArray(); 
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

class DoublyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data?: T) {
    if (data !== undefined) {
      this.head = new Node(data);
      this.tail = this.head;
    }
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

  toArray(): T[] {
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
const doubleLinkedList = new DoublyLinkedList(0);
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

class DoublyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data?: T) {
    if (data !== undefined) {
      this.head = new Node(data);
      this.tail = this.head;
    }
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

  toArray(): T[] {
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
const doubleLinkedList = new DoublyLinkedList(0);
for (let data = 1; data < 10; data++) {
  doubleLinkedList.insert(data);
}

doubleLinkedList.insertBefore(1.5, 2);
const allData = doubleLinkedList.toArray(); 
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

class DoublyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor(data?: T) {
    if (data !== undefined) {
      this.head = new Node(data);
      this.tail = this.head;
    }
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

  toArray(): T[] {
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
const doubleLinkedList = new DoublyLinkedList(0);
for (let data = 1; data < 10; data++) {
  doubleLinkedList.insert(data);
}

doubleLinkedList.insertAfter(1.7, 1);
const allData = doubleLinkedList.toArray(); 
// [0, 1, 1.7, 2, 3, 4, 5, 6, 7, 8, 9]`,
  },
  {
    language: 'typescript',
    code: `// 깔끔하게 정리된 LinkedList 구현
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  constructor(data?: T) {
    if (data !== undefined) {
      this.head = new Node(data);
      this.size = 1;
    }
  }

  // 리스트 끝에 데이터 추가
  append(data: T): void {
    if (this.head === null) {
      this.head = new Node(data);
      this.size = 1;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = new Node(data);
    this.size++;
  }

  // 리스트 앞에 데이터 추가
  prepend(data: T): void {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // 특정 인덱스에 데이터 삽입
  insertAt(index: number, data: T): boolean {
    if (index < 0 || index > this.size) {
      return false;
    }

    // head 앞에 삽입하는 경우 (index === 0)
    if (index === 0) {
      this.prepend(data);
      return true;
    }

    // tail 뒤에 삽입하는 경우 (index === size)
    if (index === this.size) {
      this.append(data);
      return true;
    }

    // 중간에 삽입 (0 < index < size)
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    // 0 < index < size이므로 current와 current.next는 항상 유효함
    const newNode = new Node(data);
    newNode.next = current!.next;
    current!.next = newNode;
    this.size++;
    return true;
  }

  // 특정 데이터를 가진 노드 검색
  find(data: T): Node<T> | null {
    let current = this.head;
    
    while (current !== null) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    
    return null;
  }

  // 특정 데이터를 가진 노드 제거
  remove(data: T): boolean {
    if (this.head === null) {
      return false;
    }

    // head 노드 제거
    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    // 중간 또는 끝 노드 제거
    let current = this.head;
    while (current.next !== null) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  // 리스트의 모든 데이터를 배열로 반환
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    
    return result;
  }

  // 리스트가 비어있는지 확인
  isEmpty(): boolean {
    return this.head === null;
  }

  // 리스트의 크기 반환
  getSize(): number {
    return this.size;
  }

  // 리스트 초기화
  clear(): void {
    this.head = null;
    this.size = 0;
  }
}

// 사용 예제
const linkedList = new LinkedList(0);
for (let data = 1; data < 10; data++) {
  linkedList.append(data);
}

const node = linkedList.find(4);
const foundData = node?.data; // 4
const size = linkedList.getSize(); // 10
const isEmpty = linkedList.isEmpty(); // false

linkedList.insertAt(2, 1.5); // 인덱스 2에 1.5 삽입
linkedList.insertAt(5, 2.5); // 인덱스 5에 2.5 삽입
const afterInsert = linkedList.toArray();
// [0, 1, 1.5, 2, 3, 2.5, 4, 5, 6, 7, 8, 9]`,
  },
  {
    language: 'typescript',
    code: `// 깔끔하게 정리된 DoublyLinkedList 구현
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

class DoublyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size: number = 0;

  constructor(data?: T) {
    if (data !== undefined) {
      this.head = new Node(data);
      this.tail = this.head;
      this.size = 1;
    }
  }

  // 리스트 끝에 데이터 추가
  append(data: T): void {
    const newNode = new Node(data);
    
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.size = 1;
      return;
    }

    // head !== null이면 tail도 항상 유효함
    this.tail!.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.size++;
  }

  // 리스트 앞에 데이터 추가
  prepend(data: T): void {
    const newNode = new Node(data);
    
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.size = 1;
      return;
    }

    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.size++;
  }

  // head에서부터 특정 데이터 검색
  findFromHead(data: T): Node<T> | null {
    let current = this.head;
    
    while (current !== null) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    
    return null;
  }

  // tail에서부터 특정 데이터 검색
  findFromTail(data: T): Node<T> | null {
    let current = this.tail;
    
    while (current !== null) {
      if (current.data === data) {
        return current;
      }
      current = current.prev;
    }
    
    return null;
  }

  // 특정 데이터를 가진 노드 제거
  remove(data: T): boolean {
    const node = this.findFromHead(data);
    
    if (node === null) {
      return false;
    }

    // head 노드 제거
    if (node.prev === null) {
      this.head = node.next;
      if (this.head !== null) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.size--;
      return true;
    }

    // tail 노드 제거
    if (node.next === null) {
      // node.prev는 항상 유효함 (head 노드가 아니므로)
      this.tail = node.prev;
      this.tail!.next = null;
      this.size--;
      return true;
    }

    // 중간 노드 제거
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
    return true;
  }

  // 특정 인덱스에 데이터 삽입
  insertAt(index: number, data: T): boolean {
    if (index < 0 || index > this.size) {
      return false;
    }

    const newNode = new Node(data);

    // head 앞에 삽입하는 경우 (index === 0)
    if (index === 0) {
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
        this.size = 1;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        this.size++;
      }
      return true;
    }

    // tail 뒤에 삽입하는 경우 (index === size)
    if (index === this.size) {
      // index === size이고 size > 0이면 tail은 항상 유효함
      // size === 0인 경우는 이미 index === 0에서 처리됨
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
      this.size++;
      return true;
    }

    // 중간에 삽입 (0 < index < size)
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    // 0 < index < size이므로 current와 current.prev는 항상 유효함
    newNode.prev = current.prev;
    newNode.next = current;
    current.prev!.next = newNode;
    current.prev = newNode;
    this.size++;
    return true;
  }

  // 리스트의 모든 데이터를 배열로 반환
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    
    return result;
  }

  // 리스트가 비어있는지 확인
  isEmpty(): boolean {
    return this.head === null;
  }

  // 리스트의 크기 반환
  getSize(): number {
    return this.size;
  }

  // 리스트 초기화
  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}

// 사용 예제
const doublyLinkedList = new DoublyLinkedList(0);
for (let data = 1; data < 10; data++) {
  doublyLinkedList.append(data);
}

const nodeFromHead = doublyLinkedList.findFromHead(4);
const nodeFromTail = doublyLinkedList.findFromTail(7);
const size = doublyLinkedList.getSize(); // 10
const isEmpty = doublyLinkedList.isEmpty(); // false

doublyLinkedList.insertAt(2, 1.5); // 인덱스 2에 1.5 삽입
doublyLinkedList.insertAt(4, 1.7); // 인덱스 4에 1.7 삽입
const allData = doublyLinkedList.toArray();
// [0, 1, 1.5, 2, 1.7, 3, 4, 5, 6, 7, 8, 9]`,
  },
];
