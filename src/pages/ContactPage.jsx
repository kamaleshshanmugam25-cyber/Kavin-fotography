import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Navigation,
} from 'lucide-react';
import { STUDIO_INFO, generateWhatsAppBookingUrl } from '../data/studioInfo';
import { useIsMobile } from '../utils/useIsMobile';

const CONTACT_EVENT_TYPES = [
  'Wedding',
  'Reception',
  'Engagement',
  'Candid Photography',
  'Pre-Wedding Shoot',
  'Post-Wedding Shoot',
  'Birthday',
  'Baby Shower',
  'Maternity Shoot',
  'Modeling Shoot',
  'Corporate Shoot',
  'Live Streaming',
  'LED Wall',
  'Selfie Booth',
  'Other',
];

const FAQS = [
  {
    question: 'How early should we book our wedding photography?',
    answer:
      'We recommend booking 4 to 8 months in advance, especially during prime wedding seasons and auspicious Muhurtham dates in Tamil Nadu, as dates are reserved on a first-confirmed basis.',
  },
  {
    question: 'Do you travel outside Tiruchirappalli and across India?',
    answer:
      'Yes, absolutely! While our home studio is located in Woraiyur, Trichy, our team travels across all districts of Tamil Nadu and to destination wedding venues all over India.',
  },
  {
    question: 'How and when will we receive our final photographs?',
    answer:
      'You receive a curated sneak-peek highlights gallery within 3-5 days. The complete set of professionally color-graded, high-resolution photographs is delivered via an online private gallery and archival pen drive within 3-4 weeks.',
  },
  {
    question: 'Can we customize our photography package?',
    answer:
      'Yes! We tailor every coverage package to your exact event timeline—whether it is a half-day temple ceremony, an evening reception, or a multi-day celebration combining candid coverage, traditional mandapam portraits, and pre-wedding shoots.',
  },
];

