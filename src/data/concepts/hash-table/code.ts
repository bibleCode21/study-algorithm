import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 해시 테이블 기본 구조 만들기
// 배열을 사용하여 해시 테이블의 저장 공간 생성

const hashTable: number[] = Array.from({ length: 10 }, () => 0);
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// 또는 간단하게
const hashTable2: number[] = new Array(10).fill(0);
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`,
  },
  {
    language: 'typescript',
    code: `// 간단한 해시 함수 구현
// Division 법: 나누기를 통한 나머지 값을 사용하는 기법

const hash = (key: number): number => {
  return key % 5;
};

// 사용 예제
const key1 = 10;
const key2 = 23;
const key3 = 7;

const hash1 = hash(key1); // 0
const hash2 = hash(key2); // 3
const hash3 = hash(key3); // 2`,
  },
  {
    language: 'typescript',
    code: `// 해시 테이블에 데이터 저장하고 읽기
// 문자열의 첫 번째 문자의 ASCII 코드를 키로 사용

const hashTable: string[] = new Array(10).fill('');

// 해시 함수
const hash = (key: number): number => {
  return key % 5;
};

// 데이터 저장 함수
const saveData = (data: string, value: string): void => {
  const key = data.charCodeAt(0); // 첫 번째 문자의 ASCII 코드
  const hashAddress = hash(key);
  hashTable[hashAddress] = value;
};

// 데이터 읽기 함수
const readData = (data: string): string => {
  const key = data.charCodeAt(0);
  const hashAddress = hash(key);
  return hashTable[hashAddress];
};

// 사용 예제
saveData('Andy', '01055553333');
saveData('Dave', '01044443333');
saveData('Trump', '01022223333');

const andyPhone = readData('Andy'); // '01055553333'
const davePhone = readData('Dave'); // '01044443333'`,
  },
  {
    language: 'typescript',
    code: `// 해시 테이블 구현 (리스트 변수 활용)
// hash() 함수를 사용하여 키 생성

const hashTable: (string | number)[] = new Array(8).fill(0);

// 해시 키 생성 함수
const hashKey = (data: string): number => {
  // TypeScript/JavaScript의 문자열 해시는 직접 지원하지 않으므로
  // 간단한 해시 함수 구현
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    // hash << 5: 비트 왼쪽 시프트 연산 (hash를 왼쪽으로 5비트 이동 = hash * 32)
    // (hash << 5) - hash = hash * 32 - hash = hash * 31
    // 31은 소수이므로 해시 분산이 좋아짐
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash = hash & hash; // 32비트 정수로 변환 (오버플로우 방지)
  }
  return Math.abs(hash);
};

// 해시 함수
const hash = (key: number): number => {
  return key % 8;
};

// 데이터 저장 함수
const saveData = (data: string, value: string): void => {
  const hashAddress = hash(hashKey(data));
  hashTable[hashAddress] = value;
};

// 데이터 읽기 함수
const readData = (data: string): string | number => {
  const hashAddress = hash(hashKey(data));
  return hashTable[hashAddress];
};

// 사용 예제
saveData('Dave', '0102030200');
saveData('Andy', '01033232200');

const davePhone = readData('Dave'); // '0102030200'
const andyPhone = readData('Andy'); // '01033232200'`,
  },
  {
    language: 'typescript',
    code: `// Chaining 기법으로 충돌 해결
// 개방 해싱(Open Hashing): 해시 테이블 저장공간 외의 공간을 활용
// 충돌이 발생하면 링크드 리스트로 데이터를 추가로 연결

const hashTable: Array<Array<[number, string]>> = new Array(8).fill(0).map(() => []);

// 해시 키 생성 함수
const hashKey = (data: string): number => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    // hash << 5: 비트 왼쪽 시프트 연산 (hash를 왼쪽으로 5비트 이동 = hash * 32)
    // (hash << 5) - hash = hash * 32 - hash = hash * 31
    // 31은 소수이므로 해시 분산이 좋아짐
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash = hash & hash; // 32비트 정수로 변환 (오버플로우 방지)
  }
  return Math.abs(hash);
};

// 해시 함수
const hash = (key: number): number => {
  return key % 8;
};

// 데이터 저장 함수 (Chaining 기법)
const saveData = (data: string, value: string): void => {
  const indexKey = hashKey(data);
  const hashAddress = hash(indexKey);
  
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
  const indexKey = hashKey(data);
  const hashAddress = hash(indexKey);
  
  if (hashTable[hashAddress].length > 0) {
    for (let i = 0; i < hashTable[hashAddress].length; i++) {
      if (hashTable[hashAddress][i][0] === indexKey) {
        return hashTable[hashAddress][i][1];
      }
    }
  }
  
  return null;
};

// 사용 예제
saveData('Dd', '1201023010');
saveData('Data', '3301023010');

const ddPhone = readData('Dd'); // '1201023010'
const dataPhone = readData('Data'); // '3301023010'`,
  },
  {
    language: 'typescript',
    code: `// Linear Probing 기법으로 충돌 해결
// 폐쇄 해싱(Close Hashing): 해시 테이블 저장공간 안에서 충돌 해결
// 충돌이 발생하면 해당 해시 주소의 다음 주소부터 빈 공간을 찾아 저장
// 배열 끝에 도달하면 처음으로 돌아가서 순환 탐색

const hashTable: ([number, string] | null)[] = new Array(8).fill(null);

// 해시 키 생성 함수
const hashKey = (data: string): number => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    // hash << 5: 비트 왼쪽 시프트 연산 (hash를 왼쪽으로 5비트 이동 = hash * 32)
    // (hash << 5) - hash = hash * 32 - hash = hash * 31
    // 31은 소수이므로 해시 분산이 좋아짐
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash = hash & hash; // 32비트 정수로 변환 (오버플로우 방지)
  }
  return Math.abs(hash);
};

// 해시 함수
const hash = (key: number): number => {
  return key % 8;
};

// 데이터 저장 함수 (Linear Probing 기법)
const saveData = (data: string, value: string): void => {
  const indexKey = hashKey(data);
  const hashAddress = hash(indexKey);
  
  if (hashTable[hashAddress] !== null) {
    // 충돌 발생: 다음 주소부터 빈 공간 찾기 (순환 탐색)
    let index = hashAddress;
    let checked = 0;
    while (checked < hashTable.length) {
      if (hashTable[index] === null) {
        // 빈 공간을 찾으면 저장
        hashTable[index] = [indexKey, value];
        return;
      } else if (hashTable[index]![0] === indexKey) {
        // 같은 키가 있으면 값 업데이트
        hashTable[index]![1] = value;
        return;
      }
      // 다음 인덱스로 이동 (순환)
      index = (index + 1) % hashTable.length;
      checked++;
    }
    // 테이블이 가득 찬 경우
    throw new Error('Hash table is full');
  } else {
    // 빈 공간이면 바로 저장
    hashTable[hashAddress] = [indexKey, value];
  }
};

// 데이터 읽기 함수 (Linear Probing 기법)
const readData = (data: string): string | null => {
  const indexKey = hashKey(data);
  const hashAddress = hash(indexKey);
  
  if (hashTable[hashAddress] !== null) {
    // 순환 탐색으로 키 찾기
    let index = hashAddress;
    let checked = 0;
    while (checked < hashTable.length) {
      if (hashTable[index] === null) {
        // 빈 공간을 만나면 데이터가 없음
        return null;
      } else if (hashTable[index]![0] === indexKey) {
        // 같은 키를 찾으면 값 반환
        return hashTable[index]![1];
      }
      // 다음 인덱스로 이동 (순환)
      index = (index + 1) % hashTable.length;
      checked++;
    }
  }
  
  return null;
};

// 사용 예제
saveData('dk', '01200123123');
saveData('da', '3333333333');

const dkPhone = readData('dk'); // '01200123123'
const daPhone = readData('da'); // '3333333333'`,
  },
  {
    language: 'typescript',
    code: `// 해시 테이블 구현 (체이닝 방식으로 충돌 해결)
// 완전한 해시 테이블 클래스 구현

class HashTable<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private size: number;
  private capacity: number;
  private static readonly DEFAULT_CAPACITY = 16;
  private static readonly LOAD_FACTOR = 0.75;

  constructor(capacity: number = HashTable.DEFAULT_CAPACITY) {
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new Array(capacity).fill(null).map(() => []);
  }

  // 해시 함수
  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      // hash << 5: 비트 왼쪽 시프트 연산 (hash를 왼쪽으로 5비트 이동 = hash * 32)
      // (hash << 5) - hash = hash * 32 - hash = hash * 31
      // 31은 소수이므로 해시 분산이 좋아짐
      hash = (hash << 5) - hash + keyString.charCodeAt(i);
      hash = hash & hash; // 32비트 정수로 변환 (오버플로우 방지)
    }
    return Math.abs(hash) % this.capacity;
  }

  // 키-값 쌍 추가 또는 업데이트 (평균 O(1), 최악 O(n))
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // 이미 존재하는 키인지 확인
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // 업데이트
        return;
      }
    }

    // 새로운 키-값 쌍 추가
    bucket.push([key, value]);
    this.size++;

    // 로드 팩터가 너무 높으면 리사이징
    if (this.size / this.capacity > HashTable.LOAD_FACTOR) {
      this.resize();
    }
  }

  // 값 가져오기 (평균 O(1), 최악 O(n))
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) {
        return v;
      }
    }

    return undefined;
  }

  // 키-값 쌍 삭제 (평균 O(1), 최악 O(n))
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  // 키 존재 여부 확인
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  // 해시 테이블 크기
  getSize(): number {
    return this.size;
  }

  // 리사이징 (용량 확장)
  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    // 모든 요소를 다시 삽입
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}

// 사용 예제
const hashTable = new HashTable<string, number>();
hashTable.set('apple', 5);
hashTable.set('banana', 3);
hashTable.set('cherry', 8);
const appleValue = hashTable.get('apple'); // 5
const hasBanana = hashTable.has('banana'); // true
hashTable.delete('cherry');
const size = hashTable.getSize(); // 2`,
  },
];
