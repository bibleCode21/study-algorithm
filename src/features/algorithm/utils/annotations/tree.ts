import { CodeAnnotation } from '../codeAnnotations';

// 각 코드 예제별 해석 배열
export const treeAnnotations: Record<string, CodeAnnotation[][]> = {
  typescript: [
    // 첫 번째 예제: 노드 클래스 만들기
    [
      {
        line: 2,
        comment:
          'Node 클래스 정의: 이진 트리의 기본 단위인 노드입니다. 제네릭 타입 T를 사용하여 다양한 타입의 데이터를 저장할 수 있습니다.',
      },
      {
        line: 3,
        comment:
          'value 필드: 노드에 저장될 실제 데이터입니다. 제네릭 타입 T로 선언되어 다양한 타입을 저장할 수 있습니다.',
      },
      {
        line: 4,
        comment:
          'left 필드: 왼쪽 자식 노드를 가리키는 포인터입니다. null을 기본값으로 하여 자식이 없음을 표현합니다.',
      },
      {
        line: 5,
        comment:
          'right 필드: 오른쪽 자식 노드를 가리키는 포인터입니다. null을 기본값으로 하여 자식이 없음을 표현합니다.',
      },
    ],
    // 두 번째 예제: 이진 탐색 트리에 데이터 넣기
    [
      {
        line: 13,
        comment:
          'NodeMgmt 클래스: 이진 탐색 트리를 관리하는 클래스입니다. head 노드를 통해 트리에 접근합니다.',
      },
      {
        line: 21,
        comment:
          'insert 메서드: 이진 탐색 트리에 값을 삽입합니다. 이진 탐색 트리의 속성(왼쪽 자식 < 부모 < 오른쪽 자식)을 유지하면서 적절한 위치에 삽입합니다. 평균적으로 O(log n) 시간이 소요됩니다.',
      },
      {
        line: 22,
        comment:
          '현재 노드 초기화: head 노드부터 시작하여 삽입할 위치를 찾습니다.',
      },
      {
        line: 25,
        comment:
          '값 비교: 삽입할 값이 현재 노드의 값보다 작으면 왼쪽 서브트리로, 크거나 같으면 오른쪽 서브트리로 이동합니다.',
      },
      {
        line: 26,
        comment:
          '왼쪽 자식 확인: 왼쪽 자식이 있으면 왼쪽 자식으로 이동하고, 없으면 왼쪽 자식 위치에 새 노드를 삽입합니다.',
      },
      {
        line: 33,
        comment:
          '오른쪽 자식 확인: 오른쪽 자식이 있으면 오른쪽 자식으로 이동하고, 없으면 오른쪽 자식 위치에 새 노드를 삽입합니다.',
      },
    ],
    // 세 번째 예제: 이진 탐색 트리 탐색
    [
      {
        line: 42,
        comment:
          'search 메서드: 이진 탐색 트리에서 값을 검색합니다. 이진 탐색 트리의 속성을 활용하여 평균적으로 O(log n) 시간에 검색할 수 있습니다.',
      },
      {
        line: 43,
        comment:
          '현재 노드 초기화: head 노드부터 시작하여 값을 검색합니다.',
      },
      {
        line: 46,
        comment:
          '값 비교: 현재 노드의 값과 찾는 값을 비교합니다. 같으면 찾은 것이고, 작으면 왼쪽으로, 크면 오른쪽으로 이동합니다.',
      },
      {
        line: 48,
        comment:
          '값 비교: 찾는 값이 현재 노드의 값보다 작은지 확인합니다.',
      },
      {
        line: 49,
        comment:
          '왼쪽 서브트리 탐색: 찾는 값이 현재 노드의 값보다 작으면 왼쪽 서브트리로 이동합니다.',
      },
      {
        line: 51,
        comment:
          '오른쪽 서브트리 탐색: 찾는 값이 현재 노드의 값보다 크면 오른쪽 서브트리로 이동합니다.',
      },
    ],
    // 네 번째 예제: 이진 탐색 트리 삭제 - Case 1: Leaf Node 삭제
    [
      {
        line: 62,
        comment:
          'findNode 메서드: 삭제할 노드를 찾는 내부 메서드입니다. currentNode와 parent를 모두 추적하여 삭제 시 부모 노드를 업데이트할 수 있도록 합니다.',
      },
      {
        line: 67,
        comment:
          '노드 탐색: currentNode가 null이 아닐 때까지 반복하여 삭제할 노드를 찾습니다.',
      },
      {
        line: 72,
        comment:
          '부모 노드 추적: 값을 찾기 위해 이동할 때마다 parent를 업데이트합니다. 이렇게 하면 삭제 시 부모 노드의 포인터를 수정할 수 있습니다.',
      },
      {
        line: 84,
        comment:
          'delete 메서드 (Case 1): Leaf Node를 삭제합니다. Leaf Node는 자식이 없는 노드이므로, 부모 노드의 포인터를 null로 설정하면 됩니다.',
      },
      {
        line: 92,
        comment:
          'Leaf Node 확인: 왼쪽 자식과 오른쪽 자식이 모두 null이면 Leaf Node입니다.',
      },
      {
        line: 93,
        comment:
          '부모 노드의 포인터 제거: 삭제할 노드가 부모의 왼쪽 자식이면 left를 null로, 오른쪽 자식이면 right를 null로 설정합니다.',
      },
    ],
    // 다섯 번째 예제: 이진 탐색 트리 삭제 - Case 2: Child Node가 하나인 Node 삭제
    [
      {
        line: 82,
        comment:
          'delete 메서드 (Case 2): 자식이 하나인 노드를 삭제합니다. 부모 노드가 삭제할 노드의 자식을 직접 가리키도록 합니다.',
      },
      {
        line: 100,
        comment:
          '왼쪽 자식만 있는 경우: 부모 노드의 포인터를 삭제할 노드의 왼쪽 자식으로 설정합니다. 이렇게 하면 삭제할 노드가 건너뛰어지고 왼쪽 자식이 부모에 직접 연결됩니다.',
      },
      {
        line: 106,
        comment:
          '오른쪽 자식만 있는 경우: 부모 노드의 포인터를 삭제할 노드의 오른쪽 자식으로 설정합니다. 이렇게 하면 삭제할 노드가 건너뛰어지고 오른쪽 자식이 부모에 직접 연결됩니다.',
      },
    ],
    // 여섯 번째 예제: 이진 탐색 트리 삭제 - Case 3: Child Node가 두 개인 Node 삭제
    [
      {
        line: 81,
        comment:
          'delete 메서드 (Case 3): 자식이 두 개인 노드를 삭제합니다. 삭제할 노드의 오른쪽 서브트리에서 가장 작은 값을 찾아 삭제할 노드의 위치에 배치합니다.',
      },
      {
        line: 116,
        comment:
          '자식이 두 개인 경우: 오른쪽 서브트리에서 가장 작은 값을 찾아 삭제할 노드를 대체합니다. 왜 오른쪽 서브트리의 최소값을 사용하나요? 삭제할 노드보다 크면서 가장 작은 값이어야 이진 탐색 트리의 속성(왼쪽 자식 < 부모 < 오른쪽 자식)을 유지할 수 있기 때문입니다. 왼쪽 서브트리의 최대값을 사용해도 되지만, 일반적으로 오른쪽 서브트리의 최소값을 사용합니다.',
      },
      {
        line: 119,
        comment:
          'changeNode와 changeNodeParent 초기화: 오른쪽 서브트리에서 가장 작은 값을 찾기 위해 changeNode와 changeNodeParent를 모두 삭제할 노드의 오른쪽 자식(this.currentNode!.right)으로 초기화합니다. changeNodeParent는 changeNode의 부모를 추적하기 위한 변수입니다. 초기에는 같은 노드를 가리키지만, while 루프에서 changeNode가 왼쪽으로 이동할 때 changeNodeParent가 한 단계 뒤에서 따라옵니다.',
      },
      {
        line: 122,
        comment:
          '가장 작은 값 찾기: changeNode.left가 null이 아닐 때까지 왼쪽으로 이동하여 가장 작은 값을 찾습니다. 이진 탐색 트리에서는 왼쪽 자식이 항상 더 작은 값을 가지므로, 왼쪽 끝까지 가면 최소값을 찾을 수 있습니다. 루프 종료 후: changeNode는 오른쪽 서브트리에서 가장 작은 값을 가진 노드(최소값 노드)를 가리키고, changeNodeParent는 changeNode의 부모 노드를 가리킵니다. 만약 changeNode가 바로 오른쪽 자식이라면 changeNodeParent === changeNode가 됩니다.',
      },
      {
        line: 127,
        comment:
          'changeNode의 오른쪽 자식 처리: changeNode에 오른쪽 자식이 있으면, changeNodeParent.left를 changeNode.right로 설정합니다. 이렇게 하는 이유: changeNode를 삭제할 노드의 위치로 옮기기 전에, changeNode의 원래 위치에서 제거해야 합니다. changeNode는 왼쪽 자식이 없지만(최소값이므로), 오른쪽 자식은 있을 수 있습니다. changeNodeParent.left를 changeNode.right로 설정하면 changeNode를 건너뛰고 changeNode의 오른쪽 자식이 changeNodeParent의 왼쪽 자식이 됩니다. 만약 changeNode.right가 null이면 changeNodeParent.left도 null이 되어 changeNode가 완전히 제거됩니다.',
      },
      {
        line: 133,
        comment:
          '노드 교환: 삭제할 노드의 부모(this.parent)가 changeNode를 가리키도록 하고, changeNode의 자식을 삭제할 노드의 자식으로 설정합니다. 구체적으로: 1) this.parent.left(또는 right) = changeNode로 설정하여 삭제할 노드의 부모가 changeNode를 가리키게 합니다. 2) changeNode.left = this.currentNode!.left로 설정하여 삭제할 노드의 왼쪽 서브트리를 changeNode에 연결합니다. 3) changeNode.right = this.currentNode!.right로 설정하여 삭제할 노드의 오른쪽 서브트리를 changeNode에 연결합니다. 이렇게 하면 삭제할 노드가 changeNode로 완전히 대체되고, 이진 탐색 트리의 속성이 유지됩니다.',
      },
    ],
    // 일곱 번째 예제: 깔끔하게 정리된 이진 탐색 트리 (BST) 구현
    [
      {
        line: 12,
        comment:
          'BinarySearchTree 클래스: 완전한 이진 탐색 트리 구현입니다. 재귀를 사용하여 더 간결하고 이해하기 쉬운 코드를 작성합니다.',
      },
      {
        line: 22,
        comment:
          'insert 메서드: 재귀를 사용하여 이진 탐색 트리에 값을 삽입합니다. insertNode 헬퍼 메서드를 사용하여 구현합니다.',
      },
      {
        line: 26,
        comment:
          'insertNode 메서드: 재귀적으로 노드를 삽입하는 헬퍼 메서드입니다. node가 null이면 새 노드를 생성하고, 그렇지 않으면 적절한 서브트리에 재귀적으로 삽입합니다.',
      },
      {
        line: 31,
        comment:
          '왼쪽 서브트리 삽입: 삽입할 값이 현재 노드의 값보다 작으면 왼쪽 서브트리에 재귀적으로 삽입합니다.',
      },
      {
        line: 33,
        comment:
          '오른쪽 서브트리 삽입: 삽입할 값이 현재 노드의 값보다 크면 오른쪽 서브트리에 재귀적으로 삽입합니다.',
      },
      {
        line: 41,
        comment:
          'search 메서드: 재귀를 사용하여 이진 탐색 트리에서 값을 검색합니다. searchNode 헬퍼 메서드를 사용하여 구현합니다.',
      },
      {
        line: 62,
        comment:
          'findMin 메서드: 이진 탐색 트리에서 최소값을 찾습니다. 왼쪽 자식으로 계속 이동하여 가장 작은 값을 찾습니다. O(log n) 시간이 소요됩니다.',
      },
      {
        line: 76,
        comment:
          'findMax 메서드: 이진 탐색 트리에서 최대값을 찾습니다. 오른쪽 자식으로 계속 이동하여 가장 큰 값을 찾습니다. O(log n) 시간이 소요됩니다.',
      },
      {
        line: 90,
        comment:
          'delete 메서드: 재귀를 사용하여 이진 탐색 트리에서 값을 삭제합니다. deleteNode 헬퍼 메서드를 사용하여 구현합니다.',
      },
      {
        line: 96,
        comment:
          'deleteNode 메서드: 재귀적으로 노드를 삭제하는 헬퍼 메서드입니다. 삭제할 노드를 찾으면 세 가지 경우로 나누어 처리합니다.',
      },
      {
        line: 107,
        comment:
          '자식이 하나인 경우: 왼쪽 자식만 있으면 왼쪽 자식을 반환하고, 오른쪽 자식만 있으면 오른쪽 자식을 반환합니다.',
      },
      {
        line: 116,
        comment:
          '자식이 두 개인 경우: 오른쪽 서브트리의 최소값을 찾아 삭제할 노드의 값을 대체하고, 오른쪽 서브트리에서 최소값 노드를 재귀적으로 삭제합니다.',
      },
      {
        line: 133,
        comment:
          '전위 순회 (Pre-order): 루트 노드를 먼저 방문한 후, 왼쪽 서브트리, 오른쪽 서브트리를 순회합니다. 루트 -> 왼쪽 -> 오른쪽 순서입니다.',
      },
      {
        line: 143,
        comment:
          '중위 순회 (In-order): 왼쪽 서브트리를 먼저 방문한 후, 루트 노드, 오른쪽 서브트리를 순회합니다. 왼쪽 -> 루트 -> 오른쪽 순서이며, 이진 탐색 트리에서는 정렬된 순서로 값을 얻을 수 있습니다.',
      },
      {
        line: 153,
        comment:
          '후위 순회 (Post-order): 왼쪽 서브트리, 오른쪽 서브트리를 먼저 방문한 후, 루트 노드를 순회합니다. 왼쪽 -> 오른쪽 -> 루트 순서입니다.',
      },
      {
        line: 163,
        comment:
          '레벨 순회 (Level-order): BFS(너비 우선 탐색)를 사용하여 레벨별로 노드를 방문합니다. 큐를 사용하여 구현하며, 루트부터 시작하여 각 레벨의 노드를 왼쪽부터 오른쪽으로 방문합니다.',
      },
    ],
    // 여덟 번째 예제: 이진 트리 순회 구현
    [
      {
        line: 13,
        comment:
          'BinaryTree 클래스: 일반 이진 트리를 구현합니다. 이진 탐색 트리와 달리 특별한 순서 제약이 없습니다.',
      },
      {
        line: 23,
        comment:
          'preOrderTraversal 메서드: 전위 순회를 구현합니다. 루트를 먼저 방문한 후 왼쪽, 오른쪽 서브트리를 재귀적으로 순회합니다.',
      },
      {
        line: 33,
        comment:
          'inOrderTraversal 메서드: 중위 순회를 구현합니다. 왼쪽 서브트리를 먼저 방문한 후 루트, 오른쪽 서브트리를 재귀적으로 순회합니다.',
      },
      {
        line: 43,
        comment:
          'postOrderTraversal 메서드: 후위 순회를 구현합니다. 왼쪽, 오른쪽 서브트리를 먼저 방문한 후 루트를 방문합니다.',
      },
      {
        line: 53,
        comment:
          'levelOrderTraversal 메서드: 레벨 순회를 구현합니다. 큐를 사용하여 BFS 방식으로 각 레벨의 노드를 순회합니다.',
      },
      {
        line: 59,
        comment:
          '큐 사용: 큐에 루트 노드를 추가하고, 큐가 비어있을 때까지 반복합니다. 각 노드를 방문한 후 자식 노드를 큐에 추가합니다.',
      },
      {
        line: 71,
        comment:
          'height 메서드: 트리의 높이를 계산합니다. 재귀적으로 왼쪽과 오른쪽 서브트리의 높이를 계산하여 더 큰 값에 1을 더합니다.',
      },
      {
        line: 77,
        comment:
          'size 메서드: 트리의 노드 개수를 계산합니다. 재귀적으로 왼쪽과 오른쪽 서브트리의 노드 개수를 계산하여 합산합니다.',
      },
    ],
  ],
};
