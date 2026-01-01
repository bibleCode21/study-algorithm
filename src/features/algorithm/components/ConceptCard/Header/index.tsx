import { ConceptCardHeaderProps } from '@/features/algorithm/types/components';
import Badge from '@/components/ui/Badge';

const ConceptCardHeader = ({ concept }: ConceptCardHeaderProps) => {
    const typeLabel = concept.type === 'data-structure' ? '데이터 구조' : '알고리즘';
    const typeVariant = concept.type === 'data-structure' ? 'primary' : 'success';

    // 제목을 영어와 한글로 분리
    const parseTitle = (title: string) => {
        const match = title.match(/^(.+?)\s*\((.+?)\)$/);
        if (match) {
            return {
                english: match[1].trim(),
                korean: match[2].trim(),
            };
        }
        return {
            english: title,
            korean: null,
        };
    };

    const { english, korean } = parseTitle(concept.title);

    return (
        <header className="mb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 break-keep">
                        {english}
                    </h3>
                    {korean && (
                        <p className="text-sm text-blue-600 italic mt-1 break-keep font-medium">
                            {korean}
                        </p>
                    )}
                </div>
                <Badge variant={typeVariant} size="sm" className="flex-shrink-0 self-start">
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

