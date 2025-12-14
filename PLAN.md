# 알고리즘 정리 페이지 개발 계획

## 📋 프로젝트 개요
공부한 알고리즘들을 체계적으로 정리하고 시각화할 수 있는 웹 애플리케이션
- 알고리즘 학습 전 필수 데이터 구조 개념 학습
- 알고리즘 개념 학습 및 다양한 뷰로 이해도 향상
- 랜덤 문제 풀이를 통한 실전 연습

## 🎯 목표
- 학습한 알고리즘을 카테고리별로 정리
- 각 알고리즘의 설명, 시간복잡도, 공간복잡도, 예제 코드 제공
- 인터랙티브한 UI로 알고리즘 동작 과정 시각화
- 검색 및 필터링 기능으로 원하는 알고리즘 빠르게 찾기
- 개념을 다양한 디자인/뷰로 학습할 수 있는 기능
- 랜덤 문제 풀이를 통한 실전 연습

## 🏗️ 프로젝트 구조

### 1. 페이지 구조
```
/ (메인 페이지)
  ├── 데이터 구조 & 알고리즘 목록 (카드 형태)
  ├── 검색/필터 기능
  └── 카테고리별 분류
    ├── 데이터 구조 (필수 개념)
    ├── 정렬 알고리즘
    ├── 탐색 알고리즘
    ├── 그래프 알고리즘
    └── 동적 프로그래밍

/concept/[id] (개념 페이지 - 데이터 구조/알고리즘 공통)
  ├── 개념 설명
  ├── 시간/공간 복잡도 (알고리즘인 경우)
  ├── 예제 코드
  ├── 시각화 (선택적)
  ├── 뷰 전환 기능 (다양한 디자인으로 보기)
  └── 문제 풀이로 이동 버튼 (알고리즘인 경우)

/concept/[id]/practice (문제 풀이 페이지)
  ├── 랜덤 문제 출제
  ├── 문제 설명
  ├── 코드 에디터
  ├── 실행/제출 기능
  └── 정답 확인 및 해설
```

### 2. 컴포넌트 구조 (Feature-based)
```
src/
├── components/                    # 공통 재사용 컴포넌트
│   ├── ui/                       # 기본 UI 컴포넌트
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Badge/
│   │   └── Input/
│   ├── CodeBlock/                # 코드 블록 (문법 하이라이팅)
│   ├── SearchBar/                # 검색 바 (공통)
│   └── Layout/                   # 레이아웃 컴포넌트
│       ├── Header/
│       ├── Footer/
│       └── Container/
│
├── features/                      # 기능별 모듈
│   │                              # ⚠️ features 내부 구조는 유연하게 변화
│   │                              # 필요에 따라 components, hooks, store, types, utils 등을 자유롭게 구성
│   │
│   ├── algorithm/                # 알고리즘 관련 기능
│   │   ├── components/
│   │   │   ├── AlgorithmCard/    # 알고리즘 카드
│   │   │   ├── CategoryFilter/   # 카테고리 필터
│   │   │   ├── ViewSwitcher/     # 뷰 전환 컴포넌트
│   │   │   └── ConceptView/      # 개념 뷰 컴포넌트들
│   │   │       ├── DefaultView.tsx
│   │   │       ├── CompactView.tsx
│   │   │       ├── VisualView.tsx
│   │   │       └── CodeFirstView.tsx
│   │   ├── hooks/
│   │   │   ├── useAlgorithm.ts   # 알고리즘 데이터 훅
│   │   │   ├── useSearch.ts      # 검색 기능 훅
│   │   │   └── useViewMode.ts    # 뷰 모드 관리 훅
│   │   ├── store/                # 상태 관리 (zustand/jotai)
│   │   │   └── algorithmStore.ts
│   │   ├── types/
│   │   │   └── algorithm.ts      # 알고리즘 타입
│   │   └── utils/
│   │       └── algorithmUtils.ts
│   │
│   ├── practice/                 # 문제 풀이 관련 기능
│   │   ├── components/
│   │   │   ├── ProblemDisplay/   # 문제 표시
│   │   │   ├── CodeEditor/       # 코드 에디터
│   │   │   ├── TestRunner/       # 테스트 실행
│   │   │   └── SolutionView/     # 해설 뷰
│   │   ├── hooks/
│   │   │   ├── useProblem.ts     # 문제 데이터 훅
│   │   │   ├── useCodeEditor.ts  # 코드 에디터 훅
│   │   │   └── useTestRunner.ts  # 테스트 실행 훅
│   │   ├── store/
│   │   │   └── practiceStore.ts
│   │   ├── types/
│   │   │   └── problem.ts        # 문제 타입
│   │   └── utils/
│   │       └── problemGenerator.ts  # 랜덤 문제 생성
│   │
│   └── home/                     # 홈 페이지 관련 기능
│       ├── components/
│       │   └── AlgorithmGrid/    # 알고리즘 그리드
│       ├── hooks/
│       │   └── useHome.ts
│       └── store/
│           └── homeStore.ts
│
├── app/                          # Next.js App Router 페이지
│   ├── page.tsx                  # 메인 페이지
│   ├── concept/
│   │   └── [id]/
│   │       ├── page.tsx          # 개념 상세 페이지
│   │       └── practice/
│   │           └── page.tsx      # 문제 풀이 페이지
│   └── layout.tsx                # 루트 레이아웃
│
├── data/                         # 정적 데이터
│   ├── concepts.ts               # 데이터 구조 + 알고리즘 통합 데이터
│   └── problems.ts
│
├── types/                        # 공통 타입
│   └── common.ts
│
└── utils/                        # 공통 유틸리티
    └── search.ts
```

