import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, MapPin, Sparkles } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '../data/portfolio';
import PortfolioLightbox from './PortfolioLightbox';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All Work');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    activeCategory === 'All Work'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  return (
    <section id="portfolio" className="relative py-28 sm:py-36 bg-white border-t border-[#D9DEE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F9FC] border border-[#D9DEE8] text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0787F9]" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-tight mb-6">
            Stories We've Had the Privilege to Capture
          </h2>
          <p className="text-[#555B68] text-base sm:text-lg font-light leading-relaxed">
            Every frame is a timeless document of joy, sacred heritage, and tender human connection.
            Browse our curated works across Tamil Nadu and throughout India.
          </p>

          {/* Filter Bar with Animated Selection */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <motion.button
                key={category}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#163BC7] text-white font-bold shadow-lg shadow-[#163BC7]/25 border border-[#163BC7] scale-105'
                    : 'bg-white text-[#555B68] hover:text-[#163BC7] hover:bg-[#F7F9FC] border border-[#D9DEE8]'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Staggered Grid with Scale-Up Reveal */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const aspectClass =
                item.aspect === 'tall'
                  ? 'aspect-[3/4]'
                  : item.aspect === 'wide'
                  ? 'aspect-[16/10]'
                  : 'aspect-square';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 25 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 3) * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative rounded-2xl overflow-hidden bg-[#F7F9FC] border border-[#D9DEE8] cursor-pointer shadow-sm hover:border-[#163BC7] hover:shadow-2xl hover:shadow-[#163BC7]/15 transition-all duration-500 ${aspectClass}`}
                >
                  {/* Portfolio Image with Gentle Hover Zoom */}
                  <img
                    src={item.thumbnailUrl || item.imageUrl}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-[0.96]"
                    loading="lazy"
                  />

                  {/* Subtle Gradient Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1638]/90 via-[#0B1638]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    {/* Top Tag & Zoom Icon */}
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D9DEE8]/30 text-[10px] font-semibold tracking-wider uppercase text-[#F7F9FC]">
                        {item.category}
                      </span>
                      <div className="h-9 w-9 rounded-full bg-[#163BC7]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#163BC7] group-hover:scale-105 transition-all">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Title & Details */}
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#0787F9]" />
                            <span>{item.location}</span>
                          </span>
                        )}
                        <span className="text-[#0787F9]">•</span>
                        <span className="text-[#F7F9FC]">Click to View Frame</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-[#555B68]">
            <p className="font-serif text-xl">No frames in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <PortfolioLightbox
          item={selectedItem}
          items={filteredItems}
          onClose={() => setSelectedItem(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
