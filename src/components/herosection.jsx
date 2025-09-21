import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Detail from "./detailsection";
import Timeline from './eventtimeline';
import Theme from "./Themes";
import Sponsor from "./sponser";
import Contact from "./contact";

const OmnitrixWebsite = () => {
  const navigate = useNavigate();
  const Detailref = useRef(null);
  const Timeref = useRef(null);
  const Themeref = useRef(null);
  const Sponsorref = useRef(null);
  const contactref = useRef(null);

  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Handle navigation clicks
  const handleNavClick = (item) => {
    switch(item) {
      case 'ABOUT':
        scrollToSection(Detailref);
        break;
      case 'Themes':
        scrollToSection(Themeref);
        break;
      case 'Sponsers':
        scrollToSection(Sponsorref);
        break;
      case 'Contact':
        scrollToSection(contactref);
        break;
      case 'HackTime':
      case 'Prizes':
      case 'FAQs':
        // These are null/not implemented yet
        console.log(`${item} section coming soon!`);
        break;
      case 'Lobby':
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Navigation Bar with Inner Border */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-green-400/20 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-green-400/10 rounded-lg mx-2 mt-1 mb-1" 
             style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.1)'}}>
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-green-400 hover:text-green-300 p-2 border border-green-400/20 rounded-md"
                      style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.1)'}}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
              {['Lobby', 'ABOUT', 'Themes', 'HackTime', 'Prizes', 'Sponsers', 'FAQs', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors duration-200 border border-transparent hover:border-green-400/20 rounded-md hover:shadow-inner cursor-pointer ${
                    ['HackTime', 'FAQs'].includes(item) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!['HackTime', 'FAQs'].includes(item)) {
                      e.target.style.boxShadow = 'inset 0 0 0 1px rgba(34, 197, 94, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                  disabled={['HackTime', 'FAQs'].includes(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            
            {/* Right side icons with inner borders */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full border border-green-400"
                   style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.3)'}}></div>
              <div className="w-8 h-8 bg-purple-500/20 rounded-full border border-purple-400"
                   style={{boxShadow: 'inset 0 0 0 1px rgba(168, 85, 247, 0.3)'}}></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Announcements Banner with Inner Border */}
      <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-b border-green-400/20 mt-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 py-3 border border-green-400/10 rounded-lg mx-2"
             style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.1)'}}>
          <div className="flex items-center justify-center text-center">
            <span className="text-green-400 font-semibold mr-2">ANNOUNCEMENTS</span>
            <span className="text-red-400 mr-2">📢</span>
            <span className="text-gray-300 text-sm">
              Registration is now open! • Transform your ideas into reality • Join us on Instagram{' '}
              <a href="#" className="text-blue-400 underline hover:text-blue-300 px-1 rounded border-transparent hover:border-blue-400/20 border transition-all duration-200"
                 style={{transition: 'all 0.2s ease'}}
                 onMouseEnter={(e) => {
                   e.target.style.boxShadow = 'inset 0 0 0 1px rgba(59, 130, 246, 0.2)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.boxShadow = 'none';
                 }}>Follow Here</a> • Stay connected on LinkedIn too!{' '}
              <a href="#" className="text-blue-400 underline hover:text-blue-300 px-1 rounded border-transparent hover:border-blue-400/20 border transition-all duration-200"
                 style={{transition: 'all 0.2s ease'}}
                 onMouseEnter={(e) => {
                   e.target.style.boxShadow = 'inset 0 0 0 1px rgba(59, 130, 246, 0.2)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.boxShadow = 'none';
                 }}>Connect</a>
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="max-w-7xl mx-auto w-full border border-green-400/10 rounded-2xl p-8"
             style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.05), 0 0 0 1px rgba(34, 197, 94, 0.1)'}}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Large OMNITRIX Logo */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="text-center lg:text-left border border-green-400/10 rounded-xl p-6"
                   style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.05)'}}>
                {/* Large OMNITRIX Text */}
                <h1 className="text-8xl lg:text-9xl xl:text-[10rem] font-black text-white leading-none tracking-tight">
                  <span className="block transform -rotate-12 origin-center">OMNI</span>
                  <span className="block transform rotate-6 origin-center -mt-4">TRIX</span>
                </h1>
                
                {/* Decorative Elements */}
                <div className="flex items-center justify-center lg:justify-start mt-6 space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/30 border-2 border-green-400 flex items-center justify-center"
                       style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.4)'}}>
                    <div className="w-6 h-6 rounded-full bg-green-400 animate-pulse border border-green-300"
                         style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.6)'}}></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-500/30 border-2 border-red-400"
                       style={{boxShadow: 'inset 0 0 0 1px rgba(239, 68, 68, 0.4)'}}></div>
                </div>
              </div>
            </div>

            {/* Right Side - Event Information */}
            <div className="text-center lg:text-left space-y-8 border border-green-400/10 rounded-xl p-6"
                 style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.05)'}}>
              {/* Main Title */}
              <h2 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300 mb-6">
                OMNITRIX 2025
              </h2>
              
              {/* Description */}
              <div className="border border-green-400/10 rounded-lg p-4"
                   style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.05)'}}>
                <p className="text-gray-300 text-lg lg:text-xl leading-relaxed max-w-lg">
                  OMNITRIX is here to bring you an electrifying tech event! Connect, collaborate, and celebrate 
                  with excitement and a spirit of learning. Who will be the ultimate developer to take the win? 
                  Join us to find out!
                </p>
              </div>
              
              {/* Event Details */}
              <div className="space-y-3 text-gray-400 border border-green-400/10 rounded-lg p-4"
                   style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.05)'}}>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <span className="text-lg font-semibold">October 24 - 25, 2025</span>
                  <span className="text-green-400">•</span>
                  <span className="text-base">IEEE Club of IT Dept</span>
                </div>
                <div className="text-base text-center lg:text-left">
                  VR Siddhartha Engineering College, Vijayawada
                </div>
              </div>
              
              {/* Bottom Tagline */}
              <div className="mt-8 p-4 bg-green-900/20 rounded-lg border border-green-400/30"
                   style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.2), inset 0 0 0 2px rgba(34, 197, 94, 0.1)'}}>
                <p className="text-green-300 text-center font-medium">
                  Developers Assemble! Don't let the bugs delay you 🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-green-400/30 rounded-full animate-ping border border-green-400/50"
             style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.4)'}}></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-green-300/20 rounded-full animate-bounce border border-green-300/40"
             style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.3)'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-green-500/40 rounded-full animate-pulse border border-green-500/60"
             style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.5)'}}></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-green-400/25 rounded-full animate-ping border border-green-400/45"
             style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.4)'}}></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400/30 rounded-full animate-pulse border border-green-400/50"
             style={{boxShadow: 'inset 0 0 0 1px rgba(34, 197, 94, 0.4)'}}></div>
      </div>
      
      <div ref={Detailref}>
        <Detail/>
      </div>
      <div ref={Timeref}>
        <Timeline/>
      </div>
      <div ref={Themeref}>
        <Theme/>
      </div>
      <div ref={Sponsorref}>
        <Sponsor/>
      </div>
      <div ref={contactref}>
        <Contact/>
      </div>
    </div>
  );
};

export default OmnitrixWebsite;