## 📊 데이터 구조

### Concept 타입 (데이터 구조 + 알고리즘 통합)
```typescript
interface Concept {
  id: string;
  title: string;
  type: 'data-structure' | 'algorithm';  // 데이터 구조 또는 알고리즘 구분
  category: string[];  // 예: ['정렬', '그래프', '탐색', '데이터 구조']
  description: string;
  // 알고리즘인 경우에만 필요 (데이터 구조는 선택적)
  timeComplexity?: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity?: string;
  code: {
    language: string;
    code: string;
  }[];
  examples?: string[];
  visualization?: boolean;
  problems?: string[];  // 관련 문제 ID 목록 (알고리즘인 경우)
  tags: string[];
  // 다양한 뷰를 위한 추가 데이터
  views?: {
    default?: ViewConfig;
    compact?: ViewConfig;
    visual?: ViewConfig;
    codeFirst?: ViewConfig;
  };
}

interface ViewConfig {
  layout: 'default' | 'compact' | 'visual' | 'codeFirst';
  sections: string[];  // 표시할 섹션 순서
  emphasis?: 'description' | 'code' | 'complexity' | 'visual';
}
```

### Problem 타입
```typescript
interface Problem {
  id: string;
  conceptId: string;  // 관련 개념 ID (데이터 구조 또는 알고리즘)
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints?: string[];
  testCases: {
    input: any;
    expectedOutput: any;
  }[];
  solution?: {
    code: string;
    language: string;
    explanation: string;
  };
  hints?: string[];
  tags: string[];
}
```

## 🎨 UI/UX 계획

### 메인 페이지
- **헤더**: 프로젝트 제목, 검색 바
- **카테고리 탭/필터**: 
  - 데이터 구조 (필수 개념)
  - 정렬, 탐색, 그래프, 동적 프로그래밍 등
- **개념 그리드**: 카드 형태로 표시 (데이터 구조 + 알고리즘)
  - 개념 이름
  - 타입 뱃지 (데이터 구조 / 알고리즘)
  - 카테고리 태그
  - 복잡도 뱃지 (알고리즘인 경우)
  - 간단한 설명
- **검색 기능**: 제목, 설명, 태그로 검색
- **필터 기능**: 타입별 필터 (데이터 구조만 보기, 알고리즘만 보기)

