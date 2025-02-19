import { useState } from 'react';

interface QuizCardProps {
  question: string;
  options?: string[]; // Optional for integer-type questions
  onAnswer: (answer: string) => void;
  selectedAnswer?: string | null;
  correctAnswer?: string;
  instantFeedback?: boolean;
  type?: 'multiple-choice' | 'integer'; // New prop to differentiate question types
}

const QuizCard = ({
  question,
  options = [],
  onAnswer,
  selectedAnswer,
  correctAnswer,
  instantFeedback,
  type = 'multiple-choice',
}: QuizCardProps) => {
  const [clickedOption, setClickedOption] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>('');

  const handleClick = (answer: string) => {
    setClickedOption(answer);
    onAnswer(answer);
    setUserInput('');
  };

  return (
    <div className="quiz-card">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>

      {type === 'multiple-choice' ? (
        <div className="flex flex-col gap-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleClick(option)}
              className={`p-2 rounded-lg text-lg transition ${
                clickedOption === option
                  ? option === correctAnswer && instantFeedback
                    ? 'bg-green-500 text-white'
                    : instantFeedback
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-500'
                  : 'bg-gray-700 hover:bg-gray-500'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="p-2 rounded-lg w-full text-black"
            placeholder="Type your answer..."
          />
          <button
            onClick={() => handleClick(userInput)}
            className="p-2 bg-blue-500 rounded-lg text-white"
          >
            Submit
          </button>
        </div>
      )}

      {instantFeedback && selectedAnswer !== null && (
        <p
          className={`mt-3 ${selectedAnswer === correctAnswer ? 'text-green-500' : 'text-red-500'}`}
        >
          {selectedAnswer === correctAnswer ? 'Correct!' : 'Wrong Answer'}
        </p>
      )}
    </div>
  );
};

export default QuizCard;
