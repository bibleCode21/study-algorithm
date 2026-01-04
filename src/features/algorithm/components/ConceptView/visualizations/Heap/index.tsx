'use client';

import { useState } from 'react';
import { HeapType, HeapVisualizationProps } from './types';
import { insertToHeap, popFromHeap, getLeftChildIndex, getRightChildIndex } from './utils';

const INITIAL_HEAP: number[] = [];

interface TreeNode {
  value: number;
  index: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

const HeapVisualization = ({}: HeapVisualizationProps = {}) => {
  const [heap, setHeap] = useState<number[]>(INITIAL_HEAP);
  const [heapType, setHeapType] = useState<HeapType>('max');
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const animate = (callback: () => void, duration = 600) => {
    setIsAnimating(true);
    callback();
    setTimeout(() => {
      setIsAnimating(false);
      setHighlightedIndex(null);
    }, duration);
  };

  // 힙을 트리 구조로 변환
  const buildTree = (heap: number[], index: number): TreeNode | null => {
    if (index >= heap.length) return null;

    return {
      value: heap[index],
      index,
      left: buildTree(heap, getLeftChildIndex(index)),
      right: buildTree(heap, getRightChildIndex(index)),
    };
  };

  // 트리 레벨별로 노드를 그룹화
  const getNodesByLevel = (root: TreeNode | null): (TreeNode | null)[][] => {
    if (!root) return [];

    const levels: (TreeNode | null)[][] = [];
    const queue: (TreeNode | null)[] = [root];

    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel: (TreeNode | null)[] = [];

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift() || null;
        currentLevel.push(node);

        if (node) {
          queue.push(node.left || null);
          queue.push(node.right || null);
        } else {
          queue.push(null, null);
        }
      }

      // 레벨에 실제 노드가 하나라도 있으면 추가
      if (currentLevel.some((n) => n !== null)) {
        levels.push(currentLevel);
      } else {
        break;
      }
    }

