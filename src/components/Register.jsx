import React, { useState, useEffect } from 'react';

const RegistrationComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [formData, setFormData] = useState({
    teamLeaderName: '',
    teamName: '',
    phoneNumber: '',
    email: '',
    college: '',
    otherCollege: '',
    teamSize: '',
    yearOfStudy: ''
  });

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  const colleges = [
    'Loyola Institute of Technology and Management (LITAM)',
    'Vignan\'s Foundation for Science, Technology & Research (VFSTR), Vadlamudi',
    'R. V. R. & J. C. College of Engineering, Chowdavaram',
    'Vasireddy Venkatadri International Technological University (VVITU), Namburu, Pedakakani',
    'Andhra Loyola Institute of Engineering and Technology (ALIET)',
    'Dhanekula Institute of Engineering and Technology',
    'Vikas College of Engineering & Technology (VCTN), Vikas Group of Institutions',
    'Velagapudi Ramakrishna Siddhartha Engineering College',
    'SAHE University (Engineering)',
    'Lingayas Institute of Management and Technology',
    'SRK Institute of Technology',
    'SRM University',
    'VIT University',
    'KLU (Koneru Lakshmaiah University)'
  ];

  const teamSizes = ['2', '3', '4'];
  const yearsOfStudy = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear otherCollege field if college selection is not "Other"
    if (name === 'college' && value !== 'Other') {
      setFormData(prev => ({
        ...prev,
        college: value,
        otherCollege: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      // Use otherCollege value if college is "Other", otherwise use college
      finalCollege: formData.college === 'Other' ? formData.otherCollege : formData.college
    };
    console.log('Form Data:', finalFormData);
    // Handle form submission here
    // Replaced alert with a console log as alerts are not supported
    console.log('Registration submitted successfully!');
  };

  const handleBackClick = () => {
    // Navigate back to home
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
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Team Registration</h1>
        <p className="text-green-400/80 text-lg">Register your team for Omnitrix Hackathon 2025</p>
      </div>

      <div className="max-w-4xl mx-auto">
        
        <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
          
          <div className="space-y-8">
            
            {/* Team Leader Name */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Team Leader Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="teamLeaderName"
                value={formData.teamLeaderName}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400/60 focus:outline-none transition-all duration-300"
                placeholder="Enter team leader's full name"
              />
            </div>

            {/* Team Name */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Team Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400/60 focus:outline-none transition-all duration-300"
                placeholder="Enter your team name"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400/60 focus:outline-none transition-all duration-300"
                placeholder="Enter 10-digit phone number"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400/60 focus:outline-none transition-all duration-300"
                placeholder="Enter email address"
              />
            </div>

            {/* College */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                College <span className="text-red-400">*</span>
              </label>
              <select
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white focus:border-green-400/60 focus:outline-none transition-all duration-300"
              >
                <option value="" className="bg-slate-800 text-gray-300">Select your college</option>
                {colleges.map((college, index) => (
                  <option key={index} value={college} className="bg-slate-800 text-white">
                    {college}
                  </option>
                ))}
                <option value="Other" className="bg-slate-800 text-green-400">Other</option>
              </select>
            </div>

            {/* Other College Input - Shows only when "Other" is selected */}
            {formData.college === 'Other' && (
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  College Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="otherCollege"
                  value={formData.otherCollege}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400/60 focus:outline-none transition-all duration-300"
                  placeholder="Enter your college name"
                />
              </div>
            )}

            {/* Team Size and Year of Study - Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Team Size */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Team Size <span className="text-red-400">*</span>
                </label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white focus:border-green-400/60 focus:outline-none transition-all duration-300"
                >
                  <option value="" className="bg-slate-800 text-gray-300">Select team size</option>
                  {teamSizes.map((size, index) => (
                    <option key={index} value={size} className="bg-slate-800 text-white">
                      {size} Members
                    </option>
                  ))}
                </select>
              </div>

              {/* Year of Study */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Year of Study <span className="text-red-400">*</span>
                </label>
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white focus:border-green-400/60 focus:outline-none transition-all duration-300"
                >
                  <option value="" className="bg-slate-800 text-gray-300">Select year</option>
                  {yearsOfStudy.map((year, index) => (
                    <option key={index} value={year} className="bg-slate-800 text-white">
                      {year}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-transparent border-2 border-green-400/60 text-green-400 font-bold py-4 px-8 rounded-lg hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-400/30 cursor-pointer"
              >
                Register Team
              </button>
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
      </div>
    </div>
  );
};

export default RegistrationComponent;
