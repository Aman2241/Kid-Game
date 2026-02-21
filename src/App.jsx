import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, XCircle, CheckCircle } from 'lucide-react';
import TugOfWar from './components/TugOfWar';
import QuestionCard from './components/QuestionCard';
import { questions } from './data/questions';
import './index.css';

function App() {
  const [ropePosition, setRopePosition] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1); // 1 or 2
  const [winner, setWinner] = useState(null);
  const [currentQuestionIndices, setCurrentQuestionIndices] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // { type: 'correct'|'wrong', text: string }
  const [totalRounds, setTotalRounds] = useState(0); // Max 10 rounds

  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [selectedTopic, setSelectedTopic] = useState(null);

  // We no longer randomly start on load, wait for topic selection
  useEffect(() => {
    // Optional: could pre-load images here if needed
  }, []);

  const handleStartGame = (topic) => {
    setSelectedTopic(topic);
    resetGame(topic);
  };

  const resetGame = (overrideTopic) => {
    const topic = overrideTopic || selectedTopic;
    if (!topic) return;

    // Filter out used questions before selecting
    const availableMathQs = questions.filter(q => q.category === 'Math' && !usedQuestions.has(q.text));
    const availablePlanetsQs = questions.filter(q => q.category === 'Planets' && !usedQuestions.has(q.text));
    const availableGeogQs = questions.filter(q => q.category === 'Geography' && !usedQuestions.has(q.text));
    const availableTrafficQs = questions.filter(q => q.category === 'Traffic Lights' && !usedQuestions.has(q.text));
    const availableAnimalQs = questions.filter(q => q.category === 'Animals' && !usedQuestions.has(q.text));

    const shuffleArray = (arr) => [...arr].sort(() => 0.5 - Math.random());
    let selectedQs = [];

    if (topic === 'Mixed') {
      // If we're running out of questions in a category, reset the used state entirely
      if (availableMathQs.length < 2 || availablePlanetsQs.length < 2 || availableGeogQs.length < 2 || availableTrafficQs.length < 2 || availableAnimalQs.length < 2) {
        console.log("Resetting used question bank");
        setUsedQuestions(new Set());
      }

      const mQs = availableMathQs.length >= 2 ? availableMathQs : questions.filter(q => q.category === 'Math');
      const pQs = availablePlanetsQs.length >= 2 ? availablePlanetsQs : questions.filter(q => q.category === 'Planets');
      const gQs = availableGeogQs.length >= 2 ? availableGeogQs : questions.filter(q => q.category === 'Geography');
      const tQs = availableTrafficQs.length >= 2 ? availableTrafficQs : questions.filter(q => q.category === 'Traffic Lights');
      const aQs = availableAnimalQs.length >= 2 ? availableAnimalQs : questions.filter(q => q.category === 'Animals');

      selectedQs = [
        ...shuffleArray(mQs).slice(0, 2),
        ...shuffleArray(pQs).slice(0, 2),
        ...shuffleArray(gQs).slice(0, 2),
        ...shuffleArray(tQs).slice(0, 2),
        ...shuffleArray(aQs).slice(0, 2)
      ];
    } else {
      let targetCategory = topic;
      if (topic === 'Numbers') targetCategory = 'Math';

      let pool = questions.filter(q => q.category === targetCategory);
      let availablePool = pool.filter(q => !usedQuestions.has(q.text));

      if (availablePool.length < 10) {
        console.log(`Resetting used bank for ${topic}`);
        setUsedQuestions(new Set());
        availablePool = pool;
      }

      selectedQs = shuffleArray(availablePool).slice(0, 10);

      if (selectedQs.length < 10) {
        const extraShuffle = shuffleArray(pool);
        selectedQs = [...selectedQs, ...extraShuffle.slice(0, 10 - selectedQs.length)];
      }
    }

    const finalShuffled = shuffleArray(selectedQs);

    // Mark these as used for FUTURE games
    setUsedQuestions(prev => {
      const next = new Set(prev);
      finalShuffled.forEach(q => next.add(q.text));
      return next;
    });

    setCurrentQuestionIndices(finalShuffled);
    setQuestionIndex(0);
    setRopePosition(0);
    setCurrentTurn(1);
    setWinner(null);
    setFeedback(null);
    setTotalRounds(0);
  };

  const handleAnswer = (selectedOption) => {
    const currentQ = currentQuestionIndices[questionIndex];
    if (!currentQ) return;

    const isCorrect = selectedOption === currentQ.correctAnswer;

    let newPos = ropePosition;
    if (isCorrect) {
      setFeedback({ type: 'correct', text: 'Great Job!' });
      const direction = currentTurn === 1 ? -1 : 1;
      newPos = ropePosition + direction * 2;
      setRopePosition(newPos);
    } else {
      setFeedback({ type: 'wrong', text: `Oops! It was ${currentQ.correctAnswer}.` });
      // Penalty: Move rope towards the opponent instead
      const opponentDirection = currentTurn === 1 ? 1 : -1;
      newPos = ropePosition + opponentDirection * 2;
      setRopePosition(newPos);
    }

    const isWin = checkWinner(newPos);

    setTimeout(() => {
      setFeedback(null);
      setCurrentTurn(currentTurn === 1 ? 2 : 1);
      setQuestionIndex((prev) => (prev + 1) % currentQuestionIndices.length);
    }, 2000);
  };

  const checkWinner = (pos) => {
    if (pos <= -10) {
      setWinner(1);
      fireConfetti();
    } else if (pos >= 10) {
      setWinner(2);
      fireConfetti();
    }
  };

  const fireConfetti = () => {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      var particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const activeQuestion = currentQuestionIndices[questionIndex];

  // --- Topic Selection Screen Render ---
  if (!selectedTopic) {
    return (
      <div className="app-container">
        <h1 className="title mb-8" style={{ fontSize: '4rem', textAlign: 'center' }}>Brain Tug of War!</h1>
        <h2 className="text-2xl font-bold text-white mb-8" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>Choose your category:</h2>

        <div className="topic-grid">
          <button className="topic-card bg-blue-500 hover:bg-blue-600" onClick={() => handleStartGame('Numbers')}>
            <span className="topic-icon">🔢</span>
            Numbers
          </button>
          <button className="topic-card bg-green-500 hover:bg-green-600" onClick={() => handleStartGame('Animals')}>
            <span className="topic-icon">🦁</span>
            Animals
          </button>
          <button className="topic-card bg-purple-500 hover:bg-purple-600" onClick={() => handleStartGame('Planets')}>
            <span className="topic-icon">🪐</span>
            Planets
          </button>
          <button className="topic-card bg-orange-500 hover:bg-orange-600" onClick={() => handleStartGame('Geography')}>
            <span className="topic-icon">🌍</span>
            Geography
          </button>
          <button className="topic-card bg-red-500 hover:bg-red-600" onClick={() => handleStartGame('Traffic Lights')}>
            <span className="topic-icon">🚥</span>
            Traffic / Safety
          </button>
          <button className="topic-card bg-yellow-400 hover:bg-yellow-500" onClick={() => handleStartGame('Mixed')}>
            <span className="topic-icon">🎲</span>
            Mixed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="header"
      >
        <div className="team-badge team1">
          <h2>TEAM 1</h2>
          {currentTurn === 1 && !winner && <span className="turn-indicator">YOUR TURN!</span>}
        </div>

        <div className="flex flex-col items-center">
          <h1 className="title">Brain Tug of War</h1>
          <span className="bg-white/50 px-3 py-1 rounded-full mt-2 text-indigo-900 border-2 border-indigo-200 font-bold tracking-widest text-sm uppercase shadow-sm">
            Topic: {selectedTopic}
          </span>
        </div>

        <div className="team-badge team2">
          <h2>TEAM 2</h2>
          {currentTurn === 2 && !winner && <span className="turn-indicator">YOUR TURN!</span>}
        </div>
      </motion.div>

      {/* Game Stage */}
      <div className="game-stage">

        <div className="tug-of-war-container">
          <TugOfWar ropePosition={ropePosition} />
        </div>

        {/* Feedback Messages */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className={`feedback-overlay ${feedback.type === 'correct' ? 'feedback-correct' : 'feedback-wrong'}`}
            >
              {feedback.type === 'correct' ? <CheckCircle size={64} /> : <XCircle size={64} />}
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>

        {!winner && activeQuestion ? (
          <div className={feedback ? 'fade-out' : ''}>
            <QuestionCard
              key={questionIndex}
              question={activeQuestion}
              onAnswer={handleAnswer}
            />
          </div>
        ) : winner ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`winner-card ${winner === "Draw" ? '!bg-yellow-100 !border-yellow-300' : ''}`}
          >
            {winner === "Draw" ? (
              <RefreshCw className="trophy-icon text-yellow-600 mb-4" />
            ) : (
              <Trophy className="trophy-icon" />
            )}

            <h2 className={`winner-text ${winner === "Draw" ? '!text-yellow-800' : ''}`}>
              {winner === "Draw" ? "IT'S A TIE!" : `TEAM ${winner} WINS!`}
            </h2>
            <p className={`winner-subtext ${winner === "Draw" ? '!text-yellow-700' : ''}`}>
              {winner === "Draw" ? "Both teams pulled equally hard!" : "What an amazing tug of war battle!"}
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => resetGame()} className="play-again-btn text-xl px-6 py-4">
                <RefreshCw size={24} /> PLAY AGAIN
              </button>
              <button onClick={() => setSelectedTopic(null)} className="play-again-btn text-xl px-6 py-4" style={{ backgroundColor: '#ec4899', borderColor: '#db2777' }}>
                CHANGE TOPIC
              </button>
            </div>
          </motion.div>
        ) : null}

      </div>
    </div>
  );
}

export default App;
