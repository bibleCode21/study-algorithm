'use client';

import { useState } from 'react';

const INITIAL_ARRAY: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const Array2D = () => {
  const [array, setArray] = useState<number[][]>(INITIAL_ARRAY);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlighted, setHighlighted] = useState<{ row: number; col: number } | null>(null);

  const animate = (callback: () => void, duration = 600) => {
    setIsAnimating(true);
    callback();
    setTimeout(() => {
      setIsAnimating(false);
      setHighlighted(null);
    }, duration);
  };

  // 행 연산
  const insertRow = (rowIndex: number) => {
    if (rowIndex < 0 || rowIndex > array.length) return;
    animate(() => {
      setHighlighted({ row: rowIndex, col: -1 });
      setTimeout(() => {
        const newRow = array[0]?.map((_, i) => array.length * array[0].length + i + 1) || [10, 11, 12];
        const newArray = [...array];
        newArray.splice(rowIndex, 0, newRow);
        setArray(newArray);
      }, 300);
    });
  };

  const removeRow = (rowIndex: number) => {
    if (rowIndex < 0 || rowIndex >= array.length) return;
    animate(() => {
      setHighlighted({ row: rowIndex, col: -1 });
      setTimeout(() => {
        setArray(array.filter((_, i) => i !== rowIndex));
      }, 300);
    });
  };

  // 열 연산
  const insertCol = (colIndex: number) => {
    if (colIndex < 0 || colIndex > array[0]?.length) return;
    animate(() => {
      setHighlighted({ row: -1, col: colIndex });
      setTimeout(() => {
        setArray(
          array.map((row, i) => {
            const newRow = [...row];
            newRow.splice(colIndex, 0, array.length * array[0].length + i + 1);
            return newRow;
          })
        );
      }, 300);
    });
  };

  const removeCol = (colIndex: number) => {
    if (colIndex < 0 || colIndex >= array[0]?.length) return;
    animate(() => {
      setHighlighted({ row: -1, col: colIndex });
      setTimeout(() => {
        setArray(array.map((row) => row.filter((_, i) => i !== colIndex)));
      }, 300);
    });
  };

  const reset = () => {
    setArray(INITIAL_ARRAY);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">2차원 배열 시각화</h3>
      
      {/* 배열 표시 */}
      <div className="mb-10">
        <div className="space-y-2">
          {array.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-2">
              {row.map((value, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}-${value}`}
                  className={`relative flex items-center justify-center w-16 h-16 rounded-lg border-2 font-mono font-bold text-lg transition-all duration-300 ${
                    highlighted?.row === rowIndex && highlighted?.col === -1
                      ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-lg'
                      : highlighted?.row === -1 && highlighted?.col === colIndex
                      ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-lg'
                      : highlighted?.row === rowIndex && highlighted?.col === colIndex
                      ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-lg'
                      : 'bg-gray-50 text-gray-900 border-gray-300'
                  }`}
                >
                  <span>{value}</span>
                  <div className="absolute -bottom-6 text-xs text-gray-500 font-normal whitespace-nowrap">
                    [{rowIndex}][{colIndex}]
                  </div>
                </div>
              ))}
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
                <th className="text-left py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700 break-keep">연산 그룹</th>
                <th className="text-left py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700 break-keep">버튼</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">행 연산</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <div className="flex gap-1.5 md:gap-2 flex-wrap">
                    <button
                      onClick={() => insertRow(1)}
                      disabled={isAnimating}
                      className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                    >
                      행 1에 삽입
                    </button>
                    <button
                      onClick={() => removeRow(1)}
                      disabled={isAnimating || array.length <= 1}
                      className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                    >
                      행 1 제거
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">열 연산</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <div className="flex gap-1.5 md:gap-2 flex-wrap">
                    <button
                      onClick={() => insertCol(1)}
                      disabled={isAnimating}
                      className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                    >
                      열 1에 삽입
                    </button>
                    <button
                      onClick={() => removeCol(1)}
                      disabled={isAnimating || array[0]?.length <= 1}
                      className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                    >
                      열 1 제거
                    </button>
                  </div>
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

export default Array2D;
