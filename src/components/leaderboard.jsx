import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_LEADERBOARD_API_ENDPOINT');
      const data = await response.json();

      if (data.success) {
        // Sort teams by votes in descending order and take top 5
        const sortedTeams = data.teams
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 5);
        setTeams(sortedTeams);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setError('Failed to load leaderboard data');
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Unable to connect to server');
      // Mock data for demonstration
      setTeams([
        { teamId: 'BEN01', votes: 150, rank: 1 },
        { teamId: 'BEN05', votes: 145, rank: 2 },
        { teamId: 'BEN03', votes: 132, rank: 3 },
        { teamId: 'BEN08', votes: 128, rank: 4 },
        { teamId: 'BEN12', votes: 115, rank: 5 }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-green-400 to-green-600';
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) {
      return (
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return (
      <div className="w-8 h-8 flex items-center justify-center font-bold text-white text-xl">
        {rank}
      </div>
    );
  };

  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping"></div>
      </div>
      <div className="text-green-400 font-semibold animate-pulse text-lg">
        Loading Leaderboard...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      <div className={`text-center mb-8 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Leaderboard</h1>
        <p className="text-green-400/80 text-lg">Top 5 Teams - Omnitrix Hackathon 2025</p>
      </div>

      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between bg-green-400/5 border-2 border-green-400/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-green-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300 text-sm sm:text-base">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
          <button
            onClick={fetchLeaderboard}
            disabled={isLoading}
            className="bg-transparent border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-red-400/10 border-2 border-red-400/60 rounded-xl p-4 flex items-center space-x-3">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-red-300">{error}</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-6 sm:p-8 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
          {isLoading ? (
            <LoadingAnimation />
          ) : teams.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-green-400/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-400 text-lg">No teams have received votes yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {teams.map((team, index) => (
                <div
                  key={team.teamId}
                  className={`relative overflow-hidden rounded-xl transition-all duration-500 transform hover:scale-[1.02] ${
                    index === 0 ? 'animate-pulse' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${getRankColor(
                      index + 1
                    )} opacity-10`}
                  ></div>
                  
                  <div className={`relative border-2 rounded-xl p-4 sm:p-6 transition-all duration-300 ${
                    index === 0
                      ? 'border-yellow-400/60 shadow-lg shadow-yellow-400/20'
                      : index === 1
                      ? 'border-gray-400/60 shadow-lg shadow-gray-400/20'
                      : index === 2
                      ? 'border-orange-400/60 shadow-lg shadow-orange-400/20'
                      : 'border-green-400/30'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 sm:space-x-6">
                        <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${getRankColor(
                          index + 1
                        )} flex items-center justify-center shadow-lg`}>
                          {getRankIcon(index + 1)}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono">
                              {team.teamId}
                            </h3>
                            {index === 0 && (
                              <span className="hidden sm:inline-block bg-yellow-400/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                                LEADING
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">
                            Rank #{index + 1}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                          <div>
                            <div className="text-3xl sm:text-4xl font-bold text-green-400">
                              {team.votes}
                            </div>
                            <div className="text-xs text-gray-400">votes</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {index < 3 && (
                      <div className="mt-4 w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getRankColor(index + 1)} transition-all duration-1000 ease-out`}
                          style={{
                            width: `${teams.length > 0 ? (team.votes / teams[0].votes) * 100 : 0}%`
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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

export default Leaderboard;