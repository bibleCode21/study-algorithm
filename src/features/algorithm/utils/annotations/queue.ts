import { CodeAnnotation, LanguageAnnotations } from '../codeAnnotations';

// 각 코드 예제별 해석 배열
export const queueAnnotations: LanguageAnnotations = {
  typescript: [
    // 첫 번째 예제: 기본 큐 구현 (1-41줄)
    [
      {
        line: 2,
        comment:
          'Queue 클래스 정의: 제네릭 타입 T를 사용하여 다양한 타입의 데이터를 저장할 수 있습니다. FIFO(First-In, First-Out) 구조를 구현합니다.',
      },
      {
        line: 3,
        comment:
          'items 배열: 큐의 데이터를 저장하는 내부 배열입니다. private으로 선언하여 외부에서 직접 접근할 수 없도록 캡슐화합니다.',
      },
      {
        line: 12,
        comment:
          'enqueue 메서드: 큐의 끝에 데이터를 추가합니다. push 메서드를 사용하여 O(1) 시간에 추가할 수 있습니다.',
      },
      {
        line: 17,
        comment:
          'dequeue 메서드: 큐의 앞에서 데이터를 제거하고 반환합니다. shift 메서드를 사용하지만, 이는 O(n) 시간이 소요됩니다. (실제 프로덕션에서는 더 효율적인 구현 사용)',
      },
      {
        line: 22,
        comment:
          'front 메서드: 큐의 가장 앞에 있는 데이터를 확인합니다. 데이터를 제거하지 않고 단순히 확인만 하므로 O(1) 시간이 소요됩니다.',
      },
      {
        line: 27,
        comment:
          'isEmpty 메서드: 큐가 비어있는지 확인합니다. 배열의 길이가 0인지 확인하여 O(1) 시간에 판단할 수 있습니다.',
      },
      {
        line: 32,
        comment:
          'size 메서드: 큐에 저장된 데이터의 개수를 반환합니다. 배열의 길이를 반환하므로 O(1) 시간이 소요됩니다.',
      },
    ],
    // 두 번째 예제: 원형 큐 구현 (1-58줄)
    [
      {
        line: 2,
        comment:
          'CircularQueue 클래스: 고정 크기의 원형 큐로, 인덱스를 순환시키며 FIFO 구조를 유지합니다.',
      },
      {
        line: 3,
        comment:
          'items 배열: 고정 크기의 슬롯을 미리 만들어 두고 큐 요소를 저장합니다.',
      },
      {
        line: 8,
        comment:
          '생성자: capacity 값을 받아 고정 크기 배열을 초기화합니다.',
      },
      {
        line: 12,
        comment:
          'enqueue 메서드: 가득 차면 false를 반환하고, 그렇지 않으면 rear 위치에 추가합니다.',
      },
      {
        line: 22,
        comment:
          'dequeue 메서드: 비어 있으면 undefined를 반환하고, front 위치의 값을 꺼낸 뒤 인덱스를 순환시킵니다.',
      },
      {
        line: 33,
        comment:
          'peek 메서드: front 위치의 값을 제거 없이 확인합니다.',
      },
      {
        line: 41,
        comment:
          'isFull 메서드: length와 capacity를 비교하여 포화 여부를 확인합니다.',
      },
      {
        line: 45,
        comment:
          'size 메서드: 현재 저장된 요소 수를 반환합니다.',
      },
    ],
    // 세 번째 예제: PriorityQueue 구현 (1-46줄)
    [
      {
        line: 3,
        comment:
          'PriorityQueue 클래스: 우선순위가 높은 순서대로 데이터를 출력하는 큐입니다. 우선순위와 데이터를 함께 저장합니다.',
      },
      {
        line: 4,
        comment:
          'items 배열: [우선순위, 데이터] 튜플을 저장하는 배열입니다. 우선순위는 숫자로 표현되며, 낮은 숫자가 높은 우선순위를 의미합니다.',
      },
      {
        line: 6,
        comment:
          '생성자: 우선순위와 데이터를 받아 초기값을 설정할 수 있습니다. 설정 시 자동으로 정렬됩니다.',
      },
      {
        line: 9,
        comment:
          '정렬: sort 메서드를 사용하여 우선순위 순으로 정렬합니다. a[0] - b[0]은 우선순위를 비교하여 오름차순으로 정렬합니다.',
      },
      {
        line: 14,
        comment:
          'enqueue 메서드: 우선순위와 데이터를 함께 저장합니다. 저장 후 우선순위 순으로 정렬하여 항상 우선순위가 높은 데이터가 앞에 오도록 합니다.',
      },
      {
        line: 17,
        comment:
          '정렬 로직: 낮은 숫자가 높은 우선순위를 의미하므로, a[0] - b[0]으로 오름차순 정렬하면 우선순위가 높은 데이터가 앞에 옵니다.',
      },
      {
        line: 20,
        comment:
          'dequeue 메서드: 가장 앞에 있는 데이터(가장 높은 우선순위)를 제거하고 반환합니다. shift 메서드를 사용하여 O(n) 시간이 소요됩니다.',
      },
      {
        line: 22,
        comment:
          '데이터 추출: item[1]을 사용하여 튜플에서 데이터 부분만 추출합니다. item[0]은 우선순위입니다.',
      },
    ],
    // 네 번째 예제: 리스트를 이용한 큐 구현 (1-28줄)
    [
      {
        line: 2,
        comment:
          'queueList 배열: 큐의 데이터를 저장하는 전역 배열입니다. 클래스 없이 간단하게 큐를 구현합니다.',
      },
      {
        line: 5,
        comment:
          'enqueue 함수: 큐의 끝에 데이터를 추가하는 함수입니다. push 메서드를 사용하여 O(1) 시간에 추가합니다.',
      },
      {
        line: 10,
        comment:
          'dequeue 함수: 큐의 앞에서 데이터를 제거하고 반환하는 함수입니다. shift 메서드를 사용하지만 O(n) 시간이 소요됩니다.',
      },
      {
        line: 11,
        comment:
          '빈 큐 체크: 큐가 비어있으면 undefined를 반환합니다. length가 0인지 확인하여 O(1) 시간에 판단할 수 있습니다.',
      },
      {
        line: 14,
        comment:
          '첫 번째 요소 가져오기: queueList[0]을 사용하여 큐의 가장 앞에 있는 데이터에 접근합니다.',
      },
      {
        line: 15,
        comment:
          '첫 번째 요소 제거: shift 메서드를 사용하여 배열의 첫 번째 요소를 제거합니다. 이 과정에서 나머지 요소들이 한 칸씩 앞으로 이동하므로 O(n) 시간이 소요됩니다.',
      },
      {
        line: 20,
        comment:
          '반복문으로 데이터 추가: 0부터 9까지 10개의 데이터를 큐에 추가합니다. 먼저 추가된 데이터가 가장 앞에 있습니다.',
      },
      {
        line: 26,
        comment:
          'FIFO 동작 확인: dequeue()를 호출하면 가장 먼저 추가된 요소(0)가 먼저 제거됩니다. 이것이 FIFO 구조의 특징입니다.',
      },
    ],
  ],
};

