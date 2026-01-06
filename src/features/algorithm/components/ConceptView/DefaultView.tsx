import { ConceptViewProps } from '@/features/algorithm/types/components';
import ConceptDescription from '@/features/algorithm/components/ConceptDetail/ConceptDescription';

type DefaultViewProps = Omit<ConceptViewProps, 'viewMode'>;

const DefaultView = ({ concept }: DefaultViewProps) => {
    return (
        <>
            <ConceptDescription description={concept.description} />
        </>
    );
};

export default DefaultView;

