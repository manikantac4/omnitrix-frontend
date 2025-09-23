import React, { useState, useRef, useEffect } from 'react';
import webImg from "../assets/fourarms.png";
import Blockimg from "../assets/block.jpg";
import Quantumimg from "../assets/quantum.png";
import Appimg from "../assets/app.png";
import Openimg from "../assets/open.png";
import Cybimg from "../assets/cyber.jpg";
import Aimlimg from "../assets/AIML.png";
import humoungImg from "../assets/way.png";
import titleImg from "../assets/foot.png";

const TRACKS = [
    { id: 'aiml', title: 'Artificial Intelligence & Machine Learning', tag: 'Intelligent systems & automation', description: 'Develop AI-powered solutions using cutting-edge machine learning algorithms, neural networks, and deep learning frameworks. Create intelligent systems that can learn, adapt, and provide meaningful insights from complex data patterns.', imageAlt: 'AI and Machine Learning', imageSrc: Aimlimg},
    { id: 'cybersecurity', title: 'Cybersecurity & Digital Defense', tag: 'Protecting digital infrastructure', description: 'Create robust security solutions to protect digital assets, networks, and sensitive information. Build innovative tools for threat detection, vulnerability assessment, and cyber defense mechanisms.', imageAlt: 'Cybersecurity and digital protection', imageSrc: Cybimg },
    { id: 'quantum', title: 'Quantum Computing Solutions', tag: 'Next-generation computational power', description: 'Harness quantum computing principles to solve complex computational problems. Explore quantum algorithms, quantum machine learning, and quantum cryptography applications.', imageAlt: 'Quantum computing visualization', imageSrc: Quantumimg },
    { id: 'webdev', title: 'Full-Stack Web Development', tag: 'Building the future of web', description: 'Create innovative web applications using modern frameworks and technologies. Build responsive, scalable, and user-friendly web solutions that address real-world problems.', imageAlt: 'Modern web development interface', imageSrc: webImg },
    { id: 'web3', title: 'Web3 & Blockchain Innovation', tag: 'Decentralized future technologies', description: 'Build decentralized applications using blockchain technology, smart contracts, and cryptocurrency protocols. Create solutions for DeFi, NFTs, and decentralized governance systems.', imageAlt: 'Blockchain and web3 technology', imageSrc: Blockimg },
    { id: 'appdev', title: 'Mobile Application Development', tag: 'Native & cross-platform excellence', description: 'Develop high-performance mobile applications for iOS and Android platforms. Create engaging user experiences with native functionality and cross-platform compatibility.', imageAlt: 'Mobile app development', imageSrc: Appimg},
    { id: 'openinnovation', title: 'Open Innovation Challenge', tag: 'Creative solutions for global problems', description: 'This track allows maximum creativity and impact. Choose your own problem statement and create innovative solutions that can make a real difference in the world.', imageAlt: 'Innovation and creativity', imageSrc: Openimg}
];

// Social Media Icons Components
const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
  </svg>
);

