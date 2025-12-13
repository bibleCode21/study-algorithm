import Link from 'next/link';
import { ConceptNavigationProps } from '@/features/algorithm/types/components';

export default function ConceptNavigation({ conceptType }: ConceptNavigationProps) {
    const listPath = conceptType === 'data-structure' ? '/concepts/data-structures' : '/concepts/algorithms';
    const listLabel = conceptType === 'data-structure' ? '데이터 구조' : '알고리즘';

    return (
        <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
                <Link
                    href={listPath}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                    ← {listLabel} 목록
                </Link>
                <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                    홈으로
                </Link>
            </div>
        </footer>
    );
}

