import { ConceptViewProps } from '@/features/algorithm/types/components';
import ConceptDescription from '@/features/algorithm/components/ConceptDetail/ConceptDescription';
import ConceptCodeExamples from '@/features/algorithm/components/ConceptDetail/ConceptCodeExamples';

export default function VisualView({ concept, codeExamples }: ConceptViewProps) {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <ConceptDescription description={concept.description} />
                {concept.type === 'algorithm' && concept.timeComplexity && (
                    <section className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">복잡도</h2>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">최선:</span>
                                    <span className="font-mono font-semibold">{concept.timeComplexity.best}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">평균:</span>
                                    <span className="font-mono font-semibold">{concept.timeComplexity.average}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">최악:</span>
                                    <span className="font-mono font-semibold">{concept.timeComplexity.worst}</span>
                                </div>
                                {concept.spaceComplexity && (
                                    <div className="flex justify-between pt-2 border-t">
                                        <span className="text-gray-500">공간:</span>
                                        <span className="font-mono font-semibold">{concept.spaceComplexity}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <div>
                <ConceptCodeExamples codeExamples={codeExamples} />
            </div>
        </div>
    );
}

