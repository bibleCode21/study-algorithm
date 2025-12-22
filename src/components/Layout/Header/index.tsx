import Link from 'next/link';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto px-6 md:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                        알고리즘 정리
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            홈
                        </Link>
                        <Link
                            href="/concepts/data-structures"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            개념
                        </Link>
                        <Link
                            href="/practice"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            문제 풀이
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;

