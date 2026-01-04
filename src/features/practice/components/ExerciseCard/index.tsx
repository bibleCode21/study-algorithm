import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { ExerciseWithConcept } from '@/features/practice/types/components';
import { difficultyColors, difficultyLabels } from '@/features/practice/constants';

interface ExerciseCardProps {
  exercise: ExerciseWithConcept;
}

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <Link
      href={`/concept/${exercise.conceptId}/practice?exerciseId=${exercise.id}`}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 flex-1">{exercise.title}</h2>
        <Badge variant={difficultyColors[exercise.difficulty]} size="sm">
          {difficultyLabels[exercise.difficulty]}
        </Badge>
      </div>

      {exercise.concept && (
        <div className="mb-3">
          <span className="text-xs text-gray-500">관련 개념:</span>
          <span className="ml-2 text-sm font-medium text-gray-700">
            {exercise.concept.title}
          </span>
        </div>
      )}

      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{exercise.description}</p>

      <div className="flex flex-wrap gap-2">
        {exercise.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
        {exercise.tags.length > 3 && (
          <span className="text-xs text-gray-400">+{exercise.tags.length - 3}</span>
        )}
      </div>
    </Link>
  );
};

export default ExerciseCard;
