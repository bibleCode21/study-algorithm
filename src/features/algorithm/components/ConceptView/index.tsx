import { ConceptViewProps } from '@/features/algorithm/types/components';
import DefaultView from './DefaultView';
import CompactView from './CompactView';
import CodeFirstView from './CodeFirstView';
import VisualView from './VisualView';

const ConceptView = ({ concept, codeExamples, viewMode }: ConceptViewProps) => {
    switch (viewMode) {
        case 'compact':
            return <CompactView concept={concept} codeExamples={codeExamples} />;
        case 'codeFirst':
            return <CodeFirstView concept={concept} codeExamples={codeExamples} />;
        case 'visual':
            return <VisualView concept={concept} codeExamples={codeExamples} />;
        case 'default':
        default:
            return <DefaultView concept={concept} codeExamples={codeExamples} />;
    }
};

export default ConceptView;

