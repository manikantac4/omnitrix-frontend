import React, { useState, useEffect } from 'react';
import Footer from './Footer';


const FAQComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  const handleCardFlip = (index) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const faqs = [
    {
      question: "When will the hackathon take place?",
      answer: "The hackathon will be held on 24th – 25th October 2025 (24 hrs, 11:00 AM – 11:00 AM)."
    },
    {
      question: "Where is the venue?",
      answer: "The event will be hosted at SAHE, Vijayawada – NTR."
    },
    {
      question: "How long is the hackathon?",
      answer: "It is a 24-hour hackathon spanning 2 days."
    },
    {
      question: "What is the team size?",
      answer: "Each team must consist of 2 to 4 members."
    },
    {
      question: "What is the registration fee?",
      answer: "₹500 per team for non-IEEE members and ₹400 per team for IEEE members."
    },
    {
      question: "How many tracks are there?",
      answer: "There are 7 exciting tracks to choose from."
    },
    {
      question: "What are the tracks available?",
      answer: "Web Development, Mobile App Development, AI/ML, Web3 & Blockchain, Quantum Computing, Cybersecurity, and Open Innovation."
    },
    {
      question: "Is there any prize pool?",
      answer: "Yes! The total prize pool is ₹20,000+."
    },
    {
      question: "Will food be provided?",
      answer: "Yes, food will be provided to all participants."
    },
    {
      question: "Are swags available?",
      answer: "Yes, cool swags will be given to participants."
    },
    {
      question: "Who can I contact for queries?",
      answer: "Faculty: Dr. Ch. Subba Reddy (IEEE-SMC), Dr. M. Gargi (IEEE-CIS). Students: Manoj (6281466686), Pandu (9618223350), Sahith (8341999296)."
    },
    {
      question: "Who is the convener of the event?",
      answer: "Dr. M. Suneetha (HoD, IT, VRSEC)."
    },
    {
      question: "How do I register?",
      answer: "Scan the QR code on the poster or click the registration link provided in the official communications."
    },
    {
      question: "What is the theme of the hackathon?",
      answer: "Transform yourself into a developer with Omnitrix!"
    }
  ];

  const handleBackClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={handleBackClick}
          className="flex items-center space-x-2 bg-transparent border-2 border-green-400/30 text-green-400 hover:border-green-400/60 hover:text-green-300 transition-all duration-300 px-4 py-2 rounded-lg cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      {/* Header */}
      <div className={`text-center mb-16 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
        <p className="text-green-400/80 text-lg">Everything you need to know about Omnitrix Hackathon 2025</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {faqs.map((faq, index) => (
            <div key={index} className="group perspective-1000">
              <div
                className={`relative w-full h-48 cursor-pointer transform-style-preserve-3d transition-transform duration-700 ${
                  flippedCards.has(index) ? 'rotate-y-180' : ''
                }`}
                onClick={() => handleCardFlip(index)}
                onMouseEnter={() => handleCardFlip(index)}
                onMouseLeave={() => handleCardFlip(index)}
              >
                {/* Front of Card - Question */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-transparent border-2 border-green-400/30 rounded-xl p-6 flex flex-col justify-center items-center hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                  <div className="text-green-400 mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-center text-sm leading-tight">
                    {faq.question}
                  </h3>
                  <div className="mt-4 text-xs text-green-400/60">Click to reveal answer</div>
                </div>

                {/* Back of Card - Answer */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-transparent border-2 border-green-400/60 rounded-xl p-6 flex flex-col justify-center items-center hover:border-green-400 hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300">
                  <div className="text-green-400 mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white text-center text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                  <div className="mt-4 text-xs text-green-400/60">Click to go back</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Quote Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-transparent border-2 border-green-400/30 rounded-2xl p-8 sm:p-12 text-center hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-white">
                Excellence in Innovation
              </h2>
              <blockquote className="text-lg sm:text-xl italic leading-relaxed text-gray-300">
                "Innovation distinguishes between a leader and a follower. Every great developer got there by solving problems others never solved before."
              </blockquote>
              <p className="mt-4 text-green-400 font-medium">— Inspired by Steve Jobs</p>
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="text-xl sm:text-2xl font-bold text-green-400 tracking-wider">
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

      {/* Floating dots background effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-green-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-green-500/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-green-400/25 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-green-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-green-500/30 rounded-full animate-pulse"></div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
      <Footer/>
    </div>
  );
};

export default FAQComponent;