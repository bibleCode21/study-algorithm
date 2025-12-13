import { ConceptViewProps } from '@/features/algorithm/types/components';
import ConceptCodeExamples from '@/features/algorithm/components/ConceptDetail/ConceptCodeExamples';
import ConceptComplexity from '@/features/algorithm/components/ConceptDetail/ConceptComplexity';

export default function CodeFirstView({ concept, codeExamples }: ConceptViewProps) {
    return (
        <>
            <ConceptCodeExamples codeExamples={codeExamples} />
            {concept.type === 'algorithm' && concept.timeComplexity && (
                <ConceptComplexity
                    timeComplexity={concept.timeComplexity}
                    spaceComplexity={concept.spaceComplexity}
                />
            )}
            <section className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">설명</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {concept.description}
                </p>
            </section>
        </>
    );
}

