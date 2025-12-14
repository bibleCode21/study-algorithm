import { CardProps } from '@/types/ui';

const Card = ({
    children,
    className = '',
    as: Component = 'article',
    onClick
}: CardProps) => {
    const baseClasses = 'bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow';
    const clickableClasses = onClick ? 'cursor-pointer' : '';

    return (
        <Component
            className={`${baseClasses} ${clickableClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </Component>
    );
};

export default Card;

