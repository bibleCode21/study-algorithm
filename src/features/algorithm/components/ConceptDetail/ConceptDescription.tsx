'use client';

import React from 'react';
import { ConceptDescriptionProps } from '@/features/algorithm/types/components';

/**
 * 마크다운 스타일 텍스트를 파싱하여 렌더링합니다.
 * - **텍스트**: 볼드 처리
 * - - 리스트: 리스트 아이템으로 렌더링
 */
function parseMarkdown(text: string): React.ReactNode[] {
    const lines = text.split('\n');
    const result: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = () => {
        if (currentList.length > 0) {
            result.push(
                <ul key={`list-${result.length}`} className="list-disc list-inside space-y-1 my-3 ml-4">
                    {currentList.map((item, idx) => (
                        <li key={idx} className="text-gray-700">
                            {parseInlineMarkdown(item)}
                        </li>
                    ))}
                </ul>
            );
            currentList = [];
        }
    };

    const parseInlineMarkdown = (line: string): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        const boldRegex = /\*\*(.+?)\*\*/g;
        let lastIndex = 0;
        let match;
        let key = 0;

        while ((match = boldRegex.exec(line)) !== null) {
            // 일반 텍스트 추가
            if (match.index > lastIndex) {
                parts.push(
                    <span key={key++}>{line.substring(lastIndex, match.index)}</span>
                );
            }
            // 볼드 텍스트 추가
            parts.push(
                <strong key={key++} className="font-semibold text-gray-900">
                    {match[1]}
                </strong>
            );
            lastIndex = match.index + match[0].length;
        }
        // 남은 텍스트 추가
        if (lastIndex < line.length) {
            parts.push(<span key={key++}>{line.substring(lastIndex)}</span>);
        }

        return parts.length > 0 ? parts : [line];
    };

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // 빈 줄
        if (!trimmedLine) {
            flushList();
            result.push(<br key={`br-${index}`} />);
            return;
        }

        // 리스트 아이템 (- 로 시작)
        if (trimmedLine.startsWith('- ')) {
            currentList.push(trimmedLine.substring(2));
            return;
        }

        // 일반 텍스트
        flushList();
        result.push(
            <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-3">
                {parseInlineMarkdown(trimmedLine)}
            </p>
        );
    });

    flushList();
    return result;
}

export default function ConceptDescription({ description }: ConceptDescriptionProps) {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">설명</h2>
            <div className="text-gray-700 leading-relaxed">
                {parseMarkdown(description)}
            </div>
        </section>
    );
}

