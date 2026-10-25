import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareHeart, Send, HeartHandshake, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';

/**
 * Testimonial item schema for when client supplies real customer reviews:
 * { id: 1, name: 'Customer Name', event: 'Wedding in Trichy', year: '2024', quote: '...' }
 */
const VERIFIED_REVIEWS = []; // Intentionally empty until client provides genuine feedback

export default function Testimonials() {
  const handleShareReview = () => {
    const text = `Hi Kanvi Fotography, I would love to share feedback / testimonial regarding our event coverage with you!`;
    window.open(`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="relative py-28 sm:py-36 bg-[#FFFDF7] border-t border-[#D4AF77]/25">
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
            The greatest honor of our studio is building bonds of trust and friendship with every family we serve.
          </p>
        </motion.div>

        {/* When real reviews are ready, they map here. Otherwise, show neutral invitation */}
        {VERIFIED_REVIEWS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VERIFIED_REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-[#D4AF77]/30 shadow-md flex flex-col justify-between"
              >
                <p className="font-serif italic text-gray-800 text-lg mb-6">"{review.quote}"</p>
                <div className="border-t border-[#F3E9DC] pt-4 flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-900">{review.name}</span>
                  <span className="text-gray-500">{review.event}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Neutral Elegant Invitation matching prompt requirements */
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#F3E9DC]/70 border border-[#D4AF77]/35 text-center shadow-xl relative overflow-hidden"
          >
            {/* Subtle Champagne Gold Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[radial-gradient(circle,_rgba(212,175,119,0.15),_transparent_70%)] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="h-14 w-14 rounded-2xl bg-white border border-[#D4AF77]/40 flex items-center justify-center text-[#4A0715] mb-6 shadow-md"
              >
                <HeartHandshake className="w-7 h-7 text-[#C8102E]" />
              </motion.div>

              <h3 className="font-serif text-2xl sm:text-3xl text-gray-900 font-normal mb-4">
                "Your experience could be the next story we capture."
              </h3>

              <p className="text-gray-600 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed mb-8">
                We believe genuine relationships speak louder than any claims. Every celebration is
                approached with individual care and boundless creativity. Have we had the pleasure
                of documenting your wedding or celebration?
              </p>

              <button
                type="button"
                onClick={handleShareReview}
                className="px-6 py-3 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] text-[#2A040C] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg shadow-[#D4AF77]/30 border border-[#D4AF77] flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#2A040C]" />
                <span>Share Your Experience With Us</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