### 개념 페이지 (/concept/[id])
**데이터 구조와 알고리즘 모두 공통 구조 사용**
- **제목 및 카테고리**
- **뷰 전환 버튼**: 다양한 디자인으로 보기
  - 기본 뷰: 모든 정보 균형있게 표시
  - 컴팩트 뷰: 핵심만 간결하게
  - 시각화 뷰: 시각화와 설명 중심
  - 코드 중심 뷰: 코드와 복잡도 중심
- **설명 섹션**
- **복잡도 표**: Best/Average/Worst 시간복잡도, 공간복잡도
- **코드 예제**: 탭으로 여러 언어 지원 (선택적)
- **시각화 영역** (선택적)
- **문제 풀이로 이동 버튼**: 랜덤 문제 풀기

### 문제 풀이 페이지 (/concept/[id]/practice)
- **문제 헤더**: 알고리즘 이름, 난이도 뱃지
- **문제 설명**: 
  - 문제 제목 및 설명
  - 예제 입출력
  - 제약 조건
- **코드 에디터**: 
  - 문법 하이라이팅
  - 자동 완성 (선택적)
  - 실행 버튼
- **테스트 케이스 실행**:
  - 테스트 케이스별 결과 표시
  - 통과/실패 상태
- **제출 및 결과**:
  - 정답 확인
  - 해설 보기
  - 다음 문제로 이동 (랜덤)
- **힌트 기능**: 필요시 힌트 제공

## 🚀 개발 단계

### Phase 1: 기본 구조 설정 ✅
- [x] 프로젝트 구조 생성
- [x] 타입 정의
- [x] 기본 레이아웃 컴포넌트
- [x] Next.js App Router 페이지 구조 설정

### Phase 2: 데이터 및 UI ✅
- [x] 개념 데이터 구조 설계 (데이터 구조 + 알고리즘 통합)
- [x] 샘플 데이터 추가
  - [x] 데이터 구조 7개 (Array, Stack, Queue, Linked List, Heap, Hash Table, Tree)
  - [x] 알고리즘 2개 (Bubble Sort, Binary Search)
- [x] ConceptCard 컴포넌트 (데이터 구조/알고리즘 공통)
- [x] 메인 페이지 레이아웃

### Phase 3: 기능 구현 ✅
- [x] 검색 기능
- [x] 카테고리 필터
- [x] 개념 페이지 (상세 페이지)
- [x] 코드 블록 (문법 하이라이팅 라이브러리 - shiki)
- [x] 뷰 전환 기능 (다양한 디자인)
  - [x] 기본 뷰
  - [x] 컴팩트 뷰
  - [x] 코드 중심 뷰 (코드 해석 포함)
  - [ ] 시각화 뷰 (제거됨 - 구현 복잡도로 인해 제외)

### Phase 4: 문제 풀이 기능 ✅
- [x] 문제 데이터 구조 설계
- [x] 샘플 문제 데이터 추가
- [x] 문제 풀이 페이지 레이아웃
- [x] 코드 에디터 통합 (Monaco Editor)
- [x] 테스트 케이스 실행 기능
- [x] 랜덤 문제 생성 로직
- [x] 정답 확인 및 해설 기능
- [x] 문제 목록 페이지 (`/practice`)

### Phase 5: 고급 기능 (선택적)
- [ ] 알고리즘 시각화 (선택적)
- [ ] 다크 모드 (선택적)
- [x] 반응형 디자인 (기본 구현 완료)
- [ ] 성능 최적화
- [ ] 문제 풀이 히스토리 저장 (로컬 스토리지)

## 📦 필요한 라이브러리

### 필수
- 코드 문법 하이라이팅 (선택 중):
  - `shiki`: 빠르고 현대적인 문법 하이라이터 (VS Code와 동일한 엔진)
  - 또는 `prism-react-renderer`: 가볍고 커스터마이징 가능
