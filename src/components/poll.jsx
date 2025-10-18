import React, { useState, useEffect } from 'react';

const VotingPoll = () => {
  const [voterEmail, setVoterEmail] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success');
  const [messageContent, setMessageContent] = useState({ title: '', description: '' });
  const [validationErrors, setValidationErrors] = useState({ voterEmail: '', selectedTeam: '' });
  const [titleVisible, setTitleVisible] = useState(false);

  // 1. New state for fetched teams
  const [topTeams, setTopTeams] = useState([]); 
  // 2. New state for teams loading and error
  const [isTeamsLoading, setIsTeamsLoading] = useState(true);
  const [teamsError, setTeamsError] = useState(null);

  // API Endpoints
  const TEAMS_API_ENDPOINT = 'YOUR_TEAMS_API_ENDPOINT'; // <-- REPLACE with actual Teams API
  const VOTING_API_ENDPOINT = 'YOUR_VOTING_API_ENDPOINT'; // <-- Already in the original code

  // Effect to manage title visibility
  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  // 3. Effect to fetch teams from the backend
  useEffect(() => {
    const fetchTeams = async () => {
      setIsTeamsLoading(true);
      setTeamsError(null);
      try {
        const response = await fetch(TEAMS_API_ENDPOINT);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Assuming the API returns an array of teams: [{ teamId: '...', teamName: '...' }]
        setTopTeams(data); 

      } catch (err) {
        console.error('❌ Error fetching teams:', err);
        setTeamsError('Failed to load teams. Please try again later.');
        // Display a general error message to the user if teams can't be loaded
        setMessageType('error');
        setMessageContent({
            title: 'Team Load Error',
            description: 'Could not fetch the list of teams from the server. Please check the API endpoint and your connection.'
        });
        setShowMessage(true);

      } finally {
        setIsTeamsLoading(false);
      }
    };

    fetchTeams();
  }, [TEAMS_API_ENDPOINT]); // Re-run if API endpoint changes (though not expected in this component)

  const validateEmail = (email) => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      return 'Email address is required';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return 'Please enter a valid email address';
    }

    return '';
  };

  const validateForm = () => {
    const emailError = validateEmail(voterEmail);
    // 4. Added check for team list availability and team selection
    const selectedError = topTeams.length === 0 || !selectedTeam ? 'Please select a team to vote for' : '';

    setValidationErrors({
      voterEmail: emailError,
      selectedTeam: selectedError
    });

    if (emailError || selectedError) {
      return false;
    }

    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setVoterEmail(value);
    if (validationErrors.voterEmail) {
      setValidationErrors(prev => ({ ...prev, voterEmail: '' }));
    }
  };

  const handleTeamSelect = (teamId) => {
    setSelectedTeam(teamId);
    if (validationErrors.selectedTeam) {
      setValidationErrors(prev => ({ ...prev, selectedTeam: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setMessageType('error');
      setMessageContent({
        title: 'Validation Error',
        description: 'Please enter your email address and select a team to vote for.'
      });
      setShowMessage(true);
      return;
    }

    setIsLoading(true);

    const voteData = {
      voterEmail: voterEmail.trim().toLowerCase(),
      votedForTeamId: selectedTeam,
      vote: 1
    };

    console.log('Submitting vote:', voteData);

    try {
      const response = await fetch(VOTING_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteData)
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Vote submitted successfully:', data);
        setMessageType('success');
        setMessageContent({
          title: 'Vote Submitted Successfully!',
          description: `Your vote for Team ${selectedTeam} has been recorded. Thank you for participating! 👽`
        });
        setShowMessage(true);
        setVoterEmail('');
        setSelectedTeam('');
      } else {
        console.error('❌ Vote submission failed:', data.error);
        setMessageType('error');
        setMessageContent({
          title: 'Vote Submission Failed',
          description: data.message || 'You may have already voted or the email is invalid. Each email can only vote once!'
        });
        setShowMessage(true);
      }
    } catch (err) {
      console.error('❌ Error submitting vote:', err);
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

  const closeMessage = () => {
    setShowMessage(false);
  };

  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping"></div>
      </div>

      <div className="text-green-400 font-semibold animate-pulse text-lg">
        {isTeamsLoading ? 'Loading Teams...' : 'Submitting Vote...'}
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
      {(isLoading || isTeamsLoading) && ( // Combined loading state
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

      <div className={`text-center mb-8 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Cast Your Vote</h1>
        <p className="text-green-400/80 text-lg">Vote for your favorite team in Omnitrix Hackathon 2025</p>
      </div>

      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-green-400/5 border-2 border-green-400/30 rounded-xl p-6 shadow-lg shadow-green-400/10">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-400 mb-2">How to Vote</h3>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Enter <span className="text-green-400 font-semibold">YOUR Email Address</span> (used for your team registration)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Select one of the <span className="text-green-400 font-semibold">{topTeams.length > 0 ? topTeams.length : 'Top'} Teams</span> to vote for</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-1">⚠️</span>
                  <span className="text-red-300 font-semibold">Each email can vote only ONCE!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Your Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={voterEmail}
                  onChange={handleEmailChange}
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-4 text-white text-lg placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    validationErrors.voterEmail
                      ? 'border-red-400/60 focus:border-red-400'
                      : 'border-green-400/30 focus:border-green-400/60'
                  }`}
                  placeholder="teamleader@example.com"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-green-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {validationErrors.voterEmail && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.voterEmail}</p>
              )}
              <p className="text-gray-400 text-sm mt-1">Enter the email address used for your team registration</p>
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3 mt-2">
                <p className="text-yellow-300 text-sm flex items-start space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span><strong>One-time voting only!</strong> Your email will be checked against our database. Each email can vote only once.</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-white font-semibold text-lg">
                Select Team to Vote For <span className="text-red-400">*</span>
              </label>
              
              {/* 5. Conditional rendering for teams list */}
              {isTeamsLoading ? (
                <div className="text-center p-8 text-green-400">Loading team options...</div>
              ) : teamsError ? (
                <div className="text-center p-8 text-red-400 border border-red-400/50 rounded-lg">{teamsError}</div>
              ) : topTeams.length === 0 ? (
                <div className="text-center p-8 text-yellow-400 border border-yellow-400/50 rounded-lg">No teams available for voting at this time.</div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {topTeams.map((team, index) => (
                    <button
                      key={team.teamId}
                      onClick={() => handleTeamSelect(team.teamId)}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedTeam === team.teamId
                          ? 'border-green-400 bg-green-400/10 shadow-lg shadow-green-400/20'
                          : 'border-green-400/30 bg-transparent hover:border-green-400/60 hover:bg-green-400/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                            selectedTeam === team.teamId
                              ? 'bg-green-400 text-black'
                              : 'bg-green-400/20 text-green-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white font-mono">{team.teamId}</h3>
                            <p className="text-gray-400 text-sm">{team.teamName}</p>
                          </div>
                        </div>
                        
                        {selectedTeam === team.teamId && (
                          <div className="flex-shrink-0">
                            <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {validationErrors.selectedTeam && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.selectedTeam}</p>
              )}
            </div>

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                // 6. Disable submission button if teams are loading or unavailable
                disabled={isLoading || isTeamsLoading || !voterEmail.trim() || !selectedTeam || topTeams.length === 0}
                className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg flex items-center justify-center space-x-3 ${
                  isLoading || isTeamsLoading || !voterEmail.trim() || !selectedTeam || topTeams.length === 0
                    ? 'opacity-50 cursor-not-allowed bg-transparent border-gray-500/30 text-gray-500'
                    : 'bg-transparent border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 hover:shadow-green-400/30 cursor-pointer'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{isLoading ? 'Submitting Vote...' : 'Submit Vote'}</span>
              </button>
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

export default VotingPoll;