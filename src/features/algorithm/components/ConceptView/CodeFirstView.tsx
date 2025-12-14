import { ConceptViewProps } from '@/features/algorithm/types/components';
import ConceptComplexity from '@/features/algorithm/components/ConceptDetail/ConceptComplexity';
import ConceptDescription from '@/features/algorithm/components/ConceptDetail/ConceptDescription';
import AnnotatedCodeBlock from './AnnotatedCodeBlock';
import { getCodeAnnotations } from '@/features/algorithm/utils/codeAnnotations';

export default function CodeFirstView({ concept, codeExamples }: ConceptViewProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">코드 예제 및 해석</h2>
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

      {concept.type === 'algorithm' && concept.timeComplexity && (
        <section>
          <ConceptComplexity
            timeComplexity={concept.timeComplexity}
            spaceComplexity={concept.spaceComplexity}
          />
        </section>
      )}

      <ConceptDescription description={concept.description} />
    </div>
  );
};

export default CodeFirstView;

