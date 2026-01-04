import { Exercise } from '@/features/practice/types/exercise';

export const hashTableExercises: Exercise[] = [
  {
    id: 'hash-table-basic',
    conceptId: 'hash-table',
    title: '해시 테이블 기본 구현',
    difficulty: 'easy',
    description:
      '해시 테이블에 데이터를 저장하고 읽는 기본 기능을 구현하세요. 주어진 키-값 쌍들을 해시 테이블에 저장한 후, 특정 키에 해당하는 값을 읽어오는 함수를 작성하세요.',
    examples: [
      {
        input: '{ save: [["apple", 5], ["banana", 3], ["cherry", 8]], read: ["apple", "banana"] }',
        output: '[5, 3]',
        explanation: '"apple"에 저장된 값 5와 "banana"에 저장된 값 3을 읽어옵니다.',
      },
      {
        input: '{ save: [["key1", 10], ["key2", 20]], read: ["key1", "key3"] }',
        output: '[10, undefined]',
        explanation: '"key1"의 값 10을 읽고, 존재하지 않는 "key3"는 undefined를 반환합니다.',
      },
    ],
    constraints: [
      '키는 문자열입니다.',
      '값은 숫자입니다.',
      '해시 테이블의 크기는 8입니다.',
      '해시 함수는 key % 8을 사용합니다.',
    ],
    testCases: [
      {
        input: {
          save: [
            ['apple', 5],
            ['banana', 3],
            ['cherry', 8],
          ],
          read: ['apple', 'banana'],
        },
        expectedOutput: [5, 3],
      },
      {
        input: {
          save: [
            ['key1', 10],
            ['key2', 20],
          ],
          read: ['key1', 'key3'],
        },
        expectedOutput: [10, undefined],
      },
      {
        input: {
          save: [['test', 100]],
          read: ['test'],
        },
        expectedOutput: [100],
      },
    ],
    solution: {
      code: `const solution = (input: { save: Array<[string, number]>; read: string[] }): (number | undefined)[] => {
  const hashTable: (number | undefined)[] = new Array(8).fill(undefined);
  
  // 해시 함수
  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % 8;
  };
  
  // 데이터 저장
  for (const [key, value] of input.save) {
    const hashAddress = hashFunction(key);
    hashTable[hashAddress] = value;
  }
  
  // 데이터 읽기
  const result: (number | undefined)[] = [];
  for (const key of input.read) {
    const hashAddress = hashFunction(key);
    result.push(hashTable[hashAddress]);
  }
  
  return result;
};`,
      language: 'typescript',
      explanation:
        '해시 함수를 사용하여 키를 인덱스로 변환한 후, 해당 인덱스에 값을 저장하고 읽습니다. 해시 함수는 문자열의 각 문자를 사용하여 해시값을 계산합니다.',
    },
    hints: [
      '해시 함수를 구현하여 키를 인덱스로 변환합니다.',
      '해시 테이블 배열에 키-값 쌍을 저장합니다.',
      '읽을 때는 같은 해시 함수를 사용하여 인덱스를 계산하고 값을 가져옵니다.',
    ],
    tags: ['해시 테이블', '기초', '저장', '읽기'],
    templateCode: `const solution = (input: { save: Array<[string, number]>; read: string[] }): (number | undefined)[] => {
  // 해시 테이블 생성 (크기 8)
  const hashTable: (number | undefined)[] = new Array(8).fill(undefined);
  
  // 해시 함수 구현
  const hashFunction = (key: string): number => {
    // TODO: 키를 해시값으로 변환하는 함수 작성
  };
  
  // 데이터 저장
  // TODO: input.save의 각 키-값 쌍을 해시 테이블에 저장
  
  // 데이터 읽기
  // TODO: input.read의 각 키에 해당하는 값을 읽어서 배열로 반환
  
  return [];
};`,
  },
  {
    id: 'hash-table-chaining',
    conceptId: 'hash-table',
    title: 'Chaining 기법으로 충돌 해결',
    difficulty: 'medium',
    description:
      'Chaining 기법을 사용하여 해시 테이블의 충돌을 해결하는 함수를 구현하세요. 충돌이 발생하면 링크드 리스트로 데이터를 연결하여 저장합니다.',
    examples: [
      {
        input: '{ save: [["Dd", "1201023010"], ["Data", "3301023010"]], read: ["Dd", "Data"] }',
        output: '["1201023010", "3301023010"]',
        explanation: '같은 해시 주소를 가진 키들이 충돌하지만, Chaining 기법으로 모두 저장되고 읽을 수 있습니다.',
      },
    ],
    constraints: [
      '키는 문자열입니다.',
      '값은 문자열입니다.',
      '해시 테이블의 크기는 8입니다.',
      '해시 함수는 key % 8을 사용합니다.',
      '충돌이 발생하면 배열로 연결하여 저장합니다.',
    ],
    testCases: [
      {
        input: {
          save: [
            ['Dd', '1201023010'],
            ['Data', '3301023010'],
          ],
          read: ['Dd', 'Data'],
        },
        expectedOutput: ['1201023010', '3301023010'],
      },
      {
        input: {
          save: [
            ['key1', 'value1'],
            ['key2', 'value2'],
            ['key3', 'value3'],
          ],
          read: ['key1', 'key2', 'key3'],
        },
        expectedOutput: ['value1', 'value2', 'value3'],
      },
    ],
    solution: {
      code: `const solution = (input: { save: Array<[string, string]>; read: string[] }): (string | null)[] => {
  const hashTable: Array<Array<[number, string]>> = new Array(8).fill(null).map(() => []);
  
  // 해시 키 생성 함수
  const getKey = (data: string): number => {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  };
  
  // 해시 함수
  const hashFunction = (key: number): number => {
    return key % 8;
  };
  
  // 데이터 저장 함수 (Chaining 기법)
  const saveData = (data: string, value: string): void => {
    const indexKey = getKey(data);
    const hashAddress = hashFunction(indexKey);
    
    if (hashTable[hashAddress].length > 0) {
      // 이미 데이터가 있는 경우 (충돌 발생)
      for (let i = 0; i < hashTable[hashAddress].length; i++) {
        if (hashTable[hashAddress][i][0] === indexKey) {
          // 같은 키가 있으면 값 업데이트
          hashTable[hashAddress][i][1] = value;
          return;
        }
      }
      // 같은 키가 없으면 새로 추가
      hashTable[hashAddress].push([indexKey, value]);
    } else {
      // 빈 공간이면 새로 생성
      hashTable[hashAddress] = [[indexKey, value]];
    }
  };
  
  // 데이터 읽기 함수 (Chaining 기법)
  const readData = (data: string): string | null => {
    const indexKey = getKey(data);
    const hashAddress = hashFunction(indexKey);
    
    if (hashTable[hashAddress].length > 0) {
      for (let i = 0; i < hashTable[hashAddress].length; i++) {
        if (hashTable[hashAddress][i][0] === indexKey) {
          return hashTable[hashAddress][i][1];
        }
      }
    }
    
    return null;
  };
  
  // 데이터 저장
  for (const [key, value] of input.save) {
    saveData(key, value);
  }
  
  // 데이터 읽기
  const result: (string | null)[] = [];
  for (const key of input.read) {
    result.push(readData(key));
  }
  
  return result;
};`,
      language: 'typescript',
      explanation:
        'Chaining 기법을 사용하여 충돌을 해결합니다. 같은 해시 주소를 가진 키들은 배열로 연결하여 저장하고, 읽을 때는 배열을 순회하여 해당 키를 찾습니다.',
    },
    hints: [
      '해시 테이블의 각 슬롯을 배열로 초기화합니다.',
      '충돌이 발생하면 같은 해시 주소의 배열에 키-값 쌍을 추가합니다.',
      '읽을 때는 해당 해시 주소의 배열을 순회하여 키를 찾습니다.',
    ],
    tags: ['해시 테이블', '충돌 해결', 'Chaining', '중급'],
    templateCode: `const solution = (input: { save: Array<[string, string]>; read: string[] }): (string | null)[] => {
  // 해시 테이블 생성 (각 슬롯은 배열)
  const hashTable: Array<Array<[number, string]>> = new Array(8).fill(null).map(() => []);
  
  // 해시 키 생성 함수
  const getKey = (data: string): number => {
    // TODO: 문자열을 해시 키로 변환
  };
  
  // 해시 함수
  const hashFunction = (key: number): number => {
    return key % 8;
  };
  
  // 데이터 저장 함수 (Chaining 기법)
  const saveData = (data: string, value: string): void => {
    // TODO: 충돌이 발생하면 배열에 추가, 같은 키가 있으면 업데이트
  };
  
  // 데이터 읽기 함수 (Chaining 기법)
  const readData = (data: string): string | null => {
    // TODO: 해시 주소의 배열을 순회하여 키를 찾아 값 반환
  };
  
  // TODO: input.save의 각 키-값 쌍을 저장
  // TODO: input.read의 각 키에 해당하는 값을 읽어서 배열로 반환
  
  return [];
};`,
  },
  {
    id: 'hash-table-linear-probing',
    conceptId: 'hash-table',
    title: 'Linear Probing 기법으로 충돌 해결',
    difficulty: 'medium',
    description:
      'Linear Probing 기법을 사용하여 해시 테이블의 충돌을 해결하는 함수를 구현하세요. 충돌이 발생하면 다음 빈 공간을 찾아 저장합니다.',
    examples: [
      {
        input: '{ save: [["dk", "01200123123"], ["da", "3333333333"]], read: ["dk", "da"] }',
        output: '["01200123123", "3333333333"]',
        explanation: '같은 해시 주소를 가진 키들이 충돌하지만, Linear Probing 기법으로 다음 빈 공간에 저장됩니다.',
      },
    ],
    constraints: [
      '키는 문자열입니다.',
      '값은 문자열입니다.',
      '해시 테이블의 크기는 8입니다.',
      '해시 함수는 key % 8을 사용합니다.',
      '충돌이 발생하면 다음 빈 공간(0)을 찾아 저장합니다.',
    ],
    testCases: [
      {
        input: {
          save: [
            ['dk', '01200123123'],
            ['da', '3333333333'],
          ],
          read: ['dk', 'da'],
        },
        expectedOutput: ['01200123123', '3333333333'],
      },
      {
        input: {
          save: [
            ['key1', 'value1'],
            ['key2', 'value2'],
          ],
          read: ['key1', 'key2'],
        },
        expectedOutput: ['value1', 'value2'],
      },
    ],
    solution: {
      code: `const solution = (input: { save: Array<[string, string]>; read: string[] }): (string | null)[] => {
  const hashTable: (number | [number, string])[] = new Array(8).fill(0);
  
  // 해시 키 생성 함수
  const getKey = (data: string): number => {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  };
  
  // 해시 함수
  const hashFunction = (key: number): number => {
    return key % 8;
  };
  
  // 데이터 저장 함수 (Linear Probing 기법)
  const saveData = (data: string, value: string): void => {
    const indexKey = getKey(data);
    const hashAddress = hashFunction(indexKey);
    
    if (hashTable[hashAddress] !== 0) {
      // 충돌 발생: 다음 주소부터 빈 공간 찾기
      for (let index = hashAddress; index < hashTable.length; index++) {
        if (hashTable[index] === 0) {
          // 빈 공간을 찾으면 저장
          hashTable[index] = [indexKey, value];
          return;
        } else if (Array.isArray(hashTable[index]) && hashTable[index][0] === indexKey) {
          // 같은 키가 있으면 값 업데이트
          hashTable[index][1] = value;
          return;
        }
      }
    } else {
      // 빈 공간이면 바로 저장
      hashTable[hashAddress] = [indexKey, value];
    }
  };
  
  // 데이터 읽기 함수 (Linear Probing 기법)
  const readData = (data: string): string | null => {
    const indexKey = getKey(data);
    const hashAddress = hashFunction(indexKey);
    
    if (hashTable[hashAddress] !== 0) {
      for (let index = hashAddress; index < hashTable.length; index++) {
        if (hashTable[index] === 0) {
          // 빈 공간을 만나면 데이터가 없음
          return null;
        } else if (Array.isArray(hashTable[index]) && hashTable[index][0] === indexKey) {
          // 같은 키를 찾으면 값 반환
          return hashTable[index][1];
        }
      }
    }
    
    return null;
  };
  
  // 데이터 저장
  for (const [key, value] of input.save) {
    saveData(key, value);
  }
  
  // 데이터 읽기
  const result: (string | null)[] = [];
  for (const key of input.read) {
    result.push(readData(key));
  }
  
  return result;
};`,
      language: 'typescript',
      explanation:
        'Linear Probing 기법을 사용하여 충돌을 해결합니다. 충돌이 발생하면 해시 주소부터 시작하여 다음 빈 공간을 찾아 저장하고, 읽을 때도 같은 방식으로 순차적으로 탐색합니다.',
    },
    hints: [
      '충돌이 발생하면 해시 주소부터 시작하여 다음 빈 공간(0)을 찾습니다.',
      '저장할 때는 빈 공간을 찾거나 같은 키를 찾아 업데이트합니다.',
      '읽을 때는 해시 주소부터 순차적으로 탐색하여 키를 찾습니다.',
    ],
    tags: ['해시 테이블', '충돌 해결', 'Linear Probing', '중급'],
    templateCode: `const solution = (input: { save: Array<[string, string]>; read: string[] }): (string | null)[] => {
  // 해시 테이블 생성 (0으로 초기화)
  const hashTable: (number | [number, string])[] = new Array(8).fill(0);
  
  // 해시 키 생성 함수
  const getKey = (data: string): number => {
    // TODO: 문자열을 해시 키로 변환
  };
  
  // 해시 함수
  const hashFunction = (key: number): number => {
    return key % 8;
  };
  
  // 데이터 저장 함수 (Linear Probing 기법)
  const saveData = (data: string, value: string): void => {
    // TODO: 충돌이 발생하면 다음 빈 공간을 찾아 저장
  };
  
  // 데이터 읽기 함수 (Linear Probing 기법)
  const readData = (data: string): string | null => {
    // TODO: 해시 주소부터 순차적으로 탐색하여 키를 찾아 값 반환
  };
  
  // TODO: input.save의 각 키-값 쌍을 저장
  // TODO: input.read의 각 키에 해당하는 값을 읽어서 배열로 반환
  
  return [];
};`,
  },
  {
    id: 'hash-table-two-sum',
    conceptId: 'hash-table',
    title: '두 수의 합 (해시 테이블 활용)',
    difficulty: 'easy',
    description:
      '정수 배열과 목표값이 주어졌을 때, 배열에서 두 수를 더해서 목표값이 되는 두 수의 인덱스를 찾는 함수를 작성하세요. 해시 테이블을 사용하여 O(n) 시간에 해결하세요.',
    examples: [
      {
        input: '{ nums: [2, 7, 11, 15], target: 9 }',
        output: '[0, 1]',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9이므로 [0, 1]을 반환합니다.',
      },
      {
        input: '{ nums: [3, 2, 4], target: 6 }',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] = 2 + 4 = 6이므로 [1, 2]를 반환합니다.',
      },
    ],
    constraints: [
      '배열의 길이는 2 이상 10^4 이하입니다.',
      '각 요소는 -10^9 이상 10^9 이하의 정수입니다.',
      '정답은 정확히 하나만 존재합니다.',
      '같은 요소를 두 번 사용할 수 없습니다.',
    ],
    testCases: [
      {
        input: {
          nums: [2, 7, 11, 15],
          target: 9,
        },
        expectedOutput: [0, 1],
      },
      {
        input: {
          nums: [3, 2, 4],
          target: 6,
        },
        expectedOutput: [1, 2],
      },
      {
        input: {
          nums: [3, 3],
          target: 6,
        },
        expectedOutput: [0, 1],
      },
    ],
    solution: {
      code: `const solution = (input: { nums: number[]; target: number }): number[] => {
  const map = new Map<number, number>();
  
  for (let i = 0; i < input.nums.length; i++) {
    const complement = input.target - input.nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    
    map.set(input.nums[i], i);
  }
  
  return [];
};`,
      language: 'typescript',
      explanation:
        '해시 테이블(Map)을 사용하여 각 숫자와 그 인덱스를 저장합니다. 배열을 한 번만 순회하면서, 현재 숫자와 더해서 목표값이 되는 보수(complement)가 해시 테이블에 있는지 확인합니다. 있으면 두 인덱스를 반환하고, 없으면 현재 숫자를 해시 테이블에 저장합니다.',
    },
    hints: [
      '해시 테이블을 사용하여 각 숫자와 그 인덱스를 저장합니다.',
      '현재 숫자와 더해서 목표값이 되는 보수(complement)를 계산합니다.',
      '보수가 해시 테이블에 있으면 두 인덱스를 반환합니다.',
    ],
    tags: ['해시 테이블', '두 수의 합', '알고리즘', '기초'],
    templateCode: `const solution = (input: { nums: number[]; target: number }): number[] => {
  // 해시 테이블 생성 (Map 사용)
  const map = new Map<number, number>();
  
  // 배열을 순회하면서
  for (let i = 0; i < input.nums.length; i++) {
    // TODO: 현재 숫자와 더해서 목표값이 되는 보수 계산
    // TODO: 보수가 해시 테이블에 있는지 확인
    // TODO: 있으면 두 인덱스 반환, 없으면 현재 숫자를 해시 테이블에 저장
  }
  
  return [];
};`,
  },
  {
    id: 'hash-table-duplicate',
    conceptId: 'hash-table',
    title: '중복 체크 (해시 테이블 활용)',
    difficulty: 'easy',
    description:
      '정수 배열이 주어졌을 때, 배열에 중복된 요소가 있는지 확인하는 함수를 작성하세요. 해시 테이블을 사용하여 O(n) 시간에 해결하세요.',
    examples: [
      {
        input: '[1, 2, 3, 1]',
        output: 'true',
        explanation: '1이 두 번 나타나므로 true를 반환합니다.',
      },
      {
        input: '[1, 2, 3, 4]',
        output: 'false',
        explanation: '중복된 요소가 없으므로 false를 반환합니다.',
      },
    ],
    constraints: [
      '배열의 길이는 1 이상 10^5 이하입니다.',
      '각 요소는 -10^9 이상 10^9 이하의 정수입니다.',
    ],
    testCases: [
      {
        input: [1, 2, 3, 1],
        expectedOutput: true,
      },
      {
        input: [1, 2, 3, 4],
        expectedOutput: false,
      },
      {
        input: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
        expectedOutput: true,
      },
      {
        input: [1],
        expectedOutput: false,
      },
    ],
    solution: {
      code: `const solution = (nums: number[]): boolean => {
  const seen = new Set<number>();
  
  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  
  return false;
};`,
      language: 'typescript',
      explanation:
        'Set(해시 테이블 기반)을 사용하여 이미 본 숫자들을 저장합니다. 배열을 순회하면서 각 숫자가 Set에 이미 있는지 확인하고, 있으면 중복이므로 true를 반환합니다. 없으면 Set에 추가하고 계속 진행합니다.',
    },
    hints: [
      'Set(해시 테이블 기반)을 사용하여 이미 본 숫자들을 저장합니다.',
      '배열을 순회하면서 각 숫자가 Set에 이미 있는지 확인합니다.',
      '있으면 중복이므로 true를 반환하고, 없으면 Set에 추가합니다.',
    ],
    tags: ['해시 테이블', '중복 체크', 'Set', '기초'],
    templateCode: `const solution = (nums: number[]): boolean => {
  // 해시 테이블 생성 (Set 사용)
  const seen = new Set<number>();
  
  // 배열을 순회하면서
  for (const num of nums) {
    // TODO: 현재 숫자가 Set에 이미 있는지 확인
    // TODO: 있으면 true 반환, 없으면 Set에 추가
  }
  
  return false;
};`,
  },
];