export default function ContactPage() {
  const isMobile = useIsMobile(640);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: 'Wedding',
    eventDate: '',
    eventLocation: '',
    additionalDetails: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [preparedUrl, setPreparedUrl] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name.';
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your mobile number.';
    } else if (!/^[0-9+\s-]{10,14}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.eventDate) errs.eventDate = 'Please select your event date.';
    if (!formData.eventLocation.trim()) errs.eventLocation = 'Please provide the event city or location.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const whatsappUrl = generateWhatsAppBookingUrl({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      eventLocation: formData.eventLocation,
      notes: formData.additionalDetails,
    });

    setPreparedUrl(whatsappUrl);
    setSubmissionSuccess(true);
    setIsSubmitting(false);

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#1A1A1A] selection:bg-[#C8102E] selection:text-white">
      {/* 1. Cinematic Hero Banner */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] w-full flex flex-col justify-end sm:justify-center items-center overflow-hidden bg-[#2A040C]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 7, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src="/assets/web/wedding-temple-steps.jpg"
              alt="Kanvi Fotography Traditional South Indian Wedding"
              style={{ objectPosition: isMobile ? '50% 40%' : '50% 36%' }}
              className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
              loading="eager"
            />
          </motion.div>

          {/* Gradients matching website theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A040C] via-[#2A040C]/50 via-65% to-transparent sm:to-[#2A040C]/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[250px] sm:h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,119,0.15),_transparent_70%)] rounded-full pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:py-32 text-center flex flex-col items-center justify-end sm:justify-center mt-auto sm:mt-0 w-full">
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
            <span className="text-[#FFFDF7] font-semibold">Contact &amp; Studio</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#4A0715]/80 border border-[#D4AF77]/40 backdrop-blur-md mb-2 sm:mb-4 shadow-xl"
          >
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#D4AF77] shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#F3E9DC] whitespace-nowrap">
              RESERVATIONS &amp; STUDIO ENQUIRIES
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.18] sm:leading-[1.15] mb-2 sm:mb-4 max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            <span className="block mb-1 sm:mb-1.5 text-white">
              Let's Begin Your Story.
            </span>
            <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF7] via-[#F3E9DC] to-[#D4AF77]">
              Connect With Kanvi Fotography.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-base md:text-xl text-[#FFFDF7] font-light max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-8 px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            Reach out directly to Founder Bala for availability, custom wedding packages, or a warm conversation at our Woraiyur studio.
          </motion.p>
        </div>
      </section>

      {/* 2. Direct Contact Channels Grid */}
      <section className="py-16 sm:py-24 bg-[#FFFDF7] border-b border-[#D4AF77]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <a
              href={`tel:${STUDIO_INFO.contact.phone}`}
              className="p-6 rounded-3xl bg-white border border-[#D4AF77]/30 hover:border-[#C8102E] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#F3E9DC] text-[#4A0715] flex items-center justify-center group-hover:bg-[#C8102E] group-hover:text-white transition-colors mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Direct Call</div>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mt-1 group-hover:text-[#C8102E] transition-colors">
                  {STUDIO_INFO.contact.phoneDisplay}
                </h3>
              </div>
              <p className="text-xs text-gray-600 mt-3 font-light">
                Call Founder Bala directly for instant date queries.
              </p>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(
                'Hi Bala! I would like to enquire about photography coverage for our upcoming event.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-white border border-[#D4AF77]/30 hover:border-[#25D366] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">WhatsApp Chat</div>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mt-1 group-hover:text-[#25D366] transition-colors">
                  {STUDIO_INFO.contact.whatsappDisplay}
                </h3>
              </div>
              <p className="text-xs text-gray-600 mt-3 font-light">
                Quick response on package details &amp; sample galleries.
              </p>
            </a>

            {/* Location */}
            <div className="p-6 rounded-3xl bg-white border border-[#D4AF77]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#F3E9DC] text-[#4A0715] flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Studio Base</div>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mt-1">
                  {STUDIO_INFO.location.address}
                </h3>
              </div>
              <p className="text-xs text-gray-600 mt-3 font-light">
                {STUDIO_INFO.location.state}, India • Pan-India Travel.
              </p>
            </div>

            {/* Hours */}
            <div className="p-6 rounded-3xl bg-white border border-[#D4AF77]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#F3E9DC] text-[#4A0715] flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Consultation Hours</div>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mt-1">
                  9:00 AM – 9:00 PM
                </h3>
              </div>
              <p className="text-xs text-gray-600 mt-3 font-light">
                Available all 7 days by prior appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Full Booking Form Section */}
      <section className="py-20 sm:py-32 bg-[#F3E9DC]/40 border-b border-[#D4AF77]/20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#4A0715] font-semibold mb-4 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF77]" />
              <span>Event Date Reservation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-normal tracking-tight mb-4">
              Send Your Booking Enquiry
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
              Fill in your event details below to instantly prepare a structured enquiry directly for Founder Bala.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#D4AF77]/35 shadow-xl">
            <AnimatePresence mode="wait">
              {submissionSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
                    Enquiry Prepared Successfully!
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base font-light leading-relaxed">
                    WhatsApp has opened with your formatted event details. If the chat window did not open automatically, click below:
                  </p>
                  <a
                    href={preparedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm tracking-[0.15em] uppercase shadow-lg shadow-[#25D366]/30 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-black" />
                    <span>Open WhatsApp Chat Directly</span>
                  </a>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmissionSuccess(false)}
                      className="text-xs text-gray-500 underline hover:text-[#4A0715]"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Balaji & Priya"
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#FFFDF7] border ${
                          errors.fullName ? 'border-red-500' : 'border-[#D4AF77]/40 focus:border-[#C8102E]'
                        } text-gray-900 text-sm focus:outline-none transition-colors`}
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        WhatsApp Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#FFFDF7] border ${
                          errors.phone ? 'border-red-500' : 'border-[#D4AF77]/40 focus:border-[#C8102E]'
                        } text-gray-900 text-sm focus:outline-none transition-colors`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Email & Event Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. info@example.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF7] border border-[#D4AF77]/40 focus:border-[#C8102E] text-gray-900 text-sm focus:outline-none transition-colors"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Event Category *
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF7] border border-[#D4AF77]/40 focus:border-[#C8102E] text-gray-900 text-sm focus:outline-none transition-colors"
                      >
                        {CONTACT_EVENT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#FFFDF7] border ${
                          errors.eventDate ? 'border-red-500' : 'border-[#D4AF77]/40 focus:border-[#C8102E]'
                        } text-gray-900 text-sm focus:outline-none transition-colors`}
                      />
                      {errors.eventDate && <p className="text-xs text-red-500 mt-1">{errors.eventDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Venue / City *
                      </label>
                      <input
                        type="text"
                        name="eventLocation"
                        value={formData.eventLocation}
                        onChange={handleChange}
                        placeholder="e.g. Woraiyur, Trichy or Chennai"
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#FFFDF7] border ${
                          errors.eventLocation ? 'border-red-500' : 'border-[#D4AF77]/40 focus:border-[#C8102E]'
                        } text-gray-900 text-sm focus:outline-none transition-colors`}
                      />
                      {errors.eventLocation && <p className="text-xs text-red-500 mt-1">{errors.eventLocation}</p>}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Additional Details &amp; Custom Requirements
                    </label>
                    <textarea
                      name="additionalDetails"
                      rows={4}
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      placeholder="Tell us about the number of guests, traditional rituals, timing, or any specific requests..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF7] border border-[#D4AF77]/40 focus:border-[#C8102E] text-gray-900 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] disabled:opacity-50 text-[#2A040C] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all shadow-xl shadow-[#D4AF77]/30 hover:shadow-[#D4AF77]/50 flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF77]"
                  >
                    <Send className="w-4 h-4 text-[#2A040C]" />
                    <span>SUBMIT ENQUIRY VIA WHATSAPP</span>
                  </button>

                  <p className="text-xs text-center text-gray-500 font-light">
                    Your details are securely formatted and sent directly to studio phone{' '}
                    <strong className="text-gray-900 font-medium">7397064481</strong>.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) Accordion */}
      <section className="py-20 sm:py-32 bg-[#FFFDF7] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3E9DC] border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#4A0715] font-semibold mb-4 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-[#D4AF77]" />
              <span>Questions &amp; Answers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-normal tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-light">
              Clear answers to common questions about booking, travel, and photo delivery.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#D4AF77]/30 bg-white overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif text-lg text-gray-900 cursor-pointer hover:bg-[#F3E9DC]/30 transition-colors"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#D4AF77] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#C8102E]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed font-light border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
