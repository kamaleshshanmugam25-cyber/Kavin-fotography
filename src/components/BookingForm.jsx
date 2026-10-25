import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Compass,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { STUDIO_INFO, generateWhatsAppBookingUrl } from '../data/studioInfo';

const EVENT_TYPES = [
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

export default function BookingForm({ preselectedService }) {
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

  // Auto-update eventType when user clicks "Enquire" on a service card
  useEffect(() => {
    if (preselectedService) {
      const match = EVENT_TYPES.find(
        (t) => t.toLowerCase() === preselectedService.toLowerCase() ||
               preselectedService.toLowerCase().includes(t.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({ ...prev, eventType: match }));
      } else {
        setFormData((prev) => ({ ...prev, eventType: preselectedService }));
      }
      setSubmissionSuccess(false);
    }
  }, [preselectedService]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || !/^[0-9+]{10,14}$/.test(cleanPhone)) {
      errs.phone = 'Please enter a valid phone number (10 digits).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.eventType) {
      errs.eventType = 'Please select your event type.';
    }

    if (!formData.eventDate) {
      errs.eventDate = 'Please select your tentative event date.';
    }

    if (!formData.eventLocation.trim()) {
      errs.eventLocation = 'Please provide the city or venue location.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const waUrl = generateWhatsAppBookingUrl(formData);
    setPreparedUrl(waUrl);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      window.open(waUrl, '_blank');
    }, 400);
  };

  const handleReset = () => {
    setSubmissionSuccess(false);
    setPreparedUrl('');
  };

  return (
    <section id="booking" className="relative py-28 sm:py-36 bg-[#FFFDF7] border-t border-[#D4AF77]/25">
      {/* Anchor for #contact link */}
      <div id="contact" className="absolute -top-20 left-0" />

      {/* Background Subtle Warm Beige Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF77]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F3E9DC]/60 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Smooth Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3E9DC] border border-[#D4AF77]/40 text-xs tracking-[0.25em] uppercase text-[#4A0715] font-semibold mb-4 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF77]" />
            <span>Reservations &amp; Enquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-normal tracking-tight mb-6">
            Let's Make Your Next Moment Unforgettable
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
            Every celebration begins with a friendly conversation. Complete the form below to
            instantly prepare your bespoke enquiry for Founder Bala and the Kanvi Fotography team.
          </p>
        </motion.div>

        {/* Dual Column: Direct Contact (Pure White / Warm Beige) & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Studio Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-[#F3E9DC]/70 border border-[#D4AF77]/35 shadow-md space-y-6">
              <h3 className="font-serif text-2xl text-gray-900 font-normal">
                Direct Studio Contacts
              </h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Feel free to call, email, or message us directly on WhatsApp. We provide prompt responses
                regarding dates, packages, and custom event coverage.
              </p>

              {/* Contact Channels */}
              <div className="space-y-4 pt-2">
                {/* Phone */}
                <a
                  href={`tel:${STUDIO_INFO.contact.phone}`}
                  className="p-4 rounded-2xl bg-white hover:bg-[#FFFDF7] border border-[#D4AF77]/30 hover:border-[#C8102E]/40 transition-all flex items-center gap-4 group shadow-sm"
                >
                  <div className="h-11 w-11 rounded-xl bg-[#F3E9DC] border border-[#D4AF77]/40 flex items-center justify-center text-[#4A0715] group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-wider uppercase text-gray-500 font-medium">
                      Call Studio
                    </div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-[#C8102E] transition-colors">
                      {STUDIO_INFO.contact.phoneDisplay}
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/91${STUDIO_INFO.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white hover:bg-[#FFFDF7] border border-[#D4AF77]/30 hover:border-[#25D366]/40 transition-all flex items-center gap-4 group shadow-sm"
                >
                  <div className="h-11 w-11 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-wider uppercase text-gray-500 font-medium">
                      WhatsApp Quick Chat
                    </div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-[#25D366] transition-colors">
                      {STUDIO_INFO.contact.whatsappDisplay}
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${STUDIO_INFO.contact.email}`}
                  className="p-4 rounded-2xl bg-white hover:bg-[#FFFDF7] border border-[#D4AF77]/30 hover:border-[#C8102E]/40 transition-all flex items-center gap-4 group shadow-sm"
                >
                  <div className="h-11 w-11 rounded-xl bg-[#F3E9DC] border border-[#D4AF77]/40 flex items-center justify-center text-[#4A0715] group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-wider uppercase text-gray-500 font-medium">
                      Email Inquiries
                    </div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-[#C8102E] transition-colors break-all">
                      {STUDIO_INFO.contact.email}
                    </div>
                  </div>
                </a>

                {/* Studio Location */}
                <div className="p-4 rounded-2xl bg-white border border-[#D4AF77]/30 flex items-center gap-4 shadow-sm">
                  <div className="h-11 w-11 rounded-xl bg-[#F3E9DC] border border-[#D4AF77]/40 flex items-center justify-center text-[#4A0715]">
                    <MapPin className="w-5 h-5 text-[#C8102E]" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-wider uppercase text-gray-500 font-medium">
                      Studio Location
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {STUDIO_INFO.location.fullAddress}
                    </div>
                  </div>
                </div>

                {/* Service Coverage Area */}
                <div className="p-4 rounded-2xl bg-white border border-[#D4AF77]/30 flex items-center gap-4 shadow-sm">
                  <div className="h-11 w-11 rounded-xl bg-[#F3E9DC] border border-[#D4AF77]/40 flex items-center justify-center text-[#4A0715]">
                    <Compass className="w-5 h-5 text-[#C8102E]" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-wider uppercase text-gray-500 font-medium">
                      Service Coverage
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {STUDIO_INFO.location.serviceArea}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Booking Form with Pure White Background (#FFFFFF) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#D4AF77]/35 shadow-xl relative">
              <AnimatePresence mode="wait">
                {submissionSuccess ? (
                  /* Success State with Clear WhatsApp Dispatch Instructions */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-10 text-center space-y-6"
                  >
                    <div className="h-16 w-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mx-auto shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl sm:text-3xl text-gray-900 font-normal">
                        Enquiry Prepared Successfully!
                      </h3>
                      <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                        Your event details for <strong className="text-gray-900 font-semibold">{formData.eventType}</strong> on{' '}
                        <strong className="text-gray-900 font-semibold">{formData.eventDate}</strong> have been compiled into a ready-to-send WhatsApp message.
                      </p>
                    </div>

                    {/* Prominent WhatsApp Dispatch Callout */}
                    <div className="p-5 rounded-2xl bg-[#F3E9DC]/60 border border-[#D4AF77]/40 text-left max-w-md mx-auto space-y-3">
                      <div className="flex items-start gap-2 text-xs text-gray-800">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C8102E]" />
                        <span>
                          Please note: This website does not store enquiries in a private database.
                          You must click the button below to send your prepared enquiry to Kanvi Fotography via WhatsApp at{' '}
                          <strong className="text-gray-900">7397064481</strong> to finalize your booking request.
                        </span>
                      </div>

                      <a
                        href={preparedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 fill-black" />
                        <span>Send Prepared WhatsApp Message</span>
                      </a>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs text-gray-500 hover:text-[#C8102E] underline underline-offset-4 transition-colors cursor-pointer"
                      >
                        ← Edit or Submit Another Enquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Booking Enquiry Input Form with Staggered Entrance */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-serif text-2xl text-gray-900 font-normal mb-1">
                        Reserve Your Date
                      </h3>
                      <p className="text-xs text-gray-500 font-light">
                        Fill in your event details below to instantly connect with our studio.
                      </p>
                    </div>

                    {/* Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Senthil Kumar"
                          className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border ${
                            errors.fullName ? 'border-red-500' : 'border-[#D4AF77]/40 focus:border-[#C8102E]'
                          } text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-colors`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
                        >
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 9876543210"
                          className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border ${
                            errors.phone ? 'border-red-500' : 'border-[#D4AF77]/40 focus:border-[#C8102E]'
                          } text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-colors`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Email & Event Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. senthil@gmail.com"
                          className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border ${
                            errors.email ? 'border-red-500' : 'border-[#D4AF77]/40 focus:border-[#C8102E]'
                          } text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-colors`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="eventType"
                          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
                        >
                          Event Type *
                        </label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border border-[#D4AF77]/40 text-gray-900 text-sm focus:outline-none focus:border-[#C8102E] focus:bg-white transition-colors"
                        >
                          {EVENT_TYPES.map((type) => (
                            <option key={type} value={type} className="bg-white text-gray-900">
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.eventType && (
                          <p className="text-[11px] text-red-600 mt-1">{errors.eventType}</p>
                        )}
                      </div>
                    </div>

                    {/* Event Date & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="eventDate"
                          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
                        >
                          Event Date *
                        </label>
                        <input
                          type="date"
                          id="eventDate"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border ${
                            errors.eventDate ? 'border-red-500' : 'border-[#D4AF77]/40 focus:border-[#C8102E]'
                          } text-gray-900 text-sm focus:outline-none focus:bg-white transition-colors`}
                        />
                        {errors.eventDate && (
                          <p className="text-[11px] text-red-600 mt-1">{errors.eventDate}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="eventLocation"
                          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
                        >
                          Event Location / City *
                        </label>
                        <input
                          type="text"
                          id="eventLocation"
                          name="eventLocation"
                          value={formData.eventLocation}
                          onChange={handleChange}
                          placeholder="e.g. Woraiyur, Trichy or Chennai"
                          className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border ${
                            errors.eventLocation ? 'border-red-500' : 'border-[#D4AF77]/40 focus:border-[#C8102E]'
                          } text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-colors`}
                        />
                        {errors.eventLocation && (
                          <p className="text-[11px] text-red-600 mt-1">{errors.eventLocation}</p>
                        )}
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <label
                        htmlFor="additionalDetails"
                        className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
                      >
                        Additional Details / Requirements
                      </label>
                      <textarea
                        id="additionalDetails"
                        name="additionalDetails"
                        rows={3}
                        value={formData.additionalDetails}
                        onChange={handleChange}
                        placeholder="Tell us about your expected guest count, timing, candid style preferences, drone or LED wall requests..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border border-[#D4AF77]/40 focus:border-[#C8102E] text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-[#D4AF77] hover:bg-[#C29B63] disabled:opacity-50 text-[#2A040C] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-lg shadow-[#D4AF77]/30 hover:shadow-[#D4AF77]/50 border border-[#D4AF77] flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Preparing Enquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#2A040C]" />
                          <span>SEND BOOKING ENQUIRY VIA WHATSAPP</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-gray-500 text-center font-light">
                      Submitting prepares a comprehensive WhatsApp message directly to studio phone{' '}
                      <span className="text-gray-900 font-semibold">7397064481</span>.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
