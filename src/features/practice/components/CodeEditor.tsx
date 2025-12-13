'use client';

import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Problem } from '@/features/practice/types/problem';

interface CodeEditorProps {
  problem: Problem;
  code: string;
  onCodeChange: (code: string) => void;
}

const defaultCode = `function solution(input: any): any {
  // 여기에 코드를 작성하세요
  return input;
}`;

export default function CodeEditor({ problem, code, onCodeChange }: CodeEditorProps) {
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
}

