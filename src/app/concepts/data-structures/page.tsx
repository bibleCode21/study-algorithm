import ConceptCard from '@/features/algorithm/components/ConceptCard';
import { concepts } from '@/data/concepts';

export default function DataStructuresPage() {
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
        {dataStructures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataStructures.map((concept) => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">데이터 구조 개념이 아직 없습니다.</p>
        )}
      </section>
    </main>
  );
}

