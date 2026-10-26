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
    <section id="reviews" className="relative py-28 sm:py-36 bg-[#FFFDF7] border-t border-[#D4AF77]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3E9DC] border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#4A0715] font-semibold mb-4 shadow-sm">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#D4AF77]" />
            <span>Client Perspectives</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-normal tracking-tight mb-6">
            Kind Words, Beautiful Memories
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
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
              className="p-7 rounded-3xl bg-[#F3E9DC]/60 border border-[#D4AF77]/35 shadow-md flex flex-col justify-between group hover:border-[#D4AF77] transition-all hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.image}
                      alt={rev.couple}
                      className="w-12 h-12 rounded-full object-cover border border-[#D4AF77]/60 shadow-sm"
                    />
                    <div>
                      <div className="font-serif font-bold text-gray-900 text-base group-hover:text-[#4A0715] transition-colors">
                        {rev.couple}
                      </div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C8102E]" />
                        <span>{rev.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-[#D4AF77] text-[#D4AF77]" />
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/80 border-l-2 border-[#C8102E] text-xs font-semibold text-gray-800 mb-3">
                  "{rev.highlight}"
                </div>

                <p className="font-light text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {rev.review}
                </p>
              </div>

              <div className="border-t border-[#D4AF77]/30 pt-3 flex items-center justify-between text-[11px] text-[#25D366] font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Couple</span>
                </span>
                <span className="text-gray-400 font-normal">{rev.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Perspectives CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            to="/client-perspectives"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4A0715] hover:bg-[#C8102E] text-white font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-lg shadow-[#4A0715]/20 cursor-pointer"
          >
            <span>Read All Client Perspectives &amp; Stories</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF77]" />
          </Link>

          <button
            type="button"
            onClick={handleShareReview}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F3E9DC] text-gray-800 font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 border border-[#D4AF77]/50 shadow-sm cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#2A040C]" />
            <span>Share Your Experience</span>
          </button>
        </div>
      </div>
    </section>
  );
}
