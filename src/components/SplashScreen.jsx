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

    // Trigger curtain lift animation
    const timer = setTimeout(() => {
      setShow(false);
    }, 1100);

    // Safety fallback so splash screen never blocks page under any circumstance
    const safetyTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2100);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setShow(false);
    if (onComplete) onComplete();
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1638] text-white overflow-hidden select-none pointer-events-auto"
        >
          {/* Subtle Ambient Vignettes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#163BC7]/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0787F9]/15 rounded-full blur-[90px] pointer-events-none" />

          {/* Quick Skip Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 text-[11px] tracking-[0.2em] uppercase font-semibold text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/20 hover:border-[#0787F9]/50 cursor-pointer z-50"
          >
            Skip
          </button>

          {/* Central Logo & Brand Typography Choreography */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
            {/* KF Monogram Mark */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl p-2 bg-white border border-[#D9DEE8] shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={STUDIO_INFO.assets.logoMark}
                  alt="Kanvi Fotography Official Logo Mark"
                  className="h-full w-full object-contain"
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
                className="absolute -top-2 -right-2 text-[#0787F9]"
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
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.28em] text-white leading-none">
                KANVI
              </h1>
              <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[#0787F9] font-semibold mt-1.5">
                FOTOGRAPHY
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="font-serif italic text-sm sm:text-base text-[#F7F9FC]/90 font-light mt-1 mb-8"
            >
              "{STUDIO_INFO.tagline}"
            </motion.p>

            {/* Royal Blue Slim Progress Bar */}
            <div className="w-48 sm:w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#163BC7] via-[#0787F9] to-[#163BC7] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[9px] tracking-[0.3em] uppercase text-[#D9DEE8]/70 mt-3 font-mono"
            >
              Woraiyur • Trichy
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
