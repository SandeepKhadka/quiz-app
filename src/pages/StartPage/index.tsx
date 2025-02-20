import { Link } from 'react-router-dom';

import Button from '@/components/Button';
import { ROUTES } from '@/utils/routes';
import Attempt from '@/components/ShowAttempts';

const StartPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        {/* ShowAttempts Component */}
        <Attempt />
        <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz!</h1>
        <Link to={ROUTES.QUIZ}>
          <Button>Start Quiz</Button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
