import { Concept } from '@/features/algorithm/types/algorithm';
import { ConceptHeaderProps } from '@/features/algorithm/types/components';
import Badge from '@/components/ui/Badge';

export default function ConceptHeader({ concept }: ConceptHeaderProps) {
    const typeLabel = concept.type === 'data-structure' ? '데이터 구조' : '알고리즘';
    const typeVariant = concept.type === 'data-structure' ? 'primary' : 'success';

    return (
        <header className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {concept.title}
                </h1>
                <Badge variant={typeVariant} size="md">
                    {typeLabel}
                </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {concept.category.map((cat) => (
                    <Badge key={cat} variant="default" size="sm">
                        {cat}
                    </Badge>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                {concept.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </header>
    );
}

