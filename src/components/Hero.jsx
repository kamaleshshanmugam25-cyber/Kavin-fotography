import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { smoothScrollTo } from '../utils/scroll';
import { useIsMobile } from '../utils/useIsMobile';

export const HERO_SLIDES = [
  {
    image: '/assets/web/wedding-gopuram-courtyard.jpg',
    alt: 'Regal South Indian wedding bride and groom at temple Gopuram by Kanvi Fotography',
    tag: 'Royal Heritage Muhurtham',
    objectPosition: 'center 25%',
    mobileObjectPosition: '62% 30%',
  },
  {
    image: '/assets/web/wedding-temple-steps.jpg',
    alt: 'Traditional South Indian wedding couple at ancient stone temple wall by Kanvi Fotography',
    tag: 'Sacred Mandapam Vows',
    objectPosition: 'center 25%',
    mobileObjectPosition: '65% 25%',
  },
  {
    image: '/assets/web/wedding-temple-whisper.jpg',
    alt: 'Intimate South Indian wedding couple emotional glance in bridal silk by Kanvi Fotography',
    tag: 'Timeless Wedding Poetry',
    objectPosition: 'center 25%',
    mobileObjectPosition: '52% 28%',
  },
  {
    image: '/assets/web/film-wedding-bala0744.jpg',
    alt: 'Golden hour traditional bridal portrait with veil and silk by Kanvi Fotography',
    tag: 'Golden Hour Bridal Elegance',
    objectPosition: '25% 25%',
    mobileObjectPosition: '12% 55%',
  },
  {
    image: '/assets/web/reception-golden-gown.jpg',
    alt: 'Royal wedding reception bride in magnificent golden gown by Kanvi Fotography',
    tag: 'Grand Evening Reception',
    objectPosition: 'center 15%',
    mobileObjectPosition: 'center 8%',
  },
  {
    image: '/assets/web/wedding-metti-ritual.jpg',
    alt: 'Sacred South Indian wedding Metti ceremony in temple courtyard by Kanvi Fotography',
    tag: 'Sacred Metti Ceremony',
    objectPosition: 'center 50%',
    mobileObjectPosition: '48% 50%',
  },
  {
    image: '/assets/web/wedding-pillar-rest.jpg',
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

  // Auto-advance hero slides every 5 seconds for a relaxed, cinematic experience
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      className="relative min-h-[100svh] min-h-screen w-full flex flex-col justify-end sm:justify-center items-center overflow-hidden bg-[#2A040C]"
    >
      {/* Background Slideshow with Slow Ken Burns Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].alt}
              style={{
                objectPosition: isMobile
                  ? (HERO_SLIDES[currentSlide].mobileObjectPosition || HERO_SLIDES[currentSlide].objectPosition)
                  : HERO_SLIDES[currentSlide].objectPosition,
              }}
              className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] saturate-[1.05]"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Crisp, Balanced Cinematic Overlay - Transparent on mobile top 55% so wedding couple is in full light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A040C] via-[#2A040C]/65 via-50% to-transparent sm:to-[#2A040C]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        {/* Subtle Ambient Vignette */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[250px] sm:h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,119,0.15),_transparent_70%)] rounded-full pointer-events-none" />
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-2.5 sm:bottom-8 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide
                ? 'w-8 h-2 bg-[#D4AF77] shadow-lg shadow-[#D4AF77]/50'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to hero slide ${idx + 1}: ${slide.tag}`}
          />
        ))}
      </div>

      {/* Content Container - Positioned cleanly in lower third on mobile so wedding faces are unobstructed */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:py-32 pb-8 sm:pb-32 text-center flex flex-col items-center justify-end sm:justify-center mt-auto sm:mt-0">
        {/* Established Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#4A0715]/80 border border-[#D4AF77]/40 backdrop-blur-md mb-2.5 sm:mb-6 shadow-xl"
        >
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#D4AF77] shrink-0" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.3em] uppercase text-[#F3E9DC] whitespace-nowrap">
            EST. {STUDIO_INFO.establishedYear} • WORAIYUR, TRICHY
          </span>
        </motion.div>

        {/* Brand Monogram & Name Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-2 sm:mb-4"
        >
          <h2 className="text-xs sm:text-base tracking-[0.25em] sm:tracking-[0.35em] uppercase font-semibold text-[#D4AF77]">
            {STUDIO_INFO.brandName}
          </h2>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.2] mb-3 sm:mb-6 max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
        >
          <span className="block mb-1 sm:mb-2 text-white">
            Every Moment Has a Story.
          </span>
          <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF7] via-[#F3E9DC] to-[#D4AF77]">
            We Capture It Forever.
          </span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-base md:text-xl text-[#FFFDF7] font-light max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-8 px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          {STUDIO_INFO.heroSubheadline}
        </motion.p>

        {/* Action Buttons Animated with Upward Movement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-4 rounded-full bg-[#FFFDF7] hover:bg-[#D4AF77] text-[#2A040C] text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF77]/50 group"
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowRight className="w-4 h-4 text-[#C29B63] group-hover:text-[#2A040C] transition-all duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={scrollToBooking}
            className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-4 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] text-[#2A040C] text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#D4AF77]/30 hover:shadow-[#D4AF77]/50 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF77]"
          >
            <Calendar className="w-4 h-4 text-[#2A040C]" />
            <span>BOOK YOUR EVENT</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
