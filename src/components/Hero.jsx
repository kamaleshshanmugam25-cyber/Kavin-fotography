import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { smoothScrollTo } from '../utils/scroll';

const HERO_SLIDES = [
  {
    image: '/assets/web/hero-grand-ballroom.jpg',
    alt: 'Grand luxury chandelier banquet hall & couple moon silhouette by Kanvi Fotography',
    tag: 'Royal Reception Grandeur',
    objectPosition: 'center 20%',
  },
  {
    image: '/assets/web/wedding-temple-handinhand.jpg',
    alt: 'Traditional South Indian wedding couple at ancient stone temple wall by Kanvi Fotography',
    tag: 'Sacred Heritage Rituals',
    objectPosition: 'center 20%',
  },
  {
    image: '/assets/web/reception-sparkler-tunnel.jpg',
    alt: 'Dramatic golden sparkler light tunnel reception by Kanvi Fotography',
    tag: 'Cinematic Night Magic',
    objectPosition: 'center 30%',
  },
  {
    image: '/assets/web/film-wedding-bala0744.jpg',
    alt: 'Golden hour bridal portrait with veil and sunlight by Kanvi Fotography',
    tag: 'Golden Hour Elegance',
    objectPosition: 'center 15%',
  },
  {
    image: '/assets/web/hilltop-romance-cv011193.jpg',
    alt: 'Couple walking hand in hand on a scenic hilltop by Kanvi Fotography',
    tag: 'Scenic Hilltop Romance',
    objectPosition: 'center 20%',
  },
];

export default function Hero({ onExploreClick, onBookClick }) {
  const navigate = useNavigate();
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
              style={{ objectPosition: HERO_SLIDES[currentSlide].objectPosition || 'center center' }}
              className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.05] saturate-[1.05]"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Crisp, Balanced Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A040C]/95 via-black/35 to-transparent sm:to-[#2A040C]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
        {/* Subtle Ambient Vignette */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[250px] sm:h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,119,0.15),_transparent_70%)] rounded-full pointer-events-none" />
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-3 sm:bottom-8 z-20 flex items-center gap-2">
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

      {/* Content Container - Positioned towards the lower area on mobile so couple's face & photo are clearly visible */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:py-32 pb-12 sm:pb-32 text-center flex flex-col items-center justify-end sm:justify-center mt-auto sm:mt-0">
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
