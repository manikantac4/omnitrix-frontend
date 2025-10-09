import React, { useState, useEffect } from 'react';
import Heat from "../assets/heat1.png";

// SVG Icons Components
const ClockIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const FoodIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 8.5c0-1 0-2 1-3s2.5-1.5 3.5-1 2 .5 2.5 1.5 1 2 1 3-1 2-2 2.5-2.5.5-3.5 0-1.5-1.5-1.5-2.5z" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 21c0-2.5 0-5 0-7.5 0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5 1 2.5 2.5 0 2.5 0 5 0 7.5" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 11h10" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 21h10" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="7" r="1" fill="currentColor"/>
    <circle cx="10" cy="9" r="0.5" fill="currentColor"/>
    <circle cx="14" cy="9" r="0.5" fill="currentColor"/>
  </svg>
);

const MoneyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// RegisterButton component
const RegisterButton = ({ isVisible }) => {
  const handleClick = () => {
    window.location.href = '/quiz';
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleClick}
        className={`group relative px-8 py-4 text-lg md:text-xl font-black tracking-wider uppercase bg-transparent border-3 border-green-400 rounded-full overflow-hidden cursor-pointer transition-all duration-700 hover:scale-105 hover:border-green-300 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
        style={{
          fontFamily: '"Orbitron", "Exo 2", "Rajdhani", monospace',
          boxShadow: `
            0 0 20px rgba(34, 197, 94, 0.6),
            0 0 40px rgba(34, 197, 94, 0.4),
            0 0 60px rgba(34, 197, 94, 0.2),
            inset 0 0 20px rgba(34, 197, 94, 0.1)
          `,
          animation: "powerCorePulse 2.5s ease-in-out infinite",
          transitionDelay: "0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `
            0 0 30px rgba(34, 197, 94, 0.9),
            0 0 60px rgba(34, 197, 94, 0.7),
            0 0 90px rgba(34, 197, 94, 0.5),
            inset 0 0 30px rgba(34, 197, 94, 0.3)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `
            0 0 20px rgba(34, 197, 94, 0.6),
            0 0 40px rgba(34, 197, 94, 0.4),
            0 0 60px rgba(34, 197, 94, 0.2),
            inset 0 0 20px rgba(34, 197, 94, 0.1)
          `;
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/20 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div
          className="absolute inset-0 bg-gradient-to-l from-green-300/0 via-green-500/10 to-green-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ animationDelay: "0.2s" }}
        ></div>

        <div
          className="absolute inset-0 rounded-full border-2 border-green-300/30 group-hover:border-green-200/50 transition-colors duration-500"
          style={{ animation: "energyRing 3s linear infinite" }}
        ></div>
        <div
          className="absolute inset-2 rounded-full border border-green-400/20 group-hover:border-green-300/40 transition-colors duration-500"
          style={{ animation: "energyRing 3s linear infinite reverse" }}
        ></div>

        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-300/60 to-transparent"
            style={{ animation: "scanLine 4s linear infinite" }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/40 to-transparent"
            style={{
              animation: "scanLine 4s linear infinite reverse",
              animationDelay: "2s",
            }}
          ></div>
        </div>

        <span className="relative z-10 text-green-300 group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
          Join the Quiz
        </span>
      </button>
      <img 
        src={Heat} 
        alt="Omnitrix" 
        className="w-40 h-40 object-contain"
      />
    </div>
  );
};

// Countdown Timer Component
const CountdownTimer = ({ isVisible }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-10-17T11:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, label: 'SECONDS' }
  ];

  return (
    <div className={`transform transition-all duration-1000 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`} style={{ transitionDelay: '0.5s' }}>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-300 mb-6" style={{ fontFamily: '"Orbitron", monospace' }}>
          EVENT STARTS IN
        </h2>
        
        <div className="flex justify-center items-center space-x-4 md:space-x-8 flex-wrap gap-4">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="relative group">
              <div 
                className="bg-transparent backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] hover:border-green-300/70 transition-all duration-500"
                style={{
                  boxShadow: `
                    0 0 20px rgba(34, 197, 94, 0.3),
                    inset 0 0 20px rgba(34, 197, 94, 0.1)
                  `,
                  animation: 'timerPulse 2s ease-in-out infinite',
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="text-3xl md:text-4xl font-black text-green-300 font-mono leading-none mb-2">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm font-bold text-green-400/80 tracking-widest" style={{ fontFamily: '"Orbitron", monospace' }}>
                  {unit.label}
                </div>
              </div>
              
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-green-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-green-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-green-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-green-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main OmnitrixRegistration component
const OmnitrixRegistration = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const eventDetails = [
    {
      icon: <ClockIcon />,
      title: '24-Hour Hackathon',
      subtitle: 'Non-stop coding marathon',
      delay: 0.8
    },
    {
      icon: <UsersIcon />,
      title: '2-3 Member Teams',
      subtitle: 'Collaborative innovation',
      delay: 1.0
    },
    {
      icon: <MoneyIcon />,
      title: 'Registration Fee',
      subtitle: '₹600 per team (₹500 for IEEE/ACM - at least 1 member)',
      delay: 1.2
    },
    {
      icon: <FoodIcon />,
      title: 'Meals Provided',
      subtitle: 'Breakfast, lunch & snacks',
      delay: 1.4
    }
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden py-16 px-4">
      
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Countdown Timer */}
        <CountdownTimer isVisible={isVisible} />

        {/* Central Power Core - Register Button */}
        <div className="flex justify-center mb-16">
          <RegisterButton isVisible={isVisible} />
        </div>

        {/* Event Details - 2x2 Grid */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventDetails.map((detail, index) => (
              <div 
                key={index}
                className={`group relative transform transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`} 
                style={{ transitionDelay: `${detail.delay}s` }}
              >
                <div className="p-6 bg-transparent backdrop-blur-sm border border-green-400/30 rounded-xl hover:border-green-400/60 transition-all duration-500 hover:bg-green-400/5 h-full"
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-5px)';
                       e.currentTarget.style.boxShadow = '0 10px 40px rgba(34, 197, 94, 0.15)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0px)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}>
                  <div className="flex items-start space-x-4 h-full">
                    <div className="text-green-400 group-hover:text-green-300 transition-colors duration-300 flex-shrink-0 mt-1">{detail.icon}</div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-green-300 mb-2 leading-tight" style={{ fontFamily: '"Orbitron", monospace' }}>
                        {detail.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: '"Orbitron", monospace', fontWeight: '400' }}>
                        {detail.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className={`inline-block px-8 py-4 bg-green-900/20 backdrop-blur-sm rounded-full border border-green-400/30 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '1.8s' }}>
            <p className="text-green-300 font-medium text-lg" style={{ fontFamily: '"Orbitron", monospace', fontWeight: '500' }}>
              Ready to transform your ideas into reality? Join the ultimate coding experience! 
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Exo+2:wght@400;700;900&family=Rajdhani:wght@400;700&display=swap');

        @keyframes powerCorePulse {
          0%, 100% { 
            box-shadow: 
              0 0 20px rgba(34, 197, 94, 0.6),
              0 0 40px rgba(34, 197, 94, 0.4),
              0 0 60px rgba(34, 197, 94, 0.2),
              inset 0 0 20px rgba(34, 197, 94, 0.1);
          }
          50% { 
            box-shadow: 
              0 0 30px rgba(34, 197, 94, 0.8),
              0 0 60px rgba(34, 197, 94, 0.6),
              0 0 90px rgba(34, 197, 94, 0.4),
              inset 0 0 30px rgba(34, 197, 94, 0.2);
          }
        }

        @keyframes timerPulse {
          0%, 100% { 
            box-shadow: 
              0 0 20px rgba(34, 197, 94, 0.3),
              inset 0 0 20px rgba(34, 197, 94, 0.1);
          }
          50% { 
            box-shadow: 
              0 0 30px rgba(34, 197, 94, 0.5),
              inset 0 0 30px rgba(34, 197, 94, 0.2);
          }
        }

        @keyframes energyRing {
          0% { transform: rotate(0deg) scale(1); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: rotate(360deg) scale(1.05); opacity: 0.3; }
        }

        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default OmnitrixRegistration;