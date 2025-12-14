const Footer = () => {
    return (
        <footer className="mt-auto border-t border-gray-200 bg-gray-50">
            <div className="mx-auto px-6 md:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-600">
                        <p className="font-medium text-gray-900 mb-1">알고리즘 정리</p>
                        <p>공부한 알고리즘들을 체계적으로 정리하고 시각화</p>
                    </div>
                    <div className="text-xs text-gray-500">
                        <p>© 2025 bibleCode21. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

