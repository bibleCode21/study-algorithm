import { ConceptViewProps } from '@/features/algorithm/types/components';
import ConceptDescription from '@/features/algorithm/components/ConceptDetail/ConceptDescription';
import ConceptComplexity from '@/features/algorithm/components/ConceptDetail/ConceptComplexity';

type DefaultViewProps = Omit<ConceptViewProps, 'viewMode'>;

const DefaultView = ({ concept }: DefaultViewProps) => {
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

