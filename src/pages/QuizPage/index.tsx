import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import useQuestions from '@/hooks/useQuestions';
import { addAttempt } from '@/utils/db';
import Timer from '@/components/Timer';
import Toggle from '@/components/Toggle';
import QuizCard from '@/components/QuizCard';
import { ROUTES } from '@/utils/routes';

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

  const navigate = useNavigate();

  const { allQuestions } = useQuestions();

  useEffect(() => {
    setQuestions(allQuestions);
  }, [allQuestions]);

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
            navigate(ROUTES.RESULT, {
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
            navigate(ROUTES.RESULT, {
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
