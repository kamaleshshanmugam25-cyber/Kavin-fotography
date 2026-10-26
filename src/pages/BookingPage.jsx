import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  MessageSquare,
  Phone,
  Sparkles,
  ShieldCheck,
  Award,
  Camera,
  Heart,
  Send,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Info,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { useIsMobile } from '../utils/useIsMobile';

export const EVENT_CATEGORIES = [
  {
    id: 'muhurtham-wedding',
    name: 'Traditional Muhurtham & Wedding',
    tag: 'Sacred Rituals',
    icon: Heart,
    description: 'Nadaswaram, Kanjeevaram silk portraits, Thali tying, and sacred rituals.',
  },
  {
    id: 'grand-reception',
    name: 'Grand Reception & Sangeet',
    tag: 'Evening Glamour',
    icon: Sparkles,
    description: 'Stage lighting, royal couple portraits, VIP guests, and celebratory joy.',
  },
  {
    id: 'engagement',
    name: 'Engagement & Nichayathartham',
    tag: 'Ring Ceremony',
    icon: Award,
    description: 'Exchange of rings, close family blessings, and editorial couple portraits.',
  },
  {
    id: 'outdoor-prewedding',
    name: 'Outdoor Pre / Post Wedding Shoot',
    tag: 'Scenic Romance',
    icon: Camera,
    description: 'Scenic hilltops, golden beaches, temple courtyards, and natural chemistry.',
  },
  {
    id: 'maternity-baby',
    name: 'Maternity & Baby Shower (Valaikappu)',
    tag: 'Motherhood Glow',
    icon: Heart,
    description: 'Traditional glass bangle ceremonies, mother glow, and heirloom moments.',
  },
  {
    id: 'candid-editorial',
    name: 'Candid & Editorial Portrait Session',
    tag: 'Pure Emotion',
    icon: Camera,
    description: 'Unscripted laughter, authentic glances, and contemporary fashion aesthetics.',
  },
];

export const TIME_SLOTS = [
  { id: 'morning', label: 'Morning Ceremony (Dawn – 12:00 PM)', badge: 'Muhurtham' },
  { id: 'evening', label: 'Evening Reception (04:00 PM – 11:00 PM)', badge: 'Reception' },
  { id: 'fullday', label: 'Full-Day Extensive (12+ Hours)', badge: 'Comprehensive' },
  { id: 'multiday', label: 'Multi-Day Celebration (2–3 Days)', badge: 'Grand Trilogy' },
];

export const GUEST_RANGES = [
  { id: 'intimate', label: 'Intimate (< 200 Guests)', desc: 'Close family & friends' },
  { id: 'traditional', label: 'Traditional (200 – 800 Guests)', desc: 'Standard mandapam gathering' },
  { id: 'royal', label: 'Royal Scale (800+ Guests)', desc: 'Extensive multi-hall coverage' },
];

export const COVERAGE_ADDONS = [
  { id: 'candid-highlights', label: 'Candid Couple & Emotional Highlights' },
  { id: 'mandapam-stage', label: 'Traditional Mandapam & Stage Family Portraits' },
  { id: 'makeover-haldi', label: 'Bridal Makeover & Haldi Ceremony Session' },
  { id: 'outdoor-golden', label: 'Outdoor Golden-Hour Sunset Editorial' },
  { id: 'drone-aerial', label: 'Drone & Aerial Architectural Perspectives' },
  { id: 'luxury-album', label: 'Handcrafted Luxury Archival Story Album' },
];

