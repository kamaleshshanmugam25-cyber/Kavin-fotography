import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Volume2, VolumeX, Video, CheckCircle2, MessageSquare } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';

function getEmbedUrl(url) {
  if (!url) return null;
  // YouTube watch / embed / youtu.be link
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }
  return null;
}

export default function FilmModal({ film, onClose, onEnquire }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(film?.videoUrl || '');
  const [selectedDuration, setSelectedDuration] = useState(film?.duration || '');

  useEffect(() => {
    setSelectedVideo(film?.videoUrl || '');
    setSelectedDuration(film?.duration || '');
    setIsPlaying(false);
  }, [film]);

  const currentVideoUrl = selectedVideo || film?.videoUrl;
  const currentDuration = selectedDuration || film?.duration;
  const embedUrl = getEmbedUrl(currentVideoUrl);
  const isDirectVideo =
    currentVideoUrl &&
    (/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(currentVideoUrl) || currentVideoUrl.includes('/assets/'));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('film-modal-open');
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('film-modal-open');
    };
  }, []);

  if (!film) return null;

  const handleEnquiry = () => {
    if (onEnquire) {
      onEnquire(film.title);
    } else {
      const text = `Hi Kanvi Fotography, I am interested in your cinematic film and event service: *${film.title}* (${film.category}). Could you share availability and packaging details?`;
      window.open(`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-2xl p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={film.title}
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
              aria-label="Close Film Player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cinematic Player Simulation / Canvas */}
            <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
              {/* If playing YouTube / Vimeo */}
              {isPlaying && embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={film.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0 absolute inset-0 z-10"
                />
              ) : isPlaying && isDirectVideo ? (
                <video
                  key={currentVideoUrl}
                  src={currentVideoUrl}
                  controls
                  autoPlay
                  playsInline
                  poster={film.thumbnail}
                  className="w-full h-full object-contain bg-black absolute inset-0 z-10"
                />
              ) : (
                <>
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    style={{ objectPosition: 'center 35%' }}
                    className={`w-full h-full object-cover filter ${
                      isPlaying ? 'brightness-90 contrast-105 scale-102' : 'brightness-60'
                    } transition-all duration-700`}
                  />

                  {/* Play Button Overlay */}
                  {!isPlaying ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        className="h-20 w-20 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] text-[#2A040C] flex items-center justify-center shadow-2xl shadow-[#D4AF77]/40 hover:scale-110 transition-all duration-300 cursor-pointer"
                        aria-label="Play Cinema Reel"
                      >
                        <Play className="w-8 h-8 ml-1 fill-[#2A040C] text-[#2A040C]" />
                      </button>
                      <p className="mt-4 text-xs tracking-[0.25em] uppercase text-white font-medium">
                        Click to Preview Cinematic Reel
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">Audio is muted by default</p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none">
                      <div className="flex justify-between items-center pointer-events-auto">
                        <span className="px-3 py-1 rounded-full bg-[#D4AF77] text-[#2A040C] text-[10px] font-bold tracking-wider uppercase">
                          Previewing • {film.resolution}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 rounded-full bg-black/60 hover:bg-white/20 text-white transition-colors"
                          aria-label="Toggle Mute"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Progress bar mock */}
                      <div className="w-full space-y-2 pointer-events-auto">
                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            className="h-full bg-[#D4AF77]"
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-gray-300 font-mono">
                          <span>Playing Reel</span>
                          <span>{film.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

          {/* Film Specifications & Overview */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF77] font-semibold">
                  {film.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                  {film.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
                  {film.resolution}
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
                  {currentDuration}
                </span>
              </div>
            </div>

            {/* Multiple Cut / Reel Switcher (if available) */}
            {film.altVideoUrl && (
              <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-xs text-[#D4AF77] font-semibold tracking-wider uppercase">Select Cut:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVideo(film.videoUrl);
                    setSelectedDuration(film.duration);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    currentVideoUrl === film.videoUrl
                      ? 'bg-[#D4AF77] text-[#2A040C] font-bold shadow-md shadow-[#D4AF77]/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Drone Cut 1 ({film.duration})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVideo(film.altVideoUrl);
                    setSelectedDuration(film.altDuration || 'Cut 2');
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    currentVideoUrl === film.altVideoUrl
                      ? 'bg-[#D4AF77] text-[#2A040C] font-bold shadow-md shadow-[#D4AF77]/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Drone Cut 2 ({film.altDuration || 'Cut 2'})
                </button>
              </div>
            )}

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              {film.description}
            </p>

            {/* Gear & Tech Spec */}
            {film.gear && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-300 flex items-start gap-3">
                <Video className="w-4 h-4 text-[#D4AF77] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Production Gear &amp; Standard: </span>
                  <span className="text-gray-300">{film.gear}</span>
                </div>
              </div>
            )}

            {/* Features */}
            {film.features && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {film.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-300 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF77] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <span className="text-xs text-gray-500">
                Full-length mastered files &amp; raw reels delivered in encrypted cloud storage and hard drive.
              </span>
              <button
                type="button"
                onClick={handleEnquiry}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] text-[#2A040C] text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF77]/30 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#2A040C]" />
                <span>Enquire for this Service</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatePresence>
);
}
