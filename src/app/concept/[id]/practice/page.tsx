import { notFound, redirect } from 'next/navigation';
import { concepts } from '@/data/concepts';
import { getRandomProblem, getProblemsByConceptId } from '@/data/problems';
import { highlightCode } from '@/utils/codeHighlight';
import PracticePageClient from '@/features/practice/components/PracticePageClient';

interface PracticePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ problemId?: string }>;
}

export default async function PracticePage({ params, searchParams }: PracticePageProps) {
  const { id } = await params;
  const { problemId } = await searchParams;

  const concept = concepts.find((c) => c.id === id);

  if (!concept) {
    notFound();
  }

  // 특정 문제 ID가 있으면 해당 문제를, 없으면 랜덤 문제를 가져옴
  let problem;
  if (problemId) {
    const problems = getProblemsByConceptId(id);
    problem = problems.find((p) => p.id === problemId);
    if (!problem) {
      // 문제 ID가 유효하지 않으면 랜덤 문제로 리다이렉트
      redirect(`/concept/${id}/practice`);
    }
  } else {
    problem = getRandomProblem(id);
    if (!problem) {
      // 문제가 없으면 개념 페이지로 리다이렉트
      redirect(`/concept/${id}`);
    }
  }

  // 정답 코드 하이라이팅 처리
  let highlightedSolutionCode = '';
  if (problem.solution) {
    highlightedSolutionCode = await highlightCode(problem.solution.code, problem.solution.language);
  }

  return (
    <PracticePageClient
      concept={concept}
      problem={problem}
      highlightedSolutionCode={highlightedSolutionCode}
    />
  );
}

