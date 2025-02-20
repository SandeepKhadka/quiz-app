import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import { ROUTES } from '@/utils/routes';

const ResultsPage = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const { score, total } = state || { score: 0, total: 0 };

  return (
    <div className="results-page">
      <h1 className="text-3xl font-bold">Quiz Results</h1>
      <p className="text-lg mt-2">
        You scored {score} out of {total}!
      </p>
      <Button
        onClick={() => navigate(ROUTES.HOME)}
        variant={score === total ? 'success' : 'danger'}
      >
        {score === total ? 'Play Again' : 'Try Again'}
      </Button>
    </div>
  );
};

export default ResultsPage;
