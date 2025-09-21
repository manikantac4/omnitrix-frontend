import React, { useState, useRef, useEffect } from 'react';
import webImg from "../assets/fourarms.png";
import Blockimg from "../assets/block.jpg";
import Quantumimg from "../assets/quantum.png";
import Appimg from "../assets/app.png";
import Openimg from "../assets/open.png";
import Cybimg from "../assets/cyber.jpg";

const TRACKS = [
    { id: 'aiml', title: 'Artificial Intelligence & Machine Learning', tag: 'Intelligent systems & automation', description: 'Develop AI-powered solutions...', imageAlt: '', imageSrc:  webImg},
    { id: 'cybersecurity', title: 'Cybersecurity & Digital Defense', tag: 'Protecting digital infrastructure', description: 'Create robust security solutions...', imageAlt: 'Cybersecurity and digital protection', imageSrc:  Cybimg },
    { id: 'quantum', title: 'Quantum Computing Solutions', tag: 'Next-generation computational power', description: 'Harness quantum computing...', imageAlt: 'Quantum computing visualization', imageSrc:  Quantumimg },
    { id: 'webdev', title: 'Full-Stack Web Development', tag: 'Building the future of web', description: 'Create innovative web applications...', imageAlt: 'Modern web development interface', imageSrc: webImg },
    { id: 'web3', title: 'Web3 & Blockchain Innovation', tag: 'Decentralized future technologies', description: 'Build decentralized applications...', imageAlt: 'Blockchain and web3 technology', imageSrc: Blockimg },
    { id: 'appdev', title: 'Mobile Application Development', tag: 'Native & cross-platform excellence', description: 'Develop high-performance mobile applications...', imageAlt: 'Mobile app development', imageSrc:  Appimg},
    { id: 'openinnovation', title: 'Open Innovation Challenge', tag: 'Creative solutions for global problems', description: 'This track allows maximum creativity and impact...', imageAlt: 'Innovation and creativity', imageSrc: Openimg}
  ];
  

