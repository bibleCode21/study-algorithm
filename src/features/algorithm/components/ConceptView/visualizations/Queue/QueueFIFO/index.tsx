'use client';

import { useState } from 'react';

const INITIAL_QUEUE: number[] = [];

const QueueFIFO = () => {
  const [queue, setQueue] = useState<number[]>(INITIAL_QUEUE);
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

  // Enqueue: 큐에 데이터 추가 (뒤에 추가)
  const enqueue = () => {
    animate(() => {
      const newIndex = queue.length;
      setHighlightedIndex(newIndex);
      setTimeout(() => {
        setQueue([...queue, queue.length + 1]);
      }, 300);
    });
  };

  // Dequeue: 큐에서 데이터 제거 (앞에서 제거)
  const dequeue = () => {
    if (queue.length === 0) return;
    animate(() => {
      setHighlightedIndex(0);
      setTimeout(() => {
        setQueue(queue.slice(1));
      }, 300);
    });
  };

  // Front: 가장 앞에 있는 데이터 확인 (제거하지 않음)
  const front = () => {
    if (queue.length === 0) return;
    animate(() => {
      setHighlightedIndex(0);
      setTimeout(() => {
        // front는 데이터를 변경하지 않으므로 상태 변경 없음
      }, 300);
    });
  };

  const reset = () => {
    setQueue(INITIAL_QUEUE);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">FIFO 큐 시각화</h3>
      
      <div className="mb-10">
        <div className="flex flex-col items-center">
          {/* Front와 Rear 표시 */}
          <div className="w-full max-w-2xl mb-4">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-500 mb-1">Front</div>
                <div className="w-16 h-8 bg-blue-100 border-2 border-blue-300 rounded"></div>
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-500 mb-1">Rear</div>
                <div className="w-16 h-8 bg-green-100 border-2 border-green-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* 큐 요소들 */}
          <div className="w-full max-w-2xl min-h-[120px]">
            {queue.length === 0 ? (
              <div className="text-center text-gray-400 text-sm py-12 border-2 border-dashed border-gray-300 rounded-lg min-h-[120px] flex items-center justify-center">
                큐가 비어있습니다
              </div>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 min-h-[120px] pl-2">
                {queue.map((value, index) => {
                  const isHighlighted = highlightedIndex === index;
                  const isFront = index === 0;
                  const isRear = index === queue.length - 1;
                  
                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center rounded-lg border-2 font-mono font-bold text-lg transition-all duration-300 ${
                        isHighlighted
                          ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-xl z-10'
                          : 'bg-gray-50 text-gray-900 border-gray-300 shadow-md'
                      }`}
                      style={{
                        transformOrigin: 'center center',
                        boxShadow: isHighlighted
                          ? '0 4px 12px rgba(59, 130, 246, 0.5)'
                          : '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <span>{value}</span>
                      {isFront && (
                        <span className="absolute -top-5 text-xs font-semibold text-blue-600">Front</span>
                      )}
                      {isRear && (
                        <span className="absolute -bottom-5 text-xs font-semibold text-green-600">Rear</span>
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
                <th className="text-left py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700 break-keep">연산</th>
                <th className="text-left py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700 break-keep">버튼</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">enqueue()</span>
                  <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">(O(1))</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <button
                    onClick={enqueue}
                    disabled={isAnimating}
                    className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                  >
                    enqueue() 추가
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">dequeue()</span>
                  <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">(O(1))</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <button
                    onClick={dequeue}
                    disabled={isAnimating || queue.length === 0}
                    className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                  >
                    dequeue() 제거
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">front()</span>
                  <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">(O(1))</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <button
                    onClick={front}
                    disabled={isAnimating || queue.length === 0}
                    className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                  >
                    front() 확인
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-3 md:mt-4">
          <button
            onClick={reset}
            disabled={isAnimating}
            className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueueFIFO;
