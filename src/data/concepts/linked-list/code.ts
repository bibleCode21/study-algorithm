import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 단일 연결 리스트 노드
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// 단일 연결 리스트 구현
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private size: number = 0;

  // 맨 앞에 추가 (O(1))
  prepend(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // 맨 뒤에 추가 (O(n))
  append(value: T): void {
    const newNode = new ListNode(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // 특정 위치에 삽입 (O(n))
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    const newNode = new ListNode(value);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }
    newNode.next = current!.next;
    current!.next = newNode;
    this.size++;
  }

  // 값으로 삭제 (O(n))
  remove(value: T): boolean {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      this.size--;
      return true;
    }

    return false;
  }

  // 인덱스로 접근 (O(n))
  getAt(index: number): T | null {
    if (index < 0 || index >= this.size) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.value;
  }

  // 리스트 크기
  length(): number {
    return this.size;
  }

  // 리스트가 비어있는지 확인
  isEmpty(): boolean {
    return this.size === 0;
  }
}

// 사용 예제
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
console.log(list.getAt(0)); // 0`,
  },
];

