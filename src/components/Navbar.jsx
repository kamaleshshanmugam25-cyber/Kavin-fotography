import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Sparkles, Images, Calendar, ArrowRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { smoothScrollTo } from '../utils/scroll';

export const WEDDINGS_MENU = [
  { id: 'makeover-portrait', title: 'Makeover Portrait', subtitle: 'Bridal Beauty & Haldi' },
  { id: 'engagement-photography', title: 'Engagement', subtitle: 'Ring Ceremony & Portraits' },
  { id: 'reception-portrait', title: 'Reception Portrait', subtitle: 'Evening Stage & Glamour' },
  { id: 'wedding-rituals', title: 'Wedding Rituals', subtitle: 'Sacred Muhurtham & Thali' },
  { id: 'wedding-portrait', title: 'Wedding Portrait', subtitle: 'Traditional Silk Editorial' },
  { id: 'christian-wedding', title: 'Christian Wedding', subtitle: 'White Gown & Church Vows' },
  { id: 'muslim-wedding', title: 'Muslim Wedding', subtitle: 'Nikah Vows & Walima' },
];

export const OUTDOOR_MENU = [
  { id: 'pre-wedding-photoshoots', title: 'Pre-Wedding Shoot', subtitle: 'Scenic Destination Love' },
  { id: 'candid-photography', title: 'Candid Photography', subtitle: 'Unscripted Emotional Joy' },
  { id: 'maternity-photoshoots', title: 'Maternity Photoshoots', subtitle: 'Artistic Motherhood Glow' },
  { id: 'baby-shower-photography', title: 'Baby Shower (Valaikappu)', subtitle: 'Traditional Bangle Rituals' },
  { id: 'newborn-baby-photoshoots', title: 'Newborn Baby Shoot', subtitle: 'Cozy Little Miracles' },
  { id: 'wedding-videography', title: 'Cinematic Films & Teasers', subtitle: '4K Ultra HD Cinema Reels' },
  { id: 'drone-photography-videography', title: 'Drone Aerial Visuals', subtitle: 'Epic Grand Venue Sweeps' },
  { id: '360-degree-video-booth', title: '360° Video Booth', subtitle: 'Interactive Spinning Platform' },
];

