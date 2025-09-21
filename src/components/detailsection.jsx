import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// RegisterButton component
const RegisterButton = ({ isVisible }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/form');
  };

  return (
    <button 
      onClick={handleClick}
      className={`group relative px-16 py-8 text-2xl md:text-3xl font-black tracking-wider uppercase bg-transparent border-4 border-green-400 rounded-full overflow-hidden cursor-pointer transition-all duration-700 hover:scale-110 hover:border-green-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{
        fontFamily: '"Orbitron", "Exo 2", "Rajdhani", monospace',
        boxShadow: `
          0 0 30px rgba(34, 197, 94, 0.6),
          0 0 60px rgba(34, 197, 94, 0.4),
          0 0 90px rgba(34, 197, 94, 0.2),
          inset 0 0 30px rgba(34, 197, 94, 0.1)
        `,
        animation: 'powerCorePulse 2.5s ease-in-out infinite',
        transitionDelay: '0.3s'
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = `
          0 0 50px rgba(34, 197, 94, 0.9),
          0 0 100px rgba(34, 197, 94, 0.7),
          0 0 150px rgba(34, 197, 94, 0.5),
          inset 0 0 50px rgba(34, 197, 94, 0.3)
        `;
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = `
          0 0 30px rgba(34, 197, 94, 0.6),
          0 0 60px rgba(34, 197, 94, 0.4),
          0 0 90px rgba(34, 197, 94, 0.2),
          inset 0 0 30px rgba(34, 197, 94, 0.1)
        `;
      }}>
      
      {/* Animated Background Waves */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/20 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-green-300/0 via-green-500/10 to-green-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animationDelay: '0.2s' }}></div>
      
      {/* Energy Rings */}
      <div className="absolute inset-0 rounded-full border-2 border-green-300/30 group-hover:border-green-200/50 transition-colors duration-500" style={{ animation: 'energyRing 3s linear infinite' }}></div>
      <div className="absolute inset-2 rounded-full border border-green-400/20 group-hover:border-green-300/40 transition-colors duration-500" style={{ animation: 'energyRing 3s linear infinite reverse' }}></div>
      
      {/* Scanning Lines */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-300/60 to-transparent" style={{ animation: 'scanLine 4s linear infinite' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400/40 to-transparent" style={{ animation: 'scanLine 4s linear infinite reverse', animationDelay: '2s' }}></div>
      </div>
      
      <span className="relative z-10 text-green-300 group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
        Register for Omnitrix ⚡
      </span>
    </button>
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
      icon: '⏳',
      title: '24-Hour Hackathon',
      subtitle: 'Non-stop coding marathon',
      delay: 0.8
    },
    {
      icon: '👥',
      title: '2-4 Member Teams',
      subtitle: 'Collaborative innovation',
      delay: 1.0
    },
    {
      icon: '🍔',
      title: 'Full Meals Provided',
      subtitle: 'Breakfast, lunch & snacks',
      delay: 1.2
    },
    {
      icon: '🎁',
      title: 'Certificates & Swags',
      subtitle: 'Recognition for participation',
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
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 
            className={`text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-300 mb-4 transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ 
              fontFamily: '"Orbitron", "Exo 2", "Rajdhani", monospace',
              textShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
            }}
          >
            POWER UP YOUR CODE
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
        </div>

        {/* Central Power Core - Register Button */}
        <div className="flex justify-center mb-16">
          <RegisterButton isVisible={isVisible} />
        </div>

        {/* Event Details - 2+2 Layout */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Side - First Two Items */}
            <div className="space-y-6">
              {eventDetails.slice(0, 2).map((detail, index) => (
                <div 
                  key={index}
                  className={`group relative transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`} 
                  style={{ transitionDelay: `${detail.delay}s` }}
                >
                  <div className="p-6 bg-transparent backdrop-blur-sm border border-green-400/30 rounded-xl hover:border-green-400/60 transition-all duration-500 hover:bg-green-400/5"
                       onMouseEnter={(e) => {
                         e.target.style.transform = 'translateY(-5px)';
                         e.target.style.boxShadow = '0 10px 40px rgba(34, 197, 94, 0.15)';
                       }}
                       onMouseLeave={(e) => {
                         e.target.style.transform = 'translateY(0px)';
                         e.target.style.boxShadow = 'none';
                       }}>
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{detail.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-green-300 mb-1" style={{ fontFamily: '"Orbitron", monospace' }}>
                          {detail.title}
                        </h3>
                        <p className="text-white/80 text-sm">{detail.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Last Two Items */}
            <div className="space-y-6">
              {eventDetails.slice(2, 4).map((detail, index) => (
                <div 
                  key={index + 2}
                  className={`group relative transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`} 
                  style={{ transitionDelay: `${detail.delay}s` }}
                >
                  <div className="p-6 bg-transparent backdrop-blur-sm border border-green-400/30 rounded-xl hover:border-green-400/60 transition-all duration-500 hover:bg-green-400/5"
                       onMouseEnter={(e) => {
                         e.target.style.transform = 'translateY(-5px)';
                         e.target.style.boxShadow = '0 10px 40px rgba(34, 197, 94, 0.15)';
                       }}
                       onMouseLeave={(e) => {
                         e.target.style.transform = 'translateY(0px)';
                         e.target.style.boxShadow = 'none';
                       }}>
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{detail.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-green-300 mb-1" style={{ fontFamily: '"Orbitron", monospace' }}>
                          {detail.title}
                        </h3>
                        <p className="text-white/80 text-sm">{detail.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className={`inline-block px-8 py-4 bg-green-900/20 backdrop-blur-sm rounded-full border border-green-400/30 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '1.5s' }}>
            <p className="text-green-300 font-medium text-lg">
              Ready to transform your ideas into reality? Join the ultimate coding experience! 🚀
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes powerCorePulse {
          0%, 100% { 
            box-shadow: 
              0 0 30px rgba(34, 197, 94, 0.6),
              0 0 60px rgba(34, 197, 94, 0.4),
              0 0 90px rgba(34, 197, 94, 0.2),
              inset 0 0 30px rgba(34, 197, 94, 0.1);
          }
          50% { 
            box-shadow: 
              0 0 50px rgba(34, 197, 94, 0.8),
              0 0 80px rgba(34, 197, 94, 0.6),
              0 0 120px rgba(34, 197, 94, 0.4),
              inset 0 0 50px rgba(34, 197, 94, 0.2);
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

        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;700;900&family=Rajdhani:wght@400;700&display=swap');
      `}</style>
    </div>
  );
};

export default OmnitrixRegistration;