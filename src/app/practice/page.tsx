import { problems } from '@/data/problems';
import { concepts } from '@/data/concepts';
import PracticeListClient from '@/features/practice/components/PracticeListClient';

// 정적 페이지로 생성 (문제 목록은 자주 변경되지 않음)
export const dynamic = 'force-static';

const PracticePage = () => {
  // 문제와 관련 개념 정보를 결합
  const problemsWithConcept = problems.map((problem) => {
    const concept = concepts.find((c) => c.id === problem.conceptId);
    return {
      ...problem,
      concept: concept || null,
    };
  });

  return <PracticeListClient problems={problemsWithConcept} concepts={concepts} />;
};

export default PracticePage;

