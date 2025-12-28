import { ConceptViewProps } from '@/features/algorithm/types/components';
import ConceptDescription from '@/features/algorithm/components/ConceptDetail/ConceptDescription';
import ConceptComplexity from '@/features/algorithm/components/ConceptDetail/ConceptComplexity';

const DefaultView = ({ concept }: ConceptViewProps) => {
    return (
        <>
            <ConceptDescription description={concept.description} />
            {concept.type === 'algorithm' && concept.timeComplexity && (
                <ConceptComplexity
                    timeComplexity={concept.timeComplexity}
                    spaceComplexity={concept.spaceComplexity}
                />
            )}
        </>
    );
};

export default DefaultView;

