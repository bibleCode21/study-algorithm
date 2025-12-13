import { notFound } from 'next/navigation';
import { concepts } from '@/data/concepts';
import { getConceptCodeSync } from '@/data/concepts/getConceptCode';
import ConceptHeader from '@/features/algorithm/components/ConceptDetail/ConceptHeader';
import ConceptDescription from '@/features/algorithm/components/ConceptDetail/ConceptDescription';
import ConceptComplexity from '@/features/algorithm/components/ConceptDetail/ConceptComplexity';
import ConceptCodeExamples from '@/features/algorithm/components/ConceptDetail/ConceptCodeExamples';
import ConceptNavigation from '@/features/algorithm/components/ConceptDetail/ConceptNavigation';

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

  return (
    <main className="bg-gray-50 min-h-screen">
      <article className="mx-auto max-w-4xl px-6 md:px-8 py-12">
        <ConceptHeader concept={concept} />
        <ConceptDescription description={concept.description} />
        {concept.type === 'algorithm' && concept.timeComplexity && (
          <ConceptComplexity
            timeComplexity={concept.timeComplexity}
            spaceComplexity={concept.spaceComplexity}
          />
        )}
        <ConceptCodeExamples codeExamples={codeExamples} />
        <ConceptNavigation conceptType={concept.type} />
      </article>
    </main>
  );
}

