import React, { useEffect, useRef, useState } from 'react';
import omnitrix from '../assets/omnitrix.png';

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [titleVisible, setTitleVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const observerRef = useRef();
  const timelineRef = useRef();

  useEffect(() => {
    // Page load animation
    const pageTimer = setTimeout(() => {
      setPageLoaded(true);
      setTitleVisible(true);
    }, 200);

    // Staggered card animation on page load
    const cardTimers = [];
    for (let i = 0; i < 10; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => new Set(prev).add(i));
      }, 800 + i * 150); // Staggered delay
      cardTimers.push(timer);
    }

    // Intersection Observer for scroll-based animations (only add, don't remove)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            // Add a small delay for entry animation
            setTimeout(() => {
              setVisibleItems(prev => new Set(prev).add(index));
            }, 100);
          }
          // Removed the else clause to prevent items from disappearing
        });
      },
      { 
        threshold: 0.2, 
        rootMargin: '50px 0px 50px 0px' // More generous margins
      }
    );

    return () => {
      clearTimeout(pageTimer);
      cardTimers.forEach(timer => clearTimeout(timer));
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      date: "25 Sep, 12:00 AM",
      title: "Registration Opens"
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      date: "7 Oct, 11:59 PM",
      title: "Registration Closes"
    },
   
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      date: "11 Oct, 6:00 PM",
      title: "Shortlisting Round"
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      date: "12 Oct, 9:00 AM",
      title: "Results of Shortlisting"
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      date: "12 Oct, 9:00 AM",
      title: "Payment Opens for Selected Teams"
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      date: "13 Oct, 11:59 PM",
      title: "Payment Closes"
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      date: "17 Oct, 11:00 AM",
      title: "Hackathon Starts"
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      date: "18 Oct, 11:00 AM",
      title: "Hackathon Ends"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      <style jsx>{`
        .omnitrix-rotate {
          animation: omnitrix-spin 8s linear infinite;
        }
        
        .omnitrix-rotate-reverse {
          animation: omnitrix-spin-reverse 10s linear infinite;
        }
        
        @keyframes omnitrix-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes omnitrix-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
      
      <div className="relative max-w-4xl w-full" ref={timelineRef}>
        {/* Professional Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ease-out ${
          titleVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-12 scale-95'
        }`}>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-wide">
            EVENT TIMELINE
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full shadow-lg shadow-green-400/50 animate-pulse"></div>
          <p className="text-green-400 text-xs sm:text-sm font-medium mt-4 tracking-wider uppercase">
            Hackathon Schedule & Milestones
          </p>
        </div>

        {/* Top Hub with Omnitrix Image */}
        <div className={`relative mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-6 sm:mb-8 transition-all duration-1000 ease-out ${
          pageLoaded 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-0 -rotate-180'
        }`}>
          <img 
            src={omnitrix}
            alt="Omnitrix" 
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover omnitrix-rotate"
          />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Rail */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 sm:w-1 h-full bg-gradient-to-b from-green-400 via-emerald-500 to-green-400 shadow-lg shadow-green-400/50 transition-all duration-1000 ease-out ${
            pageLoaded ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-white to-transparent rounded-full opacity-80 animate-pulse"></div>
          </div>

          {/* Timeline Events */}
          <div className="space-y-6 sm:space-y-8">
            {events.map((event, index) => (
              <div key={index} className="relative">
                {/* Event Card */}
                <div 
                  data-index={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative w-64 sm:w-72 bg-slate-900/40 backdrop-blur-md border border-green-400/30 rounded-lg p-3 sm:p-4 shadow-lg shadow-green-400/10 cursor-pointer transition-all duration-700 ease-out group ${
                    index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                  } ${
                    visibleItems.has(index) 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : `opacity-0 scale-95 ${index % 2 === 0 ? '-translate-x-96' : 'translate-x-96'}`
                  } ${
                    hoveredItem === index 
                      ? 'shadow-green-400/40 -translate-y-2 scale-105 border-green-400/60' 
                      : 'hover:shadow-green-400/30 hover:-translate-y-1 hover:scale-102 hover:border-green-400/50'
                  }`}
                  style={{
                    transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 50}ms`
                  }}
                >
                  
                  {/* Connector Line - Hidden on mobile */}
                  <div className={`hidden sm:block absolute top-1/2 transform -translate-y-1/2 h-0.5 w-6 sm:w-8 bg-gradient-to-r from-green-400 to-transparent shadow-sm shadow-green-400/50 transition-all duration-500 ${
                    index % 2 === 0 ? '-right-6 sm:-right-8' : '-left-6 sm:-left-8 rotate-180'
                  } ${
                    hoveredItem === index ? 'w-8 sm:w-12 shadow-green-400/70' : ''
                  }`}></div>

                  {/* Icon */}
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-green-400/10 border border-green-400/30 rounded-lg mb-2 sm:mb-3 text-green-400 transition-all duration-500 ${
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
                  <div className="space-y-1 sm:space-y-2">
                    <div className={`text-green-400 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                      hoveredItem === index ? 'text-emerald-300 scale-105' : ''
                    }`}>
                      {event.date}
                    </div>
                    <div className={`text-white text-xs sm:text-sm font-medium leading-relaxed transition-all duration-300 ${
                      hoveredItem === index ? 'text-gray-100 scale-105' : ''
                    }`}>
                      {event.title}
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

        {/* Bottom Hub with Omnitrix Image */}
        <div className={`relative mx-auto w-12 h-12 sm:w-16 sm:h-16 mt-6 sm:mt-8 transition-all duration-1000 ease-out ${
          pageLoaded 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-0 rotate-180'
        }`}>
          <img 
            src={omnitrix}
            alt="Omnitrix" 
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover omnitrix-rotate-reverse"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;