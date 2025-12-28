'use client';

import { useState, useMemo } from 'react';

interface CodeBlockClientProps {
    language: string;
    code: string;
    highlightedHtml: string;
    className?: string;
}

const CodeBlockClient = ({
    language,
    code,
    highlightedHtml,
    className = '',
}: CodeBlockClientProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    // 줄 번호가 포함된 HTML 생성
    const htmlWithLineNumbers = useMemo(() => {
        const lines = code.split('\n');
        const totalLines = lines.length;
        const lineNumberWidth = totalLines.toString().length;

        // shiki가 생성하는 HTML 구조를 파싱하여 각 줄에 줄 번호 추가
        // <span class="line"> 태그를 찾아서 줄 번호 추가
        let lineIndex = 0;
        const processedHtml = highlightedHtml.replace(
            /<span class="line">/g,
            () => {
                lineIndex++;
                const paddedLineNumber = lineIndex.toString().padStart(lineNumberWidth, ' ');
                return `<span class="line flex" data-line-number="${lineIndex}"><span class="text-gray-600 select-none text-right inline-block shrink-0" style="min-width: ${lineNumberWidth * 0.6 + 0.5}em; margin-right: 1rem; user-select: none">${paddedLineNumber}</span><span class="flex-1">`;
            }
        );

        return processedHtml;
    }, [code, highlightedHtml]);

    return (
        <div className={`bg-gray-900 rounded-lg overflow-hidden ${className}`}>
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-xs font-medium text-gray-400 uppercase">{language}</span>
                <button
                    onClick={handleCopy}
                    className="text-xs text-gray-400 hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-gray-700 cursor-pointer"
                    aria-label="코드 복사"
                >
                    {copied ? '복사됨!' : '복사'}
                </button>
            </div>
            <div
                className="p-4 overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:!text-sm [&_code]:!font-mono [&_code]:!leading-relaxed [&_code]:!block [&_.line]:!block"
                dangerouslySetInnerHTML={{ __html: htmlWithLineNumbers }}
            />
        </div>
    );
};

export default CodeBlockClient;

