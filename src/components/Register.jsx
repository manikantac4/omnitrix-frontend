import React, { useState, useEffect } from 'react';
import omnitrix from '../assets/omnitrix.png'
const RegistrationComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success'); // 'success' or 'error'
  const [messageContent, setMessageContent] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare final data
    const finalFormData = {
      ...formData,
      college: formData.college === 'Other' ? formData.otherCollege : formData.college
    };

    // Remove the otherCollege field before sending
    delete finalFormData.otherCollege;

    console.log('Posting data:', finalFormData);

    try {
      const response = await fetch('https://omnitrix-backend-1.onrender.com/api/team/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalFormData)
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Registration successful:', data);
        setMessageType('success');
        setMessageContent({
          title: 'Team Registered Successfully!',
          description: 'Check your email for your Team ID. If you didn\'t receive it, reach us!'
        });
        setShowMessage(true);
      } else {
        console.error('❌ Registration failed:', data.error);
        setMessageType('error');
        setMessageContent({
          title: 'Registration Failed',
          description: 'Please check your information and try again.'
        });
        setShowMessage(true);
      }
    } catch (err) {
      console.error('❌ Error posting data:', err);
      setMessageType('error');
      setMessageContent({
        title: 'Connection Error',
        description: 'Please check your internet connection and try again later.'
      });
      setShowMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    // Navigate back to home
    window.location.href = '/';
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  // Ben 10 Watch Loading Component
  const Ben10Loading = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        {/* Ben 10 Watch Image - Replace this URL with your actual Ben 10 watch image */}
        <img 
          src={omnitrix}
          alt="Ben 10 Omnitrix Watch" 
          className="w-24 h-24 object-contain animate-spin"
          style={{ animationDuration: '2s' }}
        />
        
        {/* Glowing Ring Effect */}
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border border-green-300/30 animate-pulse"></div>
      </div>
      
      <div className="text-green-400 font-semibold animate-pulse text-lg">
        Registering Team...
      </div>
      
      <div className="text-green-300/60 text-sm">
        Activating Omnitrix...
      </div>
      
      {/* Additional loading dots */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 shadow-2xl shadow-green-400/20">
            <Ben10Loading />
          </div>
        </div>
      )}

      {/* Success/Error Message Modal */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`bg-transparent border-2 rounded-xl p-8 shadow-2xl max-w-md w-full ${
            messageType === 'success' 
              ? 'border-green-400/60 shadow-green-400/20' 
              : 'border-red-400/60 shadow-red-400/20'
          }`}>
            <div className="text-center space-y-4">
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                messageType === 'success' ? 'bg-green-400/20' : 'bg-red-400/20'
              }`}>
                {messageType === 'success' ? (
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold ${
                messageType === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {messageContent.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed">
                {messageContent.description}
              </p>

              {/* Close Button */}
              <button
                onClick={closeMessage}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                  messageType === 'success' 
                    ? 'bg-transparent border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 shadow-lg hover:shadow-green-400/30' 
                    : 'bg-transparent border-2 border-red-400/60 text-red-400 hover:bg-red-400/10 hover:border-red-400 hover:text-red-300 shadow-lg hover:shadow-red-400/30'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
                disabled={isLoading}
                className={`w-full bg-transparent border-2 border-green-400/60 text-green-400 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-400/30 cursor-pointer ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-green-400/10 hover:border-green-400 hover:text-green-300'
                }`}
              >
                {isLoading ? 'Registering...' : 'Register Team'}
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