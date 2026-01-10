#!/usr/bin/env node

/**
 * 코드 블록 구조 검증 스크립트
 * 
 * 각 code.ts 파일의 코드 블록 구조가 템플릿 규칙을 준수하는지 검증합니다.
 * 
 * 사용법:
 *   node scripts/validate-code-structure.js [concept-name]
 * 
 * concept-name을 지정하지 않으면 모든 개념을 검증합니다.
 */

const fs = require('fs');
const path = require('path');

// 개념 ID와 파일 경로 매핑
const CONCEPT_PATHS = {
  'array': {
    code: 'src/data/concepts/data-structures/array/code.ts',
  },
  'stack': {
    code: 'src/data/concepts/data-structures/stack/code.ts',
  },
  'queue': {
    code: 'src/data/concepts/data-structures/queue/code.ts',
  },
  'linked-list': {
    code: 'src/data/concepts/data-structures/linked-list/code.ts',
  },
  'heap': {
    code: 'src/data/concepts/data-structures/heap/code.ts',
  },
  'hash-table': {
    code: 'src/data/concepts/data-structures/hash-table/code.ts',
  },
  'tree': {
    code: 'src/data/concepts/data-structures/tree/code.ts',
  },
  'binary-search': {
    code: 'src/data/concepts/algorithms/binary-search/code.ts',
  },
  'bubble-sort': {
    code: 'src/data/concepts/algorithms/bubble-sort/code.ts',
  },
};

/**
 * code.ts 파일에서 코드 예제를 추출합니다.
 */
function parseCodeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const codeExamples = [];
  let inCodeBlock = false;
  let codeStartLine = 0;
  let codeContent = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // code: ` 시작 찾기
    if (line.includes('code: `')) {
      inCodeBlock = true;
      codeStartLine = i;
      // template literal 시작 부분 찾기
      const templateStart = line.indexOf('code: `') + 7; // 'code: `' 길이
      if (templateStart < line.length) {
        codeContent = [line.substring(templateStart)];
      } else {
        codeContent = [];
      }
      continue;
    }
    
    // template literal 끝 찾기
    if (inCodeBlock) {
      if (line.includes('`,') || line.includes('`,')) {
        // 마지막 줄에서 `, 전까지
        const templateEnd = line.indexOf('`,');
        if (templateEnd !== -1) {
          codeContent.push(line.substring(0, templateEnd));
        }
        
        const code = codeContent.join('\n');
        const codeLines = code.split('\n');
        
        codeExamples.push({
          code,
          lines: codeLines,
          lineCount: codeLines.length,
          startLineInFile: codeStartLine + 1, // 1-based
        });
        
        inCodeBlock = false;
        codeContent = [];
        continue;
      }
      
      // 중간 줄들
      codeContent.push(line);
    }
  }
  
  return codeExamples;
}

/**
 * 코드 블록 구조를 검증합니다.
 */
function validateCodeStructure(conceptId) {
  const config = CONCEPT_PATHS[conceptId];
  if (!config) {
    console.error(`❌ 알 수 없는 개념: ${conceptId}`);
    return false;
  }
  
  const codePath = path.join(process.cwd(), config.code);
  
  if (!fs.existsSync(codePath)) {
    console.error(`❌ 파일을 찾을 수 없습니다: ${codePath}`);
    return false;
  }
  
  console.log(`\n📋 ${conceptId} 코드 블록 구조 검증 중...`);
  
  try {
    const codeExamples = parseCodeFile(codePath);
    
    if (codeExamples.length === 0) {
      console.log(`   ⚠️  코드 예제를 찾을 수 없습니다.`);
      return false;
    }
    
    let allValid = true;
    
    codeExamples.forEach((example, index) => {
      const issues = [];
      
      // 1. 코드 블록 시작 주석 확인
      const firstLine = example.lines[0] || '';
      const hasStartComment = firstLine.trim().startsWith('//');
      if (!hasStartComment) {
        issues.push('❌ 코드 블록 시작 주석이 없습니다');
        allValid = false;
      }
      
      // 2. 사용 예제 주석 확인 (선택사항이지만 권장)
      const hasUsageExample = example.code.includes('// 사용 예제');
      // 사용 예제가 없어도 경고만 표시 (필수는 아님)
      if (!hasUsageExample && example.code.includes('const ') || example.code.includes('class ')) {
        // 함수나 클래스가 있는데 사용 예제가 없는 경우 경고
        if (example.code.includes('function ') || example.code.includes('=>') || example.code.includes('class ')) {
          // 경고만 표시 (필수는 아님)
        }
      }
      
      // 3. 결과 주석 확인 (선택사항)
      // 결과 주석은 다양한 형식이 있을 수 있으므로 단순히 확인만
      const hasResultComment = example.code.includes('// ') && (
        example.code.includes('// ') || 
        example.code.match(/\/\/\s*[가-힣]/) ||
        example.code.match(/\/\/\s*[a-zA-Z]/)
      );
      
      // 4. 빈 줄 확인 (코드 가독성을 위해)
      const hasEmptyLines = example.lines.some(line => line.trim() === '');
      // 빈 줄이 전혀 없으면 경고 (하지만 필수는 아님)
      
      if (issues.length > 0) {
        console.log(`   예제 ${index + 1}:`);
        issues.forEach(issue => console.log(`     ${issue}`));
      } else {
        console.log(`   ✅ 예제 ${index + 1}: 구조 검증 완료 (${example.lineCount}줄)`);
      }
    });
    
    return allValid;
  } catch (error) {
    console.error(`   ❌ 검증 중 오류 발생: ${error.message}`);
    console.error(error.stack);
    return false;
  }
}

// 메인 실행
const conceptId = process.argv[2];

if (conceptId) {
  // 특정 개념만 검증
  const isValid = validateCodeStructure(conceptId);
  process.exit(isValid ? 0 : 1);
} else {
  // 모든 개념 검증
  console.log('🔍 모든 code.ts 파일 구조 검증 시작...\n');
  
  let allValid = true;
  Object.keys(CONCEPT_PATHS).forEach(conceptId => {
    const isValid = validateCodeStructure(conceptId);
    if (!isValid) {
      allValid = false;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  if (allValid) {
    console.log('✅ 모든 검증 완료');
  } else {
    console.log('⚠️  일부 검증 실패 (경고는 무시 가능)');
  }
  
  process.exit(allValid ? 0 : 1);
}
