import { ConceptCardHeaderProps } from '@/features/algorithm/types/components';
import Badge from '@/components/ui/Badge';

const ConceptCardHeader = ({ concept }: ConceptCardHeaderProps) => {
    const typeLabel = concept.type === 'data-structure' ? '데이터 구조' : '알고리즘';
    const typeVariant = concept.type === 'data-structure' ? 'primary' : 'success';

    return (
        <header className="mb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {concept.title}
                </h3>
                <Badge variant={typeVariant} size="sm">
                    {typeLabel}
                </Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {concept.category.map((cat) => (
                    <Badge key={cat} variant="default" size="sm">
                        {cat}
                    </Badge>
                ))}
            </div>
        </header>
    );
};

export default ConceptCardHeader;

