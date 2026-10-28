import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  MessageCircle,
  FileText,
  Camera,
  Film,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HardDrive,
  Award,
  ChevronDown,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { useIsMobile } from '../utils/useIsMobile';

const DETAILED_STEPS = [
  {
    step: '01',
    title: "Let's Connect & Discover",
    subtitle: 'CONSULTATION & CREATIVE VISION',
    tagline: 'Understanding the sacred heart of your celebration',
    icon: MessageCircle,
    timeline: '2 to 8 Months Prior',
    description:
      'Every wedding carries its own emotional rhythm and sacred heritage. We begin with an unhurried consultation—via phone, WhatsApp, or over freshly brewed South Indian coffee at our Woraiyur studio—to listen to your story, understand your Muhurtham schedule, and outline your visual dreams.',
    keyPoints: [
      'Comprehensive review of ceremony dates, venues, and Muhurtham timings',
      'Discussion of visual aesthetics: classic heritage warmth vs. modern editorial tones',
      'Tailored package options with completely transparent pricing and zero hidden costs',
      'Immediate reservation of your date on Bala’s exclusive studio shooting calendar',
    ],
    deliverables: ['Customized Coverage Proposal', 'Preliminary Ritual Schedule', 'Confirmed Date Guarantee'],
    quote: 'We listen first. Before we frame a single shot, we understand what family traditions matter most to you.',
  },
  {
    step: '02',
    title: 'Plan the Story Architecture',
    subtitle: 'TIMELINE & CREATIVE BRIEF',
    tagline: 'Eliminating stress with precision coordination',
    icon: FileText,
    timeline: '2 to 3 Weeks Prior',
    description:
      'Flawless wedding photography is born from meticulous preparation. We collaborate closely with you to establish a seamless schedule, synchronize with mandapam coordinators, map out golden hour portrait windows, and compile key family shot lists so nothing is left to chance.',
    keyPoints: [
      'Detailed walkthrough of ceremony sequences, from dawn Vratham to evening stage reception',
      'Mandapam lighting & decor assessment to ensure ideal color rendering for bridal silks',
      'Dedicated couple portrait timeline scheduled during the softest natural golden light',
      'Custom family VIP shot list to guarantee grandparents and close relatives are honored',
    ],
    deliverables: ['Master Crew Run Sheet', 'Family Priority Shot Checklist', 'Lighting & Venue Plan'],
    quote: 'When the timeline is planned with care, the bride and groom can simply relax and live the moment.',
  },
  {
    step: '03',
    title: 'The Unobtrusive Coverage',
    subtitle: 'CINEMATIC & CANDID MASTERY',
    tagline: 'Preserving pure emotion with respectful presence',
    icon: Camera,
    timeline: 'The Celebration Day',
    description:
      'On your wedding day, our experienced crew arrives 30 minutes early. We operate with quiet elegance and cultural reverence—blending into the background to capture spontaneous glances, joyful tears, and sacred rituals without interrupting the sanctity of the Mandapam.',
    keyPoints: [
      'Dual-team synergy: dedicated candid specialists paired with traditional ceremony masters',
      'State-of-the-art Sony Cinema FX & Alpha bodies with prime G-Master lenses',
      'Redundant simultaneous dual-card recording for 100% data security from the very first frame',
      'Subtle drone aerial cinematography for grand mandapam entrances and temple architecture',
    ],
    deliverables: ['Candid Micro-Moments', 'Sacred Ritual Documentation', 'Grand Stage Family Portraits'],
    quote: 'True emotion cannot be staged. Our art is anticipating moments a heartbeat before they happen.',
  },
  {
    step: '04',
    title: 'Relive the Memories',
    subtitle: 'CURATION, COLOR & HEIRLOOMS',
    tagline: 'Transforming fleeting seconds into timeless family heirlooms',
    icon: Film,
    timeline: '3-5 Days Preview • 3-4 Weeks Final Delivery',
    description:
      'After the celebrations conclude, our artistic post-production begins. We hand-select the finest images, meticulously color-grade each frame to honor authentic skin tones and radiant Kanjeevaram silks, and bind your visual story into handcrafted leather albums designed to last for generations.',
    keyPoints: [
      'Curated 48-to-72 hour sneak-peek gallery to share immediately with friends and family',
      'Individual fine-art color grading and skin-tone retouching on every selected photograph',
      'Private cloud gallery with PIN protection, high-res downloads, and family sharing links',
      'Luxury handcrafted flush-mount leather albums with archival layflat printing and lifetime warranty',
    ],
    deliverables: ['Sneak-Peek Preview Link', 'Master Color-Graded Collection', 'Handcrafted Archival Album'],
    quote: 'A photograph is not complete until it rests in a physical album that your grandchildren will cherish.',
  },
];

