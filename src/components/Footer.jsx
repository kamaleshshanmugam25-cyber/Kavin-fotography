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
      className="relative bg-[#0B1638] text-white/90 overflow-hidden border-t border-[#D9DEE8]/15"
    >
      {/* Subtle brand depth glow with deep navy and bright blue accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(7,135,249,0.12),_transparent_70%)] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-[radial-gradient(ellipse_at_center,_rgba(22,59,199,0.15),_transparent_70%)] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D9DEE8]/15">
          {/* Brand Presentation Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="h-14 w-14 rounded-xl overflow-hidden bg-white border border-[#D9DEE8] p-1 flex items-center justify-center shadow-lg">
                <img
                  src={STUDIO_INFO.assets.logoMark}
                  alt="Kanvi Fotography Official Monogram"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = STUDIO_INFO.assets.logoOriginal;
                  }}
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl tracking-[0.2em] font-bold text-white leading-none">
                  KANVI
                </h3>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#0787F9] font-medium mt-1">
                  FOTOGRAPHY
                </p>
              </div>
            </div>

            <p className="font-serif italic text-lg text-white">
              "{STUDIO_INFO.tagline}"
            </p>

            <p className="text-sm font-light text-[#D9DEE8] leading-relaxed max-w-sm">
              Dedicated to preserving once-in-a-lifetime weddings, candid emotions, and milestone
              celebrations through luxury photography and cinematic filmcraft.
            </p>

            <div className="text-xs text-[#D9DEE8] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0787F9]" />
              <span>Established in {STUDIO_INFO.establishedYear} • Founded by {STUDIO_INFO.founder}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#0787F9]">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('#hero')}
                  className="text-[#D9DEE8] hover:text-[#0787F9] transition-colors cursor-pointer"
                >
                  Home Studio
                </button>
              </li>
              <li>
                <Link to="/about" className="text-[#D9DEE8] hover:text-[#0787F9] transition-colors cursor-pointer">About Founder &amp; Vision</Link>
              </li>
              <li>
                <Link to="/process" className="text-[#D9DEE8] hover:text-[#0787F9] transition-colors cursor-pointer">Our 4-Step Process</Link>
              </li>
              <li>
                <Link to="/client-perspectives" className="text-[#D9DEE8] hover:text-[#0787F9] transition-colors cursor-pointer">Client Perspectives &amp; Stories</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('#services')}
                  className="text-[#D9DEE8] hover:text-[#0787F9] transition-colors cursor-pointer"
                >
                  Photography Services
                </button>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-[#0787F9] font-semibold underline underline-offset-4 hover:text-white transition-colors cursor-pointer"
                >
                  Book Your Event (Reserve Date)
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#0787F9]">
              Studio Details
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0787F9] shrink-0 mt-0.5" />
                <span className="text-[#D9DEE8]">{STUDIO_INFO.location.fullAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#0787F9] shrink-0" />
                <span className="text-[#D9DEE8]">Service Coverage: {STUDIO_INFO.location.serviceArea}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0787F9] shrink-0" />
                <a
                  href={`tel:${STUDIO_INFO.contact.phone}`}
                  className="text-[#D9DEE8] hover:text-[#0787F9] transition-colors"
                >
                  {STUDIO_INFO.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#0787F9] shrink-0" />
                <a
                  href={`https://wa.me/91${STUDIO_INFO.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D9DEE8] hover:text-[#0787F9] transition-colors"
                >
                  WhatsApp: {STUDIO_INFO.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0787F9] shrink-0" />
                <a
                  href={`mailto:${STUDIO_INFO.contact.email}`}
                  className="text-[#D9DEE8] hover:text-[#0787F9] transition-colors break-all"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#163BC7] hover:bg-[#0787F9] border border-[#163BC7] hover:border-[#0787F9] text-xs text-white transition-all font-bold shadow-md shadow-[#163BC7]/20 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>Connect via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9DEE8]">
          <div>
            &copy; {currentYear} {STUDIO_INFO.brandName}. All rights reserved. Headquartered in Woraiyur, Trichy.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#D9DEE8] hover:text-[#0787F9] hover:bg-white/5 transition-colors p-2 rounded-lg cursor-pointer"
            aria-label="Back to Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#0787F9]" />
          </button>
        </div>
      </div>
    </motion.footer>
  );
}
