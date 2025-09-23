import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Detail from "./detailsection";
import Timeline from './eventtimeline';
import Sponsor from "./sponser";
import Contact from "./contact";
import title from "../assets/title.png";
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
      case 'Sponsers':
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
        console.log(`${item} section coming soon!`);
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

  const navigationItems = ['Lobby', 'ABOUT', 'Themes', 'HackTime', 'Prizes', 'Sponsers', 'FAQs', 'Contact'];

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
          
          {/* Skip Button - Enhanced Responsiveness */}
          <button
            onClick={skipVideo}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 
                     bg-black/50 hover:bg-black/70 text-white 
                     px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 
                     rounded-md sm:rounded-lg backdrop-blur-sm
                     transition-all duration-300 hover:scale-105 
                     text-xs sm:text-sm md:text-base
                     border border-green-400/30 hover:border-green-400/50
                     z-10"
          >
            <span className="hidden sm:inline">Skip Intro</span>
            <span className="sm:hidden">Skip</span>
          </button>
          
          {/* Loading indicator - Enhanced Responsiveness */}
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6">
            <div className="flex items-center space-x-1 sm:space-x-2 text-white/70 text-xs sm:text-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Loading OMNITRIX...</span>
              <span className="sm:hidden">Loading...</span>
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
      {/* Navigation Bar - Enhanced Responsiveness */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-green-400/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
            
            {/* Logo/Brand - Enhanced Mobile */}
            <div className="md:hidden flex items-center">
              <span className="text-green-400 text-base sm:text-lg font-bold tracking-wider">OMNITRIX</span>
            </div>

            {/* Mobile menu button - Enhanced */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-green-400 hover:text-green-300 p-1.5 sm:p-2 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!mobileMenuOpen ? (
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Desktop Navigation Links - Enhanced Responsiveness */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-2 lg:space-x-4 xl:space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-gray-300 hover:text-green-400 
                           px-1.5 lg:px-2 xl:px-3 py-2 
                           text-xs lg:text-sm xl:text-base font-medium 
                           transition-colors duration-200 cursor-pointer whitespace-nowrap
                           hover:bg-green-900/20 rounded-md
                           ${['HackTime'].includes(item) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={['HackTime'].includes(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Menu - Enhanced */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-md border-t border-green-400/20 rounded-b-lg">
                {navigationItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-3 py-2.5 rounded-md 
                             text-sm sm:text-base font-medium transition-all duration-200
                             ${['HackTime'].includes(item) 
                               ? 'text-gray-500 cursor-not-allowed' 
                               : 'text-gray-300 hover:text-green-400 hover:bg-green-900/20 active:bg-green-800/30'
                             }`}
                    disabled={['HackTime'].includes(item)}
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

      {/* Announcements Banner - Enhanced Responsiveness */}
      <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-b border-green-400/20 mt-12 sm:mt-14 md:mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center text-center space-y-1 sm:space-y-0">
            <div className="flex items-center">
              <span className="text-green-400 font-semibold mr-2 text-xs sm:text-sm md:text-base">ANNOUNCEMENTS</span>
              <span className="text-red-400 mr-2 text-sm sm:text-base">📢</span>
            </div>
            <div className="text-gray-300 text-xs sm:text-sm md:text-base px-2">
              <span className="block sm:inline">Registration is now open! • Transform your ideas into reality</span>
              <span className="block sm:inline mt-1 sm:mt-0">
                • Join us on Instagram{' '}
                <a href="#" className="text-blue-400 underline hover:text-blue-300 transition-colors">Follow Here</a>
                {' '}• Stay connected on LinkedIn{' '}
                <a href="#" className="text-blue-400 underline hover:text-blue-300 transition-colors">Connect</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Enhanced Responsiveness */}
      <div className="flex-1 flex flex-col items-center justify-between min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 text-center font-mono">
        
        {/* Top Section */}
        <div className="flex flex-col items-center mt-4 sm:mt-6 md:mt-8 lg:mt-12">
          {/* Presenter Line - Enhanced */}
          <p className="text-green-400 text-xs sm:text-sm md:text-base lg:text-lg 
                       font-medium tracking-wider mb-2 sm:mb-3 md:mb-4 lg:mb-6
                       px-2 py-1 bg-black/20 rounded-lg backdrop-blur-sm">
            SAHE IEEE STUDENT CHAPTERS PRESENTS
          </p>

          {/* Title Image - Enhanced Responsiveness */}
          <img 
            src={title} 
            alt="OMNITRIX Logo" 
            className="w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[320px] 
                     md:max-w-[400px] lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl
                     mx-auto h-auto object-contain mb-2 sm:mb-3 md:mb-4
                     drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]
                     hover:drop-shadow-[0_0_30px_rgba(74,222,128,0.5)] 
                     transition-all duration-300" 
          />
        </div>

        {/* Bottom Section - Event Info + Quote - Enhanced Responsiveness */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-5xl mx-auto mb-6 sm:mb-8 md:mb-12">
          {/* Event Info - Enhanced Layout */}
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-stretch lg:items-center">
            {/* Event Date - Enhanced */}
            <div className="flex items-center space-x-2 sm:space-x-3 text-green-400 
                          bg-black/20 rounded-lg p-3 sm:p-4 md:p-5 
                          backdrop-blur-sm border border-green-400/20 
                          w-full lg:w-auto lg:min-w-[280px]
                          hover:bg-black/30 hover:border-green-400/40 
                          transition-all duration-300 group">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 
                           group-hover:scale-110 transition-transform duration-300" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-left flex-1">
                <div className="text-sm sm:text-base md:text-lg font-semibold text-white">
                  October 24 - 25, 2025
                </div>
                <div className="text-xs sm:text-sm md:text-base text-green-300">Event Dates</div>
              </div>
            </div>

            {/* Venue - Enhanced */}
            <div className="flex items-center space-x-2 sm:space-x-3 text-green-400 
                          bg-black/20 rounded-lg p-3 sm:p-4 md:p-5 
                          backdrop-blur-sm border border-green-400/20 
                          w-full lg:w-auto lg:min-w-[320px]
                          hover:bg-black/30 hover:border-green-400/40 
                          transition-all duration-300 group">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 
                           group-hover:scale-110 transition-transform duration-300" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="text-left flex-1">
                <div className="text-sm sm:text-base md:text-lg font-semibold text-white">
                  Siddhartha Academy of Higher Education
                </div>
                <div className="text-xs sm:text-sm md:text-base text-green-300">
                  Vijayawada, Andhra Pradesh
                </div>
              </div>
            </div>
          </div>

          {/* Quote Box - Enhanced Responsiveness */}
          <div className="flex justify-center px-2 sm:px-4">
            <div className="bg-green-900/20 rounded-lg border border-green-400/30 backdrop-blur-sm 
                          p-4 sm:p-5 md:p-6 lg:p-8 
                          max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 
                          mx-auto w-full
                          hover:bg-green-800/30 hover:border-green-300/50 
                          hover:shadow-lg hover:shadow-green-400/20 
                          transition-all duration-300 cursor-pointer group
                          transform hover:scale-[1.02] active:scale-[0.98]">
              <p className="text-green-300 text-sm sm:text-base md:text-lg lg:text-xl 
                         font-medium text-center group-hover:text-green-200 
                         group-hover:drop-shadow-[0_0_6px_rgba(74,222,128,0.8)] 
                         leading-relaxed transition-all duration-300">
                Developers Assemble! Don't let the bugs delay you
              </p>
            </div>
          </div>
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