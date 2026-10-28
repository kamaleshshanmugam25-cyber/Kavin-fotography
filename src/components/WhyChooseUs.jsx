import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Camera, ShieldCheck, Layers, Compass } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/whyChooseUs';

const ICON_MAP = {
  BookOpen,
  Sparkles,
  Camera,
  ShieldCheck,
  Layers,
  Compass,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-28 sm:py-36 bg-[#F7F9FC] border-t border-[#D9DEE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Subtle Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9DEE8] text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0787F9]" />
            <span>Our Artistic Promise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-tight mb-6">
            More Than Photographs. <br className="hidden sm:inline" />
            <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#163BC7] to-[#0787F9]">
              Memories for a Lifetime.
            </span>
          </h2>
          <p className="text-[#555B68] text-base sm:text-lg font-light leading-relaxed">
            We understand the profound emotional weight behind every ceremony and milestone.
            Our craft is guided by dedication, cultural respect, and contemporary visual excellence.
          </p>
        </motion.div>

        {/* 6 Feature Pillars Sequential Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Sparkles;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-8 rounded-2xl bg-white border border-[#D9DEE8] hover:border-[#163BC7] transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-[#163BC7]/10 group flex flex-col justify-between"
              >
                <div>
                  {/* Icon with Subtle Refined Hover Transition */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="h-12 w-12 rounded-xl bg-[#F7F9FC] border border-[#D9DEE8] flex items-center justify-center text-[#163BC7] group-hover:bg-[#163BC7] group-hover:text-white group-hover:border-[#163BC7] transition-all duration-300 mb-6 shadow-xs"
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal mb-3 group-hover:text-[#163BC7] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[#555B68] text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D9DEE8] flex items-center gap-2 text-xs font-mono text-[#555B68]">
                  <span className="text-[#163BC7] font-semibold">0{index + 1}</span>
                  <span className="text-[#0787F9]">•</span>
                  <span>KANVI CRAFT</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
