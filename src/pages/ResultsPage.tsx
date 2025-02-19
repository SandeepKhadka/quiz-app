import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/StyleButton';

const ResultsPage = () => {
  const { state } = useLocation();
  const { score, total } = state || { score: 0, total: 0 };
  const navigate = useNavigate();

  return (
    <div className="results-page">
      <h1 className="text-3xl font-bold">Quiz Results</h1>
      <p className="text-lg mt-2">
        You scored {score} out of {total}!
      </p>
      <Button
        onClick={() => navigate('/')}
        color={score === total ? 'green' : 'red'}
      >
        {score === total ? 'Play Again' : 'Try Again'}
      </Button>
    </div>
  );
};

export default ResultsPage;
