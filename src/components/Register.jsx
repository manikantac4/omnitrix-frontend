import React, { useState, useEffect } from 'react';
import omnitrix from '../assets/omnitrix.png'

const RegistrationComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success'); // 'success' or 'error'
  const [messageContent, setMessageContent] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    teamLeaderName: '',
    teamLeaderGender: '',
    teamName: '',
    phoneNumber: '',
    email: '',
    college: '',
    otherCollege: '',
    teamSize: '',
    yearOfStudy: '',
    teamMember2Name: '',
    teamMember2Gender: '',
    teamMember3Name: '',
    teamMember3Gender: ''
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
  const genderOptions = ['Male', 'Female', 'Other'];

  // Validation functions
  const validateForm = () => {
    const errors = {};

    // Team Leader Name validation
    if (!formData.teamLeaderName.trim()) {
      errors.teamLeaderName = 'Team leader name is required';
    } else if (formData.teamLeaderName.trim().length < 2) {
      errors.teamLeaderName = 'Name must be at least 2 characters';
    }

    // Team Leader Gender validation
    if (!formData.teamLeaderGender) {
      errors.teamLeaderGender = 'Team leader gender is required';
    }

    // Team Name validation
    if (!formData.teamName.trim()) {
      errors.teamName = 'Team name is required';
    } else if (formData.teamName.trim().length < 2) {
      errors.teamName = 'Team name must be at least 2 characters';
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    // College validation
    if (!formData.college) {
      errors.college = 'Please select your college';
    } else if (formData.college === 'Other' && !formData.otherCollege.trim()) {
      errors.otherCollege = 'Please enter your college name';
    }

    // Team Size validation
    if (!formData.teamSize) {
      errors.teamSize = 'Please select team size';
    }

    // Year of Study validation
    if (!formData.yearOfStudy) {
      errors.yearOfStudy = 'Please select year of study';
    }

    // Team Member 2 validation (Required for both team sizes)
    if (formData.teamSize && parseInt(formData.teamSize) >= 2) {
      if (!formData.teamMember2Name.trim()) {
        errors.teamMember2Name = 'Second team member name is required';
      } else if (formData.teamMember2Name.trim().length < 2) {
        errors.teamMember2Name = 'Name must be at least 2 characters';
      }

      if (!formData.teamMember2Gender) {
        errors.teamMember2Gender = 'Second team member gender is required';
      }
    }

    // Team Member 3 validation (Optional for team size 3, but if name is provided, gender is required)
    if (formData.teamSize && parseInt(formData.teamSize) === 3) {
      if (formData.teamMember3Name.trim() && !formData.teamMember3Gender) {
        errors.teamMember3Gender = 'Gender is required when name is provided';
      }
      if (formData.teamMember3Gender && !formData.teamMember3Name.trim()) {
        errors.teamMember3Name = 'Name is required when gender is selected';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Check for team size change first to handle clearing fields
    if (name === 'teamSize') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        teamMember2Name: '',
        teamMember2Gender: '',
        teamMember3Name: '',
        teamMember3Gender: ''
      }));
      
      // Clear team member validation errors
      setValidationErrors(prevErrors => {
        const {  ...rest } = prevErrors;
        return rest;
      });
      return; // Exit early to avoid subsequent logic
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear otherCollege field if college selection is not "Other"
    if (name === 'college' && value !== 'Other') {
      setFormData(prev => ({
        ...prev,
        college: value,
        otherCollege: ''
      }));
      // Also clear otherCollege validation error
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
    
    // Validate form before submission
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

    // Prepare final data
    const finalFormData = {
      ...formData,
      college: formData.college === 'Other' ? formData.otherCollege : formData.college,
      // Trim all string values
      teamLeaderName: formData.teamLeaderName.trim(),
      teamName: formData.teamName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim().toLowerCase(),
      teamMember2Name: formData.teamMember2Name.trim(),
      teamMember3Name: formData.teamMember3Name.trim(),
    };

    // Remove the otherCollege field before sending
    delete finalFormData.otherCollege;

    // Remove empty team member 3 fields if not provided
    if (!finalFormData.teamMember3Name) {
      delete finalFormData.teamMember3Name;
      delete finalFormData.teamMember3Gender;
    }

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
        
        // Reset form on successful submission
        setFormData({
          teamLeaderName: '',
          teamLeaderGender: '',
          teamName: '',
          phoneNumber: '',
          email: '',
          college: '',
          otherCollege: '',
          teamSize: '',
          yearOfStudy: '',
          teamMember2Name: '',
          teamMember2Gender: '',
          teamMember3Name: '',
          teamMember3Gender: ''
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
    // Navigate back to home
    window.location.href = '/';
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  // Check if form is valid for submit button state
  const isFormValid = () => {
    // This is a simplified check for UI purposes, the full validation is in validateForm()
    const baseValid = formData.teamLeaderName.trim() &&
                      formData.teamLeaderGender &&
                      formData.teamName.trim() &&
                      formData.phoneNumber.trim() &&
                      formData.email.trim() &&
                      formData.college &&
                      (formData.college !== 'Other' || formData.otherCollege.trim()) &&
                      formData.teamSize &&
                      formData.yearOfStudy;

    if (!baseValid) return false;

    // Check team member 2 (required for both team sizes)
    if (parseInt(formData.teamSize) >= 2) {
      if (!formData.teamMember2Name.trim() || !formData.teamMember2Gender) {
        return false;
      }
    }

    // Check team member 3 (if either field is filled, both must be filled)
    if (parseInt(formData.teamSize) === 3) {
      const hasMember3Name = !!formData.teamMember3Name.trim();
      const hasMember3Gender = !!formData.teamMember3Gender;
      if (hasMember3Name !== hasMember3Gender) {
        return false;
      }
    }

    return true;
  };

  // Ben 10 Watch Loading Component
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
            
            {/* Team Leader Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Team Leader Gender */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Gender <span className="text-red-400">*</span>
                </label>
                <select
                  name="teamLeaderGender"
                  value={formData.teamLeaderGender}
                  onChange={handleInputChange}
                  required
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                    validationErrors.teamLeaderGender 
                      ? 'border-red-400/60 focus:border-red-400' 
                      : 'border-green-400/30 focus:border-green-400/60'
                  }`}
                >
                  <option value="" className="bg-slate-800 text-gray-300">Select gender</option>
                  {genderOptions.map((gender, index) => (
                    <option key={index} value={gender} className="bg-slate-800 text-white">
                      {gender}
                    </option>
                  ))}
                </select>
                {validationErrors.teamLeaderGender && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.teamLeaderGender}</p>
                )}
              </div>
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

            {/* Team Members Section - Shows when team size is selected */}
            {formData.teamSize && parseInt(formData.teamSize) >= 2 && (
              <div className="space-y-8 pt-4 border-t border-green-400/20">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Team Members</h2>
                
                {/* Team Member 2 - Required */}
                <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Team Member 2 <span className="text-red-400">*</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Team Member 2 Name */}
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

                    {/* Team Member 2 Gender */}
                    <div className="space-y-2">
                      <label className="block text-white font-semibold">
                        Gender <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="teamMember2Gender"
                        value={formData.teamMember2Gender}
                        onChange={handleInputChange}
                        required
                        className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                          validationErrors.teamMember2Gender 
                            ? 'border-red-400/60 focus:border-red-400' 
                            : 'border-green-400/30 focus:border-green-400/60'
                        }`}
                      >
                        <option value="" className="bg-slate-800 text-gray-300">Select gender</option>
                        {genderOptions.map((gender, index) => (
                          <option key={index} value={gender} className="bg-slate-800 text-white">
                            {gender}
                          </option>
                        ))}
                      </select>
                      {validationErrors.teamMember2Gender && (
                        <p className="text-red-400 text-sm mt-1">{validationErrors.teamMember2Gender}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Team Member 3 - Optional (only for 3-member teams) */}
                {parseInt(formData.teamSize) === 3 && (
                  <div className="bg-blue-400/5 border border-blue-400/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Team Member 3 <span className="text-blue-400">(Optional)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Team Member 3 Name */}
                      <div className="space-y-2">
                        <label className="block text-white font-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="teamMember3Name"
                          value={formData.teamMember3Name}
                          onChange={handleInputChange}
                          className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                            validationErrors.teamMember3Name 
                              ? 'border-red-400/60 focus:border-red-400' 
                              : 'border-blue-400/30 focus:border-blue-400/60'
                          }`}
                          placeholder="Enter team member's full name (optional)"
                        />
                        {validationErrors.teamMember3Name && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.teamMember3Name}</p>
                        )}
                      </div>

                      {/* Team Member 3 Gender */}
                      <div className="space-y-2">
                        <label className="block text-white font-semibold">
                          Gender
                        </label>
                        <select
                          name="teamMember3Gender"
                          value={formData.teamMember3Gender}
                          onChange={handleInputChange}
                          className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                            validationErrors.teamMember3Gender 
                              ? 'border-red-400/60 focus:border-red-400' 
                              : 'border-blue-400/30 focus:border-blue-400/60'
                          }`}
                        >
                          <option value="" className="bg-slate-800 text-gray-300">Select gender (optional)</option>
                          {genderOptions.map((gender, index) => (
                            <option key={index} value={gender} className="bg-slate-800 text-white">
                              {gender}
                            </option>
                          ))}
                        </select>
                        {validationErrors.teamMember3Gender && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.teamMember3Gender}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-blue-300/70 text-sm mt-4">
                      Note: If you provide a name, gender selection becomes required and vice versa.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
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