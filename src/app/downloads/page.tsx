import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이력서 · 포트폴리오 다운로드",
  description: "이력서와 포트폴리오 PDF 다운로드용 비공개 페이지",
  robots: {
    index: false,
    follow: false,
  },
};

const DownloadsPage = () => {
  return (
    <main className="bg-gray-50">
      <section className="mx-auto max-w-3xl px-6 md:px-8 py-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            이력서 · 포트폴리오 다운로드
          </h1>
        </header>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">이력서</h2>
                <p className="text-sm text-gray-600">
                  최신 버전 요약 이력서 (PDF)
                </p>
              </div>
              <a
                href="/kjh_resume.pdf"
                download
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
              >
                이력서 다운로드
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">포트폴리오</h2>
                <p className="text-sm text-gray-600">
                  주요 프로젝트 아키텍쳐 및 성과 요약 (PDF)
                </p>
              </div>
              <a
                href="/kjh_portfolio.pdf"
                download
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
              >
                포트폴리오 다운로드
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DownloadsPage;
