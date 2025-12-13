import { ConceptComplexityProps } from '@/features/algorithm/types/components';

export default function ConceptComplexity({
    timeComplexity,
    spaceComplexity,
}: ConceptComplexityProps) {
    return (
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
                                    {timeComplexity.best}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">평균:</span>
                                <span className="ml-2 font-mono font-semibold text-gray-900">
                                    {timeComplexity.average}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">최악:</span>
                                <span className="ml-2 font-mono font-semibold text-gray-900">
                                    {timeComplexity.worst}
                                </span>
                            </div>
                        </div>
                    </div>
                    {spaceComplexity && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">공간 복잡도</h3>
                            <span className="font-mono font-semibold text-gray-900">
                                {spaceComplexity}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

