import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const { state } = useLocation();
  const { score, total } = state || { score: 0, total: 0 };
  const navigate = useNavigate();

  return (
    <div className="results-page flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Quiz Results</h1>
      <p className="text-lg mt-2">
        You scored {score} out of {total}!
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 bg-red-600 hover:bg-red-500 transition text-white py-2 px-6 rounded-lg text-lg"
      >
        Try Again
      </button>
    </div>
  );
};

export default ResultsPage;
