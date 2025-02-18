// src/components/QuizCard.tsx
import React from 'react';

interface QuizCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, options, onAnswer }) => {
  return (
    <div className="quiz-card">
      <p>{question}</p>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="option-btn"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
