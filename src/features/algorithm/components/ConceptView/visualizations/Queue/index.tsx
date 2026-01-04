'use client';

import { useState } from 'react';
import { QueueType, QueueVisualizationProps } from './types';
import QueueFIFO from './QueueFIFO';
import PriorityQueue from './PriorityQueue';

const QueueVisualization = ({}: QueueVisualizationProps = {}) => {
  const [queueType, setQueueType] = useState<QueueType>('fifo');

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">큐 시각화</h2>
        <p className="text-gray-600 mb-6">
          큐의 다양한 연산을 시각적으로 확인해보세요. 각 버튼을 클릭하면 해당 연산이 애니메이션으로 표시됩니다.
        </p>
      </div>

      {/* 큐 타입 선택 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">큐 타입 선택</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setQueueType('fifo')}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                queueType === 'fifo'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              FIFO 큐
            </button>
            <button
              onClick={() => setQueueType('priority')}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                queueType === 'priority'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              우선순위 큐
            </button>
          </div>
        </div>
      </div>

      {/* 시각화 컴포넌트 */}
      {queueType === 'fifo' ? <QueueFIFO /> : <PriorityQueue />}
    </div>
  );
};

export default QueueVisualization;
