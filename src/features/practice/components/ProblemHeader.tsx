import { Concept } from '@/features/algorithm/types/algorithm';
import { Problem } from '@/features/practice/types/problem';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

interface ProblemHeaderProps {
  concept: Concept;
  problem: Problem;
}

const difficultyColors = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
} as const;

const difficultyLabels = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
} as const;

export default function ProblemHeader({ concept, problem }: ProblemHeaderProps) {
  return (
    <header className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <Link
            href={`/concept/${concept.id}`}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            ← {concept.title}로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
        </div>
        <Badge variant={difficultyColors[problem.difficulty]} size="md">
          {difficultyLabels[problem.difficulty]}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </header>
  );
}

