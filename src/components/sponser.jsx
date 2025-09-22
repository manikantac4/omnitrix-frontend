import React, { useState, useEffect } from 'react';
import cis from "../assets/ieecis.jpg";
import sahe from "..//assets/sahe.png"
import smc from "../assets/ieeesmc.png";
import it from "../assets/it.jpg";
import pandu from "../assets/pandu.jpg";
import bharath from "../assets/bharath.jpg"
import manoj from "../assets/manoj.jpg";

const SponsorsComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  const facultyCoordinators = [
    {
      name: "Dr. M. Gargi",
      role: "IEEE-CIS Chapter Incharge",
      image: null
    },
    {
      name: "Dr. Ch. Subbareddy",
      role: "IEEE-SMC Chapter Incharge", 
      image: null
    }
  ];

  // First row: Chair, Web Master, Treasurer
  const primaryCoordinators = [
    {
      name: "Manoj Kumar",
      role: "IEEE CHAIR",
      image: manoj
    },
    {
      name: "Pandu Ranga",
      role: "WEB MASTER",
      image: pandu
    },
    {
      name: "Poojitha",
      role: "IEEE VICE CHAIR", 
      image: null
    }
  ];

  // Second row: Vice Chair, Secretary, Publisher
  const secondaryCoordinators = [
    
  ];

  const organizers = [
    { name: "IEEE CIS", image: cis },
    { name: "IEEE SMC", image: smc },
    { name: "IT Department", image: it },
    { name: "SAHE", image: sahe }
  ];

  const SponsorCard = ({ sponsor }) => (
    <div className="bg-white rounded-lg p-4 md:p-6 flex items-center justify-center h-16 md:h-20 hover:shadow-lg transition-shadow duration-300">
      {sponsor.logo ? (
        <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
      ) : (
        <div className="text-gray-800 font-semibold text-sm md:text-lg">
          {sponsor.name}
        </div>
      )}
    </div>
  );

  const PersonCard = ({ person }) => (
    <div className="flex flex-col items-center text-center space-y-2 md:space-y-3 w-full max-w-[120px] mx-auto">
      <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-slate-800/40 border-2 border-green-400/30 flex items-center justify-center overflow-hidden shadow-lg shadow-green-400/10 hover:border-green-400/60 hover:shadow-green-400/30 transition-all duration-300">
        {person.image ? (
          <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-green-400/60 text-xl md:text-2xl font-bold">
            {person.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="px-2">
        <h3 className="text-white font-semibold text-xs md:text-sm lg:text-base break-words">{person.name}</h3>
        <p className="text-green-400/80 text-xs md:text-sm break-words">{person.role}</p>
      </div>
    </div>
  );

  const OrganizerCard = ({ org }) => (
    <div className="flex flex-col items-center text-center space-y-2 md:space-y-3 w-full max-w-[100px] mx-auto">
      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-slate-800/40 border-2 border-green-400/30 flex items-center justify-center overflow-hidden shadow-lg shadow-green-400/10 hover:border-green-400/60 hover:shadow-green-400/30 transition-all duration-300">
        {org.image ? (
          <img src={org.image} alt={org.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-green-400/60 text-lg md:text-xl font-bold">
            {org.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-white font-semibold text-xs md:text-sm lg:text-base break-words leading-tight">{org.name}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className={`text-center mb-8 md:mb-12 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 px-4">Our Sponsors</h1>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        
        {/* Sponsors Section - Empty */}
        <section className="px-4">
          <div className="text-center py-8 md:py-12">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-green-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-gray-400 text-base md:text-lg px-4">
              Sponsor information will be updated soon
            </p>
            <p className="text-green-400/80 text-sm md:text-base mt-2 px-4">
              Stay tuned for exciting partnerships!
            </p>
          </div>
        </section>

        {/* Coordinators */}
        <section className="px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 md:mb-8 tracking-wider text-center">
            COORDINATORS
          </h2>
          
          <div className="space-y-8 md:space-y-12">
            {/* Faculty Coordinators */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-4 md:mb-6 text-center">
                Faculty Coordinators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 justify-items-center max-w-2xl mx-auto">
                {facultyCoordinators.map((person, index) => (
                  <PersonCard key={index} person={person} />
                ))}
              </div>
            </div>

            {/* Student Coordinators */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-4 md:mb-6 text-center">
                Student Coordinators
              </h3>
              <div className="space-y-6 md:space-y-8">
                {/* First row: Chair, Web Master, Treasurer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center max-w-4xl mx-auto">
                  {primaryCoordinators.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
                
                {/* Second row: Vice Chair, Secretary, Publisher */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center max-w-4xl mx-auto">
                  {secondaryCoordinators.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organizers */}
        <section className="px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 md:mb-8 tracking-wider text-center">
            ORGANIZERS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center max-w-3xl mx-auto">
            {organizers.map((org, index) => (
              <OrganizerCard key={index} org={org} />
            ))}
          </div>
        </section>

      </div>

      {/* Floating dots background effect - Responsive positioning */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 md:top-20 left-4 md:left-10 w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 md:top-1/3 right-8 md:right-20 w-2 h-2 md:w-3 md:h-3 bg-green-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/2 md:bottom-1/3 left-1/6 md:left-1/4 w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-16 md:bottom-20 right-1/4 md:right-1/3 w-2 h-2 md:w-3 md:h-3 bg-green-400/25 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 md:w-2 md:h-2 bg-green-300/30 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default SponsorsComponent;