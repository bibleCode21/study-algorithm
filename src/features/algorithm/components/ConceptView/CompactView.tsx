import { ConceptViewProps } from '@/features/algorithm/types/components';
import ConceptCodeExamples from '@/features/algorithm/components/ConceptDetail/ConceptCodeExamples';

export default function CompactView({ concept, codeExamples }: ConceptViewProps) {
    return (
        <>
            <section className="mb-6">
                <p className="text-gray-700 leading-relaxed line-clamp-4">
                    {concept.description}
                </p>
            </section>
            {concept.type === 'algorithm' && concept.timeComplexity && (
                <section className="mb-6">
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">시간 복잡도:</span>
                        <span className="font-mono font-semibold text-gray-900">
                            {concept.timeComplexity.worst}
                        </span>
                        {concept.spaceComplexity && (
                            <>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500">공간 복잡도:</span>
                                <span className="font-mono font-semibold text-gray-900">
                                    {concept.spaceComplexity}
                                </span>
                            </>
                        )}
                    </div>
                </section>
            )}
            <ConceptCodeExamples codeExamples={codeExamples} />
        </>
    );
}

