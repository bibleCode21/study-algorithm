import { CodeExample } from '@/features/algorithm/types/algorithm';

export const code: CodeExample[] = [
  {
    language: 'typescript',
    code: `// 해시 테이블 구현 (체이닝 방식으로 충돌 해결)
class HashTable<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private size: number;
  private capacity: number;

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new Array(capacity).fill(null).map(() => []);
  }

  // 해시 함수
  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) - hash + keyString.charCodeAt(i);
      hash = hash & hash; // 32비트 정수로 변환
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
    if (this.size / this.capacity > 0.75) {
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
console.log(hashTable.get('apple')); // 5
console.log(hashTable.has('banana')); // true
hashTable.delete('cherry');
console.log(hashTable.getSize()); // 2`,
  },
];

