import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Sparkles } from 'lucide-react';

export default function StoryModal({ story, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('story-modal-open');
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('story-modal-open');
    };
  }, []);

  if (!story) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-2xl p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={story.title}
        onClick={onClose}
      >
        <div className="min-h-full flex items-start sm:items-center justify-center py-4 sm:py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#0E1117] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-[#D4AF77] text-white hover:text-[#2A040C] transition-colors cursor-pointer border border-white/20 shadow-xl"
              aria-label="Close story"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/50">
              <img
                src={story.heroImage}
                alt={story.title}
                className="w-full h-full object-cover object-center filter brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-black/40" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-[#C8102E] text-white text-[10px] font-semibold tracking-wider uppercase mb-3 inline-block shadow-md">
                  {story.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-2 drop-shadow-md">
                  {story.title}
                </h2>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D4AF77]" />
                    <span>{story.location}</span>
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="italic text-gray-300">{story.subtitle}</span>
                </div>
              </div>
            </div>

          {/* Story Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Synopsis */}
            <div className="border-l-2 border-[#D4AF77] pl-4 sm:pl-6 py-1">
              <p className="font-serif italic text-lg sm:text-xl text-gray-200 leading-relaxed">
                "{story.synopsis}"
              </p>
            </div>

            {/* Highlights */}
            {story.highlights && (
              <div className="flex flex-wrap gap-2">
                {story.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Story Gallery Frames */}
            <div className="space-y-6 pt-4 border-t border-white/10">
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Visual Story Sequence
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {story.storyGallery.map((photo, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 bg-[#0B0D12] text-xs text-gray-300 font-light">
                      {photo.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note & Close Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-400 italic">
                * Sample wedding narrative illustrating our documentary storytelling style.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] text-[#2A040C] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Close Story
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatePresence>
);
}
