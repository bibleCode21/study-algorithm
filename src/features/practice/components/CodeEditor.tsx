'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { Problem } from '@/features/practice/types/problem';

// Monaco Editor를 동적으로 로딩하여 초기 번들 크기 감소
const Editor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-[400px] bg-gray-900 text-gray-400">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-2"></div>
                <p className="text-sm">에디터 로딩 중...</p>
            </div>
        </div>
    ),
});

interface CodeEditorProps {
    problem: Problem;
    code: string;
    onCodeChange: (code: string) => void;
}

const defaultCode = `function solution(input: any): any {
  // 여기에 코드를 작성하세요
  return input;
}`;

const CodeEditor = ({ problem, code, onCodeChange }: CodeEditorProps) => {
    const editorRef = useRef<any>(null);

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleReset = () => {
        onCodeChange(defaultCode);
        if (editorRef.current) {
            editorRef.current.setValue(defaultCode);
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">코드 작성</h2>
                <button
                    onClick={handleReset}
                    className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
                >
                    초기화
                </button>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <Editor
                    height="400px"
                    defaultLanguage="typescript"
                    value={code}
                    onChange={(value) => onCodeChange(value || '')}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        readOnly: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: 'on',
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;

