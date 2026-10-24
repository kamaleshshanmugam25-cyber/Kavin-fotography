import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollWithRetry } from '../utils/scroll';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // Navigating to a page with no anchor: scroll immediately to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      // Navigating to a hash anchor: smoothly glide with navbar clearance once element is ready
      smoothScrollWithRetry(hash, 76);
    }
  }, [pathname, hash]);

  return null;
}
