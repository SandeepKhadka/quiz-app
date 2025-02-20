import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteAttempts, getAttempts } from '@/utils/db';
import Button from './Button';

type AttemptMetaData = {
  id?: number;
  score: number;
  total: number;
  timestamp: number;
};

const Attempt = () => {
  const [attempts, setAttempts] = useState<AttemptMetaData[]>([]);
  const [showAttempts, setShowAttempts] = useState(false);

  // Function to load attempts from IndexedDB
  const loadAttempts = async () => {
    const allAttempts = await getAttempts();
    setAttempts(allAttempts);
  };

  const handleDeleteAllAttempts = async () => {
    await deleteAttempts();
    setAttempts([]);
    toast.success('All attempts deleted successfully!');
  };

  return (
    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8">
      <div className="max-w-sm sm:max-w-md flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
        <Button
          onClick={async () => {
            if (!showAttempts) await loadAttempts();
            setShowAttempts((prev) => !prev);
          }}
          variant="info"
          className="sm:w-auto text-sm sm:text-base px-4 py-2"
        >
          {showAttempts ? 'Hide My Attempts' : 'Show My Attempts'}
        </Button>
      </div>

      {showAttempts && (
        <div className="attempt-container flex flex-col gap-4 w-full max-w-xs sm:max-w-md bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="w-full flex justify-end">
            <Button
              onClick={handleDeleteAllAttempts}
              variant="danger"
              className="text-white text-xs sm:text-sm py-2 px-3"
            >
              Clear All Attempts
            </Button>
          </div>

          <div className="text-sm overflow-auto max-h-60">
            <h2 className="text-lg font-semibold">Previous Attempts</h2>
            {attempts.length > 0 ? (
              <ul className="space-y-4">
                {attempts.map((attempt, index) => (
                  <li
                    key={attempt.id || index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-600 pb-2"
                  >
                    <span className="text-sm">
                      Attempt {index + 1}: {attempt.score} / {attempt.total} on{' '}
                      {new Date(attempt.timestamp).toLocaleString()}
                    </span>
                    <Button
                      variant="info"
                      className="text-xs sm:text-sm py-1 px-2"
                    >
                      Review
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-center">No attempts recorded.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attempt;
