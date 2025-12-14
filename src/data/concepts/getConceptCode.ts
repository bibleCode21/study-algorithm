import { CodeExample } from '@/features/algorithm/types/algorithm';

/**
 * 개념 ID에 해당하는 코드 예제를 동적으로 로드합니다.
 * @param conceptId 개념 ID
 * @returns 코드 예제 배열
 */
export const getConceptCode = async (conceptId: string): Promise<CodeExample[]> => {
  try {
    const codeModule = await import(`./${conceptId}/code`);
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
export const getConceptCodeSync = (conceptId: string): CodeExample[] => {
  try {
    // 동적 import를 사용하되, 서버 컴포넌트에서는 require 사용
    const codeModule = require(`./${conceptId}/code`);
    return codeModule.code || [];
  } catch (error) {
    console.error(`Failed to load code for concept: ${conceptId}`, error);
    return [];
  }
};

