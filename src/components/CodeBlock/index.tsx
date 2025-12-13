import { highlightCode } from '@/utils/codeHighlight';
import CodeBlockClient from './CodeBlockClient';
import { CodeBlockProps } from '@/types/ui';

export default async function CodeBlock({
  language,
  code,
  className = '',
}: CodeBlockProps) {
  const highlightedHtml = await highlightCode(code, language);

  return (
    <CodeBlockClient
      language={language}
      code={code}
      highlightedHtml={highlightedHtml}
      className={className}
    />
  );
}
