import { notFound, redirect } from 'next/navigation';
import { concepts } from '@/data/concepts';
import { getRandomExercise, getExercisesByConceptId } from '@/data/exercises';
import { highlightCode } from '@/utils/codeHighlight';
import PracticePageClient from '@/features/practice/components/PracticePageClient';

interface PracticePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ exerciseId?: string }>;
}

export default async function PracticePage({ params, searchParams }: PracticePageProps) {
  const { id } = await params;
  const { exerciseId } = await searchParams;

  const concept = concepts.find((c) => c.id === id);

  if (!concept) {
    notFound();
  }

  // 특정 문제 ID가 있으면 해당 문제를, 없으면 랜덤 문제를 가져옴
  let exercise;
  if (exerciseId) {
    const exercises = getExercisesByConceptId(id);
    exercise = exercises.find((e) => e.id === exerciseId);
    if (!exercise) {
      // 문제 ID가 유효하지 않으면 랜덤 문제로 리다이렉트
      redirect(`/concept/${id}/practice`);
    }
  } else {
    exercise = getRandomExercise(id);
    if (!exercise) {
      // 문제가 없으면 개념 페이지로 리다이렉트
      redirect(`/concept/${id}`);
    }
  }

  // 정답 코드 하이라이팅 처리
  let highlightedSolutionCode = '';
  if (exercise.solution) {
    highlightedSolutionCode = await highlightCode(exercise.solution.code, exercise.solution.language);
  }

  return (
    <PracticePageClient
      concept={concept}
      exercise={exercise}
      highlightedSolutionCode={highlightedSolutionCode}
    />
  );
}

