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
    <section id="portfolio" className="relative py-28 sm:py-36 bg-[#FFFDF7] border-t border-[#D4AF77]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3E9DC] border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#4A0715] font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-normal tracking-tight mb-6">
            Stories We've Had the Privilege to Capture
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
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
                    ? 'bg-[#D4AF77] text-[#2A040C] font-bold shadow-lg shadow-[#D4AF77]/30 border border-[#D4AF77] scale-105'
                    : 'bg-white text-gray-700 hover:text-[#2A040C] hover:bg-[#F3E9DC] border border-[#D4AF77]/35'
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
                  className={`group relative rounded-2xl overflow-hidden bg-gray-100 border border-[#D4AF77]/25 cursor-pointer shadow-md hover:border-[#D4AF77] hover:shadow-2xl hover:shadow-[#D4AF77]/20 transition-all duration-500 ${aspectClass}`}
                >
                  {/* Portfolio Image with Gentle Hover Zoom */}
                  <img
                    src={item.thumbnailUrl || item.imageUrl}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-[0.95]"
                    loading="lazy"
                  />

                  {/* Gradient Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A0715]/95 via-[#4A0715]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    {/* Top Tag & Zoom Icon */}
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF77]/40 text-[10px] font-semibold tracking-wider uppercase text-[#F3E9DC]">
                        {item.category}
                      </span>
                      <div className="h-9 w-9 rounded-full bg-[#D4AF77]/30 backdrop-blur-md border border-[#D4AF77]/40 flex items-center justify-center text-white group-hover:bg-[#D4AF77] group-hover:text-[#2A040C] transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Title & Details */}
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-200">
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF77]" />
                            <span>{item.location}</span>
                          </span>
                        )}
                        <span className="text-[#D4AF77]">•</span>
                        <span className="text-[#F3E9DC]">Click to View Frame</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-gray-500">
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
