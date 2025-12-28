import Link from 'next/link';
import { ConceptNavigationProps } from '@/features/algorithm/types/components';

const ConceptNavigation = ({ conceptType, conceptId }: ConceptNavigationProps) => {
    const listPath = conceptType === 'data-structure' ? '/concepts/data-structures' : '/concepts/algorithms';
    const listLabel = conceptType === 'data-structure' ? '데이터 구조' : '알고리즘';

    return (
        <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
                <Link
                    href={listPath}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                >
                    ← {listLabel} 목록
                </Link>
                <div className="flex items-center gap-4">
                    {conceptId && (
                        <Link
                            href={`/concept/${conceptId}/practice`}
                            className="px-4 py-2 bg-blue-600 !text-white rounded-md hover:bg-blue-700 font-medium transition-colors cursor-pointer"
                        >
                            문제 풀기
                        </Link>
                    )}
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                    >
                        홈으로
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default ConceptNavigation;

