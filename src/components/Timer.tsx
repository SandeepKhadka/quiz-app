import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialTime?: number;
  onTimeUp?: () => void;
}

const Timer = ({ initialTime = 30, onTimeUp }: TimerProps) => {
  // Initialize timer state with the provided initialTime value
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  // useEffect hook to handle the countdown logic
  useEffect(() => {
    // When time runs out, trigger the onTimeUp callback if it's provided
    if (timeLeft <= 0) {
      if (onTimeUp) {
        onTimeUp();
      }
      return;
    }

    // Set up an interval to decrement the timer every second
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the interval on component unmount or when timeLeft changes
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
