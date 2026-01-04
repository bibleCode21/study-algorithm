import { Concept } from '@/features/algorithm/types/algorithm';
import { difficultyLabels } from '@/features/practice/constants';

interface ExerciseFiltersProps {
  categories: string[];
  availableConcepts: Concept[];
  selectedCategory: string;
  selectedConcept: string;
  selectedDifficulty: string;
  onCategoryChange: (category: string) => void;
  onConceptChange: (conceptId: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

const ExerciseFilters = ({
  categories,
  availableConcepts,
  selectedCategory,
  selectedConcept,
  selectedDifficulty,
  onCategoryChange,
  onConceptChange,
  onDifficultyChange,
}: ExerciseFiltersProps) => {
  return (
    <div className="space-y-3">
      {/* 첫 번째 줄: 카테고리와 난이도 */}
      <div className="flex flex-wrap gap-3">
        {/* 카테고리 필터 */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">카테고리:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 난이도 필터 */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">난이도:</span>
          <div className="flex gap-2">
            {['전체', 'easy', 'medium', 'hard'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => onDifficultyChange(difficulty)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors cursor-pointer ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {difficulty === '전체' ? '전체' : difficultyLabels[difficulty as keyof typeof difficultyLabels]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 두 번째 줄: 개념 필터 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">개념:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onConceptChange('전체')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors cursor-pointer ${
              selectedConcept === '전체'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            전체
          </button>
          {availableConcepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => onConceptChange(concept.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors cursor-pointer ${
                selectedConcept === concept.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {concept.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseFilters;