const PROCESS_FAQS = [
  {
    q: 'How early should we start the 4-step process and book our dates?',
    a: 'We recommend booking 4 to 8 months in advance, especially during peak Tamil Muhurtham seasons (Thai, Vaikasi, Avani, and Karthigai). Because Bala and our core senior team personally cover each wedding, we accept a strictly limited number of celebrations each month to preserve boutique quality.',
  },
  {
    q: 'How do you coordinate with mandapam priests and family elders during Muhurtham?',
    a: 'We have years of experience with traditional South Indian weddings across Tamil Nadu. We maintain deep respect for the sacred homam fire, sacred mantras, and priests. Our crew works with long telephoto prime lenses so we capture intimate close-ups of the Thali knot and Metti ritual without blocking the views of family elders.',
  },
  {
    q: 'What equipment and backup measures do you carry on the wedding day?',
    a: 'We bring complete equipment redundancy: multiple full-frame Sony cinema cameras, redundant prime lenses, off-camera lighting, and all cameras record simultaneously to dual memory cards. Immediately after each event, all cards are cloned to dual encrypted on-site drives and backed up to cloud storage.',
  },
  {
    q: 'Can we customize the album design and choose our favorite photos?',
    a: 'Yes, absolutely! Once your private online gallery is ready, you can mark your favorite images directly. We provide a digital album proof for your review and edits before the final heirloom book is sent to our master bookbinders.',
  },
];

