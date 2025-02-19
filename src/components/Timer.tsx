import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialTime?: number;
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime = 30, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) {
        onTimeUp();
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="timer text-lg font-semibold text-yellow-400 flex items-center">
      <Clock className="mr-2" size={20} />
      {timeLeft} second{timeLeft !== 1 ? 's' : ''} left
    </div>
  );
};

export default Timer;
