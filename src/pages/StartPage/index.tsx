import { Link } from 'react-router-dom';

import Button from '@/components/Button';
import { ROUTES } from '@/utils/routes';
import Attempt from '@/components/ShowAttempts';

const StartPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center">
        <Attempt />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          Welcome to the Quiz!
        </h1>
        <Link to={ROUTES.QUIZ}>
          <Button className="sm:w-auto px-6 py-3 text-lg sm:text-xl">
            Start Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
