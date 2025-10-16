import React, { useState } from 'react';
import omnitrixImg from "../assets/omnitrix.png";

const Ben10ComedyQuiz = () => {
  const questions = [
    {
      question: "Which alien would you use to cook instant noodles the fastest?",
      options: ["Heatblast", "Grey Matter", "Four Arms", "Wildmutt"],
      answer: "Heatblast",
      funnyResponse: "🔥 Heatblast says, 'Dinner in 3 seconds flat!'"
    },
    {
      question: "What happens if Ben sneezes while transforming?",
      options: ["He turns into two aliens!", "He blows up the Omnitrix", "He becomes Humungosneeze", "It restarts the device"],
      answer: "He turns into two aliens!",
      funnyResponse: "🤧 Bless you! Double the trouble!"
    },
    {
      question: "Who would win a dance battle?",
      options: ["XLR8", "Ripjaws", "Ghostfreak", "Upgrade"],
      answer: "XLR8",
      funnyResponse: "⚡ XLR8 moonwalked past everyone before the beat dropped!"
    },
    {
      question: "If the Omnitrix had a battery, what would it run on?",
      options: ["Plumber points", "Alien vibes", "Pure chaos", "Grandpa Max's coffee"],
      answer: "Grandpa Max's coffee",
      funnyResponse: "☕ Never underestimate that caffeine power!"
    },
    {
      question: "Ben accidentally turned into Grey Matter during a test. What happens next?",
      options: ["He builds a rocket", "He aces the test", "He hacks the school WiFi", "All of the above"],
      answer: "All of the above",
      funnyResponse: "🧠 Grey Matter never fails!"
    },
    {
      question: "What's Four Arms' favorite workout?",
      options: ["Yoga", "Four-handed pushups", "Pilates", "Just flexing"],
      answer: "Four-handed pushups",
      funnyResponse: "💪 Four Arms doesn't skip arm day... any of them!"
    },
    {
      question: "Why doesn't Wildmutt have eyes?",
      options: ["Budget cuts", "He sees with his nose", "They're invisible", "He's too cool for eyes"],
      answer: "He sees with his nose",
      funnyResponse: "👃 Who needs eyes when you can smell crime from a mile away?"
    },
    {
      question: "What's Upgrade's favorite hobby?",
      options: ["Gaming", "Merging with random tech", "Debugging", "Social media"],
      answer: "Merging with random tech",
      funnyResponse: "🤖 Upgrade is that friend who 'improves' your phone without asking!"
    },
    {
      question: "If Ghostfreak threw a party, what would it be like?",
      options: ["Dead silent", "A real scream", "Invisible guests only", "Spooky scary"],
      answer: "A real scream",
      funnyResponse: "👻 Ghostfreak knows how to raise spirits!"
    },
    {
      question: "What does Ben say when the Omnitrix times out at the worst moment?",
      options: ["Classic Ben luck!", "Not again!", "This is fine", "GRANDPA!!!"],
      answer: "Classic Ben luck!",
      funnyResponse: "⏰ Ben's timing is as reliable as the Omnitrix battery indicator!"
    },
    {
      question: "What's Ripjaws' biggest fear?",
      options: ["Cats", "Dry land", "Dentists", "Swimming lessons"],
      answer: "Dry land",
      funnyResponse: "🐟 Ripjaws says, 'Water you waiting for? Get me outta here!'"
    },
    {
      question: "If Cannonbolt entered a bowling tournament, what would happen?",
      options: ["He'd get a perfect 300", "He'd break the alley", "He'd eat the pins", "He'd roll away"],
      answer: "He'd break the alley",
      funnyResponse: "🎳 Strike! And... property damage. Classic Cannonbolt!"
    },
    {
      question: "What's Stinkfly's least favorite subject in school?",
      options: ["Chemistry", "Gym class", "Lunch", "Social studies"],
      answer: "Lunch",
      funnyResponse: "🪰 Nobody wants to sit next to him in the cafeteria!"
    },
    {
      question: "Why did Diamondhead refuse to play hide and seek?",
      options: ["He's too shiny", "He can't fit anywhere", "He's transparent", "He'd rather build stuff"],
      answer: "He's too shiny",
      funnyResponse: "💎 You can see him from space! Not very sneaky, bro!"
    },
    {
      question: "What would happen if Wildvine tried to blend into a salad bar?",
      options: ["Perfect disguise", "Gets picked as 'fresh greens'", "Causes a stampede", "Becomes the salad"],
      answer: "Gets picked as 'fresh greens'",
      funnyResponse: "🥗 'This lettuce is fighting back!' - confused customer"
    }
  ];

  const skipEmojis = ['😅', '🤪', '😂', '🙈', '🤦', '😬', '🤷', '😆', '🎭', '🤡'];

  const [gameState, setGameState] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [skipEmoji, setSkipEmoji] = useState('');

  const startQuiz = () => {
    setGameState('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setSkipEmoji('');
  };

  const handleAnswer = (option) => {
    if (showFeedback) return;
    
    setSelectedAnswer(option);
    setShowFeedback(true);
    
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    const randomEmoji = skipEmojis[Math.floor(Math.random() * skipEmojis.length)];
    setSkipEmoji(randomEmoji);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setSkipEmoji('');
      } else {
        setGameState('end');
        setSkipEmoji('');
      }
    }, 300);
  };

  const getRank = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage <= 40) return { text: "Still figuring out the Omnitrix 😂", color: "text-red-400" };
    if (percentage <= 60) return { text: "Junior Plumber Agent 🛠️", color: "text-yellow-400" };
    if (percentage <= 85) return { text: "Ultimate Alien 🧠", color: "text-blue-400" };
    return { text: "You're Ben 10 himself! 👽💚", color: "text-green-400" };
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        {gameState === 'start' && (
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 opacity-20 blur-3xl rounded-full"></div>
              <h1 className="relative text-6xl font-black text-white drop-shadow-2xl mb-4">
                BEN 10
              </h1>
              <div className="relative w-32 h-32 mx-auto mb-6 bg-transparent rounded-full shadow-lg shadow-green-400/20 flex items-center justify-center border-4 border-green-400/30 animate-pulse">
                <img 
                  src={omnitrixImg} 
                  alt="Omnitrix" 
                  className="w-full h-full object-contain"
                  style={{ 
                    filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))'
                  }}
                />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              Alien Comedy Quiz
            </h2>
            
            <p className="text-xl text-white font-semibold">
              Ready to test your Alien IQ, Rookie? 🎮
            </p>
            
            <button
              onClick={startQuiz}
              className="px-8 py-4 bg-transparent text-white font-bold text-xl rounded-xl shadow-lg shadow-green-500/50 hover:bg-green-400/10 hover:shadow-green-400/70 transition-all duration-300 border-2 border-green-400/30 hover:border-green-400/60 transform hover:scale-105"
            >
              Start Quiz 🚀
            </button>
          </div>
        )}

        {gameState === 'quiz' && (
          <div className="bg-transparent backdrop-blur-sm rounded-2xl p-8 border-2 border-green-400/30 shadow-2xl shadow-green-500/20 hover:border-green-400/60 transition-all duration-300">
            <div className="mb-6 flex justify-between items-center">
              <span className="text-green-400 font-bold text-lg">
                Question {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-green-400 font-bold text-lg">
                Score: {score} 🌟
              </span>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-4xl">👽</span>
                <h3 className="text-2xl font-bold text-white leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === questions[currentQuestion].answer;
                  const showCorrect = showFeedback && isCorrect;
                  const showWrong = showFeedback && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      disabled={showFeedback}
                      className={`w-full p-4 rounded-xl font-semibold text-left transition-all duration-300 border-2 ${
                        showCorrect
                          ? 'bg-green-600/30 border-green-400 shadow-lg shadow-green-500/50'
                          : showWrong
                          ? 'bg-red-600/30 border-red-400 shadow-lg shadow-red-500/50'
                          : isSelected
                          ? 'bg-green-700/20 border-green-400/60'
                          : 'bg-transparent border-green-400/30 hover:border-green-400/60 hover:bg-green-400/10 hover:scale-102'
                      } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span className="text-white text-lg">{option}</span>
                      {showCorrect && <span className="ml-2">✅</span>}
                      {showWrong && <span className="ml-2">❌</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {showFeedback && (
              <div className="mb-6 p-4 bg-green-900/20 border-2 border-green-400/30 rounded-xl">
                <p className="text-green-300 font-semibold text-lg text-center">
                  {questions[currentQuestion].funnyResponse}
                </p>
              </div>
            )}

            {showFeedback && (
              <button
                onClick={nextQuestion}
                className="w-full px-6 py-4 bg-transparent text-white font-bold text-xl rounded-xl shadow-lg shadow-green-500/50 hover:bg-green-400/10 hover:shadow-green-400/70 transition-all duration-300 border-2 border-green-400/30 hover:border-green-400/60 transform hover:scale-105 relative overflow-hidden"
              >
                {skipEmoji && (
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce">
                    {skipEmoji}
                  </span>
                )}
                <span className={skipEmoji ? 'opacity-0' : ''}>
                  {currentQuestion < questions.length - 1 ? 'Next Alien Question ⚡' : 'See Results 🏆'}
                </span>
              </button>
            )}
          </div>
        )}

        {gameState === 'end' && (
          <div className="bg-transparent backdrop-blur-sm rounded-2xl p-8 border-2 border-green-400/30 shadow-2xl shadow-green-500/20 hover:border-green-400/60 transition-all duration-300 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 opacity-20 blur-3xl rounded-full"></div>
              <div className="relative w-32 h-32 mx-auto mb-6 bg-transparent rounded-full shadow-lg shadow-green-400/20 flex items-center justify-center border-4 border-green-400/30">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                  <div className="text-5xl">🏆</div>
                </div>
              </div>
            </div>

            <h2 className="text-4xl font-black text-green-400 drop-shadow-lg">
              Quiz Complete!
            </h2>

            <div className="py-6">
              <p className="text-6xl font-black text-white mb-4">
                {score} / {questions.length}
              </p>
              <p className={`text-2xl font-bold ${getRank().color} drop-shadow-lg`}>
                {getRank().text}
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={startQuiz}
                className="px-8 py-4 bg-transparent text-white font-bold text-xl rounded-xl shadow-lg shadow-green-500/50 hover:bg-green-400/10 hover:shadow-green-400/70 transition-all duration-300 border-2 border-green-400/30 hover:border-green-400/60 transform hover:scale-105"
              >
                Play Again 🔄
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ben10ComedyQuiz;