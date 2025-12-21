import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 기본 스택 구현 (LIFO - Last-In, First-Out)
class Stack<T> {
  private items: T[] = [];

  // Push: 스택에 데이터를 넣는 기능
  push(item: T): void {
    this.items.push(item);
  }

  // Pop: 스택에서 데이터를 꺼내는 기능
  pop(): T | undefined {
    return this.items.pop();
  }

  // peek: 가장 위에 있는 데이터 확인 (제거하지 않음)
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 사용 예제
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
const last = stack.pop(); // 3 (가장 나중에 추가된 요소)
const second = stack.pop(); // 2`,
  },
  {
    language: 'typescript',
    code: `// 재귀 함수와 프로세스 스택 이해
// 함수 호출이 스택 구조로 관리됨을 보여주는 예제

const recursive = (data: number): void => {
  if (data < 0) {
    console.log("ended");
  } else {
    console.log(data);
    recursive(data - 1);
    console.log("returned", data);
  }
};

// recursive(4) 호출 시 출력:
// 4
// 3
// 2
// 1
// 0
// ended
// returned 0
// returned 1
// returned 2
// returned 3
// returned 4

// 각 함수 호출이 스택에 쌓이고, 
// 재귀가 끝나면 역순으로 반환되는 것을 확인할 수 있음
recursive(4);`,
  },
  {
    language: 'typescript',
    code: `// 리스트를 이용한 스택 구현 (간단한 방법)
// TypeScript/JavaScript 배열의 push, pop 메서드 활용
const stackList: number[] = [];

// Push 함수
const push = (data: number): void => {
  stackList.push(data);
};

// Pop 함수
const pop = (): number | undefined => {
  return stackList.pop();
};

// 사용 예제
for (let index = 0; index < 10; index++) {
  push(index);
}

const size = stackList.length; // 10

const last = pop(); // 9 (가장 나중에 추가된 요소)
const second = pop(); // 8
const third = pop(); // 7`,
  },
  {
    language: 'typescript',
    code: `// 리스트 변수로 스택을 다루는 pop, push 기능 직접 구현
// (pop, push 함수 사용하지 않고 직접 구현)

const stackList: number[] = [];

// Push 함수 직접 구현
const push = (data: number): void => {
  stackList[stackList.length] = data; // 배열 끝에 추가
  // 또는 stackList.push(data) 대신 사용
};

// Pop 함수 직접 구현
const pop = (): number | undefined => {
  if (stackList.length === 0) {
    return undefined;
  }
  const data = stackList[stackList.length - 1]; // 마지막 요소 가져오기
  stackList.length = stackList.length - 1; // 배열 길이 줄이기 (마지막 요소 제거)
  return data;
};

// 사용 예제
for (let index = 0; index < 10; index++) {
  push(index);
}

// stackList는 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const last = pop(); // 9 (가장 나중에 추가된 요소)
const second = pop(); // 8
const third = pop(); // 7`,
  },
];