export default function HackathonTracksPanel() {
  // Always start with first track (index 0)
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [titleVisible, setTitleVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const listRef = useRef(null);

  // Reset to clean state on component mount
  useEffect(() => {
    setActiveIndex(0);
    setQuery('');
    setMobileMenuOpen(false);
    
    // Title animation
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  const filtered = TRACKS.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) || 
    t.tag.toLowerCase().includes(query.toLowerCase())
  );

  const active = filtered[activeIndex] || TRACKS[0];

  useEffect(() => {
    const node = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    if (node) node.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  const handlePrev = () => setActiveIndex(i => Math.max(0, i - 1));
  const handleNext = () => setActiveIndex(i => Math.min(filtered.length - 1, i + 1));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'j') setActiveIndex(i => Math.min(filtered.length - 1, i + 1));
      if (e.key === 'k') setActiveIndex(i => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered.length]);

  return (
    <div className="min-h-screen bg-transparent text-gray-100 font-mono">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-wide">HACKATHON THEMES</h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full shadow-lg shadow-green-400/50"></div>
          <p className="text-green-400 text-xs sm:text-sm font-medium mt-4 tracking-wider uppercase">Choose Your Innovation Path</p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-full">
          {/* Mobile Track Selector */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between p-3 border-2 border-green-400/30 rounded-lg hover:border-green-400/60 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-green-400/50">T</div>
                <div className="text-left">
                  <div className="text-sm text-white font-semibold">{active.title}</div>
                  <div className="text-xs text-green-400">{activeIndex + 1} of {filtered.length} tracks</div>
                </div>
              </div>
              <div className="text-green-400">
                {mobileMenuOpen ? '▲' : '▼'}
              </div>
            </button>
            
            {mobileMenuOpen && (
              <div className="mt-2 border-2 border-green-400/30 rounded-lg hover:border-green-400/60 transition-all duration-300 p-4">
                <label className="relative block mb-3">
                  <span className="sr-only">Search tracks</span>
                  <input
                    className="w-full rounded-md border border-green-400/30 bg-transparent backdrop-blur-sm px-3 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400/50 transition-all text-sm"
                    placeholder="Search tracks..."
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                    aria-label="Search tracks"
                  />
                  {query && (
                    <button onClick={() => { setQuery(''); setActiveIndex(0); }} className="absolute right-2 top-2 text-sm text-green-400 hover:text-emerald-300 transition-colors">✕</button>
                  )}
                </label>

                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-auto">
                  {filtered.length ? filtered.map((t, idx) => {
                    const isActive = active.id === t.id;
                    return (
                      <button key={t.id} onClick={() => { setActiveIndex(idx); setMobileMenuOpen(false); }}
                        className={`text-left p-2 border-2 border-green-400/20 rounded-lg transition-all duration-300 ${
                          isActive ? 'bg-green-400/20 text-white border-green-400/60' :
                          'bg-transparent hover:bg-green-400/10 hover:border-green-400/40'
                        }`}>
                        <div className="font-semibold text-xs">{t.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{t.tag}</div>
                      </button>
                    );
                  }) : (
                    <div className="p-2 text-xs text-gray-400 text-center border-2 border-green-400/20 rounded-lg bg-transparent">
                      No tracks match your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Left Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-80 xl:w-96 border-2 border-green-400/30 rounded-xl p-4 hover:border-green-400/60 transition-all duration-300 h-fit">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-black font-bold shadow-lg shadow-green-400/50">T</div>
              <div className="flex-1">
                <div className="text-sm text-green-400 font-semibold">Tracks</div>
                <div className="text-xs text-gray-400">Use ← → or j/k to navigate</div>
              </div>
              <div className="flex gap-2">
                <button onClick={handlePrev} disabled={activeIndex === 0} className="p-2 rounded bg-green-400 text-black hover:bg-emerald-500 hover:scale-105 transition font-bold shadow-lg shadow-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed">◀</button>
                <button onClick={handleNext} disabled={activeIndex === filtered.length - 1} className="p-2 rounded bg-green-400 text-black hover:bg-emerald-500 hover:scale-105 transition font-bold shadow-lg shadow-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed">▶</button>
              </div>
            </div>

            <label className="relative block mb-4">
              <span className="sr-only">Search tracks</span>
              <input
                className="w-full border-2 border-green-400/30 rounded-md px-3 py-2 bg-transparent placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400/50 transition-all"
                placeholder="Search tracks..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                aria-label="Search tracks"
              />
              {query && (
                <button onClick={() => { setQuery(''); setActiveIndex(0); }} className="absolute right-2 top-2 text-sm text-green-400 hover:text-emerald-300 transition-colors">✕</button>
              )}
            </label>

            <nav ref={listRef} className="space-y-2 max-h-[calc(100vh-300px)] overflow-auto pr-2" aria-label="Track list"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(34, 197, 94, 0.5) transparent'
              }}>
              <style jsx>{`
                nav::-webkit-scrollbar {
                  width: 6px;
                }
                nav::-webkit-scrollbar-track {
                  background: transparent;
                }
                nav::-webkit-scrollbar-thumb {
                  background: rgba(34, 197, 94, 0.5);
                  border-radius: 3px;
                }
                nav::-webkit-scrollbar-thumb:hover {
                  background: rgba(34, 197, 94, 0.7);
                }
              `}</style>
              {filtered.length ? filtered.map((t, idx) => {
                const isActive = active.id === t.id;
                return (
                  <button key={t.id} data-index={idx} onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-3 border-2 border-green-400/20 rounded-lg transition-all duration-300 transform ${
                      isActive ? 'bg-green-400/20 text-white border-green-400/60 scale-105' :
                      'bg-transparent hover:bg-green-400/10 hover:border-green-400/40 hover:scale-[1.02]'
                    }`} aria-current={isActive ? 'true' : 'false'}>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm">{t.title}</div>
                      <div className="text-xs text-green-400 font-mono">{t.id.toUpperCase()}</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 line-clamp-1">{t.tag}</div>
                  </button>
                );
              }) : (
                <div className="p-3 text-sm text-gray-400 text-center border-2 border-green-400/20 rounded-lg bg-transparent">
                  No tracks match your search.
                </div>
              )}
            </nav>
          </aside>

          {/* Main Content - Fills remaining space */}
          <main className="flex-1 border-2 border-green-400/30 rounded-xl p-4 sm:p-6 hover:border-green-400/60 transition-all duration-300 lg:min-h-[calc(100vh-200px)]">
            
            {/* Mobile Navigation Controls */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <button onClick={handlePrev} disabled={activeIndex === 0} className="p-2 rounded bg-green-400 text-black hover:bg-emerald-500 hover:scale-105 transition font-bold shadow-lg shadow-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed">◀</button>
              <div className="text-sm text-gray-400 bg-transparent px-3 py-1 rounded-full border border-green-400/20">
                Track {activeIndex + 1} / {filtered.length}
              </div>
              <button onClick={handleNext} disabled={activeIndex === filtered.length - 1} className="p-2 rounded bg-green-400 text-black hover:bg-emerald-500 hover:scale-105 transition font-bold shadow-lg shadow-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed">▶</button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-full">
              {/* Image */}
              <div className="w-full lg:w-1/2 rounded-lg overflow-hidden border border-green-400/30 bg-transparent shadow-lg shadow-green-400/10">
                <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[520px] flex items-center justify-center">
                  <img src={active.imageSrc} alt={active.imageAlt} className="w-full h-full object-cover rounded-lg"/>
                </div>
              </div>

              {/* Details */}
              <section className="w-full lg:w-1/2 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">{active.title}</h1>
                    <p className="text-xs sm:text-sm text-green-400 mt-1 font-medium">{active.tag}</p>
                  </div>
                  <div className="hidden lg:block text-sm text-gray-400 bg-transparent px-3 py-1 rounded-full border border-green-400/20 whitespace-nowrap">
                    Track {activeIndex + 1} / {filtered.length}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 text-gray-200 leading-relaxed flex-1">
                  <p className="text-sm sm:text-base mb-4">{active.description}</p>

                  {active.id === 'openinnovation' ? (
                    <div className="mt-4 p-3 sm:p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                        </svg>
                        <span className="text-green-400 font-semibold text-sm sm:text-base">Special Track</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300">
                        You can select and submit your own problem statement when the shortlisting criteria starts. 
                        This track offers maximum flexibility and creative freedom.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 sm:p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-emerald-400 font-semibold text-sm">Important Notice</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300">
                        Problem statements will be released on <strong className="text-emerald-400">10 Oct, 12:00 AM</strong>. 
                        Stay tuned for detailed challenge descriptions and requirements.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Original Footer */}
            <div className="mt-6 sm:mt-8 pt-4 border-t border-green-400/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-400">
                <span className="hidden sm:block">Use keyboard arrows for quick navigation. Responsive design optimized.</span>
                <span className="sm:hidden">Swipe or use navigation buttons above</span>
                <span className="text-green-400">Hackathon Track Selection Portal</span>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* New Footer Section */}
      <footer className="mt-12 px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content - Matching Registration Transparency */}
          <div className="border-2 border-green-400/30 rounded-xl p-6 sm:p-8 hover:border-green-400/60 transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* Left Side - Alien Character */}
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative mb-6">
                  <img 
                    src={humoungImg} 
                    alt="Alien character" 
                    className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain"
                    style={{ 
                      background: 'transparent',
                      filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))'
                    }}
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                    Meet at the Hackathon!
                  </h3>
                  <div className="text-green-400 text-lg sm:text-xl font-bold mb-4 tracking-wider">
                    OMNITRIX
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="p-3 rounded-full border-2 border-green-400/30 hover:bg-green-400/10 hover:border-green-400/60 transition-all duration-300 transform hover:scale-110 text-green-400 hover:text-green-300"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                  <a 
                    href="#" 
                    className="p-3 rounded-full border-2 border-green-400/30 hover:bg-green-400/10 hover:border-green-400/60 transition-all duration-300 transform hover:scale-110 text-green-400 hover:text-green-300"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a 
                    href="#" 
                    className="p-3 rounded-full border-2 border-green-400/30 hover:bg-green-400/10 hover:border-green-400/60 transition-all duration-300 transform hover:scale-110 text-green-400 hover:text-green-300"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>

              {/* Right Side - Title Image */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative">
                  <img 
                    src={titleImg} 
                    alt="Title image"
                    className="max-w-full h-auto object-contain w-64 sm:w-80 lg:w-96"
                    style={{ 
                      background: 'transparent',
                      filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 0 15px rgba(34, 197, 94, 0.2))'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer - Copyright */}
          <div className="mt-6 pt-4 border-t border-green-400/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-6">
                <span>© 2025 OMNITRIX. All rights reserved.</span>
                <span className="hidden sm:inline">|</span>
                <span className="text-green-400">Hackathon Innovation Platform</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
                <span>|</span>
                <span className="text-green-400">Made with 💚 for Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}