import Link from 'next/link';
import { ConceptCardProps } from '@/features/algorithm/types/components';
import Card from '@/components/ui/Card';
import ConceptCardHeader from './Header';
import ConceptCardBody from './Body';
import ConceptCardFooter from './Footer';

const ConceptCard = ({ concept }: ConceptCardProps) => {
  return (
    <Link href={`/concept/${concept.id}`}>
      <Card className="h-full">
        <ConceptCardHeader concept={concept} />
        <ConceptCardBody concept={concept} />
        <ConceptCardFooter tags={concept.tags} />
      </Card>
    </Link>
  );
};

export default ConceptCard;

