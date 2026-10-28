import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquareHeart, Send, Star, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';

export default function Testimonials() {
  const featuredReviews = TESTIMONIALS_DATA.slice(0, 3);

  const handleShareReview = () => {
    const text = `Hi Kanvi Fotography & Bala! I would love to share feedback / testimonial regarding our event coverage with you!`;
    window.open(`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="reviews" className="relative py-28 sm:py-36 bg-white border-t border-[#D9DEE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163BC7]/10 border border-[#163BC7]/20 text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-4 shadow-sm">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#0787F9]" />
            <span>Client Perspectives</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-tight mb-6">
            Kind Words, Beautiful Memories
          </h2>
          <p className="text-[#555B68] text-base sm:text-lg font-light leading-relaxed">
            The greatest honor of our studio is building bonds of trust and friendship with every family we serve across Tamil Nadu.
          </p>
        </motion.div>

        {/* 3 Featured Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredReviews.map((rev, i) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="p-7 rounded-3xl bg-[#F7F9FC] border border-[#D9DEE8] shadow-sm flex flex-col justify-between group hover:border-[#163BC7]/50 transition-all hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.image}
                      alt={rev.couple}
                      className="w-12 h-12 rounded-full object-cover border border-[#D9DEE8] shadow-sm"
                    />
                    <div>
                      <div className="font-serif font-bold text-[#111111] text-base group-hover:text-[#163BC7] transition-colors">
                        {rev.couple}
                      </div>
                      <div className="text-[11px] text-[#555B68] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#163BC7]" />
                        <span>{rev.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-[#163BC7] text-[#163BC7]" />
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white border-l-2 border-[#163BC7] text-xs font-semibold text-[#111111] mb-3 shadow-xs">
                  "{rev.highlight}"
                </div>

                <p className="font-light text-[#555B68] text-xs sm:text-sm leading-relaxed mb-4">
                  {rev.review}
                </p>
              </div>

              <div className="border-t border-[#D9DEE8] pt-3 flex items-center justify-between text-[11px] text-[#163BC7] font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Couple</span>
                </span>
                <span className="text-[#555B68] font-normal">{rev.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Perspectives CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            to="/client-perspectives"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#163BC7] hover:bg-[#0B1638] text-white font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-md shadow-[#163BC7]/20 cursor-pointer"
          >
            <span>Read All Client Perspectives &amp; Stories</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>

          <button
            type="button"
            onClick={handleShareReview}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F7F9FC] text-[#163BC7] font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 border border-[#163BC7] shadow-sm cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#163BC7]" />
            <span>Share Your Experience</span>
          </button>
        </div>
      </div>
    </section>
  );
}
