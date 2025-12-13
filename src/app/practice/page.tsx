import { problems } from '@/data/problems';
import { concepts } from '@/data/concepts';
import PracticeListClient from '@/features/practice/components/PracticeListClient';

export default function PracticePage() {
  // 문제와 관련 개념 정보를 결합
  const problemsWithConcept = problems.map((problem) => {
    const concept = concepts.find((c) => c.id === problem.conceptId);
    return {
      ...problem,
      concept: concept || null,
    };
  });

  return <PracticeListClient problems={problemsWithConcept} />;
}

