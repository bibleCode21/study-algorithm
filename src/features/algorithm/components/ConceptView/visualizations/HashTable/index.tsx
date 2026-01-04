'use client';

import { useState, useEffect, useRef } from 'react';

type HashNode = {
  key: number;
  value: string;
  id: string;
};

type Bucket = HashNode[];

const INITIAL_CAPACITY = 7; // 초기 해시 테이블 크기
const LOAD_FACTOR = 0.75; // 리사이징 트리거 로드 팩터

const HashTable = () => {
  const [capacity, setCapacity] = useState<number>(INITIAL_CAPACITY);
  const [table, setTable] = useState<Bucket[]>(() => Array(INITIAL_CAPACITY).fill(null).map(() => []));
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedBucket, setHighlightedBucket] = useState<number | null>(null);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [hashCalculation, setHashCalculation] = useState<{ key: number; hash: number } | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [nextId, setNextId] = useState(1);
  const nextIdRef = useRef(1);
  const [inputKey, setInputKey] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('');
  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // 컴포넌트 unmount 시 모든 타이머 정리
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, []);

  // 해시 키 생성 함수 (code.ts의 패턴 반영)
  // 숫자 키를 더 나은 해시 값으로 변환
  const hashKey = (key: number): number => {
    // 숫자를 문자열로 변환하여 해시 계산 (문자열 해시 패턴 적용)
    const keyString = String(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      // hash << 5: 비트 왼쪽 시프트 연산 (hash를 왼쪽으로 5비트 이동 = hash * 32)
      // (hash << 5) - hash = hash * 32 - hash = hash * 31
      // 31은 소수이므로 해시 분산이 좋아짐
      hash = ((hash << 5) - hash) + keyString.charCodeAt(i);
      hash = hash & hash; // 32비트 정수로 변환 (오버플로우 방지)
    }
    return Math.abs(hash);
  };

  // 해시 함수: hashKey로 생성된 해시 값을 버킷 인덱스로 변환
  const hashFunction = (key: number, currentCapacity: number = capacity): number => {
    const hashValue = hashKey(key);
    return hashValue % currentCapacity;
  };

  // 리사이징 함수 (용량 확장)
  const resize = (currentTable: Bucket[], currentCapacity: number): Bucket[] => {
    const newCapacity = currentCapacity * 2;
    const newTable: Bucket[] = Array(newCapacity).fill(null).map(() => []);

    // 모든 요소를 새로운 용량으로 재해싱하여 재삽입
    for (const bucket of currentTable) {
      for (const node of bucket) {
        const newHash = hashFunction(node.key, newCapacity);
        newTable[newHash].push(node);
      }
    }

    return newTable;
  };

  // 타이머를 안전하게 등록하고 정리하는 헬퍼 함수
  const safeSetTimeout = (callback: () => void, delay: number): ReturnType<typeof setTimeout> => {
    const timeout = setTimeout(() => {
      timeoutRefs.current.delete(timeout);
      callback();
    }, delay);
    timeoutRefs.current.add(timeout);
    return timeout;
  };

  const animate = (callback: () => void, duration = 800) => {
    setIsAnimating(true);
    callback();
    safeSetTimeout(() => {
      setIsAnimating(false);
      setHighlightedBucket(null);
      setHighlightedNodeId(null);
      setHashCalculation(null);
    }, duration);
  };

  // Put: 키-값 쌍 추가
  const put = () => {
    // 입력 검증
    if (!inputValue.trim()) {
      alert('값을 입력해주세요.');
      return;
    }

    if (isNaN(inputKey) || !isFinite(inputKey)) {
      alert('유효한 숫자 키를 입력해주세요.');
      return;
    }

    const key = Math.floor(inputKey); // 정수로 변환
    const value = inputValue.trim();
    const hash = hashFunction(key);

    // 해시 인덱스 범위 검증
    if (hash < 0 || hash >= capacity) {
      alert('해시 계산 오류가 발생했습니다.');
      return;
    }

    animate(() => {
      // 해시 계산 표시
      setHashCalculation({ key, hash });
      setHighlightedBucket(hash);

      safeSetTimeout(() => {
        setTable((currentTable) => {
          let newTable = currentTable.map((bucket, index) => {
            if (index !== hash) return [...bucket];

            // 같은 키가 이미 있는지 확인
            const existingIndex = bucket.findIndex((node) => node.key === key);
            
            if (existingIndex !== -1) {
              // 기존 노드 업데이트
              const newBucket = [...bucket];
              newBucket[existingIndex] = {
                ...newBucket[existingIndex],
                value,
              };
              setHighlightedNodeId(newBucket[existingIndex].id);
              return newBucket;
            } else {
              // 새 노드 추가 - ref를 사용하여 동기적으로 ID 생성
              const currentId = nextIdRef.current;
              const newNodeId = `node-${currentId}`;
              nextIdRef.current = currentId + 1;
              setNextId(nextIdRef.current);
              setHighlightedNodeId(newNodeId);
              
              const newNode: HashNode = {
                key,
                value,
                id: newNodeId,
              };
              return [...bucket, newNode];
            }
          });

          // 로드 팩터 체크 및 리사이징
          const totalItems = newTable.reduce((sum, bucket) => sum + bucket.length, 0);
          const currentCapacity = capacity;
          const loadFactor = totalItems / currentCapacity;

          if (loadFactor > LOAD_FACTOR) {
            setIsResizing(true);
            safeSetTimeout(() => {
              const resizedTable = resize(newTable, currentCapacity);
              setCapacity(currentCapacity * 2);
              setTable(resizedTable);
              safeSetTimeout(() => {
                setIsResizing(false);
              }, 300);
            }, 300);
          }

          return newTable;
        });
      }, 400);
    });
  };

  // Get: 키로 값 조회
  const get = () => {
    // 입력 검증
    if (isNaN(inputKey) || !isFinite(inputKey)) {
      alert('유효한 숫자 키를 입력해주세요.');
      return;
    }

    const key = Math.floor(inputKey); // 정수로 변환
    const hash = hashFunction(key);

    // 해시 인덱스 범위 검증
    if (hash < 0 || hash >= capacity) {
      alert('해시 계산 오류가 발생했습니다.');
      return;
    }

    animate(() => {
      setHashCalculation({ key, hash });
      setHighlightedBucket(hash);

      safeSetTimeout(() => {
        // 함수형 업데이트를 사용하여 최신 상태 참조
        setTable((currentTable) => {
          const bucket = currentTable[hash];
          if (!bucket) {
            safeSetTimeout(() => {
              setHighlightedBucket(null);
            }, 300);
            return currentTable; // 상태 변경 없음
          }

          const node = bucket.find((n) => n.key === key);
          
          if (node) {
            setHighlightedNodeId(node.id);
          } else {
            // 노드를 찾지 못한 경우 잠시 빨간색으로 표시
            safeSetTimeout(() => {
              setHighlightedBucket(null);
            }, 300);
          }
          return currentTable; // 상태 변경 없음
        });
      }, 400);
    });
  };

  // Remove: 키로 항목 제거
  const remove = () => {
    // 입력 검증
    if (isNaN(inputKey) || !isFinite(inputKey)) {
      alert('유효한 숫자 키를 입력해주세요.');
      return;
    }

    const key = Math.floor(inputKey); // 정수로 변환
    const hash = hashFunction(key);

    // 해시 인덱스 범위 검증
    if (hash < 0 || hash >= capacity) {
      alert('해시 계산 오류가 발생했습니다.');
      return;
    }

    animate(() => {
      setHashCalculation({ key, hash });
      setHighlightedBucket(hash);

      safeSetTimeout(() => {
        // 함수형 업데이트를 사용하여 최신 상태 참조
        setTable((currentTable) => {
          const bucket = currentTable[hash];
          if (!bucket) {
            safeSetTimeout(() => {
              setHighlightedBucket(null);
            }, 300);
            return currentTable;
          }

          const node = bucket.find((n) => n.key === key);
          
          if (!node) {
            safeSetTimeout(() => {
              setHighlightedBucket(null);
            }, 300);
            return currentTable;
          }

          setHighlightedNodeId(node.id);

          // 노드를 찾았으므로 제거 애니메이션 후 실제 제거
          safeSetTimeout(() => {
            setTable((prevTable) => {
              const newTable = prevTable.map((b, index) => {
                if (index !== hash) return [...b];
                return b.filter((n) => n.key !== key);
              });
              return newTable;
            });
          }, 300);
          
          return currentTable; // 첫 번째 setTable은 하이라이트만 처리
        });
      }, 400);
    });
  };

  const reset = () => {
    setCapacity(INITIAL_CAPACITY);
    setTable(Array(INITIAL_CAPACITY).fill(null).map(() => []));
    nextIdRef.current = 1;
    setNextId(1);
    setInputKey(1);
    setInputValue('');
    setIsResizing(false);
  };

  // 전체 항목 수 계산
  const totalItems = table.reduce((sum, bucket) => sum + bucket.length, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">해시 테이블 시각화 (체이닝 방식)</h3>
      <p className="text-sm text-gray-600 mb-4">
        해시 키 생성: hashKey(key)는 문자열 해시 함수를 사용하여 키를 해시 값으로 변환합니다. 
        해시 함수: hash(key) = hashKey(key) % capacity. 
        충돌은 체이닝(연결 리스트) 방식으로 해결합니다.
        로드 팩터가 {LOAD_FACTOR}를 초과하면 자동으로 용량을 2배로 확장합니다.
      </p>

      {/* 해시 계산 표시 */}
      {hashCalculation && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm font-mono space-y-1">
            <div>
              <span className="text-gray-700">hashKey({hashCalculation.key}) = </span>
              <span className="text-purple-600 font-bold">{hashKey(hashCalculation.key)}</span>
              <span className="text-gray-500 text-xs ml-2">(문자열 해시 함수 적용)</span>
            </div>
            <div>
              <span className="text-gray-700">hash({hashCalculation.key}) = </span>
              <span className="text-blue-600 font-bold">{hashKey(hashCalculation.key)} % {capacity} = {hashCalculation.hash}</span>
            </div>
          </div>
        </div>
      )}

      {/* 리사이징 알림 */}
      {isResizing && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm font-semibold text-yellow-800">
            리사이징 중... 용량을 {capacity}에서 {capacity * 2}로 확장합니다.
          </div>
        </div>
      )}

      {/* 해시 테이블 시각화 */}
      <div className="mb-10">
        <div 
          className={`grid gap-3 mb-4`}
          style={{ gridTemplateColumns: `repeat(${capacity}, minmax(0, 1fr))` }}
        >
          {table.map((bucket, bucketIndex) => {
            const isHighlighted = highlightedBucket === bucketIndex;
            
            return (
              <div
                key={bucketIndex}
                className={`flex flex-col border-2 rounded-lg transition-all duration-300 ${
                  isHighlighted
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {/* 버킷 인덱스 */}
                <div className={`text-center py-2 border-b-2 font-mono font-bold text-sm ${
                  isHighlighted
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-100 border-gray-300 text-gray-700'
                }`}>
                  [{bucketIndex}]
                </div>
                
                {/* 체인된 노드들 */}
                <div className="min-h-[120px] p-2 flex flex-col gap-2">
                  {bucket.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-xs text-gray-400">empty</span>
                    </div>
                  ) : (
                    bucket.map((node, nodeIndex) => {
                      const isHighlightedNode = highlightedNodeId === node.id;
                      const isFirst = nodeIndex === 0;
                      
                      return (
                        <div key={node.id} className="relative">
                          {/* 노드 */}
                          <div
                            className={`border-2 rounded p-2 transition-all duration-300 ${
                              isHighlightedNode
                                ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-xl z-10'
                                : 'bg-white text-gray-900 border-gray-300 shadow-sm'
                            }`}
                            style={{
                              transformOrigin: 'center center',
                              boxShadow: isHighlightedNode
                                ? '0 4px 12px rgba(59, 130, 246, 0.5)'
                                : '0 1px 3px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <div className="text-xs font-mono">
                              <div className="font-semibold">key: {node.key}</div>
                              <div className="mt-1">val: {node.value}</div>
                            </div>
                          </div>
                          
                          {/* 체인 연결선 (마지막 노드가 아니면) */}
                          {nodeIndex < bucket.length - 1 && (
                            <div className="flex justify-center my-1">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                className="text-gray-400"
                              >
                                <defs>
                                  <marker
                                    id={`arrow-${node.id}`}
                                    markerWidth="10"
                                    markerHeight="10"
                                    refX="8"
                                    refY="5"
                                    orient="auto"
                                  >
                                    <path d="M0,0 L0,10 L9,5 z" fill="currentColor" />
                                  </marker>
                                </defs>
                                <line
                                  x1="10"
                                  y1="0"
                                  x2="10"
                                  y2="20"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  markerEnd={`url(#arrow-${node.id})`}
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 통계 정보 */}
        <div className="mt-4 text-sm text-gray-600">
          <span>용량: <span className="font-semibold">{capacity}</span></span>
          <span className="ml-4">총 항목 수: <span className="font-semibold">{totalItems}</span></span>
          <span className="ml-4">로드 팩터: <span className={`font-semibold ${(totalItems / capacity) > LOAD_FACTOR ? 'text-red-600' : ''}`}>
            {(totalItems / capacity).toFixed(2)}
          </span></span>
          <span className="ml-4 text-xs text-gray-500">(리사이징 임계값: {LOAD_FACTOR})</span>
        </div>
      </div>

      {/* 입력 폼 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">키 (Key)</label>
            <input
              type="number"
              value={inputKey}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || value === '-') {
                  setInputKey(0);
                  return;
                }
                const numValue = Number(value);
                if (!isNaN(numValue) && isFinite(numValue)) {
                  setInputKey(numValue);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">값 (Value)</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="값을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">연산</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">버튼</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">put(key, value)</span>
                  <span className="ml-2 text-xs text-gray-500">(평균 O(1), 최악 O(n))</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={put}
                    disabled={isAnimating}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    put() 추가/업데이트
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">get(key)</span>
                  <span className="ml-2 text-xs text-gray-500">(평균 O(1), 최악 O(n))</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={get}
                    disabled={isAnimating}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    get() 조회
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">remove(key)</span>
                  <span className="ml-2 text-xs text-gray-500">(평균 O(1), 최악 O(n))</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={remove}
                    disabled={isAnimating}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    remove() 제거
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={reset}
            disabled={isAnimating}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default HashTable;
