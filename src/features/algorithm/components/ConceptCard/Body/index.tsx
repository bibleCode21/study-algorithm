import { ConceptCardBodyProps } from '@/features/algorithm/types/components';

const ConceptCardBody = ({ concept }: ConceptCardBodyProps) => {
    return (
        <>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {concept.description}
            </p>

            {concept.type === 'algorithm' && concept.timeComplexity && (
                <div className="mb-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-medium">시간 복잡도:</span>
                        <span>최선 {concept.timeComplexity.best}</span>
                        <span>•</span>
                        <span>평균 {concept.timeComplexity.average}</span>
                        <span>•</span>
                        <span>최악 {concept.timeComplexity.worst}</span>
                    </div>
                    {concept.spaceComplexity && (
                        <div className="mt-1 text-xs text-gray-500">
                            <span className="font-medium">공간 복잡도:</span>{' '}
                            <span>{concept.spaceComplexity}</span>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ConceptCardBody;

