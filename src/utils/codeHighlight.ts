import { codeToHtml } from 'shiki';

// 코드 하이라이팅 결과를 메모이제이션하기 위한 간단한 캐시
// (shiki 내부 캐시도 있지만, 추가 캐싱으로 성능 향상)
const highlightCache = new Map<string, string>();
const CACHE_SIZE_LIMIT = 100; // 최대 캐시 항목 수

/**
 * 코드를 문법 하이라이팅된 HTML로 변환합니다.
 * @param code 코드 문자열
 * @param language 언어 (typescript, javascript, python 등)
 * @returns 하이라이팅된 HTML 문자열
 */
export async function highlightCode(code: string, language: string): Promise<string> {
  // 캐시 키 생성
  const cacheKey = `${language}:${code}`;
  
  // 캐시에서 확인
  if (highlightCache.has(cacheKey)) {
    return highlightCache.get(cacheKey)!;
  }

  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
    });
    
    // 캐시에 저장 (크기 제한)
    if (highlightCache.size >= CACHE_SIZE_LIMIT) {
      // 가장 오래된 항목 제거 (FIFO)
      const firstKey = highlightCache.keys().next().value;
      highlightCache.delete(firstKey);
    }
    highlightCache.set(cacheKey, html);
    
    return html;
  } catch (error) {
    console.error(`Failed to highlight code for language: ${language}`, error);
    // 하이라이팅 실패 시 기본 코드 반환
    const fallback = `<pre><code>${escapeHtml(code)}</code></pre>`;
    highlightCache.set(cacheKey, fallback);
    return fallback;
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

