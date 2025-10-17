import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const alienImages = [null, '👽', '🛸', '🌟', '⚡', '🔥'];

  // Configuration
  const TIMER_DURATION = 24 * 60 * 60; // 10 hours 50 minutes in seconds
  const START_TIME_KEY = 'omnitrix_start_time';
  const TIMER_STARTED_KEY = 'omnitrix_timer_started';
  const CHECKED_CHECKPOINTS_KEY = 'omnitrix_checked_checkpoints';

  const [time, setTime] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [currentAlarm, setCurrentAlarm] = useState(null);
  const [checkedCheckpoints, setCheckedCheckpoints] = useState(new Set());
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const intervalRef = useRef(null);
  const checkpointCheckRef = useRef(null);

  // Generate 10 checkpoints evenly distributed
  const checkpoints = React.useMemo(() => {
    const points = [];
    const totalMinutes = TIMER_DURATION / 60;
    const intervalMinutes = totalMinutes / 10;
    
    for (let i = 1; i <= 10; i++) {
      const minutesFromStart = Math.floor(intervalMinutes * i);
      const alienIndex = (i % 5) + 1;
      points.push({
        id: i,
        minutesFromStart,
        message: `Checkpoint ${i}/10 - Keep going, champion! 🎯`,
        alien: alienIndex
      });
    }
    
    return points;
  }, [TIMER_DURATION]);

  // Initialize timer from storage
  useEffect(() => {
    const savedStartTime = localStorage.getItem(START_TIME_KEY);
    const timerStarted = localStorage.getItem(TIMER_STARTED_KEY);
    const savedCheckpoints = localStorage.getItem(CHECKED_CHECKPOINTS_KEY);
    
    if (savedStartTime && timerStarted === 'true') {
      const start = parseInt(savedStartTime);
      setStartTime(start);
      setIsRunning(true);
      
      // Restore checked checkpoints
      if (savedCheckpoints) {
        setCheckedCheckpoints(new Set(JSON.parse(savedCheckpoints)));
      }
      
      // Calculate current time remaining
      const now = Date.now();
      const elapsed = Math.floor((now - start) / 1000);
      const remaining = Math.max(0, TIMER_DURATION - elapsed);
      setTime(remaining);
      
      // If timer completed, reset
      if (remaining === 0) {
        handleTimerComplete();
      }
    }
  }, [TIMER_DURATION]);

  // Save checked checkpoints to localStorage
  useEffect(() => {
    if (checkedCheckpoints.size > 0) {
      localStorage.setItem(CHECKED_CHECKPOINTS_KEY, JSON.stringify([...checkedCheckpoints]));
    }
  }, [checkedCheckpoints]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    localStorage.removeItem(START_TIME_KEY);
    localStorage.removeItem(TIMER_STARTED_KEY);
    localStorage.removeItem(CHECKED_CHECKPOINTS_KEY);
    setCheckedCheckpoints(new Set());
  };

  const handleReset = () => {
    // Stop timer
    setIsRunning(false);
    setTime(TIMER_DURATION);
    setStartTime(null);
    
    // Clear intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (checkpointCheckRef.current) {
      clearInterval(checkpointCheckRef.current);
    }
    
    // Clear localStorage
    localStorage.removeItem(START_TIME_KEY);
    localStorage.removeItem(TIMER_STARTED_KEY);
    localStorage.removeItem(CHECKED_CHECKPOINTS_KEY);
    
    // Reset checkpoints
    setCheckedCheckpoints(new Set());
    
    // Clear any active alarms
    setShowAlarm(false);
    setCurrentAlarm(null);
  };

  // Timer countdown
  useEffect(() => {
    if (isRunning && startTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        const remaining = Math.max(0, TIMER_DURATION - elapsed);
        
        setTime(remaining);
        
        if (remaining === 0) {
          handleTimerComplete();
        }
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isRunning, startTime, TIMER_DURATION]);

  // Audio enablement
  useEffect(() => {
    const enableAudio = () => {
      if (!audioEnabled) {
        setAudioEnabled(true);
      }
    };

    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      window.addEventListener(event, enableAudio);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, enableAudio);
      });
    };
  }, [audioEnabled]);

  // Checkpoint checking
  useEffect(() => {
    if (!isRunning || !startTime) return;

    const checkCheckpoints = () => {
      const now = Date.now();
      const elapsedMinutes = Math.floor((now - startTime) / 1000 / 60);

      checkpoints.forEach((checkpoint) => {
        const checkpointKey = `checkpoint-${checkpoint.id}`;
        
        // Check if we've reached this checkpoint (within 1 minute window)
        if (
          Math.abs(elapsedMinutes - checkpoint.minutesFromStart) <= 1 &&
          !checkedCheckpoints.has(checkpointKey)
        ) {
          triggerAlarm(checkpoint);
          setCheckedCheckpoints(prev => {
            const newSet = new Set(prev);
            newSet.add(checkpointKey);
            return newSet;
          });
        }
      });
    };

    checkCheckpoints();
    checkpointCheckRef.current = setInterval(checkCheckpoints, 30000);

    return () => {
      if (checkpointCheckRef.current) {
        clearInterval(checkpointCheckRef.current);
      }
    };
  }, [isRunning, startTime, checkedCheckpoints, checkpoints]);

  const triggerAlarm = (checkpoint) => {
    setCurrentAlarm(checkpoint);
    setShowAlarm(true);

    // Play sound effect
    if (audioEnabled) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (e) {
        console.log('Audio not supported');
      }
    }

    setTimeout(() => {
      setShowAlarm(false);
      setTimeout(() => {
        setCurrentAlarm(null);
      }, 600);
    }, 8000);
  };

  const handleStart = () => {
    if (time > 0 && !isRunning) {
      setTransitionType('powering');
      setIsTransitioning(true);
      
      setTimeout(() => {
        setIsTransitioning(false);
        setShowCelebration(true);
        
        setTimeout(() => {
          setShowCelebration(false);
          
          const now = Date.now();
          setStartTime(now);
          setIsRunning(true);
          localStorage.setItem(START_TIME_KEY, now.toString());
          localStorage.setItem(TIMER_STARTED_KEY, 'true');
        }, 5000);
      }, 2000);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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

  const OmnitrixTransition = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-green-400/20 border-4 border-green-400 animate-spin" style={{ animationDuration: '2s' }}>
          <div className="absolute inset-0 flex items-center justify-center text-6xl">⌚</div>
        </div>
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

  const CelebrationAnimation = () => (
    <div className="celebration-overlay">
      <div className="celebration-frame">
        {[...Array(150)].map((_, i) => {
          const randomX = Math.random() * 400 - 200;
          const randomRotate = Math.random() * 1080;
          return (
            <div
              key={`confetti-${i}`}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
                '--random-x': randomX,
                '--random-rotate': randomRotate,
              }}
            />
          );
        })}
        {[...Array(100)].map((_, i) => {
          const midX = Math.random() * 100 - 50;
          const endX = Math.random() * 200 - 100;
          const midRotate = Math.random() * 180;
          const endRotate = Math.random() * 720;
          return (
            <div
              key={`petal-${i}`}
              className="petal"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2.4}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                '--mid-x': midX,
                '--end-x': endX,
                '--mid-rotate': midRotate,
                '--end-rotate': endRotate,
              }}
            />
          );
        })}
        {[...Array(60)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2 className="success-title">OMNITRIX ACTIVATED!</h2>
          <p className="success-subtitle">Timer Started Successfully</p>
        </div>
      </div>
    </div>
  );

  const HoneycombTransition = () => (
    <div className="honeycomb-container">
      {[...Array(60)].map((_, i) => (
        <div key={i} className="hexagon" style={{ animationDelay: `${Math.random() * 0.5}s` }} />
      ))}
    </div>
  );

  const AlienNotification = () => {
    if (!currentAlarm) return null;

    return (
      <div className={`alien-notification ${showAlarm ? 'show' : 'hide'}`}>
        <HoneycombTransition />
        <div className="alien-content-wrapper">
          <div className="alien-left-section">
            <div className="alien-image-container">
              <div className="alien-emoji">{alienImages[currentAlarm.alien]}</div>
            </div>
          </div>

          <div className="alien-right-section">
            <div className="notification-header">
              <div className="notification-icon">🔔</div>
              <h2 className="notification-title">CHECKPOINT REACHED!</h2>
            </div>

            <div className="notification-body">
              <div className="checkpoint-display">Checkpoint {currentAlarm.id}/10</div>
              <p className="notification-message">{currentAlarm.message}</p>
            </div>

            {!audioEnabled && (
              <div className="audio-tip">Click anywhere to enable sound notifications</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col items-center justify-center relative p-4 overflow-hidden">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#34d399', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      
      {currentAlarm && <AlienNotification />}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 shadow-2xl shadow-green-400/20">
            <OmnitrixTransition />
          </div>
        </div>
      )}

      {showCelebration && <CelebrationAnimation />}

      <div className={`main-timer-container ${showAlarm ? 'hide-timer' : ''}`}>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-center mb-12"
          style={{
            fontFamily: '"Orbitron", monospace',
            color: '#ffffff',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
          }}
        >
          OMNITRIX 2025
        </h1>
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 flex-wrap">
            <div className="flex flex-col items-center">
              <div className="circular-timer">
                <svg className="circular-progress" viewBox="0 0 120 120">
                  <circle className="circular-bg" cx="60" cy="60" r="54" />
                  <circle
                    className="circular-progress-bar"
                    cx="60" cy="60" r="54"
                    style={{
                      strokeDashoffset: 339.292 - (339.292 * (parseInt(hours) / Math.floor(TIMER_DURATION / 3600)))
                    }}
                  />
                </svg>
                <div className="circular-value">{hours}</div>
              </div>
              <span className="circular-label">HOURS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="circular-timer">
                <svg className="circular-progress" viewBox="0 0 120 120">
                  <circle className="circular-bg" cx="60" cy="60" r="54" />
                  <circle
                    className="circular-progress-bar"
                    cx="60" cy="60" r="54"
                    style={{
                      strokeDashoffset: 339.292 - (339.292 * (parseInt(minutes) / 60))
                    }}
                  />
                </svg>
                <div className="circular-value">{minutes}</div>
              </div>
              <span className="circular-label">MINUTES</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="circular-timer">
                <svg className="circular-progress" viewBox="0 0 120 120">
                  <circle className="circular-bg" cx="60" cy="60" r="54" />
                  <circle
                    className="circular-progress-bar"
                    cx="60" cy="60" r="54"
                    style={{
                      strokeDashoffset: 339.292 - (339.292 * (parseInt(seconds) / 60))
                    }}
                  />
                </svg>
                <div className="circular-value">{seconds}</div>
              </div>
              <span className="circular-label">SECONDS</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-center" style={{ marginTop: '3rem' }}>
          {!isRunning && (
            <button
              onClick={handleStart}
              disabled={time <= 0 || isTransitioning || isRunning}
              className="control-button-small"
            >
              Start Timer
            </button>
          )}
          {isRunning && (
            <div className="status-indicator">
              <span className="status-dot"></span>
              Timer Running
            </div>
          )}
          {!isRunning && (
            <button
              onClick={handleReset}
              disabled={isTransitioning}
              className="control-button-small reset-button"
            >
              Reset
            </button>
          )}
        </div>
        
        {startTime && (
          <div className="timer-info">
            <p className="info-text">Started: {new Date(startTime).toLocaleString()}</p>
            <p className="info-text">Ends: {new Date(startTime + TIMER_DURATION * 1000).toLocaleString()}</p>
          </div>
        )}
      </div>

      <button onClick={toggleFullscreen} className="fullscreen-button">
        {isFullscreen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        )}
      </button>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Roboto:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .min-h-screen {
          min-height: 100vh;
        }

        .celebration-overlay {
          position: fixed;
          inset: 0;
          z-index: 60;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: celebrationFadeIn 0.5s ease-out;
        }

        @keyframes celebrationFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .celebration-frame {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          animation: frameZoom 1.5s ease-out;
        }

        @keyframes frameZoom {
          0% { transform: scale(3); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1); }
        }

        .confetti {
          position: absolute;
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          top: -20px;
          animation: confettiFall ease-out forwards;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(74, 222, 128, 0.8);
          will-change: transform, opacity;
        }

        @keyframes confettiFall {
          0% { top: -20px; transform: translateX(0) rotate(0deg); opacity: 1; }
          100% { top: 120%; transform: translateX(calc(var(--random-x, 0) * 1px)) rotate(calc(var(--random-rotate, 0) * 1deg)); opacity: 0; }
        }

        .petal {
          position: absolute;
          width: 18px;
          height: 18px;
          background: radial-gradient(circle, #4ade80, #22c55e);
          top: -30px;
          animation: petalFall ease-out forwards;
          border-radius: 50% 0 50% 0;
          box-shadow: 0 0 15px rgba(74, 222, 128, 0.9);
          opacity: 0.95;
          will-change: transform, opacity;
        }

        @keyframes petalFall {
          0% { top: -30px; transform: translateX(0) translateY(0) rotate(0deg) scale(1); opacity: 0.95; }
          50% { transform: translateX(calc(var(--mid-x, 0) * 1px)) translateY(50vh) rotate(calc(var(--mid-rotate, 0) * 1deg)) scale(1.2); }
          100% { top: 120%; transform: translateX(calc(var(--end-x, 0) * 1px)) translateY(100vh) rotate(calc(var(--end-rotate, 0) * 1deg)) scale(0.8); opacity: 0; }
        }

        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #4ade80;
          border-radius: 50%;
          animation: sparkleAnimation 1.5s ease-in-out infinite;
          box-shadow: 0 0 12px rgba(74, 222, 128, 1);
        }

        @keyframes sparkleAnimation {
          0%, 100% { transform: scale(0); opacity: 0; }
          50% { transform: scale(2); opacity: 1; }
        }

        .success-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          animation: successZoom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 1s backwards;
          z-index: 10;
        }

        @keyframes successZoom {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .success-icon {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          color: white;
          font-weight: bold;
          box-shadow: 0 0 40px rgba(74, 222, 128, 0.8), 0 0 80px rgba(74, 222, 128, 0.4);
          animation: successPulse 1.5s ease-in-out infinite;
        }

        @keyframes successPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(74, 222, 128, 0.8), 0 0 80px rgba(74, 222, 128, 0.4); }
          50% { transform: scale(1.1); box-shadow: 0 0 60px rgba(74, 222, 128, 1), 0 0 100px rgba(74, 222, 128, 0.6); }
        }

        .success-title {
          font-family: 'Orbitron', monospace;
          font-size: 3.5rem;
          font-weight: 700;
          color: #4ade80;
          text-align: center;
          letter-spacing: 0.1em;
          text-shadow: 0 0 30px rgba(74, 222, 128, 0.8);
          animation: textGlow 1.5s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 30px rgba(74, 222, 128, 0.8); }
          50% { text-shadow: 0 0 50px rgba(74, 222, 128, 1), 0 0 70px rgba(74, 222, 128, 0.6); }
        }

        .success-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
        }

        @media (max-width: 768px) {
          .success-icon { width: 80px; height: 80px; font-size: 2.5rem; }
          .success-title { font-size: 2rem; }
          .success-subtitle { font-size: 1.125rem; }
        }

        .main-timer-container {
          width: 100%;
          max-width: 1792px;
          margin: 0 auto;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          gap: 2rem;
          transition: all 0.6s ease;
        }

        .hide-timer {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.6s ease, visibility 0.6s ease;
        }

        .circular-timer {
          position: relative;
          width: 100px;
          height: 100px;
        }

        @media (min-width: 640px) {
          .circular-timer { width: 120px; height: 120px; }
        }

        @media (min-width: 768px) {
          .circular-timer { width: 140px; height: 140px; }
        }

        @media (min-width: 1024px) {
          .circular-timer { width: 160px; height: 160px; }
        }

        .circular-progress {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .circular-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 8;
        }

        .circular-progress-bar {
          fill: none;
          stroke: url(#gradient);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 339.292;
          transition: stroke-dashoffset 1s linear;
        }

        .circular-value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        @media (min-width: 640px) {
          .circular-value { font-size: 2.25rem; }
        }

        @media (min-width: 768px) {
          .circular-value { font-size: 2.5rem; }
        }

        @media (min-width: 1024px) {
          .circular-value { font-size: 3rem; }
        }

        .circular-label {
          font-family: 'Orbitron', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 1rem;
          text-align: center;
          text-transform: uppercase;
        }

        @media (min-width: 640px) {
          .circular-label { font-size: 0.875rem; }
        }

        @media (min-width: 1024px) {
          .circular-label { font-size: 1rem; }
        }

        .control-button-small {
          position: relative;
          padding: 1rem 2.5rem;
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .control-button-small:hover:not(:disabled) {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .control-button-small:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reset-button {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .reset-button:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.6);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 600;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.1);
          border: 2px solid rgba(74, 222, 128, 0.3);
          border-radius: 9999px;
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { border-color: rgba(74, 222, 128, 0.3); }
          50% { border-color: rgba(74, 222, 128, 0.6); }
        }

        .status-dot {
          width: 10px;
          height: 10px;
          background: #4ade80;
          border-radius: 50%;
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .timer-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
          margin-top: 2rem;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .fullscreen-button {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          cursor: pointer;
          backdrop-filter: blur(5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          z-index: 50;
        }
        
        .fullscreen-button:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .honeycomb-container {
          position: fixed;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-template-rows: repeat(6, 1fr);
          gap: 4px;
          z-index: 1;
          pointer-events: none;
        }

        .hexagon {
          background: rgba(74, 222, 128, 0.3);
          clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
          animation: hexagonFade 0.6s ease-out forwards;
          border: 1px solid rgba(74, 222, 128, 0.5);
        }

        @keyframes hexagonFade {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1); }
        }

        .alien-notification {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          transition: opacity 0.6s ease;
        }

        .alien-notification.show {
          animation: notificationShow 0.8s ease-out forwards;
        }

        .alien-notification.hide {
          animation: notificationHide 0.6s ease-out forwards;
        }

        @keyframes notificationShow {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes notificationHide {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        .alien-content-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 6rem;
          width: 100vw;
          height: 100vh;
          padding: 4rem;
          background: transparent;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 1024px) {
          .alien-content-wrapper {
            flex-direction: column;
            gap: 3rem;
            padding: 3rem 2rem;
          }
        }

        @media (max-width: 640px) {
          .alien-content-wrapper {
            gap: 2rem;
            padding: 2rem 1.5rem;
          }
        }

        .alien-left-section {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 50%;
        }

        @media (max-width: 1024px) {
          .alien-left-section {
            max-width: 100%;
          }
        }

        .alien-right-section {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 3rem;
          max-width: 600px;
        }

        @media (max-width: 1024px) {
          .alien-right-section {
            max-width: 100%;
            gap: 2rem;
            align-items: center;
            text-align: center;
          }
        }

        .alien-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .alien-emoji {
          font-size: 20rem;
          filter: drop-shadow(0 0 40px rgba(74, 222, 128, 0.5));
          animation: alienFloat 3s ease-in-out infinite;
        }

        @keyframes alienFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 1024px) {
          .alien-emoji {
            font-size: 12rem;
          }
        }

        @media (max-width: 640px) {
          .alien-emoji {
            font-size: 8rem;
          }
        }

        .notification-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
        }

        @media (max-width: 1024px) {
          .notification-header {
            align-items: center;
          }
        }

        .notification-icon {
          font-size: 4rem;
          animation: bellRing 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(74, 222, 128, 0.6));
        }

        @media (max-width: 640px) {
          .notification-icon {
            font-size: 3rem;
          }
        }

        @keyframes bellRing {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-15deg); }
          20% { transform: rotate(15deg); }
          30% { transform: rotate(-10deg); }
          40% { transform: rotate(10deg); }
          50% { transform: rotate(0deg); }
        }

        .notification-title {
          font-family: 'Roboto', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #4ade80;
          line-height: 1.2;
          letter-spacing: 0.02em;
          margin: 0;
          text-shadow: 0 0 20px rgba(74, 222, 128, 0.6);
        }

        @media (max-width: 1024px) {
          .notification-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 640px) {
          .notification-title {
            font-size: 1.5rem;
          }
        }

        .notification-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
        }

        @media (max-width: 1024px) {
          .notification-body {
            align-items: center;
          }
        }

        .checkpoint-display {
          font-family: 'Orbitron', monospace;
          font-size: 3rem;
          font-weight: 700;
          color: #4ade80;
          letter-spacing: 0.1em;
          text-shadow: 0 0 30px rgba(74, 222, 128, 0.7);
        }

        @media (max-width: 1024px) {
          .checkpoint-display {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .checkpoint-display {
            font-size: 2rem;
          }
        }

        .notification-message {
          font-family: 'Roboto', sans-serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .notification-message {
            font-size: 1.125rem;
          }
        }

        @media (max-width: 640px) {
          .notification-message {
            font-size: 1rem;
          }
        }

        .audio-tip {
          padding: 0.875rem 1.5rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(74, 222, 128, 0.9);
          background: rgba(74, 222, 128, 0.1);
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: 8px;
          animation: subtlePulse 2s ease-in-out infinite;
        }

        @keyframes subtlePulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Timer;