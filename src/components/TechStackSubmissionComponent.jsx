import React, { useState, useEffect } from 'react';

const TechStackSubmissionComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success');
  const [messageContent, setMessageContent] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    teamId: '',
    teamName: '',
    problemStatement: '',
    techStack: ''
  });

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  const problemStatements = [
    'AI Agents & Automation',
    'Web 3.0 & Blockchain',
    'Full Stack Development',
    'Open Innovation'
  ];

  const validateForm = () => {
    const errors = {};

    if (!formData.teamId.trim()) {
      errors.teamId = 'Team ID is required';
    } else if (formData.teamId.trim().length < 3) {
      errors.teamId = 'Please enter a valid Team ID';
    }

    if (!formData.teamName.trim()) {
      errors.teamName = 'Team name is required';
    } else if (formData.teamName.trim().length < 2) {
      errors.teamName = 'Team name must be at least 2 characters';
    }

    if (!formData.problemStatement) {
      errors.problemStatement = 'Please select a problem statement';
    }

    if (!formData.techStack.trim()) {
      errors.techStack = 'Please enter your tech stack';
    } else {
      const technologies = formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech);
      if (technologies.length < 2) {
        errors.techStack = 'Please enter at least 2 technologies separated by commas';
      }
      if (technologies.some(tech => tech.length < 2)) {
        errors.techStack = 'Each technology name must be at least 2 characters';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
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
  };

  const handleSubmit = async () => {
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

    const technologies = formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech);

    const submissionData = {
      teamId: formData.teamId.trim(),
      teamName: formData.teamName.trim(),
      problemStatement: formData.problemStatement,
      techStack: technologies
    };

    console.log('Submitting tech stack:', submissionData);

    try {
      const response = await fetch('https://omnitrix-backend-epg5.onrender.com/api/submit/round-two', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Tech stack submitted successfully:', data);
        setMessageType('success');
        setMessageContent({
          title: 'Tech Stack Submitted Successfully! 🎉',
          description: 'Your tech stack has been submitted successfully. Our team will review it and get back to you soon. Good luck!'
        });
        setShowMessage(true);
        
        setFormData({
          teamId: '',
          teamName: '',
          problemStatement: '',
          techStack: ''
        });
        setValidationErrors({});
      } else {
        console.error('❌ Submission failed:', data.error);
        setMessageType('error');
        setMessageContent({
          title: 'Submission Failed',
          description: data.message || 'Please check your information and try again.'
        });
        setShowMessage(true);
      }
    } catch (err) {
      console.error('❌ Error submitting tech stack:', err);
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

  const isFormValid = () => {
    return formData.teamId.trim() &&
           formData.teamName.trim() &&
           formData.problemStatement &&
           formData.techStack.trim();
  };

  const getTechCount = () => {
    if (!formData.techStack.trim()) return 0;
    return formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech).length;
  };

  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-green-400/20 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="text-green-400 font-semibold animate-pulse text-lg">
        Submitting Your Tech Stack...
      </div>
      
      <div className="text-green-300/60 text-sm">
        Please wait while we process your submission
      </div>
      
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-8">
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 shadow-2xl shadow-green-400/20">
            <LoadingAnimation />
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

              <button
                onClick={closeMessage}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                  messageType === 'success' 
                    ? 'bg-green-400/10 border-2 border-green-400/60 text-green-400 hover:bg-green-400/20 hover:border-green-400' 
                    : 'bg-red-400/10 border-2 border-red-400/60 text-red-400 hover:bg-red-400/20 hover:border-red-400'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <button
          onClick={handleBackClick}
          className="flex items-center space-x-2 bg-transparent border-2 border-green-400/30 text-green-400 hover:border-green-400/60 hover:text-green-300 transition-all duration-300 px-4 py-2 rounded-lg"
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
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Tech Stack Submission</h1>
        <p className="text-green-400/80 text-lg">Submit your technology stack for Omnitrix Hackathon 2025</p>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-transparent border-2 border-blue-400/60 rounded-xl p-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <svg className="w-8 h-8 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">Important Information</h3>
              <ul className="text-blue-200 space-y-2 text-sm">
                <li>• Use your registered Team ID and Team Name</li>
                <li>• Enter technologies separated by commas (e.g., Java, SpringBoot, React, MongoDB)</li>
                <li>• Include at least 2 technologies in your stack</li>
                <li>• Make sure all information is accurate before submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Team ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-900/50 border-2 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    validationErrors.teamId 
                      ? 'border-red-400/60 focus:border-red-400' 
                      : 'border-green-400/30 focus:border-green-400/60'
                  }`}
                  placeholder="Enter your Team ID"
                />
                {validationErrors.teamId && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.teamId}</p>
                )}
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
                  className={`w-full bg-gray-900/50 border-2 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    validationErrors.teamName 
                      ? 'border-red-400/60 focus:border-red-400' 
                      : 'border-green-400/30 focus:border-green-400/60'
                  }`}
                  placeholder="Enter your Team Name"
                />
                {validationErrors.teamName && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.teamName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Problem Statement <span className="text-red-400">*</span>
              </label>
              <select
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleInputChange}
                className={`w-full bg-gray-900/50 border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                  validationErrors.problemStatement 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
              >
                <option value="" className="bg-gray-800">Select a problem statement</option>
                {problemStatements.map((statement, index) => (
                  <option key={index} value={statement} className="bg-gray-800 text-white">
                    {statement}
                  </option>
                ))}
              </select>
              {validationErrors.problemStatement && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.problemStatement}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-white font-semibold text-lg">
                  Tech Stack <span className="text-red-400">*</span>
                </label>
                <span className={`text-sm font-medium ${
                  getTechCount() < 2 ? 'text-red-400' : 'text-green-400'
                }`}>
                  {getTechCount()} {getTechCount() === 1 ? 'technology' : 'technologies'}
                </span>
              </div>
              <textarea
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                rows={6}
                className={`w-full bg-gray-900/50 border-2 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
                  validationErrors.techStack 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
                placeholder="Java, SpringBoot, React, MongoDB, Docker, AWS"
              />
              {validationErrors.techStack && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.techStack}</p>
              )}
              <div className="bg-gray-900/30 border border-green-400/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm mb-2 font-medium">Examples:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-400/10 border border-green-400/30 text-green-300 px-3 py-1 rounded-full text-xs">
                    Java, SpringBoot, MySQL
                  </span>
                  <span className="bg-green-400/10 border border-green-400/30 text-green-300 px-3 py-1 rounded-full text-xs">
                    Python, Django, PostgreSQL
                  </span>
                  <span className="bg-green-400/10 border border-green-400/30 text-green-300 px-3 py-1 rounded-full text-xs">
                    React, Node.js, MongoDB
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !isFormValid()}
                className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg ${
                  isLoading || !isFormValid()
                    ? 'opacity-50 cursor-not-allowed bg-gray-800/50 border-gray-500/30 text-gray-500' 
                    : 'bg-green-400/10 border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/20 hover:border-green-400 hover:shadow-green-400/30 cursor-pointer'
                }`}
              >
                {isLoading ? 'Submitting...' : 'Submit Tech Stack'}
              </button>
              
              {!isFormValid() && !isLoading && (
                <p className="text-yellow-400 text-sm mt-2 text-center">
                  Please fill in all required fields to submit your tech stack
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
      </div>
    </div>
  );
};

export default TechStackSubmissionComponent;