export default function ProcessPage({ onBookClick }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile(640);
  const [openFaq, setOpenFaq] = useState(null);

  const handleBookingCTA = () => {
    navigate('/booking');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
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
              src="/assets/web/wedding-temple-handinhand.jpg"
              alt="Kanvi Fotography Traditional South Indian Wedding Process"
              style={{ objectPosition: isMobile ? '65% 36%' : '64% 42%' }}
              className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
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
            <span className="text-white font-semibold">Our 4-Step Process</span>
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
              SIGNATURE PHOTOGRAPHY JOURNEY
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight mb-2 sm:mb-4 max-w-4xl"
          >
            Our 4-Step Signature Journey
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-base md:text-lg text-[#F7F9FC]/90 font-light max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-8"
          >
            From our initial consultation to holding your handcrafted leather heirloom album, our thoughtful 4-step workflow guarantees complete peace of mind, transparent collaboration, and timeless visual artistry.
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
              <span>Begin Your Journey</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(
                'Hi Kanvi Fotography! I would like to know more about your 4-step wedding photography journey.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-md border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Overview Quick Roadmap Bar */}
      <section id="step-roadmap" className="bg-[#0B1638] text-white border-y border-[#D9DEE8]/20 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {DETAILED_STEPS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0787F9]/70 transition-all hover:bg-white/10 group shadow-sm"
                >
                  <div className="h-11 w-11 rounded-xl bg-[#163BC7] border border-[#0787F9]/40 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                    <span className="font-serif text-base font-bold">{s.step}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#0787F9] font-semibold mb-0.5 line-clamp-1">
                      {idx === 3 ? '3-5 Days Preview • 3-4 Wks' : s.timeline}
                    </div>
                    <div className="text-sm font-serif font-medium text-white leading-snug group-hover:text-[#F7F9FC] transition-colors">
                      {s.title}
                    </div>
                  </div>
                  <div className="sm:hidden text-white/40 group-hover:text-[#0787F9] transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Detailed 4-Step Breakdown */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163BC7]/10 border border-[#163BC7]/20 text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-3 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#0787F9]" />
            <span>Step-by-Step Walkthrough</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal tracking-tight mb-4">
            How We Document Your Sacred Story
          </h2>
          <p className="text-[#555B68] text-sm sm:text-base font-light leading-relaxed">
            Every celebration receives the highest standard of artistic care, data security, and cultural reverence. Here is what happens at each stage of your partnership with Kanvi Fotography.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {DETAILED_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`p-5 sm:p-8 lg:p-12 rounded-3xl bg-[#F7F9FC] border border-[#D9DEE8] shadow-sm relative overflow-hidden flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-6 sm:gap-8 lg:gap-12 items-center`}
              >
                {/* Visual / Left Side */}
                <div className="w-full lg:w-5/12 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-5xl sm:text-6xl font-light text-[#163BC7]">
                      {step.step}
                    </span>
                    <div className="h-12 w-12 rounded-2xl bg-[#163BC7] text-white border border-[#163BC7] flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#163BC7] mb-1">
                    {step.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal mb-3">
                    {step.title}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D9DEE8] text-xs font-semibold text-[#555B68] mb-6 w-fit shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-[#163BC7]" />
                    <span>Timeline: {step.timeline}</span>
                  </div>

                  {/* Philosophy Quote */}
                  <div className="p-4 rounded-xl bg-white border-l-4 border-[#163BC7] text-xs sm:text-sm font-serif italic text-[#555B68] shadow-xs">
                    "{step.quote}"
                  </div>
                </div>

                {/* Details / Right Side */}
                <div className="w-full lg:w-7/12 space-y-6">
                  <p className="text-[#555B68] text-sm sm:text-base leading-relaxed font-light">
                    {step.description}
                  </p>

                  {/* Key Execution Points */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#111111]">
                      Key Objectives &amp; Focus:
                    </h4>
                    <div className="space-y-2">
                      {step.keyPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#555B68]">
                          <CheckCircle2 className="w-4 h-4 text-[#163BC7] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables Box */}
                  <div className="pt-4 border-t border-[#D9DEE8]">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-[#163BC7] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0787F9]" />
                      <span>Stage Deliverables:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((item, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-3 py-1 rounded-lg bg-white border border-[#D9DEE8] text-xs font-medium text-[#111111] shadow-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Equipment & Standards Guarantees */}
      <section className="py-16 sm:py-24 bg-[#0B1638] text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs tracking-[0.25em] uppercase text-[#0787F9] font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0787F9]" />
              <span>Uncompromising Quality</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-3">
              The Kanvi Standards of Excellence
            </h2>
            <p className="text-[#D9DEE8] text-xs sm:text-sm font-light">
              We hold every ceremony to rigorous standards of professionalism, technical mastery, and data security.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0787F9] transition-colors">
              <HardDrive className="w-7 h-7 text-[#0787F9] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-white mb-2">Dual-Slot Redundancy</h3>
              <p className="text-xs text-[#D9DEE8] leading-relaxed font-light">
                All camera bodies record simultaneously to dual memory cards. Immediate on-site backup prevents any risk of card corruption.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0787F9] transition-colors">
              <Camera className="w-7 h-7 text-[#0787F9] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-white mb-2">Sony Cinema Optics</h3>
              <p className="text-xs text-[#D9DEE8] leading-relaxed font-light">
                Full-frame high-resolution sensors and prime G-Master lenses deliver rich 10-bit color, buttery bokeh, and extreme low-light clarity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0787F9] transition-colors">
              <Clock className="w-7 h-7 text-[#0787F9] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-white mb-2">Punctual &amp; Prepared</h3>
              <p className="text-xs text-[#D9DEE8] leading-relaxed font-light">
                Our crew arrives 30 minutes before schedule to test lighting, scout angles, and calibrate equipment before the first ritual begins.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0787F9] transition-colors">
              <Award className="w-7 h-7 text-[#0787F9] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-white mb-2">Lifetime Heirloom Binding</h3>
              <p className="text-xs text-[#D9DEE8] leading-relaxed font-light">
                Our physical flush-mount albums use archival Fuji Crystal paper and Italian leather covers, backed by a lifetime binding warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions Accordion */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163BC7]/10 border border-[#163BC7]/20 text-xs tracking-[0.25em] uppercase text-[#163BC7] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0787F9]" />
            <span>Clear Answers</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal mb-3">
            Questions About Our Process
          </h2>
          <p className="text-[#555B68] text-sm font-light">
            Everything you need to know about planning, booking, and receiving your wedding collection.
          </p>
        </div>

        <div className="space-y-4">
          {PROCESS_FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#D9DEE8] bg-[#F7F9FC] overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#111111] font-medium">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#163BC7] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#0787F9]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-[#555B68] text-xs sm:text-sm leading-relaxed font-light border-t border-[#D9DEE8]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Bottom Final Booking CTA */}
      <section className="py-16 sm:py-24 bg-[#F7F9FC] border-t border-[#D9DEE8] px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-14 w-14 rounded-full bg-[#163BC7] text-white flex items-center justify-center mx-auto shadow-md">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-[#555B68] text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Reserve your wedding or celebration date with Kanvi Fotography. Experience warm guidance, bespoke planning, and cinematic excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleBookingCTA}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#163BC7] hover:bg-[#0B1638] text-white font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#163BC7]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#163BC7]"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Reserve Your Date (Book Now)</span>
            </button>
            <Link
              to="/client-perspectives"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-[#F7F9FC] text-[#163BC7] font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 border border-[#163BC7] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Read Client Perspectives</span>
              <ArrowRight className="w-4 h-4 text-[#163BC7]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
