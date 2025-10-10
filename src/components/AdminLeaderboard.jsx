import React, { useState, useEffect } from 'react';

const AdminLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [titleVisible, setTitleVisible] = useState(false);

  // Simple admin password (in production, use proper authentication)
  const ADMIN_PASSWORD = 'omnitrix2025';

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeaderboard();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://omnitrix-backend-epg5.onrender.com/api/quiz/leaderboard');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setLeaderboardData(data);
      } else {
        setError('Error loading leaderboard data');
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Connection error. Please check your internet.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRankColor = (index) => {
    if (index === 0) return 'text-yellow-400 border-yellow-400/60';
    if (index === 1) return 'text-gray-300 border-gray-400/60';
    if (index === 2) return 'text-orange-400 border-orange-400/60';
    return 'text-green-400 border-green-400/30';
  };

  const getRankIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent text-white p-4 sm:p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className={`text-center mb-8 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Admin Access</h1>
            <p className="text-green-400/80 text-lg">Enter password to view leaderboard</p>
          </div>

          <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 hover:border-green-400/60 transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Admin Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  onKeyPress={(e) => e.key === 'Enter' && password && handleLogin()}
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all ${
                    error ? 'border-red-400/60' : 'border-green-400/30 focus:border-green-400/60'
                  }`}
                  placeholder="Enter admin password"
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

              <button
                onClick={handleLogin}
                disabled={!password}
                className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all ${
                  !password
                    ? 'opacity-50 cursor-not-allowed border-gray-500/30 text-gray-500' 
                    : 'border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/10'
                }`}
              >
                Access Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Leaderboard Screen
  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className={`transition-all duration-1000 ${titleVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Quiz Leaderboard</h1>
            <p className="text-green-400/80 text-lg">Omnitrix Hackathon 2025</p>
          </div>
          <button
            onClick={fetchLeaderboard}
            disabled={isLoading}
            className="border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 font-bold py-3 px-6 rounded-lg transition-all flex items-center space-x-2"
          >
            <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-green-400 font-semibold">Loading leaderboard...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border-2 border-red-500 rounded-xl p-8 text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Error Loading Data</h3>
            <p className="text-red-300">{error}</p>
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className="bg-green-400/5 border-2 border-green-400/30 rounded-xl p-12 text-center">
            <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-2xl font-bold text-green-400 mb-2">No Submissions Yet</h3>
            <p className="text-gray-300">The leaderboard will update as teams complete the quiz.</p>
          </div>
        ) : (
          <>
            <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Total Participants:</span>
                <span className="text-green-400 font-bold text-lg">{leaderboardData.length} Teams</span>
              </div>
            </div>

            <div className="space-y-4">
              {leaderboardData.map((entry, index) => (
                <div
                  key={entry._id}
                  className={`bg-transparent border-2 rounded-xl p-6 hover:shadow-lg transition-all ${getRankColor(index)}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className={`text-3xl font-bold w-16 h-16 flex items-center justify-center rounded-full border-2 ${getRankColor(index)}`}>
                        {getRankIcon(index)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{entry.teamId}</h3>
                        <p className="text-gray-400 text-sm">Completed: {formatDate(entry.completedAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">{entry.score}</div>
                        <div className="text-sm text-gray-400">Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {Math.round((entry.score / 30) * 100)}%
                        </div>
                        <div className="text-sm text-gray-400">Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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

export default AdminLeaderboard;