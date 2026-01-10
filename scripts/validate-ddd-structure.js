#!/usr/bin/env node

/**
 * DDD 구조 검증 스크립트
 * 
 * 디렉토리 구조가 DDD 원칙에 맞게 구성되어 있는지 검증합니다.
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = process.cwd();
const SRC_DIR = path.join(BASE_DIR, 'src');

/**
 * 디렉토리 존재 여부 확인
 */
function directoryExists(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

/**
 * 파일 존재 여부 확인
 */
function fileExists(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

/**
 * 디렉토리 구조 검증
 */
function validateDirectoryStructure() {
  console.log('🔍 디렉토리 구조 검증 시작...\n');
  
  let allValid = true;
  const issues = [];

  // 1. 바운디드 컨텍스트 확인
  console.log('📋 바운디드 컨텍스트 확인:');
  const contexts = ['algorithm', 'practice', 'home'];
  
  contexts.forEach(context => {
    const contextDir = path.join(SRC_DIR, 'features', context);
    if (directoryExists(contextDir)) {
      console.log(`   ✅ ${context} Context 존재`);
      
      // 각 컨텍스트의 타입 디렉토리 확인
      const typesDir = path.join(contextDir, 'types');
      if (directoryExists(typesDir)) {
        console.log(`      ✅ types/ 디렉토리 존재`);
      } else {
        console.log(`      ⚠️  types/ 디렉토리 없음 (선택사항)`);
      }
      
      // 각 컨텍스트의 utils 디렉토리 확인
      const utilsDir = path.join(contextDir, 'utils');
      if (directoryExists(utilsDir)) {
        console.log(`      ✅ utils/ 디렉토리 존재`);
      } else {
        console.log(`      ⚠️  utils/ 디렉토리 없음 (선택사항)`);
      }
    } else {
      console.log(`   ❌ ${context} Context 없음`);
      issues.push(`${context} Context가 없습니다`);
      allValid = false;
    }
  });

  // 2. 도메인 데이터 레이어 확인
  console.log('\n📋 도메인 데이터 레이어 확인:');
  const dataDirs = ['concepts', 'exercises'];
  
  dataDirs.forEach(dataDir => {
    const fullPath = path.join(SRC_DIR, 'data', dataDir);
    if (directoryExists(fullPath)) {
      console.log(`   ✅ data/${dataDir}/ 디렉토리 존재`);
    } else {
      console.log(`   ⚠️  data/${dataDir}/ 디렉토리 없음`);
    }
  });

  // 3. 리포지토리 패턴 확인
  console.log('\n📋 리포지토리 패턴 확인:');
  const repositoryFiles = [
    'src/data/concepts.ts',
    'src/data/concepts/getConceptCode.ts',
    'src/data/exercises/index.ts',
  ];
  
  repositoryFiles.forEach(file => {
    const fullPath = path.join(BASE_DIR, file);
    if (fileExists(fullPath)) {
      console.log(`   ✅ ${file} 존재`);
    } else {
      console.log(`   ⚠️  ${file} 없음`);
    }
  });

  // 4. 도메인 모델 위치 확인
  console.log('\n📋 도메인 모델 위치 확인:');
  const domainModels = [
    { context: 'algorithm', model: 'algorithm.ts', path: 'src/features/algorithm/types/algorithm.ts' },
    { context: 'practice', model: 'exercise.ts', path: 'src/features/practice/types/exercise.ts' },
  ];
  
  domainModels.forEach(({ context, model, path: modelPath }) => {
    const fullPath = path.join(BASE_DIR, modelPath);
    if (fileExists(fullPath)) {
      console.log(`   ✅ ${context} Context의 ${model} 올바른 위치에 있음`);
    } else {
      console.log(`   ❌ ${context} Context의 ${model} 없음`);
      issues.push(`${context} Context의 도메인 모델이 없습니다`);
      allValid = false;
    }
  });

  // 5. 도메인 서비스 위치 확인
  console.log('\n📋 도메인 서비스 위치 확인:');
  const domainServices = [
    { context: 'algorithm', service: 'codeAnnotations.ts', path: 'src/features/algorithm/utils/codeAnnotations.ts' },
    { context: 'practice', service: 'codeExecutor.ts', path: 'src/features/practice/utils/codeExecutor.ts' },
  ];
  
  domainServices.forEach(({ context, service, path: servicePath }) => {
    const fullPath = path.join(BASE_DIR, servicePath);
    if (fileExists(fullPath)) {
      console.log(`   ✅ ${context} Context의 ${service} 올바른 위치에 있음`);
    } else {
      console.log(`   ⚠️  ${context} Context의 ${service} 없음 (선택사항)`);
    }
  });

  // 6. 프레젠테이션 레이어 확인
  console.log('\n📋 프레젠테이션 레이어 확인:');
  const presentationDirs = [
    { name: 'app', path: 'src/app' },
    { name: 'components', path: 'src/components' },
  ];
  
  presentationDirs.forEach(({ name, path: dirPath }) => {
    const fullPath = path.join(BASE_DIR, dirPath);
    if (directoryExists(fullPath)) {
      console.log(`   ✅ ${name}/ 디렉토리 존재`);
    } else {
      console.log(`   ⚠️  ${name}/ 디렉토리 없음`);
    }
  });

  // 7. 컨텍스트 간 의존성 확인 (간단한 검사)
  console.log('\n📋 컨텍스트 간 의존성 확인:');
  console.log('   ℹ️  수동으로 import 문을 확인해야 합니다.');
  console.log('   ℹ️  각 컨텍스트는 다른 컨텍스트의 내부 구현에 의존하지 않아야 합니다.');

  // 결과 출력
  console.log('\n' + '='.repeat(50));
  if (allValid && issues.length === 0) {
    console.log('✅ 모든 구조 검증 완료');
  } else {
    console.log('⚠️  일부 검증 실패');
    if (issues.length > 0) {
      console.log('\n발견된 문제:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    }
  }

  return allValid;
}

// 메인 실행
const isValid = validateDirectoryStructure();
process.exit(isValid ? 0 : 1);
