import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MessageSquare, Mail, Calendar, ArrowRight } from 'lucide-react';
import { STUDIO_INFO, generateWhatsAppBookingUrl } from '../data/studioInfo';

export const MODAL_EVENT_TYPES = [
  // Column 1 / Section 1
  'Engagement',
  'Reception & Wedding',
  'Traditional Hindu Wedding',
  'Corporate Event Photography',
  'Puberty',
  'Interior Infra Photography',

  // Column 2 / Section 2
  'Wedding',
  'Brahmin Type Wedding',
  'South Indian Wedding',
  'Birthday Event',
  'House Warming',
  'Construction Photography',

  // Column 3 / Section 3
  'Reception',
  'Telugu Type Wedding',
  'Pre-Post Wedding Shoot',
  'Baby Shower',
  'Sashtiapthapurthi',
  'Industrial Photography',

  // Additional signature Kanvi Fotography services
  'Candid Photography',
  'Maternity Shoot',
  'Newborn Shoot',
  'Drone & Aerial Shoot',
  'LED Wall & Live Visuals',
];

export default function BookingModal({ isOpen, onClose, preselectedService = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    eventDate: '',
    eventLocation: '',
    additionalDetails: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [preparedUrl, setPreparedUrl] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      setSubmitted(false);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-match preselected service
  useEffect(() => {
    if (preselectedService && isOpen) {
      const normalized = preselectedService.toLowerCase();
      const match = MODAL_EVENT_TYPES.find(
        (t) =>
          normalized.includes(t.toLowerCase()) ||
          t.toLowerCase().includes(normalized)
      );
      if (match) {
        setFormData((prev) => ({ ...prev, eventType: match }));
      } else {
        setFormData((prev) => ({ ...prev, eventType: preselectedService }));
      }
      setSubmitted(false);
    }
  }, [preselectedService, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || !/^[0-9+]{10,14}$/.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit contact number.';
    }

    if (!formData.eventType) {
      errs.eventType = 'Please select your event type.';
    }

    if (!formData.eventDate) {
      errs.eventDate = 'Please select your tentative event date.';
    }

    if (!formData.eventLocation.trim()) {
      errs.eventLocation = 'Please specify the event location or city.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const waUrl = generateWhatsAppBookingUrl(formData);
    setPreparedUrl(waUrl);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Automatically open WhatsApp in a new tab for seamless enquiry delivery
      try {
        window.open(waUrl, '_blank');
      } catch (err) {
        console.error('Could not auto-open WhatsApp link:', err);
      }
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      eventType: 'Wedding',
      eventDate: '',
      eventLocation: '',
      additionalDetails: '',
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-capture-story"
        >
          {/* Translucent Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-[#D4AF77]/30 my-auto z-10 flex flex-col max-h-[92vh] overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-5 sm:p-8">
              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="text-center max-w-xl mx-auto mb-6 pr-6 sm:pr-0">
                    <h2
                      id="modal-capture-story"
                      className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#4A0715] font-semibold tracking-tight leading-snug mb-2"
                    >
                      Let's Capture Your Story
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                      You can draft an email to us on{' '}
                      <a
                        href={`mailto:${STUDIO_INFO.contact.email}`}
                        className="text-[#C8102E] font-medium underline underline-offset-2 hover:text-[#4A0715] transition-colors"
                      >
                        {STUDIO_INFO.contact.email}
                      </a>
                      , or can send us the details by filling the form below.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                        Name <span className="text-[#C8102E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your Full Name"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-all outline-none ${
                          errors.fullName
                            ? 'border-[#C8102E] ring-1 ring-[#C8102E]'
                            : 'border-gray-300 focus:border-[#4A0715] focus:ring-1 focus:ring-[#4A0715]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-[#C8102E] mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email Id Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                        Email Id <span className="text-[#C8102E]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-all outline-none ${
                          errors.email
                            ? 'border-[#C8102E] ring-1 ring-[#C8102E]'
                            : 'border-gray-300 focus:border-[#4A0715] focus:ring-1 focus:ring-[#4A0715]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-[#C8102E] mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Contact Number Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                        Contact Number <span className="text-[#C8102E]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="7397064481"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-all outline-none ${
                          errors.phone
                            ? 'border-[#C8102E] ring-1 ring-[#C8102E]'
                            : 'border-gray-300 focus:border-[#4A0715] focus:ring-1 focus:ring-[#4A0715]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#C8102E] mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Event Type Grid Selection (3 Columns) */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                        Event Type <span className="text-[#C8102E]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 p-3 bg-gray-50/80 rounded-lg border border-gray-200 max-h-56 overflow-y-auto">
                        {MODAL_EVENT_TYPES.map((type) => {
                          const isChecked = formData.eventType === type;
                          return (
                            <label
                              key={type}
                              className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md cursor-pointer text-xs sm:text-[13px] transition-colors ${
                                isChecked
                                  ? 'bg-[#4A0715]/10 text-[#4A0715] font-semibold'
                                  : 'text-gray-700 hover:text-black hover:bg-gray-100/80'
                              }`}
                            >
                              <input
                                type="radio"
                                name="eventType"
                                value={type}
                                checked={isChecked}
                                onChange={() =>
                                  setFormData((prev) => ({ ...prev, eventType: type }))
                                }
                                className="w-3.5 h-3.5 text-[#C8102E] accent-[#C8102E] focus:ring-[#C8102E] cursor-pointer"
                              />
                              <span className="truncate">{type}</span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.eventType && (
                        <p className="text-xs text-[#C8102E] mt-1">{errors.eventType}</p>
                      )}
                    </div>

                    {/* Event Date Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                        Event Date <span className="text-[#C8102E]">*</span>
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 bg-white transition-all outline-none ${
                          errors.eventDate
                            ? 'border-[#C8102E] ring-1 ring-[#C8102E]'
                            : 'border-gray-300 focus:border-[#4A0715] focus:ring-1 focus:ring-[#4A0715]'
                        }`}
                      />
                      {errors.eventDate && (
                        <p className="text-xs text-[#C8102E] mt-1">{errors.eventDate}</p>
                      )}
                    </div>

                    {/* Event Location Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                        Event Location <span className="text-[#C8102E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="eventLocation"
                        value={formData.eventLocation}
                        onChange={handleChange}
                        placeholder="City / Venue (e.g. Woraiyur, Trichy)"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-all outline-none ${
                          errors.eventLocation
                            ? 'border-[#C8102E] ring-1 ring-[#C8102E]'
                            : 'border-gray-300 focus:border-[#4A0715] focus:ring-1 focus:ring-[#4A0715]'
                        }`}
                      />
                      {errors.eventLocation && (
                        <p className="text-xs text-[#C8102E] mt-1">{errors.eventLocation}</p>
                      )}
                    </div>

                    {/* More Details Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                        More Details
                      </label>
                      <textarea
                        name="additionalDetails"
                        rows={3}
                        value={formData.additionalDetails}
                        onChange={handleChange}
                        placeholder="Tell us about the timings, photography requirements, special moments, or vision..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-all outline-none focus:border-[#4A0715] focus:ring-1 focus:ring-[#4A0715] resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-lg bg-[#4A0715] hover:bg-[#630C1E] active:bg-[#2A040C] text-[#FFFDF7] text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 border border-[#D4AF77]/30"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-[#D4AF77] border-t-transparent rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <span>Submit</span>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-gray-900 font-semibold mb-2">
                    Enquiry Prepared Successfully!
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto mb-6">
                    Thank you, <strong className="text-gray-900">{formData.fullName}</strong>.
                    Your enquiry for <strong>{formData.eventType}</strong> on{' '}
                    <strong>{formData.eventDate}</strong> in <strong>{formData.eventLocation}</strong>{' '}
                    is ready to connect directly with Founder Bala.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                    {preparedUrl && (
                      <a
                        href={preparedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 fill-black" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${STUDIO_INFO.contact.email}?subject=${encodeURIComponent(
                        `Booking Enquiry: ${formData.eventType} - ${formData.fullName}`
                      )}&body=${encodeURIComponent(
                        `Name: ${formData.fullName}\nPhone: ${formData.phone}\nEvent: ${formData.eventType}\nDate: ${formData.eventDate}\nLocation: ${formData.eventLocation}\n\nDetails:\n${formData.additionalDetails}`
                      )}`}
                      className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email</span>
                    </a>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-gray-500 hover:text-gray-900 underline transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                    <span className="text-gray-300">•</span>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-xs font-semibold text-[#4A0715] hover:text-[#C8102E] underline transition-colors cursor-pointer"
                    >
                      Done &amp; Close
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