- 코드 에디터 라이브러리 (선택 중):
  - `@monaco-editor/react`: Monaco Editor (VS Code 에디터)
  - 또는 `@uiw/react-codemirror`: CodeMirror 6 기반

### 선택적
- `framer-motion`: 애니메이션 (React 19 지원)
- `react-markdown`: 마크다운 렌더링
- 상태 관리 (필요시):
  - `zustand`: 가볍고 간단한 상태 관리
  - 또는 `jotai`: 원자 기반 상태 관리
- 알림/토스트:
  - `sonner`: 가볍고 현대적인 토스트 라이브러리 (권장)
  - 또는 `react-hot-toast`: 널리 사용되는 토스트 라이브러리

## 🎯 학습 콘텐츠 목록

### 0. 데이터 구조 (필수 개념) - 알고리즘 학습 전 필수
1. **Array (배열)**
   - 기본 개념 및 특징
   - 시간/공간 복잡도
   - 구현 예제

2. **Linked List (연결 리스트)**
   - 단일 연결 리스트
   - 이중 연결 리스트
   - 원형 연결 리스트

3. **Stack (스택)**
   - LIFO 개념
   - 구현 방법
   - 활용 예제

4. **Queue (큐)**
   - FIFO 개념
   - 구현 방법
   - 우선순위 큐

5. **Tree (트리)**
   - 이진 트리
   - 이진 탐색 트리 (BST)
   - 트리 순회 방법

6. **Heap (힙)**
   - 최소 힙
   - 최대 힙
   - 힙 정렬과의 관계

7. **Hash Table (해시 테이블)**
   - 해시 함수
   - 충돌 해결 방법
   - 시간 복잡도

### 1. 정렬 알고리즘
- 버블 정렬
- 선택 정렬
- 삽입 정렬
- 병합 정렬
- 퀵 정렬
- 힙 정렬

### 2. 탐색 알고리즘
- 이진 탐색
- DFS (깊이 우선 탐색)
- BFS (너비 우선 탐색)

### 3. 그래프 알고리즘
- 다익스트라
- 플로이드-워셜
- 크루스칼
- 프림

### 4. 동적 프로그래밍
- 피보나치
- 배낭 문제
- LCS (최장 공통 부분 수열)

## 💡 추가 고려사항

1. **데이터 저장 방식**
   - 초기: TypeScript/JSON 파일로 관리 (읽기 전용 개념/알고리즘 데이터)
   - 사용자 데이터: 로컬 스토리지 활용 (간단한 설정, 히스토리 등)
   - DB 필요 시: Next.js API Routes 활용하여 서버 사이드에서 DB 연동
   - 서버 컴포넌트와 클라이언트 컴포넌트 적절히 구분하여 활용

2. **확장성**
   - 새로운 데이터 구조/알고리즘 추가가 쉬운 구조
   - 카테고리 추가 용이
   - 새로운 뷰 디자인 추가 용이
   - 문제 추가 및 관리 용이
   - features 폴더 내부 구조는 필요에 따라 유연하게 변경 가능

3. **성능**
   - 대량의 알고리즘 데이터 처리
   - 검색 성능 최적화
   - 코드 에디터 성능 최적화

4. **접근성**
   - 키보드 네비게이션
   - 스크린 리더 지원

5. **문제 풀이 기능**
   - 랜덤 문제 선택 알고리즘 (난이도별, 학습 진도 고려)
   - 코드 실행 환경 (브라우저 내 실행 vs 서버 실행)
   - 테스트 케이스 검증 로직
   - 사용자 코드 실행 보안 (Sandbox)

6. **뷰 전환 기능**
   - 사용자 선호 뷰 저장 (로컬 스토리지)
   - 뷰별 최적화된 레이아웃
   - 부드러운 전환 애니메이션

## 📝 다음 단계

1. 이 계획 검토 및 수정
2. Phase 1 시작: 기본 구조 설정
3. 첫 번째 알고리즘 데이터 추가 및 테스트

