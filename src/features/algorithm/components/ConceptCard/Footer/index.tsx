import { ConceptCardFooterProps } from '@/features/algorithm/types/components';

const ConceptCardFooter = ({ tags }: ConceptCardFooterProps) => {
    return (
        <footer className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-100">
            {tags.slice(0, 3).map((tag) => (
                <span
                    key={tag}
                    className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
                >
                    #{tag}
                </span>
            ))}
            {tags.length > 3 && (
                <span className="text-xs text-gray-400">+{tags.length - 3}</span>
            )}
        </footer>
    );
};

export default ConceptCardFooter;

