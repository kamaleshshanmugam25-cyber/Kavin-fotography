import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { WEDDING_STORIES } from '../data/weddingStories';
import StoryModal from './StoryModal';

export default function WeddingStories() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <section id="wedding-stories" className="relative py-28 sm:py-36 bg-[#4A0715] border-t border-[#D4AF77]/30 text-white overflow-hidden">
      {/* Subtle Champagne Gold Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#D4AF77]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A040C]/80 border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#D4AF77] font-semibold mb-4 shadow-lg">
            <Heart className="w-3.5 h-3.5 text-[#D4AF77]" />
            <span>Cinematic Wedding Chronicles</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFDF7] font-normal tracking-tight mb-6">
            Featured Wedding Stories
          </h2>
          <p className="text-[#F3E9DC]/80 text-base sm:text-lg font-light leading-relaxed">
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
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl bg-[#2A040C]/90 border border-[#D4AF77]/30 p-6 sm:p-8 lg:p-10 hover:border-[#D4AF77]/60 transition-colors shadow-2xl backdrop-blur-md"
              >
                {/* Visual Image Preview with Subtle Horizontal Slide and Reveal */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 35 : -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/60 group cursor-pointer shadow-2xl border border-[#D4AF77]/25 ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                  onClick={() => setSelectedStory(story)}
                >
                  <motion.img
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1.0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 filter brightness-[0.88]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A040C] via-transparent to-black/40" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF77]/40 text-[10px] font-semibold tracking-wider uppercase text-[#D4AF77]">
                      {story.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-xs text-[#F3E9DC] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF77]" />
                      <span>{story.location}</span>
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF77] group-hover:text-white transition-colors">
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
                  <span className="text-xs tracking-[0.25em] uppercase text-[#D4AF77] font-semibold mb-2">
                    {story.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FFFDF7] font-normal mb-4">
                    {story.title}
                  </h3>
                  <p className="text-[#F3E9DC]/85 text-sm sm:text-base leading-relaxed font-light mb-6">
                    {story.synopsis}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-8">
                    {story.highlights.map((h, i) => (
                      <div key={i} className="text-xs text-[#F3E9DC]/90 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#D4AF77]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedStory(story)}
                    className="self-start px-6 py-3 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] text-[#2A040C] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#D4AF77]/30 border border-[#D4AF77] flex items-center gap-2 cursor-pointer group"
                  >
                    <span>VIEW STORY</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2A040C] group-hover:translate-x-1 transition-transform" />
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
