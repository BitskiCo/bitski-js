export const isMobile = (): boolean => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    const isMobileUserAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const maxWidth = 768;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isMobileUserAgent && window.innerWidth <= maxWidth && hasTouch;
  }

  return false;
};
