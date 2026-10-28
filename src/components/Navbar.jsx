import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Sparkles, Images, Calendar, ArrowRight, Camera } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { smoothScrollTo } from '../utils/scroll';

export const WEDDINGS_MENU = [
  { id: 'makeover-portrait', title: 'Makeover Portrait', subtitle: 'Bridal Beauty & Haldi' },
  { id: 'engagement-photography', title: 'Engagement', subtitle: 'Ring Ceremony & Portraits' },
  { id: 'reception-portrait', title: 'Reception Portrait', subtitle: 'Evening Stage & Glamour' },
  { id: 'wedding-rituals', title: 'Wedding Rituals', subtitle: 'Sacred Muhurtham & Thali' },
  { id: 'wedding-portrait', title: 'Wedding Portrait', subtitle: 'Traditional Silk Editorial' },
];

export const OUTDOOR_MENU = [
  { id: 'pre-wedding-photoshoots', title: 'Pre-Wedding Shoot', subtitle: 'Scenic Destination Love' },
  { id: 'candid-photography', title: 'Candid Photography', subtitle: 'Unscripted Emotional Joy' },
  { id: 'maternity-photoshoots', title: 'Maternity Photoshoots', subtitle: 'Artistic Motherhood Glow' },
  { id: 'baby-shower-photography', title: 'Baby Shower (Valaikappu)', subtitle: 'Traditional Bangle Rituals' },
];

