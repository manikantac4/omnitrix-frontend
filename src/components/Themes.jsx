import React, { useState, useRef, useEffect } from 'react';
import webImg from "../assets/fourarms.png";
import Blockimg from "../assets/block.jpg";
import AgentsImg from "../assets/quantum.png";
import Openimg from "../assets/open.png";
import Footer from './Footer';

const TRACKS = [
    { 
      id: 'aiagents', 
      title: 'AI Agents & Intelligent Automation', 
      tag: 'Enterprise automation & intelligent systems', 
      description: 'Build sophisticated AI agents that automate complex workflows, enhance productivity, and solve real-world enterprise challenges. Develop intelligent systems for banking operations, developer productivity, recruitment optimization, and task automation that combine autonomy with human oversight for optimal results.', 
      imageAlt: 'AI agents and autonomous systems', 
      imageSrc: AgentsImg,
      problemStatements: [
        {
          title: 'Intelligent Workflow Agent for Repetitive Banking Tasks',
          statement: 'Entry-level banking operations such as voucher verification, ledger updates, and clerical data entry are repetitive and prone to human error. These tasks consume valuable time that could be better used for customer-facing or analytical work. Participants should develop an AI-powered workflow automation agent capable of performing such repetitive tasks efficiently while maintaining human validation checkpoints for accuracy and compliance.',
          scenario: 'An intelligent agent reads voucher details, verifies transaction data, updates ledgers automatically, and sends the summary to a clerk for final approval — reducing turnaround time and improving efficiency.',
          deliverables: [
            'AI Agent for repetitive data entry and verification',
            'Human-in-the-loop validation system',
            'Real-time dashboard for task progress and performance'
          ]
        },
        {
          title: 'KYC Transaction Agent for OTP Delay Mitigation',
          statement: 'Bank transactions often fail due to OTP delays or mismatches during authentication, affecting user experience and transaction success rates. Participants should design an AI-driven KYC validation agent that minimizes transaction failures by predicting OTP delays, revalidating identity seamlessly, and improving overall transaction reliability.',
          scenario: 'During an OTP delay, the agent verifies user identity through previously authenticated KYC data, validates risk factors, and allows conditional transaction completion with later confirmation.',
          deliverables: [
            'AI-based OTP delay prediction system',
            'KYC validation and fallback authentication agent',
            'Transaction success monitoring dashboard'
          ]
        },
        {
          title: 'Role-Based Resume Personalizer for ATS Optimization',
          statement: 'Many job seekers fail to pass through Applicant Tracking Systems (ATS) due to non-optimized resumes. Participants should create an AI-powered Resume Personalizer Agent that automatically tailors resumes to specific job roles, improving ATS scores and alignment with role requirements.',
          scenario: 'A user uploads a base resume; the AI analyzes a "Data Analyst" job description, rephrases skills, optimizes keyword usage, and outputs a role-specific resume ready for submission.',
          deliverables: [
            'AI-based resume optimization engine',
            'Role-specific keyword and skill matching',
            'ATS score analyzer and improvement dashboard'
          ]
        },
        {
          title: 'AI-Powered Code Editor with Contextual Assistance',
          statement: 'Developers often struggle with repetitive coding tasks, debugging, and documentation. Participants should build an AI code editor agent that enhances developer productivity by offering real-time code suggestions, error fixes, documentation generation, and contextual understanding of the project.',
          scenario: 'A developer writes a Python function; the agent detects inefficiency, suggests optimized code, auto-generates inline documentation, and provides debugging tips — all within the editor.',
          deliverables: [
            'AI-assisted code editor',
            'Context-aware debugging and optimization features',
            'Documentation auto-generator and performance insights dashboard'
          ]
        }
      ]
    },
    { 
      id: 'web3', 
      title: 'Web3 & Blockchain Innovation', 
      tag: 'Decentralized future technologies', 
      description: 'Build decentralized applications using blockchain technology, smart contracts, and cryptocurrency protocols. Create solutions for DeFi, NFTs, and decentralized governance systems.', 
      imageAlt: 'Blockchain and web3 technology', 
      imageSrc: Blockimg,
      problemStatements: [
        {
          title: 'Decentralized Health Prediction & Alerting System',
          statement: 'Patient health data is scattered across hospitals, wearables, and personal devices, raising concerns about privacy and reliability. Participants should build a platform that stores vital data on-chain or in decentralized storage, allowing off-chain ML models to analyze anonymized inputs and trigger predictive alerts for potential health issues. The system must preserve data integrity while enabling multiple parties — doctors, hospitals, and patients — to access insights securely.',
          scenario: 'A smartwatch uploads heart rate and glucose data to a decentralized vault; an off-chain AI predicts abnormal trends and alerts doctors or patients through a smart contract-managed dashboard.',
          deliverables: [
            'On-chain patient data storage',
            'Off-chain ML prediction module',
            'Access-controlled alert dashboard'
          ]
        },
        {
          title: 'Trace the End Receiver of a Cryptocurrency Transaction',
          statement: 'Illicit cryptocurrency flows, such as those related to drug trafficking or scams, are increasingly moving through mixers and cross-chain bridges, making it difficult to identify the real recipients. Participants should develop a tool that traces transactions, clusters related addresses, and highlights the most probable end receivers with supporting evidence, while clearly indicating confidence levels. The solution should help law enforcement visualize suspicious flows without compromising legal or privacy standards.',
          scenario: 'Starting from a flagged wallet, the system maps downstream transactions across multiple chains, identifies likely cash-out points, and generates a ranked list of potential recipients with timestamped evidence.',
          deliverables: [
            'On-chain transaction parser',
            'Address clustering and ranking visualization',
            'Candidate receiver report'
          ]
        },
        {
          title: 'Blockchain and Web3 Development Platform',
          statement: 'Developers face significant friction building and deploying applications across multiple blockchains due to inconsistent APIs, fragmented wallets, and lack of automation. Participants are tasked with designing a next-generation platform that unifies multi-chain interactions, automates smart contract deployment and upgrades, enables large-scale wallet minting, and integrates on-chain agents for autonomous workflows. The platform should provide developers with a seamless experience to build, test, and manage decentralized applications efficiently while maintaining security and reliability.',
          scenario: 'A developer needs to launch a DAO app across Ethereum, Polygon, and Base, manage thousands of wallets, and trigger cross-chain agent actions — all coordinated from a single dashboard.',
          deliverables: [
            'Multi-chain API/SDK for developers',
            'Smart contract lifecycle manager',
            'Wallet minting and agent-based automation interface',
            'Dashboard showing cross-chain operations'
          ]
        },
        {
          title: 'Predictive Maintenance via Blockchain',
          statement: 'Industrial equipment downtime leads to huge financial losses, but predictive maintenance is often hampered by centralized data storage and limited cross-stakeholder access. Participants should create a blockchain-based system that securely logs sensor data from equipment, allowing multiple stakeholders — manufacturers, operators, and insurers — to access it for predictive analytics while maintaining data privacy. Off-chain ML models can run failure predictions, with alerts shared to authorized parties.',
          scenario: 'Factory motor sensors push operational data to a blockchain or IPFS; predictive models detect potential failures and automatically notify maintenance teams, without exposing raw data to unauthorized users.',
          deliverables: [
            'On-chain equipment data registry',
            'Off-chain ML failure prediction',
            'Multi-stakeholder access control dashboard'
          ]
        }
      ]
    },
    { 
      id: 'webdev', 
      title: 'Full-Stack Web Development', 
      tag: 'Building the future of web', 
      description: 'Create innovative web applications using modern frameworks and technologies. Build responsive, scalable, and user-friendly web solutions that address real-world problems.', 
      imageAlt: 'Modern web development interface', 
      imageSrc: webImg,
      problemStatements: [
        {
          title: 'GreyMatter Connect — The Peer Learning Network',
          subtitle: 'Inspired by Grey Matter\'s intellect and problem-solving brilliance.',
          statement: 'When the galaxy fell into chaos, knowledge became the rarest energy source. Grey Matter, the smartest of all Ben\'s transformations, realized that real strength lies not in power — but in shared wisdom. He designed GreyMatter Connect, an interstellar learning hub where beings from every planet could teach and learn from each other, using data streams as lessons and shared networks as classrooms. Now, it\'s your turn to build that hub — on Earth. Create a platform where users can find mentors and learners based on specific skills, connect instantly, and collaborate to grow together.',
          scenario: '',
          deliverables: [
            'User authentication with mentor/learner roles',
            'Skill-based matchmaking',
            'Smart scheduling and chatting interface',
            'Rating and feedback systems'
          ],
          upgrade: '🧠 Ultimate Upgrade (Alien: Echo Echo): Multiply your impact like Echo Echo — integrate real-time video mentoring with WebRTC or build an AI-based skill recommender that echoes users\' learning needs back to the perfect match.'
        },
        {
          title: 'DiamondCivic — Citizen Issue Reporting Portal',
          subtitle: 'As tough and reliable as Diamondhead — solving civic problems head-on.',
          statement: 'In Bellwood, chaos spread as public systems started breaking down — roads cracked, lights failed, trash piled up. Ben, in his Diamondhead form, couldn\'t be everywhere at once. So he forged DiamondCivic — a crystal-clear system to help citizens report and track problems in their city, turning chaos into structured order. You, as a developer-hero, must now bring DiamondCivic to life.',
          scenario: '',
          deliverables: [
            'Geolocation with image uploads for reporting',
            'Categorize and track civic issues',
            'Admin dashboard for resolution updates',
            'Push/email notifications to users when their issue progresses'
          ],
          upgrade: '💎 Ultimate Upgrade (Alien: Chrome Stone): Reinforce it with Chrome Stone\'s resilience — add a heatmap visualization of reported issues and an AI-based routing engine that directs reports to the nearest active authority node.'
        },
        {
          title: 'XLR8 Board — Real-Time Collaboration Platform',
          subtitle: 'Move ideas as fast as XLR8 — brainstorm, sketch, and build together.',
          statement: 'When the Plumbers needed to plan multi-planet defenses, communication lag was the enemy. XLR8 — the speedster of the Omnitrix — zipped between systems faster than thought, coordinating missions in milliseconds. He left behind XLR8 Board, a hyper-speed collaboration zone where teams could draw, ideate, and brainstorm together in real time. Now, Earth\'s developers must rebuild that board to match XLR8\'s pace.',
          scenario: '',
          deliverables: [
            'WebSocket-based real-time drawing',
            'Room-based sessions and authentication',
            'Save and export boards for later review'
          ],
          upgrade: '💨 Ultimate Upgrade (Alien: FastTrack): Turbocharge your system like FastTrack — integrate live chat and voice sync, or an AI-driven summarizer that instantly compiles meeting ideas into structured notes while users draw and discuss.'
        },
        {
          title: 'Goop Health — Community Wellness Tracker',
          subtitle: 'Immune like Goop — connecting people through health and care.',
          statement: 'When a strange virus from the Andromeda system spread across galaxies, Goop used his fluid body to form networks of healing zones, linking infected colonies to medical hubs. His adaptability became the foundation for Goop Health — a system that connects people through health initiatives. Now it\'s Earth\'s turn. Build an app that unites communities for health drives, donation camps, and wellness events, keeping everyone informed and connected.',
          scenario: '',
          deliverables: [
            'Create and map community health events',
            'Allow volunteer signups',
            'Notify users of nearby wellness activities'
          ],
          upgrade: '🌿 Ultimate Upgrade (Alien: Ghostfreak): Phase into invisibility like Ghostfreak — create a chatbot that quietly guides users to resources, or a data visualization panel that shows real-time community health trends and impact.'
        },
        {
          title: 'Upgrade — Team Productivity Dashboard',
          subtitle: 'Upgrade your workflow — organize and strike efficiently.',
          statement: 'When the Omnitrix team started expanding, even Ben needed structure. That\'s when Upgrade merged with a digital system, turning chaotic teamwork into synchronized energy. Upgrade can morph into any tech — and now, so can you. Build a platform that lets teams plan, track, and execute their projects with perfect sync and clarity.',
          scenario: '',
          deliverables: [
            'Role-based login for Admins and Members',
            'Task creation and progress visualization (Kanban or Gantt)',
            'Real-time updates using WebSockets'
          ],
          upgrade: '⚡ Ultimate Upgrade (Alien: Brainstorm): Shock it with Brainstorm\'s intellect — integrate Google Calendar or Slack APIs to create a lightning-fast workflow that syncs communication, scheduling, and task updates all in one interface.'
        },
        {
          title: 'Rath Arena — Smart Sports Court Booking Platform',
          subtitle: 'Strong, fast, and competitive — just like Rath.',
          statement: 'In the Ben 10 universe, even heroes need a sparring ground. Rath\'s arena was always full — with alien warriors reserving training rings, comparing stats, and battling for top rank. Now Rath challenges you to bring that energy to Earth. Develop a sports court booking system that helps users find, reserve, and rate courts nearby — from tennis to basketball to turf arenas.',
          scenario: '',
          deliverables: [
            'List courts with images and details',
            'Integrate Google Maps for location-based search',
            'Booking and availability scheduler',
            'Ratings and reviews for each venue'
          ],
          upgrade: '💥 Ultimate Upgrade (Alien: Cannonbolt): Roll in like Cannonbolt — add AI-based locality suggestions, showing users the best-rated, least crowded courts based on their GPS and play patterns.'
        }
      ]
    },
    { 
      id: 'openinnovation', 
      title: 'Open Innovation Challenge', 
      tag: 'Creative solutions for global problems', 
      description: 'This track allows maximum creativity and impact. Choose your own problem statement and create innovative solutions that can make a real difference in the world.', 
      imageAlt: 'Innovation and creativity', 
      imageSrc: Openimg,
      problemStatements: []
    }
];
export default function HackathonTracksPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [titleVisible, setTitleVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
    setQuery('');
    setMobileMenuOpen(false);
    setSelectedProblem(0);
    
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  const handleBackClick = () => {
    window.location.href = '/';
  };

  const filtered = TRACKS.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) || 
    t.tag.toLowerCase().includes(query.toLowerCase())
  );

  const active = filtered[activeIndex] || TRACKS[0];

  useEffect(() => {
    const node = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    if (node) node.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  useEffect(() => {
    setSelectedProblem(0);
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
        {/* Back Button */}
        <div className="mb-6">
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

                <div className="mt-4 sm:mt-6 text-gray-200 leading-relaxed flex-1 overflow-y-auto max-h-[calc(100vh-400px)]">
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
                  ) : active.problemStatements && active.problemStatements.length > 0 ? (
                    <div className="mt-4 space-y-4">
                      {(active.id === 'aiagents' || active.id === 'web3' || active.id === 'webdev') ? (
                        <>
                          <div className="flex items-center gap-2 mb-3">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-green-400 font-semibold text-base">Problem Statements</span>
                          </div>

                          {/* Problem Statement Selector */}
                          {active.problemStatements.length > 1 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {active.problemStatements.map((ps, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedProblem(idx)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                                    selectedProblem === idx
                                      ? 'bg-green-400/20 text-green-400 border-2 border-green-400/60'
                                      : 'bg-transparent text-gray-400 border-2 border-green-400/20 hover:border-green-400/40'
                                  }`}
                                >
                                  Problem {idx + 1}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Selected Problem Statement */}
                          <div className="p-6 bg-emerald-500/10 border border-emerald-400/30 rounded-lg space-y-4">
                            <h3 className="text-emerald-400 font-bold text-sm sm:text-base">{active.problemStatements[selectedProblem].title}</h3>
                            
                            {active.problemStatements[selectedProblem].subtitle && (
                              <p className="text-xs sm:text-sm text-green-300 italic">{active.problemStatements[selectedProblem].subtitle}</p>
                            )}
                            
                            <div>
                              <h4 className="text-green-400 font-semibold text-xs sm:text-sm mb-1">Problem Statement:</h4>
                              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{active.problemStatements[selectedProblem].statement}</p>
                            </div>

                            {active.problemStatements[selectedProblem].scenario && (
                              <div>
                                <h4 className="text-green-400 font-semibold text-xs sm:text-sm mb-1">Example Scenario:</h4>
                                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{active.problemStatements[selectedProblem].scenario}</p>
                              </div>
                            )}

                            {active.problemStatements[selectedProblem].deliverables && active.problemStatements[selectedProblem].deliverables.length > 0 && (
                              <div>
                                <h4 className="text-green-400 font-semibold text-xs sm:text-sm mb-2">Core Mission Objectives:</h4>
                                <ul className="space-y-1">
                                  {active.problemStatements[selectedProblem].deliverables.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                                      <span className="text-green-400 mt-0.5">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {active.problemStatements[selectedProblem].upgrade && (
                              <div className="mt-3 p-3 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                                <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">{active.problemStatements[selectedProblem].upgrade}</p>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="mt-4 p-3 sm:p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-emerald-400 font-semibold text-sm">Important Notice</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-300">
                            Problem statements will be released on <strong className="text-emerald-400">12 Oct, 9:00 AM</strong>. 
                            Stay tuned for detailed challenge descriptions and requirements.
                          </p>
                        </div>
                      )}
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
                        Problem statements will be released on <strong className="text-emerald-400">12 Oct, 9:00 AM</strong>. 
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

      {/* Use the extracted Footer component */}
      <Footer />
    </div>
  );
}