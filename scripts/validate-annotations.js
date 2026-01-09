#!/usr/bin/env node

/**
 * Annotation 파일의 줄 번호 검증 스크립트
 * 
 * 각 annotation 파일의 줄 번호가 해당 code.ts 파일의 template literal 내부 줄 번호를
 * 올바르게 참조하는지 검증합니다.
 * 
 * 사용법:
 *   node scripts/validate-annotations.js [concept-name] [example-index]
 * 
 * concept-name을 지정하지 않으면 모든 개념을 검증합니다.
 * example-index를 지정하면 특정 예제만 상세 검증합니다 (0부터 시작).
 */

const fs = require('fs');
const path = require('path');

// 개념 ID와 파일 경로 매핑
const CONCEPT_PATHS = {
  'array': {
    annotation: 'src/features/algorithm/utils/annotations/array.ts',
    code: 'src/data/concepts/data-structures/array/code.ts',
    exportName: 'arrayAnnotations',
  },
  'stack': {
    annotation: 'src/features/algorithm/utils/annotations/stack.ts',
    code: 'src/data/concepts/data-structures/stack/code.ts',
    exportName: 'stackAnnotations',
  },
  'queue': {
    annotation: 'src/features/algorithm/utils/annotations/queue.ts',
    code: 'src/data/concepts/data-structures/queue/code.ts',
    exportName: 'queueAnnotations',
  },
  'linked-list': {
    annotation: 'src/features/algorithm/utils/annotations/linked-list.ts',
    code: 'src/data/concepts/data-structures/linked-list/code.ts',
    exportName: 'linkedListAnnotations',
  },
  'heap': {
    annotation: 'src/features/algorithm/utils/annotations/heap.ts',
    code: 'src/data/concepts/data-structures/heap/code.ts',
    exportName: 'heapAnnotations',
  },
  'hash-table': {
    annotation: 'src/features/algorithm/utils/annotations/hash-table.ts',
    code: 'src/data/concepts/data-structures/hash-table/code.ts',
    exportName: 'hashTableAnnotations',
  },
  'tree': {
    annotation: 'src/features/algorithm/utils/annotations/tree.ts',
    code: 'src/data/concepts/data-structures/tree/code.ts',
    exportName: 'treeAnnotations',
  },
  'binary-search': {
    annotation: 'src/features/algorithm/utils/annotations/binary-search.ts',
    code: 'src/data/concepts/algorithms/binary-search/code.ts',
    exportName: 'binarySearchAnnotations',
  },
  'bubble-sort': {
    annotation: 'src/features/algorithm/utils/annotations/bubble-sort.ts',
    code: 'src/data/concepts/algorithms/bubble-sort/code.ts',
    exportName: 'bubbleSortAnnotations',
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
 * annotation 파일에서 예제와 줄 번호를 추출합니다.
 */
function parseAnnotationFile(filePath, exportName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const examples = [];
  let currentExample = null;
  let inTypescriptArray = false;
  let bracketDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // typescript: [ 시작 찾기
    if (line.includes('typescript:') && line.includes('[')) {
      inTypescriptArray = true;
      bracketDepth = 1;
      continue;
    }
    
    if (!inTypescriptArray) continue;
    
    // 대괄호 깊이 추적
    bracketDepth += (line.match(/\[/g) || []).length;
    bracketDepth -= (line.match(/\]/g) || []).length;
    
    // 예제 주석 찾기: // 네 번째 예제: ... (1-115줄)
    const exampleCommentMatch = line.match(/\/\/\s*([^:]+?):\s*([^(]+?)(?:\s*\((\d+)-(\d+)줄\))?/);
    if (exampleCommentMatch) {
      // 이전 예제 저장
      if (currentExample) {
        examples.push(currentExample);
      }
      
      // 새 예제 시작
      currentExample = {
        name: exampleCommentMatch[2].trim(),
        startLine: exampleCommentMatch[3] ? parseInt(exampleCommentMatch[3]) : null,
        endLine: exampleCommentMatch[4] ? parseInt(exampleCommentMatch[4]) : null,
        annotations: [],
      };
      continue;
    }
    
    // annotation 찾기: { line: 숫자, comment: '...' }
    if (currentExample) {
      const lineMatch = line.match(/line:\s*(\d+)/);
      if (lineMatch) {
        const lineNum = parseInt(lineMatch[1]);
        // comment 추출 (같은 줄 또는 다음 줄들)
        let comment = '';
        let foundComment = false;
        
        // 같은 줄에서 comment 찾기
        const sameLineComment = line.match(/comment:\s*['"`]([^'"`]+)['"`]/);
        if (sameLineComment) {
          comment = sameLineComment[1];
          foundComment = true;
        } else {
          // 여러 줄에 걸친 경우
          for (let j = i; j < Math.min(i + 10, lines.length); j++) {
            const multiLineMatch = lines[j].match(/comment:\s*['"`]([^'"`]*)/);
            if (multiLineMatch) {
              comment = multiLineMatch[1];
              // 닫는 따옴표 찾기
              for (let k = j; k < Math.min(j + 10, lines.length); k++) {
                if (lines[k].includes("'") || lines[k].includes('"') || lines[k].includes('`')) {
                  const endMatch = lines[k].match(/['"`]/);
                  if (endMatch && k !== j) {
                    const endIndex = lines[k].indexOf(endMatch[0]);
                    comment += lines[k].substring(0, endIndex);
                    foundComment = true;
                    break;
                  }
                }
              }
              if (foundComment) break;
            }
          }
        }
        
        currentExample.annotations.push({
          line: lineNum,
          comment: comment || '주석 없음',
        });
      }
    }
    
    // typescript 배열 끝
    if (bracketDepth === 0 && inTypescriptArray) {
      if (currentExample) {
        examples.push(currentExample);
      }
      break;
    }
  }
  
  return examples;
}

/**
 * 특정 예제의 상세 검증
 */
function validateExampleDetail(conceptId, exampleIndex) {
  const config = CONCEPT_PATHS[conceptId];
  if (!config) {
    console.error(`❌ 알 수 없는 개념: ${conceptId}`);
    return false;
  }
  
  const annotationPath = path.join(process.cwd(), config.annotation);
  const codePath = path.join(process.cwd(), config.code);
  
  if (!fs.existsSync(annotationPath) || !fs.existsSync(codePath)) {
    console.error(`❌ 파일을 찾을 수 없습니다.`);
    return false;
  }
  
  const examples = parseAnnotationFile(annotationPath, config.exportName);
  const codeExamples = parseCodeFile(codePath);
  
  if (exampleIndex >= examples.length || exampleIndex >= codeExamples.length) {
    console.error(`❌ 예제 인덱스가 범위를 벗어났습니다.`);
    return false;
  }
  
  const example = examples[exampleIndex];
  const codeExample = codeExamples[exampleIndex];
  
  console.log(`\n📋 ${conceptId} - 예제 ${exampleIndex + 1}: ${example.name}`);
  console.log(`   실제 코드 줄 수: ${codeExample.lineCount}줄`);
  console.log(`   Annotation 줄 번호 범위: ${example.startLine || '없음'}-${example.endLine || '없음'}줄`);
  console.log(`\n   코드 내용 (처음 10줄):`);
  codeExample.lines.slice(0, 10).forEach((line, idx) => {
    console.log(`   ${(idx + 1).toString().padStart(3)}: ${line}`);
  });
  
  console.log(`\n   Annotation 줄 번호 검증:`);
  let hasError = false;
  
  example.annotations.forEach(ann => {
    if (ann.line > codeExample.lineCount) {
      console.log(`   ❌ 줄 ${ann.line}: 최대 줄 수(${codeExample.lineCount})를 초과합니다`);
      hasError = true;
    } else if (ann.line < 1) {
      console.log(`   ❌ 줄 ${ann.line}: 1보다 작습니다`);
      hasError = true;
    } else {
      const codeLine = codeExample.lines[ann.line - 1];
      console.log(`   ✅ 줄 ${ann.line}: ${codeLine.substring(0, 50).trim()}...`);
    }
  });
  
  // 줄 번호 범위 확인
  if (example.endLine && example.endLine !== codeExample.lineCount) {
    console.log(`   ⚠️  줄 번호 범위 불일치: annotation=${example.startLine}-${example.endLine}줄, 실제=1-${codeExample.lineCount}줄`);
  } else if (!example.endLine) {
    console.log(`   ⚠️  줄 번호 범위가 명시되지 않았습니다 (실제: 1-${codeExample.lineCount}줄)`);
  }
  
  return !hasError;
}

/**
 * 단일 개념의 annotation을 검증합니다.
 */
function validateConcept(conceptId) {
  const config = CONCEPT_PATHS[conceptId];
  if (!config) {
    console.error(`❌ 알 수 없는 개념: ${conceptId}`);
    return false;
  }
  
  const annotationPath = path.join(process.cwd(), config.annotation);
  const codePath = path.join(process.cwd(), config.code);
  
  if (!fs.existsSync(annotationPath) || !fs.existsSync(codePath)) {
    console.error(`❌ 파일을 찾을 수 없습니다.`);
    return false;
  }
  
  console.log(`\n📋 ${conceptId} 검증 중...`);
  
  try {
    const examples = parseAnnotationFile(annotationPath, config.exportName);
    const codeExamples = parseCodeFile(codePath);
    
    if (!examples || examples.length === 0) {
      console.log(`   ⚠️  Annotation 예제를 찾을 수 없습니다.`);
      return false;
    }
    
    if (codeExamples.length === 0) {
      console.log(`   ⚠️  Code 예제를 찾을 수 없습니다.`);
      return false;
    }
    
    if (examples.length !== codeExamples.length) {
      console.log(`   ⚠️  예제 개수가 일치하지 않습니다: annotation=${examples.length}, code=${codeExamples.length}`);
    }
    
    let hasError = false;
    
    examples.forEach((example, index) => {
      if (index >= codeExamples.length) {
        console.log(`   ❌ 예제 ${index + 1} (${example.name}): Code 예제가 없습니다`);
        hasError = true;
        return;
      }
      
      const codeExample = codeExamples[index];
      const maxLine = codeExample.lineCount;
      
      // 줄 번호 범위 확인
      if (example.endLine && example.endLine !== maxLine) {
        console.log(`   ⚠️  예제 ${index + 1} (${example.name}): 줄 번호 범위 불일치 (annotation: ${example.startLine}-${example.endLine}줄, 실제: 1-${maxLine}줄)`);
      } else if (!example.endLine) {
        console.log(`   ⚠️  예제 ${index + 1} (${example.name}): 줄 번호 범위가 명시되지 않았습니다 (실제: 1-${maxLine}줄)`);
      }
      
      // 각 annotation의 줄 번호 확인
      example.annotations.forEach(ann => {
        if (ann.line > maxLine) {
          console.log(`   ❌ 예제 ${index + 1} (${example.name}): 줄 ${ann.line}이 최대 줄 수(${maxLine})를 초과합니다`);
          hasError = true;
        } else if (ann.line < 1) {
          console.log(`   ❌ 예제 ${index + 1} (${example.name}): 줄 ${ann.line}이 1보다 작습니다`);
          hasError = true;
        }
      });
      
      if (!hasError && example.annotations.length > 0) {
        console.log(`   ✅ 예제 ${index + 1} (${example.name}): ${example.annotations.length}개 annotation 검증 완료`);
      }
    });
    
    return !hasError;
  } catch (error) {
    console.error(`   ❌ 검증 중 오류 발생: ${error.message}`);
    console.error(error.stack);
    return false;
  }
}

// 메인 실행
const conceptId = process.argv[2];
const exampleIndex = process.argv[3] ? parseInt(process.argv[3]) : null;

if (conceptId && exampleIndex !== null) {
  // 특정 예제만 상세 검증
  const isValid = validateExampleDetail(conceptId, exampleIndex);
  process.exit(isValid ? 0 : 1);
} else if (conceptId) {
  // 특정 개념만 검증
  const isValid = validateConcept(conceptId);
  process.exit(isValid ? 0 : 1);
} else {
  // 모든 개념 검증
  console.log('🔍 모든 annotation 파일 검증 시작...\n');
  
  let allValid = true;
  Object.keys(CONCEPT_PATHS).forEach(conceptId => {
    const isValid = validateConcept(conceptId);
    if (!isValid) {
      allValid = false;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  if (allValid) {
    console.log('✅ 모든 검증 완료');
  } else {
    console.log('❌ 일부 검증 실패');
  }
  
  process.exit(allValid ? 0 : 1);
}
