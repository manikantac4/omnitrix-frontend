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

  // First row: Chair, Vice Chair, Web Master
  const primaryCoordinators = [
    {
      name: "Manoj Kumar",
      role: "IEEE CHAIR",
      image: manoj
    },
    {
      name: "Poojitha",
      role: "IEEE VICE CHAIR", 
      image: null
    },
    {
      name: "Pandu Ranga",
      role: "WEB MASTER",
      image: pandu
    }
  ];

  // Second row: Treasurer, Secretary
  const secondaryCoordinators = [
    {
      name: "Bharath",
      role: "TREASURER",
      image: bharath
    },
    {
      name: "Anand",
      role: "SECRETARY",
      image: null
    }
  ];

  const organizers = [
    { name: "IEEE CIS", image: cis },
    { name: "IEEE SMC", image: smc },
    { name: "IT Department", image: it },
    { name: "SAHE", image: sahe }
  ];

  const SponsorCard = ({ sponsor }) => (
    <div className="bg-white rounded-lg p-6 flex items-center justify-center h-20 hover:shadow-lg transition-shadow duration-300">
      {sponsor.logo ? (
        <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
      ) : (
        <div className="text-gray-800 font-semibold text-lg">
          {sponsor.name}
        </div>
      )}
    </div>
  );

  const PersonCard = ({ person }) => (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-24 h-24 rounded-full bg-slate-800/40 border-2 border-green-400/30 flex items-center justify-center overflow-hidden shadow-lg shadow-green-400/10 hover:border-green-400/60 hover:shadow-green-400/30 transition-all duration-300">
        {person.image ? (
          <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-green-400/60 text-2xl font-bold">
            {person.name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm">{person.name}</h3>
        <p className="text-green-400/80 text-xs">{person.role}</p>
      </div>
    </div>
  );

  const OrganizerCard = ({ org }) => (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-20 h-20 rounded-full bg-slate-800/40 border-2 border-green-400/30 flex items-center justify-center overflow-hidden shadow-lg shadow-green-400/10 hover:border-green-400/60 hover:shadow-green-400/30 transition-all duration-300">
        {org.image ? (
          <img src={org.image} alt={org.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-green-400/60 text-xl font-bold">
            {org.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-white font-semibold text-sm">{org.name}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      {/* Header */}
      <div className={`text-center mb-12 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Sponsors</h1>
        
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Sponsors Section - Empty */}
        <section>
          
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">
              Sponsor information will be updated soon
            </p>
            <p className="text-green-400/80 text-sm mt-2">
              Stay tuned for exciting partnerships!
            </p>
          </div>
        </section>

        {/* Coordinators */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8 tracking-wider text-center">
            COORDINATORS
          </h2>
          
          <div className="space-y-12">
            {/* Faculty Coordinators */}
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-6 text-center">
                Faculty Coordinators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
                {facultyCoordinators.map((person, index) => (
                  <PersonCard key={index} person={person} />
                ))}
              </div>
            </div>

            {/* Student Coordinators */}
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-6 text-center">
                Student Coordinators
              </h3>
              <div className="space-y-8">
                {/* First row: Chair, Vice Chair, Web Master */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
                  {primaryCoordinators.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
                
                {/* Second row: Treasurer, Secretary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
                  {secondaryCoordinators.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organizers */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8 tracking-wider text-center">
            ORGANIZERS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center">
            {organizers.map((org, index) => (
              <OrganizerCard key={index} org={org} />
            ))}
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

export default SponsorsComponent;