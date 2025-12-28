import { ConceptViewProps } from '@/features/algorithm/types/components';
import AnnotatedCodeBlock from './AnnotatedCodeBlock';
import { getCodeAnnotations } from '@/features/algorithm/utils/codeAnnotations';

const CodeFirstView = ({ concept, codeExamples }: ConceptViewProps) => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">코드 예제</h2>
        <div className="space-y-6">
          {codeExamples.map((example, index) => {
            const annotations = getCodeAnnotations(concept.id, example.language, example.code);
            return (
              <div key={index}>
                <AnnotatedCodeBlock
                  language={example.language}
                  code={example.code}
                  highlightedHtml={example.highlightedHtml}
                  annotations={annotations}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CodeFirstView;

