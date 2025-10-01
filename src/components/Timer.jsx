import React, { useState, useEffect, useRef } from 'react';

const OmnitrixStopwatch = () => {
  // Initialize state from memory or default values
  const [time, setTime] = useState(() => {
    const savedTime = window.timerState?.time;
    return savedTime !== undefined ? savedTime : 24 * 60 * 60;
  });
  const [isRunning, setIsRunning] = useState(() => {
    return window.timerState?.isRunning || false;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('');
  const intervalRef = useRef(null);
  const maxTime = 24 * 60 * 60;

  // Save state to window object whenever it changes
  useEffect(() => {
    window.timerState = {
      time,
      isRunning
    };
  }, [time, isRunning]);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  const handleStart = () => {
    if (time > 0) {
      setTransitionType('powering');
      setIsTransitioning(true);
      
      setTimeout(() => {
        setIsRunning(true);
        setIsTransitioning(false);
      }, 2000);
    }
  };

  const handleStop = () => {
    setTransitionType('pausing');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setIsRunning(false);
      setIsTransitioning(false);
    }, 2000);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(24 * 60 * 60);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(time);
  const progress = ((maxTime - time) / maxTime) * 100;

  const OmnitrixTransition = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <img 
          src="/assets/icon.jpg"
          alt="Omnitrix Icon" 
          className="w-32 h-32 object-contain animate-spin"
          style={{ animationDuration: '2s' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div 
          className="w-32 h-32 rounded-full bg-green-400/20 border-4 border-green-400"
          style={{ display: 'none' }}
        ></div>
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border border-green-300/30 animate-pulse"></div>
      </div>
      
      <div className="text-green-400 font-semibold animate-pulse text-xl" style={{ fontFamily: '"Orbitron", monospace' }}>
        {transitionType === 'powering' ? 'Powering On Omnitrix...' : 'Pausing Omnitrix...'}
      </div>
      
      <div className="text-green-300/60 text-sm" style={{ fontFamily: '"Orbitron", monospace' }}>
        {transitionType === 'powering' ? 'Activating alien transformation...' : 'Deactivating transformation...'}
      </div>
      
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col items-center justify-center relative overflow-hidden p-4">
      
      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 shadow-2xl shadow-green-400/20">
            <OmnitrixTransition />
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center space-y-8 md:space-y-12">
        
        {/* Title */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-center"
          style={{
            fontFamily: '"Orbitron", "Exo 2", monospace',
            color: 'rgb(134, 239, 172)',
            textShadow: `
              0 0 20px rgba(34, 197, 94, 0.8),
              0 0 40px rgba(34, 197, 94, 0.6),
              0 0 60px rgba(34, 197, 94, 0.4)
            `,
            animation: 'titlePulse 3s ease-in-out infinite'
          }}
        >
          OMNITRIX 2025
        </h1>

        {/* Flip Card Timer Display */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-wrap">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1 sm:gap-2">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <span className="flip-digit">{hours[0]}</span>
                </div>
              </div>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <span className="flip-digit">{hours[1]}</span>
                </div>
              </div>
            </div>
            <span className="flip-label">HRS</span>
          </div>

          {/* Separator */}
          <div className="flip-separator">:</div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1 sm:gap-2">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <span className="flip-digit">{minutes[0]}</span>
                </div>
              </div>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <span className="flip-digit">{minutes[1]}</span>
                </div>
              </div>
            </div>
            <span className="flip-label">MINS</span>
          </div>

          {/* Separator */}
          <div className="flip-separator">:</div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1 sm:gap-2">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <span className="flip-digit">{seconds[0]}</span>
                </div>
              </div>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <span className="flip-digit">{seconds[1]}</span>
                </div>
              </div>
            </div>
            <span className="flip-label">SECS</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-3xl px-4">
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 via-green-400 to-green-300 transition-all duration-1000 ease-linear"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)'
              }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center">
          <button
            onClick={isRunning ? handleStop : handleStart}
            disabled={time <= 0 || isTransitioning}
            className="control-button"
          >
            <span className="relative z-10">
              {isRunning ? 'STOP ⏹' : 'START ⏯'}
            </span>
          </button>

          <button
            onClick={handleReset}
            disabled={isTransitioning}
            className="control-button"
          >
            <span className="relative z-10">RESET ↺</span>
          </button>
        </div>

        {/* Subtitle */}
        <p 
          className="text-sm sm:text-base md:text-lg font-bold tracking-widest text-green-400/80 text-center px-4"
          style={{
            fontFamily: '"Orbitron", monospace'
          }}
        >
          24 HOUR HACKATHON TIMER
        </p>
      </div>

      {/* Custom Animations & Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@700;900&family=Rajdhani:wght@400;700&display=swap');

        .flip-card {
          width: 3.5rem;
          height: 5rem;
          perspective: 1000px;
          position: relative;
        }

        @media (min-width: 640px) {
          .flip-card {
            width: 4.5rem;
            height: 6.5rem;
          }
        }

        @media (min-width: 768px) {
          .flip-card {
            width: 5.5rem;
            height: 8rem;
          }
        }

        @media (min-width: 1024px) {
          .flip-card {
            width: 7rem;
            height: 10rem;
          }
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #1f2937 0%, #111827 50%, #0f172a 100%);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(34, 197, 94, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(34, 197, 94, 0.4);
        }

        .flip-card-inner::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(0, 0, 0, 0.6);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
        }

        .flip-digit {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 900;
          color: rgb(134, 239, 172);
          text-shadow: 
            0 0 10px rgba(34, 197, 94, 0.8),
            0 0 20px rgba(34, 197, 94, 0.6),
            0 0 30px rgba(34, 197, 94, 0.4);
          z-index: 10;
        }

        @media (min-width: 640px) {
          .flip-digit {
            font-size: 2.5rem;
          }
        }

        @media (min-width: 768px) {
          .flip-digit {
            font-size: 3.5rem;
          }
        }

        @media (min-width: 1024px) {
          .flip-digit {
            font-size: 4.5rem;
          }
        }

        .flip-separator {
          font-family: 'Orbitron', monospace;
          font-size: 3rem;
          font-weight: 900;
          color: rgb(134, 239, 172);
          text-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
          margin: 0 0.25rem;
          animation: blink 1s step-end infinite;
        }

        @media (min-width: 640px) {
          .flip-separator {
            font-size: 3.5rem;
            margin: 0 0.5rem;
          }
        }

        @media (min-width: 768px) {
          .flip-separator {
            font-size: 4.5rem;
            margin: 0 0.75rem;
          }
        }

        @media (min-width: 1024px) {
          .flip-separator {
            font-size: 6rem;
            margin: 0 1rem;
          }
        }

        .flip-label {
          font-family: 'Orbitron', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(134, 239, 172, 0.7);
          margin-top: 0.5rem;
          text-align: center;
        }

        @media (min-width: 640px) {
          .flip-label {
            font-size: 0.75rem;
          }
        }

        @media (min-width: 768px) {
          .flip-label {
            font-size: 0.875rem;
          }
        }

        @media (min-width: 1024px) {
          .flip-label {
            font-size: 1rem;
          }
        }

        .control-button {
          position: relative;
          padding: 0.75rem 2rem;
          font-family: 'Orbitron', 'Exo 2', 'Rajdhani', monospace;
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgb(134, 239, 172);
          background: transparent;
          border: 3px solid rgb(34, 197, 94);
          border-radius: 9999px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 
            0 0 20px rgba(34, 197, 94, 0.6),
            0 0 40px rgba(34, 197, 94, 0.4),
            inset 0 0 20px rgba(34, 197, 94, 0.1);
        }

        @media (min-width: 768px) {
          .control-button {
            padding: 1rem 2.5rem;
            font-size: 1.125rem;
          }
        }

        @media (min-width: 1024px) {
          .control-button {
            padding: 1.25rem 3rem;
            font-size: 1.25rem;
          }
        }

        .control-button:hover:not(:disabled) {
          transform: scale(1.05);
          border-color: rgb(134, 239, 172);
          box-shadow: 
            0 0 30px rgba(34, 197, 94, 0.9),
            0 0 60px rgba(34, 197, 94, 0.7),
            inset 0 0 30px rgba(34, 197, 94, 0.2);
        }

        .control-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .control-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, 
            rgba(34, 197, 94, 0) 0%, 
            rgba(34, 197, 94, 0.2) 50%, 
            rgba(34, 197, 94, 0) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .control-button:hover:not(:disabled)::before {
          opacity: 1;
        }

        @keyframes titlePulse {
          0%, 100% { 
            text-shadow: 
              0 0 20px rgba(34, 197, 94, 0.8),
              0 0 40px rgba(34, 197, 94, 0.6),
              0 0 60px rgba(34, 197, 94, 0.4);
          }
          50% { 
            text-shadow: 
              0 0 30px rgba(34, 197, 94, 1),
              0 0 60px rgba(34, 197, 94, 0.8),
              0 0 90px rgba(34, 197, 94, 0.6);
          }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default OmnitrixStopwatch;