export default function BookingPage() {
  const isMobile = useIsMobile(640);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventCategory: 'Traditional Muhurtham & Wedding',
    eventDate: '',
    timeSlot: 'Morning Ceremony (Dawn – 12:00 PM)',
    eventVenue: '',
    eventCity: 'Tiruchirappalli',
    guestCount: 'Traditional (200 – 800 Guests)',
    selectedAddons: [
      'Candid Couple & Emotional Highlights',
      'Traditional Mandapam & Stage Family Portraits',
    ],
    visionNotes: '',
  });

  useEffect(() => {
    const passed = location.state?.service || searchParams.get('service');
    if (passed) {
      const match = EVENT_CATEGORIES.find(
        (c) =>
          c.name.toLowerCase().includes(passed.toLowerCase()) ||
          passed.toLowerCase().includes(c.name.toLowerCase()) ||
          c.tag.toLowerCase().includes(passed.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({ ...prev, eventCategory: match.name }));
      }
    }
  }, [location.state, searchParams]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const toggleAddon = (addonLabel) => {
    setFormData((prev) => {
      const exists = prev.selectedAddons.includes(addonLabel);
      if (exists) {
        return { ...prev, selectedAddons: prev.selectedAddons.filter((a) => a !== addonLabel) };
      } else {
        return { ...prev, selectedAddons: [...prev.selectedAddons, addonLabel] };
      }
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || !/^[0-9+]{10,14}$/.test(cleanPhone)) {
      errs.phone = 'Please provide a valid 10-digit mobile / WhatsApp number.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.eventDate) {
      errs.eventDate = 'Please select your planned event date.';
    }

    if (!formData.eventVenue.trim()) {
      errs.eventVenue = 'Please specify the mandapam, hall, or venue name.';
    }

    if (!formData.eventCity.trim()) {
      errs.eventCity = 'Please specify the city or location (e.g. Trichy, Chennai).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const buildWhatsAppMessage = (data = formData) => {
    const cleanPhone = STUDIO_INFO.contact.whatsapp.replace(/\D/g, '');
    const targetNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

    const addonsText = data.selectedAddons.length > 0
      ? data.selectedAddons.map((a) => `  • ${a}`).join('\n')
      : '  • Standard Core Photography';

    const message = `*NEW EVENT RESERVATION REQUEST - KANVI FOTOGRAPHY*
----------------------------------------
*Client Name:* ${data.fullName || 'Not specified'}
*Mobile / WhatsApp:* ${data.phone || 'Not specified'}
*Email:* ${data.email || 'Not provided'}

*EVENT DETAILS:*
*Category:* ${data.eventCategory}
*Date:* ${data.eventDate || 'Pending confirmation'}
*Timing / Slot:* ${data.timeSlot}
*Venue:* ${data.eventVenue || 'To be finalized'}
*City / District:* ${data.eventCity}
*Guest Scale:* ${data.guestCount}

*DESIRED COVERAGE & ADD-ONS:*
${addonsText}

*VISION & SPECIAL TRADITIONS:*
${data.visionNotes ? data.visionNotes : 'None specified — please provide tailored package options.'}
----------------------------------------
_Initiated via Kanvi Fotography Date Reservation Desk_`;

    return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppDirectSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const url = buildWhatsAppMessage(formData);
    window.open(url, '_blank');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#1A1A1A] selection:bg-[#C8102E] selection:text-white">
      {/* 1. Opulent Hero Banner */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] w-full flex flex-col justify-end sm:justify-center items-center overflow-hidden bg-[#2A040C]">
        {/* Background Image with Ambient Glow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 7, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src="/assets/web/wedding-temple-handinhand.jpg"
              alt="Kanvi Fotography Wedding Event Reservation"
              style={{ objectPosition: isMobile ? '65% 25%' : 'center 25%' }}
              className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.05]"
              loading="eager"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#2A040C] via-[#2A040C]/65 via-50% to-transparent sm:to-[#2A040C]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[300px] sm:h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,119,0.18),_transparent_70%)] pointer-events-none rounded-full" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:py-28 text-center flex flex-col items-center justify-end sm:justify-center mt-auto sm:mt-0 w-full">
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
            <span className="text-[#FFFDF7] font-semibold">Reserve Your Date</span>
          </motion.div>

          {/* Established Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#4A0715]/90 border border-[#D4AF77]/40 mb-2 sm:mb-4 shadow-xl"
          >
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#D4AF77] shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#F3E9DC] whitespace-nowrap">
              DATE LOCK RESERVATIONS • SOLE WEDDING BOOKING PER DATE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFFDF7] font-normal tracking-tight leading-[1.12] mb-3 sm:mb-4"
          >
            Reserve Your Sacred Date
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF7] via-[#F3E9DC] to-[#D4AF77]">
              With Kanvi Fotography
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-base md:text-lg text-[#FFFDF7]/90 font-light max-w-2xl mx-auto leading-relaxed px-2"
          >
            We accept only one premier wedding per calendar date to ensure undivided founder attention
            and master-grade craftsmanship. Tell us your date and venue below.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Reservation Experience Container */}
      <section className="py-16 sm:py-24 bg-[#FFFDF7] relative overflow-hidden">
        {/* Subtle Ambient Vignette */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(212,175,119,0.1),_transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(243,233,220,0.5),_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatePresence mode="wait">
            {submittedData ? (
              /* Success / Reservation Confirmation State */
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#D4AF77]/50 shadow-2xl p-6 sm:p-12 text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2A040C] border-2 border-[#D4AF77] flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF77]" />
                </div>

                <span className="text-xs uppercase tracking-[0.25em] text-[#C8102E] font-bold">
                  RESERVATION REQUEST REGISTERED
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-normal mt-2 mb-4">
                  Thank You, {submittedData.fullName}!
                </h2>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-light">
                  We have captured your preliminary event reservation for{' '}
                  <strong className="text-gray-900 font-semibold">{submittedData.eventCategory}</strong> on{' '}
                  <strong className="text-gray-900 font-semibold">{submittedData.eventDate}</strong> at{' '}
                  <strong className="text-gray-900 font-semibold">{submittedData.eventVenue}, {submittedData.eventCity}</strong>.
                </p>

                {/* Summary Card */}
                <div className="bg-[#F3E9DC]/40 rounded-2xl p-5 sm:p-6 border border-[#D4AF77]/30 text-left max-w-lg mx-auto mb-8 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-[#D4AF77]/20">
                    <span className="text-gray-500 font-medium">Timing / Slot:</span>
                    <span className="text-gray-900 font-semibold">{submittedData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#D4AF77]/20">
                    <span className="text-gray-500 font-medium">Guest Scale:</span>
                    <span className="text-gray-900 font-semibold">{submittedData.guestCount}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#D4AF77]/20">
                    <span className="text-gray-500 font-medium">Contact Phone:</span>
                    <span className="text-gray-900 font-semibold">{submittedData.phone}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-gray-500 font-medium block mb-1">Selected Add-ons:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {submittedData.selectedAddons.map((addon) => (
                        <span
                          key={addon}
                          className="px-2.5 py-0.5 rounded-full bg-[#2A040C] text-[#D4AF77] text-[10px] font-semibold"
                        >
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <a
                    href={buildWhatsAppMessage(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-black" />
                    <span>Send via WhatsApp to Founder Bala</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedData(null)}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all"
                  >
                    Modify / New Reservation
                  </button>
                </div>
              </motion.div>
            ) : (
              /* The Interactive Multi-Section Booking Form */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Form Area (8 Cols) */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-[#D4AF77]/35 shadow-xl p-6 sm:p-10">
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-10">
                    {/* SECTION 1: Event Type Selector */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#4A0715] text-[#D4AF77] text-xs font-bold flex items-center justify-center">
                          1
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 font-normal">
                          Select Your Celebration Type
                        </h2>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm font-light mb-5">
                        Choose the primary ceremony or milestone we will be documenting.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {EVENT_CATEGORIES.map((cat) => {
                          const isSelected = formData.eventCategory === cat.name;
                          const IconComp = cat.icon;

                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, eventCategory: cat.name }))}
                              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-[#2A040C] text-[#FFFDF7] border-[#D4AF77] shadow-lg ring-2 ring-[#D4AF77]/40'
                                  : 'bg-[#FFFDF7] hover:bg-[#F3E9DC]/40 border-[#D4AF77]/25 text-gray-800'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                    isSelected
                                      ? 'bg-[#D4AF77] text-[#2A040C]'
                                      : 'bg-[#F3E9DC] text-[#4A0715]'
                                  }`}
                                >
                                  {cat.tag}
                                </span>
                                <IconComp
                                  className={`w-4 h-4 ${
                                    isSelected ? 'text-[#D4AF77]' : 'text-gray-400'
                                  }`}
                                />
                              </div>
                              <h3 className="font-serif text-base sm:text-lg font-medium leading-snug mb-1">
                                {cat.name}
                              </h3>
                              <p
                                className={`text-[11px] leading-relaxed font-light ${
                                  isSelected ? 'text-[#F3E9DC]/80' : 'text-gray-500'
                                }`}
                              >
                                {cat.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECTION 2: Date, Timing & Venue */}
                    <div className="border-t border-[#D4AF77]/20 pt-8">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#4A0715] text-[#D4AF77] text-xs font-bold flex items-center justify-center">
                          2
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 font-normal">
                          Event Date, Timing &amp; Venue
                        </h2>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm font-light mb-5">
                        Tell us when and where your celebration unfolds.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Event Date */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                            Event Date <span className="text-[#C8102E]">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="eventDate"
                              value={formData.eventDate}
                              onChange={handleChange}
                              min={new Date().toISOString().split('T')[0]}
                              className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                errors.eventDate
                                  ? 'border-[#C8102E] focus:ring-[#C8102E]/30'
                                  : 'border-[#D4AF77]/40 focus:border-[#D4AF77] focus:ring-[#D4AF77]/20'
                              }`}
                            />
                            <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                          {errors.eventDate && (
                            <p className="text-[11px] text-[#C8102E] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.eventDate}</span>
                            </p>
                          )}
                        </div>

                        {/* City / District */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                            City / District <span className="text-[#C8102E]">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="eventCity"
                              value={formData.eventCity}
                              onChange={handleChange}
                              placeholder="e.g. Tiruchirappalli, Chennai, Madurai"
                              className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                errors.eventCity
                                  ? 'border-[#C8102E] focus:ring-[#C8102E]/30'
                                  : 'border-[#D4AF77]/40 focus:border-[#D4AF77] focus:ring-[#D4AF77]/20'
                              }`}
                            />
                            <MapPin className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                          {errors.eventCity && (
                            <p className="text-[11px] text-[#C8102E] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.eventCity}</span>
                            </p>
                          )}
                        </div>

                        {/* Venue / Mandapam Name */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                            Mandapam / Hall / Venue Name <span className="text-[#C8102E]">*</span>
                          </label>
                          <input
                            type="text"
                            name="eventVenue"
                            value={formData.eventVenue}
                            onChange={handleChange}
                            placeholder="e.g. Srirangam Ranga Mandapam, Woraiyur Kalyana Mahal, Resort Lawn..."
                            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                              errors.eventVenue
                                ? 'border-[#C8102E] focus:ring-[#C8102E]/30'
                                : 'border-[#D4AF77]/40 focus:border-[#D4AF77] focus:ring-[#D4AF77]/20'
                            }`}
                          />
                          {errors.eventVenue && (
                            <p className="text-[11px] text-[#C8102E] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.eventVenue}</span>
                            </p>
                          )}
                        </div>

                        {/* Time Slot Picker */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                            Ceremony Timing &amp; Duration
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {TIME_SLOTS.map((slot) => {
                              const isChecked = formData.timeSlot === slot.label;
                              return (
                                <button
                                  key={slot.id}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot.label }))}
                                  className={`px-3.5 py-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                                    isChecked
                                      ? 'bg-[#4A0715] text-[#FFFDF7] border-[#D4AF77] font-semibold'
                                      : 'bg-[#FFFDF7] hover:bg-gray-50 border-gray-200 text-gray-700'
                                  }`}
                                >
                                  <span>{slot.label}</span>
                                  <span
                                    className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
                                      isChecked
                                        ? 'bg-[#D4AF77] text-[#2A040C]'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                                  >
                                    {slot.badge}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Guest Scale Range */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                            Estimated Guest Scale
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {GUEST_RANGES.map((range) => {
                              const isChecked = formData.guestCount === range.label;
                              return (
                                <button
                                  key={range.id}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, guestCount: range.label }))}
                                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                    isChecked
                                      ? 'bg-[#2A040C] text-[#FFFDF7] border-[#D4AF77] font-semibold'
                                      : 'bg-[#FFFDF7] hover:bg-gray-50 border-gray-200 text-gray-700'
                                  }`}
                                >
                                  <div className="font-semibold">{range.label}</div>
                                  <div
                                    className={`text-[10px] font-light mt-0.5 ${
                                      isChecked ? 'text-[#F3E9DC]/80' : 'text-gray-500'
                                    }`}
                                  >
                                    {range.desc}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Coverage Wishlist & Add-ons */}
                    <div className="border-t border-[#D4AF77]/20 pt-8">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#4A0715] text-[#D4AF77] text-xs font-bold flex items-center justify-center">
                          3
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 font-normal">
                          Coverage Wishlist &amp; Add-ons
                        </h2>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm font-light mb-4">
                        Select every element you would like us to include in your proposal.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {COVERAGE_ADDONS.map((addon) => {
                          const isChecked = formData.selectedAddons.includes(addon.label);
                          return (
                            <button
                              key={addon.id}
                              type="button"
                              onClick={() => toggleAddon(addon.label)}
                              className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                                isChecked
                                  ? 'bg-[#F3E9DC]/70 border-[#D4AF77] text-gray-900 font-medium shadow-sm'
                                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                                  isChecked
                                    ? 'bg-[#4A0715] border-[#4A0715] text-[#D4AF77]'
                                    : 'border-gray-300 bg-white'
                                }`}
                              >
                                {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                              <span className="leading-snug">{addon.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECTION 4: Contact & Personal Details */}
                    <div className="border-t border-[#D4AF77]/20 pt-8">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#4A0715] text-[#D4AF77] text-xs font-bold flex items-center justify-center">
                          4
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 font-normal">
                          Your Contact Information
                        </h2>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm font-light mb-5">
                        We send your detailed proposal, rate card, and date confirmation to these details.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                            Your Full Name <span className="text-[#C8102E]">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Anandha Kumar / Priya R"
                            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                              errors.fullName
                                ? 'border-[#C8102E] focus:ring-[#C8102E]/30'
                                : 'border-[#D4AF77]/40 focus:border-[#D4AF77] focus:ring-[#D4AF77]/20'
                            }`}
                          />
                          {errors.fullName && (
                            <p className="text-[11px] text-[#C8102E] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.fullName}</span>
                            </p>
                          )}
                        </div>

                        {/* WhatsApp / Mobile */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                            WhatsApp / Mobile Number <span className="text-[#C8102E]">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 98765 43210"
                              className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                errors.phone
                                  ? 'border-[#C8102E] focus:ring-[#C8102E]/30'
                                  : 'border-[#D4AF77]/40 focus:border-[#D4AF77] focus:ring-[#D4AF77]/20'
                              }`}
                            />
                            <Phone className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                          {errors.phone && (
                            <p className="text-[11px] text-[#C8102E] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.phone}</span>
                            </p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. name@example.com (for digital rate cards)"
                            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                              errors.email
                                ? 'border-[#C8102E] focus:ring-[#C8102E]/30'
                                : 'border-[#D4AF77]/40 focus:border-[#D4AF77] focus:ring-[#D4AF77]/20'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-[11px] text-[#C8102E] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.email}</span>
                            </p>
                          )}
                        </div>

                        {/* Special Traditions / Vision */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                            Special Traditions, Vision or Specific Requests
                          </label>
                          <textarea
                            name="visionNotes"
                            rows={3}
                            value={formData.visionNotes}
                            onChange={handleChange}
                            placeholder="Share any special Muhurtham timings, specific family rituals, dress color codes, or preferred photo styles..."
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF77]/40 focus:border-[#D4AF77] focus:ring-2 focus:ring-[#D4AF77]/20 text-sm text-gray-900 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dual Action Submit Buttons */}
                    <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                      {/* 1. Instant WhatsApp Direct */}
                      <button
                        type="button"
                        onClick={handleWhatsAppDirectSubmit}
                        className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 fill-black" />
                        <span>Instant WhatsApp Reservation</span>
                      </button>

                      {/* 2. On-Page Registration */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[#2A040C] hover:bg-[#4A0715] text-[#D4AF77] hover:text-[#FFFDF7] border border-[#D4AF77]/50 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Verifying Schedule...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Reservation Form</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-500 text-center font-light">
                      🔒 Your date is reserved upon founder confirmation. We respect your privacy and never share your details.
                    </p>
                  </form>
                </div>

                {/* Right Sticky Summary Sidebar (4 Cols) */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                  {/* Real-time Reservation Summary Card */}
                  <div className="bg-[#2A040C] text-[#FFFDF7] rounded-3xl p-6 sm:p-7 border border-[#D4AF77]/40 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D4AF77]/30">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF77]" />
                        <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF77] font-bold">
                          RESERVATION BRIEF
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF77]/20 text-[#D4AF77] font-mono">
                        LIVE
                      </span>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <div className="text-[10px] uppercase text-[#D4AF77] font-semibold">Event Type</div>
                        <div className="text-sm font-serif font-medium text-white mt-0.5">
                          {formData.eventCategory}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <div className="text-[10px] uppercase text-[#D4AF77] font-semibold">Date</div>
                          <div className="text-xs font-medium text-white mt-0.5">
                            {formData.eventDate || 'Select Date'}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-[#D4AF77] font-semibold">City</div>
                          <div className="text-xs font-medium text-white mt-0.5">
                            {formData.eventCity}
                          </div>
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="text-[10px] uppercase text-[#D4AF77] font-semibold">Venue / Mandapam</div>
                        <div className="text-xs font-light text-white/90 mt-0.5">
                          {formData.eventVenue || 'Specify hall name'}
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="text-[10px] uppercase text-[#D4AF77] font-semibold mb-1">
                          Coverage Inclusions ({formData.selectedAddons.length})
                        </div>
                        <ul className="space-y-1">
                          {formData.selectedAddons.map((addon) => (
                            <li key={addon} className="flex items-center gap-1.5 text-[11px] text-[#F3E9DC]/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF77]" />
                              <span>{addon}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#D4AF77]/30 flex items-center justify-between text-[11px]">
                      <span className="text-[#F3E9DC]/70">Studio Lead:</span>
                      <span className="text-[#D4AF77] font-semibold">Bala ({STUDIO_INFO.contact.phoneDisplay})</span>
                    </div>
                  </div>

                  {/* Trust & Guarantee Cards */}
                  <div className="bg-[#F3E9DC]/50 rounded-2xl p-5 border border-[#D4AF77]/30 space-y-3.5 text-xs text-gray-700">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 text-xs">Sole Wedding Policy</div>
                        <div className="text-[11px] text-gray-600 font-light leading-relaxed">
                          We never double-book dates. When you book Kanvi Fotography, you get our full team.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#D4AF77] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 text-xs">Fast Sneak-Peek Delivery</div>
                        <div className="text-[11px] text-gray-600 font-light leading-relaxed">
                          25–50 curated color-graded highlight portraits delivered in 3 to 5 days.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 text-xs">Pan-India Availability</div>
                        <div className="text-[11px] text-gray-600 font-light leading-relaxed">
                          Rooted in Woraiyur, Trichy. Ready to travel anywhere in Tamil Nadu and India.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct Phone Calling Hotline */}
                  <div className="bg-white rounded-2xl p-5 border border-[#D4AF77]/30 shadow-md text-center">
                    <p className="text-xs text-gray-500 font-light mb-1">Have an urgent date question?</p>
                    <a
                      href={`tel:${STUDIO_INFO.contact.phone}`}
                      className="font-serif text-lg font-bold text-[#4A0715] hover:text-[#C8102E] transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-[#D4AF77]" />
                      <span>{STUDIO_INFO.contact.phoneDisplay}</span>
                    </a>
                    <span className="text-[10px] text-gray-400 block mt-1">Available 09:00 AM – 09:30 PM Daily</span>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
