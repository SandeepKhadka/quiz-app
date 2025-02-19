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
    await deleteAttempts(); // This deletes attempts from IndexedDB
    setAttempts([]); // Clear the attempts in the state
    toast.success('All attempts deleted successfully!');
  };

  return (
    <div className="absolute top-4 left-4">
      <div className="w-full max-w-lg flex justify-between items-center mb-4">
        <Button
          onClick={async () => {
            if (!showAttempts) await loadAttempts();
            setShowAttempts((prev) => !prev);
          }}
          variant={'info'}
        >
          {showAttempts ? 'Hide My Attempts' : 'Show My Attempts'}
        </Button>
      </div>
      {showAttempts && (
        <div className="attempt-container flex flex-col gap-4 min-w-[22rem]">
          <div className="delete-all-button-container">
            <Button
              onClick={handleDeleteAllAttempts}
              variant={'danger'}
              className="  text-sm py-0 px-0 mr-1"
            >
              Clear All Attempts
            </Button>
          </div>
          <div className="text-sm">
            <h2>Previous Attempts</h2>
            {attempts.length > 0 ? (
              <ul>
                {attempts.map((attempt, index) => (
                  <li key={attempt.id || index}>
                    Attempt {index + 1}: {attempt.score} / {attempt.total} on{' '}
                    {new Date(attempt.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No attempts recorded.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attempt;
