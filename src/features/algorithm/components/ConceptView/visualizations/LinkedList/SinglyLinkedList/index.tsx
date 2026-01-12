'use client';

import { useState } from 'react';
import { Node } from '../types';

const INITIAL_HEAD: Node | null = null;

const SinglyLinkedList = () => {
  const [head, setHead] = useState<Node | null>(INITIAL_HEAD);
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
    let current: Node | null = node;
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
        setHead((currentHead) => {
          if (currentHead === null) {
            const newNode: Node = {
              id: `node-${nextId}`,
              data: 1,
              next: null,
            };
            setNextId(nextId + 1);
            setHighlightedNodeId(newNode.id);
            return newNode;
          } else {
            const nodes = toArray(currentHead);
            const newNode: Node = {
              id: `node-${nextId}`,
              data: nodes.length + 1,
              next: null,
            };
            
            // 새로운 리스트 생성 - 모든 노드를 새로 생성하여 참조 문제 해결
            const newNodes: Node[] = [];
            for (let i = 0; i < nodes.length; i++) {
              newNodes.push({
                id: nodes[i].id,
                data: nodes[i].data,
                next: i === nodes.length - 1 ? newNode : null, // 임시로 null
              });
            }
            
            // next 포인터 재연결
            for (let i = 0; i < newNodes.length - 1; i++) {
              newNodes[i].next = newNodes[i + 1];
            }
            
            setNextId(nextId + 1);
            setHighlightedNodeId(newNode.id);
            return newNodes[0];
          }
        });
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
        };
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
            };
            setNextId(nextId + 1);
            setHighlightedNodeId(newNode.id);
            return newNode;
          }
          
          if (index >= nodes.length) {
            const newNode: Node = {
              id: `node-${nextId}`,
              data: nodes.length + 1,
              next: null,
            };
            
            // 새로운 리스트 생성 - 모든 노드를 새로 생성하여 참조 문제 해결
            const newNodes: Node[] = [];
            for (let i = 0; i < nodes.length; i++) {
              newNodes.push({
                id: nodes[i].id,
                data: nodes[i].data,
                next: null, // 임시로 null
              });
            }
            newNodes.push(newNode);
            
            // next 포인터 재연결
            for (let i = 0; i < newNodes.length - 1; i++) {
              newNodes[i].next = newNodes[i + 1];
            }
            
            setNextId(nextId + 1);
            setHighlightedNodeId(newNode.id);
            return newNodes[0];
          }
          
          // 중간에 삽입 (0 < index < nodes.length)
          const newNode: Node = {
            id: `node-${nextId}`,
            data: Math.floor((nodes[index - 1].data + nodes[index].data) / 2),
            next: null, // 임시로 null
          };
          
          // 새로운 리스트 생성
          const newNodes: Node[] = [];
          for (let i = 0; i < nodes.length; i++) {
            newNodes.push({
              id: nodes[i].id,
              data: nodes[i].data,
              next: null, // 임시로 null
            });
          }
          
          // 새 노드를 인덱스 위치에 삽입
          newNodes.splice(index, 0, newNode);
          
          // next 포인터 재연결
          for (let i = 0; i < newNodes.length; i++) {
            newNodes[i].next = i < newNodes.length - 1 ? newNodes[i + 1] : null;
          }
          
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
            setHead(head.next);
          } else {
            // 새로운 리스트 생성 (제거할 노드 제외)
            const newNodes: Node[] = [];
            let current: Node | null = head;
            
            while (current !== null) {
              if (current.data !== data) {
                newNodes.push({
                  ...current,
                  next: null, // 임시로 null 설정
                });
              }
              current = current.next;
            }
            
            // next 포인터 재연결
            for (let i = 0; i < newNodes.length; i++) {
              newNodes[i].next = i < newNodes.length - 1 ? newNodes[i + 1] : null;
            }
            
            setHead(newNodes.length > 0 ? newNodes[0] : null);
          }
        }, 300);
      }, 300);
    });
  };

  // Find: 특정 데이터를 가진 노드 찾기
  const find = (data: number) => {
    if (head === null) return;
    
    animate(() => {
      const nodes = toArray(head);
      const foundNode = nodes.find(n => n.data === data);
      if (foundNode) {
        setHighlightedNodeId(foundNode.id);
      }
    });
  };

  const reset = () => {
    setHead(INITIAL_HEAD);
    setNextId(1);
  };

  const nodes = toArray(head);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">단일 연결 리스트 시각화</h3>
      
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
                const isLast = index === nodes.length - 1;
                const nextNode = node.next;
                
                return (
                  <div key={node.id} className="flex items-center gap-4 flex-shrink-0">
                    {/* 노드 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`relative flex border-2 rounded transition-all duration-300 ${
                          isHighlighted
                            ? 'border-blue-600 scale-110 shadow-xl z-10'
                            : isHead
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
                        {/* data */}
                        <div className={`px-4 py-3 border-r-2 font-mono font-bold text-lg flex flex-col items-center justify-center min-w-[60px] relative ${
                          isHighlighted
                            ? 'bg-blue-500 text-white border-blue-600'
                            : isHead
                            ? 'bg-yellow-50 text-gray-900 border-gray-300'
                            : 'bg-gray-50 text-gray-900 border-gray-300'
                        }`}>
                          {isHead && (
                            <span className="text-[9px] font-semibold text-blue-600 mb-0.5">
                              Head
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
                    
                    {/* 화살표 */}
                    {!isLast && (
                      <div className="flex flex-col items-center">
                        <svg
                          width="40"
                          height="20"
                          viewBox="0 0 40 20"
                          className="text-blue-500"
                        >
                          <defs>
                            <marker
                              id={`arrow-${node.id}`}
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
                            markerEnd={`url(#arrow-${node.id})`}
                          />
                        </svg>
                        <span className="text-[9px] text-blue-500 font-semibold">next</span>
                      </div>
                    )}
                    
                    {/* null 표시 */}
                    {isLast && (
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
                <th className="text-left py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700 break-keep">연산</th>
                <th className="text-left py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700 break-keep">버튼</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 md:h-[60px]">
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">append()</span>
                  <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">(O(n))</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <button
                    onClick={append}
                    disabled={isAnimating}
                    className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                  >
                    append() 추가
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 md:h-[60px]">
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">prepend()</span>
                  <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">(O(1))</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <button
                    onClick={prepend}
                    disabled={isAnimating}
                    className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                  >
                    prepend() 추가
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 md:h-[60px]">
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">insertAt(2)</span>
                  <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">(O(n))</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <button
                    onClick={() => insertAt(2)}
                    disabled={isAnimating || nodes.length < 2}
                    className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors break-keep"
                  >
                    insertAt(2) 삽입
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 md:h-[60px]">
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">remove(data)</span>
                  <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">(O(n))</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <div className="flex gap-1.5 md:gap-2 h-[32px] md:h-[36px] items-center overflow-x-auto">
                    {nodes.length === 0 ? (
                      <span className="text-xs md:text-sm text-gray-400 break-keep">리스트가 비어있습니다</span>
                    ) : (
                      nodes.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => remove(node.data)}
                          disabled={isAnimating}
                          className="flex-shrink-0 px-2 py-1 md:px-3 md:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-[10px] md:text-sm whitespace-nowrap break-keep"
                        >
                          remove({node.data})
                        </button>
                      ))
                    )}
                  </div>
                </td>
              </tr>
              <tr className="md:h-[60px]">
                <td className="py-2 px-2 md:py-3 md:px-4 break-keep">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-keep">find(data)</span>
                  <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 break-keep">(O(n))</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <div className="flex gap-1.5 md:gap-2 h-[32px] md:h-[36px] items-center overflow-x-auto">
                    {nodes.length === 0 ? (
                      <span className="text-xs md:text-sm text-gray-400 break-keep">리스트가 비어있습니다</span>
                    ) : (
                      nodes.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => find(node.data)}
                          disabled={isAnimating}
                          className="flex-shrink-0 px-2 py-1 md:px-3 md:py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-[10px] md:text-sm whitespace-nowrap break-keep"
                        >
                          find({node.data})
                        </button>
                      ))
                    )}
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

export default SinglyLinkedList;