    return levels;
  };

  // Insert: 힙에 값 추가
  const insert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('올바른 숫자를 입력해주세요.');
      return;
    }

    animate(() => {
      const newHeap = insertToHeap(heap, value, heapType);
      setHighlightedIndex(newHeap.length - 1);
      setTimeout(() => {
        setHeap(newHeap);
        setInputValue('');
      }, 300);
    });
  };

  // Pop: 힙에서 루트 제거
  const pop = () => {
    if (heap.length === 0) return;

    animate(() => {
      setHighlightedIndex(0);
      setTimeout(() => {
        const { newHeap } = popFromHeap(heap, heapType);
        setHeap(newHeap);
      }, 300);
    });
  };

  // Peek: 루트 값 확인
  const peek = () => {
    if (heap.length === 0) return;

    animate(() => {
      setHighlightedIndex(0);
    });
  };

  const reset = () => {
    setHeap(INITIAL_HEAP);
    setInputValue('');
  };

  const root = buildTree(heap, 0);
  const levels = getNodesByLevel(root);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">힙 시각화</h2>
        <p className="text-gray-600 mb-6">
          힙(Heap)의 완전 이진 트리 구조와 연산을 시각적으로 확인해보세요. 각 버튼을 클릭하면 해당 연산이 애니메이션으로 표시됩니다.
        </p>
      </div>

      {/* 힙 타입 선택 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">힙 타입 선택</h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setHeapType('max');
                setHeap([]);
                setInputValue('');
              }}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                heapType === 'max'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              최대 힙 (Max Heap)
            </button>
            <button
              onClick={() => {
                setHeapType('min');
                setHeap([]);
                setInputValue('');
              }}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                heapType === 'min'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              최소 힙 (Min Heap)
            </button>
          </div>
        </div>
      </div>

      {/* 힙 트리 시각화 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {heapType === 'max' ? '최대 힙' : '최소 힙'} 트리 구조
        </h3>

        {heap.length === 0 ? (
          <div className="text-gray-400 text-sm py-12 text-center">힙이 비어있습니다</div>
        ) : (
          <div className="relative py-8 overflow-x-auto" style={{ minHeight: `${levels.length * 120}px` }}>
            {/* 연결선 SVG */}
            <svg
              className="absolute top-0 left-0 w-full h-full"
              style={{ pointerEvents: 'none', overflow: 'visible' }}
            >
              {levels.map((level, levelIndex) => {
                if (levelIndex === 0) return null;

                return level.map((node, nodeIndex) => {
                  if (!node) return null;

                  const parentIndex = Math.floor((node.index - 1) / 2);
                  const parentLevel = levelIndex - 1;
                  
                  // 부모 노드를 찾기
                  let parentNodeInLevel = null;
                  let parentNodeIndexInLevel = -1;
                  for (let i = 0; i < levels[parentLevel].length; i++) {
                    if (levels[parentLevel][i]?.index === parentIndex) {
                      parentNodeInLevel = levels[parentLevel][i];
                      parentNodeIndexInLevel = i;
                      break;
                    }
                  }

                  if (!parentNodeInLevel || parentNodeIndexInLevel < 0) return null;

                  // 노드 크기와 간격 설정
                  const nodeSize = 80;
                  const levelHeight = 120;
                  const maxLevelWidth = Math.pow(2, levels.length - 1);
                  const containerWidth = maxLevelWidth * nodeSize * 2;
                  
                  // 각 레벨의 노드 간격 계산
                  const getNodeSpacing = (levelIdx: number) => {
                    const nodesInLevel = Math.pow(2, levelIdx);
                    return containerWidth / (nodesInLevel + 1);
                  };

                  const parentSpacing = getNodeSpacing(parentLevel);
                  const childSpacing = getNodeSpacing(levelIndex);

                  // 부모와 자식의 X 좌표 계산 (중앙 정렬)
                  const parentX = (parentNodeIndexInLevel + 1) * parentSpacing;
                  const childX = (nodeIndex + 1) * childSpacing;

                  // Y 좌표 계산
                  const parentY = parentLevel * levelHeight + nodeSize / 2 + 40;
                  const childY = levelIndex * levelHeight + nodeSize / 2 + 40;

                  return (
                    <line
                      key={`line-${node.index}`}
                      x1={parentX}
                      y1={parentY}
                      x2={childX}
                      y2={childY}
                      stroke="#9ca3af"
                      strokeWidth="2"
                    />
                  );
                });
              })}
            </svg>

            {/* 노드들 */}
            {levels.map((level, levelIndex) => {
              const maxLevelWidth = Math.pow(2, levels.length - 1);
              const containerWidth = maxLevelWidth * 80 * 2;
              const nodesInLevel = Math.pow(2, levelIndex);
              const nodeSpacing = containerWidth / (nodesInLevel + 1);

              return (
                <div
                  key={levelIndex}
                  className="relative flex items-start justify-center"
                  style={{
                    height: '120px',
                    width: '100%',
                  }}
                >
                  {level.map((node, nodeIndex) => {
                    if (!node) {
                      return (
                        <div
                          key={`empty-${nodeIndex}`}
                          className="absolute"
                          style={{
                            left: `${(nodeIndex + 1) * nodeSpacing - 40}px`,
                            width: '80px',
                            height: '80px',
                          }}
                        />
                      );
                    }

                    const isHighlighted = highlightedIndex === node.index;
                    const nodeX = (nodeIndex + 1) * nodeSpacing;

                    return (
                      <div
                        key={node.index}
                        className="absolute flex flex-col items-center"
                        style={{
                          left: `${nodeX - 40}px`,
                          top: '40px',
                        }}
                      >
                        {/* 노드 */}
                        <div
                          className={`relative w-20 h-20 flex items-center justify-center rounded-full border-2 font-mono font-bold text-lg transition-all duration-300 z-10 ${
                            isHighlighted
                              ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-xl'
                              : 'bg-gray-50 text-gray-900 border-gray-300 shadow-md'
                          }`}
                          style={{
                            boxShadow: isHighlighted
                              ? '0 4px 12px rgba(59, 130, 246, 0.5)'
                              : '0 2px 4px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <span>{node.value}</span>
                        </div>
                        {/* 인덱스 표시 */}
                        <div className="text-xs text-gray-500 mt-1">[{node.index}]</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* 배열 표현 */}
        {heap.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">배열 표현</h4>
            <div className="flex gap-2 flex-wrap">
              {heap.map((value, index) => {
                const isHighlighted = highlightedIndex === index;
                return (
                  <div
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center rounded border-2 font-mono font-bold text-sm transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-blue-500 text-white border-blue-600 scale-110'
                        : 'bg-gray-50 text-gray-900 border-gray-300'
                    }`}
                  >
                    <span>{value}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              인덱스: {heap.map((_, i) => i).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* 컨트롤 버튼 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">연산</h3>
        <div className="space-y-4">
          {/* Insert */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <span className="text-sm font-semibold text-gray-700">insert(value)</span>
              <span className="ml-2 text-xs text-gray-500">(O(log n))</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    insert();
                  }
                }}
                placeholder="값 입력"
                disabled={isAnimating}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed w-32"
              />
              <button
                onClick={insert}
                disabled={isAnimating || !inputValue}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                추가
              </button>
            </div>
          </div>

          {/* Pop */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <span className="text-sm font-semibold text-gray-700">pop()</span>
              <span className="ml-2 text-xs text-gray-500">(O(log n))</span>
            </div>
            <div>
              <button
                onClick={pop}
                disabled={isAnimating || heap.length === 0}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                제거
              </button>
            </div>
          </div>

          {/* Peek */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <span className="text-sm font-semibold text-gray-700">peek()</span>
              <span className="ml-2 text-xs text-gray-500">(O(1))</span>
            </div>
            <div>
              <button
                onClick={peek}
                disabled={isAnimating || heap.length === 0}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                확인
              </button>
            </div>
          </div>

          {/* Reset */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
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

export default HeapVisualization;
