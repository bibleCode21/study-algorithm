'use client';

import { useMemo } from 'react';
import { TreeVisualizationProps } from './types';
import { getNodesByLevel, calculateNodePositions } from './utils';
import { useTreeVisualization } from './useTreeVisualization';

const TreeVisualization = ({}: TreeVisualizationProps = {}) => {
  const {
    root,
    inputValues,
    updateInputValue,
    animationState,
    traversalState,
    insert,
    search,
    deleteValueFromTree,
    performTraversal,
    reset,
  } = useTreeVisualization();

  // 트리 시각화를 위한 데이터 준비
  const { levels, nodePositions } = useMemo(() => {
    const levels = getNodesByLevel(root);
    const nodePositions = calculateNodePositions(root);
    return { levels, nodePositions };
  }, [root]);

  const { isAnimating, highlightedNodeId } = animationState;
  const { result: traversalResult, type: traversalType, isActive: isTraversing } = traversalState;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">이진 탐색 트리 (BST) 시각화</h3>
      <p className="text-sm text-gray-600 mb-6">
        이진 탐색 트리의 구조와 연산을 시각적으로 확인해보세요. 각 연산은 애니메이션으로 표시됩니다.
        이진 탐색 트리는 왼쪽 자식 &lt; 부모 &lt; 오른쪽 자식의 속성을 유지합니다.
      </p>

      {/* 트리 시각화 */}
      <div className="mb-10">
        {root === null ? (
          <div className="text-gray-400 text-sm py-12 text-center border-2 border-dashed border-gray-300 rounded-lg">
            트리가 비어있습니다. 값을 추가해보세요.
          </div>
        ) : (
          <div className="relative overflow-x-auto" style={{ minHeight: `${levels.length * 100}px`, minWidth: '100%' }}>
            {/* 연결선 SVG */}
            <svg
              className="absolute top-0 left-0 w-full h-full"
              style={{ pointerEvents: 'none', overflow: 'visible' }}
            >
              {nodePositions.map((pos) => {
                if (!pos.parentId) return null; // 루트 노드는 부모가 없음

                const parentPos = nodePositions.find((p) => p.node.id === pos.parentId);
                if (!parentPos) return null;

                // 노드 중심끼리 연결
                // pos.x, pos.y는 이미 노드의 중심 좌표
                return (
                  <line
                    key={`line-${pos.node.id}`}
                    x1={parentPos.x}
                    y1={parentPos.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="#9ca3af"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            {/* 노드들 */}
            <div className="relative" style={{ minHeight: `${levels.length * 100}px`, paddingTop: '50px' }}>
              {nodePositions.map((pos) => {
                const node = pos.node;
                const isHighlighted = highlightedNodeId === node.id;

                return (
                  <div
                    key={node.id}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${pos.x - 24}px`,
                      top: `${pos.y - 24}px`,
                    }}
                  >
                    {/* 노드 */}
                    <div
                      className={`relative w-12 h-12 flex items-center justify-center rounded-full border-2 font-mono font-semibold text-sm transition-all duration-300 z-10 ${
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
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 순회 결과 표시 */}
      {traversalResult.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm font-semibold text-blue-900 mb-2">
            {traversalType === 'pre-order' && '전위 순회 (Pre-order): '}
            {traversalType === 'in-order' && '중위 순회 (In-order): '}
            {traversalType === 'post-order' && '후위 순회 (Post-order): '}
            {traversalType === 'level-order' && '레벨 순회 (Level-order): '}
          </div>
          <div className="flex gap-2 flex-wrap">
            {traversalResult.map((value, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-blue-500 text-white rounded-md font-mono text-sm"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 연산 컨트롤 */}
      <div className="space-y-6">
        {/* Insert */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-3">
            <span className="text-sm font-semibold text-gray-700">insert(value)</span>
            <span className="ml-2 text-xs text-gray-500">(평균 O(log n), 최악 O(n))</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValues.insert}
              onChange={(e) => updateInputValue('insert', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  insert();
                }
              }}
              placeholder="값 입력"
              disabled={isAnimating || isTraversing}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={insert}
              disabled={isAnimating || isTraversing || !inputValues.insert}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              추가
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-3">
            <span className="text-sm font-semibold text-gray-700">search(value)</span>
            <span className="ml-2 text-xs text-gray-500">(평균 O(log n), 최악 O(n))</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValues.search}
              onChange={(e) => updateInputValue('search', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  search();
                }
              }}
              placeholder="검색할 값"
              disabled={isAnimating || isTraversing}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={search}
              disabled={isAnimating || isTraversing || !inputValues.search}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              검색
            </button>
          </div>
        </div>

        {/* Delete */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-3">
            <span className="text-sm font-semibold text-gray-700">delete(value)</span>
            <span className="ml-2 text-xs text-gray-500">(평균 O(log n), 최악 O(n))</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValues.delete}
              onChange={(e) => updateInputValue('delete', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  deleteValueFromTree();
                }
              }}
              placeholder="삭제할 값"
              disabled={isAnimating || isTraversing}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={deleteValueFromTree}
              disabled={isAnimating || isTraversing || !inputValues.delete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              삭제
            </button>
          </div>
        </div>

        {/* 순회 버튼들 */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-3">
            <span className="text-sm font-semibold text-gray-700">트리 순회 (Traversal)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => performTraversal('pre-order')}
              disabled={isAnimating || isTraversing || !root}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm"
            >
              전위 순회 (Pre-order)
            </button>
            <button
              onClick={() => performTraversal('in-order')}
              disabled={isAnimating || isTraversing || !root}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm"
            >
              중위 순회 (In-order)
            </button>
            <button
              onClick={() => performTraversal('post-order')}
              disabled={isAnimating || isTraversing || !root}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm"
            >
              후위 순회 (Post-order)
            </button>
            <button
              onClick={() => performTraversal('level-order')}
              disabled={isAnimating || isTraversing || !root}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm"
            >
              레벨 순회 (Level-order)
            </button>
          </div>
        </div>

        {/* Reset */}
        <div className="flex justify-end">
          <button
            onClick={reset}
            disabled={isAnimating || isTraversing}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualization;
