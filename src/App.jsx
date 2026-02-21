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

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const mathQs = questions.filter(q => q.category === 'Math');
    const scienceQs = questions.filter(q => q.category === 'Science');
    const animalQs = questions.filter(q => q.category === 'Animals');

    const shuffleArray = (arr) => [...arr].sort(() => 0.5 - Math.random());
    const shuffledMath = shuffleArray(mathQs);
    const shuffledScience = shuffleArray(scienceQs);
    const shuffledAnimal = shuffleArray(animalQs);

    let selectedQs = [
      ...shuffledMath.slice(0, 4),
      ...shuffledScience.slice(0, 3),
      ...shuffledAnimal.slice(0, 3)
    ];

    if (selectedQs.length < 10) {
      selectedQs = [
        ...selectedQs,
        ...shuffledMath.slice(4, 4 + (10 - selectedQs.length))
      ];
    }

    const finalShuffled = shuffleArray(selectedQs);

    setCurrentQuestionIndices(finalShuffled);
    setQuestionIndex(0);
    setRopePosition(0);
    setCurrentTurn(1);
    setWinner(null);
    setFeedback(null);
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

        <h1 className="title">Brain Tug of War</h1>

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

        {!winner ? (
          <div className={feedback ? 'fade-out' : ''}>
            {activeQuestion && (
              <QuestionCard
                key={questionIndex}
                question={activeQuestion}
                onAnswer={handleAnswer}
              />
            )}
          </div>
        ) : (
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
            <button onClick={resetGame} className="play-again-btn mt-4">
              <RefreshCw size={32} /> PLAY AGAIN
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default App;
