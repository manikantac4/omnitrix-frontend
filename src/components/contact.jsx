import React, { useState, useEffect } from 'react';
import footer from "../assets/footer.png";
import pandu from "../assets/pandu.jpg";
import manoj from "../assets/manoj.jpg";
import sahith from "../assets/sahith.jpg";

const ContactComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  const webCoordinators = [
    {
      name: "Manojkumar",
      role: "Lead Web Coordinator",
      image: manoj,
      phone: "6281466686",
      linkedinUrl: "LINKEDIN_PROFILE_URL_MANOJ" // Placeholder for LinkedIn profile
    },
    {
      name: "Pandu Ranga",
      role: "Web Master",
      image: pandu,
      phone: "9618223350",
      linkedinUrl: "www.linkedin.com/in/pandu-ranga-tummuri-1b1b772a2" // Placeholder for LinkedIn profile
    },
    {
      name: "Sahith Akula",
      role: "Backend Developer",
      image: sahith,
      phone: "8341999296",
      linkedinUrl: "www.linkedin.com/in/sahith-akula" // Placeholder for LinkedIn profile
    }
  ];

  const PersonCard = ({ person }) => (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-24 h-24 rounded-full bg-transparent border-2 border-green-400/30 flex items-center justify-center overflow-hidden shadow-lg shadow-green-400/10 hover:border-green-400/60 hover:shadow-green-400/30 transition-all duration-300">
        {person.image ? (
          <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-green-400/80 text-2xl font-bold">
            {person.name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm">{person.name}</h3>
        <p className="text-green-400/80 text-xs">{person.role}</p>
        
        {/* Phone Number */}
        <div className="mt-2">
          <a 
            href={`tel:+91${person.phone}`}
            className="text-green-300/80 hover:text-green-300 text-xs flex items-center justify-center gap-1 transition-colors duration-300"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +91 {person.phone}
          </a>
        </div>

        {/* LinkedIn */}
        <div className="mt-1">
          <div className="text-blue-400/50 text-xs flex items-center justify-center gap-1 cursor-not-allowed">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn (Coming Soon)
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      {/* Header */}
      <div className={`text-center mb-16 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-green-400/80 text-lg">Get in touch with us for more information</p>
      </div>

      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Contact Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white mb-8 tracking-wider text-center">
              GET IN TOUCH
            </h2>
            
            <div className="space-y-6">
              
              {/* Email Box */}
              <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-6 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-transparent border border-green-400/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">Email</h3>
                    <a 
                      href="mailto:omnitrix.hackathon@gmail.com"
                      className="text-green-400/80 hover:text-green-400 transition-colors duration-300 text-sm break-all"
                    >
                      omnitrix.hackathon@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Box */}
              <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-6 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-transparent border border-green-400/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.308"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">WhatsApp</h3>
                    <a 
                      href="https://chat.whatsapp.com/JgbMinWTnaRG30yGSJP5f0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400/80 hover:text-green-400 transition-colors duration-300 text-sm"
                    >
                      Join Group Chat
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram Box */}
              <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-6 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-transparent border border-green-400/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">Instagram</h3>
                    <a 
                      href="https://www.instagram.com/omnitrix_2025?igsh=dnRudDB5Y3Vnd2R6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400/80 hover:text-green-400 transition-colors duration-300 text-sm"
                    >
                      @omnitrix_2025
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side - Web Coordinators */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white mb-8 tracking-wider text-center">
              WEB COORDINATORS
            </h2>
            
            <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
                {webCoordinators.map((person, index) => (
                  <PersonCard key={index} person={person} />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Section */}
        <section className="mt-20">
          <div className="w-full max-w-none mx-auto px-4">
            {/* Footer Image */}
            <div className="relative w-full h-80 sm:h-96 lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden border-2 border-green-400/30 shadow-2xl shadow-green-400/20 mb-8">
              <img 
                src={footer} 
                alt="Footer" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Quote and Copyright Below Image */}
            <div className="text-center space-y-6 pb-12">
              <p className="text-white text-xl sm:text-2xl lg:text-3xl font-medium italic leading-relaxed max-w-4xl mx-auto">
                "Innovation distinguishes between a leader and a follower"
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-green-400/80">
                <p className="text-base font-semibold">© 2025 Omnitrix Hackathon</p>
                <span className="hidden sm:block">•</span>
                <p className="text-base">Powered by Innovation</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Floating dots background effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-green-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-green-500/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-green-400/25 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400/30 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default ContactComponent;