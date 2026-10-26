import { useState, useEffect } from 'react';

/**
 * Responsive hook returning whether the viewport is smaller than breakpoint (default 640px / mobile).
 */
export function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);

    setIsMobile(mql.matches);

    try {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    } catch (_) {
      mql.addListener(handler);
      return () => mql.removeListener(handler);
    }
  }, [breakpoint]);

  return isMobile;
}
