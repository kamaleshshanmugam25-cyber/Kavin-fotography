import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';

export default function SplashScreen({ onComplete }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth, quick progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 50);

    // Complete splash screen after branding presentation
    const timer = setTimeout(() => {
      setShow(false);
    }, 1100);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleSkip = () => {
    setShow(false);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="splash-curtain"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1F0308] text-white overflow-hidden select-none"
        >
          {/* Subtle Ambient Vignettes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4A0715]/70 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF77]/12 rounded-full blur-[90px] pointer-events-none" />

          {/* Quick Skip Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#D4AF77]/70 hover:text-[#FFFDF7] transition-colors px-3 py-1.5 rounded-full border border-[#D4AF77]/20 hover:border-[#D4AF77]/50 cursor-pointer"
          >
            Skip
          </button>

          {/* Central Logo & Brand Typography Choreography */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
            {/* KF Monogram Mark with Golden Halo Glow */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl p-2 bg-[#2A040C]/90 border border-[#D4AF77]/40 shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Rotating subtle gold ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-2xl border border-dashed border-[#D4AF77]/30 pointer-events-none"
                />

                <img
                  src={STUDIO_INFO.assets.logoMark}
                  alt="Kanvi Fotography KF Monogram"
                  className="h-full w-full object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,119,0.3)]"
                  onError={(e) => {
                    e.currentTarget.src = STUDIO_INFO.assets.logoOriginal;
                  }}
                />
              </div>

              {/* Little sparkle accent */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -top-2 -right-2 text-[#D4AF77]"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Brand Title: KANVI FOTOGRAPHY */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-2"
            >
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.28em] text-[#FFFDF7] leading-none">
                KANVI
              </h1>
              <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[#D4AF77] font-medium mt-1.5">
                FOTOGRAPHY
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="font-serif italic text-sm sm:text-base text-[#F3E9DC]/80 font-light mt-1 mb-8"
            >
              "{STUDIO_INFO.tagline}"
            </motion.p>

            {/* Luxurious Slim Progress Bar */}
            <div className="w-48 sm:w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D4AF77] via-[#FFFDF7] to-[#D4AF77] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF77]/60 mt-3 font-mono"
            >
              Woraiyur • Trichy
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
