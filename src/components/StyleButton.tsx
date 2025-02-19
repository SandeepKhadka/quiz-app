import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  color?: 'blue' | 'red' | 'green' | 'yellow';
}

const Button = ({
  onClick,
  children,
  className = '',
  color = 'blue',
}: ButtonProps) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-600 hover:bg-blue-500',
    red: 'bg-red-600 hover:bg-red-500',
    green: 'bg-green-600 hover:bg-green-500',
    yellow: 'bg-yellow-500 hover:bg-yellow-400',
  };

  return (
    <button
      onClick={onClick}
      className={`text-white font-semibold py-3 px-6 rounded transition ${colorClasses[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
