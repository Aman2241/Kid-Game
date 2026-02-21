import React from 'react';
import { motion } from 'framer-motion';

const QuestionCard = ({ question, onAnswer }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="question-card"
        >
            <div>
                <span className="category-badge">
                    {question.category}
                </span>

                {question.image && (
                    <img
                        src={question.image}
                        alt="Question visual"
                        className="question-image"
                    />
                )}

                <h2 className="question-text">
                    {question.text}
                </h2>
            </div>

            <div className="options-grid">
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onAnswer(option)}
                        className="option-btn"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default QuestionCard;
