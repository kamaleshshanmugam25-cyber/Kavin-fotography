import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { WEDDING_STORIES } from '../data/weddingStories';
import StoryModal from './StoryModal';

export default function WeddingStories() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <section id="wedding-stories" className="relative py-28 sm:py-36 bg-white border-t border-[#D9DEE8] text-[#111111] overflow-hidden">
      {/* Subtle Royal Blue Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(22,59,199,0.06),_transparent_70%)] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#163BC7]/10 border border-[#163BC7]/20 text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-4 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-[#0787F9]" />
            <span>Cinematic Wedding Chronicles</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-tight mb-6">
            Featured Wedding Stories
          </h2>
          <p className="text-[#555B68] text-base sm:text-lg font-light leading-relaxed">
            Weddings are not just celebrations; they are tapestries of sacred vows, family blessings,
            and spontaneous tears. Explore how we craft each wedding into a timeless cinematic story.
          </p>
        </motion.div>

        {/* Stories Presentation with Alternating Horizontal Slide */}
        <div className="space-y-16">
          {WEDDING_STORIES.map((story, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl bg-[#F7F9FC] border border-[#D9DEE8] p-6 sm:p-8 lg:p-10 hover:border-[#163BC7]/40 transition-colors shadow-sm"
              >
                {/* Visual Image Preview with Subtle Horizontal Slide and Reveal */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 35 : -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/60 group cursor-pointer shadow-xl border border-[#D9DEE8] ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                  onClick={() => setSelectedStory(story)}
                >
                  <img
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1638]/90 via-transparent to-black/40" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#0B1638]/90 border border-white/20 text-[10px] font-semibold tracking-wider uppercase text-white">
                      {story.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-xs text-[#F7F9FC] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0787F9]" />
                      <span>{story.location}</span>
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0787F9] group-hover:text-white transition-colors">
                      Explore Story Frames →
                    </span>
                  </div>
                </motion.div>

                {/* Editorial Narrative Revealed with Alternate Slide */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -35 : 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:col-span-5 flex flex-col justify-center ${isReversed ? 'lg:order-1' : ''}`}
                >
                  <span className="text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-2">
                    {story.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal mb-4">
                    {story.title}
                  </h3>
                  <p className="text-[#555B68] text-sm sm:text-base leading-relaxed font-light mb-6">
                    {story.synopsis}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-8">
                    {story.highlights.map((h, i) => (
                      <div key={i} className="text-xs text-[#555B68] flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#163BC7]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedStory(story)}
                    className="self-start px-6 py-3 rounded-full bg-[#163BC7] hover:bg-[#0B1638] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md shadow-[#163BC7]/20 border border-[#163BC7] flex items-center gap-2 cursor-pointer group"
                  >
                    <span>VIEW STORY</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Story Gallery Modal */}
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </section>
  );
}
