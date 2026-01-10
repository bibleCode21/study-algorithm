'use client';

import { PaginationProps } from '@/types/ui';

// Button 컴포넌트를 render 외부에서 선언
const Button = ({ 
    onClick, 
    disabled, 
    children, 
    ariaLabel,
    className: btnClassName 
}: {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    ariaLabel: string;
    className?: string;
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-2 rounded-lg border transition-colors flex items-center justify-center ${
            disabled
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer'
        } ${btnClassName || ''}`}
        aria-label={ariaLabel}
    >
        {children}
    </button>
);

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    showFirstLast = false,
    className = '' 
}: PaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 9;

        if (totalPages <= maxVisible) {
            // 전체 페이지가 9개 이하인 경우 모두 표시
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // 현재 페이지 주변에 더 많은 페이지를 표시
            // 양쪽으로 4개씩 표시 (현재 페이지 포함 총 9개)
            let start = Math.max(1, currentPage - 4);
            let end = Math.min(totalPages, currentPage + 4);

            // 시작 부분이 1이 아니면 첫 페이지와 생략 표시 추가
            if (start > 1) {
                pages.push(1);
                if (start > 2) {
                    pages.push('...');
                }
            }

            // 중간 페이지들
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // 끝 부분이 마지막 페이지가 아니면 생략 표시와 마지막 페이지 추가
            if (end < totalPages) {
                if (end < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav 
            className={`flex items-center justify-center gap-1 sm:gap-2 ${className}`}
            aria-label="페이지네이션"
        >
            {/* 첫 페이지 버튼 */}
            {showFirstLast && (
                <Button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    ariaLabel="첫 페이지"
                >
                    <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                        />
                    </svg>
                </Button>
            )}

            {/* 이전 버튼 */}
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                ariaLabel="이전 페이지"
            >
                <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </Button>

            {/* 페이지 번호들 */}
            <div className="flex items-center gap-1 sm:gap-2">
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 sm:px-3 py-2 text-gray-400 text-sm sm:text-base"
                                aria-hidden="true"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = currentPage === pageNum;
                    
                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`px-3 sm:px-4 py-2 rounded-lg border transition-colors cursor-pointer text-sm sm:text-base font-medium ${
                                isActive
                                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                            aria-label={`페이지 ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            {/* 다음 버튼 */}
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                ariaLabel="다음 페이지"
            >
                <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </Button>

            {/* 마지막 페이지 버튼 */}
            {showFirstLast && (
                <Button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    ariaLabel="마지막 페이지"
                >
                    <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                    </svg>
                </Button>
            )}
        </nav>
    );
};

export default Pagination;
