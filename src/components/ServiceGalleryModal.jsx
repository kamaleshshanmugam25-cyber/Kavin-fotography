import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageSquare, ChevronLeft, ChevronRight, Maximize2, CheckCircle2 } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';

export default function ServiceGalleryModal({ service, onClose, onEnquire }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      setActivePhotoIndex(null);
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [service]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activePhotoIndex !== null) {
          setActivePhotoIndex(null);
        } else if (service) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose, activePhotoIndex]);

  if (!service) return null;

  const photos = service.gallery && service.gallery.length > 0 ? service.gallery : [service.image];

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleDirectWhatsApp = () => {
    const text = `Hi Kanvi Fotography! I am looking at your *${service.title}* photos and would like to check availability and package details.`;
    window.open(`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-gallery-title"
      >
        {/* Darkened Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#D9DEE8] my-auto z-10 flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Top Header Bar */}
          <div className="relative px-6 py-5 border-b border-[#D9DEE8] flex items-center justify-between bg-[#F7F9FC]">
            <div className="pr-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#163BC7] px-2.5 py-0.5 rounded-full bg-[#163BC7]/10 border border-[#163BC7]/25">
                  {service.category}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-[#0B1638] font-medium">{service.tag}</span>
              </div>
              <h2
                id="service-gallery-title"
                className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal leading-tight"
              >
                {service.title} Showcase
              </h2>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-[#D9DEE8] text-[#555B68] hover:text-[#111111] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              aria-label="Close photo gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Gallery Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Description & Feature Chips */}
            <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#D9DEE8]">
              <p className="text-sm text-[#555B68] leading-relaxed font-light mb-3">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs text-[#111111] bg-white px-3 py-1 rounded-full border border-[#D9DEE8] shadow-2xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#163BC7]" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Photo Gallery Grid */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#111111]">
                  Curated Photographs ({photos.length} Frames)
                </span>
                <span className="text-[11px] text-[#555B68] italic">Click any photo to enlarge</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((imgUrl, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setActivePhotoIndex(idx)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-black/50 cursor-pointer shadow-md border border-[#D9DEE8] hover:border-[#163BC7] hover:shadow-xl transition-all"
                  >
                    <img
                      src={imgUrl}
                      alt={`${service.title} photo ${idx + 1}`}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 filter brightness-[0.93]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                      <div className="flex items-center justify-between w-full text-white text-xs">
                        <span className="font-serif italic tracking-wide">Frame {idx + 1} of {photos.length}</span>
                        <div className="p-1 rounded-md bg-white/20 backdrop-blur-md">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-4 bg-[#F7F9FC] border-t border-[#D9DEE8] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#555B68] text-center sm:text-left">
              Need custom coverage or multi-day pricing? Bala is available pan-India.
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#25D366] text-[#111111] hover:bg-[#25D366]/10 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onEnquire) onEnquire(service.title);
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#163BC7] hover:bg-[#0B1638] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>Enquire for this Service</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Single Photo Lightbox Overlay */}
          <AnimatePresence>
            {activePhotoIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
                onClick={() => setActivePhotoIndex(null)}
              >
                {/* Lightbox Controls */}
                <div className="w-full flex items-center justify-between z-20">
                  <span className="text-white text-xs sm:text-sm font-medium tracking-wider">
                    {service.title} • {activePhotoIndex + 1} / {photos.length}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(null);
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Main Enlarged Image */}
                <div className="relative max-w-4xl max-h-[75vh] w-full flex items-center justify-center my-auto">
                  <motion.img
                    key={activePhotoIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    src={photos[activePhotoIndex]}
                    alt={`${service.title} enlarged`}
                    className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* Navigation Arrows */}
                  {photos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevPhoto}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#163BC7] text-white transition-colors cursor-pointer"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextPhoto}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#163BC7] text-white transition-colors cursor-pointer"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Bottom CTA in Lightbox */}
                <div className="z-20 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(null);
                      onClose();
                      if (onEnquire) onEnquire(service.title);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#163BC7] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0B1638] transition-colors shadow-lg cursor-pointer"
                  >
                    Enquire for {service.title}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
