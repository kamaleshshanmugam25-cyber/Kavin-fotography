import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User, Compass } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-[#FFFDF7] overflow-hidden border-t border-[#D4AF77]/20">
      {/* Subtle Champagne Gold & Warm Beige Ambient Vignette */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(212,175,119,0.12),_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(243,233,220,0.4),_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: About Founder & Vision Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Small Super-title */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-[#D4AF77]" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#4A0715]">
                About Founder &amp; Vision
              </span>
            </div>

            {/* Section Heading Revealed from Below */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-normal tracking-tight leading-tight mb-8">
              Behind Every Frame, <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#4A0715] to-[#D4AF77]">
                There Is a Story
              </span>
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed font-light">
              <p>
                Established in 2019 by <strong className="text-gray-900 font-semibold">{STUDIO_INFO.founder}</strong>,{' '}
                <strong className="text-gray-900 font-semibold">Kanvi Fotography</strong> is
                dedicated to preserving life's most sacred moments and once-in-a-lifetime celebrations through
                fine art photography and cinematic visual storytelling.
              </p>
              <p>
                From intimate family rituals and monumental Indian weddings to candid portraits and cherished family milestones,
                Founder Bala approaches every occasion with heartfelt care, artistic vision, and exacting technical precision.
              </p>
              <p>
                Based in <strong className="text-gray-900 font-semibold">{STUDIO_INFO.location.address}</strong>, we
                serve clients across India, crafting timeless photographs and cherished visual memories that families and businesses treasure for generations.
              </p>
            </div>

            {/* Studio Identity Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#D4AF77]/25">
              {/* Founder & Vision Card */}
              <div className="p-4 rounded-xl bg-[#F3E9DC]/50 border border-[#D4AF77]/30 flex items-start gap-3.5 shadow-sm">
                <User className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-gray-500 font-medium">
                    Founder &amp; Vision
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mt-0.5">
                    {STUDIO_INFO.founder}
                  </div>
                  <div className="text-xs text-gray-600">Est. {STUDIO_INFO.establishedYear} • Lead Photographer</div>
                </div>
              </div>

              {/* Studio Base Card */}
              <div className="p-4 rounded-xl bg-[#F3E9DC]/50 border border-[#D4AF77]/30 flex items-start gap-3.5 shadow-sm">
                <MapPin className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-gray-500 font-medium">
                    Studio Base
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mt-0.5">
                    {STUDIO_INFO.location.address}
                  </div>
                  <div className="text-xs text-gray-600">{STUDIO_INFO.location.state}, India</div>
                </div>
              </div>

              {/* Service Coverage Card */}
              <div className="p-4 rounded-xl bg-[#F3E9DC]/50 border border-[#D4AF77]/30 flex items-start gap-3.5 shadow-sm sm:col-span-2">
                <Compass className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-gray-500 font-medium">
                    Service Coverage
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mt-0.5">
                    {STUDIO_INFO.location.serviceArea}
                  </div>
                  <div className="text-xs text-gray-600">Pan-India Availability for Weddings &amp; Events</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Imagery Composition (Clean & Unobstructed) */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Featured Photograph with Subtle Image Reveal */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF77]/30 group">
                <img
                  src="/assets/web/wedding-gopuram-courtyard.jpg"
                  alt="Fine Art Traditional South Indian Wedding Portrait by Kanvi Fotography in Trichy"
                  className="w-full h-[450px] sm:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0715]/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF77] font-semibold mb-1">
                    Woraiyur Heritage &amp; Editorial Storytelling
                  </p>
                  <p className="font-serif italic text-white text-lg sm:text-xl">
                    "Every glance holds a sacred sentiment waiting to be preserved."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
