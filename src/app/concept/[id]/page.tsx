import { notFound } from 'next/navigation';
import { concepts } from '@/data/concepts';
import { getConceptCodeSync } from '@/data/concepts/getConceptCode';
import { highlightCode } from '@/utils/codeHighlight';
import ConceptHeader from '@/features/algorithm/components/ConceptDetail/ConceptHeader';
import ConceptViewWrapper from '@/features/algorithm/components/ConceptDetail/ConceptViewWrapper';
import ConceptNavigation from '@/features/algorithm/components/ConceptDetail/ConceptNavigation';

interface ConceptDetailPageProps {
    params: Promise<{ id: string }>;
}

// 정적 생성: 빌드 시 모든 개념 페이지를 미리 생성
export async function generateStaticParams() {
    return concepts.map((concept) => ({
        id: concept.id,
    }));
}

// 정적 페이지 재생성 주기 설정 (선택적, 필요시 주석 해제)
// export const revalidate = 3600; // 1시간마다 재생성

export default async function ConceptDetailPage({ params }: ConceptDetailPageProps) {
    const { id } = await params;
    const concept = concepts.find((c) => c.id === id);

    if (!concept) {
        notFound();
    }

    const codeExamples = getConceptCodeSync(id);

    // 서버에서 코드 하이라이팅 미리 처리
    const highlightedCodeExamples = await Promise.all(
        codeExamples.map(async (example) => ({
            ...example,
            highlightedHtml: await highlightCode(example.code, example.language),
        }))
    );

    return (
        <main className="bg-gray-50 min-h-screen">
            <article className="mx-auto max-w-7xl px-6 md:px-8 py-12">
                <ConceptHeader concept={concept} />
                <ConceptViewWrapper concept={concept} codeExamples={highlightedCodeExamples} />
                <ConceptNavigation conceptType={concept.type} conceptId={concept.id} />
            </article>
        </main>
    );
}

