import { FeatureCardHeaderProps } from '@/features/home/types/components';

const FeatureCardHeader = ({
    icon,
    iconBgColor,
    iconTextColor,
    title,
}: FeatureCardHeaderProps) => {
    return (
        <header className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
                <span className={`${iconTextColor} font-bold`}>{icon}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </header>
    );
};

export default FeatureCardHeader;

