import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/StyleButton';

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz!</h1>
        <Button onClick={() => navigate('/quiz')} color="blue">
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default StartPage;
