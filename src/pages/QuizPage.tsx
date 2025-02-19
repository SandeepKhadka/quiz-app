import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import Timer from '../components/Timer';
import QuizCard from '../components/QuizCard';
import Toggle from '../components/Toggle';
import { addAttempt, deleteAttempts, getAttempts } from '../utils/db';
import Button from '../components/StyleButton';
import useQuestions from '../hooks/useQuestions';
import ShowAttempts from '../components/ShowAttempts'; // Import the ShowAttempts component

type Question = {
  question: string;
  options?: string[];
  correctAnswer: string;
  type?: 'multiple-choice' | 'integer';
};

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [instantFeedback, setInstantFeedback] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timerKey, setTimerKey] = useState<number>(0); // Used to reset the Timer

  const [attempts, setAttempts] = useState<
    { id?: number; score: number; total: number; timestamp: number }[]
  >([]);
  const [showAttempts, setShowAttempts] = useState<boolean>(false);

  const navigate = useNavigate();
  const { allQuestions } = useQuestions();

  useEffect(() => {
    setQuestions(allQuestions);
  }, [allQuestions]);

  // Function to load attempts from IndexedDB
  const loadAttempts = async () => {
    const allAttempts = await getAttempts();
    setAttempts(allAttempts);
  };

  const handleDeleteAllAttempts = async () => {
    await deleteAttempts(); // This deletes attempts from IndexedDB
    setAttempts([]); // Clear the attempts in the state
    toast.success('All attempts deleted successfully!');
  };

  const handleAnswer = (answer: string | null) => {
    setSelectedAnswer(answer);
    const current = questions[currentQuestionIndex];

    // Convert integer answer for comparison
    const isCorrect =
      current.type === 'integer'
        ? Number(answer) === Number(current.correctAnswer)
        : answer === current.correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setTimeout(
        async () => {
          if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setTimerKey((prev) => prev + 1);
          } else {
            await addAttempt(score + 1, questions.length);
            navigate('/results', {
              state: { score: score + 1, total: questions.length },
            });
          }
        },
        instantFeedback ? 1000 : 0
      );
    } else {
      if (instantFeedback) {
        toast.error('Wrong answer, Try again!');
        setSelectedAnswer(null);
      } else {
        setTimeout(async () => {
          if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setTimerKey((prev) => prev + 1);
          } else {
            await addAttempt(score, questions.length);
            navigate('/results', {
              state: { score: score, total: questions.length },
            });
          }
        }, 0);
      }
    }
  };

  return (
    <div className="quiz-page min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 relative">
      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="absolute top-4 right-4">
        <Timer
          key={timerKey}
          initialTime={30}
          onTimeUp={() => handleAnswer('')}
        />
      </div>

      {/* Attempts Button */}
      <div className="w-full max-w-lg flex justify-between items-center mb-4">
        <Button
          onClick={async () => {
            if (!showAttempts) await loadAttempts();
            setShowAttempts((prev) => !prev);
          }}
          color="blue"
        >
          {showAttempts ? 'Hide My Attempts' : 'Show My Attempts'}
        </Button>
      </div>

      {/* ShowAttempts Component */}
      <ShowAttempts
        attempts={attempts}
        showAttempts={showAttempts}
        onDeleteAll={handleDeleteAllAttempts}
      />

      <Toggle
        label="Get Instant Feedback"
        isChecked={instantFeedback}
        onToggle={() => setInstantFeedback(!instantFeedback)}
      />

      <h1 className="text-3xl font-bold my-4">Quiz</h1>

      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <QuizCard
          question={questions[currentQuestionIndex]?.question ?? ''}
          options={questions[currentQuestionIndex]?.options ?? []}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={questions[currentQuestionIndex]?.correctAnswer ?? ''}
          instantFeedback={instantFeedback}
          type={questions[currentQuestionIndex]?.type}
        />
      )}
    </div>
  );
};

export default QuizPage;
