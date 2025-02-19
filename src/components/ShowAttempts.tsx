import React from 'react';
import Button from './StyleButton'; // Assuming you have a reusable Button component

type Attempt = {
  id?: number;
  score: number;
  total: number;
  timestamp: number;
};

interface ShowAttemptsProps {
  attempts: Attempt[];
  showAttempts: boolean;
  onDeleteAll: () => void;
}

const ShowAttempts: React.FC<ShowAttemptsProps> = ({
  attempts,
  showAttempts,
  onDeleteAll,
}) => {
  if (!showAttempts) return null;

  return (
    <div className="attempt-container">
      {/* Centered Delete All Button */}
      <div className="delete-all-button-container">
        <Button
          onClick={onDeleteAll}
          color="red"
          className="h-8 w-36 text-sm py-0 px-0 mr-1"
        >
          Delete All Attempts
        </Button>
      </div>

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
  );
};

export default ShowAttempts;
