import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Film, ArrowUpRight } from 'lucide-react';
import { FILMS_DATA } from '../data/films';
import FilmModal from './FilmModal';

export default function Films({ onEnquireFilm }) {
  const [activeFilm, setActiveFilm] = useState(null);

  return (
    <section id="films" className="relative py-28 sm:py-36 bg-[#0B1638] border-t border-[#D9DEE8]/15 text-white overflow-hidden">
      {/* Subtle Royal Blue / Accent Ambient Lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#163BC7]/20 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#0787F9]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Fade-In Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#163BC7]/20 border border-[#0787F9]/40 text-xs tracking-[0.25em] uppercase text-[#0787F9] font-semibold mb-4 shadow-lg backdrop-blur-sm">
            <Film className="w-3.5 h-3.5" />
            <span>Cinematic Wedding Films &amp; Aerials</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight mb-6">
            Cinematic Films &amp; Aerial Perspectives
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Beyond still photography, Kanvi Fotography delivers cinema-grade 4K wedding films,
            intimate candid videography, and dramatic aerial drone perspectives.
          </p>
        </motion.div>

        {/* Films 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {FILMS_DATA.map((film, index) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: (index % 3) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setActiveFilm(film)}
              className="group relative rounded-2xl bg-[#0E1B44]/90 border border-[#D9DEE8]/20 overflow-hidden flex flex-col justify-between hover:border-[#0787F9]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#163BC7]/25 hover:-translate-y-1 cursor-pointer backdrop-blur-sm"
            >
              {/* Thumbnail Container with Scale Effect */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-[0.88]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1638] via-transparent to-black/30" />

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-[#163BC7]/90 backdrop-blur-md border border-[#0787F9]/60 flex items-center justify-center text-white group-hover:bg-[#0787F9] group-hover:border-[#0787F9] group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <Play className="w-5 h-5 ml-0.5 fill-white text-white transition-colors" />
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-[#D9DEE8]/30 text-[10px] font-semibold tracking-wider uppercase text-[#0787F9]">
                  {film.category}
                </div>

                <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-md bg-[#163BC7] backdrop-blur-md text-[10px] font-mono tracking-wider text-white shadow-md">
                  {film.duration}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-normal mb-2 group-hover:text-[#0787F9] transition-colors leading-snug">
                    {film.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-2 mb-4">
                    {film.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9DEE8]/15 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    {film.resolution}
                  </span>
                  <span className="text-xs font-semibold text-[#0787F9] group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>Watch Preview</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Film Player Modal */}
      {activeFilm && (
        <FilmModal
          film={activeFilm}
          onClose={() => setActiveFilm(null)}
          onEnquire={(filmTitle) => {
            setActiveFilm(null);
            if (onEnquireFilm) onEnquireFilm(filmTitle);
          }}
        />
      )}
    </section>
  );
}
