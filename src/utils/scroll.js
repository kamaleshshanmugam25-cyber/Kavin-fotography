/**
 * Smooth scrolling utility with fixed navbar offset and URL history update.
 */
export function smoothScrollTo(target, offset = 76) {
  if (!target) return false;

  // Handle cases like "/#films" or "#films" or "films"
  const hashPart = typeof target === 'string' && target.includes('#')
    ? target.substring(target.indexOf('#'))
    : typeof target === 'string'
      ? `#${target}`
      : null;

  let element = null;
  if (hashPart) {
    const targetId = hashPart.replace(/^#/, '');
    element = document.getElementById(targetId) || document.querySelector(hashPart);
  } else if (target instanceof HTMLElement) {
    element = target;
  }

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    const targetTop = Math.max(0, offsetPosition);

    if (window.__lenis) {
      window.__lenis.start();
      window.__lenis.scrollTo(element, {
        offset: -offset,
        duration: 0.65,
        lock: false,
        force: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    }

    try {
      if (hashPart) {
        if (hashPart === '#hero' || targetTop === 0) {
          window.history.pushState(null, '', window.location.pathname);
        } else if (window.location.hash !== hashPart) {
          window.history.pushState(null, '', hashPart);
        }
      }
    } catch (_) {}

    return true;
  }
  return false;
}

/**
 * Retries smooth scroll until the element is mounted in the DOM (e.g. during page transitions).
 */
export function smoothScrollWithRetry(target, offset = 76, maxAttempts = 20, interval = 50) {
  if (!target) return;

  // Try immediately
  if (smoothScrollTo(target, offset)) return;

  let attempts = 0;
  const timer = setInterval(() => {
    attempts++;
    const success = smoothScrollTo(target, offset);
    if (success || attempts >= maxAttempts) {
      clearInterval(timer);
    }
  }, interval);
}
