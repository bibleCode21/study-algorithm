'use client';

import { useState } from 'react';
import { CodeBlockProps } from '@/types/ui';

export default function CodeBlock({ language, code, className = '' }: CodeBlockProps) {
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

    return (
        <div className={`bg-gray-900 rounded-lg overflow-hidden ${className}`}>
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-xs font-medium text-gray-400 uppercase">{language}</span>
                <button
                    onClick={handleCopy}
                    className="text-xs text-gray-400 hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-gray-700"
                    aria-label="코드 복사"
                >
                    {copied ? '복사됨!' : '복사'}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
                    {code}
                </code>
            </pre>
        </div>
    );
}
