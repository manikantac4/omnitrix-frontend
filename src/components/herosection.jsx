import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Detail from "./detailsection";
import Timeline from './eventtimeline';
import Sponsor from "./sponser";
import Contact from "./contact";
import title from "../assets/title.png";

const OmnitrixWebsite = () => {
  const navigate = useNavigate();
  const Detailref = useRef(null);
  const Timeref = useRef(null);
  const Sponsorref = useRef(null);
  const contactref = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleNavClick = (item) => {
    switch(item) {
      case 'ABOUT':
        scrollToSection(Detailref);
        break;
      case 'Themes':
        navigate('/theme');
        break;
      case 'Sponsers':
        scrollToSection(Sponsorref);
        break;
      case 'Contact':
        scrollToSection(contactref);
        break;
      case 'Prizes':
        navigate('/prize');
        break;
      case 'FAQs':
        navigate('/faq');
        break;
      case 'HackTime':
        console.log(`${item} section coming soon!`);
        break;
      case 'Lobby':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-green-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-green-400 hover:text-green-300 p-2">
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
                  className={`text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    ['HackTime'].includes(item) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={['HackTime'].includes(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Announcements Banner */}
      <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-b border-green-400/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center text-center">
            <span className="text-green-400 font-semibold mr-2">ANNOUNCEMENTS</span>
            <span className="text-red-400 mr-2">📢</span>
            <span className="text-gray-300 text-sm">
              Registration is now open! • Transform your ideas into reality • Join us on Instagram{' '}
              <a href="#" className="text-blue-400 underline hover:text-blue-300">Follow Here</a> • Stay connected on LinkedIn too!{' '}
              <a href="#" className="text-blue-400 underline hover:text-blue-300">Connect</a>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-between min-h-screen px-4 text-center font-mono">
        
        {/* Top Section */}
        <div className="flex flex-col items-center mt-8">
          {/* Presenter Line */}
          <p className="text-green-400 text-xs sm:text-sm font-medium tracking-wider mb-2">
            SAHE IEEE STUDENT CHAPTERS PRESENTS
          </p>

          {/* Title Image */}
          <img 
            src={title} 
            alt="OMNITRIX Logo" 
            className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-xl mx-auto h-auto object-contain mb-2" 
          />
        </div>

        {/* Bottom Section - Event Info + Quote */}
        <div className="space-y-8 w-full max-w-2xl mx-auto mb-12">
          {/* Event Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Event Date */}
            <div className="flex items-center space-x-2 text-green-400">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-sm font-semibold text-white">October 24 - 25, 2025</div>
                <div className="text-xs text-green-300">Event Dates</div>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center space-x-2 text-green-400">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="text-sm font-semibold text-white">Siddhartha Academy of Higher Education</div>
                <div className="text-xs text-green-300">Vijayawada, Andhra Pradesh</div>
              </div>
            </div>
          </div>

          {/* Quote Box */}
          <div className="flex justify-center">
            <div className="bg-green-900/20 rounded-lg border border-green-400/30 backdrop-blur-sm p-4 max-w-md mx-auto
                          hover:bg-green-800/30 hover:border-green-300/50 hover:shadow-lg hover:shadow-green-400/20 
                          transition-all duration-300 cursor-pointer group">
              <p className="text-green-300 text-sm font-medium text-center group-hover:text-green-200 
                           group-hover:drop-shadow-[0_0_6px_rgba(74,222,128,0.8)]">
                Developers Assemble! Don't let the bugs delay you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections remain same */}
      <div ref={Detailref}><Detail/></div>
      <div ref={Timeref}><Timeline/></div>
      <div ref={Sponsorref}><Sponsor/></div>
      <div ref={contactref}><Contact/></div>
    </div>
  );
};

export default OmnitrixWebsite;