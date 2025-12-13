import { ConceptViewProps } from '@/features/algorithm/types/components';
import DefaultView from './DefaultView';
import CompactView from './CompactView';
import VisualView from './VisualView';
import CodeFirstView from './CodeFirstView';

export default function ConceptView({ concept, codeExamples, viewMode }: ConceptViewProps) {
    switch (viewMode) {
        case 'compact':
            return <CompactView concept={concept} codeExamples={codeExamples} viewMode={viewMode} />;
        case 'visual':
            return <VisualView concept={concept} codeExamples={codeExamples} viewMode={viewMode} />;
        case 'codeFirst':
            return <CodeFirstView concept={concept} codeExamples={codeExamples} viewMode={viewMode} />;
        case 'default':
        default:
            return <DefaultView concept={concept} codeExamples={codeExamples} viewMode={viewMode} />;
    }
}

