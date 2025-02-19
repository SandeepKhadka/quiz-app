import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Timer from '../components/Timer';
import QuizCard from '../components/QuizCard';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
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
  }, []);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/results', { state: { score, total: questions.length } });
    }
  };

  return (
    <div className="quiz-page">
      <h1>Quiz</h1>
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
