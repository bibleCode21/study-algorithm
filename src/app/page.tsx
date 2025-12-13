import FeatureCard from '@/features/home/components/FeatureCard';

export default function Home() {
    const features = [
        {
            icon: 'DS',
            iconBgColor: 'bg-blue-100',
            iconTextColor: 'text-blue-600',
            title: '데이터 구조',
            description: '알고리즘 학습 전 필수 데이터 구조 개념 학습',
            items: ['Array, Stack, Queue', 'Tree, Heap, Hash Table', 'Linked List 등'],
        },
        {
            icon: 'AL',
            iconBgColor: 'bg-green-100',
            iconTextColor: 'text-green-600',
            title: '알고리즘',
            description: '다양한 알고리즘 개념 학습 및 시각화',
            items: ['정렬, 탐색 알고리즘', '그래프 알고리즘', '동적 프로그래밍'],
        },
        {
            icon: 'PR',
            iconBgColor: 'bg-purple-100',
            iconTextColor: 'text-purple-600',
            title: '문제 풀이',
            description: '랜덤 문제 풀이를 통한 실전 연습',
            items: ['랜덤 문제 출제', '코드 에디터', '테스트 케이스 실행'],
        },
    ];

    return (
        <main className="bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white border-b border-gray-200" aria-labelledby="hero-heading">
                <div className="mx-auto max-w-7xl px-6 md:px-8 py-16">
                    <header className="max-w-3xl mx-auto text-center">
                        <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            알고리즘 정리
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            공부한 알고리즘들을 체계적으로 정리하고 시각화할 수 있는 웹 애플리케이션
                        </p>
                    </header>
                </div>
            </section>

            {/* Features Section */}
            <section
                className="mx-auto max-w-7xl px-6 md:px-8 py-12"
                aria-labelledby="features-heading"
            >
                <h2 id="features-heading" className="sr-only">
                    주요 기능
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                    {features.map((feature) => (
                        <FeatureCard key={feature.icon} {...feature} />
                    ))}
                </div>
            </section>
        </main>
    );
}
