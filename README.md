# KANVI FOTOGRAPHY — Premium Photography Studio Website

A luxury, cinematic, editorial-style photography studio website for **KANVI FOTOGRAPHY**, built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## 📷 Client Information

- **Brand Name:** KANVI FOTOGRAPHY
- **Tagline:** "Share & Save Your Moment With Us"
- **Established:** 2019
- **Founder / Lead Photographer:** Bala
- **Studio Location:** Woraiyur, Tiruchirappalli, Tamil Nadu, India
- **Service Coverage:** All over India
- **Phone / WhatsApp:** +91 73970 64481
- **Email:** Kanvimedia.info@gmail.com

---

## ✨ Features & Architecture

1. **Navigation Bar:**
   - Sticky transparent-to-solid dark glassmorphism navbar.
   - Smooth anchor scrolling with header offset.
   - Prominent "BOOK YOUR EVENT" call-to-action button.
   - Mobile hamburger drawer with touch and keyboard accessibility (`Escape` key).
   - Real brand logo and monogram mark.

2. **Cinematic Hero:**
   - Full-screen desktop experience (`min-h-screen`).
   - Slow-pan cinematic Indian wedding background.
   - Established 2019 badge and editorial typography.
   - Primary and secondary CTAs ("EXPLORE OUR WORK" and "BOOK YOUR EVENT").
   - Animated scroll indicator.

3. **About Us ("Behind Every Frame, There Is a Story"):**
   - Editorial layout detailing the studio's origin in Woraiyur, Trichy.
   - Spotlight on founder Bala.
   - Pan-India service coverage cards without unsupported claims.

4. **18 Photography & Event Tech Services:**
   - Wedding Photography, Wedding Videography, Candid Photography, Reception Photography, Engagement Photography.
   - Birthday, Baby Shower (Valaikappu), Maternity Shoots, Newborn Baby Shoots, Pre-Wedding, Post-Wedding.
   - Drone Photography & Videography, Modeling Shoots, Corporate Photography.
   - Live Streaming, LED Wall Displays, 360-Degree Video Booth, and Selfie Booth.
   - Each service features custom highlights, tag badges, and an "Enquire Now" button that scrolls to and pre-selects that service in the booking form.

5. **Stories Portfolio & Interactive Lightbox:**
   - Filter categories: *All Work*, *Weddings*, *Candid*, *Engagements*, *Pre-Wedding*, *Maternity*, *Newborn*, *Celebrations*, *Corporate*, *Films*.
   - Dynamic masonry grid with varied aspect ratios (`tall`, `wide`, `square`).
   - Fullscreen Lightbox with Next/Previous arrows, keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), mobile touch swipe gestures, and image counter.

6. **Featured Wedding Stories:**
   - Narrative-driven wedding chronicles (*"A Celebration of Forever"*, *"Love in Every Frame"*, *"Moments That Become Memories"*).
   - "View Story" modal opening multi-frame visual story sequences.

7. **Cinematic Films & Event Tech:**
   - Cinema-grade 4K wedding films, drone cinematography, live streaming, LED wall stage displays, and 360-degree video booth.
   - Interactive film player modal with simulated playback controls, duration, tech gear breakdown, and WhatsApp enquiry actions.

8. **Why Choose Kanvi Fotography:**
   - 6 core pillars: Thoughtful Visual Storytelling, Attention to Every Detail, Creative Artistry, Professional Event Coverage, Comprehensive Photo/Film Options, and Pan-India Coverage.

9. **4-Step Photography Process:**
   - 01. Let's Connect → 02. Plan the Story → 03. Capture the Moments → 04. Relive the Memories.
   - Horizontal timeline on desktop, vertical on mobile.

10. **Testimonials ("Kind Words, Beautiful Memories"):**
    - Neutral and honest client invitation: *"Your experience could be the next story we capture."*
    - Ready-to-use extensible review structure.

11. **Instagram Social Journal:**
    - Curated photo preview grid with likes/comments hover overlay.
    - Configurable profile link in `src/data/studioInfo.js`.

12. **Booking Enquiry Flow & WhatsApp Integration:**
    - Form fields: Full Name, Phone (WhatsApp), Email, Event Type (18 options), Date, Location, Additional Details.
    - Robust client-side validation with real-time error handling.
    - Generates a properly URL-encoded WhatsApp message to **7397064481**.
    - Clear client instructions to send the prepared WhatsApp message.
    - Direct phone, email, and location contact cards.

13. **Footer & Quick CTA:**
    - Brand logo, dynamic copyright year, quick collection links, and floating WhatsApp button.

---

## 🛠️ Technology Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** (for smooth entrance, hover, and modal transitions)
- **Lucide React** (icons)
- **Google Fonts:** Cormorant Garamond, Plus Jakarta Sans, Cinzel

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized static production bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
kavin_Photography/
├── public/
│   ├── assets/
│   │   ├── logo.png                   # Original blue client logo
│   │   ├── logo-light.png             # High-contrast light text logo for dark UI
│   │   ├── logo-mark.png              # Monogram KF icon
│   │   └── hero/, weddings/, etc.     # Asset categories
│   └── favicon.png                    # Brand favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                 # Responsive sticky navigation
│   │   ├── Hero.jsx                   # Cinematic full-viewport hero
│   │   ├── About.jsx                  # Studio story & founder profile
│   │   ├── Services.jsx               # All 18 photography services
│   │   ├── Portfolio.jsx              # Gallery with category filtering
│   │   ├── PortfolioLightbox.jsx      # Modal lightbox with keyboard/touch support
│   │   ├── WeddingStories.jsx         # Featured wedding chronicles
│   │   ├── StoryModal.jsx             # Multi-frame story sequence modal
│   │   ├── Films.jsx                  # Films, drone, LED, 360 booth
│   │   ├── FilmModal.jsx              # Cinema player & tech details modal
│   │   ├── WhyChooseUs.jsx            # 6 core service qualities
│   │   ├── Process.jsx                # 4-step workflow timeline
│   │   ├── Testimonials.jsx           # Clean testimonial section
│   │   ├── InstagramGallery.jsx       # Social feed preview
│   │   ├── BookingForm.jsx            # Validated form with WhatsApp flow
│   │   ├── Footer.jsx                 # Complete footer with contact details
│   │   └── Icons.jsx                  # Custom SVG icons
│   ├── data/
│   │   ├── studioInfo.js              # Central studio configuration
│   │   ├── services.js                # 18 services catalog
│   │   ├── portfolio.js               # Gallery items with aspect ratios
│   │   ├── weddingStories.js          # Wedding chronicle stories
│   │   ├── films.js                   # Films & event tech catalog
│   │   ├── whyChooseUs.js             # Brand qualities
│   │   ├── process.js                 # 4-step process
│   │   └── instagram.js               # Social media grid items
│   ├── App.jsx                        # Main application container
│   ├── index.css                      # Tailwind v4 setup & dark theme
│   └── main.jsx                       # React DOM entry point
├── package.json
└── vite.config.js
```

---

## 🔧 Updating Studio Details

All studio contact information, phone numbers, email addresses, and social handles are centralized in:
`src/data/studioInfo.js`

To update the WhatsApp number or email across the entire website, simply edit that single file.
#   k a v i n _ f o t o g r a p h y  
 