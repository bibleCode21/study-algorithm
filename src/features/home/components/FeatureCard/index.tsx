import Link from 'next/link';
import Card from '@/components/ui/Card';

interface FeatureCardProps {
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  title: string;
  description: string;
  items: string[];
  href: string;
}

export default function FeatureCard({
  icon,
  iconBgColor,
  iconTextColor,
  title,
  description,
  items,
  href
}: FeatureCardProps) {
  return (
    <Link href={href}>
      <Card as="article" className="h-full">
        <header className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <span className={`${iconTextColor} font-bold`}>{icon}</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </header>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="text-sm text-gray-500 space-y-1" role="list">
          {items.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </Card>
    </Link>
  );
}

