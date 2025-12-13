import ConceptsList from '@/features/algorithm/components/ConceptsList';
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
        <ConceptsList concepts={algorithms} />
      </section>
    </main>
  );
}

