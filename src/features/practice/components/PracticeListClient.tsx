'use client';

import Link from 'next/link';
import { Problem } from '@/features/practice/types/problem';
import { Concept } from '@/features/algorithm/types/algorithm';
import Badge from '@/components/ui/Badge';

interface ProblemWithConcept extends Problem {
  concept: Concept | null;
}

interface PracticeListClientProps {
  problems: ProblemWithConcept[];
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

export default function PracticeListClient({ problems }: PracticeListClientProps) {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">문제 풀이</h1>
          <p className="text-gray-600">알고리즘과 데이터 구조 문제를 풀어보세요</p>
        </header>

        {problems.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">등록된 문제가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                href={`/concept/${problem.conceptId}/practice?problemId=${problem.id}`}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 flex-1">{problem.title}</h2>
                  <Badge variant={difficultyColors[problem.difficulty]} size="sm">
                    {difficultyLabels[problem.difficulty]}
                  </Badge>
                </div>

                {problem.concept && (
                  <div className="mb-3">
                    <span className="text-xs text-gray-500">관련 개념:</span>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {problem.concept.title}
                    </span>
                  </div>
                )}

                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{problem.description}</p>

                <div className="flex flex-wrap gap-2">
                  {problem.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {problem.tags.length > 3 && (
                    <span className="text-xs text-gray-400">+{problem.tags.length - 3}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

