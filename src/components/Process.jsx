import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, FileText, Camera, Film, Sparkles, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/process';

const STEP_ICONS = [MessageCircle, FileText, Camera, Film];

export default function Process() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#F7F9FC] border-t border-[#D9DEE8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163BC7]/10 border border-[#163BC7]/20 text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0787F9]" />
            <span>Workflow &amp; Collaboration</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-tight mb-6">
            The Photography Journey
          </h2>
          <p className="text-[#555B68] text-base sm:text-lg font-light leading-relaxed">
            From the first hello to the moment you open your wedding album, our clear 4-step process
            ensures complete peace of mind.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop Animated Timeline Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#163BC7]/40 to-transparent -translate-y-8 origin-left pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const IconComp = STEP_ICONS[index] || Sparkles;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex flex-col p-8 rounded-2xl bg-white border border-[#D9DEE8] hover:border-[#163BC7]/50 transition-all duration-300 group shadow-sm hover:shadow-lg"
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl sm:text-4xl font-light text-[#163BC7] group-hover:text-[#0787F9] transition-colors">
                      {step.step}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      className="h-10 w-10 rounded-xl bg-[#F7F9FC] border border-[#D9DEE8] flex items-center justify-center text-[#555B68] group-hover:bg-[#163BC7] group-hover:text-white group-hover:border-[#163BC7] transition-all shadow-sm"
                    >
                      <IconComp className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal mb-1">
                    {step.title}
                  </h3>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#163BC7] mb-3">
                    {step.subtitle}
                  </div>
                  <p className="text-[#555B68] text-sm leading-relaxed font-light">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Deep-Dive Page Link */}
          <div className="mt-12 text-center">
            <Link
              to="/process"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#163BC7] hover:bg-[#0B1638] text-white font-medium text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            >
              <span>Explore Full 4-Step Journey &amp; Standards</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
