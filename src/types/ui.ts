import { ReactNode } from 'react';

// Badge 컴포넌트 Props
export interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

// Card 컴포넌트 Props
export interface CardProps {
    children: ReactNode;
    className?: string;
    as?: 'article' | 'div' | 'section';
    onClick?: () => void;
}

// CodeBlock 컴포넌트 Props
export interface CodeBlockProps {
    language: string;
    code: string;
    className?: string;
}

// Container 컴포넌트 Props
export interface ContainerProps {
    children: ReactNode;
    className?: string;
}

// SearchBar 컴포넌트 Props
export interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    className?: string;
}

// Pagination 컴포넌트 Props
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
    className?: string;
}

