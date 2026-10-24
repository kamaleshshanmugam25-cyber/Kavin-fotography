import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WeddingStories from './components/WeddingStories';
import Films from './components/Films';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import InstagramGallery from './components/InstagramGallery';
import BookingForm from './components/BookingForm';
import BookingModal from './components/BookingModal';
import ServiceDetailPage from './pages/ServiceDetailPage';
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

      {/* 5. Cinematic Films & Event Experiences */}
      <Films onEnquireFilm={onBookClick} />

      {/* 6. 4-Step Photography Process */}
      <Process />

      {/* 8. Testimonials & Client Perspectives */}
      <Testimonials />

      {/* 9. Social Media & Instagram Grid */}
      <InstagramGallery />

      {/* 10. Booking Enquiry Form & Direct Contacts */}
      <BookingForm />
    </main>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('');

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
      <ScrollToTop />
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className="min-h-screen bg-[#2A040C] text-[#1A1A1A] selection:bg-[#C8102E] selection:text-white relative overflow-x-hidden w-full max-w-full">
        {/* Navigation Bar */}
        <Navbar onBookClick={() => handleOpenBookingModal()} />

        {/* Dynamic Multi-Page Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onBookClick={(service) => handleOpenBookingModal(service)}
                onExploreClick={handleExploreClick}
              />
            }
          />
          <Route
            path="/services/:serviceId"
            element={
              <ServiceDetailPage
                onBookService={(serviceTitle) => handleOpenBookingModal(serviceTitle)}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

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
