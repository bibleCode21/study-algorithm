import { ConceptViewProps } from '@/features/algorithm/types/components';
import DefaultView from './DefaultView';
import CompactView from './CompactView';
import CodeFirstView from './CodeFirstView';

const ConceptView = ({ concept, codeExamples, viewMode }: ConceptViewProps) => {
    switch (viewMode) {
        case 'compact':
            return <CompactView concept={concept} codeExamples={codeExamples} viewMode={viewMode} />;
        case 'codeFirst':
            return <CodeFirstView concept={concept} codeExamples={codeExamples} viewMode={viewMode} />;
        case 'default':
        default:
            return <DefaultView concept={concept} codeExamples={codeExamples} viewMode={viewMode} />;
    }
};

export default ConceptView;

