/**
 * TypeScript 코드를 JavaScript로 컴파일합니다.
 */
export async function compileTypeScript(
  code: string
): Promise<{ success: boolean; jsCode?: string; error?: string }> {
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
}

/**
 * JavaScript 코드를 실행하고 결과를 반환합니다.
 * @param jsCode 컴파일된 JavaScript 코드
 * @param input 테스트 케이스 입력
 * @returns 실행 결과 또는 에러
 */
export function executeCode(
  jsCode: string,
  input: any
): { success: boolean; result?: any; error?: string } {
  try {
    // Function 생성자를 사용하여 안전하게 코드 실행
    // solution 함수를 추출하여 실행
    const wrappedCode = `
      ${jsCode}
      
      // solution 함수가 있는지 확인
      if (typeof solution === 'function') {
        return solution(input);
      } else {
        throw new Error('solution 함수를 찾을 수 없습니다. solution 함수를 정의해주세요.');
      }
    `;

    const func = new Function('input', wrappedCode);
    const result = func(input);

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
}

/**
 * 두 값을 깊은 비교하여 같은지 확인합니다.
 */
export function deepEqual(a: any, b: any): boolean {
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
}

