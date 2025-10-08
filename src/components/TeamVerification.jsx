import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeamVerification = () => {
  const navigate = useNavigate();
  const [teamId, setTeamId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [titleVisible, setTitleVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleVerify = async () => {
    if (!teamId.trim()) {
      setError('Please enter your Team ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://omnitrix-backend-1.onrender.com/api/quiz/verifyTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamId: teamId.trim() })
      });

      const data = await response.json();

      if (data.success) {
        navigate('/quiz-rules', { state: { teamId: teamId.trim() } });
      } else {
        setError(data.message || 'Invalid Team ID. Please check and try again.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    window.location.href = '/';
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping"></div>
      </div>
      <div className="text-green-400 font-semibold animate-pulse text-lg">
        Verifying Team...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 shadow-2xl shadow-green-400/20">
            <LoadingSpinner />
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

      <div className={`text-center mb-12 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Join Quiz</h1>
        <p className="text-green-400/80 text-lg">Enter your Team ID to start the quiz</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Team ID <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={teamId}
                onChange={(e) => {
                  setTeamId(e.target.value);
                  setError('');
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && teamId.trim()) {
                    handleVerify();
                  }
                }}
                className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                  error 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
                placeholder="Enter your Team ID (e.g., TEAM001)"
              />
              {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-gray-300 text-sm">
                  <p className="font-semibold text-green-400 mb-1">Important Information:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Your Team ID was sent to the team leader's email after registration</li>
                    <li>Check your Spam/Promotions folder if you didn't receive it</li>
                    <li>Each team can only attempt the quiz once</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={isLoading || !teamId.trim()}
              className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg ${
                isLoading || !teamId.trim()
                  ? 'opacity-50 cursor-not-allowed bg-transparent border-gray-500/30 text-gray-500' 
                  : 'bg-transparent border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 hover:shadow-green-400/30 cursor-pointer'
              }`}
            >
              {isLoading ? 'Verifying...' : 'Join Quiz'}
            </button>
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

export default TeamVerification;