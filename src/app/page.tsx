export default function Home() {
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              알고리즘 정리
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              공부한 알고리즘들을 체계적으로 정리하고 시각화할 수 있는 웹 애플리케이션
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 데이터 구조 카드 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">DS</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">데이터 구조</h2>
            </div>
            <p className="text-gray-600 mb-4">
              알고리즘 학습 전 필수 데이터 구조 개념 학습
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Array, Stack, Queue</li>
              <li>• Tree, Heap, Hash Table</li>
              <li>• Linked List 등</li>
            </ul>
          </div>

          {/* 알고리즘 카드 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">AL</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">알고리즘</h2>
            </div>
            <p className="text-gray-600 mb-4">
              다양한 알고리즘 개념 학습 및 시각화
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• 정렬, 탐색 알고리즘</li>
              <li>• 그래프 알고리즘</li>
              <li>• 동적 프로그래밍</li>
            </ul>
          </div>

          {/* 문제 풀이 카드 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">PR</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">문제 풀이</h2>
            </div>
            <p className="text-gray-600 mb-4">
              랜덤 문제 풀이를 통한 실전 연습
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• 랜덤 문제 출제</li>
              <li>• 코드 에디터</li>
              <li>• 테스트 케이스 실행</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
