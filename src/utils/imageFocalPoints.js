/**
 * KANVI FOTOGRAPHY - Centralized Image Focal Point & Orientation System
 * Ensures faces, emotions, and critical subject matter are always perfectly visible
 * across all cards, heroes, gallery grids, and modals regardless of viewport or aspect ratio.
 */

export const IMAGE_FOCAL_POINTS = {
  // Ultra-close bridal portraits & gowns
  '/assets/web/reception-golden-gown.jpg': 'center 0%',
  '/assets/web/bridal-beauty-blue-silk.jpg': 'center 8%',
  '/assets/web/bridal-beauty-blue-silk-alt.jpg': 'center 8%',
  '/assets/web/bridal-window-portrait.jpg': 'center 35%',
  '/assets/web/bridal-window-full.jpg': 'center 35%',

  // Standing couple portraits & ceremonies (faces in top 10-18%)
  '/assets/web/candid-temple-lawn-hands.jpg': 'center 12%',
  '/assets/web/candid-temple-lawn-walk.jpg': 'center 15%',
  '/assets/web/candid-temple-lawn-dance.jpg': 'center 15%',
  '/assets/web/candid-temple-lawn-wide.jpg': 'center 15%',
  '/assets/web/candid-temple-lawn-gaze.jpg': 'center 15%',
  '/assets/web/candid-flowering-tree-kiss.jpg': 'center 15%',
  '/assets/web/candid-outdoor-smile.jpg': 'center 15%',
  '/assets/web/candid-outdoor-hug.jpg': 'center 22%',

  // Temple & Heritage rituals
  '/assets/web/wedding-gopuram-courtyard.jpg': 'center 15%',
  '/assets/web/wedding-gopuram-portrait.jpg': 'center 15%',
  '/assets/web/wedding-metti-ritual.jpg': 'center 22%',
  '/assets/web/wedding-temple-steps.jpg': 'center 15%',
  '/assets/web/wedding-temple-whisper.jpg': 'center 15%',
  '/assets/web/wedding-temple-handinhand.jpg': 'center 20%',

  // Christian & Pastel elegance
  '/assets/web/christian-bridal-prayer.jpg': 'center 15%',
  '/assets/web/christian-pastel-gown.jpg': 'center 15%',

  // Pre-wedding & Beach portraits
  '/assets/web/prewedding-beach-cyan-dress.jpg': 'center 15%',
  '/assets/web/prewedding-beach-lift.jpg': 'center 15%',
  '/assets/web/prewedding-beach-surf-lift.jpg': 'center 18%',

  // Reception portraits
  '/assets/web/reception-garden-portrait.jpg': 'center 15%',
  '/assets/web/reception-garden-walk.jpg': 'center 15%',

  // Widescreen landscapes / Stage architecture
  '/assets/web/hero-grand-ballroom.jpg': 'center center',
  '/assets/web/reception-sparkler-tunnel.jpg': 'center 35%',
  '/assets/web/reception-moon-lanterns.jpg': 'center center',
  '/assets/web/bridal-makeup-macro.jpg': 'center center',
  '/assets/web/candid-golden-indoor.jpg': 'center center',
  '/assets/web/prewedding-beach-kneel.jpg': 'center center',
  '/assets/web/prewedding-beach-kiss.jpg': 'center center',
  '/assets/web/prewedding-beach-forehead.jpg': 'center center',
  '/assets/web/prewedding-beach-walk.jpg': 'center center',
  '/assets/web/prewedding-beach-waves.jpg': 'center center',
  '/assets/web/wedding-pillar-embrace.jpg': 'center center',
  '/assets/web/wedding-pillar-rest.jpg': 'center center',
  '/assets/web/wedding-temple-redwall.jpg': 'center center',
  '/assets/web/wedding-temple-stone-editorial.jpg': 'center center',
  '/assets/web/christian-sunset-mudra.jpg': 'center center',
  '/assets/web/film-wedding-bala0744.jpg': 'center 35%',
};

export const LANDSCAPE_IMAGES = new Set([
  '/assets/web/hero-grand-ballroom.jpg',
  '/assets/web/reception-sparkler-tunnel.jpg',
  '/assets/web/reception-moon-lanterns.jpg',
  '/assets/web/wedding-temple-handinhand.jpg',
  '/assets/web/wedding-temple-redwall.jpg',
  '/assets/web/wedding-temple-stone-editorial.jpg',
  '/assets/web/wedding-pillar-embrace.jpg',
  '/assets/web/wedding-pillar-rest.jpg',
  '/assets/web/prewedding-beach-kneel.jpg',
  '/assets/web/prewedding-beach-kiss.jpg',
  '/assets/web/prewedding-beach-forehead.jpg',
  '/assets/web/prewedding-beach-walk.jpg',
  '/assets/web/prewedding-beach-waves.jpg',
  '/assets/web/bridal-makeup-macro.jpg',
  '/assets/web/bridal-beauty-blue-silk.jpg',
  '/assets/web/bridal-window-portrait.jpg',
  '/assets/web/bridal-window-full.jpg',
  '/assets/web/candid-golden-indoor.jpg',
  '/assets/web/candid-outdoor-hug.jpg',
  '/assets/web/christian-sunset-mudra.jpg',
  '/assets/web/film-wedding-bala0744.jpg',
]);

/**
 * Returns the exact CSS object-position focal point for any photo.
 * Falls back to 'center 15%' for portraits (keeping faces in view) or 'center center' for landscapes.
 */
export function getFocalPoint(url) {
  if (!url) return 'center 15%';
  const clean = url.replace(/^[./]+/, '/').split('?')[0];
  if (IMAGE_FOCAL_POINTS[clean]) return IMAGE_FOCAL_POINTS[clean];
  if (LANDSCAPE_IMAGES.has(clean)) return 'center center';
  return 'center 15%';
}

/**
 * Checks whether an image is naturally landscape.
 */
export function isLandscape(url) {
  if (!url) return false;
  const clean = url.replace(/^[./]+/, '/').split('?')[0];
  return LANDSCAPE_IMAGES.has(clean);
}
