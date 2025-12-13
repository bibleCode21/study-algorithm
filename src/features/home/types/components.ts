// FeatureCard 컴포넌트 Props
export interface FeatureCardProps {
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  title: string;
  description: string;
  items: string[];
  href: string;
}

// FeatureCard 하위 컴포넌트 Props
export interface FeatureCardHeaderProps {
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  title: string;
}