export default function Navbar({ onBookClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null); // 'weddings' | 'outdoor' | null
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null); // 'weddings' | 'outdoor' | null
  const dropdownTimeoutRef = useRef(null);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (desktopDropdown) setDesktopDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, desktopDropdown]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    setDesktopDropdown(null);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    if (isHomePage) {
      smoothScrollTo(href, 84);
    } else {
      const cleanHash = href.startsWith('#') ? href : `#${href}`;
      navigate(`/${cleanHash}`);
    }
  };

  const handleServiceSelect = (serviceId) => {
    setDesktopDropdown(null);
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    navigate(`/services/${serviceId}`);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isHomePage) {
      handleNavClick('#hero');
    } else {
      navigate('/');
    }
  };

  const handleBookingCTA = () => {
    setMobileMenuOpen(false);
    setDesktopDropdown(null);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    if (onBookClick) {
      onBookClick();
    } else {
      handleNavClick('#booking');
    }
  };

  const handleMouseEnter = (menuKey) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDesktopDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 180);
  };

  return (
    <>
      {/* Floating Pill Navbar (Responsive for 360px mobile to 4K ultra-wide) */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-2.5 sm:top-5 inset-x-0 mx-auto w-[92%] sm:w-[94%] max-w-5xl xl:max-w-6xl z-[70] pointer-events-auto"
      >
        <div className="bg-[#E7E2D8]/95 backdrop-blur-md border border-[#D4AF77]/40 rounded-full px-3 sm:px-5 py-1.5 sm:py-2.5 shadow-xl shadow-black/15 flex items-center justify-between gap-2 sm:gap-3 text-gray-900 transition-all duration-300">
          {/* Brand Logo & Studio Name (Left) */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#D4AF77] rounded-full p-0.5 shrink-0"
            aria-label="Kanvi Fotography Home"
          >
            <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full overflow-hidden bg-white/90 border border-[#D4AF77]/40 flex items-center justify-center p-0.5 shadow-sm shrink-0 group-hover:border-[#C8102E] transition-colors">
              <img
                src={STUDIO_INFO.assets.logoMark}
                alt="Kanvi Fotography Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = STUDIO_INFO.assets.logoOriginal;
                }}
              />
            </div>
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="font-serif tracking-[0.12em] sm:tracking-[0.14em] text-sm sm:text-lg font-bold text-[#2A040C] group-hover:text-[#C8102E] transition-colors whitespace-nowrap leading-none">
                KANVI
              </span>
              <span className="text-[10px] tracking-[0.2em] font-medium text-[#7A5826] uppercase whitespace-nowrap leading-none hidden md:inline">
                FOTOGRAPHY
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Center - Clean Title Case Pill Links) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] xl:text-sm font-medium text-gray-800" aria-label="Main Navigation">
            {/* Home */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="px-3 py-1.5 rounded-full hover:bg-black/5 hover:text-black transition-all whitespace-nowrap cursor-pointer"
            >
              Home
            </a>

            {/* About */}
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#about');
              }}
              className="px-3 py-1.5 rounded-full hover:bg-black/5 hover:text-black transition-all whitespace-nowrap cursor-pointer"
            >
              About
            </a>

            {/* Weddings Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('weddings')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleNavClick('#services')}
                className="px-3 py-1.5 rounded-full hover:bg-black/5 hover:text-black transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
                aria-expanded={desktopDropdown === 'weddings'}
              >
                <span>Weddings</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 shrink-0 ${
                    desktopDropdown === 'weddings' ? 'rotate-180 text-black' : ''
                  }`}
                />
              </button>

              {/* Weddings Floating Sub-menu Card */}
              <AnimatePresence>
                {desktopDropdown === 'weddings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#D4AF77]/35 py-2.5 z-50 overflow-hidden"
                  >
                    <div className="px-3.5 py-1 mb-1 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C8102E]">
                        Wedding Specialties
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF77]" />
                    </div>
                    {WEDDINGS_MENU.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleServiceSelect(item.id)}
                        className="w-full text-left px-3.5 py-2 hover:bg-[#F3E9DC]/60 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-gray-900 group-hover:text-[#4A0715]">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-gray-500 font-light">
                            {item.subtitle}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF77] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Outdoor Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('outdoor')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleNavClick('#services')}
                className="px-3 py-1.5 rounded-full hover:bg-black/5 hover:text-black transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
                aria-expanded={desktopDropdown === 'outdoor'}
              >
                <span>Outdoor</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 shrink-0 ${
                    desktopDropdown === 'outdoor' ? 'rotate-180 text-black' : ''
                  }`}
                />
              </button>

              {/* Outdoor Floating Sub-menu Card */}
              <AnimatePresence>
                {desktopDropdown === 'outdoor' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-68 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#D4AF77]/35 py-2.5 z-50 overflow-hidden"
                  >
                    <div className="px-3.5 py-1 mb-1 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C8102E]">
                        Outdoor &amp; Celebrations
                      </span>
                      <Images className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    {OUTDOOR_MENU.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleServiceSelect(item.id)}
                        className="w-full text-left px-3.5 py-2 hover:bg-[#F3E9DC]/60 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-gray-900 group-hover:text-[#4A0715]">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-gray-500 font-light">
                            {item.subtitle}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF77] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Films Link */}
            <a
              href="#films"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#films');
              }}
              className="px-3 py-1.5 rounded-full hover:bg-black/5 hover:text-black transition-all whitespace-nowrap cursor-pointer"
            >
              Films
            </a>

            {/* Contact Link */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="px-3 py-1.5 rounded-full hover:bg-black/5 hover:text-black transition-all whitespace-nowrap cursor-pointer"
            >
              Contact
            </a>
          </nav>

          {/* Right Section: Compact on mobile, spacious on desktop */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* CTA Button: Compact "Book" on mobile, "Book Your Event" on sm+ */}
            <button
              type="button"
              onClick={handleBookingCTA}
              className="bg-white hover:bg-white/90 text-gray-900 font-semibold text-xs sm:text-[13px] px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm hover:shadow-md flex items-center gap-1.5 sm:gap-2.5 border border-black/5 hover:border-[#D4AF77]/40 transition-all duration-200 cursor-pointer group shrink-0 active:scale-[0.98]"
              title="Book your wedding or celebration with Kanvi Fotography"
            >
              {/* Circular Avatar / Brand Icon with Active Green Online Indicator */}
              <div className="relative w-5 h-5 sm:w-7 sm:h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-[#D4AF77]/50 bg-[#2A040C] flex items-center justify-center p-0.5">
                <img
                  src={STUDIO_INFO.assets.logoMark}
                  alt="Kanvi Fotography Booking Desk"
                  className="w-full h-full object-contain"
                />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full ring-1.5 ring-white" />
              </div>
              <span className="hidden sm:inline whitespace-nowrap">Book Your Event</span>
              <span className="sm:hidden text-[11px] font-bold whitespace-nowrap">Book</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-1.5 sm:p-2 rounded-full text-gray-800 transition-colors cursor-pointer border border-black/10 flex items-center justify-center active:scale-95 ${
                mobileMenuOpen ? 'bg-black/10 text-black' : 'hover:bg-black/5'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Backdrop & Floating Card Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay: closes on outside tap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[65]"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden fixed top-[60px] sm:top-[74px] inset-x-3.5 sm:inset-x-6 mx-auto max-w-lg bg-[#E7E2D8]/98 backdrop-blur-2xl rounded-3xl border border-[#D4AF77]/40 shadow-2xl p-5 z-[70] max-h-[82vh] overflow-y-auto"
              style={{ overscrollBehavior: 'contain' }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex flex-col space-y-1.5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7A5826] px-3 pb-1">
                  Navigation &amp; Services
                </div>

                {/* Home */}
                <button
                  type="button"
                  onClick={() => handleNavClick('#hero')}
                  className="text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-black/5 transition-colors flex items-center justify-between text-left cursor-pointer text-gray-900"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-[#7A5826]" />
                </button>

                {/* About */}
                <button
                  type="button"
                  onClick={() => handleNavClick('#about')}
                  className="text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-black/5 transition-colors flex items-center justify-between text-left cursor-pointer text-gray-900"
                >
                  <span>About Founder &amp; Vision</span>
                  <ArrowRight className="w-4 h-4 text-[#7A5826]" />
                </button>

                {/* Weddings Accordion */}
                <div className="rounded-xl border border-[#D4AF77]/30 overflow-hidden bg-white/40">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'weddings' ? null : 'weddings'
                      )
                    }
                    className="w-full text-base font-serif tracking-wide px-3.5 py-2.5 transition-colors flex items-center justify-between text-left cursor-pointer text-gray-900"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C8102E]" />
                      <span>Weddings ({WEDDINGS_MENU.length} Services)</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                        mobileExpandedSection === 'weddings' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileExpandedSection === 'weddings' && (
                    <div className="p-2 space-y-1 bg-white/80 border-t border-[#D4AF77]/20">
                      {WEDDINGS_MENU.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleServiceSelect(item.id)}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between hover:bg-[#F3E9DC]/60 transition-colors text-gray-800 cursor-pointer"
                        >
                          <div>
                            <div className="font-semibold text-gray-900">{item.title}</div>
                            <div className="text-[10px] text-gray-500 font-light">{item.subtitle}</div>
                          </div>
                          <Images className="w-3.5 h-3.5 text-[#D4AF77] shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Outdoor Accordion */}
                <div className="rounded-xl border border-[#D4AF77]/30 overflow-hidden bg-white/40">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'outdoor' ? null : 'outdoor'
                      )
                    }
                    className="w-full text-base font-serif tracking-wide px-3.5 py-2.5 transition-colors flex items-center justify-between text-left cursor-pointer text-gray-900"
                  >
                    <span className="flex items-center gap-2">
                      <Images className="w-4 h-4 text-[#C8102E]" />
                      <span>Outdoor &amp; Celebrations</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                        mobileExpandedSection === 'outdoor' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileExpandedSection === 'outdoor' && (
                    <div className="p-2 space-y-1 bg-white/80 border-t border-[#D4AF77]/20">
                      {OUTDOOR_MENU.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleServiceSelect(item.id)}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between hover:bg-[#F3E9DC]/60 transition-colors text-gray-800 cursor-pointer"
                        >
                          <div>
                            <div className="font-semibold text-gray-900">{item.title}</div>
                            <div className="text-[10px] text-gray-500 font-light">{item.subtitle}</div>
                          </div>
                          <Images className="w-3.5 h-3.5 text-[#D4AF77] shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Films */}
                <button
                  type="button"
                  onClick={() => handleNavClick('#films')}
                  className="text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-black/5 transition-colors flex items-center justify-between text-left cursor-pointer text-gray-900"
                >
                  <span>Cinematic Films</span>
                  <ArrowRight className="w-4 h-4 text-[#7A5826]" />
                </button>

                {/* Contact */}
                <button
                  type="button"
                  onClick={() => handleNavClick('#contact')}
                  className="text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-black/5 transition-colors flex items-center justify-between text-left cursor-pointer text-gray-900"
                >
                  <span>Contact</span>
                  <ArrowRight className="w-4 h-4 text-[#7A5826]" />
                </button>
              </div>

              {/* Bottom Contact Pill & Full CTA */}
              <div className="pt-4 pb-1 border-t border-[#D4AF77]/30 mt-4 space-y-3">
                <button
                  onClick={handleBookingCTA}
                  className="w-full py-3 rounded-full bg-white text-gray-900 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#D4AF77]/40 active:scale-[0.99]"
                >
                  <Calendar className="w-4 h-4 text-[#C8102E]" />
                  <span>BOOK YOUR EVENT</span>
                </button>
                <div className="flex justify-between items-center text-xs px-2 text-gray-600">
                  <span>{STUDIO_INFO.location.address}</span>
                  <a href={`tel:${STUDIO_INFO.contact.phone}`} className="font-semibold text-gray-900 hover:text-[#C8102E] transition-colors">
                    {STUDIO_INFO.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
