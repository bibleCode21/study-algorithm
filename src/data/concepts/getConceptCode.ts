import { CodeExample } from '@/features/algorithm/types/algorithm';

/**
 * 개념 ID에 해당하는 디렉토리 경로를 반환합니다.
 * @param conceptId 개념 ID
 * @returns 디렉토리 경로
 */
const getConceptPath = (conceptId: string): string => {
  // 데이터 구조
  const dataStructures = ['array', 'stack', 'queue', 'linked-list', 'heap', 'hash-table', 'tree'];
  // 알고리즘
  const algorithms = ['bubble-sort', 'insertion-sort', 'binary-search'];
  
  if (dataStructures.includes(conceptId)) {
    return `./data-structures/${conceptId}/code`;
  } else if (algorithms.includes(conceptId)) {
    return `./algorithms/${conceptId}/code`;
  }
  
  // 기본값 (하위 호환성)
  return `./${conceptId}/code`;
};

/**
 * 개념 ID에 해당하는 코드 예제를 동적으로 로드합니다.
 * @param conceptId 개념 ID
 * @returns 코드 예제 배열
 */
export const getConceptCode = async (conceptId: string): Promise<CodeExample[]> => {
  try {
    const codePath = getConceptPath(conceptId);
    const codeModule = await import(codePath);
    return codeModule.code;
  } catch (error) {
    console.error(`Failed to load code for concept: ${conceptId}`, error);
    return [];
  }
};

/**
 * 개념 ID에 해당하는 코드 예제를 동기적으로 가져옵니다.
 * (서버 컴포넌트에서 사용)
 * @param conceptId 개념 ID
 * @returns 코드 예제 배열
 */
export const getConceptCodeSync = async (conceptId: string): Promise<CodeExample[]> => {
  try {
    const codePath = getConceptPath(conceptId);
    // 서버 컴포넌트에서 동적 import 사용
    const codeModule = await import(codePath);
    return codeModule.code || [];
  } catch (error) {
    console.error(`Failed to load code for concept: ${conceptId}`, error);
    return [];
  }
};

