'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { Exercise } from '@/features/practice/types/exercise';
import { CodeEditorProps } from '@/features/practice/types/components';

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

const getDefaultCode = (exercise: Exercise, templateIndex: number = 0): string => {
    if (exercise.templateCode) {
        if (Array.isArray(exercise.templateCode)) {
            return exercise.templateCode[templateIndex] || exercise.templateCode[0];
        }
        return exercise.templateCode;
    }
    
    // 기본 템플릿 (arrow function)
    return `const solution = (data: any): any => {
  // 여기에 코드를 작성하세요
  return data;
};`;
};

const CodeEditor = ({ 
    exercise, 
    code, 
    onCodeChange,
    selectedTemplateIndex = 0,
    onTemplateChange
}: CodeEditorProps) => {
    const editorRef = useRef<any>(null);
    const templateCodes = Array.isArray(exercise.templateCode) && exercise.templateCode.length > 1 
        ? exercise.templateCode 
        : null;

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleReset = () => {
        const defaultCode = getDefaultCode(exercise, selectedTemplateIndex);
        onCodeChange(defaultCode);
        if (editorRef.current) {
            editorRef.current.setValue(defaultCode);
        }
    };

    const handleTemplateChange = (index: number) => {
        if (onTemplateChange) {
            onTemplateChange(index);
            const newTemplate = getDefaultCode(exercise, index);
            onCodeChange(newTemplate);
            if (editorRef.current) {
                editorRef.current.setValue(newTemplate);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">코드 작성</h2>
                <div className="flex items-center gap-2">
                    {templateCodes && (
                        <div className="flex items-center gap-2 mr-2">
                            {templateCodes.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTemplateChange(index)}
                                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                        selectedTemplateIndex === index
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    title={problem.templateDescriptions?.[index]}
                                >
                                    {problem.templateDescriptions?.[index] || `템플릿 ${index + 1}`}
                                </button>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={handleReset}
                        className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        초기화
                    </button>
                </div>
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

