'use client';

import { useState } from 'react';

const INITIAL_ARRAY = [1, 2, 3, 4, 5];

const Array1D = () => {
  const [array, setArray] = useState<(number | undefined)[]>(INITIAL_ARRAY);
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

  // 끝에서 연산 (O(1))
  const push = () => {
    animate(() => {
      setHighlightedIndex(array.length);
      setTimeout(() => {
        setArray([...array, array.length + 1]);
      }, 300);
    });
  };

  const pop = () => {
    if (array.length === 0) return;
    animate(() => {
      setHighlightedIndex(array.length - 1);
      setTimeout(() => {
        setArray(array.slice(0, -1));
      }, 300);
    });
  };

  // 앞에서 연산 (O(n))
  const unshift = () => {
    animate(() => {
      setHighlightedIndex(0);
      setTimeout(() => {
        // 배열이 비어있으면 0을 추가, 아니면 첫 번째 값보다 1 작은 값을 앞에 추가
        const firstValue = array.find(v => v !== undefined);
        const newValue = firstValue === undefined ? 0 : firstValue - 1;
        setArray([newValue, ...array]);
      }, 300);
    });
  };

  const shift = () => {
    if (array.length === 0) return;
    animate(() => {
      setHighlightedIndex(0);
      setTimeout(() => {
        // 첫 번째 요소만 제거하고 나머지는 그대로 유지
        setArray(array.slice(1));
      }, 300);
    });
  };

  // 특정 위치 연산
  const insertAt = (index: number) => {
    // 음수 인덱스는 허용하지 않음
    if (index < 0) return;
    animate(() => {
      setHighlightedIndex(index);
      setTimeout(() => {
        const newArray = [...array];
        // 인덱스가 배열 길이보다 크면, 그 사이를 undefined로 채움
        if (index > array.length) {
          // 배열 길이부터 인덱스까지 undefined로 채움
          for (let i = array.length; i < index; i++) {
            newArray[i] = undefined;
          }
          // 인덱스 위치에 값 삽입
          newArray[index] = 99;
        } else {
          // 인덱스가 배열 길이 이하면 splice로 삽입
          newArray.splice(index, 0, 99);
        }
        setArray(newArray);
      }, 300);
    });
  };

  const removeAt = (index: number) => {
    if (index < 0 || index >= array.length) return;
    animate(() => {
      setHighlightedIndex(index);
      setTimeout(() => {
        setArray(array.filter((_, i) => i !== index));
      }, 300);
    });
  };

  const reset = () => {
    setArray(INITIAL_ARRAY);
  };    

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">1차원 배열 시각화</h3>
      
      {/* 배열 표시 */}
      <div className="mb-10">
        <div className="flex items-center gap-2 flex-wrap">
          {array.map((value, index) => (
            <div
              key={`${index}-${value}`}
              className={`relative flex items-center justify-center w-16 h-16 rounded-lg border-2 font-mono font-bold text-lg transition-all duration-300 ${
                highlightedIndex === index
                  ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-lg'
                  : value === undefined
                  ? 'bg-gray-200 text-gray-400 border-gray-300'
                  : 'bg-gray-50 text-gray-900 border-gray-300'
              }`}
            >
              <span>{value === undefined ? 'empty' : value}</span>
              <div className="absolute -bottom-6 text-xs text-gray-500 font-normal">
                [{index}]
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">연산 그룹</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">버튼</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">끝에서 연산</span>
                  <span className="ml-2 text-xs text-gray-500">(O(1))</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={push}
                      disabled={isAnimating}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      push() 추가
                    </button>
                    <button
                      onClick={pop}
                      disabled={isAnimating || array.length === 0}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      pop() 제거
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">앞에서 연산</span>
                  <span className="ml-2 text-xs text-gray-500">(O(n))</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={unshift}
                      disabled={isAnimating}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      unshift() 추가
                    </button>
                    <button
                      onClick={shift}
                      disabled={isAnimating || array.length === 0}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      shift() 제거
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">특정 위치 연산</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => insertAt(2)}
                      disabled={isAnimating}
                      className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      인덱스 2에 삽입
                    </button>
                    <button
                      onClick={() => removeAt(2)}
                      disabled={isAnimating || array.length <= 2}
                      className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      인덱스 2에서 제거
                    </button>
                  </div>
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

export default Array1D;
