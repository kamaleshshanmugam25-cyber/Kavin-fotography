import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WeddingStories from './components/WeddingStories';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import InstagramGallery from './components/InstagramGallery';
import BookingForm from './components/BookingForm';
import BookingModal from './components/BookingModal';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import ProcessPage from './pages/ProcessPage';
import ClientPerspectivesPage from './pages/ClientPerspectivesPage';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import Footer from './components/Footer';
import { STUDIO_INFO } from './data/studioInfo';
import { MessageSquare } from 'lucide-react';
import { smoothScrollTo } from './utils/scroll';

function HomePage({ onBookClick, onExploreClick }) {
  return (
    <main>
      {/* 1. Hero Section */}
      <Hero onExploreClick={onExploreClick} onBookClick={onBookClick} />

      {/* 2. About Us Section */}
      <About />

      {/* 3. Photography Services Section */}
      <Services onSelectService={onBookClick} />

      {/* 4. Featured Wedding Stories */}
      <WeddingStories />

      {/* 5. 4-Step Photography Process */}
      <Process />

      {/* 6. Testimonials & Client Perspectives */}
      <Testimonials />

      {/* 7. Social Media & Instagram Grid */}
      <InstagramGallery />

      {/* 8. Booking Enquiry Form & Direct Contacts */}
      <BookingForm />
    </main>
  );
}

function AnimatedAppRoutes({ onOpenBooking, onExploreClick }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full flex-1"
      >
        <ScrollToTop />
        <Routes location={location}>
          <Route
            path="/"
            element={
              <HomePage
                onBookClick={(service) => onOpenBooking(service)}
                onExploreClick={onExploreClick}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                onBookClick={(service) => onOpenBooking(service)}
              />
            }
          />
          <Route
            path="/process"
            element={
              <ProcessPage
                onBookClick={(service) => onOpenBooking(service)}
              />
            }
          />
          <Route path="/our-process" element={<Navigate to="/process" replace />} />
          <Route
            path="/client-perspectives"
            element={
              <ClientPerspectivesPage
                onBookClick={(service) => onOpenBooking(service)}
              />
            }
          />
          <Route path="/testimonials" element={<Navigate to="/client-perspectives" replace />} />
          <Route path="/reviews" element={<Navigate to="/client-perspectives" replace />} />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="/booking"
            element={<BookingPage />}
          />
          <Route path="/book" element={<Navigate to="/booking" replace />} />
          <Route
            path="/services/:serviceId"
            element={
              <ServiceDetailPage
                onBookService={(serviceTitle) => onOpenBooking(serviceTitle)}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('');

  // Initialize Apple-grade momentum smooth scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Responsive Apple-like exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.0,
      infinite: false,
      syncTouch: true,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Pause Lenis smooth scrolling when the modal popup is open
  useEffect(() => {
    if (window.__lenis) {
      if (isModalOpen) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
      }
    }
  }, [isModalOpen]);

  // Opens the modal form popup inspired by reference site candyexpressphotography.com
  const handleOpenBookingModal = (serviceTitle = '') => {
    setModalService(serviceTitle || '');
    setIsModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsModalOpen(false);
  };

  const handleExploreClick = () => {
    smoothScrollTo('#services', 84);
  };

  return (
    <Router>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className="min-h-screen bg-white text-[#111111] selection:bg-[#163BC7] selection:text-white relative overflow-x-clip w-full max-w-full flex flex-col">
        {/* Navigation Bar */}
        <Navbar onBookClick={() => handleOpenBookingModal()} />

        {/* Dynamic Multi-Page Routes with Fade-In Page Transition */}
        <AnimatedAppRoutes
          onOpenBooking={handleOpenBookingModal}
          onExploreClick={handleExploreClick}
        />

        {/* Footer */}
        <Footer onBookClick={() => handleOpenBookingModal()} />

        {/* Floating Quick WhatsApp Action Button */}
        <a
          href={`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(
            'Hi Kanvi Fotography! I am looking for photography / event coverage and would love to know more.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Chat"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black shadow-2xl shadow-[#25D366]/40 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          title="Chat on WhatsApp with Bala (7397064481)"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-black" />
        </a>

        {/* Capture Your Story Modal Form (Reference: candyexpressphotography.com) */}
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseBookingModal}
          preselectedService={modalService}
        />
      </div>
    </Router>
  );
}
