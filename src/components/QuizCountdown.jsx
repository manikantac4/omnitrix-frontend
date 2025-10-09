import React, { useState, useEffect } from 'react';

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
            {/* Glowing title */}
            <div className="text-center mb-12">
              <h1 
                className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-pulse"
                style={{ fontFamily: '"Orbitron", monospace' }}
              >
                QUIZ STARTS IN
              </h1>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            </div>

            {/* Countdown cards */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12">
              {timeUnits.map((unit, index) => (
                <div 
                  key={unit.label}
                  className="group relative"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  
                  {/* Card */}
                  <div className="relative backdrop-blur-xl bg-gray-900/50 border border-green-400/30 rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-300 hover:scale-110 hover:border-green-400/60 hover:shadow-green-400/20 flex flex-col items-center justify-center min-w-[100px] md:min-w-[130px]">
                    {/* Number */}
                    <div 
                      className={`text-4xl md:text-6xl font-bold bg-gradient-to-br ${unit.gradient} bg-clip-text text-transparent mb-2 transition-all duration-300`}
                      style={{ fontFamily: '"Orbitron", monospace' }}
                    >
                      {String(unit.value || 0).padStart(2, '0')}
                    </div>
                    
                    {/* Label */}
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-medium">
                      {unit.label}
                    </div>

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-[-2px] bg-gradient-to-r from-green-400/0 via-green-400/50 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'shimmer 2s infinite' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
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

export default QuizCountdown;