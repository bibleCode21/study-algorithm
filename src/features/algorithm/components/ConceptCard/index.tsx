import Link from 'next/link';
import { Concept } from '@/features/algorithm/types/algorithm';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface ConceptCardProps {
  concept: Concept;
}

export default function ConceptCard({ concept }: ConceptCardProps) {
  const typeLabel = concept.type === 'data-structure' ? '데이터 구조' : '알고리즘';
  const typeVariant = concept.type === 'data-structure' ? 'primary' : 'success';

  return (
    <Link href={`/concept/${concept.id}`}>
      <Card className="h-full">
        <header className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {concept.title}
            </h3>
            <Badge variant={typeVariant} size="sm">
              {typeLabel}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {concept.category.map((cat) => (
              <Badge key={cat} variant="default" size="sm">
                {cat}
              </Badge>
            ))}
          </div>
        </header>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {concept.description}
        </p>

        {concept.type === 'algorithm' && concept.timeComplexity && (
          <div className="mb-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-medium">시간 복잡도:</span>
              <span>최선 {concept.timeComplexity.best}</span>
              <span>•</span>
              <span>평균 {concept.timeComplexity.average}</span>
              <span>•</span>
              <span>최악 {concept.timeComplexity.worst}</span>
            </div>
            {concept.spaceComplexity && (
              <div className="mt-1 text-xs text-gray-500">
                <span className="font-medium">공간 복잡도:</span>{' '}
                <span>{concept.spaceComplexity}</span>
              </div>
            )}
          </div>
        )}

        <footer className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-100">
          {concept.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
          {concept.tags.length > 3 && (
            <span className="text-xs text-gray-400">+{concept.tags.length - 3}</span>
          )}
        </footer>
      </Card>
    </Link>
  );
}

