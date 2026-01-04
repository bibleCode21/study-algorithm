'use client';

import { useState } from 'react';

const INITIAL_ARRAY = [1, 2, 3, 4, 5];

const Array1D = () => {
  const [array, setArray] = useState<number[]>(INITIAL_ARRAY);
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
        setArray([0, ...array.map((v, i) => i + 1)]);
      }, 300);
    });
  };

  const shift = () => {
    if (array.length === 0) return;
    animate(() => {
      setHighlightedIndex(0);
      setTimeout(() => {
        setArray(array.slice(1).map((v, i) => i + 1));
      }, 300);
    });
  };

  // 특정 위치 연산
  const insertAt = (index: number) => {
    if (index < 0 || index > array.length) return;
    animate(() => {
      setHighlightedIndex(index);
      setTimeout(() => {
        const newArray = [...array];
        newArray.splice(index, 0, 99);
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
                  : 'bg-gray-50 text-gray-900 border-gray-300'
              }`}
            >
              <span>{value}</span>
              <div className="absolute -bottom-6 text-xs text-gray-500 font-normal">
                [{index}]
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">끝에서 연산 (O(1))</h4>
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
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">앞에서 연산 (O(n))</h4>
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
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">특정 위치 연산</h4>
          <div className="flex gap-2 flex-wrap items-center">
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
        </div>

        <div>
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
