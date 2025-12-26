import { Exercise } from '@/features/practice/types/exercise';

export const linkedListExercises: Exercise[] = [
  {
    id: 'linked-list-append',
    conceptId: 'linked-list',
    title: '링크드 리스트에 데이터 추가하기',
    difficulty: 'easy',
    description:
      '링크드 리스트의 끝에 데이터를 추가하는 함수를 구현하세요. 주어진 숫자 배열의 모든 요소를 순서대로 링크드 리스트에 추가한 후, 링크드 리스트의 모든 데이터를 배열로 반환하세요.',
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        output: '[1, 2, 3, 4, 5]',
        explanation: '1부터 5까지 순서대로 링크드 리스트에 추가됩니다.',
      },
      {
        input: '[10, 20, 30]',
        output: '[10, 20, 30]',
        explanation: '10, 20, 30이 순서대로 링크드 리스트에 추가됩니다.',
      },
    ],
    constraints: [
      '배열의 길이는 0 이상 100 이하입니다.',
      '배열의 각 요소는 정수입니다.',
      '링크드 리스트의 Node 클래스를 사용해야 합니다.',
    ],
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        expectedOutput: [1, 2, 3, 4, 5],
      },
      {
        input: [10, 20, 30],
        expectedOutput: [10, 20, 30],
      },
      {
        input: [5],
        expectedOutput: [5],
      },
      {
        input: [],
        expectedOutput: [],
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(arr: number[]): number[] {
  if (arr.length === 0) {
    return [];
  }

  let head: ListNode<number> | null = new ListNode(arr[0]);
  let current = head;

  // 나머지 요소들을 링크드 리스트에 추가
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  // 링크드 리스트를 배열로 변환
  const result: number[] = [];
  current = head;
  while (current !== null) {
    result.push(current.data);
    current = current.next;
  }

  return result;
}`,
      language: 'typescript',
      explanation:
        '첫 번째 요소로 head 노드를 생성하고, 나머지 요소들을 순회하면서 각각을 새로운 노드로 만들어 연결합니다. 마지막으로 링크드 리스트를 순회하여 배열로 변환합니다.',
    },
    hints: [
      '첫 번째 요소로 head 노드를 생성합니다.',
      '나머지 요소들을 순회하면서 각각을 새로운 노드로 만들어 이전 노드의 next에 연결합니다.',
      '링크드 리스트를 순회하여 배열로 변환합니다.',
    ],
    tags: ['링크드 리스트', '노드', '추가', '기초'],
  },
  {
    id: 'linked-list-delete',
    conceptId: 'linked-list',
    title: '링크드 리스트에서 노드 삭제하기',
    difficulty: 'medium',
    description:
      '링크드 리스트에서 특정 값을 가진 노드를 삭제하는 함수를 구현하세요. 주어진 숫자 배열로 링크드 리스트를 만든 후, 지정된 값을 가진 노드를 삭제하고, 남은 링크드 리스트의 모든 데이터를 배열로 반환하세요.',
    examples: [
      {
        input: '{ values: [1, 2, 3, 4, 5], deleteValue: 3 }',
        output: '[1, 2, 4, 5]',
        explanation: '값이 3인 노드를 삭제하면 [1, 2, 4, 5]가 됩니다.',
      },
      {
        input: '{ values: [10, 20, 30], deleteValue: 10 }',
        output: '[20, 30]',
        explanation: 'head 노드(값 10)를 삭제하면 [20, 30]이 됩니다.',
      },
    ],
    constraints: [
      '배열의 길이는 1 이상 100 이하입니다.',
      '삭제할 값은 배열에 반드시 존재합니다.',
      'head 노드를 삭제하는 경우도 고려해야 합니다.',
    ],
    testCases: [
      {
        input: { values: [1, 2, 3, 4, 5], deleteValue: 3 },
        expectedOutput: [1, 2, 4, 5],
      },
      {
        input: { values: [10, 20, 30], deleteValue: 10 },
        expectedOutput: [20, 30],
      },
      {
        input: { values: [1, 2, 3], deleteValue: 2 },
        expectedOutput: [1, 3],
      },
      {
        input: { values: [5], deleteValue: 5 },
        expectedOutput: [],
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(input: { values: number[]; deleteValue: number }): number[] {
  if (input.values.length === 0) {
    return [];
  }

  // 링크드 리스트 생성
  let head: ListNode<number> | null = new ListNode(input.values[0]);
  let current = head;
  for (let i = 1; i < input.values.length; i++) {
    current.next = new ListNode(input.values[i]);
    current = current.next;
  }

  // head 노드를 삭제해야 하는 경우
  if (head.data === input.deleteValue) {
    head = head.next;
  } else {
    // 중간 노드나 마지막 노드를 삭제하는 경우
    current = head;
    while (current.next !== null) {
      if (current.next.data === input.deleteValue) {
        current.next = current.next.next;
        break;
      }
      current = current.next;
    }
  }

  // 링크드 리스트를 배열로 변환
  const result: number[] = [];
  current = head;
  while (current !== null) {
    result.push(current.data);
    current = current.next;
  }

  return result;
}`,
      language: 'typescript',
      explanation:
        'head 노드를 삭제하는 경우와 중간/마지막 노드를 삭제하는 경우를 분리하여 처리합니다. head 노드를 삭제할 때는 head를 head.next로 변경하고, 그 외의 경우에는 이전 노드의 next를 다음 노드로 연결합니다.',
    },
    hints: [
      'head 노드를 삭제하는 경우와 그 외의 경우를 분리하여 처리합니다.',
      'head 노드를 삭제할 때는 head를 head.next로 변경합니다.',
      '중간 노드를 삭제할 때는 이전 노드의 next를 다음 노드로 연결합니다.',
    ],
    tags: ['링크드 리스트', '노드', '삭제', '중급'],
  },
  {
    id: 'linked-list-reverse',
    conceptId: 'linked-list',
    title: '링크드 리스트 역순으로 만들기',
    difficulty: 'medium',
    description:
      '링크드 리스트를 역순으로 만드는 함수를 구현하세요. 주어진 숫자 배열로 링크드 리스트를 만든 후, 링크드 리스트를 역순으로 만들고, 모든 데이터를 배열로 반환하세요.',
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: '링크드 리스트가 역순으로 변경됩니다.',
      },
      {
        input: '[10, 20, 30]',
        output: '[30, 20, 10]',
        explanation: '링크드 리스트가 역순으로 변경됩니다.',
      },
    ],
    constraints: [
      '배열의 길이는 0 이상 100 이하입니다.',
      '원본 링크드 리스트를 직접 수정해야 합니다 (새로운 링크드 리스트를 만들지 않음).',
      'O(1) 공간 복잡도로 구현해야 합니다.',
    ],
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        expectedOutput: [5, 4, 3, 2, 1],
      },
      {
        input: [10, 20, 30],
        expectedOutput: [30, 20, 10],
      },
      {
        input: [1, 2],
        expectedOutput: [2, 1],
      },
      {
        input: [5],
        expectedOutput: [5],
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(arr: number[]): number[] {
  if (arr.length === 0) {
    return [];
  }

  // 링크드 리스트 생성
  let head: ListNode<number> | null = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  // 링크드 리스트 역순으로 만들기
  let prev: ListNode<number> | null = null;
  current = head;
  
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  head = prev;

  // 링크드 리스트를 배열로 변환
  const result: number[] = [];
  current = head;
  while (current !== null) {
    result.push(current.data);
    current = current.next;
  }

  return result;
}`,
      language: 'typescript',
      explanation:
        '세 개의 포인터(prev, current, next)를 사용하여 링크드 리스트를 역순으로 만듭니다. 각 노드의 next 포인터를 이전 노드를 가리키도록 변경하면서 순회합니다.',
    },
    hints: [
      '세 개의 포인터(prev, current, next)를 사용합니다.',
      '각 노드의 next 포인터를 이전 노드를 가리키도록 변경합니다.',
      '순회가 끝나면 prev가 새로운 head가 됩니다.',
    ],
    tags: ['링크드 리스트', '역순', '포인터', '중급'],
  },
  {
    id: 'linked-list-middle',
    conceptId: 'linked-list',
    title: '링크드 리스트의 중간 노드 찾기',
    difficulty: 'easy',
    description:
      '링크드 리스트의 중간 노드를 찾는 함수를 구현하세요. 주어진 숫자 배열로 링크드 리스트를 만든 후, 중간 노드의 값을 반환하세요. 노드의 개수가 짝수인 경우 두 번째 중간 노드의 값을 반환하세요.',
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        output: '3',
        explanation: '5개의 노드 중 중간 노드는 3번째 노드(값: 3)입니다.',
      },
      {
        input: '[1, 2, 3, 4, 5, 6]',
        output: '4',
        explanation: '6개의 노드 중 두 번째 중간 노드는 4번째 노드(값: 4)입니다.',
      },
    ],
    constraints: [
      '배열의 길이는 1 이상 100 이하입니다.',
      '한 번의 순회로 해결해야 합니다 (O(n) 시간, O(1) 공간).',
    ],
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        expectedOutput: 3,
      },
      {
        input: [1, 2, 3, 4, 5, 6],
        expectedOutput: 4,
      },
      {
        input: [1, 2],
        expectedOutput: 2,
      },
      {
        input: [1],
        expectedOutput: 1,
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(arr: number[]): number {
  // 링크드 리스트 생성
  let head: ListNode<number> | null = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  // 두 개의 포인터를 사용: slow는 한 칸씩, fast는 두 칸씩 이동
  let slow: ListNode<number> | null = head;
  let fast: ListNode<number> | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow!.data;
}`,
      language: 'typescript',
      explanation:
        '두 개의 포인터(slow, fast)를 사용합니다. slow는 한 칸씩, fast는 두 칸씩 이동합니다. fast가 끝에 도달하면 slow는 중간 노드를 가리키게 됩니다. 이를 "토끼와 거북이" 알고리즘이라고도 합니다.',
    },
    hints: [
      '두 개의 포인터(slow, fast)를 사용합니다.',
      'slow는 한 칸씩, fast는 두 칸씩 이동합니다.',
      'fast가 끝에 도달하면 slow는 중간 노드를 가리키게 됩니다.',
    ],
    tags: ['링크드 리스트', '중간 노드', '투 포인터', '기초'],
  },
  {
    id: 'linked-list-cycle',
    conceptId: 'linked-list',
    title: '링크드 리스트에 사이클이 있는지 확인하기',
    difficulty: 'medium',
    description:
      '링크드 리스트에 사이클(순환)이 있는지 확인하는 함수를 구현하세요. 주어진 숫자 배열로 링크드 리스트를 만든 후, 마지막 노드가 특정 인덱스의 노드를 가리키도록 연결하여 사이클을 만들 수 있습니다. 사이클이 있으면 true, 없으면 false를 반환하세요.',
    examples: [
      {
        input: '{ values: [3, 2, 0, -4], cycleIndex: 1 }',
        output: 'true',
        explanation: '마지막 노드(-4)가 인덱스 1의 노드(2)를 가리켜 사이클이 형성됩니다.',
      },
      {
        input: '{ values: [1, 2], cycleIndex: 0 }',
        output: 'true',
        explanation: '마지막 노드(2)가 첫 번째 노드(1)를 가리켜 사이클이 형성됩니다.',
      },
      {
        input: '{ values: [1], cycleIndex: -1 }',
        output: 'false',
        explanation: '사이클이 없습니다.',
      },
    ],
    constraints: [
      '배열의 길이는 0 이상 100 이하입니다.',
      'cycleIndex가 -1이면 사이클이 없습니다.',
      'O(1) 공간 복잡도로 해결해야 합니다.',
    ],
    testCases: [
      {
        input: { values: [3, 2, 0, -4], cycleIndex: 1 },
        expectedOutput: true,
      },
      {
        input: { values: [1, 2], cycleIndex: 0 },
        expectedOutput: true,
      },
      {
        input: { values: [1], cycleIndex: -1 },
        expectedOutput: false,
      },
      {
        input: { values: [1, 2, 3], cycleIndex: -1 },
        expectedOutput: false,
      },
    ],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

function solution(input: { values: number[]; cycleIndex: number }): boolean {
  if (input.values.length === 0) {
    return false;
  }

  // 링크드 리스트 생성
  const nodes: ListNode<number>[] = [];
  let head: ListNode<number> | null = new ListNode(input.values[0]);
  nodes.push(head);
  let current = head;

  for (let i = 1; i < input.values.length; i++) {
    current.next = new ListNode(input.values[i]);
    current = current.next;
    nodes.push(current);
  }

  // 사이클 생성
  if (input.cycleIndex >= 0 && input.cycleIndex < nodes.length) {
    current.next = nodes[input.cycleIndex];
  }

  // Floyd's Cycle Detection Algorithm (토끼와 거북이 알고리즘)
  let slow: ListNode<number> | null = head;
  let fast: ListNode<number> | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // 사이클 발견
    }
  }

  return false; // 사이클 없음
}`,
      language: 'typescript',
      explanation:
        "Floyd's Cycle Detection Algorithm(토끼와 거북이 알고리즘)을 사용합니다. 두 개의 포인터를 사용하여 slow는 한 칸씩, fast는 두 칸씩 이동합니다. 사이클이 있으면 언젠가 두 포인터가 만나게 됩니다.",
    },
    hints: [
      "Floyd's Cycle Detection Algorithm을 사용합니다.",
      '두 개의 포인터(slow, fast)를 사용하여 slow는 한 칸씩, fast는 두 칸씩 이동합니다.',
      '사이클이 있으면 두 포인터가 만나게 됩니다.',
    ],
    tags: ['링크드 리스트', '사이클', '투 포인터', '중급'],
  },
  {
    id: 'linked-list-node-mgmt',
    conceptId: 'linked-list',
    title: 'NodeMgmt 클래스 구현하기',
    difficulty: 'medium',
    description:
      '링크드 리스트를 관리하는 NodeMgmt 클래스를 구현하세요. ListNode 클래스와 NodeMgmt 클래스를 작성하고, add, desc, delete, searchNode 메서드를 구현하세요. delete 메서드는 특정 값을 가진 노드 중 첫 번째로 나타나는 노드만 삭제합니다. 각 노드는 별도의 객체이므로, 같은 값을 가진 노드가 여러 개 있어도 각각은 독립적인 노드입니다.',
    examples: [
      {
        input: '{ operations: ["add", "add", "add", "desc"], values: [1, 2, 3] }',
        output: '[1, 2, 3]',
        explanation: '1, 2, 3을 순서대로 추가한 후 desc()로 모든 데이터를 반환합니다.',
      },
      {
        input: '{ operations: ["add", "delete", "desc"], values: [1, 2] }',
        output: '[2]',
        explanation: '1을 초기값으로 생성하고, 2를 추가한 후, 1을 삭제하면 [2]가 됩니다.',
      },
    ],
    constraints: [
      'ListNode 클래스와 NodeMgmt 클래스를 모두 구현해야 합니다.',
      'add 메서드는 링크드 리스트 끝에 데이터를 추가합니다.',
      'desc 메서드는 링크드 리스트의 모든 데이터를 배열로 반환합니다.',
      'delete 메서드는 특정 값을 가진 노드 중 첫 번째로 나타나는 노드만 삭제합니다.',
      'searchNode 메서드는 특정 값을 가진 노드 중 첫 번째로 나타나는 노드를 반환합니다.',
      '같은 값을 가진 노드가 여러 개 있어도 각각은 독립적인 노드입니다.',
    ],
    testCases: [
      {
        input: {
          operations: ['add', 'add', 'add', 'desc'],
          values: [1, 2, 3],
        },
        expectedOutput: [1, 2, 3],
      },
      {
        input: {
          operations: ['add', 'delete', 'desc'],
          values: [1, 2],
        },
        expectedOutput: [2],
      },
      {
        input: {
          operations: ['add', 'add', 'delete', 'desc'],
          values: [1, 2, 1],
        },
        expectedOutput: [2, 1],
      },
    ],
    templateCode: [
      `// ListNode 클래스와 NodeMgmt 클래스를 구현하세요
