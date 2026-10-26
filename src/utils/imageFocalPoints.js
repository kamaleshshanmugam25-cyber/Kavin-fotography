/**
 * KANVI FOTOGRAPHY - Centralized Image Focal Point & Responsive Orientation System
 * Ensures faces, emotions, and critical wedding subject matter are always perfectly visible
 * across both mobile and desktop viewports regardless of aspect ratio.
 */

export const DESKTOP_FOCAL_POINTS = {
  // Wedding Ceremonies & Muhurtham
  '/assets/web/wedding-gopuram-courtyard.jpg': '68% 44%',
  '/assets/web/wedding-temple-handinhand.jpg': '64% 42%',
  '/assets/web/wedding-temple-whisper.jpg': 'center 56%',
  '/assets/web/wedding-temple-stone-editorial.jpg': '52% 65%',
  '/assets/web/wedding-temple-steps.jpg': '50% 55%',
  '/assets/web/wedding-pillar-embrace.jpg': '35% 42%',
  '/assets/web/wedding-pillar-rest.jpg': '65% 35%',
  '/assets/web/wedding-metti-ritual.jpg': 'center 50%',
  '/assets/web/wedding-gopuram-portrait.jpg': 'center 30%',
  '/assets/web/wedding-temple-redwall.jpg': 'center 40%',

  // Bridal & Makeover Portraits
  '/assets/web/film-wedding-bala0744.jpg': '25% 25%',
  '/assets/web/bridal-beauty-blue-silk-alt.jpg': 'center 10%',
  '/assets/web/bridal-beauty-blue-silk.jpg': 'center 8%',
  '/assets/web/bridal-makeup-macro.jpg': 'center center',
  '/assets/web/bridal-window-portrait.jpg': 'center 30%',
  '/assets/web/bridal-window-full.jpg': 'center 35%',

  // Evening Reception & Glamour
  '/assets/web/reception-golden-gown.jpg': 'center 15%',
  '/assets/web/reception-garden-portrait.jpg': 'center 25%',
  '/assets/web/reception-sparkler-tunnel.jpg': 'center 35%',
  '/assets/web/reception-garden-walk.jpg': 'center 20%',
  '/assets/web/reception-moon-lanterns.jpg': 'center center',

  // Candid & Pre-Wedding Shoots
  '/assets/web/candid-temple-lawn-wide.jpg': 'center 15%',
  '/assets/web/candid-temple-lawn-hands.jpg': 'center 12%',
  '/assets/web/candid-temple-lawn-walk.jpg': 'center 15%',
  '/assets/web/candid-temple-lawn-gaze.jpg': 'center 15%',
  '/assets/web/candid-temple-lawn-dance.jpg': 'center 15%',
  '/assets/web/candid-flowering-tree-kiss.jpg': 'center 55%',
  '/assets/web/candid-outdoor-smile.jpg': 'center 30%',
  '/assets/web/candid-outdoor-hug.jpg': 'center 22%',
  '/assets/web/prewedding-beach-kneel.jpg': '70% center',
  '/assets/web/prewedding-beach-walk.jpg': 'center 25%',
  '/assets/web/prewedding-beach-lift.jpg': 'center 25%',
};

export const MOBILE_FOCAL_POINTS = {
  // CRITICAL MOBILE-CALIBRATED POSITIONS (narrow 9:19.5 viewport)
  // 1. film-wedding-bala0744: Bride is on the far left (X=0-25%)
  '/assets/web/film-wedding-bala0744.jpg': '12% 55%',

  // 2. wedding-temple-handinhand: Couple vows & garlands are centered at X=65%
  '/assets/web/wedding-temple-handinhand.jpg': '65% 36%',

  // 3. wedding-gopuram-courtyard: Couple & temple tower at X=68%, Y=44%
  '/assets/web/wedding-gopuram-courtyard.jpg': '68% 44%',

  // 4. wedding-temple-whisper: Intimate close glance, faces at Y=52%
  '/assets/web/wedding-temple-whisper.jpg': '52% 52%',

  // 5. wedding-temple-stone-editorial: Couple is in the lower portion (Y=60-90%) of 16:9
  '/assets/web/wedding-temple-stone-editorial.jpg': '52% 65%',

  // 6. reception-golden-gown: Bride face and golden gown in upper section
  '/assets/web/reception-golden-gown.jpg': 'center 8%',

  // 7. reception-garden-portrait: Couple centered in garden
  '/assets/web/reception-garden-portrait.jpg': '52% 25%',

  // 8. wedding-temple-steps: Couple walking on ancient temple steps
  '/assets/web/wedding-temple-steps.jpg': '50% 52%',

  // 9. bridal portraits
  '/assets/web/bridal-beauty-blue-silk-alt.jpg': 'center 10%',
  '/assets/web/bridal-beauty-blue-silk.jpg': 'center 8%',
  '/assets/web/bridal-window-portrait.jpg': 'center 25%',

  // 10. candid & outdoor
  '/assets/web/candid-temple-lawn-wide.jpg': 'center 15%',
  '/assets/web/candid-flowering-tree-kiss.jpg': '60% 70%',
  '/assets/web/candid-outdoor-smile.jpg': '62% 40%',
  '/assets/web/prewedding-beach-kneel.jpg': '75% center',
  '/assets/web/wedding-metti-ritual.jpg': 'center 50%',
  '/assets/web/wedding-pillar-rest.jpg': '68% 38%',
  '/assets/web/wedding-pillar-embrace.jpg': '33% 45%',
};

export const IMAGE_FOCAL_POINTS = DESKTOP_FOCAL_POINTS;

/**
 * Returns the exact CSS object-position focal point for any photo on desktop or mobile.
 */
export function getFocalPoint(url, isMobile = false) {
  if (!url) return isMobile ? 'center 20%' : 'center 25%';
  const clean = url.replace(/^[./]+/, '/').split('?')[0];

  if (isMobile && MOBILE_FOCAL_POINTS[clean]) {
    return MOBILE_FOCAL_POINTS[clean];
  }

  if (DESKTOP_FOCAL_POINTS[clean]) {
    return DESKTOP_FOCAL_POINTS[clean];
  }

  return isMobile ? 'center 20%' : 'center 25%';
}
