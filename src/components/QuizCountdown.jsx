/*import React, { useState, useEffect } from 'react';

const QuizCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isExpired, setIsExpired] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const deadline = new Date('2025-10-10T19:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        setIsExpired(true);
        return {};
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.hours, label: 'Hours', gradient: 'from-emerald-400 to-teal-500' },
    { value: timeLeft.minutes, label: 'Minutes', gradient: 'from-teal-400 to-cyan-500' },
    { value: timeLeft.seconds, label: 'Seconds', gradient: 'from-cyan-400 to-blue-500' }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">

      <div className={`relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {isExpired ? (
          <div className="text-center">
            <div className="mb-6 inline-block">
              <div className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: '"Orbitron", monospace' }}>
              Quiz Has Started!
            </h1>
            <p className="text-lg md:text-xl text-gray-300">Good luck to all participants 🎯</p>
          </div>
        ) : (
          <>
           
            <div className="text-center mb-12">
              <h1 
                className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-pulse"
                style={{ fontFamily: '"Orbitron", monospace' }}
              >
                QUIZ STARTS IN
              </h1>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            </div>

          
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12">
              {timeUnits.map((unit, index) => (
                <div 
                  key={unit.label}
                  className="group relative"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
               
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  
        
                  <div className="relative backdrop-blur-xl bg-gray-900/50 border border-green-400/30 rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-300 hover:scale-110 hover:border-green-400/60 hover:shadow-green-400/20 flex flex-col items-center justify-center min-w-[100px] md:min-w-[130px]">
                
                    <div 
                      className={`text-4xl md:text-6xl font-bold bg-gradient-to-br ${unit.gradient} bg-clip-text text-transparent mb-2 transition-all duration-300`}
                      style={{ fontFamily: '"Orbitron", monospace' }}
                    >
                      {String(unit.value || 0).padStart(2, '0')}
                    </div>
                    
                   
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-medium">
                      {unit.label}
                    </div>

                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-[-2px] bg-gradient-to-r from-green-400/0 via-green-400/50 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'shimmer 2s infinite' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

        
            <div className="text-center">
              <p className="text-lg md:text-xl text-gray-300 italic">
                "Get ready for Phase 1 transformation of Omnitrix"
              </p>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default QuizCountdown;*/
import React, { useState, useEffect } from 'react';

const OmnitrixClosed = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className={`relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center max-w-3xl mx-auto">
          {/* Success Icon with Animation */}
          <div className="mb-8 inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-400/50">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse"
            style={{ fontFamily: '"Orbitron", monospace' }}
          >
            OMNITRIX 2025
          </h1>

          {/* Divider */}
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-green-400 to-transparent mb-8"></div>

          {/* Status Message */}
          <div className="backdrop-blur-xl bg-gray-900/50 border border-green-400/30 rounded-2xl p-8 md:p-12 shadow-2xl mb-8 relative overflow-hidden group hover:border-green-400/60 transition-all duration-300">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            
            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: '"Orbitron", monospace' }}>
                Quiz Closed
              </h2>
              <p className="text-lg md:text-2xl text-gray-300 mb-6">
                Thank you for participating! 🎉
              </p>
              <p className="text-base md:text-lg text-gray-400">
                The quiz has successfully completed. We appreciate your participation and enthusiasm throughout this event.
              </p>
            </div>

            {/* Animated border shimmer */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute inset-[-2px] bg-gradient-to-r from-green-400/0 via-green-400/50 to-green-400/0 opacity-50" style={{ animation: 'shimmer 3s infinite' }}></div>
            </div>
          </div>

          {/* Team Credit */}
          <div className="space-y-4">
            <div className="inline-block backdrop-blur-xl bg-gray-900/50 border border-green-400/30 rounded-full px-8 py-4 shadow-lg hover:border-green-400/60 transition-all duration-300 hover:scale-105">
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent" style={{ fontFamily: '"Orbitron", monospace' }}>
                @Omnitrix2025
              </p>
            </div>
            <p className="text-base md:text-lg text-gray-400 mt-4">
              By Our Amazing Team ⚡
            </p>
          </div>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>

      {/* Floating particles background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&display=swap');
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.6;
          }
          75% {
            opacity: 0.3;
          }
        }

        .min-h-screen {
          min-height: 100vh;
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default OmnitrixClosed;