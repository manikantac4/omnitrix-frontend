import React, { useState, useEffect } from 'react';
import alien1 from '../assets/manoj.jpg';
import alien2 from '../assets/sahith.jpg';
import alien3 from '../assets/pandu.jpg';
import alien4 from '../assets/bharath.jpg';
import alien5 from '../assets/pavan.jpg';
import alien6 from '../assets/anand.jpg';
import alien7 from '../assets/ratna.jpg';
import alien8 from '../assets/praveen.jpg';
import alien9 from '../assets/yagnesh.jpg'
// import alien6 from '../assets/alien6.jpg';
// import alien7 from '../assets/alien7.jpg';
// import alien8 from '../assets/alien8.jpg';
// import alien9 from '../assets/alien9.jpg';
// import alien10 from '../assets/alien10.jpg';

// TO ADD NEW IMAGES:
// 1. Uncomment the import line above or add a new one
// 2. Add the imported variable to the images array below
// 3. The component will automatically create a frame for it!

const Gallery = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Array of imported images - Add new images here
  const images = [
    alien1,
    alien2,
    alien3,
    alien4,
    alien5,
    alien6,
    alien7,
    alien8,
    alien9,
  ].filter(img => img); // Filter out undefined images

  useEffect(() => {
    const timer = setTimeout(() => {
      images.forEach((_, index) => {
        setTimeout(() => {
          setLoadedImages(prev => new Set([...prev, index]));
        }, index * 100);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fadeIn">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
          style={{ fontFamily: '"Orbitron", monospace' }}
        >
          OMNITRIX 2025
        </h1>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-green-400 to-transparent mb-6"></div>
        <p className="text-lg md:text-xl text-gray-300">
          Event Gallery & Memories
        </p>
      </div>

      {/* Gallery Grid - Masonry Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 break-inside-avoid mb-3 ${
                loadedImages.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-slate-900/40 border border-green-400/30 shadow-lg transition-all duration-500 hover:scale-105 hover:border-green-400/60 hover:shadow-2xl hover:shadow-green-400/20">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-300 ease-in-out"
                    style={{ display: 'block' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div
                    className="bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center"
                    style={{ display: 'none', minHeight: '300px' }}
                  >
                    <svg className="w-16 h-16 text-green-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Image number badge */}
                <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  {index + 1}
                </div>

                {/* Animated border shimmer */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-[-2px] bg-gradient-to-r from-green-400/0 via-green-400/50 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'shimmer 2s infinite' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if no images */}
        {images.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-green-400/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-400 text-lg">No images available yet</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&display=swap');

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Gallery;