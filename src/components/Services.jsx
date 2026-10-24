import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Images } from 'lucide-react';
import { SERVICES } from '../data/services';
import { smoothScrollTo } from '../utils/scroll';

// The 3 signature services requested by client: Bridal Beauty, The Wedding, and Glamour & Lights
export const FEATURED_SERVICES = [
  SERVICES.find((s) => s.id === 'makeover-portrait'),
  SERVICES.find((s) => s.id === 'wedding-rituals'),
  SERVICES.find((s) => s.id === 'reception-portrait'),
].filter(Boolean);

export default function Services({ onSelectService }) {
  const navigate = useNavigate();

  const handleEnquire = (service) => {
    if (onSelectService) {
      onSelectService(service.title);
    } else {
      smoothScrollTo('#booking', 84);
    }
  };

  const handleViewPhotos = (service) => {
    navigate(`/services/${service.id}`);
  };

  return (
    <section id="services" className="relative py-28 sm:py-36 bg-white border-t border-[#D4AF77]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3E9DC] border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#4A0715] font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
            <span>Signature Wedding Trilogy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-normal tracking-tight mb-6">
            Photography for Every Chapter of Life
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
            From bridal makeover beauty to sacred wedding rituals and glamorous evening celebrations,
            explore the photo galleries to experience what we craft for your special day.
          </p>
        </motion.div>

        {/* Services Responsive 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {FEATURED_SERVICES.map((service, index) => {
            const photoCount = service.gallery?.length || 5;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-2xl bg-white border border-[#D4AF77]/25 overflow-hidden flex flex-col justify-between hover:border-[#D4AF77]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF77]/10 hover:-translate-y-1 shadow-sm"
              >
                {/* Service Image Preview with Hover Zoom & View Photos Overlay */}
                <div
                  onClick={() => handleViewPhotos(service)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 cursor-pointer"
                  title={`View ${service.title} photo gallery`}
                >
                  <img
                    src={service.image}
                    alt={service.alt}
                    style={{ objectPosition: service.objectPosition || 'center 20%' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                  {/* Tag Badge: Bridal Beauty | The Wedding | Glamour & Lights */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-semibold tracking-wider uppercase text-white">
                    {service.tag}
                  </div>

                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-[#4A0715] backdrop-blur-md text-[10px] font-medium tracking-wider uppercase text-[#F3E9DC] border border-[#D4AF77]/30 shadow-md">
                    {service.category}
                  </div>

                  {/* Floating Clickable "View Photos" Pill */}
                  <div className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-full bg-white/95 text-[#2A040C] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg group-hover:bg-[#D4AF77] group-hover:text-[#2A040C] transition-colors">
                    <Images className="w-3.5 h-3.5 text-[#C8102E] group-hover:text-[#2A040C]" />
                    <span>See {photoCount} Photos</span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => handleViewPhotos(service)}
                      className="font-serif text-xl sm:text-2xl text-gray-900 font-normal mb-2.5 group-hover:text-[#4A0715] transition-colors cursor-pointer"
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light mb-4">
                      {service.description}
                    </p>

                    {/* Feature Highlights */}
                    <ul className="space-y-1.5 mb-5 border-t border-gray-100 pt-3.5">
                      {service.features.map((feat, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF77] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dual Action Buttons: View Photos & Enquire */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => handleViewPhotos(service)}
                      className="py-2.5 px-3 rounded-xl bg-[#F3E9DC]/60 hover:bg-[#D4AF77] text-[#2A040C] text-xs font-semibold tracking-wider uppercase transition-all duration-200 border border-[#D4AF77]/40 hover:border-[#D4AF77] flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                      <Images className="w-3.5 h-3.5 text-[#C8102E] group-hover:text-[#2A040C]" />
                      <span>Photos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEnquire(service)}
                      className="py-2.5 px-3 rounded-xl bg-[#FFFDF7] hover:bg-[#D4AF77] text-[#2A040C] text-xs font-bold tracking-wider uppercase transition-all duration-200 border border-[#D4AF77]/50 hover:border-[#D4AF77] flex items-center justify-center gap-1 cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                      <span>Enquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF77] group-hover:text-[#2A040C]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
