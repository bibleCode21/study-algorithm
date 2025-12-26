/**
 * TypeScript 코드를 JavaScript로 컴파일합니다.
 */
export const compileTypeScript = async (
  code: string
): Promise<{ success: boolean; jsCode?: string; error?: string }> => {
  try {
    // 동적 import로 TypeScript 컴파일러 로드
    const ts = await import('typescript');

    const result = ts.transpile(code, {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      esModuleInterop: true,
      skipLibCheck: true,
    });

    return {
      success: true,
      jsCode: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '컴파일 오류가 발생했습니다.',
    };
  }
};

/**
 * 깊은 복사를 수행하는 함수
 */
const deepClone = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item));
  }

  if (typeof obj === 'object') {
    const cloned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
};

/**
 * JavaScript 코드를 실행하고 결과를 반환합니다.
 * @param jsCode 컴파일된 JavaScript 코드
 * @param input 테스트 케이스 입력
 * @returns 실행 결과 또는 에러
 */
export const executeCode = (
  jsCode: string,
  input: any
): { success: boolean; result?: any; error?: string } => {
  try {
    // 입력값을 깊은 복사하여 원본이 수정되지 않도록 함
    const clonedInput = deepClone(input);

    // Function 생성자를 사용하여 안전하게 코드 실행
    // solution 함수 또는 변수를 추출하여 실행 (arrow function 지원)
    // input이 배열인 경우 spread로 전달 (다중 파라미터 지원)
    const wrappedCode = `
      ${jsCode}
      
      // solution 함수 또는 변수가 있는지 확인
      if (typeof solution === 'function') {
        // input이 배열인 경우:
        // - 첫 번째 요소가 배열인 경우: spread로 전달 (다중 파라미터: [items, count] 형태)
        // - 첫 번째 요소가 배열이 아닌 경우: 단일 배열 파라미터로 전달 (기존 호환성)
        if (Array.isArray(input) && input.length > 0 && Array.isArray(input[0])) {
          return solution(...input);
        } else {
          return solution(input);
        }
      } else if (typeof solution !== 'undefined') {
        // solution이 함수가 아닌 경우 (예: 클래스 인스턴스)
        throw new Error('solution은 함수여야 합니다. solution 함수를 정의해주세요.');
      } else {
        throw new Error('solution 함수를 찾을 수 없습니다. solution 함수를 정의해주세요.');
      }
    `;

    const func = new Function('input', wrappedCode);
    const result = func(clonedInput);

    return {
      success: true,
      result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '코드 실행 중 오류가 발생했습니다.',
    };
  }
};

/**
 * 두 값을 깊은 비교하여 같은지 확인합니다.
 */
export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a !== 'object') {
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
};

