import { CodeAnnotation } from '../codeAnnotations';

// 각 코드 예제별 해석 배열
export const linkedListAnnotations: Record<string, CodeAnnotation[][]> = {
  typescript: [
    // 첫 번째 예제: Node 구현 (1-19줄)
    [
      {
        line: 3,
        comment:
          'Node 클래스 정의: 링크드 리스트의 기본 단위인 노드입니다. 제네릭 타입 T를 사용하여 다양한 타입의 데이터를 저장할 수 있습니다.',
      },
      {
        line: 4,
        comment:
          'data 필드: 노드에 저장될 실제 데이터입니다. 제네릭 타입 T로 선언되어 다양한 타입을 저장할 수 있습니다.',
      },
      {
        line: 5,
        comment:
          'next 필드: 다음 노드를 가리키는 포인터입니다. null을 기본값으로 하여 마지막 노드를 표현합니다.',
      },
      {
        line: 7,
        comment:
          '생성자: 데이터와 다음 노드를 받아 노드를 초기화합니다. 다음 노드가 없으면 null로 설정합니다.',
      },
      {
        line: 13,
        comment:
          '노드 생성: new Node(1)을 사용하여 데이터가 1인 노드를 생성합니다. next는 기본값 null로 설정됩니다.',
      },
      {
        line: 15,
        comment:
          '노드 연결: node1.next = node2를 사용하여 node1의 다음 노드를 node2로 설정합니다. 이렇게 하면 두 노드가 연결됩니다.',
      },
      {
        line: 16,
        comment:
          'head 설정: head 변수에 node1을 할당하여 링크드 리스트의 시작점을 지정합니다.',
      },
    ],
    // 두 번째 예제: 링크드 리스트로 데이터 추가하기 (1-35줄)
    [
      {
        line: 13,
        comment:
          'head 변수: 링크드 리스트의 시작 노드를 가리키는 포인터입니다. 리스트가 비어있으면 null입니다.',
      },
      {
        line: 16,
        comment:
          'add 함수: 링크드 리스트의 끝에 데이터를 추가합니다. 리스트가 비어있으면 head를 새 노드로 설정하고, 그렇지 않으면 마지막 노드까지 이동한 후 새 노드를 추가합니다. O(n) 시간이 소요됩니다.',
      },
      {
        line: 17,
        comment:
          '빈 리스트 체크: head가 null이면 리스트가 비어있는 상태이므로, head를 새 노드로 설정하고 함수를 종료합니다.',
      },
      {
        line: 22,
        comment:
          '마지막 노드 찾기: 현재 노드를 head로 시작하여 next가 null인 노드까지 이동합니다. 이 노드가 리스트의 마지막 노드입니다.',
      },
      {
        line: 23,
        comment:
          'while 루프: node.next가 null이 아닐 때까지 반복하여 마지막 노드를 찾습니다. 마지막 노드의 next는 항상 null입니다.',
      },
      {
        line: 26,
        comment:
          '새 노드 추가: 마지막 노드의 next를 새 노드로 설정하여 리스트의 끝에 노드를 추가합니다.',
      },
    ],
    // 세 번째 예제: 링크드 리스트 데이터 출력하기 (1-30줄)
    [
      {
        line: 12,
        comment:
          'getAllData 함수: 링크드 리스트의 모든 데이터를 배열로 변환하여 반환합니다. 제네릭 타입을 사용하여 다양한 타입을 처리할 수 있습니다.',
      },
      {
        line: 13,
        comment:
          'result 배열: 반환할 배열을 초기화합니다. 각 노드의 데이터를 이 배열에 추가합니다.',
      },
      {
        line: 14,
        comment:
          'node 변수: 현재 탐색 중인 노드를 가리키는 포인터입니다. head부터 시작하여 null까지 이동합니다.',
      },
      {
        line: 16,
        comment:
          'while 루프: node가 null이 아닐 때까지 반복하여 모든 노드를 순회합니다. null이면 리스트의 끝에 도달한 것입니다.',
      },
      {
        line: 17,
        comment:
          '데이터 추가: 현재 노드의 데이터를 result 배열에 추가합니다. push 메서드를 사용하여 O(1) 시간에 추가합니다.',
      },
      {
        line: 18,
        comment:
          '다음 노드로 이동: node.next를 사용하여 다음 노드로 이동합니다. 마지막 노드의 next는 null이므로 루프가 종료됩니다.',
      },
    ],
    // 네 번째 예제: 링크드 리스트 데이터 사이에 데이터를 추가 (1-46줄)
    [
      {
        line: 12,
        comment:
          'insertBefore 함수: 특정 값 앞에 새 노드를 삽입하는 함수입니다. 제네릭 타입을 사용하여 다양한 타입을 처리할 수 있습니다.',
      },
      {
        line: 13,
        comment:
          '빈 리스트 체크: head가 null이면 리스트가 비어있으므로, 새 노드를 생성하여 반환합니다.',
      },
      {
        line: 18,
        comment:
          'head가 target인 경우: head 노드가 찾는 값이면, 새 노드를 head 앞에 삽입합니다. 새 노드의 next를 기존 head로 설정하고, 새 노드를 head로 반환합니다.',
      },
      {
        line: 25,
        comment:
          '중간에 삽입: head가 아닌 노드 앞에 삽입하는 경우입니다. target을 찾을 때까지 리스트를 순회합니다.',
      },
      {
        line: 27,
        comment:
          'target 찾기: node.next.data가 targetData와 같으면 삽입할 위치를 찾은 것입니다. node.next 앞에 새 노드를 삽입해야 합니다.',
      },
      {
        line: 29,
        comment:
          '새 노드 생성 및 연결: 새 노드를 생성하고, 새 노드의 next를 node.next로 설정한 후, node.next를 새 노드로 설정합니다. 이렇게 하면 새 노드가 중간에 삽입됩니다.',
      },
    ],
    // 다섯 번째 예제: 객체지향 프로그래밍으로 링크드 리스트 구현 (1-57줄)
    [
      {
        line: 13,
        comment:
          'LinkedList 클래스: 객체지향 방식으로 링크드 리스트를 구현합니다. head를 private으로 선언하여 캡슐화합니다.',
      },
      {
        line: 16,
        comment:
          '생성자: 선택적 파라미터를 받아 초기값을 설정할 수 있습니다. 파라미터가 없으면 빈 리스트로 시작합니다.',
      },
      {
        line: 23,
        comment:
          'add 메서드: 링크드 리스트의 끝에 데이터를 추가합니다. 클래스 내부에서 head를 관리하므로 더 안전하고 구조화된 방식입니다.',
      },
      {
        line: 37,
        comment:
          'toArray 메서드: 링크드 리스트의 모든 데이터를 배열로 변환하여 반환합니다. 리스트의 내용을 확인하거나 출력할 때 유용합니다.',
      },
    ],
    // 여섯 번째 예제: 특정 노드 삭제 (1-80줄)
    [
      {
        line: 47,
        comment:
          'delete 메서드: 특정 데이터를 가진 노드를 삭제합니다. 삭제 성공 여부를 boolean으로 반환합니다.',
      },
      {
        line: 48,
        comment:
          '빈 리스트 체크: head가 null이면 리스트가 비어있으므로 삭제할 노드가 없습니다. false를 반환합니다.',
      },
      {
        line: 53,
        comment:
          'head 노드 삭제: head 노드가 삭제할 데이터를 가지고 있으면, head를 head.next로 변경하여 head 노드를 삭제합니다. O(1) 시간이 소요됩니다.',
      },
      {
        line: 59,
        comment:
          '중간 또는 끝 노드 삭제: head가 아닌 노드를 삭제하는 경우입니다. 삭제할 노드의 이전 노드를 찾아야 합니다.',
      },
      {
        line: 61,
        comment:
          '삭제할 노드 찾기: node.next.data가 삭제할 데이터와 같으면 삭제할 노드를 찾은 것입니다.',
      },
      {
        line: 62,
        comment:
          '노드 삭제: node.next를 node.next.next로 변경하여 중간 노드를 건너뛰고 삭제합니다. 이렇게 하면 삭제할 노드가 리스트에서 제거됩니다.',
      },
    ],
    // 일곱 번째 예제: 더블 링크드 리스트 기본 구조 (1-67줄)
    [
      {
        line: 4,
        comment:
          'Node 클래스 (더블 링크드 리스트): prev와 next 두 개의 포인터를 가진 노드입니다. 양방향으로 탐색할 수 있습니다.',
      },
      {
        line: 5,
        comment:
          'prev 필드: 이전 노드를 가리키는 포인터입니다. 단일 링크드 리스트와 달리 양방향으로 이동할 수 있습니다.',
      },
      {
        line: 16,
        comment:
          'DoublyLinkedList 클래스: 더블 링크드 리스트를 관리하는 클래스입니다. head와 tail을 모두 관리하여 양방향 탐색을 지원합니다.',
      },
      {
        line: 28,
        comment:
          'insert 메서드: 더블 링크드 리스트의 끝에 데이터를 추가합니다. 새 노드의 prev를 이전 노드로 설정하여 양방향 연결을 유지합니다.',
      },
      {
        line: 42,
        comment:
          '양방향 연결: newNode.prev = node를 설정하여 새 노드가 이전 노드를 가리키도록 합니다. 이렇게 하면 양방향 탐색이 가능합니다.',
      },
    ],
    // 여덟 번째 예제: 더블 링크드 리스트 head/tail에서 검색 (1-99줄)
    [
      {
        line: 56,
        comment:
          'searchFromHead 메서드: head에서부터 시작하여 특정 데이터를 검색합니다. 단일 링크드 리스트와 동일한 방식으로 동작합니다.',
      },
      {
        line: 73,
        comment:
          'searchFromTail 메서드: tail에서부터 시작하여 특정 데이터를 검색합니다. prev 포인터를 사용하여 역방향으로 탐색합니다. 이것이 더블 링크드 리스트의 장점입니다.',
      },
      {
        line: 78,
        comment:
          '역방향 탐색: node.prev를 사용하여 이전 노드로 이동합니다. head에 도달할 때까지 반복하여 데이터를 검색합니다.',
      },
    ],
    // 아홉 번째 예제: 더블 링크드 리스트 특정 노드 앞에 데이터 추가 (1-118줄)
    [
      {
        line: 73,
        comment:
          'insertBefore 메서드: 특정 데이터 앞에 새 노드를 삽입합니다. tail에서부터 검색하여 삽입 위치를 찾습니다.',
      },
      {
        line: 80,
        comment:
          'tail에서부터 검색: node를 tail로 시작하여 prev를 따라 이동하면서 beforeData를 찾습니다. 역방향 탐색의 예시입니다.',
      },
      {
        line: 90,
        comment:
          'head 앞에 삽입: node.prev가 null이면 head 노드이므로, 새 노드를 head 앞에 삽입하고 head를 새 노드로 업데이트합니다.',
      },
      {
        line: 99,
        comment:
          '중간에 삽입: 양방향 포인터를 모두 업데이트하여 새 노드를 중간에 삽입합니다. beforeNew.next와 newNode.prev를 설정하여 연결을 유지합니다.',
      },
    ],
    // 열 번째 예제: 더블 링크드 리스트 특정 노드 뒤에 데이터 추가 (1-120줄)
    [
      {
        line: 73,
        comment:
          'insertAfter 메서드: 특정 데이터 뒤에 새 노드를 삽입합니다. head에서부터 검색하여 삽입 위치를 찾습니다.',
      },
      {
        line: 80,
        comment:
          'head에서부터 검색: node를 head로 시작하여 next를 따라 이동하면서 afterData를 찾습니다. 정방향 탐색의 예시입니다.',
      },
      {
        line: 89,
        comment:
          'tail 뒤에 삽입: node.next가 null이면 tail 노드이므로, 새 노드를 tail 뒤에 삽입하고 tail을 새 노드로 업데이트합니다.',
      },
      {
        line: 99,
        comment:
          '중간에 삽입: 양방향 포인터를 모두 업데이트하여 새 노드를 중간에 삽입합니다. newNode.next와 afterNew.prev를 설정하여 연결을 유지합니다.',
      },
    ],
    // 열한 번째 예제: 깔끔하게 정리된 LinkedList 구현 (1-164줄)
    [
      {
        line: 12,
        comment:
          'LinkedList 클래스: 완전한 링크드 리스트 구현입니다. size 필드를 추가하여 리스트의 크기를 O(1) 시간에 알 수 있습니다.',
      },
      {
        line: 14,
        comment:
          'size 필드: 리스트에 저장된 노드의 개수를 추적합니다. add, remove 등의 연산 시 업데이트하여 항상 정확한 크기를 유지합니다.',
      },
      {
        line: 24,
        comment:
          'append 메서드: 리스트의 끝에 데이터를 추가합니다. add 메서드와 동일한 기능이지만 더 명확한 이름을 사용합니다.',
      },
      {
        line: 40,
        comment:
          'prepend 메서드: 리스트의 앞에 데이터를 추가합니다. 새 노드의 next를 기존 head로 설정하고, head를 새 노드로 업데이트합니다. O(1) 시간이 소요됩니다.',
      },
      {
        line: 48,
        comment:
          'insertAt 메서드: 특정 인덱스에 데이터를 삽입합니다. 인덱스가 유효한지 확인한 후, 해당 위치에 노드를 삽입합니다.',
      },
      {
        line: 80,
        comment:
          'find 메서드: 특정 데이터를 가진 노드를 검색합니다. head부터 시작하여 리스트를 순회하면서 데이터를 찾습니다. O(n) 시간이 소요됩니다.',
      },
      {
        line: 94,
        comment:
          'remove 메서드: 특정 데이터를 가진 노드를 제거합니다. find 메서드와 유사하게 리스트를 순회하여 노드를 찾고 제거합니다.',
      },
    ],
    // 열두 번째 예제: 깔끔하게 정리된 DoublyLinkedList 구현 (1-220줄)
    [
      {
        line: 14,
        comment:
          'DoublyLinkedList 클래스: 완전한 더블 링크드 리스트 구현입니다. head와 tail을 모두 관리하여 양방향 탐색과 삽입/삭제를 효율적으로 지원합니다.',
      },
      {
        line: 28,
        comment:
          'append 메서드: 리스트의 끝에 데이터를 추가합니다. tail을 사용하여 O(1) 시간에 추가할 수 있습니다. 이것이 더블 링크드 리스트의 장점입니다.',
      },
      {
        line: 39,
        comment:
          'tail 업데이트: tail.next를 새 노드로 설정하고, 새 노드의 prev를 tail로 설정하여 양방향 연결을 유지합니다.',
      },
      {
        line: 46,
        comment:
          'prepend 메서드: 리스트의 앞에 데이터를 추가합니다. head를 사용하여 O(1) 시간에 추가할 수 있습니다.',
      },
      {
        line: 91,
        comment:
          'remove 메서드: 특정 데이터를 가진 노드를 제거합니다. 양방향 포인터를 모두 업데이트하여 노드를 제거합니다.',
      },
      {
        line: 127,
        comment:
          'insertAt 메서드: 특정 인덱스에 데이터를 삽입합니다. head 또는 tail에 가까운 경우 효율적으로 삽입할 수 있습니다.',
      },
    ],
  ],
};
