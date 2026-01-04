'use client';

import { useState } from 'react';
import { LinkedListVisualizationProps, LinkedListType } from './types';
import SinglyLinkedList from './SinglyLinkedList';
import DoublyLinkedList from './DoublyLinkedList';

const LinkedListVisualization = ({}: LinkedListVisualizationProps = {}) => {
  const [listType, setListType] = useState<LinkedListType>('singly');

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">연결 리스트 시각화</h2>
        <p className="text-gray-600 mb-6">
          연결 리스트의 다양한 연산을 시각적으로 확인해보세요. 각 버튼을 클릭하면 해당 연산이 애니메이션으로 표시됩니다.
        </p>
      </div>

      {/* 리스트 타입 선택 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">리스트 타입 선택</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setListType('singly')}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                listType === 'singly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              단일 연결 리스트
            </button>
            <button
              onClick={() => setListType('doubly')}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                listType === 'doubly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              이중 연결 리스트
            </button>
          </div>
        </div>
      </div>

      {/* 시각화 컴포넌트 */}
      {listType === 'singly' ? <SinglyLinkedList /> : <DoublyLinkedList />}
    </div>
  );
};

export default LinkedListVisualization;
