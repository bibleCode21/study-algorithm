'use client';

import { useState } from 'react';
import { ArrayType, ArrayVisualizationProps } from './types';
import Array1D from './Array1D';
import Array2D from './Array2D';

const ArrayVisualization = ({}: ArrayVisualizationProps = {}) => {
  const [arrayType, setArrayType] = useState<ArrayType>('1d');

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">배열 시각화</h2>
        <p className="text-gray-600 mb-6">
          배열의 다양한 연산을 시각적으로 확인해보세요. 각 버튼을 클릭하면 해당 연산이 애니메이션으로 표시됩니다.
        </p>
      </div>

      {/* 배열 타입 선택 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">배열 타입 선택</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setArrayType('1d')}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                arrayType === '1d'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1차원 배열
            </button>
            <button
              onClick={() => setArrayType('2d')}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                arrayType === '2d'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              2차원 배열
            </button>
          </div>
        </div>
      </div>

      {/* 시각화 컴포넌트 */}
      {arrayType === '1d' ? <Array1D /> : <Array2D />}
    </div>
  );
};

export default ArrayVisualization;
