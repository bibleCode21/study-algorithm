import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { ExerciseHeaderProps } from '@/features/practice/types/components';

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

const ExerciseHeader = ({ concept, exercise }: ExerciseHeaderProps) => {
  return (
    <header className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <Link
              href="/practice"
              className="text-sm text-gray-500 hover:text-gray-700 inline-block cursor-pointer"
            >
              ← 문제풀이 목록
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href={`/concept/${concept.id}`}
              className="text-sm text-gray-500 hover:text-gray-700 inline-block cursor-pointer"
            >
              {concept.title}로 돌아가기
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{exercise.title}</h1>
        </div>
        <Badge variant={difficultyColors[exercise.difficulty]} size="md">
          {difficultyLabels[exercise.difficulty]}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {exercise.tags.map((tag) => (
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
};

export default ExerciseHeader;

