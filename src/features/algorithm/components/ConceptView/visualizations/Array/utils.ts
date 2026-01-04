/**
 * 애니메이션 유틸리티 함수
 * 시각화에서 요소를 하이라이트하고 애니메이션을 처리하는 공통 로직
 */

export const createAnimationHandler = (
  setIsAnimating: (value: boolean) => void,
  clearHighlight: () => void,
  duration = 600
) => {
  return (callback: () => void) => {
    setIsAnimating(true);
    callback();
    setTimeout(() => {
      setIsAnimating(false);
      clearHighlight();
    }, duration);
  };
};
