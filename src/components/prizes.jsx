import React, { useState, useEffect } from 'react';
import { Trophy, Award, Medal, Gift } from 'lucide-react';

const PrizesComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    const cardsTimer = setTimeout(() => setCardsVisible(true), 600);
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(cardsTimer);
    };
  }, []);

  // Inject professional animated styles
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!document.getElementById("professional-prize-styles")) {
      const professionalCSS = `
        .professional-gradient-border {
          position: relative;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 78, 59, 0.1));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(16, 185, 129, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .professional-gradient-border::before {
          content: "";
          position: absolute;
          inset: -1px;
          padding: 1px;
          background: linear-gradient(135deg, #10b981, transparent, #10b981);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .professional-gradient-border:hover::before {
          opacity: 1;
        }
        
        .professional-gradient-border:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.25);
          border-color: rgba(16, 185, 129, 0.4);
        }
        
        .prize-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(16, 185, 129, 0.2) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .winner-badge {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
        }
        
        .runner-up-badge-1 {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }
        
        .runner-up-badge-2 {
          background: linear-gradient(135deg, #10b981, #059669);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }
      `;
      
      const styleElement = document.createElement("style");
      styleElement.id = "professional-prize-styles";
      styleElement.type = "text/css";
      styleElement.appendChild(document.createTextNode(professionalCSS));
      document.head.appendChild(styleElement);
    }
  }, []);

  const prizes = [
    {
      position: 1,
      title: "Winner",
      amount: "₹15,000",
      badge: "winner-badge",
      icon: Trophy,
      description: "Grand prize winner receives cash reward, certificate of excellence, exclusive merchandise, and recognition as the champion of Omnitrix Hackathon 2025.",
      benefits: ["Cash Prize", "Certificate", "Merchandise", "Trophy", "LinkedIn Badge"]
    },
    {
      position: 2,
      title: "First Runner-Up",
      amount: "₹10,000",
      badge: "runner-up-badge-1",
      icon: Award,
      description: "First runner-up receives substantial cash reward, certificate of achievement, and exclusive merchandise package.",
      benefits: ["Cash Prize", "Certificate", "Merchandise", "Medal", "LinkedIn Badge"]
    },
    {
      position: 3,
      title: "Second Runner-Up",
      amount: "₹5,000",
      badge: "runner-up-badge-2",
      icon: Medal,
      description: "Second runner-up receives cash reward, certificate of participation, and branded merchandise.",
      benefits: ["Cash Prize", "Certificate", "Merchandise", "Recognition"]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Header Section */}
      <div className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-left transition-all duration-1000 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight italic">
              <span className="block text-white mb-2">Prize Pool &</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Recognition Awards
              </span>
            </h1>
            <div className="mt-8 flex justify-start">
              <div className="flex items-center space-x-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                <Gift className="h-4 w-4" />
                <span>Total Prize Pool: ₹30,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prizes Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {prizes.map((prize, index) => {
            const IconComponent = prize.icon;
            return (
              <div
                key={prize.position}
                className={`professional-gradient-border rounded-2xl p-6 sm:p-8 transition-all duration-700 ease-out ${
                  cardsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Position Badge */}
                <div className="mb-6 flex justify-center">
                  <div className={`${prize.badge} flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl text-white shadow-lg`}>
                    <span className="text-lg sm:text-xl font-bold">{prize.position}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-center text-xl sm:text-2xl font-bold text-white">
                  {prize.title}
                </h3>

                {/* Prize Amount */}
                <div className="prize-shimmer mb-6 rounded-lg p-4 text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400">
                    {prize.amount}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">Cash Prize</div>
                </div>

                {/* Description */}
                <p className="mb-6 text-center text-sm sm:text-base leading-relaxed text-gray-300">
                  {prize.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Inspiration Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="professional-gradient-border rounded-2xl p-8 sm:p-12 text-center">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-white">
                Excellence in Innovation
              </h2>
              <blockquote className="text-lg sm:text-xl italic leading-relaxed text-gray-300">
                "Innovation distinguishes between a leader and a follower. Every great developer got there by solving problems others never solved before."
              </blockquote>
              <p className="mt-4 text-emerald-400 font-medium">— Inspired by Steve Jobs</p>
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-wider">
                  OMNITRIX HACKATHON 2025
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Where Innovation Meets Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 h-2 w-2 animate-pulse rounded-full bg-emerald-400/30"></div>
        <div className="absolute top-1/3 right-20 h-3 w-3 animate-bounce rounded-full bg-emerald-300/20"></div>
        <div className="absolute bottom-1/3 left-1/4 h-4 w-4 animate-ping rounded-full bg-emerald-500/25"></div>
        <div className="absolute bottom-20 right-1/3 h-2 w-2 animate-pulse rounded-full bg-emerald-400/30"></div>
        <div className="absolute top-1/2 right-10 h-3 w-3 animate-bounce rounded-full bg-emerald-300/20"></div>
      </div>
    </div>
  );
};

export default PrizesComponent;
