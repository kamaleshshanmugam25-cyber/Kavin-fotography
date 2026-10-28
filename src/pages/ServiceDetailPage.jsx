import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Clock,
  ShieldCheck,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { STUDIO_INFO } from '../data/studioInfo';
import { smoothScrollTo } from '../utils/scroll';
import { getFocalPoint } from '../utils/imageFocalPoints';
import { useIsMobile } from '../utils/useIsMobile';

export default function ServiceDetailPage({ onBookService }) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile(640);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Find the requested service by id
  const currentService =
    SERVICES.find(
      (s) =>
        s.id === serviceId ||
        s.title.toLowerCase().replace(/[\s&()]/g, '-') === serviceId
    ) || SERVICES[0];

  // Related other services (excluding current)
  const relatedServices = SERVICES.filter((s) => s.id !== currentService.id).slice(0, 4);

  const photos =
    currentService.gallery && currentService.gallery.length > 0
      ? currentService.gallery
      : [currentService.image];

  // Handle escape key for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activePhotoIndex !== null) {
        setActivePhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleBookClick = () => {
    navigate('/booking', { state: { service: currentService.title } });
  };

  const handleWhatsAppChat = () => {
    const text = `Hi Kanvi Fotography! I am viewing your *${currentService.title}* page and would like to enquire about availability and packages for my event.`;
    window.open(
      `https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const scrollToGallery = () => {
    smoothScrollTo('#gallery', 76);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#163BC7] selection:text-white">
      {/* 1. Cinematic Hero Banner */}
      <section className="relative min-h-[100svh] min-h-screen w-full flex flex-col justify-end sm:justify-center items-center overflow-hidden bg-[#0B1638]">
        {/* Background Image with Slow Subtle Motion */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 7, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src={currentService.heroImage || currentService.image}
              alt={currentService.alt || currentService.title}
              style={{
                objectPosition: isMobile
                  ? (currentService.mobileObjectPosition || getFocalPoint(currentService.heroImage || currentService.image, true))
                  : (currentService.heroObjectPosition || currentService.objectPosition || getFocalPoint(currentService.heroImage || currentService.image, false)),
              }}
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
            <Link to="/#services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-semibold">{currentService.title}</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0B1638]/80 border border-[#D9DEE8]/30 backdrop-blur-md mb-2 sm:mb-4 shadow-xl"
          >
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#0787F9] shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#F7F9FC] whitespace-nowrap">
              {currentService.category.toUpperCase()} • {currentService.tag.toUpperCase()}
            </span>
          </motion.div>

          {/* Brand Signature */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mb-1 sm:mb-3"
          >
            <h2 className="text-xs sm:text-base tracking-[0.25em] sm:tracking-[0.35em] uppercase font-semibold text-[#0787F9]">
              KANVI FOTOGRAPHY SIGNATURE
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
              {currentService.title}
            </span>
            <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F7F9FC] to-[#0787F9]">
              {currentService.tag}
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-base md:text-xl text-[#F7F9FC] font-light max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-8 px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            {currentService.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0 mb-4 sm:mb-0"
          >
            <button
              type="button"
              onClick={handleBookClick}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#163BC7] hover:bg-[#0B1638] text-white text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#163BC7]/30 hover:shadow-[#163BC7]/50 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer border border-[#163BC7]"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>BOOK THIS SERVICE</span>
            </button>

            <button
              type="button"
              onClick={scrollToGallery}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white hover:bg-[#F7F9FC] text-[#163BC7] text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer border border-[#163BC7] group"
            >
              <Camera className="w-4 h-4 text-[#163BC7] group-hover:scale-110 transition-all duration-200" />
              <span>VIEW {photos.length} PHOTOGRAPHS</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Service Storytelling & Feature Inclusions */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#D9DEE8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-px bg-[#163BC7]" />
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#163BC7]">
                  The Kanvi Fotography Signature
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-tight leading-tight">
                Behind the Lens of Every <br />
                <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#163BC7] to-[#0787F9]">
                  {currentService.title}
                </span>
              </h2>

              <p className="text-[#555B68] text-base sm:text-lg leading-relaxed font-light">
                At Kanvi Fotography, we treat your <strong>{currentService.title}</strong> not as a routine shoot,
                but as a once-in-a-lifetime fine-art narrative. From delicate lighting setups to spontaneous candid
                interactions and sacred rituals, Founder Bala personally directs each session to bring out genuine
                emotions, vivid colors, and timeless beauty.
              </p>

              <p className="text-[#555B68] text-sm sm:text-base leading-relaxed font-light">
                Whether hosted at grand halls in Trichy, Chennai, Coimbatore, or destination venues across India,
                our state-of-the-art camera systems, prime lenses, and editorial color calibration ensure every image
                remains an heirloom piece for generations.
              </p>

              {/* What's Included Feature Cards */}
              <div className="pt-4 border-t border-[#D9DEE8]">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#163BC7] mb-3">
                  Key Inclusions &amp; Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9DEE8] flex items-center gap-3 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#163BC7] shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-[#111111]">{feat}</span>
                    </div>
                  ))}
                  <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9DEE8] flex items-center gap-3 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#163BC7] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-[#111111]">
                      High-Resolution Master Cloud Gallery
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9DEE8] flex items-center gap-3 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#163BC7] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-[#111111]">
                      Pan-India Travel &amp; On-Site Production
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Studio Profile & Quick Specs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D9DEE8]">
                <img
                  src={photos[1] || currentService.image}
                  alt={`${currentService.title} featured portrait`}
                  style={{ objectPosition: currentService.objectPosition || 'center 15%' }}
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1638]/85 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#0787F9] font-semibold mb-1">
                      Editorial Excellence
                    </p>
                    <p className="font-serif italic text-lg sm:text-xl">
                      "Every sacred ritual deserves to be preserved in fine-art mastery."
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#D9DEE8] space-y-3 shadow-sm">
                <div className="flex items-center gap-3 text-xs text-[#555B68]">
                  <Camera className="w-4 h-4 text-[#163BC7]" />
                  <span>
                    <strong className="text-[#111111]">Lead Visionary:</strong> {STUDIO_INFO.founder} (Lead Photographer)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#555B68]">
                  <MapPin className="w-4 h-4 text-[#163BC7]" />
                  <span>
                    <strong className="text-[#111111]">Studio Base:</strong> {STUDIO_INFO.location.address} • Pan-India Coverage
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#555B68]">
                  <Clock className="w-4 h-4 text-[#163BC7]" />
                  <span>
                    <strong className="text-[#111111]">Turnaround:</strong> Curated Preview within 72 hrs
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#555B68]">
                  <ShieldCheck className="w-4 h-4 text-[#163BC7]" />
                  <span>
                    <strong className="text-[#111111]">Booking Deposit:</strong> Dates confirmed upon reservation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full Curated Photo Gallery Showcase */}
      <section id="gallery" className="py-24 sm:py-32 bg-[#F7F9FC] border-b border-[#D9DEE8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163BC7]/10 border border-[#163BC7]/20 text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-4 shadow-sm">
              <Camera className="w-3.5 h-3.5 text-[#0787F9]" />
              <span>Full Photo Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-tight mb-4">
              Curated {currentService.title} Photographs
            </h2>
            <p className="text-[#555B68] text-sm sm:text-base font-light leading-relaxed">
              Explore the authentic emotion, sacred rituals, and fine-art framing preserved by Kanvi Fotography.
              Click any photo to view in high resolution.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((imgUrl, idx) => {
              const isWide = idx === 0 || idx === 3;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`group relative rounded-2xl overflow-hidden bg-black/60 cursor-pointer shadow-sm border border-[#D9DEE8] hover:border-[#163BC7]/60 hover:shadow-2xl transition-all ${
                    isWide ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${currentService.title} photograph ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 filter brightness-[0.93]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <div className="flex items-center justify-between w-full text-white text-xs">
                      <span className="font-serif italic tracking-wide text-sm">
                        {currentService.title} • Frame {idx + 1}
                      </span>
                      <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wider">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Direct CTA Below Gallery */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-[#D9DEE8] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#111111] font-semibold mb-1">
                Loving these {currentService.title} frames?
              </h3>
              <p className="text-xs sm:text-sm text-[#555B68] font-light">
                Lock your wedding or event dates with Bala to guarantee bespoke coverage.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleWhatsAppChat}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-[#25D366] text-[#111111] hover:bg-[#25D366]/10 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={handleBookClick}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#163BC7] hover:bg-[#0B1638] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 border border-[#163BC7]"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>BOOK THIS SERVICE</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Explore Other Services Grid */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#D9DEE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#163BC7]">
                More Specialties
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#111111] font-normal mt-1">
                Explore Other Photography Services
              </h2>
            </div>
            <Link
              to="/#services"
              className="text-xs uppercase tracking-wider font-bold text-[#163BC7] hover:text-[#0B1638] flex items-center gap-1 transition-colors"
            >
              <span>All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((relService) => (
              <div
                key={relService.id}
                onClick={() => navigate(`/services/${relService.id}`)}
                className="group rounded-xl overflow-hidden bg-white border border-[#D9DEE8] hover:border-[#163BC7]/50 transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={relService.image}
                    alt={relService.title}
                    style={{ objectPosition: relService.objectPosition || 'center 15%' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#0B1638] text-[10px] text-white font-medium uppercase tracking-wider">
                    {relService.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-[#111111] font-semibold group-hover:text-[#163BC7] transition-colors mb-1">
                    {relService.title}
                  </h3>
                  <p className="text-xs text-[#555B68] line-clamp-2 font-light mb-3">
                    {relService.description}
                  </p>
                  <span className="text-xs font-semibold text-[#163BC7] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Photos &amp; Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Direct Reservation CTA Banner */}
      <section className="py-20 sm:py-24 bg-[#0B1638] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#163BC7]/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs tracking-[0.25em] uppercase text-[#0787F9] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preserve Your Memories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white">
            Ready to Capture Your {currentService.title}?
          </h2>
          <p className="text-[#D9DEE8] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Dates for prime wedding muhurtham and auspicious months fill up quickly.
            Reach out today to discuss custom packages, dates, and destination travel.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleBookClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#163BC7] hover:bg-[#0787F9] text-white text-sm font-bold tracking-wider uppercase transition-all shadow-xl shadow-[#163BC7]/30 hover:shadow-[#0787F9]/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border border-[#163BC7]"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>BOOK YOUR EVENT NOW</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppChat}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>DIRECT WHATSAPP CHAT</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Fullscreen Single Photo Lightbox Overlay */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#0B1638]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Lightbox Bar */}
            <div className="w-full flex items-center justify-between z-20">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wider">
                {currentService.title} • Frame {activePhotoIndex + 1} of {photos.length}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(null);
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Enlarged Image */}
            <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center my-auto">
              <motion.img
                key={activePhotoIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                src={photos[activePhotoIndex]}
                alt={`${currentService.title} frame ${activePhotoIndex + 1}`}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Navigation Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0B1638]/80 hover:bg-[#163BC7] text-white transition-colors cursor-pointer border border-white/20"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0B1638]/80 hover:bg-[#163BC7] text-white transition-colors cursor-pointer border border-white/20"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom CTA in Lightbox */}
            <div className="z-20 flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(null);
                  handleBookClick();
                }}
                className="px-6 py-2.5 rounded-full bg-[#163BC7] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0787F9] transition-colors shadow-lg cursor-pointer"
              >
                Enquire for {currentService.title}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
