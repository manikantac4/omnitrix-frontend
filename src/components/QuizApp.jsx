import React, { useState, useEffect } from 'react';

const QuizApp = () => {
  const [currentPage, setCurrentPage] = useState('verification'); // verification, rules, quiz, result
  const [teamId, setTeamId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

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
          setCurrentPage('rules');
        } else {
          setError(data.message || 'Invalid Team ID. Please check and try again.');
        }
      } catch (err) {
        setError('Connection error. Please check your internet and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
        {isLoading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                <div className="text-green-400 font-semibold animate-pulse">Verifying Team...</div>
              </div>
            </div>
          </div>
        )}

        <div className={`text-center mb-12 transition-all duration-1000 ${titleVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Join Quiz</h1>
          <p className="text-green-400/80 text-lg">Enter your Team ID to start the quiz</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 hover:border-green-400/60 transition-all">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Team ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={inputTeamId}
                  onChange={(e) => { setInputTeamId(e.target.value); setError(''); }}
                  onKeyPress={(e) => e.key === 'Enter' && inputTeamId.trim() && handleVerify()}
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all ${
                    error ? 'border-red-400/60' : 'border-green-400/30 focus:border-green-400/60'
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
                className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all ${
                  isLoading || !inputTeamId.trim()
                    ? 'opacity-50 cursor-not-allowed border-gray-500/30 text-gray-500' 
                    : 'border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/10'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Join Quiz'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Quiz Rules Component
  const QuizRules = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleStartQuiz = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('https://omnitrix-backend-1.onrender.com/api/quiz/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teamId })
        });

        const data = await response.json();

        if (data.success) {
          setQuestions(data.questions);
          setResponses(data.questions.map(q => ({ questionId: q._id, selectedOption: null })));
          setCurrentPage('quiz');
          setIsTimerActive(true);
        } else {
          alert(data.message || 'Error starting quiz');
        }
      } catch (err) {
        alert('Connection error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
        {isLoading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                <div className="text-green-400 font-semibold animate-pulse">Loading Quiz...</div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Quiz Rules</h1>
          <p className="text-green-400/80 text-lg">Team ID: <span className="font-bold">{teamId}</span></p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 space-y-6">
            <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">📋 Important Instructions</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold">⏱️</span>
                  <span><strong>Time Limit:</strong> 30 seconds per question</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold">❓</span>
                  <span><strong>Total Questions:</strong> 30 questions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold">⚡</span>
                  <span><strong>Auto-Progress:</strong> Questions will automatically move to the next after 30 seconds</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold">✅</span>
                  <span><strong>One Attempt:</strong> You can only take this quiz once</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold">📱</span>
                  <span><strong>Stable Connection:</strong> Ensure you have a stable internet connection</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 font-bold">⚠️</span>
                  <span className="text-red-300"><strong>No Going Back:</strong> You cannot return to previous questions</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-red-400 font-bold text-lg mb-2">Ready to Start?</p>
                  <p className="text-red-300">Once you click Start Quiz, the timer will begin immediately. Make sure you're ready!</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              disabled={isLoading}
              className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all ${
                isLoading
                  ? 'opacity-50 cursor-not-allowed border-gray-500/30 text-gray-500' 
                  : 'border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/10'
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
    const currentQuestion = questions[currentQuestionIndex];

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

    const handleNext = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(30);
      } else {
        handleSubmit();
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
          setScore(data.score);
          setCurrentPage('result');
        } else {
          alert(data.message || 'Error submitting quiz');
        }
      } catch (err) {
        alert('Connection error. Please try again.');
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                <div className="text-green-400 font-semibold animate-pulse">Submitting Quiz...</div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-green-400 font-semibold">
              Question {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
              ⏱️ {timeLeft}s
            </div>
          </div>

          <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-8">{currentQuestion.question}</h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    currentResponse.selectedOption === option
                      ? 'border-green-400 bg-green-400/20 text-white'
                      : 'border-green-400/30 hover:border-green-400/60 hover:bg-green-400/5'
                  }`}
                >
                  <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <div className="text-gray-400 text-sm">
                {currentResponse.selectedOption ? '✅ Answer selected' : '⚠️ No answer selected'}
              </div>
              <button
                onClick={isLastQuestion ? handleSubmit : handleNext}
                disabled={isSubmitting}
                className="border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 font-bold py-3 px-8 rounded-lg transition-all"
              >
                {isLastQuestion ? 'Submit Quiz' : 'Next Question →'}
              </button>
            </div>
          </div>

          <div className="mt-4 bg-green-400/5 border border-green-400/20 rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-green-400">{Math.round((currentQuestionIndex + 1) / questions.length * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Result Component
  const QuizResult = () => {
    return (
      <div className="min-h-screen bg-transparent text-white p-4 sm:p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-green-400/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
            <p className="text-gray-300 mb-8">Team ID: {teamId}</p>

            <div className="bg-green-400/10 border-2 border-green-400 rounded-xl p-8 mb-8">
              <div className="text-5xl font-bold text-green-400 mb-2">{score}</div>
              <div className="text-xl text-gray-300">out of {questions.length}</div>
              <div className="text-lg text-green-400 mt-2">{Math.round((score / questions.length) * 100)}% Correct</div>
            </div>

            <p className="text-gray-300 mb-6">Your score has been recorded. Check the leaderboard to see your ranking!</p>

            <button
              onClick={() => window.location.href = '/'}
              className="border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 font-bold py-3 px-8 rounded-lg transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render current page
  return (
    <>
      {currentPage === 'verification' && <TeamVerification />}
      {currentPage === 'rules' && <QuizRules />}
      {currentPage === 'quiz' && <QuizQuestion />}
      {currentPage === 'result' && <QuizResult />}
    </>
  );
};

export default QuizApp;