class ListNode<T> {
  // 여기에 ListNode 클래스를 작성하세요
}

class NodeMgmt<T> {
  // 여기에 NodeMgmt 클래스를 작성하세요
}

const solution = (input: { operations: string[]; values: number[] }): any => {
  // NodeMgmt 인스턴스를 생성하고 operations를 수행한 후 결과를 반환하세요
  // delete 연산의 경우, values 배열에서 다음 값을 가져와서 삭제합니다
  return [];
};`,
    ],
    templateDescriptions: ['클래스 작성'],
    solution: {
      code: `class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: ListNode<T> | null = null;

  constructor(data: T) {
    this.head = new ListNode(data);
  }

  add(data: T): void {
    if (this.head === null) {
      this.head = new ListNode(data);
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    node.next = new ListNode(data);
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

    // 첫 번째로 나타나는 노드만 삭제
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

  searchNode(data: T): ListNode<T> | null {
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

const solution = (input: { operations: string[]; values: number[] }): any => {
  if (input.values.length === 0) {
    return [];
  }

  const nodeMgmt = new NodeMgmt(input.values[0]);
  let valueIndex = 1;

  for (const op of input.operations) {
    if (op === 'add' && valueIndex < input.values.length) {
      nodeMgmt.add(input.values[valueIndex++]);
    } else if (op === 'delete') {
      // delete 연산: values 배열에서 다음 값을 가져와서 삭제
      // values 배열이 끝났다면 이미 링크드 리스트에 있는 첫 번째 값을 삭제
      // 첫 번째로 나타나는 노드만 삭제
      if (valueIndex < input.values.length) {
        nodeMgmt.delete(input.values[valueIndex++]);
      } else {
        const current = nodeMgmt.desc();
        if (current.length > 0) {
          nodeMgmt.delete(current[0]);
        }
      }
    } else if (op === 'desc') {
      return nodeMgmt.desc();
    }
  }

  return nodeMgmt.desc();
};`,
      language: 'typescript',
      explanation:
        'Node 클래스는 데이터와 next 포인터를 가지고 있고, NodeMgmt 클래스는 head를 관리하며 add, desc, delete, searchNode 메서드를 제공합니다.',
    },
    hints: [
      'Node 클래스는 data와 next 필드를 가져야 합니다.',
      'NodeMgmt 클래스는 head를 private 필드로 관리합니다.',
      'add 메서드는 링크드 리스트의 끝까지 순회한 후 새 노드를 추가합니다.',
      'delete 메서드는 head 노드 삭제와 중간 노드 삭제를 구분하여 처리합니다.',
    ],
    tags: ['링크드 리스트', '클래스', 'NodeMgmt', '중급'],
  },
  {
    id: 'linked-list-doubly',
    conceptId: 'linked-list',
    title: '더블 링크드 리스트 (Doubly Linked List) 구현하기',
    difficulty: 'medium',
    description:
      '양방향으로 연결된 더블 링크드 리스트를 구현하세요. Node 클래스에 prev 포인터를 추가하고, NodeMgmt 클래스에 head와 tail을 관리하며, insert, desc, searchFromHead, searchFromTail 메서드를 구현하세요.',
    examples: [
      {
        input: '{ operations: ["insert", "insert", "insert", "desc"], values: [1, 2, 3] }',
        output: '[1, 2, 3]',
        explanation: '1, 2, 3을 순서대로 삽입한 후 desc()로 모든 데이터를 반환합니다.',
      },
    ],
    constraints: [
      'Node 클래스는 prev와 next 포인터를 모두 가져야 합니다.',
      'NodeMgmt 클래스는 head와 tail을 모두 관리해야 합니다.',
      'insert 메서드는 링크드 리스트 끝에 데이터를 추가합니다.',
      'searchFromHead는 head에서부터 검색합니다.',
      'searchFromTail은 tail에서부터 검색합니다.',
    ],
    testCases: [
      {
        input: {
          operations: ['insert', 'insert', 'insert', 'desc'],
          values: [1, 2, 3],
        },
        expectedOutput: [1, 2, 3],
      },
      {
        input: {
          operations: ['insert', 'insert', 'searchFromHead', 'desc'],
          values: [1, 2, 1],
        },
        expectedOutput: [1, 2],
      },
    ],
    templateCode: [
      `// 더블 링크드 리스트의 Node 클래스와 NodeMgmt 클래스를 구현하세요
class Node<T> {
  // prev, data, next 필드를 가진 Node 클래스를 작성하세요
}

class NodeMgmt<T> {
  // head와 tail을 관리하는 NodeMgmt 클래스를 작성하세요
  // insert, desc, searchFromHead, searchFromTail 메서드를 구현하세요
}

const solution = (input: { operations: string[]; values: number[] }): any => {
  // NodeMgmt 인스턴스를 생성하고 operations를 수행한 후 결과를 반환하세요
  return [];
};`,
    ],
    templateDescriptions: ['더블 링크드 리스트 클래스 작성'],
    solution: {
      code: `class ListNode<T> {
  prev: ListNode<T> | null = null;
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, prev: ListNode<T> | null = null, next: ListNode<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  constructor(data: T) {
    this.head = new ListNode(data);
    this.tail = this.head;
  }

  insert(data: T): void {
    if (this.head === null) {
      this.head = new ListNode(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const new_node = new ListNode(data);
    node.next = new_node;
    new_node.prev = node;
    this.tail = new_node;
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

  searchFromHead(data: T): ListNode<T> | null {
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

  searchFromTail(data: T): ListNode<T> | null {
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

const solution = (input: { operations: string[]; values: number[] }): any => {
  if (input.values.length === 0) {
    return [];
  }

  const nodeMgmt = new NodeMgmt(input.values[0]);
  let valueIndex = 1;

  for (const op of input.operations) {
    if (op === 'insert' && valueIndex < input.values.length) {
      nodeMgmt.insert(input.values[valueIndex++]);
    } else if (op === 'desc') {
      return nodeMgmt.desc();
    } else if (op === 'searchFromHead' && valueIndex < input.values.length) {
      const node = nodeMgmt.searchFromHead(input.values[valueIndex++]);
      return node ? node.data : null;
    } else if (op === 'searchFromTail' && valueIndex < input.values.length) {
      const node = nodeMgmt.searchFromTail(input.values[valueIndex++]);
      return node ? node.data : null;
    }
  }

  return nodeMgmt.desc();
};`,
      language: 'typescript',
      explanation:
        '더블 링크드 리스트는 각 노드가 prev와 next 포인터를 모두 가지고 있어 양방향 탐색이 가능합니다. head와 tail을 모두 관리하여 양쪽 끝에서 검색할 수 있습니다.',
    },
    hints: [
      'Node 클래스는 prev, data, next 세 개의 필드를 가져야 합니다.',
      'insert 시 이전 노드의 next와 새 노드의 prev를 연결해야 합니다.',
      'searchFromHead는 next 포인터를 따라가며 검색합니다.',
      'searchFromTail은 prev 포인터를 따라가며 검색합니다.',
    ],
    tags: ['링크드 리스트', '더블 링크드 리스트', '양방향', '중급'],
  },
  {
    id: 'linked-list-insert-before',
    conceptId: 'linked-list',
    title: '더블 링크드 리스트: 특정 노드 앞에 데이터 추가하기',
    difficulty: 'hard',
    description:
      '더블 링크드 리스트에서 특정 노드 앞에 데이터를 추가하는 insertBefore 메서드를 구현하세요. tail에서부터 검색하여 특정 값을 가진 노드를 찾은 후, 그 노드 앞에 새 데이터를 삽입하세요.',
    examples: [
      {
        input: '{ values: [1, 2, 3, 4], insertBefore: [{ data: 1.5, beforeData: 2 }] }',
        output: '[1, 1.5, 2, 3, 4]',
        explanation: '값이 2인 노드 앞에 1.5를 삽입합니다.',
      },
    ],
    constraints: [
      'tail에서부터 검색하여 특정 노드를 찾아야 합니다.',
      'head 앞에 삽입하는 경우도 처리해야 합니다.',
      '중간 노드 앞에 삽입하는 경우도 처리해야 합니다.',
      '찾는 노드가 없으면 false를 반환합니다.',
    ],
    testCases: [
      {
        input: {
          values: [1, 2, 3, 4],
          insertBefore: [{ data: 1.5, beforeData: 2 }],
        },
        expectedOutput: [1, 1.5, 2, 3, 4],
      },
      {
        input: {
          values: [1, 2, 3],
          insertBefore: [{ data: 0.5, beforeData: 1 }],
        },
        expectedOutput: [0.5, 1, 2, 3],
      },
    ],
    templateCode: [
      `// 더블 링크드 리스트의 insertBefore 메서드를 구현하세요
class ListNode<T> {
  prev: ListNode<T> | null = null;
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, prev: ListNode<T> | null = null, next: ListNode<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  constructor(data: T) {
    this.head = new ListNode(data);
    this.tail = this.head;
  }

  insert(data: T): void {
    if (this.head === null) {
      this.head = new ListNode(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const new_node = new ListNode(data);
    node.next = new_node;
    new_node.prev = node;
    this.tail = new_node;
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

  // insertBefore 메서드를 구현하세요
  insertBefore(data: T, beforeData: T): boolean {
    // tail에서부터 검색하여 beforeData를 가진 노드를 찾고, 그 앞에 data를 삽입하세요
    return false;
  }
}

const solution = (input: { values: number[]; insertBefore: Array<{ data: number; beforeData: number }> }): number[] => {
  if (input.values.length === 0) {
    return [];
  }

  const nodeMgmt = new NodeMgmt(input.values[0]);
  for (let i = 1; i < input.values.length; i++) {
    nodeMgmt.insert(input.values[i]);
  }

  for (const { data, beforeData } of input.insertBefore) {
    nodeMgmt.insertBefore(data, beforeData);
  }

  return nodeMgmt.desc();
};`,
    ],
    templateDescriptions: ['insertBefore 메서드 작성'],
    solution: {
      code: `class ListNode<T> {
  prev: ListNode<T> | null = null;
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T, prev: ListNode<T> | null = null, next: ListNode<T> | null = null) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class NodeMgmt<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  constructor(data: T) {
    this.head = new ListNode(data);
    this.tail = this.head;
  }

  insert(data: T): void {
    if (this.head === null) {
      this.head = new ListNode(data);
      this.tail = this.head;
      return;
    }

    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    
    const new_node = new ListNode(data);
    node.next = new_node;
    new_node.prev = node;
    this.tail = new_node;
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

  insertBefore(data: T, beforeData: T): boolean {
    if (this.head === null) {
      this.head = new ListNode(data);
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
      const new_node = new ListNode(data);
      new_node.next = node;
      node.prev = new_node;
      this.head = new_node;
      return true;
    }

    // 중간에 삽입
    const new_node = new ListNode(data);
    const before_new = node.prev;
    before_new.next = new_node;
    new_node.prev = before_new;
    new_node.next = node;
    node.prev = new_node;
    
    return true;
  }
}

const solution = (input: { values: number[]; insertBefore: Array<{ data: number; beforeData: number }> }): number[] => {
  if (input.values.length === 0) {
    return [];
  }

  const nodeMgmt = new NodeMgmt(input.values[0]);
  for (let i = 1; i < input.values.length; i++) {
    nodeMgmt.insert(input.values[i]);
  }

  for (const { data, beforeData } of input.insertBefore) {
    nodeMgmt.insertBefore(data, beforeData);
  }

  return nodeMgmt.desc();
};`,
      language: 'typescript',
      explanation:
        'tail에서부터 검색하여 특정 노드를 찾은 후, 그 노드 앞에 새 노드를 삽입합니다. head 앞에 삽입하는 경우와 중간에 삽입하는 경우를 구분하여 처리합니다.',
    },
    hints: [
      'tail에서부터 prev 포인터를 따라가며 beforeData를 가진 노드를 찾습니다.',
      'head 앞에 삽입하는 경우 head를 새 노드로 변경해야 합니다.',
      '중간에 삽입할 때는 이전 노드, 새 노드, 현재 노드의 포인터를 모두 연결해야 합니다.',
    ],
    tags: ['링크드 리스트', '더블 링크드 리스트', '삽입', '고급'],
  },
];

