import React, { useEffect, useRef, useState } from 'react';
import omnitrix from '../assets/omnitrix.png';

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [titleVisible, setTitleVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const observerRef = useRef();
  const timelineRef = useRef();

  // Update current date/time from server (simulated here)
  useEffect(() => {
    // Fetch actual server time - replace with your backend endpoint if needed
    const updateCurrentTime = () => {
      setCurrentDate(new Date());
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pageTimer = setTimeout(() => {
      setPageLoaded(true);
      setTitleVisible(true);
    }, 200);

    const cardTimers = [];
    for (let i = 0; i < 10; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => new Set(prev).add(i));
      }, 800 + i * 150);
      cardTimers.push(timer);
    }

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
        threshold: 0.2, 
        rootMargin: '50px 0px 50px 0px'
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
      title: "Registration Opens",
      eventDate: new Date('2025-09-25')
    },
   {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      date: "9 Oct, 11:59 PM",
      title: "Registration Closes",
      eventDate: new Date('2025-10-09T00:00:00')
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      date: "10 Oct 7:00 PM",
      title: "Shortlisting Round",
      eventDate: new Date('2025-10-11T18:00:00')
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      date: "11 Oct, 8:00 AM",
      title: "Results of Shortlisting",
      eventDate: new Date('2025-10-12T09:00:00')
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      date: "11 Oct, 8:00 AM",
      title: "Payment Opens for Selected Teams",
      eventDate: new Date('2025-10-12T09:00:00')
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      date: "13 Oct, 11:59 PM",
      title: "Payment Closes",
      eventDate: new Date('2025-10-13T23:59:59')
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      date: "17 Oct, 11:00 AM",
      title: "Hackathon Starts",
      eventDate: new Date('2025-10-17T11:00:00')
    },
    {
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      date: "18 Oct, 11:00 AM",
      title: "Hackathon Ends",
      eventDate: new Date('2025-10-18T11:00:00')
    }
  ];

  const isCompleted = (eventDate) => {
    return eventDate <= currentDate;
  };

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

        .checkmark-animation {
          animation: checkmark-pop 0.6s ease-out;
        }

        @keyframes checkmark-pop {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
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
          <p className="text-gray-400 text-xs mt-2">
            Current Server Time: {currentDate.toLocaleString()}
          </p>
        </div>

        {/* Top Hub with Omnitrix Image */}
        <div className={`relative mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-6 sm:mb-8 transition-all duration-1000 ease-out ${
          pageLoaded 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-0 -rotate-180'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-0.5 shadow-lg shadow-green-400/50">
            <img 
              src={omnitrix}
              alt="Omnitrix" 
              className="w-full h-full rounded-full object-cover omnitrix-rotate"
            />
          </div>
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
            {events.map((event, index) => {
              const completed = isCompleted(event.eventDate);
              // Removed unused colorScheme variable

              return (
                <div key={index} className="relative">
                  {/* Event Card */}
                  <div 
                    data-index={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className={`relative w-64 sm:w-72 bg-slate-900/40 backdrop-blur-md border rounded-lg p-3 sm:p-4 shadow-lg cursor-pointer transition-all duration-700 ease-out group ${
                      index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                    } ${
                      visibleItems.has(index) 
                        ? 'opacity-100 translate-x-0 scale-100' 
                        : `opacity-0 scale-95 ${index % 2 === 0 ? '-translate-x-96' : 'translate-x-96'}`
                    } ${
                      hoveredItem === index 
                        ? '-translate-y-2 scale-105' 
                        : 'hover:-translate-y-1 hover:scale-102'
                    }`}
                    style={{
                      transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 50}ms`,
                      borderColor: completed ? 'rgba(239, 68, 68, 0.3)' : 'rgba(74, 222, 128, 0.3)',
                      boxShadow: completed 
                        ? '0 10px 15px -3px rgba(239, 68, 68, 0.5), 0 4px 6px -2px rgba(239, 68, 68, 0.3)' 
                        : '0 10px 15px -3px rgba(74, 222, 128, 0.1), 0 4px 6px -2px rgba(74, 222, 128, 0.05)'
                    }}
                  >
                    {/* Completed Badge */}
                    {completed && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg shadow-red-500/50 flex items-center gap-1 checkmark-animation">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span></span>
                      </div>
                    )}
                    
                    {/* Connector Line - Hidden on mobile */}
                    <div 
                      className={`hidden sm:block absolute top-1/2 transform -translate-y-1/2 h-0.5 w-6 sm:w-8 shadow-sm transition-all duration-500 ${
                        index % 2 === 0 ? '-right-6 sm:-right-8' : '-left-6 sm:-left-8 rotate-180'
                      } ${
                        hoveredItem === index ? 'w-8 sm:w-12' : ''
                      }`}
                      style={{
                        background: completed 
                          ? 'linear-gradient(to right, rgb(239, 68, 68), transparent)'
                          : 'linear-gradient(to right, rgb(74, 222, 128), transparent)',
                        boxShadow: completed
                          ? `0 0 10px rgba(239, 68, 68, 0.5)`
                          : `0 0 10px rgba(74, 222, 128, 0.5)`
                      }}
                    ></div>

                    {/* Icon */}
                    <div 
                      className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border rounded-lg mb-2 sm:mb-3 transition-all duration-500 ${
                        hoveredItem === index 
                          ? 'scale-110 rotate-12 text-white' 
                          : 'scale-100 group-hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: completed ? 'rgba(239, 68, 68, 0.1)' : 'rgba(74, 222, 128, 0.1)',
                        borderColor: completed ? 'rgba(239, 68, 68, 0.3)' : 'rgba(74, 222, 128, 0.3)',
                        color: completed ? 'rgb(248, 113, 113)' : 'rgb(74, 222, 128)'
                      }}
                    >
                      <div className={`transition-transform duration-300 ${
                        hoveredItem === index ? 'scale-110' : ''
                      }`}>
                        {event.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1 sm:space-y-2">
                      <div 
                        className={`text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                          hoveredItem === index ? 'scale-105' : ''
                        }`}
                        style={{
                          color: completed ? 'rgb(248, 113, 113)' : 'rgb(74, 222, 128)'
                        }}
                      >
                        {event.date}
                      </div>
                      <div className={`text-white text-xs sm:text-sm font-medium leading-relaxed transition-all duration-300 ${
                        hoveredItem === index ? 'text-gray-100 scale-105' : ''
                      }`}>
                        {event.title}
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div 
                      className={`absolute inset-0 rounded-lg transition-all duration-500 pointer-events-none ${
                        hoveredItem === index 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                      style={{
                        background: completed
                          ? 'linear-gradient(to right, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))'
                          : 'linear-gradient(to right, rgba(74, 222, 128, 0.2), rgba(16, 185, 129, 0.2))'
                      }}
                    ></div>

                    {/* Pulse Effect on Hover */}
                    <div 
                      className={`absolute inset-0 rounded-lg border transition-all duration-500 pointer-events-none ${
                        hoveredItem === index 
                          ? 'animate-pulse' 
                          : ''
                      }`}
                      style={{
                        borderColor: completed ? 'rgba(239, 68, 68, 0.3)' : 'rgba(74, 222, 128, 0.3)'
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
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