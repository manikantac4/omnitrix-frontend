import React, { useState, useEffect } from 'react';
import cis from "../assets/ieecis.jpg";
import sahe from "..//assets/sahe.png"
import smc from "../assets/ieeesmc.png";
import it from "../assets/it.jpg";
import pandu from "../assets/pandu.jpg";
import manoj from "../assets/manoj.jpg";
import poojitha from "../assets/poojitha.jpg";
import subbhu from "../assets/subbhu.jpg";
import hodImage from "../assets/Hod.jpg"; 
import  iEEE from "../assets/ieee.webp";
import prabhas from "../assets/prabhas.jpg";
import charan from "../assets/charan.jpg";
import likitha from "../assets/likitha.jpg";
import acm from "../assets/acm.jpg";
import mam from "../assets/jaya lakshmi.jpg"; 
import gargi from "../assets/gargi.jpg";
// Add ACM logo import - you'll need to add this image
// import acmLogo from "../assets/acm.jpg"; // Add your ACM logo path

const SponsorsComponent = () => {
  const [ setTitleVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  // Conveyor - HOD
  const conveyor = {
    name: "Dr. M. Suneetha",
    role: "Dean Research Development & Technology,IQAC,\n Professor & HOD of IT, SAHE",
    image: hodImage,
    linkedin: "https://www.linkedin.com/in/dr-suneetha-manne-1a26b635?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // Placeholder for LinkedIn URL
  };

  const facultyCoordinators = [
    {
      name: "Dr. G. Jaya Lakshmi",
      role: "ACM Chapter Incharge",
      image: mam,
      linkedin: "" // Add LinkedIn URL when available
    },
    {
      name: "Dr. M. Gargi",
      role: "IEEE-CIS Chapter Incharge",
      image: gargi,
      linkedin: "https://www.linkedin.com/in/dr-gargi-madala-209ab02b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // Placeholder for LinkedIn URL
    },
    {
      name: "Dr. Ch. Subbareddy",
      role: "IEEE-SMC Chapter Incharge", 
      image: subbhu,
      linkedin: "https://www.linkedin.com/in/dr-chavva-subba-reddy-5280113b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // Placeholder for LinkedIn URL
    }
  ];

  // First row: Chair, Web Master, Vice Chair
  const primaryCoordinators = [
    {
      name: "Manoj Kumar",
      role: "IEEE CHAIR",
      image: manoj,
      linkedin: "https://www.linkedin.com/in/manojkumar-allu-1537b6242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // Placeholder for LinkedIn URL
    },
    {
      name: "Pandu",
      role: "Web Master",
      image: pandu,
      linkedin: "https://www.linkedin.com/in/pandu-ranga-tummuri-1b1b772a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // Placeholder for LinkedIn URL
    },
    {
      name: "Poojitha",
      role: "IEEE VICE CHAIR", 
      image: poojitha,
      linkedin: "" // Placeholder for LinkedIn URL
    }
  ];

  // Second row: ACM Chair, Vice Chair, Secretary
  const secondaryCoordinators = [
    {
      name: "Prabhas",
      role: "ACM CHAIR",
      image: prabhas,
      linkedin: "https://www.linkedin.com/in/prabhasmekala/" // Add LinkedIn URL when available
    },
    {
      name: "Charan",
      role: "ACM VICE-CHAIR",
      image: charan,
      linkedin: "https://www.linkedin.com/in/sri-hari-charan-geddada-4068352a3/" // Add LinkedIn URL when available
    },
    {
      name: "Likhitha",
      role: "ACM SIM SPT SECRETARY",
      image: likitha,
      linkedin: "https://www.linkedin.com/in/likhitha-inturi-458867282/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // Add LinkedIn URL when available
    }
  ];

  const organizers = [
    { 
      name: "ACM", 
      image: acm, // Add ACM logo here: acmLogo
      linkedin: "https://www.acm.org/" // ACM official website
    },
    { 
      name: "IEEE", 
      image: iEEE, // Add IEEE main logo
      linkedin: "https://www.ieee.org/" // Placeholder for LinkedIn URL
    },
    
    { 
      name: "IEEE CIS", 
      image: cis,
      linkedin: "https://www.linkedin.com/company/ieee-cis-vrsec/" // Placeholder for LinkedIn URL
    },
    { 
      name: "IEEE SMC", 
      image: smc,
      linkedin: "https://www.ieeesmc.org/" // Placeholder for LinkedIn URL
    },
    { 
      name: "IT Department", 
      image: it,
      linkedin: "https://www.linkedin.com/company/dept-of-it-siddhartha-academy-of-higher-education/" // Placeholder for LinkedIn URL
    },
    { 
      name: "SAHE", 
      image: sahe,
      linkedin: "https://siddhartha.edu.in/" // Placeholder for LinkedIn URL
    }
  ];

  /*const SponsorCard = ({ sponsor }) => (
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
*/
  const ConveyorCard = ({ person }) => (
    <div className="flex flex-col items-center text-center space-y-3 md:space-y-4 w-full max-w-[200px] mx-auto">
      <div 
        className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full bg-slate-800/40 border-2 border-green-400/30 flex items-center justify-center overflow-hidden shadow-lg shadow-green-400/10 hover:border-green-400/60 hover:shadow-green-400/30 transition-all duration-300 cursor-pointer"
        onClick={() => person.linkedin && window.open(person.linkedin, '_blank')}
      >
        {person.image ? (
          <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-green-400/60 text-2xl md:text-3xl font-bold">
            {person.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="px-2">
        <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg break-words">{person.name}</h3>
        <p className="text-green-400/80 text-xs md:text-sm whitespace-pre-line break-words leading-relaxed">{person.role}</p>
      </div>
    </div>
  );

  const PersonCard = ({ person }) => (
    <div className="flex flex-col items-center text-center space-y-2 md:space-y-3 w-full max-w-[120px] mx-auto">
      <div 
        className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-slate-800/40 border-2 border-green-400/30 flex items-center justify-center overflow-hidden shadow-lg shadow-green-400/10 hover:border-green-400/60 hover:shadow-green-400/30 transition-all duration-300 cursor-pointer"
        onClick={() => person.linkedin && window.open(person.linkedin, '_blank')}
      >
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
      <div 
        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-slate-800/40 border-2 border-green-400/30 flex items-center justify-center overflow-hidden shadow-lg shadow-green-400/10 hover:border-green-400/60 hover:shadow-green-400/30 transition-all duration-300 cursor-pointer"
        onClick={() => org.linkedin && window.open(org.linkedin, '_blank')}
      >
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
     

      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        
        
        {/* Conveyor Section */}
        <section className="px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 md:mb-8 tracking-wider text-center">
            CONVENER
          </h2>
          <div className="flex justify-center">
            <ConveyorCard person={conveyor} />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center max-w-4xl mx-auto">
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
                {/* First row: Manoj, Pandu, Poojitha */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center max-w-4xl mx-auto">
                  {primaryCoordinators.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
                
                {/* Second row: Prabhas, Charan, Likitha */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8 justify-items-center max-w-5xl mx-auto">
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