import React, { useEffect, useRef, useState } from 'react';
import car from '../assets/car.jpg';
import center from '../assets/center.jpg';

const HackTime = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [titleVisible, setTitleVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [carPosition, setCarPosition] = useState(0);
  const [carDirection, setCarDirection] = useState(1); // 1 for down, -1 for up
  const [isMobile, setIsMobile] = useState(false);
  const observerRef = useRef();
  const timelineRef = useRef();

  // Back button handler
  const handleBackClick = () => {
    window.location.href = '/';
  };

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Page load animation
    const pageTimer = setTimeout(() => {
      setPageLoaded(true);
      setTitleVisible(true);
    }, 200);

    // Staggered card animation on page load
    const cardTimers = [];
    for (let i = 0; i < 12; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => new Set(prev).add(i));
      }, 800 + i * (isMobile ? 100 : 150)); // Faster on mobile
      cardTimers.push(timer);
    }

    // Intersection Observer for scroll-based animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set(prev).add(index));
            }, 100);
          }
        });
      },
      { 
        threshold: isMobile ? 0.1 : 0.2, 
        rootMargin: isMobile ? '20px 0px 20px 0px' : '50px 0px 50px 0px'
      }
    );

    return () => {
      clearTimeout(pageTimer);
      cardTimers.forEach(timer => clearTimeout(timer));
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMobile]);

  // Car animation logic
  useEffect(() => {
    const animateCar = () => {
      setCarPosition(prev => {
        const maxPosition = 100;
        let newPosition = prev + (carDirection * (isMobile ? 0.15 : 0.2));

        if (newPosition >= maxPosition) {
          setCarDirection(-1);
          newPosition = maxPosition;
        } else if (newPosition <= 0) {
          setCarDirection(1);
          newPosition = 0;
        }

        return newPosition;
      });
    };

    const carInterval = setInterval(animateCar, 50);
    return () => clearInterval(carInterval);
  }, [carDirection, isMobile]);

  useEffect(() => {
    const cards = document.querySelectorAll('[data-index]');
    cards.forEach(card => {
      if (observerRef.current) {
        observerRef.current.observe(card);
      }
    });

    return () => {
      cards.forEach(card => {
        if (observerRef.current) {
          observerRef.current.unobserve(card);
        }
      });
    };
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const events = [
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      time: "9:00 AM",
      title: "Assemble",
      day: "17th Oct (Morning)"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      time: "9:30 AM",
      title: "Kickoff",
      day: "Event Launch"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      time: "10:30 AM",
      title: "Sit Up",
      day: "Team Setup"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      time: "11:00 AM",
      title: "Verification Complete & Hackathon Starts",
      day: "Official Start"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
      ),
      time: "1:30 PM",
      title: "Lunch Break",
      day: "Meal Time"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-8h2m0 0h2m-2 0v8m2-8a2 2 0 012 2v6a2 2 0 01-2 2h-2m-2 0h2m0 0h2" />
        </svg>
      ),
      time: "4:30 PM",
      title: "Round 1 Submission (Idea Presentation)",
      day: "First Evaluation"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.704 2.704 0 003 15.546V6.454c.523 0 1.046-.151 1.5-.454a2.704 2.704 0 013 0c.848.53 1.971.53 2.819 0a2.704 2.704 0 013 0c.848.53 1.971.53 2.819 0a2.704 2.704 0 013 0A2.704 2.704 0 0021 6.454v9.092z" />
        </svg>
      ),
      time: "6:00 PM",
      title: "Snacks",
      day: "Evening Refreshments"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      time: "9:00 PM",
      title: "Dinner",
      day: "Night Meal"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      time: "12:00 AM",
      title: "Round 2 Evaluation (Progress Check)",
      day: "Midnight Review"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      time: "1:00 AM",
      title: "Midnight Refreshments",
      day: "After 2nd Evaluation"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
      ),
      time: "7:00 AM",
      title: "Round 3 Evaluation Submission",
      day: "18th Oct (Morning)"
    },
    {
      icon: (
        <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      time: "8:00 AM - 9:00 AM",
      title: "Tiffin & Final Round",
      day: "Morning Meal & Finals"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-2 xs:p-3 sm:p-4 lg:p-8 overflow-hidden">
      {/* Back Button */}
      <div className="w-full max-w-7xl mb-4 xs:mb-6 sm:mb-8">
        <button
          onClick={handleBackClick}
          className="flex items-center space-x-2 bg-transparent border-2 border-green-400/30 text-green-400 hover:border-green-400/60 hover:text-green-300 transition-all duration-300 px-3 xs:px-4 py-2 rounded-lg cursor-pointer text-sm xs:text-base"
        >
          <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      <div className="relative max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full" ref={timelineRef}>
        {/* Professional Header */}
        <div className={`text-center mb-6 xs:mb-8 sm:mb-12 transition-all duration-1000 ease-out ${
          titleVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-12 scale-95'
        }`}>
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 xs:mb-4 tracking-wide leading-tight">
            24-HOUR HACKATHON SCHEDULE
          </h1>
          <div className="w-12 xs:w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full shadow-lg shadow-green-400/50 animate-pulse"></div>
          <p className="text-green-400 text-xs sm:text-sm md:text-base font-medium mt-2 xs:mt-4 tracking-wider uppercase">
            17th Oct 9:00 AM - 18th Oct 11:00 AM
          </p>
        </div>

        {/* Top Hub with Custom Icon */}
        <div className={`relative mx-auto w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-4 xs:mb-6 sm:mb-8 transition-all duration-1000 ease-out ${
          pageLoaded 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-0 -rotate-180'
        }`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-green-400 shadow-lg shadow-green-400/50 overflow-hidden animate-spin" style={{ animationDuration: '4s' }}>
            <img 
              src={center}
              alt="Hub Icon" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Road Timeline */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 xs:w-8 sm:w-10 md:w-12 h-full bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 shadow-lg transition-all duration-1000 ease-out ${
            pageLoaded ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}>
            {/* Road surface texture */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-500 opacity-60"></div>
            
            {/* Road center line */}
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-0.5 xs:w-1 h-full bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-400 opacity-80">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-200 to-transparent animate-pulse"></div>
            </div>
            
            {/* Road edges */}
            <div className="absolute left-0 top-0 w-px h-full bg-white/20"></div>
            <div className="absolute right-0 top-0 w-px h-full bg-white/20"></div>
          </div>

          {/* Moving Car */}
          <div 
            className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ease-out ${
              pageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              top: `${carPosition}%`,
              transform: `translateX(-50%) translateY(-50%) ${carDirection === -1 ? 'rotate(180deg)' : 'rotate(0deg)'}`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="relative w-4 h-6 xs:w-6 xs:h-8 sm:w-8 sm:h-10 md:w-10 md:h-12">
              <img 
                src={car}
                alt="Moving Car" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Timeline Events */}
          <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8">
            {events.map((event, index) => (
              <div key={index} className="relative">
                {/* Event Card */}
                <div 
                  data-index={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative w-52 xs:w-60 sm:w-64 md:w-72 lg:w-80 bg-slate-900/40 backdrop-blur-md border border-green-400/30 rounded-lg p-2 xs:p-3 sm:p-4 shadow-lg shadow-green-400/10 cursor-pointer transition-all duration-700 ease-out group ${
                    index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                  } ${
                    visibleItems.has(index) 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : `opacity-0 scale-95 ${index % 2 === 0 ? '-translate-x-32 xs:-translate-x-48 sm:-translate-x-96' : 'translate-x-32 xs:translate-x-48 sm:translate-x-96'}`
                  } ${
                    hoveredItem === index 
                      ? 'shadow-green-400/40 -translate-y-2 scale-105 border-green-400/60' 
                      : 'hover:shadow-green-400/30 hover:-translate-y-1 hover:scale-102 hover:border-green-400/50'
                  }`}
                  style={{
                    transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 50}ms`
                  }}
                >
                  
                  {/* Road Connector - Hidden on mobile, visible on larger screens */}
                  <div className={`hidden sm:block absolute top-1/2 transform -translate-y-1/2 h-0.5 xs:h-1 w-6 xs:w-8 sm:w-12 md:w-16 bg-gradient-to-r from-slate-600 to-slate-500 shadow-sm transition-all duration-500 ${
                    index % 2 === 0 ? '-right-6 xs:-right-8 sm:-right-12 md:-right-16' : '-left-6 xs:-left-8 sm:-left-12 md:-left-16 rotate-180'
                  } ${
                    hoveredItem === index ? 'w-8 xs:w-10 sm:w-16 md:w-20 shadow-slate-400/70 from-slate-500 to-slate-400' : ''
                  }`}>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-0.5 bg-yellow-400/60"></div>
                  </div>

                  {/* Icon */}
                  <div className={`flex items-center justify-center w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-green-400/10 border border-green-400/30 rounded-lg mb-2 xs:mb-3 text-green-400 transition-all duration-500 ${
                    hoveredItem === index 
                      ? 'bg-green-400/30 border-green-400/60 scale-110 rotate-12 text-white' 
                      : 'group-hover:bg-green-400/20 group-hover:border-green-400/50 group-hover:scale-105'
                  }`}>
                    <div className={`transition-transform duration-300 ${
                      hoveredItem === index ? 'scale-110' : ''
                    }`}>
                      {event.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-1 xs:space-y-2">
                    <div className={`text-green-400 text-xs sm:text-sm md:text-base font-bold tracking-wide transition-all duration-300 ${
                      hoveredItem === index ? 'text-emerald-300 scale-105' : ''
                    }`}>
                      {event.time}
                    </div>
                    <div className={`text-white text-xs sm:text-sm md:text-base font-medium leading-relaxed transition-all duration-300 ${
                      hoveredItem === index ? 'text-gray-100 scale-105' : ''
                    }`}>
                      {event.title}
                    </div>
                    <div className={`text-green-300/70 text-xs md:text-sm font-light italic transition-all duration-300 ${
                      hoveredItem === index ? 'text-green-200 scale-105' : ''
                    }`}>
                      {event.day}
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/5 to-emerald-500/5 transition-all duration-500 pointer-events-none ${
                    hoveredItem === index 
                      ? 'opacity-100 from-green-400/20 to-emerald-500/20' 
                      : 'opacity-0 group-hover:opacity-100'
                  }`}></div>

                  {/* Pulse Effect on Hover */}
                  <div className={`absolute inset-0 rounded-lg border border-green-400/30 transition-all duration-500 pointer-events-none ${
                    hoveredItem === index 
                      ? 'animate-pulse border-green-400/60 scale-105' 
                      : ''
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Winners Announcement - Special Bottom Card */}
        <div className={`relative mx-auto mt-6 xs:mt-8 sm:mt-12 transition-all duration-1000 ease-out ${
          pageLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
        }`}>
          <div className="relative w-64 xs:w-72 sm:w-80 md:w-96 mx-auto bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-400/50 rounded-xl p-3 xs:p-4 sm:p-6 shadow-2xl shadow-yellow-400/20">
            {/* Trophy Icon */}
            <div className="flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-yellow-400/20 border border-yellow-400/50 rounded-full mb-3 xs:mb-4 mx-auto text-yellow-400">
              <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            
            <div className="text-center">
              <div className="text-yellow-400 text-xs xs:text-sm sm:text-base md:text-lg font-bold mb-1 xs:mb-2">11:00 AM</div>
              <div className="text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1">🏆 WINNERS ANNOUNCEMENT 🏆</div>
              <div className="text-yellow-300/70 text-xs xs:text-sm md:text-base font-light">Final Results & Awards Ceremony</div>
            </div>
          </div>
        </div>

        {/* Bottom Hub with Custom Icon */}
        <div className={`relative mx-auto w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mt-4 xs:mt-6 sm:mt-8 transition-all duration-1000 ease-out ${
          pageLoaded 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-0 rotate-180'
        }`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 border-2 border-green-400 shadow-lg shadow-green-400/50 overflow-hidden animate-spin" style={{ animationDuration: '4s' }}>
            <img 
              src={center} 
              alt="Hub Icon" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Floating particles for ambiance - Reduced on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-0.5 h-0.5 xs:w-1 xs:h-1 bg-green-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackTime;