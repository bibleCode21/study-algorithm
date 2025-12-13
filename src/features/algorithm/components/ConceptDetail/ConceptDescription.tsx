import { ConceptDescriptionProps } from '@/features/algorithm/types/components';

export default function ConceptDescription({ description }: ConceptDescriptionProps) {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">설명</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {description}
            </p>
        </section>
    );
}

