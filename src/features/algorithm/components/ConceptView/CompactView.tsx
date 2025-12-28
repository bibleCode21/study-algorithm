import { ConceptViewProps } from '@/features/algorithm/types/components';

const CompactView = ({ concept }: ConceptViewProps) => {
  // 설명을 요약 (첫 2-3 문장만)
  const summary = concept.description.split(/[.!?]\s+/).slice(0, 2).join('. ') + '.';

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">요약</h2>
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </section>

      {(concept.timeComplexity || concept.spaceComplexity) && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">복잡도</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="space-y-6">
              {concept.timeComplexity && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">시간 복잡도</h3>
                  <ul className="space-y-2.5 pl-6 list-disc">
                    <li>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">최선</span>
                        <span className="font-mono font-bold text-gray-900">
                          {concept.timeComplexity.best}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">평균</span>
                        <span className="font-mono font-bold text-gray-900">
                          {concept.timeComplexity.average}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">최악</span>
                        <span className="font-mono font-bold text-gray-900">
                          {concept.timeComplexity.worst}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              {concept.spaceComplexity && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">공간 복잡도</h3>
                  <div className="pl-4">
                    <span className="font-mono font-bold text-gray-900">
                      {concept.spaceComplexity}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">카테고리</h2>
        <div className="flex flex-wrap gap-2">
          {concept.category.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {concept.tags.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">태그</h2>
          <div className="flex flex-wrap gap-2">
            {concept.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CompactView;

