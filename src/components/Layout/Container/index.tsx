import { ContainerProps } from '@/types/ui';

export default function Container({ children, className = '' }: ContainerProps) {
    return (
        <div className={`container mx-auto px-4 ${className}`}>
            {children}
        </div>
    );
}

