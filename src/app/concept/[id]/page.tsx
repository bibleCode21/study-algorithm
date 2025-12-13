import { notFound } from 'next/navigation';
import Link from 'next/link';
import { concepts } from '@/data/concepts';
import { getConceptCodeSync } from '@/data/concepts/getConceptCode';
import Badge from '@/components/ui/Badge';
import CodeBlock from '@/components/CodeBlock';

interface ConceptDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConceptDetailPage({ params }: ConceptDetailPageProps) {
  const { id } = await params;
  const concept = concepts.find((c) => c.id === id);

  if (!concept) {
    notFound();
  }

  const codeExamples = getConceptCodeSync(id);
  const typeLabel = concept.type === 'data-structure' ? '데이터 구조' : '알고리즘';
  const typeVariant = concept.type === 'data-structure' ? 'primary' : 'success';

  return (
    <main className="bg-gray-50 min-h-screen">
      <article className="mx-auto max-w-4xl px-6 md:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {concept.title}
            </h1>
            <Badge variant={typeVariant} size="md">
              {typeLabel}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {concept.category.map((cat) => (
              <Badge key={cat} variant="default" size="sm">
                {cat}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {concept.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">설명</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {concept.description}
          </p>
        </section>

        {/* Complexity (알고리즘인 경우) */}
        {concept.type === 'algorithm' && concept.timeComplexity && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">복잡도</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">시간 복잡도</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">최선:</span>
                      <span className="ml-2 font-mono font-semibold text-gray-900">
                        {concept.timeComplexity.best}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">평균:</span>
                      <span className="ml-2 font-mono font-semibold text-gray-900">
                        {concept.timeComplexity.average}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">최악:</span>
                      <span className="ml-2 font-mono font-semibold text-gray-900">
                        {concept.timeComplexity.worst}
                      </span>
                    </div>
                  </div>
                </div>
                {concept.spaceComplexity && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">공간 복잡도</h3>
                    <span className="font-mono font-semibold text-gray-900">
                      {concept.spaceComplexity}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Code Examples */}
        {codeExamples.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">코드 예제</h2>
            <div className="space-y-6">
              {codeExamples.map((example, index) => (
                <div key={index}>
                  <CodeBlock language={example.language} code={example.code} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href={concept.type === 'data-structure' ? '/concepts/data-structures' : '/concepts/algorithms'}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← {concept.type === 'data-structure' ? '데이터 구조' : '알고리즘'} 목록
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              홈으로
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}

