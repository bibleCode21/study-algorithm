'use client';

import { ConceptCodeExamplesProps } from '@/features/algorithm/types/components';
import CodeBlockClient from '@/components/CodeBlock/CodeBlockClient';

export default function ConceptCodeExamples({ codeExamples }: ConceptCodeExamplesProps) {
    if (codeExamples.length === 0) {
        return null;
    }

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">코드 예제</h2>
            <div className="space-y-6">
                {codeExamples.map((example, index) => (
                    <div key={index}>
                        <CodeBlockClient
                            language={example.language}
                            code={example.code}
                            highlightedHtml={example.highlightedHtml}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

