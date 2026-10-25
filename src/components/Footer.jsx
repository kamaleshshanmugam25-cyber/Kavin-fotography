import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Compass, ArrowUp, MessageSquare } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioInfo';
import { smoothScrollTo } from '../utils/scroll';

export default function Footer({ onBookClick }) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToTop = () => {
    if (isHomePage) {
      smoothScrollTo('#hero', 76);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (href) => {
    if (isHomePage) {
      smoothScrollTo(href, 76);
    } else {
      const cleanHash = href.startsWith('#') ? href : `#${href}`;
      navigate(`/${cleanHash}`);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-[#4A0715] text-[#FFFDF7]/90 overflow-hidden border-t border-[#D4AF77]/25"
    >
      {/* Subtle brand depth glow with champagne gold and warm burgundy tones */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,119,0.12),_transparent_70%)] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-[radial-gradient(ellipse_at_center,_rgba(200,16,46,0.15),_transparent_70%)] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D4AF77]/20">
          {/* Brand Presentation Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="h-14 w-14 rounded-xl overflow-hidden bg-white/10 border border-[#D4AF77]/30 p-1.5 flex items-center justify-center shadow-lg">
                <img
                  src={STUDIO_INFO.assets.logoMark}
                  alt="Kanvi Fotography Monogram"
                  className="h-full w-full object-contain brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.src = STUDIO_INFO.assets.logoOriginal;
                  }}
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl tracking-[0.2em] font-bold text-[#FFFDF7] leading-none">
                  KANVI
                </h3>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF77] font-medium mt-1">
                  FOTOGRAPHY
                </p>
              </div>
            </div>

            <p className="font-serif italic text-lg text-[#FFFDF7]">
              "{STUDIO_INFO.tagline}"
            </p>

            <p className="text-sm font-light text-[#FFFDF7]/85 leading-relaxed max-w-sm">
              Dedicated to preserving once-in-a-lifetime weddings, candid emotions, and milestone
              celebrations through luxury photography and cinematic filmcraft.
            </p>

            <div className="text-xs text-[#FFFDF7]/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF77]" />
              <span>Established in {STUDIO_INFO.establishedYear} • Founded by {STUDIO_INFO.founder}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#D4AF77]">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('#hero')}
                  className="text-[#FFFDF7]/85 hover:text-[#D4AF77] transition-colors cursor-pointer"
                >
                  Home Studio
                </button>
              </li>
              <li>
                <Link to="/about" className="text-[#FFFDF7]/85 hover:text-[#D4AF77] transition-colors cursor-pointer">About Founder &amp; Vision</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('#services')}
                  className="text-[#FFFDF7]/85 hover:text-[#D4AF77] transition-colors cursor-pointer"
                >
                  Photography Services
                </button>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-[#D4AF77] font-semibold underline underline-offset-4 hover:text-[#FFFDF7] transition-colors cursor-pointer"
                >
                  Book Your Event (Reserve Date)
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#D4AF77]">
              Studio Details
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF77] shrink-0 mt-0.5" />
                <span className="text-[#FFFDF7]/90">{STUDIO_INFO.location.fullAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#D4AF77] shrink-0" />
                <span className="text-[#FFFDF7]/90">Service Coverage: {STUDIO_INFO.location.serviceArea}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF77] shrink-0" />
                <a
                  href={`tel:${STUDIO_INFO.contact.phone}`}
                  className="text-[#FFFDF7] hover:text-[#D4AF77] transition-colors"
                >
                  {STUDIO_INFO.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#D4AF77] shrink-0" />
                <a
                  href={`https://wa.me/91${STUDIO_INFO.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFFDF7] hover:text-[#D4AF77] transition-colors"
                >
                  WhatsApp: {STUDIO_INFO.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF77] shrink-0" />
                <a
                  href={`mailto:${STUDIO_INFO.contact.email}`}
                  className="text-[#FFFDF7] hover:text-[#D4AF77] transition-colors break-all"
                >
                  {STUDIO_INFO.contact.email}
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={`https://wa.me/91${STUDIO_INFO.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF77] hover:bg-[#C29B63] border border-[#D4AF77] text-xs text-[#2A040C] transition-all font-bold shadow-md shadow-[#D4AF77]/20 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#2A040C]" />
                <span>Connect via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFFDF7]/75">
          <div>
            &copy; {currentYear} {STUDIO_INFO.brandName}. All rights reserved. Headquartered in Woraiyur, Trichy.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#FFFDF7] hover:text-[#D4AF77] hover:bg-white/5 transition-colors p-2 rounded-lg cursor-pointer"
            aria-label="Back to Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D4AF77]" />
          </button>
        </div>
      </div>
    </motion.footer>
  );
}