export default function HackathonTracksPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [titleVisible, setTitleVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const listRef = useRef(null);

  const filtered = TRACKS.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) || 
    t.tag.toLowerCase().includes(query.toLowerCase())
  );

  const active = filtered[activeIndex] || TRACKS[0];

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    const node = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    if (node) node.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    return () => clearTimeout(titleTimer);
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
    <div className="min-h-screen p-4 sm:p-6 bg-transparent text-gray-100 font-mono">
      {/* Header */}
      <div className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-wide">HACKATHON THEMES</h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full shadow-lg shadow-green-400/50"></div>
        <p className="text-green-400 text-xs sm:text-sm font-medium mt-4 tracking-wider uppercase">Choose Your Innovation Path</p>
      </div>

      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Mobile Track Selector */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-green-400/30 bg-slate-900/40 backdrop-blur-md shadow-lg shadow-green-400/10"
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
            <div className="mt-2 rounded-lg border border-green-400/30 bg-slate-900/40 backdrop-blur-md shadow-lg shadow-green-400/10 p-4">
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
                      className={`text-left p-2 rounded-lg border transition-all duration-300 ${
                        isActive ? 'bg-green-400/20 text-white border-green-400/60 shadow-lg shadow-green-400/20' :
                        'bg-transparent border-green-400/20 text-gray-200 hover:bg-green-400/10 hover:border-green-400/40'
                      }`}>
                      <div className="font-semibold text-xs">{t.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{t.tag}</div>
                    </button>
                  );
                }) : (
                  <div className="p-2 text-xs text-gray-400 text-center border border-green-400/20 rounded-lg bg-transparent">
                    No tracks match your search.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 rounded-lg border border-green-400/30 p-4 bg-transparent backdrop-blur-md shadow-lg shadow-green-400/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-black font-bold shadow-lg shadow-green-400/50">T</div>
            <div className="flex-1">
              <div className="text-sm text-green-400 font-semibold">Tracks</div>
              <div className="text-xs text-gray-400">Use ← → or j/k to navigate</div>
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrev} disabled={activeIndex === 0} className="p-2 rounded bg-green-400 text-black hover:bg-emerald-500 hover:scale-105 transition font-bold shadow-lg shadow-green-400/30">◀</button>
              <button onClick={handleNext} disabled={activeIndex === filtered.length - 1} className="p-2 rounded bg-green-400 text-black hover:bg-emerald-500 hover:scale-105 transition font-bold shadow-lg shadow-green-400/30">▶</button>
            </div>
          </div>

          <label className="relative block mb-4">
            <span className="sr-only">Search tracks</span>
            <input
              className="w-full rounded-md border border-green-400/30 bg-transparent backdrop-blur-sm px-3 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400/50 transition-all"
              placeholder="Search tracks..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
              aria-label="Search tracks"
            />
            {query && (
              <button onClick={() => { setQuery(''); setActiveIndex(0); }} className="absolute right-2 top-2 text-sm text-green-400 hover:text-emerald-300 transition-colors">✕</button>
            )}
          </label>

          <nav ref={listRef} className="space-y-2 max-h-[60vh] overflow-auto pr-2" aria-label="Track list">
            {filtered.length ? filtered.map((t, idx) => {
              const isActive = active.id === t.id;
              return (
                <button key={t.id} data-index={idx} onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-300 transform ${
                    isActive ? 'bg-green-400/20 text-white border-green-400/60 shadow-lg shadow-green-400/20 scale-105' :
                    'bg-transparent border-green-400/20 text-gray-200 hover:bg-green-400/10 hover:border-green-400/40 hover:scale-[1.02]'
                  }`} aria-current={isActive ? 'true' : 'false'}>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{t.title}</div>
                    <div className="text-xs text-green-400 font-mono">{t.id.toUpperCase()}</div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 line-clamp-1">{t.tag}</div>
                </button>
              );
            }) : (
              <div className="p-3 text-sm text-gray-400 text-center border border-green-400/20 rounded-lg bg-transparent">
                No tracks match your search.
              </div>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8 xl:col-span-9 rounded-lg border border-green-400/30 p-4 sm:p-6 bg-transparent backdrop-blur-md shadow-lg shadow-green-400/10">
          
          {/* Mobile Navigation Controls */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <button onClick={handlePrev} disabled={activeIndex === 0} className="p-2 rounded bg-green-400 text-black hover:bg-emerald-500 hover:scale-105 transition font-bold shadow-lg shadow-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed">◀</button>
            <div className="text-sm text-gray-400 bg-transparent px-3 py-1 rounded-full border border-green-400/20">
              Track {activeIndex + 1} / {filtered.length}
            </div>
            <button onClick={handleNext} disabled={activeIndex === filtered.length - 1} className="p-2 rounded bg-green-400 text-black hover:bg-emerald-500 hover:scale-105 transition font-bold shadow-lg shadow-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed">▶</button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Image */}
            <div className="w-full lg:w-1/2 rounded-lg overflow-hidden border border-green-400/30 bg-slate-800/40 shadow-lg shadow-green-400/10">
              <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[520px] flex items-center justify-center">
                <img src={active.imageSrc} alt={active.imageAlt} className="w-full h-full object-cover rounded-lg"/>
              </div>
            </div>

            {/* Details */}
            <section className="w-full lg:w-1/2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">{active.title}</h1>
                  <p className="text-xs sm:text-sm text-green-400 mt-1 font-medium">{active.tag}</p>
                </div>
                <div className="hidden lg:block text-sm text-gray-400 bg-transparent px-3 py-1 rounded-full border border-green-400/20 whitespace-nowrap">
                  Track {activeIndex + 1} / {filtered.length}
                </div>
              </div>

              <div className="mt-4 sm:mt-6 text-gray-200 leading-relaxed">
                <p className="text-sm sm:text-base">{active.description}</p>

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

          {/* Footer */}
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
  );
}