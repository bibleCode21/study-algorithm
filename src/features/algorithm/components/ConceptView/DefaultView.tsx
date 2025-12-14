import { ConceptViewProps } from '@/features/algorithm/types/components';
import ConceptDescription from '@/features/algorithm/components/ConceptDetail/ConceptDescription';
import ConceptComplexity from '@/features/algorithm/components/ConceptDetail/ConceptComplexity';
import ConceptCodeExamples from '@/features/algorithm/components/ConceptDetail/ConceptCodeExamples';

const DefaultView = ({ concept, codeExamples }: ConceptViewProps) => {
    return (
        <>
            <ConceptDescription description={concept.description} />
            {concept.type === 'algorithm' && concept.timeComplexity && (
                <ConceptComplexity
                    timeComplexity={concept.timeComplexity}
                    spaceComplexity={concept.spaceComplexity}
                />
            )}
            <ConceptCodeExamples codeExamples={codeExamples} />
        </>
    );
};

export default DefaultView;

