import { ConceptHeaderProps } from '@/features/algorithm/types/components';
import Badge from '@/components/ui/Badge';

const ConceptHeader = ({ concept }: ConceptHeaderProps) => {
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
        <header className="mb-8">
            <div className="flex items-start justify-between gap-2 mb-4">
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 break-keep">
                        {english}
                    </h1>
                    {korean && (
                        <p className="text-base md:text-lg text-blue-600 italic mt-1 break-keep font-medium">
                            {korean}
                        </p>
                    )}
                </div>
                <Badge variant={typeVariant} size="md" className="flex-shrink-0 self-start">
                    {typeLabel}
                </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
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
};

export default ConceptHeader;

