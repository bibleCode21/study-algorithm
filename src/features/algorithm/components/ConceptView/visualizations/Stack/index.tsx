'use client';

import { useState } from 'react';

const INITIAL_STACK: number[] = [];

const StackVisualization = () => {
  const [stack, setStack] = useState<number[]>(INITIAL_STACK);
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

  // Push: 스택에 데이터 추가
  const push = () => {
    animate(() => {
      setHighlightedIndex(stack.length);
      setTimeout(() => {
        setStack([...stack, stack.length + 1]);
      }, 300);
    });
  };

  // Pop: 스택에서 데이터 제거
  const pop = () => {
    if (stack.length === 0) return;
    animate(() => {
      setHighlightedIndex(stack.length - 1);
      setTimeout(() => {
        setStack(stack.slice(0, -1));
      }, 300);
    });
  };

  // Peek: 가장 위의 데이터 확인 (제거하지 않음)
  const peek = () => {
    if (stack.length === 0) return;
    animate(() => {
      setHighlightedIndex(stack.length - 1);
      setTimeout(() => {
        // peek은 데이터를 변경하지 않으므로 상태 변경 없음
      }, 300);
    });
  };

  const reset = () => {
    setStack(INITIAL_STACK);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">스택 시각화</h2>
        <p className="text-gray-600 mb-6">
          스택의 LIFO(Last-In, First-Out) 동작을 시각적으로 확인해보세요. 각 버튼을 클릭하면 해당 연산이 애니메이션으로 표시됩니다.
        </p>
      </div>

      {/* 스택 표시 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">스택 시각화</h3>
        
        <div className="mb-10">
          <div className="flex flex-col items-center min-h-[300px] justify-end">
            {/* Top 표시 */}
            {stack.length > 0 && (
              <div className="mb-2 text-xs font-semibold text-gray-500">Top</div>
            )}
            
            {/* 스택 요소들 */}
            <div className="flex flex-col-reverse items-center gap-0">
              {stack.length === 0 ? (
                <div className="text-gray-400 text-sm py-8">스택이 비어있습니다</div>
              ) : (
                stack.map((value, index) => {
                  // 스택의 실제 인덱스 (아래에서 위로)
                  const stackIndex = stack.length - 1 - index;
                  const isHighlighted = highlightedIndex === stackIndex;
                  
                  return (
                    <div
                      key={`${index}-${value}`}
                      className={`relative w-32 h-12 flex items-center justify-center rounded-t-lg border-2 border-b-0 font-mono font-bold text-lg transition-all duration-300 ${
                        isHighlighted
                          ? 'bg-blue-500 text-white border-blue-600 scale-105 shadow-xl z-10'
                          : 'bg-gray-50 text-gray-900 border-gray-300 shadow-md'
                      }`}
                      style={{
                        // 쌓인 느낌을 주기 위한 그림자와 오프셋
                        boxShadow: isHighlighted
                          ? '0 4px 12px rgba(59, 130, 246, 0.5)'
                          : '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                        marginBottom: index === 0 ? '0' : '-2px', // 박스들이 겹치도록
                        zIndex: isHighlighted ? 20 : stack.length - index,
                      }}
                    >
                      <span>{value}</span>
                    </div>
                  );
                })
              )}
            </div>
            
            {/* Bottom 표시 (바닥) */}
            <div className="mt-2 w-32 h-4 bg-gray-300 rounded-b-lg border-2 border-t-0 border-gray-400"></div>
            <div className="mt-1 text-xs font-semibold text-gray-500">Bottom</div>
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
                    <span className="text-sm font-semibold text-gray-700">push()</span>
                    <span className="ml-2 text-xs text-gray-500">(O(1))</span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={push}
                      disabled={isAnimating}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      push() 추가
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="text-sm font-semibold text-gray-700">pop()</span>
                    <span className="ml-2 text-xs text-gray-500">(O(1))</span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={pop}
                      disabled={isAnimating || stack.length === 0}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      pop() 제거
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
                      disabled={isAnimating || stack.length === 0}
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
    </div>
  );
};

export default StackVisualization;
