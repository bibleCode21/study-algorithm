import { codeToHtml } from 'shiki';

/**
 * 코드를 문법 하이라이팅된 HTML로 변환합니다.
 * @param code 코드 문자열
 * @param language 언어 (typescript, javascript, python 등)
 * @returns 하이라이팅된 HTML 문자열
 */
export async function highlightCode(code: string, language: string): Promise<string> {
  try {
    return await codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
    });
  } catch (error) {
    console.error(`Failed to highlight code for language: ${language}`, error);
    // 하이라이팅 실패 시 기본 코드 반환
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

/**
 * HTML 이스케이프 유틸리티
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

