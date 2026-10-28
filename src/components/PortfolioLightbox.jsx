import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function PortfolioLightbox({ item, items, onClose, onPrev, onNext }) {
  const touchStartX = useRef(null);

  // Keyboard navigation: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        onNext();
      } else {
        onPrev();
      }
    }
    touchStartX.current = null;
  };

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const totalItems = items.length;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio Image Viewer"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#0787F9] font-semibold">
              KANVI PORTFOLIO
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300 font-mono">
              {currentIndex + 1} / {totalItems}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-[#163BC7] text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#163BC7] cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#163BC7] text-white border border-white/10 transition-all duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-[#163BC7] cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#163BC7] text-white border border-white/10 transition-all duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-[#163BC7] cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Main Lightbox Content */}
        <div className="relative max-w-6xl w-full h-full max-h-[90vh] p-4 sm:p-12 flex flex-col items-center justify-center">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[75vh] w-auto flex items-center justify-center rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src={item.imageUrl}
              alt={item.alt || item.title}
              className="max-h-[75vh] max-w-full w-auto object-contain select-none"
            />
          </motion.div>

          {/* Bottom Captions & Details */}
          <div className="mt-4 text-center max-w-2xl px-4">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-1">
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                {item.title}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#163BC7]/30 border border-[#0787F9]/40 text-[#0787F9] text-xs font-medium">
                {item.category}
              </span>
              {item.location && (
                <span className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0787F9]" />
                  <span>{item.location}</span>
                </span>
              )}
            </div>
            {item.caption && (
              <p className="text-sm text-slate-300 font-light mt-1 max-w-xl mx-auto">
                {item.caption}
              </p>
            )}
            {item.isSample && (
              <p className="text-[11px] text-slate-400 mt-2 italic">
                * Sample inspiration reference showcasing color grading and framing philosophy.
              </p>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
