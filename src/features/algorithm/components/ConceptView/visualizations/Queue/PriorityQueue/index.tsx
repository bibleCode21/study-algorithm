'use client';

import { useState } from 'react';

type PriorityItem = [number, number]; // [priority, value]

const INITIAL_QUEUE: PriorityItem[] = [];

const PriorityQueue = () => {
  const [queue, setQueue] = useState<PriorityItem[]>(INITIAL_QUEUE);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const animate = (callback: () => void, duration = 600) => {
    setIsAnimating(true);
    callback();
    setTimeout(() => {
      setIsAnimating(false);
      setHighlightedIndex(null);
    }, duration);
  };

  // Enqueue: 우선순위와 함께 큐에 데이터 추가
  const enqueue = () => {
    animate(() => {
      // 랜덤 우선순위 생성 (1-20)
      const priority = Math.floor(Math.random() * 20) + 1;
      const value = queue.length + 1;
      const newItem: PriorityItem = [priority, value];
      
      setTimeout(() => {
        const newQueue = [...queue, newItem];
        // 우선순위 순으로 정렬 (낮은 숫자가 높은 우선순위)
        newQueue.sort((a, b) => a[0] - b[0]);
        setQueue(newQueue);
        // 정렬 후 새로 추가된 아이템의 인덱스 찾기
        const newIndex = newQueue.findIndex(item => item[1] === value);
        setHighlightedIndex(newIndex);
      }, 300);
    });
  };

  // Dequeue: 우선순위가 가장 높은 데이터 제거 (앞에서 제거)
  const dequeue = () => {
    if (queue.length === 0) return;
    animate(() => {
      setHighlightedIndex(0);
      setTimeout(() => {
        setQueue(queue.slice(1));
      }, 300);
    });
  };

  // Peek: 우선순위가 가장 높은 데이터 확인 (제거하지 않음)
  const peek = () => {
    if (queue.length === 0) return;
    animate(() => {
      setHighlightedIndex(0);
      setTimeout(() => {
        // peek은 데이터를 변경하지 않으므로 상태 변경 없음
      }, 300);
    });
  };

  const reset = () => {
    setQueue(INITIAL_QUEUE);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">우선순위 큐 시각화</h3>
      <p className="text-sm text-gray-600 mb-4">
        우선순위가 낮은 숫자일수록 높은 우선순위입니다. enqueue 시 자동으로 우선순위 순으로 정렬됩니다.
      </p>
      
      <div className="mb-10">
        <div className="flex flex-col items-center">
          {/* Front 표시 */}
          <div className="w-full max-w-2xl mb-4">
            <div className="flex justify-start items-center">
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-500 mb-1">Front (최고 우선순위)</div>
                <div className="w-16 h-8 bg-blue-100 border-2 border-blue-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* 큐 요소들 */}
          <div className="w-full max-w-2xl min-h-[140px]">
            {queue.length === 0 ? (
              <div className="text-center text-gray-400 text-sm py-12 border-2 border-dashed border-gray-300 rounded-lg min-h-[140px] flex items-center justify-center">
                큐가 비어있습니다
              </div>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 min-h-[140px] pl-2">
                {queue.map(([priority, value], index) => {
                  const isHighlighted = highlightedIndex === index;
                  const isFront = index === 0;
                  
                  return (
                    <div
                      key={`${index}-${value}-${priority}`}
                      className={`relative flex-shrink-0 w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 font-mono font-bold transition-all duration-300 ${
                        isHighlighted
                          ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-xl z-10'
                          : isFront
                          ? 'bg-yellow-50 text-gray-900 border-yellow-400 shadow-md'
                          : 'bg-gray-50 text-gray-900 border-gray-300 shadow-md'
                      }`}
                      style={{
                        transformOrigin: 'center center',
                      }}
                      style={{
                        boxShadow: isHighlighted
                          ? '0 4px 12px rgba(59, 130, 246, 0.5)'
                          : '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <span className="text-xs text-gray-500 mb-1">P: {priority}</span>
                      <span className="text-lg">{value}</span>
                      {isFront && (
                        <span className="absolute -top-5 text-xs font-semibold text-blue-600">Front</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
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
                  <span className="text-sm font-semibold text-gray-700">enqueue(priority, item)</span>
                  <span className="ml-2 text-xs text-gray-500">(O(n log n))</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={enqueue}
                    disabled={isAnimating}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    enqueue() 추가
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">dequeue()</span>
                  <span className="ml-2 text-xs text-gray-500">(O(1))</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={dequeue}
                    disabled={isAnimating || queue.length === 0}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    dequeue() 제거
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">peek()</span>
                  <span className="ml-2 text-xs text-gray-500">(O(1))</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={peek}
                    disabled={isAnimating || queue.length === 0}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    peek() 확인
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

export default PriorityQueue;
