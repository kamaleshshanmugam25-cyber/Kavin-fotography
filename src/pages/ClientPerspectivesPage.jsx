import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Star,
  Quote,
  MessageSquareHeart,
  Send,
  Heart,
  CheckCircle2,
  MapPin,
  Clock,
  Award,
  Filter,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { TESTIMONIALS_DATA, GOOGLE_REVIEWS_SUMMARY } from '../data/testimonialsData';
import { useIsMobile } from '../utils/useIsMobile';

const CATEGORIES = [
  { id: 'all', label: 'All Stories' },
  { id: 'Weddings', label: 'Weddings & Muhurtham' },
  { id: 'Pre-Wedding', label: 'Pre-Wedding Shoots' },
  { id: 'Receptions', label: 'Evening Receptions' },
  { id: 'Candid', label: 'Candid Celebrations' },
];

export default function ClientPerspectivesPage({ onBookClick }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile(640);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredReviews =
    activeCategory === 'all'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((item) => item.category === activeCategory);

  const handleBookingCTA = () => {
    navigate('/booking');
  };

  const handleShareReview = () => {
    const text = `Hi Kanvi Fotography & Bala! I would love to share our wedding / event experience and feedback with you.`;
    window.open(`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#163BC7] selection:text-white">
      {/* 1. Cinematic Hero Banner */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] w-full flex flex-col justify-end sm:justify-center items-center overflow-hidden bg-[#0B1638]">
        {/* Background Image with Slow Subtle Motion */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 7, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src="/assets/web/wedding-temple-whisper.jpg"
              alt="Kanvi Fotography Client Perspectives and Stories"
              style={{ objectPosition: isMobile ? '52% 52%' : '52% 50%' }}
              className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.03]"
              loading="eager"
            />
          </motion.div>

          {/* Clean, Neutral Photographic Vignette - Zero blue cast so wedding photos look natural & rich */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 via-45% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:py-32 text-center flex flex-col items-center justify-end sm:justify-center mt-auto sm:mt-0 w-full">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#0787F9] mb-2 sm:mb-3"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-semibold">Client Perspectives</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0B1638]/80 border border-[#D9DEE8]/30 backdrop-blur-md mb-2 sm:mb-4 shadow-xl"
          >
            <MessageSquareHeart className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#0787F9] shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#F7F9FC] whitespace-nowrap">
              VOICES OF TRUST &amp; GRATITUDE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight mb-2 sm:mb-4 max-w-4xl"
          >
            Client Perspectives &amp; Stories
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-base md:text-lg text-[#F7F9FC]/90 font-light max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-8"
          >
            The greatest honor of our studio is the deep trust placed in us by couples and families across Tamil Nadu. Read their real experiences, memories, and reflections.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={handleBookingCTA}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-[#163BC7] hover:bg-[#0B1638] text-white font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-xl shadow-[#163BC7]/20 flex items-center justify-center gap-2 cursor-pointer group border border-[#163BC7]"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Reserve Your Sacred Date</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleShareReview}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-md border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#0787F9]" />
              <span>Share Your Experience</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Google Reviews & Trust Bar */}
      <section className="bg-[#0B1638] text-white border-y border-[#D9DEE8]/20 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-2">
              <div className="flex items-center justify-center gap-1 text-[#0787F9] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-[#0787F9] text-[#0787F9]" />
                ))}
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                {GOOGLE_REVIEWS_SUMMARY.averageRating} / 5.0
              </div>
              <div className="text-[10px] sm:text-xs text-[#0787F9] uppercase tracking-wider font-semibold">
                Google Rating
              </div>
            </div>

            <div className="p-2 border-l border-white/10">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-white mb-0.5">
                {GOOGLE_REVIEWS_SUMMARY.totalReviews}
              </div>
              <div className="text-[10px] sm:text-xs text-[#0787F9] uppercase tracking-wider font-semibold">
                Celebrations Preserved
              </div>
              <div className="text-[10px] text-white/60">Across Tamil Nadu &amp; India</div>
            </div>

            <div className="p-2 border-l border-white/10">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-white mb-0.5">
                {GOOGLE_REVIEWS_SUMMARY.fiveStarPercentage}
              </div>
              <div className="text-[10px] sm:text-xs text-[#0787F9] uppercase tracking-wider font-semibold">
                5-Star Client Satisfaction
              </div>
              <div className="text-[10px] text-white/60">Verified Couple Feedback</div>
            </div>

            <div className="p-2 border-l border-white/10">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-white mb-0.5">
                {GOOGLE_REVIEWS_SUMMARY.yearsServing}
              </div>
              <div className="text-[10px] sm:text-xs text-[#0787F9] uppercase tracking-wider font-semibold">
                Boutique Heritage Studio
              </div>
              <div className="text-[10px] text-white/60">Founded in {STUDIO_INFO.establishedYear}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Tabs */}
      <section className="pt-14 pb-8 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#163BC7] text-white shadow-md border border-[#163BC7]'
                    : 'bg-[#F7F9FC] hover:bg-white text-[#555B68] border border-[#D9DEE8]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Masonry Grid of Client Testimonials */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-3xl bg-[#F7F9FC] border border-[#D9DEE8] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#163BC7]/50"
              >
                <div>
                  {/* Top Header with Image & Couple Details */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl overflow-hidden border-2 border-[#D9DEE8] shadow-sm shrink-0">
                        <img
                          src={rev.image}
                          alt={rev.couple}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#111111] group-hover:text-[#163BC7] transition-colors">
                          {rev.couple}
                        </h3>
                        <div className="text-xs text-[#555B68] font-medium flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#163BC7] shrink-0" />
                          <span>{rev.location}</span>
                        </div>
                        <div className="text-[11px] text-[#555B68]/70">{rev.date}</div>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-[#D9DEE8] shadow-xs shrink-0">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#163BC7] text-[#163BC7]" />
                      ))}
                    </div>
                  </div>

                  {/* Highlight Banner */}
                  <div className="p-3.5 rounded-xl bg-white border-l-4 border-[#163BC7] mb-4 text-xs sm:text-sm font-semibold text-[#111111] shadow-xs">
                    "{rev.highlight}"
                  </div>

                  {/* Full Review Text */}
                  <p className="text-[#555B68] text-xs sm:text-sm leading-relaxed font-light mb-6">
                    {rev.review}
                  </p>
                </div>

                {/* Bottom Deliverables & Event Badge */}
                <div className="pt-4 border-t border-[#D9DEE8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px]">
                  <div className="flex flex-wrap gap-1.5">
                    {rev.deliverables.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-[#D9DEE8] text-[#555B68] font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 text-[#163BC7] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Couple</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Invitation to Share Experience */}
      <section className="py-16 sm:py-20 bg-[#F7F9FC] border-t border-[#D9DEE8] px-4">
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-[#D9DEE8] shadow-lg text-center relative overflow-hidden">
          <div className="h-14 w-14 rounded-full bg-[#163BC7] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal mb-3">
            Have We Documented Your Sacred Celebration?
          </h3>
          <p className="text-[#555B68] text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed mb-6">
            Your words inspire us to continually strive for perfection. If Kanvi Fotography preserved your wedding, reception, or family milestone, we would be deeply honored to hear your thoughts.
          </p>
          <button
            type="button"
            onClick={handleShareReview}
            className="px-8 py-3.5 rounded-full bg-[#163BC7] hover:bg-[#0B1638] text-white font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-md shadow-[#163BC7]/20 flex items-center justify-center gap-2 mx-auto cursor-pointer border border-[#163BC7]"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Send Us Your Review on WhatsApp</span>
          </button>
        </div>
      </section>

      {/* 6. Final Booking CTA */}
      <section className="py-16 sm:py-24 bg-[#0B1638] text-white px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs tracking-[0.25em] uppercase text-[#0787F9] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#0787F9]" />
            <span>Your Story Awaits</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Ready to Create Your Own Timeless Story?
          </h2>
          <p className="text-[#D9DEE8] text-xs sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Every celebration receives our undivided artistic dedication. Reserve your Muhurtham or celebration date on our calendar today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleBookingCTA}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#163BC7] hover:bg-[#0787F9] text-white font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#163BC7]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#163BC7]"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Reserve Your Date (Book Now)</span>
            </button>
            <Link
              to="/process"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Our 4-Step Process</span>
              <ArrowRight className="w-4 h-4 text-[#0787F9]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
