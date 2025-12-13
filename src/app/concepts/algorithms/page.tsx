import ConceptCard from '@/features/algorithm/components/ConceptCard';
import { concepts } from '@/data/concepts';

export default function AlgorithmsPage() {
  const algorithms = concepts.filter((c) => c.type === 'algorithm');

  return (
    <main className="bg-gray-50 min-h-screen">
      <section
        className="mx-auto max-w-7xl px-6 md:px-8 py-12"
        aria-labelledby="algorithms-heading"
      >
        <header className="mb-8">
          <h1 id="algorithms-heading" className="text-3xl font-bold text-gray-900 mb-2">
            알고리즘
          </h1>
          <p className="text-gray-600">
            다양한 알고리즘 개념 학습 및 시각화
          </p>
        </header>
        {algorithms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((concept) => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">알고리즘 개념이 아직 없습니다.</p>
        )}
      </section>
    </main>
  );
}

