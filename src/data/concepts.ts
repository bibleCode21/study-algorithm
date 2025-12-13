import { Concept } from '@/features/algorithm/types/algorithm';

export const concepts: Concept[] = [
  // 데이터 구조
  {
    id: 'array',
    title: 'Array (배열)',
    type: 'data-structure',
    category: ['데이터 구조'],
    description: '배열은 동일한 타입의 요소들이 연속된 메모리 공간에 저장되는 선형 자료구조입니다. 인덱스를 통해 각 요소에 직접 접근할 수 있어 접근 시간이 O(1)입니다.',
    tags: ['배열', '선형 자료구조', '기초'],
  },
  {
    id: 'stack',
    title: 'Stack (스택)',
    type: 'data-structure',
    category: ['데이터 구조'],
    description: '스택은 LIFO(Last In First Out) 원칙을 따르는 선형 자료구조입니다. 가장 나중에 추가된 요소가 가장 먼저 제거됩니다. 주로 함수 호출, 역순 문자열, 괄호 검사 등에 사용됩니다.',
    tags: ['스택', 'LIFO', '선형 자료구조'],
  },
  {
    id: 'queue',
    title: 'Queue (큐)',
    type: 'data-structure',
    category: ['데이터 구조'],
    description: '큐는 FIFO(First In First Out) 원칙을 따르는 선형 자료구조입니다. 가장 먼저 추가된 요소가 가장 먼저 제거됩니다. 주로 BFS 알고리즘, 작업 스케줄링, 프린터 대기열 등에 사용됩니다.',
    tags: ['큐', 'FIFO', '선형 자료구조'],
  },
  // 알고리즘
  {
    id: 'bubble-sort',
    title: 'Bubble Sort (버블 정렬)',
    type: 'algorithm',
    category: ['정렬'],
    description: '버블 정렬은 인접한 두 요소를 비교하여 순서가 잘못된 경우 교환하는 방식으로 동작하는 간단한 정렬 알고리즘입니다. 구현이 쉽지만 시간 복잡도가 높아 실제로는 거의 사용되지 않습니다.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    tags: ['정렬', '버블 정렬', '기초'],
  },
  {
    id: 'binary-search',
    title: 'Binary Search (이진 탐색)',
    type: 'algorithm',
    category: ['탐색'],
    description: '이진 탐색은 정렬된 배열에서 특정 값을 효율적으로 찾는 알고리즘입니다. 배열의 중간값과 비교하여 탐색 범위를 절반씩 줄여나가며 O(log n) 시간에 탐색을 완료합니다.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
    },
    spaceComplexity: 'O(1)',
    tags: ['탐색', '이진 탐색', '분할 정복'],
  },
];
