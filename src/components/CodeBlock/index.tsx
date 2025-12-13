interface CodeBlockProps {
  language: string;
  code: string;
  className?: string;
}

export default function CodeBlock({ language, code, className = '' }: CodeBlockProps) {
  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-medium text-gray-400 uppercase">{language}</span>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}

