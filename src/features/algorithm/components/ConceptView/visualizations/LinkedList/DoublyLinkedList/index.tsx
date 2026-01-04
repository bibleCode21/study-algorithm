'use client';

import { useState } from 'react';
import { Node } from '../types';

const INITIAL_HEAD: Node | null = null;
const INITIAL_TAIL: Node | null = null;

const DoublyLinkedList = () => {
  const [head, setHead] = useState<Node | null>(INITIAL_HEAD);
  const [tail, setTail] = useState<Node | null>(INITIAL_TAIL);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [nextId, setNextId] = useState(1);

  const animate = (callback: () => void, duration = 600) => {
    setIsAnimating(true);
    callback();
    setTimeout(() => {
      setIsAnimating(false);
      setHighlightedNodeId(null);
    }, duration);
  };

  // 리스트를 배열로 변환 (시각화용)
  const toArray = (node: Node | null): Node[] => {
    const result: Node[] = [];
    let current = node;
    while (current !== null) {
      result.push(current);
      current = current.next;
    }
    return result;
  };

  // Append: 리스트 끝에 데이터 추가
  const append = () => {
    animate(() => {
      setTimeout(() => {
        if (head === null) {
          const newNode: Node = {
            id: `node-${nextId}`,
            data: 1,
            next: null,
            prev: null,
          };
          setHead(newNode);
          setTail(newNode);
          setNextId(nextId + 1);
          setHighlightedNodeId(newNode.id);
        } else {
          const nodes = toArray(head);
          const newNode: Node = {
            id: `node-${nextId}`,
            data: nodes.length + 1,
            next: null,
            prev: tail,
          };
          
          // 새로운 리스트 생성
          const newNodes = nodes.map((n, i) => ({
            ...n,
            next: i === nodes.length - 1 ? newNode : n.next,
            prev: n.prev,
          }));
          
          if (tail) {
            tail.next = newNode;
          }
          
          setHead(newNodes[0]);
          setTail(newNode);
          setNextId(nextId + 1);
          setHighlightedNodeId(newNode.id);
        }
      }, 300);
    });
  };

  // Prepend: 리스트 앞에 데이터 추가
  const prepend = () => {
    animate(() => {
      setTimeout(() => {
        const nodes = toArray(head);
        const newNode: Node = {
          id: `node-${nextId}`,
          data: nodes.length === 0 ? 1 : nodes[0].data - 1,
          next: head,
          prev: null,
        };
        
        if (head) {
          head.prev = newNode;
        }
        
        if (tail === null) {
          setTail(newNode);
        }
        
        setHead(newNode);
        setNextId(nextId + 1);
        setHighlightedNodeId(newNode.id);
      }, 300);
    });
  };

  // InsertAt: 특정 인덱스에 데이터 삽입
  const insertAt = (index: number) => {
    if (index < 0) return;
    
    animate(() => {
      setTimeout(() => {
        setHead((currentHead) => {
          const nodes = toArray(currentHead);
          
          if (index === 0) {
            const newNode: Node = {
              id: `node-${nextId}`,
              data: nodes.length === 0 ? 1 : nodes[0].data - 1,
              next: currentHead,
              prev: null,
            };
            
            if (currentHead) {
              currentHead.prev = newNode;
            }
            
            if (tail === null) {
              setTail(newNode);
            }
            
            setNextId(nextId + 1);
            setHighlightedNodeId(newNode.id);
            return newNode;
          }
          
          if (index >= nodes.length) {
            const newNode: Node = {
              id: `node-${nextId}`,
              data: nodes.length + 1,
              next: null,
              prev: tail,
            };
            
            // 새로운 리스트 생성 - 모든 노드를 새로 생성하여 참조 문제 해결
            const newNodes: Node[] = [];
            for (let i = 0; i < nodes.length; i++) {
              newNodes.push({
                id: nodes[i].id,
                data: nodes[i].data,
                next: null,
                prev: null,
              });
            }
            newNodes.push(newNode);
            
            // next와 prev 포인터 재연결
            for (let i = 0; i < newNodes.length; i++) {
              newNodes[i].next = i < newNodes.length - 1 ? newNodes[i + 1] : null;
              newNodes[i].prev = i > 0 ? newNodes[i - 1] : null;
            }
            
            setTail(newNodes[newNodes.length - 1]);
            setNextId(nextId + 1);
            setHighlightedNodeId(newNode.id);
            return newNodes[0];
          }
          
          // 중간에 삽입 (0 < index < nodes.length)
          const newNode: Node = {
            id: `node-${nextId}`,
            data: Math.floor((nodes[index - 1].data + nodes[index].data) / 2),
            next: null,
            prev: null,
          };
          
          // 새로운 리스트 생성
          const newNodes: Node[] = [];
          for (let i = 0; i < nodes.length; i++) {
            newNodes.push({
              id: nodes[i].id,
              data: nodes[i].data,
              next: null,
              prev: null,
            });
          }
          
          // 새 노드를 인덱스 위치에 삽입
          newNodes.splice(index, 0, newNode);
          
          // next와 prev 포인터 재연결
          for (let i = 0; i < newNodes.length; i++) {
            newNodes[i].next = i < newNodes.length - 1 ? newNodes[i + 1] : null;
            newNodes[i].prev = i > 0 ? newNodes[i - 1] : null;
          }
          
          setTail(newNodes[newNodes.length - 1]);
          setNextId(nextId + 1);
          setHighlightedNodeId(newNode.id);
          return newNodes[0];
        });
      }, 300);
    });
  };

  // Remove: 특정 데이터를 가진 노드 제거
  const remove = (data: number) => {
    if (head === null) return;
    
    animate(() => {
      setTimeout(() => {
        const nodes = toArray(head);
        const nodeToRemove = nodes.find(n => n.data === data);
        
        if (!nodeToRemove) return;
        
        setHighlightedNodeId(nodeToRemove.id);
        
        setTimeout(() => {
          if (head?.data === data) {
            const newHead = head.next;
            if (newHead) {
              newHead.prev = null;
            } else {
              setTail(null);
            }
            setHead(newHead);
          } else if (tail?.data === data) {
            const newTail = tail.prev;
            if (newTail) {
              newTail.next = null;
            } else {
              setHead(null);
            }
            setTail(newTail);
          } else {
            // 새로운 리스트 생성 (제거할 노드 제외)
            const newNodes: Node[] = [];
            let current = head;
            
            while (current !== null) {
              if (current.data !== data) {
                newNodes.push({
                  ...current,
                  next: null,
                  prev: null,
                });
              }
              current = current.next;
            }
            
            // next와 prev 포인터 재연결
            for (let i = 0; i < newNodes.length; i++) {
              newNodes[i].next = i < newNodes.length - 1 ? newNodes[i + 1] : null;
              newNodes[i].prev = i > 0 ? newNodes[i - 1] : null;
            }
            
            setHead(newNodes.length > 0 ? newNodes[0] : null);
            setTail(newNodes.length > 0 ? newNodes[newNodes.length - 1] : null);
          }
        }, 300);
      }, 300);
    });
  };

  // FindFromHead: head에서부터 특정 데이터를 가진 노드 찾기
  const findFromHead = (data: number) => {
    if (head === null) return;
    
    animate(() => {
      const nodes = toArray(head);
      const foundNode = nodes.find(n => n.data === data);
      if (foundNode) {
        setHighlightedNodeId(foundNode.id);
      }
    });
  };

  // FindFromTail: tail에서부터 특정 데이터를 가진 노드 찾기
  const findFromTail = (data: number) => {
    if (tail === null) return;
    
    animate(() => {
      const nodes: Node[] = [];
      let current = tail;
      while (current !== null) {
        nodes.unshift(current);
        current = current.prev || null;
      }
      const foundNode = nodes.find(n => n.data === data);
      if (foundNode) {
        setHighlightedNodeId(foundNode.id);
      }
    });
  };

  const reset = () => {
    setHead(INITIAL_HEAD);
    setTail(INITIAL_TAIL);
    setNextId(1);
  };

  const nodes = toArray(head);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">이중 연결 리스트 시각화</h3>
      
      <div className="mb-10">
        <div className="flex flex-col items-center min-h-[200px]">
          {/* 리스트 요소들 */}
          {head === null ? (
            <div className="text-center text-gray-400 text-sm py-8 border-2 border-dashed border-gray-300 rounded-lg min-h-[120px] flex items-center justify-center w-full max-w-4xl">
              리스트가 비어있습니다
            </div>
          ) : (
            <div className="flex items-center gap-4 overflow-x-auto pb-8 min-h-[120px] pl-2 w-full max-w-4xl">
              {nodes.map((node, index) => {
                const isHighlighted = highlightedNodeId === node.id;
                const isHead = index === 0;
                const isTail = index === nodes.length - 1;
                const nextNode = node.next;
                const prevNode = node.prev;
                
                return (
                  <div key={node.id} className="flex items-center gap-4 flex-shrink-0">
                    {/* 노드 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`relative flex border-2 rounded transition-all duration-300 ${
                          isHighlighted
                            ? 'border-blue-600 scale-110 shadow-xl z-10'
                            : isHead || isTail
                            ? 'border-yellow-400 shadow-md'
                            : 'border-gray-300 shadow-md'
                        }`}
                        style={{
                          boxShadow: isHighlighted
                            ? '0 4px 12px rgba(59, 130, 246, 0.5)'
                            : '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                          transformOrigin: 'center center',
                        }}
                      >
                        {/* prev 포인터 영역 */}
                        <div className={`px-3 py-3 border-r-2 font-mono text-xs flex flex-col items-center justify-center min-w-[50px] ${
                          isHighlighted
                            ? 'bg-blue-500 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-600 border-gray-300'
                        }`}>
                          <span className="text-[10px] mb-1">prev</span>
                          {prevNode ? (
                            <span className="text-[10px] font-bold">{prevNode.data}</span>
                          ) : (
                            <span className="text-[10px] text-gray-400">null</span>
                          )}
                        </div>
                        {/* data */}
                        <div className={`px-4 py-3 border-r-2 font-mono font-bold text-lg flex flex-col items-center justify-center min-w-[60px] relative ${
                          isHighlighted
                            ? 'bg-blue-500 text-white border-blue-600'
                            : isHead || isTail
                            ? 'bg-yellow-50 text-gray-900 border-gray-300'
                            : 'bg-gray-50 text-gray-900 border-gray-300'
                        }`}>
                          {(isHead || isTail) && (
                            <span className={`text-[9px] font-semibold mb-0.5 ${
                              isHead ? 'text-blue-600' : 'text-green-600'
                            }`}>
                              {isHead ? 'Head' : 'Tail'}
                            </span>
                          )}
                          <span>{node.data}</span>
                        </div>
                        {/* next 포인터 영역 */}
                        <div className={`px-3 py-3 font-mono text-xs flex flex-col items-center justify-center min-w-[50px] ${
                          isHighlighted
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <span className="text-[10px] mb-1">next</span>
                          {nextNode ? (
                            <span className="text-[10px] font-bold">{nextNode.data}</span>
                          ) : (
                            <span className="text-[10px] text-gray-400">null</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* 노드 사이 양방향 화살표 */}
                    {!isTail && (
                      <div className="flex flex-col items-center justify-center">
                        {/* 양방향 화살표 컨테이너 */}
                        <div className="relative flex flex-col items-center">
                          {/* next 화살표 (위쪽, 오른쪽으로) */}
                          <div className="flex flex-col items-center mb-1">
                            <svg
                              width="40"
                              height="20"
                              viewBox="0 0 40 20"
                              className="text-blue-500"
                            >
                              <defs>
                                <marker
                                  id={`arrow-next-${node.id}`}
                                  markerWidth="10"
                                  markerHeight="10"
                                  refX="8"
                                  refY="5"
                                  orient="auto"
                                >
                                  <path d="M0,0 L0,10 L9,5 z" fill="currentColor" />
                                </marker>
                              </defs>
                              <line
                                x1="0"
                                y1="10"
                                x2="35"
                                y2="10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                markerEnd={`url(#arrow-next-${node.id})`}
                              />
                            </svg>
                            <span className="text-[9px] text-blue-500 font-semibold">next</span>
                          </div>
                          {/* prev 화살표 (아래쪽, 왼쪽으로) */}
                          <div className="flex flex-col items-center mt-1">
                            <svg
                              width="40"
                              height="20"
                              viewBox="0 0 40 20"
                              className="text-green-500"
                            >
                              <defs>
                                <marker
                                  id={`arrow-prev-reverse-${node.id}`}
                                  markerWidth="10"
                                  markerHeight="10"
                                  refX="-15"
                                  refY="5"
                                  orient="auto"
                                >
                                  <path d="M0,0 L0,10 L9,5 z" fill="currentColor" />
                                </marker>
                              </defs>
                              <line
                                x1="35"
                                y1="10"
                                x2="0"
                                y2="10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                markerStart={`url(#arrow-prev-reverse-${node.id})`}
                              />
                            </svg>
                            <span className="text-[9px] text-green-500 font-semibold">prev</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* null 표시 */}
                    {isTail && (
                      <div className="flex items-center">
                        <div className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                          <span className="text-gray-400 font-mono text-sm">null</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <colgroup>
              <col className="w-1/3" />
              <col className="w-2/3" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">연산</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">버튼</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">append()</span>
                  <span className="ml-2 text-xs text-gray-500">(O(1))</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={append}
                    disabled={isAnimating}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    append() 추가
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">prepend()</span>
                  <span className="ml-2 text-xs text-gray-500">(O(1))</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={prepend}
                    disabled={isAnimating}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    prepend() 추가
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">insertAt(2)</span>
                  <span className="ml-2 text-xs text-gray-500">(O(n))</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => insertAt(2)}
                    disabled={isAnimating || nodes.length < 2}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    insertAt(2) 삽입
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 h-[60px]">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">remove(data)</span>
                  <span className="ml-2 text-xs text-gray-500">(O(n))</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 h-[36px] items-center overflow-x-auto">
                    {nodes.length === 0 ? (
                      <span className="text-sm text-gray-400">리스트가 비어있습니다</span>
                    ) : (
                      nodes.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => remove(node.data)}
                          disabled={isAnimating}
                          className="flex-shrink-0 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm whitespace-nowrap"
                        >
                          remove({node.data})
                        </button>
                      ))
                    )}
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100 h-[60px]">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">findFromHead(data)</span>
                  <span className="ml-2 text-xs text-gray-500">(O(n))</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 h-[36px] items-center overflow-x-auto">
                    {nodes.length === 0 ? (
                      <span className="text-sm text-gray-400">리스트가 비어있습니다</span>
                    ) : (
                      nodes.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => findFromHead(node.data)}
                          disabled={isAnimating}
                          className="flex-shrink-0 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm whitespace-nowrap"
                        >
                          findFromHead({node.data})
                        </button>
                      ))
                    )}
                  </div>
                </td>
              </tr>
              <tr className="h-[60px]">
                <td className="py-3 px-4">
                  <span className="text-sm font-semibold text-gray-700">findFromTail(data)</span>
                  <span className="ml-2 text-xs text-gray-500">(O(n))</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 h-[36px] items-center overflow-x-auto">
                    {nodes.length === 0 ? (
                      <span className="text-sm text-gray-400">리스트가 비어있습니다</span>
                    ) : (
                      nodes.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => findFromTail(node.data)}
                          disabled={isAnimating}
                          className="flex-shrink-0 px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-sm whitespace-nowrap"
                        >
                          findFromTail({node.data})
                        </button>
                      ))
                    )}
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

export default DoublyLinkedList;
