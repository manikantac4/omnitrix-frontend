import React, { useState, useEffect } from 'react';

const QuizApp = () => {
  const [currentPage, setCurrentPage] = useState('verification');
  const [teamId, setTeamId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [customAlert, setCustomAlert] = useState({ show: false, message: '' });

  const showCustomAlert = (message) => {
    setCustomAlert({ show: true, message });
  };

  const closeCustomAlert = () => {
    setCustomAlert({ show: false, message: '' });
  };

  // Team Verification Component
  const TeamVerification = () => {
    const [inputTeamId, setInputTeamId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [titleVisible, setTitleVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setTitleVisible(true), 300);
      return () => clearTimeout(timer);
    }, []);

    const handleVerify = async () => {
      if (!inputTeamId.trim()) {
        setError('Please enter your Team ID');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('https://omnitrix-backend-1.onrender.com/api/quiz/verifyTeam', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teamId: inputTeamId.trim() })
        });

        const data = await response.json();

        if (data.success) {
          setTeamId(inputTeamId.trim());
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentPage('rules');
            setIsTransitioning(false);
          }, 800);
        } else {
          setError(data.message || 'Invalid Team ID. Please check and try again.');
        }
      } catch {
        setError('Connection error. Please check your internet and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
        {isLoading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 animate-pulse">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                <div className="text-green-400 font-semibold animate-pulse">Verifying Team...</div>
              </div>
            </div>
          </div>
        )}

        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Join Quiz</h1>
          <p className="text-green-400/80 text-base sm:text-lg px-4">Enter your Team ID to start the quiz</p>
        </div>

        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-6 sm:p-8 hover:border-green-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20 cursor-default">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-white font-semibold text-base sm:text-lg">
                  Team ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={inputTeamId}
                  onChange={(e) => { setInputTeamId(e.target.value); setError(''); }}
                  onKeyPress={(e) => e.key === 'Enter' && inputTeamId.trim() && handleVerify()}
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all cursor-text ${
                    error ? 'border-red-400/60' : 'border-green-400/30 focus:border-green-400/60 focus:shadow-lg focus:shadow-green-400/20'
                  }`}
                  placeholder="Enter your Team ID (e.g., TEAM001)"
                />
                {error && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm mt-2 animate-shake">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-4 hover:bg-green-400/10 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-gray-300 text-sm">
                    <p className="font-semibold text-green-400 mb-1">Important Information:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Your Team ID was sent to the team leader's email</li>
                      <li>Check Spam/Promotions folder if not received</li>
                      <li>Each team can only attempt the quiz once</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleVerify}
                disabled={isLoading || !inputTeamId.trim()}
                className={`w-full border-2 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 ${
                  isLoading || !inputTeamId.trim()
                    ? 'opacity-50 cursor-not-allowed border-gray-500/30 text-gray-500' 
                    : 'border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/10 hover:shadow-lg hover:shadow-green-400/30 cursor-pointer active:scale-95'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Join Quiz'}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>
      </div>
    );
  };

  // Quiz Rules Component
  const QuizRules = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      setAnimate(true);
    }, []);

    const handleStartQuiz = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('https://omnitrix-backend-1.onrender.com/api/quiz/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teamId })
        });

        const data = await response.json();
        if (data.success && data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setResponses(data.questions.map(q => ({ questionId: q._id, selectedOption: null })));
          setCurrentQuestionIndex(0);
          setTimeLeft(30);
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentPage('quiz');
            setIsTransitioning(false);
            setIsTimerActive(true);
          }, 800);
        } else {
          showCustomAlert(data.message || 'Error starting quiz. No questions received.');
        }
      } catch {
        showCustomAlert('Connection error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className={`min-h-screen bg-transparent text-white p-4 sm:p-8 transition-all duration-800 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        {isLoading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 animate-pulse">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                <div className="text-green-400 font-semibold animate-pulse">Loading Quiz...</div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Quiz Rules</h1>
          <p className="text-green-400/80 text-base sm:text-lg">Team ID: <span className="font-bold">{teamId}</span></p>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-6 sm:p-8 space-y-6 hover:border-green-400/60 transition-all duration-300 cursor-default">
            <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-4 sm:p-6 hover:bg-green-400/10 transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-4">📋 Important Instructions</h2>
              <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start space-x-3 hover:text-white transition-colors">
                  <span className="text-green-400 font-bold text-lg">⏱️</span>
                  <span><strong>Time Limit:</strong> 30 seconds per question</span>
                </li>
                <li className="flex items-start space-x-3 hover:text-white transition-colors">
                  <span className="text-green-400 font-bold text-lg">❓</span>
                  <span><strong>Total Questions:</strong> 30 questions</span>
                </li>
                <li className="flex items-start space-x-3 hover:text-white transition-colors">
                  <span className="text-green-400 font-bold text-lg">⚡</span>
                  <span><strong>Auto-Progress:</strong> Questions will automatically move to the next after 30 seconds</span>
                </li>
                <li className="flex items-start space-x-3 hover:text-white transition-colors">
                  <span className="text-green-400 font-bold text-lg">✅</span>
                  <span><strong>One Attempt:</strong> You can only take this quiz once</span>
                </li>
                <li className="flex items-start space-x-3 hover:text-white transition-colors">
                  <span className="text-green-400 font-bold text-lg">📱</span>
                  <span><strong>Stable Connection:</strong> Ensure you have a stable internet connection</span>
                </li>
                <li className="flex items-start space-x-3 hover:text-white transition-colors">
                  <span className="text-red-400 font-bold text-lg">⚠️</span>
                  <span className="text-red-300"><strong>No Going Back:</strong> You cannot return to previous questions</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-4 sm:p-6 hover:bg-red-500/20 transition-all duration-300">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-red-400 font-bold text-base sm:text-lg mb-2">Ready to Start?</p>
                  <p className="text-red-300 text-sm sm:text-base">Once you click Start Quiz, the timer will begin immediately. Make sure you're ready!</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              disabled={isLoading}
              className={`w-full border-2 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 ${
                isLoading
                  ? 'opacity-50 cursor-not-allowed border-gray-500/30 text-gray-500' 
                  : 'border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/10 hover:shadow-lg hover:shadow-green-400/30 cursor-pointer active:scale-95'
              }`}
            >
              {isLoading ? 'Loading...' : 'Start Quiz'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Quiz Question Component
  const QuizQuestion = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); 
      return () => clearTimeout(timer);
    }, [currentQuestionIndex]);

    useEffect(() => {
      if (isTimerActive && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0 && isTimerActive) {
        handleNext();
      }
    }, [timeLeft, isTimerActive]);

    const handleOptionSelect = (option) => {
      const newResponses = [...responses];
      newResponses[currentQuestionIndex].selectedOption = option;
      setResponses(newResponses);
    };

    const handleNext = async () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(30);
      } else {
        await handleSubmit();
      }
    };

    const handleSubmit = async () => {
      setIsTimerActive(false);
      setIsSubmitting(true);

      try {
        const response = await fetch('https://omnitrix-backend-1.onrender.com/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teamId, responses })
        });

        const data = await response.json();

        if (data.success) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentPage('result');
            setIsTransitioning(false);
          }, 800);
        } else {
          showCustomAlert(data.message || 'Error submitting quiz');
        }
      } catch {
        showCustomAlert('Connection error. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    if (!currentQuestion) return null;

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const currentResponse = responses[currentQuestionIndex];

    return (
      <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 sm:p-12 animate-pulse">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <div className="absolute inset-0 border-4 border-green-400/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-green-400 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-transparent border-t-green-300 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
                  <div className="absolute inset-4 border-4 border-transparent border-t-green-200 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
                </div>
                <div className="text-green-400 font-bold text-lg sm:text-xl animate-pulse">Submitting Your Answers...</div>
                <div className="text-green-400/60 text-xs sm:text-sm text-center">Please wait, do not close this window</div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
            <div className="text-green-400 font-semibold text-sm sm:text-base">
              Question {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className={`text-xl sm:text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
              ⏱️ {timeLeft}s
            </div>
          </div>

          <div className={`bg-transparent border-2 border-green-400/30 rounded-xl p-6 sm:p-8 transition-all duration-500 ${
            isAnimating ? 'animate-door-open' : ''
          }`}>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 break-words">{currentQuestion.questionText}</h2>

            <div className="space-y-3 sm:space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                    currentResponse.selectedOption === option
                      ? 'border-green-400 bg-green-400/20 text-white shadow-lg shadow-green-400/30'
                      : 'border-green-400/30 hover:border-green-400/60 hover:bg-green-400/5'
                  }`}
                >
                  <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> <span className="break-words">{option}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-gray-400 text-xs sm:text-sm">
                {currentResponse.selectedOption ? '✅ Answer selected' : '⚠️ No answer selected'}
              </div>
              <button
                onClick={isLastQuestion ? handleSubmit : handleNext}
                disabled={isSubmitting}
                className={`w-full sm:w-auto border-2 font-bold py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed border-gray-500/30 text-gray-500'
                    : 'border-green-400/60 text-green-400 hover:bg-green-400/10 hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 cursor-pointer active:scale-95'
                }`}
              >
                {isLastQuestion ? 'Submit Quiz' : 'Next Question →'}
              </button>
            </div>
          </div>

          <div className="mt-4 bg-green-400/5 border border-green-400/20 rounded-lg p-4 hover:bg-green-400/10 transition-all duration-300">
            <div className="flex justify-between text-xs sm:text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-green-400">{Math.round((currentQuestionIndex + 1) / questions.length * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes doorOpen {
            0% {
              transform: perspective(1000px) rotateY(-90deg);
              opacity: 0;
            }
            100% {
              transform: perspective(1000px) rotateY(0deg);
              opacity: 1;
            }
          }
          .animate-door-open {
            animation: doorOpen 0.5s ease-out forwards;
            transform-origin: left center;
          }
        `}</style>
      </div>
    );
  };

  // Result Component
  const QuizResult = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      setAnimate(true);
    }, []);

    return (
      <div className={`min-h-screen bg-transparent text-white p-4 sm:p-8 flex items-center justify-center transition-all duration-800 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="max-w-2xl w-full px-4">
          <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-6 sm:p-8 text-center hover:border-green-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-green-400/20">
            <div className="mb-6 animate-bounce-slow">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-green-400/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Quiz Submitted Successfully!</h1>
            <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">Team ID: <span className="font-bold text-green-400">{teamId}</span></p>

            <div className="bg-green-400/10 border-2 border-green-400 rounded-xl p-6 sm:p-8 mb-6 sm:mb-8 hover:bg-green-400/20 transition-all duration-300">
              <div className="text-xl sm:text-2xl font-bold text-green-400 mb-4">🎉 Thank You for Participating!</div>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                Your answers have been submitted successfully. We will evaluate all submissions and announce the winning teams soon.
              </p>
            </div>

            <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-4 sm:p-6 mb-6 hover:bg-green-400/10 transition-all duration-300">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <p className="text-green-400 font-semibold mb-2 text-sm sm:text-base">What's Next?</p>
                  <ul className="text-gray-300 text-xs sm:text-sm space-y-1">
                    <li>• Results will be announced via email</li>
                    <li>• Keep an eye on your inbox for updates</li>
                    <li>• Winners will be contacted directly</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full sm:w-auto border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 font-bold py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 cursor-pointer active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        * {
          cursor: default;
        }
        input, textarea {
          cursor: text !important;
        }
        button:not(:disabled), a {
          cursor: pointer !important;
        }
        button:disabled {
          cursor: not-allowed !important;
        }
      `}</style>
      
      {/* Custom Alert Modal */}
      {customAlert.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-6 sm:p-8 max-w-md w-full animate-scale-in">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white text-center text-base sm:text-lg">{customAlert.message}</p>
              <button
                onClick={closeCustomAlert}
                className="w-full border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 hover:scale-105 font-bold py-3 px-6 rounded-lg transition-all duration-300 cursor-pointer active:scale-95"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
      
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-sweep"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-sweep {
          animation: sweep 0.8s ease-in-out;
        }
      `}</style>

      {currentPage === 'verification' && <TeamVerification />}
      {currentPage === 'rules' && <QuizRules />}
      {currentPage === 'quiz' && <QuizQuestion />}
      {currentPage === 'result' && <QuizResult />}
    </>
  );
};

export default QuizApp;3