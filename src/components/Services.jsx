import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Images } from 'lucide-react';
import { SERVICES } from '../data/services';

// The 3 signature services requested by client: Bridal Beauty, The Wedding, and Glamour & Lights
export const FEATURED_SERVICES = [
  SERVICES.find((s) => s.id === 'makeover-portrait'),
  SERVICES.find((s) => s.id === 'wedding-rituals'),
  SERVICES.find((s) => s.id === 'reception-portrait'),
].filter(Boolean);

export default function Services({ onSelectService }) {
  const navigate = useNavigate();

  const handleEnquire = (service) => {
    navigate('/booking', { state: { service: service.title } });
  };

  const handleViewPhotos = (service) => {
    navigate(`/services/${service.id}`);
  };

  return (
    <section id="services" className="relative py-28 sm:py-36 bg-[#F7F9FC] border-t border-[#D9DEE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163BC7]/10 border border-[#163BC7]/20 text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0787F9]" />
            <span>Signature Wedding Trilogy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-tight mb-6">
            Photography for Every Chapter of Life
          </h2>
          <p className="text-[#555B68] text-base sm:text-lg font-light leading-relaxed">
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
                className="group relative rounded-2xl bg-white border border-[#D9DEE8] overflow-hidden flex flex-col justify-between hover:border-[#163BC7]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#163BC7]/10 hover:-translate-y-1 shadow-sm"
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1638]/70 via-transparent to-[#0B1638]/30" />

                  {/* Tag Badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/75 border border-white/20 text-[10px] font-semibold tracking-wider uppercase text-white shadow-md">
                    {service.tag}
                  </div>

                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-[#0B1638] text-[10px] font-medium tracking-wider uppercase text-white border border-[#D9DEE8]/30 shadow-md">
                    {service.category}
                  </div>

                  {/* Floating Clickable "View Photos" Pill */}
                  <div className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-full bg-white/95 text-[#111111] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg group-hover:bg-[#163BC7] group-hover:text-white transition-colors">
                    <Images className="w-3.5 h-3.5 text-[#163BC7] group-hover:text-white" />
                    <span>See {photoCount} Photos</span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => handleViewPhotos(service)}
                      className="font-serif text-xl sm:text-2xl text-[#111111] font-normal mb-2.5 group-hover:text-[#163BC7] transition-colors cursor-pointer"
                    >
                      {service.title}
                    </h3>
                    <p className="text-[#555B68] text-sm leading-relaxed font-light mb-4">
                      {service.description}
                    </p>

                    {/* Feature Highlights */}
                    <ul className="space-y-1.5 mb-5 border-t border-[#D9DEE8]/60 pt-3.5">
                      {service.features.map((feat, i) => (
                        <li key={i} className="text-xs text-[#555B68] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#163BC7] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dual Action Buttons: View Photos & Enquire */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D9DEE8]/60">
                    <button
                      type="button"
                      onClick={() => handleViewPhotos(service)}
                      className="py-2.5 px-3 rounded-xl bg-[#F7F9FC] hover:bg-[#163BC7] text-[#111111] hover:text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 border border-[#D9DEE8] hover:border-[#163BC7] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group/btn"
                    >
                      <Images className="w-3.5 h-3.5 text-[#163BC7] group-hover/btn:text-white" />
                      <span>Photos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEnquire(service)}
                      className="py-2.5 px-3 rounded-xl bg-[#163BC7] hover:bg-[#0B1638] text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 border border-[#163BC7] flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                    >
                      <span>Enquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
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
