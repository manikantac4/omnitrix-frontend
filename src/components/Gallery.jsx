import React, { useState, useEffect } from 'react';

import image1 from '../assets/i1.JPG';
import image2 from '../assets/i2.JPG';
import image3 from '../assets/i3.JPG';
import image4 from '../assets/i4.JPG';
import image5 from '../assets/i5.JPG';
import image6 from '../assets/i6.JPG';
import image7 from '../assets/i7.JPG';
import image8 from '../assets/i8.JPG';
import image9 from '../assets/i9.JPG';
import image10 from '../assets/i10.JPG';
import image11 from '../assets/i11.JPG';
import image12 from '../assets/i12.JPG';
import image13 from '../assets/i13.JPG';
import image14 from '../assets/i14.JPG';
import image15 from '../assets/i15.JPG';
import image16 from '../assets/i16.JPG';
import image17 from '../assets/i17.JPG';
import image18 from '../assets/i18.JPG';
import image19 from '../assets/i19.JPG';
import image20 from '../assets/i20.JPG';
import image21 from '../assets/i21.JPG';
import image22 from '../assets/i22.JPG';
import image23 from '../assets/i23.JPG';
import image24 from '../assets/i24.JPG';
import image25 from '../assets/i25.JPG';
import image26 from '../assets/i26.JPG';
import image27 from '../assets/i27.JPG';
import image28 from '../assets/i28.JPG';
import image29 from '../assets/i29.JPG';
import image30 from '../assets/i30.JPG'; 
import image31 from '../assets/i31.JPG';
import image32 from '../assets/i32.JPG';
import image33 from '../assets/i33.JPG';
import image34 from '../assets/i34.JPG';
import image35 from '../assets/i35.JPG';
import image36 from '../assets/i36.JPG';
import image37 from '../assets/i37.JPG';
import image38 from '../assets/i38.JPG';
import image39 from '../assets/i39.JPG';
import image40 from '../assets/i40.JPG';
import image41 from '../assets/i41.JPG';
import image42 from '../assets/i42.JPG';
import image43 from '../assets/i43.JPG';
import image44 from '../assets/i44.JPG';
import image45 from '../assets/i45.JPG';
import image46 from '../assets/i46.JPG';
import image47 from '../assets/i47.JPG';
import image48 from '../assets/i48.JPG';
import image49 from '../assets/i49.JPG';
import image50 from '../assets/i50.JPG';
import image51 from '../assets/i51.JPG';
import image52 from '../assets/i52.JPG';
import image53 from '../assets/i53.JPG';
import image54 from '../assets/i54.JPG';
import image55 from '../assets/i55.JPG';
import image56 from '../assets/i56.JPG';  
import image57 from '../assets/i57.JPG';
import image58 from '../assets/i58.JPG';
import image59 from '../assets/i59.JPG';
import image60 from '../assets/i60.JPG';  
import image61 from '../assets/i61.JPG';
import image62 from '../assets/i62.JPG';
import image63 from '../assets/i63.JPG';
import image64 from '../assets/i64.JPG';
import image65 from '../assets/i65.JPG';
import image66 from '../assets/i66.JPG';
import image67 from '../assets/i67.JPG';
import image68 from '../assets/i68.JPG';
import image69 from '../assets/i69.JPG';
import image70 from '../assets/i70.JPG';
import image71 from '../assets/i71.JPG';
import image72 from '../assets/i72.JPG';
import image73 from '../assets/i73.JPG';
import image74 from '../assets/i74.JPG';
import image75 from '../assets/i75.JPG';
import image76 from '../assets/i76.JPG';
import image77 from '../assets/i77.JPG';
import image78 from '../assets/i78.JPG';
import image79 from '../assets/i79.JPG';
import image80 from '../assets/i80.JPG';
import image81 from '../assets/i81.JPG';
import image82 from '../assets/i82.JPG';
import image83 from '../assets/i83.JPG';
import image84 from '../assets/i84.JPG';
import image85 from '../assets/i85.JPG';
import image86 from '../assets/i86.JPG';
import image87 from '../assets/i87.JPG';
import image88 from '../assets/i88.JPG';
import image89 from '../assets/i89.JPG';
import image90 from '../assets/i90.JPG';
import image91 from '../assets/i91.JPG';
import image92 from '../assets/i92.JPG';
import image93 from '../assets/i93.JPG';
import image94 from '../assets/i94.JPG';
import image95 from '../assets/i95.JPG';
import image96 from '../assets/i96.JPG';  
import image97 from '../assets/i97.JPG';
import image98 from '../assets/i98.JPG';
import image99 from '../assets/i99.JPG';
import image100 from '../assets/i100.JPG';
import image101 from '../assets/i101.JPG';
import image102 from '../assets/i102.JPG';
import image103 from '../assets/i103.JPG';
import image104 from '../assets/i104.JPG';
import image105 from '../assets/i105.JPG';
import image106 from '../assets/i106.JPG';
import image107 from '../assets/i107.JPG';

const Gallery = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Array of imported images - Add new images here
  const images = [
    
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
    image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
    image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
    image31, image32, image33, image34, image35, image36, image37, image38, image39, image40,
    image41, image42, image43, image44, image45, image46, image47, image48, image49, image50,
    image51, image52, image53, image54, image55, image56, image57, image58, image59, image60, 
    image61, image62, image63, image64, image65, image66, image67, image68, image69, image70,
    image71, image72, image73, image74, image75, image76, image77, image78, image79, image80,
    image81, image82, image83, image84, image85, image86, image87, image88, image89, image90,
    image91, image92, image93, image94, image95, image96, image97, image98, image99, image100,
    image101, image102, image103, image104, image105, image106, image107
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
    <div className="min-h-screen bg-transparent py-8 px-3 sm:px-4 lg:px-6">
      {/* Header */}
      <div className="text-center mb-8 animate-fadeIn">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
          style={{ fontFamily: '"Orbitron", monospace' }}
        >
          OMNITRIX 2025
        </h1>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-green-400 to-transparent mb-4"></div>
        <p className="text-base md:text-lg text-gray-300">
          Event Gallery & Memories
        </p>
      </div>

      {/* Gallery Grid - Masonry Layout */}
      <div className="max-w-6xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 break-inside-avoid mb-2 ${
                loadedImages.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-slate-900/40 border border-green-400/30 shadow-lg">
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