import React, { useState, useEffect } from 'react';
import omnitrix from '../assets/omnitrix.png';

const RegistrationComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success');
  const [messageContent, setMessageContent] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    teamLeaderName: '',
    teamName: '',
    phoneNumber: '',
    email: '',
    college: '',
    otherCollege: '',
    teamSize: '',
    yearOfStudy: '',
    teamMember2Name: '',
    teamMember3Name: ''
  });

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  const colleges = [
    'Loyola Institute of Technology and Management (LITAM)',
    "Vignan's Foundation for Science, Technology & Research (VFSTR), Vadlamudi",
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

  const teamSizes = ['2', '3'];
  const yearsOfStudy = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const validateForm = () => {
    const errors = {};

    if (!formData.teamLeaderName.trim()) {
      errors.teamLeaderName = 'Team leader name is required';
    } else if (formData.teamLeaderName.trim().length < 2) {
      errors.teamLeaderName = 'Name must be at least 2 characters';
    }

    if (!formData.teamName.trim()) {
      errors.teamName = 'Team name is required';
    } else if (formData.teamName.trim().length < 2) {
      errors.teamName = 'Team name must be at least 2 characters';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.college) {
      errors.college = 'Please select your college';
    } else if (formData.college === 'Other' && !formData.otherCollege.trim()) {
      errors.otherCollege = 'Please enter your college name';
    }

    if (!formData.teamSize) {
      errors.teamSize = 'Please select team size';
    }

    if (!formData.yearOfStudy) {
      errors.yearOfStudy = 'Please select year of study';
    }

    if (formData.teamSize && parseInt(formData.teamSize) >= 2) {
      if (!formData.teamMember2Name.trim()) {
        errors.teamMember2Name = 'Second team member name is required';
      } else if (formData.teamMember2Name.trim().length < 2) {
        errors.teamMember2Name = 'Name must be at least 2 characters';
      }
    }

    if (formData.teamSize && parseInt(formData.teamSize) === 3) {
      if (!formData.teamMember3Name.trim()) {
        errors.teamMember3Name = 'Third team member name is required';
      } else if (formData.teamMember3Name.trim().length < 2) {
        errors.teamMember3Name = 'Name must be at least 2 characters';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'teamSize') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        teamMember2Name: '',
        teamMember3Name: ''
      }));
      
      setValidationErrors(prevErrors => {
        const {  ...rest } = prevErrors;
        return rest;
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (name === 'college' && value !== 'Other') {
      setFormData(prev => ({
        ...prev,
        college: value,
        otherCollege: ''
      }));
      if (validationErrors.otherCollege) {
        setValidationErrors(prev => ({
          ...prev,
          otherCollege: ''
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessageType('error');
      setMessageContent({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly before submitting.'
      });
      setShowMessage(true);
      return;
    }

    setIsLoading(true);

    const finalFormData = {
      teamLeaderName: formData.teamLeaderName.trim(),
      teamName: formData.teamName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim().toLowerCase(),
      college: formData.college === 'Other' ? formData.otherCollege.trim() : formData.college,
      teamSize: formData.teamSize,
      yearOfStudy: formData.yearOfStudy,
      teammate1: formData.teamMember2Name.trim(),
      teammate2: formData.teamMember3Name.trim() || null
    };

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
          description: 'Hey Alien 👽, thank you for registering! Check your email for your Team ID. If you didn\'t receive it, please check your Spam/Promotions folder. Still not found? Reach us!'
        });
        setShowMessage(true);
        
        setFormData({
          teamLeaderName: '',
          teamName: '',
          phoneNumber: '',
          email: '',
          college: '',
          otherCollege: '',
          teamSize: '',
          yearOfStudy: '',
          teamMember2Name: '',
          teamMember3Name: ''
        });
        setValidationErrors({});
      } else {
        console.error('❌ Registration failed:', data.error);
        setMessageType('error');
        setMessageContent({
          title: 'Registration Failed',
          description: data.message || 'Please check your information and try again.'
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
    window.location.href = '/';
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  const handleJoinWhatsApp = () => {
    window.open('YOUR_WHATSAPP_GROUP_LINK_HERE', '_blank');
    closeMessage();
  };

  const isFormValid = () => {
    const baseValid = formData.teamLeaderName.trim() &&
                      formData.teamName.trim() &&
                      formData.phoneNumber.trim() &&
                      formData.email.trim() &&
                      formData.college &&
                      (formData.college !== 'Other' || formData.otherCollege.trim()) &&
                      formData.teamSize &&
                      formData.yearOfStudy;

    if (!baseValid) return false;

    if (parseInt(formData.teamSize) >= 2) {
      if (!formData.teamMember2Name.trim()) {
        return false;
      }
    }

    if (parseInt(formData.teamSize) === 3) {
      if (!formData.teamMember3Name.trim()) {
        return false;
      }
    }

    return true;
  };

  const Ben10Loading = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <img 
          src={omnitrix}
          alt="Ben 10 Omnitrix Watch" 
          className="w-24 h-24 object-contain animate-spin"
          style={{ animationDuration: '2s' }}
        />
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border border-green-300/30 animate-pulse"></div>
      </div>
      
      <div className="text-green-400 font-semibold animate-pulse text-lg">
        Registering Team...
      </div>
      
      <div className="text-green-300/60 text-sm">
        Activating Omnitrix...
      </div>
      
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 shadow-2xl shadow-green-400/20">
            <Ben10Loading />
          </div>
        </div>
      )}

      {showMessage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`bg-transparent border-2 rounded-xl p-8 shadow-2xl max-w-md w-full ${
            messageType === 'success' 
              ? 'border-green-400/60 shadow-green-400/20' 
              : 'border-red-400/60 shadow-red-400/20'
          }`}>
            <div className="text-center space-y-4">
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

              <h3 className={`text-2xl font-bold ${
                messageType === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {messageContent.title}
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                {messageContent.description}
              </p>

              {messageType === 'success' && (
                <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-4 animate-pulse">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-red-400 font-bold text-lg mb-1">⚠️ IMPORTANT!</p>
                      <p className="text-red-300 font-semibold text-sm">
                        You MUST join our WhatsApp group immediately to receive all updates and announcements!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                {messageType === 'success' && (
                  <button
                    onClick={handleJoinWhatsApp}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 animate-bounce"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>JOIN WHATSAPP GROUP NOW!</span>
                  </button>
                )}
                
                <button
                  onClick={closeMessage}
                  className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                    messageType === 'success' 
                      ? 'bg-transparent border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 shadow-lg hover:shadow-green-400/30' 
                      : 'bg-transparent border-2 border-red-400/60 text-red-400 hover:bg-red-400/10 hover:border-red-400 hover:text-red-300 shadow-lg hover:shadow-red-400/30'
                  }`}
                >
                  {messageType === 'success' ? 'Close (I\'ll Join Later)' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      <div className={`text-center mb-8 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Team Registration</h1>
        <p className="text-green-400/80 text-lg">Register your team for Omnitrix Hackathon 2025</p>
      </div>

      {/* Critical WhatsApp Warning Banner */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-red-500/10 border-4 border-red-500 rounded-xl p-6 shadow-2xl shadow-red-500/30 animate-pulse">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-red-500 mb-3">⚠️ CRITICAL: JOIN WHATSAPP GROUP!</h3>
              <p className="text-red-300 text-lg font-semibold leading-relaxed mb-3">
                After successful registration, you will receive a popup. <span className="text-red-400 underline">You MUST click the red button to join our official WhatsApp group.</span>
              </p>
              <p className="text-red-200 font-medium">
                All important updates, announcements, and event details will be shared ONLY through WhatsApp. Missing the group means missing critical information!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
          <div className="space-y-8">
            
            <div className="space-y-6">
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
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    validationErrors.teamLeaderName 
                      ? 'border-red-400/60 focus:border-red-400' 
                      : 'border-green-400/30 focus:border-green-400/60'
                  }`}
                  placeholder="Enter team leader's full name"
                />
                {validationErrors.teamLeaderName && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.teamLeaderName}</p>
                )}
              </div>
            </div>

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
                className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                  validationErrors.teamName 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
                placeholder="Enter your team name"
              />
              {validationErrors.teamName && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.teamName}</p>
              )}
            </div>

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
                className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                  validationErrors.phoneNumber 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
                placeholder="Enter 10-digit phone number"
              />
              {validationErrors.phoneNumber && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.phoneNumber}</p>
              )}
            </div>

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
                className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                  validationErrors.email 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
                placeholder="Enter email address"
              />
              {validationErrors.email && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                College <span className="text-red-400">*</span>
              </label>
              <select
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                required
                className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                  validationErrors.college 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
              >
                <option value="" className="bg-slate-800 text-gray-300">Select your college</option>
                {colleges.map((college, index) => (
                  <option key={index} value={college} className="bg-slate-800 text-white">
                    {college}
                  </option>
                ))}
                <option value="Other" className="bg-slate-800 text-green-400">Other</option>
              </select>
              {validationErrors.college && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.college}</p>
              )}
            </div>

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
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    validationErrors.otherCollege 
                      ? 'border-red-400/60 focus:border-red-400' 
                      : 'border-green-400/30 focus:border-green-400/60'
                  }`}
                  placeholder="Enter your college name"
                />
                {validationErrors.otherCollege && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.otherCollege}</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Team Size <span className="text-red-400">*</span>
                </label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  required
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                    validationErrors.teamSize 
                      ? 'border-red-400/60 focus:border-red-400' 
                      : 'border-green-400/30 focus:border-green-400/60'
                  }`}
                >
                  <option value="" className="bg-slate-800 text-gray-300">Select team size</option>
                  {teamSizes.map((size, index) => (
                    <option key={index} value={size} className="bg-slate-800 text-white">
                      {size} Members
                    </option>
                  ))}
                </select>
                {validationErrors.teamSize && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.teamSize}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Year of Study <span className="text-red-400">*</span>
                </label>
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  required
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                    validationErrors.yearOfStudy 
                      ? 'border-red-400/60 focus:border-red-400' 
                      : 'border-green-400/30 focus:border-green-400/60'
                  }`}
                >
                  <option value="" className="bg-slate-800 text-gray-300">Select year</option>
                  {yearsOfStudy.map((year, index) => (
                    <option key={index} value={year} className="bg-slate-800 text-white">
                      {year}
                    </option>
                  ))}
                </select>
                {validationErrors.yearOfStudy && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.yearOfStudy}</p>
                )}
              </div>
            </div>

            {formData.teamSize && parseInt(formData.teamSize) >= 2 && (
              <div className="space-y-8 pt-4 border-t border-green-400/20">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Team Members</h2>
                
                <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Team Member 2 <span className="text-red-400">*</span>
                  </h3>
                  <div className="space-y-2">
                    <label className="block text-white font-semibold">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="teamMember2Name"
                      value={formData.teamMember2Name}
                      onChange={handleInputChange}
                      required
                      className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                        validationErrors.teamMember2Name 
                          ? 'border-red-400/60 focus:border-red-400' 
                          : 'border-green-400/30 focus:border-green-400/60'
                      }`}
                      placeholder="Enter team member's full name"
                    />
                    {validationErrors.teamMember2Name && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.teamMember2Name}</p>
                    )}
                  </div>
                </div>

                {parseInt(formData.teamSize) === 3 && (
                  <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Team Member 3 <span className="text-red-400">*</span>
                    </h3>
                    <div className="space-y-2">
                      <label className="block text-white font-semibold">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="teamMember3Name"
                        value={formData.teamMember3Name}
                        onChange={handleInputChange}
                        required
                        className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          validationErrors.teamMember3Name 
                            ? 'border-red-400/60 focus:border-red-400' 
                            : 'border-green-400/30 focus:border-green-400/60'
                        }`}
                        placeholder="Enter team member's full name"
                      />
                      {validationErrors.teamMember3Name && (
                        <p className="text-red-400 text-sm mt-1">{validationErrors.teamMember3Name}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !isFormValid()}
                className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg ${
                  isLoading || !isFormValid()
                    ? 'opacity-50 cursor-not-allowed bg-transparent border-gray-500/30 text-gray-500' 
                    : 'bg-transparent border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 hover:shadow-green-400/30 cursor-pointer'
                }`}
              >
                {isLoading ? 'Registering...' : 'Register Team'}
              </button>
              
              {!isFormValid() && !isLoading && (
                <p className="text-yellow-400 text-sm mt-2 text-center">
                  Please fill in all required fields to enable registration
                </p>
              )}
            </div>

          </div>
        </div>
      </div>

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