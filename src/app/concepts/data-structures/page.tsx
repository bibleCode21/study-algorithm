import ConceptsList from '@/features/algorithm/components/ConceptsList';
import { concepts } from '@/data/concepts';

// 정적 페이지로 생성 (데이터 구조 목록은 자주 변경되지 않음)
export const dynamic = 'force-static';

const DataStructuresPage = () => {
  const dataStructures = concepts.filter((c) => c.type === 'data-structure');

  return (
    <main className="bg-gray-50 min-h-screen">
      <section
        className="mx-auto max-w-7xl px-6 md:px-8 py-12"
        aria-labelledby="data-structures-heading"
      >
        <header className="mb-8">
          <h1 id="data-structures-heading" className="text-3xl font-bold text-gray-900 mb-2">
            데이터 구조
          </h1>
          <p className="text-gray-600">
            알고리즘 학습 전 필수 데이터 구조 개념
          </p>
        </header>
        <ConceptsList concepts={dataStructures} />
      </section>
    </main>
  );
};

export default DataStructuresPage;

