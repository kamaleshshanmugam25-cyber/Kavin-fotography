import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { smoothScrollTo } from '../utils/scroll';
import { useIsMobile } from '../utils/useIsMobile';

export const HERO_SLIDES = [
  {
    image: '/assets/web/wedding-gopuram-courtyard-4k.jpg',
    alt: 'Regal South Indian wedding bride and groom at temple Gopuram by Kanvi Fotography',
    tag: 'Royal Heritage Muhurtham',
    objectPosition: '68% 36%',
    mobileObjectPosition: '62% 30%',
  },
  {
    image: '/assets/web/wedding-temple-steps-4k.jpg',
    alt: 'Traditional South Indian wedding couple at ancient stone temple wall by Kanvi Fotography',
    tag: 'Sacred Mandapam Vows',
    objectPosition: '52% 40%',
    mobileObjectPosition: '65% 25%',
  },
  {
    image: '/assets/web/wedding-temple-whisper-4k.jpg',
    alt: 'Intimate South Indian wedding couple emotional glance in bridal silk by Kanvi Fotography',
    tag: 'Timeless Wedding Poetry',
    objectPosition: '52% 50%',
    mobileObjectPosition: '52% 28%',
  },
  {
    image: '/assets/web/film-wedding-bala0744-4k.jpg',
    alt: 'Golden hour traditional bridal portrait with veil and silk by Kanvi Fotography',
    tag: 'Golden Hour Bridal Elegance',
    objectPosition: '25% 35%',
    mobileObjectPosition: '12% 55%',
  },
  {
    image: '/assets/web/reception-golden-gown-4k.jpg',
    alt: 'Royal wedding reception bride in magnificent golden gown by Kanvi Fotography',
    tag: 'Grand Evening Reception',
    objectPosition: 'center 18%',
    mobileObjectPosition: 'center 8%',
  },
  {
    image: '/assets/web/wedding-metti-ritual-4k.jpg',
    alt: 'Sacred South Indian wedding Metti ceremony in temple courtyard by Kanvi Fotography',
    tag: 'Sacred Metti Ceremony',
    objectPosition: 'center 48%',
    mobileObjectPosition: '48% 50%',
  },
  {
    image: '/assets/web/wedding-pillar-rest-4k.jpg',
    alt: 'Traditional South Indian wedding couple intimate portrait by carved temple pillar by Kanvi Fotography',
    tag: 'Mandapam Pillar Romance',
    objectPosition: '65% 35%',
    mobileObjectPosition: '68% 38%',
  },
];

export default function Hero({ onExploreClick, onBookClick }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile(640);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);

  // Pre-load all 4K hero images immediately into browser cache for zero latency
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Auto-advance hero slides every 5 seconds with seamless simultaneous crossfade (zero black gaps)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((curr) => {
        setPrevSlide(curr);
        return (curr + 1) % HERO_SLIDES.length;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectSlide = (idx) => {
    if (idx === currentSlide) return;
    setPrevSlide(currentSlide);
    setCurrentSlide(idx);
  };

  const scrollToServices = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      smoothScrollTo('#services', 84);
    }
  };

  const scrollToBooking = () => {
    navigate('/booking');
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] min-h-screen w-full flex flex-col justify-end items-center overflow-hidden bg-black"
    >
      {/* Background Slideshow with Seamless Simultaneous Crossfade & 4K Crystal Clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isCurrent = idx === currentSlide;
          const isPrev = idx === prevSlide;

          return (
            <motion.div
              key={slide.image}
              initial={false}
              animate={{
                opacity: isCurrent ? 1 : isPrev ? 1 : 0,
                scale: isCurrent ? 1.02 : 1.0,
              }}
              transition={{
                opacity: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] },
                scale: { duration: 6, ease: 'easeOut' },
              }}
              style={{
                zIndex: isCurrent ? 2 : isPrev ? 1 : 0,
                pointerEvents: isCurrent ? 'auto' : 'none',
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                style={{
                  objectPosition: isMobile
                    ? (slide.mobileObjectPosition || slide.objectPosition)
                    : slide.objectPosition,
                }}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          );
        })}

        {/* Clean, Subtle Neutral Vignette - Zero blue tint; 4K photographs shine in full natural clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-35% to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none z-10" />
      </div>

      {/* Slide Navigation Dots - Clean High-Contrast White, Zero Blue */}
      <div className="absolute bottom-3 sm:bottom-6 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide
                ? 'w-7 sm:w-8 h-1.5 sm:h-2 bg-white shadow-lg shadow-white/40'
                : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to hero slide ${idx + 1}: ${slide.tag}`}
          />
        ))}
      </div>

      {/* Content Container - Positioned elegantly in lower portion so wedding couple & temple are fully visible */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 lg:pb-20 pt-24 text-center flex flex-col items-center justify-end mt-auto">
        {/* Established Badge - Pure Neutral Glass Pill, Zero Blue */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-md mb-2.5 sm:mb-4 shadow-lg"
        >
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white/90 shrink-0" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-white whitespace-nowrap">
            EST. {STUDIO_INFO.establishedYear} • WORAIYUR, TRICHY
          </span>
        </motion.div>

        {/* Brand Name Title - Pure Crisp White with Subtle Dots, Zero Blue */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-2 mb-2 sm:mb-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 hidden sm:inline-block" />
          <h2 className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase font-semibold text-white">
            {STUDIO_INFO.brandName}
          </h2>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 hidden sm:inline-block" />
        </motion.div>

        {/* Main Headline - High-Contrast Editorial White, Zero Blue */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-2xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.2] mb-3 sm:mb-5 max-w-3xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
        >
          <span className="block mb-1 sm:mb-2 text-white">
            Every Moment Has a Story.
          </span>
          <span className="block font-serif italic text-white">
            We Capture It Forever.
          </span>
        </motion.h1>

        {/* Supporting Text - Pure White, Zero Blue */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-base md:text-lg text-white/95 font-light max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-7 px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
        >
          {STUDIO_INFO.heroSubheadline}
        </motion.p>

        {/* Action Buttons - Pure Monochrome Luxury, Zero Blue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-xl backdrop-blur-md border border-white/40 hover:border-white hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-all duration-200" />
          </button>

          <button
            onClick={scrollToBooking}
            className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#111111] text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer border border-white"
          >
            <Calendar className="w-4 h-4 text-[#111111]" />
            <span>BOOK YOUR EVENT</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
