import Link from 'next/link';
import { FeatureCardProps } from '@/features/home/types/components';
import Card from '@/components/ui/Card';
import FeatureCardHeader from './Header';

const FeatureCard = ({
    icon,
    iconBgColor,
    iconTextColor,
    title,
    description,
    items,
    href
}: FeatureCardProps) => {
    return (
        <Link href={href}>
            <Card as="article" className="h-full">
                <FeatureCardHeader
                    icon={icon}
                    iconBgColor={iconBgColor}
                    iconTextColor={iconTextColor}
                    title={title}
                />
                <p className="text-gray-600 mb-4">{description}</p>
                <ul className="text-sm text-gray-500 space-y-1" role="list">
                    {items.map((item, index) => (
                        <li key={index}>• {item}</li>
                    ))}
                </ul>
            </Card>
        </Link>
    );
};

export default FeatureCard;

