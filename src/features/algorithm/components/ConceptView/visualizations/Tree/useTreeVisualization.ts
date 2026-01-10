import { useState, useCallback, useRef, useEffect } from 'react';
import { TreeNode, TraversalType } from './types';
import {
  insertNode,
  searchNode,
  deleteNode,
  preOrderTraversal,
  inOrderTraversal,
  postOrderTraversal,
  levelOrderTraversal,
} from './utils';

interface InputValues {
  insert: string;
  search: string;
  delete: string;
}

interface TraversalState {
  result: number[];
  type: TraversalType | null;
  isActive: boolean;
}

interface AnimationState {
  isAnimating: boolean;
  highlightedNodeId: string | null;
}

export const useTreeVisualization = () => {
  // 트리 데이터 상태
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [nextId, setNextId] = useState(1);

  // 입력값 상태 (객체로 묶어서 관리)
  const [inputValues, setInputValues] = useState<InputValues>({
    insert: '',
    search: '',
    delete: '',
  });

  // 애니메이션 상태 (객체로 묶어서 관리)
  const [animationState, setAnimationState] = useState<AnimationState>({
    isAnimating: false,
    highlightedNodeId: null,
  });

  // 순회 상태 (객체로 묶어서 관리)
  const [traversalState, setTraversalState] = useState<TraversalState>({
    result: [],
    type: null,
    isActive: false,
  });

  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // 컴포넌트 unmount 시 모든 타이머 정리
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, []);

  // 타이머를 안전하게 등록하고 정리하는 헬퍼 함수
  const safeSetTimeout = useCallback(
    (callback: () => void, delay: number): ReturnType<typeof setTimeout> => {
      const timeout = setTimeout(() => {
        timeoutRefs.current.delete(timeout);
        callback();
      }, delay);
      timeoutRefs.current.add(timeout);
      return timeout;
    },
    []
  );

  // 애니메이션 실행
  const animate = useCallback(
    (callback: () => void, duration = 800) => {
      setAnimationState((prev) => ({ ...prev, isAnimating: true }));
      callback();
      safeSetTimeout(() => {
        setAnimationState({
          isAnimating: false,
          highlightedNodeId: null,
        });
      }, duration);
    },
    [safeSetTimeout]
  );

  // 입력값 업데이트 헬퍼
  const updateInputValue = useCallback((field: keyof InputValues, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Insert: 이진 탐색 트리에 값 추가
  const insert = useCallback(() => {
    const value = parseInt(inputValues.insert);
    if (isNaN(value)) {
      alert('올바른 숫자를 입력해주세요.');
      return;
    }

    animate(() => {
      const { root: newRoot, newNodeId } = insertNode(root, value, nextId);
      setRoot(newRoot);
      setNextId((prev) => prev + 1);
      setInputValues((prev) => ({ ...prev, insert: '' }));
      setAnimationState((prev) => ({ ...prev, highlightedNodeId: newNodeId }));
    });
  }, [inputValues.insert, root, nextId, animate]);

  // Search: 값 검색
  const search = useCallback(() => {
    const value = parseInt(inputValues.search);
    if (isNaN(value)) {
      alert('올바른 숫자를 입력해주세요.');
      return;
    }

    animate(() => {
      const foundNode = searchNode(root, value);
      if (foundNode) {
        setAnimationState((prev) => ({ ...prev, highlightedNodeId: foundNode.id }));
      } else {
        alert('값을 찾을 수 없습니다.');
        safeSetTimeout(() => {
          setAnimationState((prev) => ({ ...prev, highlightedNodeId: null }));
        }, 300);
      }
    });
  }, [inputValues.search, root, animate, safeSetTimeout]);

  // Delete: 값 삭제
  const deleteValueFromTree = useCallback(() => {
    const value = parseInt(inputValues.delete);
    if (isNaN(value)) {
      alert('올바른 숫자를 입력해주세요.');
      return;
    }

    const foundNode = searchNode(root, value);
    if (!foundNode) {
      alert('삭제할 값을 찾을 수 없습니다.');
      return;
    }

    animate(() => {
      setAnimationState((prev) => ({ ...prev, highlightedNodeId: foundNode.id }));
      safeSetTimeout(() => {
        const newRoot = deleteNode(root, value);
        setRoot(newRoot);
        setInputValues((prev) => ({ ...prev, delete: '' }));
      }, 400);
    });
  }, [inputValues.delete, root, animate, safeSetTimeout]);

  // 순회 함수들
  const performTraversal = useCallback(
    (type: TraversalType) => {
      if (!root) {
        alert('트리가 비어있습니다.');
        return;
      }

      setTraversalState({
        result: [],
        type,
        isActive: true,
      });
      setAnimationState((prev) => ({ ...prev, highlightedNodeId: null }));

      let nodes: TreeNode[] = [];
      switch (type) {
        case 'pre-order':
          nodes = preOrderTraversal(root);
          break;
        case 'in-order':
          nodes = inOrderTraversal(root);
          break;
        case 'post-order':
          nodes = postOrderTraversal(root);
          break;
        case 'level-order':
          nodes = levelOrderTraversal(root);
          break;
      }

      // 순회 애니메이션
      nodes.forEach((node, index) => {
        safeSetTimeout(() => {
          setAnimationState((prev) => ({ ...prev, highlightedNodeId: node.id }));
          setTraversalState((prev) => ({
            ...prev,
            result: [...prev.result, node.value],
          }));
          if (index === nodes.length - 1) {
            safeSetTimeout(() => {
              setTraversalState((prev) => ({
                ...prev,
                isActive: false,
                type: null,
              }));
              setAnimationState((prev) => ({ ...prev, highlightedNodeId: null }));
            }, 500);
          }
        }, index * 600);
      });
    },
    [root, safeSetTimeout]
  );

  // 초기화
  const reset = useCallback(() => {
    // 모든 timeout 정리
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current.clear();

    setRoot(null);
    setNextId(1);
    setInputValues({
      insert: '',
      search: '',
      delete: '',
    });
    setAnimationState({
      isAnimating: false,
      highlightedNodeId: null,
    });
    setTraversalState({
      result: [],
      type: null,
      isActive: false,
    });
  }, []);

  return {
    // 트리 데이터
    root,
    // 입력값
    inputValues,
    updateInputValue,
    // 애니메이션 상태
    animationState,
    // 순회 상태
    traversalState,
    // 연산 함수
    insert,
    search,
    deleteValueFromTree,
    performTraversal,
    reset,
  };
};
