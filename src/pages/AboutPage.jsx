import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  User,
  MapPin,
  Compass,
  Award,
  Heart,
  Camera,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { WHY_CHOOSE_US } from '../data/whyChooseUs';

export default function AboutPage({ onBookClick }) {
  const navigate = useNavigate();

  const handleBookingCTA = () => {
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#1A1A1A] selection:bg-[#C8102E] selection:text-white">
      {/* 1. Cinematic Hero Banner */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] w-full flex flex-col justify-end sm:justify-center items-center overflow-hidden bg-[#2A040C]">
        {/* Background Image with Slow Subtle Motion */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 7, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src="/assets/web/wedding-gopuram-courtyard.jpg"
              alt="Kanvi Fotography Heritage South Indian Wedding"
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
              loading="eager"
            />
          </motion.div>

          {/* Gradients matching website theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A040C] via-[#2A040C]/65 sm:via-black/35 to-transparent sm:to-[#2A040C]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[250px] sm:h-[450px] bg-[#D4AF77]/10 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:py-32 text-center flex flex-col items-center w-full">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#D4AF77] mb-2 sm:mb-3"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#D4AF77]/60">/</span>
            <span className="text-[#FFFDF7] font-semibold">About Us</span>
          </motion.div>

          {/* Established Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#4A0715]/80 border border-[#D4AF77]/40 backdrop-blur-md mb-2 sm:mb-4 shadow-xl"
          >
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#D4AF77] shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#F3E9DC] whitespace-nowrap">
              EST. {STUDIO_INFO.establishedYear} • WORAIYUR, TRICHY
            </span>
          </motion.div>

          {/* Brand Signature */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mb-1 sm:mb-3"
          >
            <h2 className="text-xs sm:text-base tracking-[0.25em] sm:tracking-[0.35em] uppercase font-semibold text-[#D4AF77]">
              ABOUT FOUNDER &amp; VISION
            </h2>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.18] sm:leading-[1.15] mb-2 sm:mb-4 max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            <span className="block mb-1 sm:mb-1.5 text-white">
              Behind Every Frame,
            </span>
            <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF7] via-[#F3E9DC] to-[#D4AF77]">
              There Is a Sacred Story.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-base md:text-xl text-[#FFFDF7] font-light max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-8 px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            Discover the passion, cultural heritage, and artistic craftsmanship that define Kanvi Fotography and Founder Bala.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <button
              type="button"
              onClick={handleBookingCTA}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] text-[#2A040C] text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#D4AF77]/30 hover:shadow-[#D4AF77]/50 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF77]"
            >
              <Calendar className="w-4 h-4 text-[#2A040C]" />
              <span>RESERVE YOUR EVENT</span>
            </button>

            <Link
              to="/#services"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#FFFDF7] hover:bg-[#D4AF77] text-[#2A040C] text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF77]/50 group"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowRight className="w-4 h-4 text-[#C29B63] group-hover:text-[#2A040C] transition-all duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Founder Story & Editorial Biography */}
      <section className="py-20 sm:py-32 bg-[#FFFDF7] border-b border-[#D4AF77]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Storytelling Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-px bg-[#D4AF77]" />
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#4A0715]">
                  The Founder's Journey
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-normal tracking-tight leading-tight">
                Crafting Timeless Heirlooms from <br />
                <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#4A0715] to-[#D4AF77]">
                  The Cultural Heart of Tamil Nadu
                </span>
              </h2>

              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                <p>
                  Established in 2019 by <strong className="text-gray-900 font-semibold">{STUDIO_INFO.founder}</strong>,{' '}
                  <strong className="text-gray-900 font-semibold">Kanvi Fotography</strong> was founded with a singular, unwavering mission: to elevate wedding and portrait photography from standard documentation into evocative, fine-art visual literature.
                </p>
                <p>
                  Growing up surrounded by the majestic temple architecture of Woraiyur and the Kaveri river basin in Tiruchirappalli, Bala developed a deep sensitivity to cultural heritage, rich natural textures, and authentic human emotions. He recognizes that wedding rituals are not merely staged photo opportunities—they are sacred milestones rich with heartfelt tears, subtle glances, maternal blessings, and timeless laughter.
                </p>
                <p>
                  Over the past five years, Kanvi Fotography has documented hundreds of unique love stories across Tamil Nadu and throughout India. Every commission is undertaken with thorough pre-event coordination, discreet coverage that honors family customs, and meticulous color grading that remains natural, elegant, and forever relevant.
                </p>
              </div>

              {/* Studio Key Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#D4AF77]/25">
                <div className="p-4 rounded-2xl bg-[#F3E9DC]/60 border border-[#D4AF77]/30 text-center">
                  <div className="font-serif text-3xl font-bold text-[#4A0715]">500+</div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-600 font-medium mt-1">Weddings &amp; Events</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#F3E9DC]/60 border border-[#D4AF77]/30 text-center">
                  <div className="font-serif text-3xl font-bold text-[#4A0715]">5+ Years</div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-600 font-medium mt-1">Dedicated Craft</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#F3E9DC]/60 border border-[#D4AF77]/30 text-center">
                  <div className="font-serif text-3xl font-bold text-[#4A0715]">Pan-India</div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-600 font-medium mt-1">Destination Reach</div>
                </div>
              </div>
            </div>

            {/* Right Column: Signature Editorial Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF77]/30 group">
                <img
                  src="/assets/web/bridal-beauty-blue-silk.jpg"
                  alt="Founder Bala Editorial Bridal Portrait by Kanvi Fotography"
                  className="w-full h-[480px] sm:h-[580px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A040C]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF77] font-semibold mb-1">
                    Artisan Bridal &amp; Editorial Portraiture
                  </div>
                  <p className="font-serif italic text-lg sm:text-xl">
                    "True beauty lies in authenticity, quiet dignity, and unforced emotion."
                  </p>
                  <p className="text-[11px] tracking-wider text-gray-300 mt-2">
                    — Bala, Founder &amp; Lead Photographer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 3 Core Pillars of Kanvi Fotography */}
      <section className="py-20 sm:py-32 bg-[#F3E9DC]/40 border-b border-[#D4AF77]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#4A0715] font-semibold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
              <span>Our Artistic Foundation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-normal tracking-tight mb-6">
              The Three Pillars of Our Artistry
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
              Every photograph captured by our studio is rooted in three guiding creative principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 rounded-3xl bg-white border border-[#D4AF77]/30 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-14 w-14 rounded-2xl bg-[#4A0715] text-[#D4AF77] flex items-center justify-center mb-6 shadow-md">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-gray-900 font-normal mb-3">
                1. Candid Authenticity
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                We believe the most poignant memories are unposed. We focus on natural glances, spontaneous joyful laughter, and the intimate connections between family and friends.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-3xl bg-white border border-[#D4AF77]/30 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-14 w-14 rounded-2xl bg-[#4A0715] text-[#D4AF77] flex items-center justify-center mb-6 shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-gray-900 font-normal mb-3">
                2. Cultural Reverence
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                With comprehensive knowledge of traditional rituals—from Sacred Muhurtham and Thali tying to Haldi and Valaikappu—we anticipate every critical ritual moment without interruption.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-3xl bg-white border border-[#D4AF77]/30 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-14 w-14 rounded-2xl bg-[#4A0715] text-[#D4AF77] flex items-center justify-center mb-6 shadow-md">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-gray-900 font-normal mb-3">
                3. Heirloom Longevity
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                We eschew trendy, fleeting color presets in favor of rich, true-to-life tones, balanced skin highlights, and archival print craftsmanship that will look stunning fifty years from today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-20 sm:py-32 bg-[#FFFDF7] border-b border-[#D4AF77]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3E9DC] border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#4A0715] font-semibold mb-4 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF77]" />
              <span>Studio Standards</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-normal tracking-tight mb-6">
              Why Couples Entrust Us with Their Sacred Days
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
              Experience the seamless blend of professional reliability, artistic mastery, and warm hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#D4AF77]/25 shadow-sm hover:border-[#D4AF77]/60 hover:shadow-lg transition-all"
              >
                <div className="h-10 w-10 rounded-xl bg-[#F3E9DC] text-[#4A0715] flex items-center justify-center font-serif font-bold text-lg mb-4">
                  0{idx + 1}
                </div>
                <h4 className="font-serif text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-20 sm:py-28 bg-[#2A040C] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF77]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A0715] border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#D4AF77] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
            <span>Begin Your Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Ready to Preserve Your Story Forever?
          </h2>

          <p className="text-sm sm:text-lg text-[#FFFDF7]/85 font-light max-w-2xl mx-auto leading-relaxed">
            Reach out to Bala and the Kanvi Fotography team to check date availability, discuss package options, or arrange a personal studio consultation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleBookingCTA}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] text-[#2A040C] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all shadow-xl shadow-[#D4AF77]/30 hover:shadow-[#D4AF77]/50 flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF77]"
            >
              <Calendar className="w-4 h-4 text-[#2A040C]" />
              <span>BOOK A CONSULTATION</span>
            </button>

            <a
              href={`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(
                'Hi Bala! I just visited the About Us page of Kanvi Fotography and would love to discuss photography for our event.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all shadow-xl shadow-[#25D366]/30 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>WHATSAPP BALA DIRECTLY</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
