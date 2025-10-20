import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Detail from "./detailsection";
import Timeline from './eventtimeline';
import Sponsor from "./sponser";
import Contact from "./contact";
import title from "../assets/title.png";
import humong from "../assets/humoung.png";
import openingVideo from "../assets/opening.mp4";

const OmnitrixWebsite = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  
  const videoRef = useRef(null);
  const Detailref = useRef(null);
  const Timeref = useRef(null);
  const Sponsorref = useRef(null);
  const contactref = useRef(null);

  useEffect(() => {
    // Check if video has been viewed in this session
    const hasViewedVideo = sessionStorage.getItem('omnitrix_video_viewed');
    if (hasViewedVideo) {
      setShowVideo(false);
      setVideoEnded(true);
    }
  }, []);

  const handleVideoEnd = () => {
    setShowTransition(true);
    // After transition effect, hide video and show website
    setTimeout(() => {
      setVideoEnded(true);
      setShowVideo(false);
      sessionStorage.setItem('omnitrix_video_viewed', 'true');
    }, 1500); // 1.5s for transition effect
  };

  const skipVideo = () => {
    setShowTransition(true);
    setTimeout(() => {
      setVideoEnded(true);
      setShowVideo(false);
      sessionStorage.setItem('omnitrix_video_viewed', 'true');
    }, 800);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (item) => {
    switch(item) {
      case 'ABOUT':
        scrollToSection(Detailref);
        break;
      case 'Themes':
        navigate('/theme');
        setMobileMenuOpen(false);
        break;
      case 'Our Team':
        scrollToSection(Sponsorref);
        break;
      case 'Contact':
        scrollToSection(contactref);
        break;
      case 'Prizes':
        navigate('/prize');
        setMobileMenuOpen(false);
        break;
      case 'FAQs':
        navigate('/faq');
        setMobileMenuOpen(false);
        break;
      case 'HackTime':
        navigate('/hacktime');
        setMobileMenuOpen(false);
        break;
      case 'gallery':
        navigate('/gallery');
        setMobileMenuOpen(false);
        break;
      case 'Lobby':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false);
        break;
      default:
        break;
    }
  };

  const navigationItems = ['Lobby', 'ABOUT', 'Themes', 'HackTime', 'Prizes', 'Our Team', 'FAQs', 'Contact','gallery'];

  // Opening Video Component
  if (showVideo && !videoEnded) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        {/* Video Container */}
        <div className="relative w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={() => skipVideo()} // Fallback if video fails to load
          >
            <source src={openingVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Skip Button */}
          <button
            onClick={skipVideo}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/50 hover:bg-black/70 
                     text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg backdrop-blur-sm
                     transition-all duration-300 hover:scale-105 text-sm sm:text-base
                     border border-green-400/30 hover:border-green-400/50"
          >
            Skip Intro
          </button>
          
          {/* Loading indicator for slow connections */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <div className="flex items-center space-x-2 text-white/70 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Loading OMNITRIX...</span>
            </div>
          </div>
        </div>
        
        {/* Transition Effect */}
        {showTransition && (
          <div className="absolute inset-0 bg-black animate-pulse">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-green-400/20 to-transparent
                          transform translate-x-[-100%] animate-[slideAcross_1.5s_ease-in-out]"></div>
          </div>
        )}
        
        {/* Custom CSS for transition animation */}
        <style jsx>{`
          @keyframes slideAcross {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  // Main Website Content
  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-green-400/20">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Logo/Brand - Mobile & Desktop */}
            <div className="flex items-center">
              <span className="text-green-400 text-lg sm:text-xl font-bold">OMNITRIX</span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-green-400 hover:text-green-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center justify-center flex-1 ml-8 space-x-2 lg:space-x-6">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-300 hover:text-green-400 px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-green-400/20">
              <div className="px-4 py-3 space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="block w-full text-left px-4 py-3 rounded-md text-base font-medium text-gray-300 hover:text-green-400 hover:bg-green-900/20 transition-colors duration-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
  <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-b border-green-400/20 mt-14 sm:mt-16">
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
              <span className="text-green-400 font-semibold">📢 ANNOUNCEMENTS</span>
              <span className="text-gray-300">Registration Closed!</span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="text-gray-300 hidden sm:inline">Transform ideas into reality</span>
              <span className="text-gray-400">•</span>
              <a href="https://chat.whatsapp.com/JgbMinWTnaRG30yGSJP5f0?mode=ems_share_t" className="text-blue-400 underline hover:text-blue-300">Join Whatsapp</a>
              <span className="text-gray-400 hidden md:inline">•</span>
              <a href="https://www.instagram.com/omnitrix_2025?igsh=MXVtejZzODQ5NDhwYw==" className="text-blue-400 underline hover:text-blue-300 hidden md:inline">Follow Our Page</a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - IMPROVED MOBILE LAYOUT */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 sm:px-6 lg:px-8 text-center font-mono py-8 sm:py-12">
        
        {/* Top Section - Better mobile spacing */}
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto mb-8 sm:mb-12">
          {/* Presenter Line */}
          <div className="mb-4 sm:mb-6">
  <p className="text-green-500 sm:text-lg lg:text-xl font-bold tracking-widest uppercase text-center drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
    SAHE IEEE & ACM STUDENT CHAPTERS PRESENTS
  </p>
</div>

          {/* Title with Alien Images - INCREASED SIZE */}
          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="relative flex items-center justify-center">
              {/* Left Alien - Better positioned */}
              <div className="absolute left-0 bottom-0 transform -translate-x-2 sm:-translate-x-4 translate-y-1 sm:translate-y-2">
                <img 
                  src={humong} 
                  alt="Alien Left" 
                  className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain
                           hover:scale-110 transition-transform duration-300" 
                />
              </div>
              
              {/* Title Image - Centered and MUCH LARGER */}
              <div className="px-10 sm:px-16 md:px-20 lg:px-24">
                <img 
                  src={title} 
                  alt="OMNITRIX Logo" 
                  className="w-full h-auto object-contain max-w-[320px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[750px] xl:max-w-[900px] mx-auto" 
                />
              </div>
              
              {/* Right Alien - Better positioned */}
              <div className="absolute right-0 bottom-0 transform translate-x-2 sm:translate-x-4 translate-y-1 sm:translate-y-2">
                <img 
                  src={humong} 
                  alt="Alien Right" 
                  className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain transform scale-x-[-1]
                           hover:scale-110 hover:scale-x-[-1.1] transition-transform duration-300" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Better mobile layout */}
        <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Event Info - IMPROVED MOBILE RESPONSIVENESS */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 justify-center items-stretch">
            {/* Event Date - Full width on mobile */}
            <div className="flex items-center space-x-3 text-green-400 bg-black/20 rounded-lg p-4 sm:p-5 backdrop-blur-sm border border-green-400/20 w-full lg:w-auto lg:min-w-[300px]">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="text-base sm:text-lg font-semibold text-white truncate">October 17 - 18, 2025</div>
                <div className="text-sm sm:text-base text-green-300">Event Dates</div>
              </div>
            </div>

            {/* Venue - Full width on mobile */}
            <div className="flex items-center space-x-3 text-green-400 bg-black/20 rounded-lg p-4 sm:p-5 backdrop-blur-sm border border-green-400/20 w-full lg:w-auto lg:min-w-[320px]">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="text-base sm:text-lg font-semibold text-white">Siddhartha Academy of Higher Education</div>
                <div className="text-sm sm:text-base text-green-300">Vijayawada, Andhra Pradesh</div>
              </div>
            </div>
          </div>

          {/* Quote Box - Better mobile sizing */}
          
        </div>
      </div>

      {/* Sections */}
      <div ref={Detailref}><Detail/></div>
      <div ref={Timeref}><Timeline/></div>
      <div ref={Sponsorref}><Sponsor/></div>
      <div ref={contactref}><Contact/></div>
    </div>
  );
};

export default OmnitrixWebsite;