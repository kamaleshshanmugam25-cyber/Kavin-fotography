import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { STUDIO_INFO } from '../data/studioInfo';
import { INSTAGRAM_POSTS } from '../data/instagram';

export default function InstagramGallery() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#FFFDF7] border-t border-[#D4AF77]/25 overflow-hidden">
      {/* Subtle Botanical / Floral Line-Art Ambient Watermark (Matches reference design) */}
      <div className="absolute -top-12 -right-12 w-96 h-96 opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" stroke="#4A0715" strokeWidth="1.2" className="w-full h-full">
          <path d="M100 20 C120 60, 160 80, 180 100 C140 120, 120 160, 100 180 C80 140, 40 120, 20 100 C60 80, 80 40, 100 20 Z" />
          <circle cx="100" cy="100" r="40" strokeDasharray="3 3" />
        </svg>
      </div>
      <div className="absolute -bottom-16 -left-16 w-96 h-96 opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" stroke="#D4AF77" strokeWidth="1.2" className="w-full h-full">
          <path d="M100 10 C130 50, 170 70, 190 100 C150 130, 130 170, 100 190 C70 150, 30 130, 10 100 C50 70, 70 30, 100 10 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Dual Column Typography (Exact Reference Match) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          {/* Left Heading */}
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-normal tracking-tight leading-[1.08]">
              Follow Us
              <br />
              <span className="italic font-serif text-[#C8102E] font-normal">On Instagram</span>
            </h2>
          </div>

          {/* Right Narrative Paragraph */}
          <div className="max-w-md md:pb-2">
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
              Explore our recent work, wedding highlights, and curated moments that celebrate love,
              elegance, and authentic storytelling.
            </p>
          </div>
        </motion.div>

        {/* 4-Column x 2-Row Portrait Instagram Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {INSTAGRAM_POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href={STUDIO_INFO.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 border border-[#D4AF77]/25 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 block"
              aria-label={`View Instagram post: ${post.caption}`}
            >
              {/* Photo with Smooth Scale Effect */}
              <img
                src={post.image}
                alt={`Kanvi Fotography Instagram Post - ${post.caption}`}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out "
                loading="lazy"
              />

              {/* Top-Right Real Instagram Badge (Reels Camera or Multi-Photo Carousel) */}
              <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none">
                <div className="p-1.5 rounded-md bg-black/75 border border-white/20 text-white shadow-lg">
                  {post.badgeType === 'reel' ? (
                    // Instagram Reel / Video Icon
                    <svg className="w-4 h-4 text-white drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" fill="currentColor" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  ) : (
                    // Instagram Carousel / Multiple Photos Icon
                    <svg className="w-4 h-4 text-white drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="13" height="13" rx="2" ry="2" />
                      <path d="M7 21h12a2 2 0 0 0 2-2V7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Title Badges / Text Overlays (Inspired by reference screenshot) */}
              {post.titleBadge && (
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <div className="px-3 py-1 rounded-lg bg-black/85 border border-white/20 text-white text-[11px] font-serif tracking-wider shadow-xl">
                    {post.titleBadge}
                  </div>
                </div>
              )}

              {/* Gradient Scrim & Hover Social Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white z-20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-white">
                      <Heart className="w-4 h-4 fill-[#C8102E] text-[#C8102E]" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-white">
                      <MessageCircle className="w-4 h-4 text-[#D4AF77]" />
                      <span>{post.comments}</span>
                    </span>
                  </div>

                  <span className="p-1.5 rounded-full bg-white/20  text-white group-hover:bg-[#D4AF77] group-hover:text-[#2A040C] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="text-xs text-white/90 line-clamp-2 font-light leading-relaxed">
                  {post.caption}
                </p>
                <div className="mt-2 text-[10px] tracking-wider uppercase font-semibold text-[#D4AF77] flex items-center gap-1">
                  <InstagramIcon className="w-3 h-3" />
                  <span>View on Instagram</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Instagram Profile CTA Button */}
        <div className="mt-14 text-center">
          <a
            href={STUDIO_INFO.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FFFDF7] hover:bg-[#D4AF77] text-[#2A040C] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border border-[#D4AF77]/50 hover:border-[#D4AF77] shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
          >
            <InstagramIcon className="w-4 h-4 text-[#C8102E] group-hover:text-[#2A040C] transition-colors" />
            <span>Follow {STUDIO_INFO.social.instagram.handle}</span>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#2A040C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
