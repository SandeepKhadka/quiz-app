import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Timer from '../components/Timer';
import QuizCard from '../components/QuizCard';
import Toggle from '../components/Toggle';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [history, setHistory] = useState<{ score: number; total: number }[]>(
    []
  );
  const [instantFeedback, setInstantFeedback] = useState<boolean>(false);

  const navigate = useNavigate();

  const sampleQuestions: Question[] = [
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
  ];

  useEffect(() => {
    setQuestions(sampleQuestions);
    const storedHistory = JSON.parse(
      localStorage.getItem('quizHistory') || '[]'
    );
    setHistory(storedHistory);
  }, []);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (instantFeedback) {
      alert(
        selectedAnswer === questions[currentQuestionIndex].correctAnswer
          ? 'Correct!'
          : 'Incorrect!'
      );
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const newHistory = [
        ...history,
        {
          score:
            score +
            (selectedAnswer === questions[currentQuestionIndex].correctAnswer
              ? 1
              : 0),
          total: questions.length,
        },
      ];
      setHistory(newHistory);
      localStorage.setItem('quizHistory', JSON.stringify(newHistory));
      navigate('/results', { state: { score, total: questions.length } });
    }
  };

  return (
    <div className="quiz-page min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg mb-4">
        <h2 className="text-xl font-bold">Previous Attempts</h2>
        {history.length > 0 ? (
          <ul className="list-disc pl-5 mt-2">
            {history.map((attempt, index) => (
              <li key={index} className="text-gray-300">
                Attempt {index + 1}: {attempt.score} / {attempt.total}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mt-2">No history available.</p>
        )}
      </div>

      <Toggle
        label="Get Instant Feedback"
        isChecked={instantFeedback}
        onToggle={() => setInstantFeedback(!instantFeedback)}
      />

      <h1 className="text-3xl font-bold">Quiz</h1>
      <Timer />
      {questions.length > 0 && (
        <QuizCard
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default QuizPage;