export default function Navbar({ onBookClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null); // 'weddings' | 'outdoor' | null
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null); // 'weddings' | 'outdoor' | null
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  // Track scroll position to enhance glassmorphic depth dynamically
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    setDesktopDropdown(null);
    document.body.style.overflow = '';

    requestAnimationFrame(() => {
      if (isHomePage) {
        smoothScrollTo(href, 84);
      } else {
        const cleanHash = href.startsWith('#') ? href : `#${href}`;
        navigate(`/${cleanHash}`);
      }
    });
  };

  const handleServiceSelect = (serviceId) => {
    setDesktopDropdown(null);
    setMobileMenuOpen(false);
    document.body.style.overflow = '';

    navigate(`/services/${serviceId}`);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setDesktopDropdown(null);
    document.body.style.overflow = '';

    if (isHomePage) {
      requestAnimationFrame(() => {
        smoothScrollTo('#hero', 84);
      });
    } else {
      navigate('/');
    }
  };

  const handleBookingCTA = () => {
    setMobileMenuOpen(false);
    setDesktopDropdown(null);
    document.body.style.overflow = '';
    navigate('/booking');
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
      {/* Floating Pill Navbar */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-2.5 sm:top-5 inset-x-0 mx-auto w-[92%] sm:w-[94%] max-w-5xl xl:max-w-6xl z-[85] pointer-events-auto transform-gpu will-change-transform"
      >
        <div
          className={`rounded-full px-3 sm:px-5 py-1.5 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3 text-[#111111] transition-all duration-300 backdrop-blur-xl sm:backdrop-blur-2xl border ${
            isScrolled
              ? 'bg-white/80 border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.95)]'
              : 'bg-white/65 border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)]'
          }`}
        >
          {/* Brand Logo & Studio Name (Left) */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#163BC7] rounded-full p-0.5 shrink-0"
            aria-label="Kanvi Fotography Home"
          >
            <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full overflow-hidden bg-white/90 border border-white/80 flex items-center justify-center p-0.5 shadow-2xs shrink-0 group-hover:border-[#163BC7] transition-colors">
              <img
                src={STUDIO_INFO.assets.logoMark}
                alt="Kanvi Fotography Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = STUDIO_INFO.assets.logoOriginal;
                }}
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-sm sm:text-base tracking-[0.18em] uppercase text-[#111111] group-hover:text-[#163BC7] transition-colors leading-tight">
                KANVI
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-[#163BC7] font-semibold -mt-0.5">
                FOTOGRAPHY
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-[#555B68]">
            {/* Home */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className={`px-3 py-1.5 rounded-full hover:bg-white/70 hover:text-[#163BC7] hover:shadow-2xs transition-all whitespace-nowrap cursor-pointer ${
                isHomePage && !location.hash ? 'bg-[#163BC7]/10 text-[#163BC7] font-semibold border border-[#163BC7]/15' : ''
              }`}
            >
              Home
            </a>

            {/* About Page Link */}
            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-full hover:bg-white/70 hover:text-[#163BC7] hover:shadow-2xs transition-all whitespace-nowrap cursor-pointer ${
                location.pathname === '/about' ? 'bg-[#163BC7]/10 text-[#163BC7] font-semibold border border-[#163BC7]/15' : ''
              }`}
            >
              About
            </Link>

            {/* Weddings Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('weddings')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleNavClick('#services')}
                className="px-3 py-1.5 rounded-full hover:bg-white/70 hover:text-[#163BC7] hover:shadow-2xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap text-[#555B68]"
                aria-expanded={desktopDropdown === 'weddings'}
              >
                <span>Weddings</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#555B68] transition-transform duration-200 shrink-0 ${
                    desktopDropdown === 'weddings' ? 'rotate-180 text-[#163BC7]' : ''
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white/85 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-white/80 py-2.5 z-50 overflow-hidden"
                  >
                    <div className="px-3.5 py-1 mb-1 border-b border-[#D9DEE8] flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#163BC7]">
                        Wedding Specialties
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-[#0787F9]" />
                    </div>
                    {WEDDINGS_MENU.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleServiceSelect(item.id)}
                        className="w-full text-left px-3.5 py-2 hover:bg-white/70 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#111111] group-hover:text-[#163BC7]">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-[#555B68] font-light">
                            {item.subtitle}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#163BC7] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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
                className="px-3 py-1.5 rounded-full hover:bg-white/70 hover:text-[#163BC7] hover:shadow-2xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap text-[#555B68]"
                aria-expanded={desktopDropdown === 'outdoor'}
              >
                <span>Outdoor</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#555B68] transition-transform duration-200 shrink-0 ${
                    desktopDropdown === 'outdoor' ? 'rotate-180 text-[#163BC7]' : ''
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-68 bg-white/85 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-white/80 py-2.5 z-50 overflow-hidden"
                  >
                    <div className="px-3.5 py-1 mb-1 border-b border-[#D9DEE8] flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#163BC7]">
                        Outdoor &amp; Celebrations
                      </span>
                      <Images className="w-3.5 h-3.5 text-[#0787F9]" />
                    </div>
                    {OUTDOOR_MENU.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleServiceSelect(item.id)}
                        className="w-full text-left px-3.5 py-2 hover:bg-white/70 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#111111] group-hover:text-[#163BC7]">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-[#555B68] font-light">
                            {item.subtitle}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#163BC7] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Process Page Link */}
            <Link
              to="/process"
              className={`px-3 py-1.5 rounded-full hover:bg-white/70 hover:text-[#163BC7] hover:shadow-2xs transition-all whitespace-nowrap cursor-pointer ${
                location.pathname === '/process' ? 'bg-[#163BC7]/10 text-[#163BC7] font-semibold border border-[#163BC7]/15' : ''
              }`}
            >
              Process
            </Link>

            {/* Perspectives Page Link */}
            <Link
              to="/client-perspectives"
              className={`px-3 py-1.5 rounded-full hover:bg-white/70 hover:text-[#163BC7] hover:shadow-2xs transition-all whitespace-nowrap cursor-pointer ${
                location.pathname === '/client-perspectives' ? 'bg-[#163BC7]/10 text-[#163BC7] font-semibold border border-[#163BC7]/15' : ''
              }`}
            >
              Perspectives
            </Link>

            {/* Contact Page Link */}
            <Link
              to="/contact"
              className={`px-3 py-1.5 rounded-full hover:bg-white/70 hover:text-[#163BC7] hover:shadow-2xs transition-all whitespace-nowrap cursor-pointer ${
                location.pathname === '/contact' ? 'bg-[#163BC7]/10 text-[#163BC7] font-semibold border border-[#163BC7]/15' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Section: Compact on mobile, spacious on desktop */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Royal Blue Book Now Button */}
            <button
              type="button"
              onClick={handleBookingCTA}
              className={`font-semibold text-xs sm:text-[13px] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md flex items-center gap-1.5 sm:gap-2.5 transition-all duration-200 cursor-pointer group shrink-0 active:scale-[0.98] ${
                location.pathname === '/booking'
                  ? 'bg-[#0B1638] text-white ring-2 ring-[#0787F9] shadow-[#163BC7]/30 font-bold'
                  : 'bg-[#163BC7] hover:bg-[#0B1638] text-white shadow-[#163BC7]/25'
              }`}
              title="Book your wedding or celebration with Kanvi Fotography"
            >
              {/* Fine-Art Camera Badge */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              <span className="hidden sm:inline whitespace-nowrap">Book Your Event</span>
              <span className="sm:hidden text-[11px] font-bold whitespace-nowrap">Book</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-1.5 sm:p-2 rounded-full text-[#111111] transition-colors cursor-pointer border border-white/80 flex items-center justify-center active:scale-95 ${
                mobileMenuOpen ? 'bg-[#163BC7]/10 text-[#163BC7]' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Backdrop & Lightweight Card Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay: closes on outside tap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-[#0B1638]/60 backdrop-blur-sm z-[75]"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              data-lenis-prevent
              className="lg:hidden fixed top-[62px] sm:top-[74px] left-3.5 right-3.5 sm:left-6 sm:right-6 mx-auto max-w-lg bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_25px_50px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.95)] p-5 z-[80] max-h-[82vh] overflow-y-auto"
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex flex-col space-y-1.5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#163BC7] px-3 pb-1">
                  Navigation &amp; Services
                </div>

                {/* Home */}
                <button
                  type="button"
                  onClick={() => handleNavClick('#hero')}
                  className="text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors flex items-center justify-between text-left cursor-pointer text-[#111111]"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-[#163BC7]" />
                </button>

                {/* About Page Link */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.style.overflow = '';
                    navigate('/about');
                  }}
                  className={`text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors flex items-center justify-between text-left cursor-pointer text-[#111111] ${
                    location.pathname === '/about' ? 'bg-[#163BC7]/10 font-bold text-[#163BC7]' : ''
                  }`}
                >
                  <span>About Founder &amp; Vision</span>
                  <ArrowRight className="w-4 h-4 text-[#163BC7]" />
                </button>

                {/* Weddings Accordion */}
                <div className="rounded-xl border border-[#D9DEE8] overflow-hidden bg-[#F7F9FC]">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'weddings' ? null : 'weddings'
                      )
                    }
                    className="w-full text-base font-serif tracking-wide px-3.5 py-2.5 transition-colors flex items-center justify-between text-left cursor-pointer text-[#111111]"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0787F9]" />
                      <span>Weddings ({WEDDINGS_MENU.length} Services)</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#555B68] transition-transform duration-200 ${
                        mobileExpandedSection === 'weddings' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileExpandedSection === 'weddings' && (
                    <div className="p-2 space-y-1 bg-white border-t border-[#D9DEE8]">
                      {WEDDINGS_MENU.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleServiceSelect(item.id)}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between hover:bg-[#F7F9FC] transition-colors text-[#555B68] cursor-pointer"
                        >
                          <div>
                            <div className="font-semibold text-[#111111]">{item.title}</div>
                            <div className="text-[10px] text-[#555B68] font-light">{item.subtitle}</div>
                          </div>
                          <Images className="w-3.5 h-3.5 text-[#163BC7] shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Outdoor Accordion */}
                <div className="rounded-xl border border-[#D9DEE8] overflow-hidden bg-[#F7F9FC]">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'outdoor' ? null : 'outdoor'
                      )
                    }
                    className="w-full text-base font-serif tracking-wide px-3.5 py-2.5 transition-colors flex items-center justify-between text-left cursor-pointer text-[#111111]"
                  >
                    <span className="flex items-center gap-2">
                      <Images className="w-4 h-4 text-[#0787F9]" />
                      <span>Outdoor &amp; Celebrations</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#555B68] transition-transform duration-200 ${
                        mobileExpandedSection === 'outdoor' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileExpandedSection === 'outdoor' && (
                    <div className="p-2 space-y-1 bg-white border-t border-[#D9DEE8]">
                      {OUTDOOR_MENU.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleServiceSelect(item.id)}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between hover:bg-[#F7F9FC] transition-colors text-[#555B68] cursor-pointer"
                        >
                          <div>
                            <div className="font-semibold text-[#111111]">{item.title}</div>
                            <div className="text-[10px] text-[#555B68] font-light">{item.subtitle}</div>
                          </div>
                          <Images className="w-3.5 h-3.5 text-[#163BC7] shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Process Page Link */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.style.overflow = '';
                    navigate('/process');
                  }}
                  className={`text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors flex items-center justify-between text-left cursor-pointer text-[#111111] ${
                    location.pathname === '/process' ? 'bg-[#163BC7]/10 font-bold text-[#163BC7]' : ''
                  }`}
                >
                  <span>Our 4-Step Process</span>
                  <ArrowRight className="w-4 h-4 text-[#163BC7]" />
                </button>

                {/* Client Perspectives Page Link */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.style.overflow = '';
                    navigate('/client-perspectives');
                  }}
                  className={`text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors flex items-center justify-between text-left cursor-pointer text-[#111111] ${
                    location.pathname === '/client-perspectives' ? 'bg-[#163BC7]/10 font-bold text-[#163BC7]' : ''
                  }`}
                >
                  <span>Client Perspectives</span>
                  <ArrowRight className="w-4 h-4 text-[#163BC7]" />
                </button>

                {/* Book Now Dedicated Link */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.style.overflow = '';
                    navigate('/booking');
                  }}
                  className={`text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors flex items-center justify-between text-left cursor-pointer text-[#111111] ${
                    location.pathname === '/booking' ? 'bg-[#163BC7]/10 font-bold text-[#163BC7]' : ''
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0787F9]" />
                    <span>Reserve Date (Book Now)</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#163BC7]" />
                </button>

                {/* Contact Page Link */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.style.overflow = '';
                    navigate('/contact');
                  }}
                  className={`text-base font-serif tracking-wide px-3.5 py-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors flex items-center justify-between text-left cursor-pointer text-[#111111] ${
                    location.pathname === '/contact' ? 'bg-[#163BC7]/10 font-bold text-[#163BC7]' : ''
                  }`}
                >
                  <span>Contact &amp; Studio</span>
                  <ArrowRight className="w-4 h-4 text-[#163BC7]" />
                </button>
              </div>

              {/* Bottom Contact Pill & Full CTA */}
              <div className="pt-4 pb-1 border-t border-[#D9DEE8] mt-4 space-y-3">
                <button
                  onClick={handleBookingCTA}
                  className="w-full py-3 rounded-full bg-[#163BC7] hover:bg-[#0B1638] text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#163BC7] active:scale-[0.99] group"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shadow-sm shrink-0">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                  <span>BOOK YOUR EVENT</span>
                </button>
                <div className="flex justify-between items-center text-xs px-2 text-[#555B68]">
                  <span>{STUDIO_INFO.location.address}</span>
                  <a href={`tel:${STUDIO_INFO.contact.phone}`} className="font-semibold text-[#111111] hover:text-[#163BC7] transition-colors">
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
