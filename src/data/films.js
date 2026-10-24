/**
 * KANVI FOTOGRAPHY - Films & Motion Data
 * Curated to the 3 signature film specialties with real Kanvi Fotography visuals.
 * 
 * ============================================================================
 * WHERE TO CHANGE OR ADD FILMS & VIDEOS:
 * ============================================================================
 * 1. Place your video files in: `public/assets/films/`
 * 2. Update the `videoUrl` property below for any film:
 *    - Direct MP4/WebM video: '/assets/films/balaji_video01.mp4'
 *    - YouTube link:          'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'
 *    - Vimeo link:            'https://vimeo.com/YOUR_VIDEO_ID'
 * 3. Update `duration` to match your video length (e.g. '06:21', '00:26', '00:13').
 * 4. To provide a secondary cut/reel (like an aerial teaser), set `altVideoUrl`.
 * ============================================================================
 */

export const FILMS_DATA = [
  {
    id: 'film-01',
    title: 'The Eternal Vow | Cinematic Wedding Film',
    category: 'Wedding Film',
    duration: '06:21',
    resolution: '4K Ultra HD',
    thumbnail: '/assets/WA 1.jpg',
    videoUrl: '/assets/films/balaji_video01.mp4',
    description:
      'A poetic cinematic film blending sacred temple mantras, intimate glances, and soaring emotional melodies into a timeless heirloom.',
    gear: 'Sony FX3 Cinema Line • G-Master Primes • 10-bit S-Log3',
    features: ['Color graded in DaVinci Resolve', 'Multi-source ambient audio mastering', 'Custom cinematic teaser cuts'],
  },
  {
    id: 'film-02',
    title: 'Whispers by the Kaveri | Candid Wedding Teaser',
    category: 'Candid Videography',
    duration: '00:26',
    resolution: '4K Cinematic',
    thumbnail: '/assets/image.jpg',
    videoUrl: '/assets/films/balaji_video02.mp4',
    description:
      'Gentle waves, golden sun rays, and spontaneous moments of tender connection filmed naturally without forced staging.',
    gear: 'DJI Ronin RS3 Pro Gimbal • Sony Cinema Series',
    features: ['Dynamic gimbal tracking', 'Natural golden hour illumination', 'Licensed indie sound design'],
  },
  {
    id: 'film-03',
    title: 'Skyward Majesty | Grand Aerial Drone Cinema',
    category: 'Drone Shoots',
    duration: '00:13',
    resolution: '4K 60fps',
    thumbnail: '/assets/earth.png',
    videoUrl: '/assets/films/balaji_video03.MP4',
    altVideoUrl: '/assets/films/balaji_video04.MP4',
    altDuration: '00:34',
    description:
      'Dramatic sweeping aerial angles capturing the grandeur of the wedding convoy, floral decorations, and architectural majesty from above.',
    gear: 'DJI Mavic 3 Pro Cine • Hasselblad Lens System',
    features: ['High-wind stability', 'Certified drone pilot operations', '360-degree orbit sweeps'],
  },
];
