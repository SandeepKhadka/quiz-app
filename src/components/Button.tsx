import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

// Complex variant configuration using class-variance-authority
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 outline-none transition-colors disabled:cursor-not-allowed disabled:text-neutral-dark-grey disabled:fill-neutral-dark-grey [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        success:
          'border border-primary-90 text-highlight-white bg-primary-90 hover:bg-primary-75 hover:border-primary-75 disabled:bg-highlight-hover disabled:border-highlight-hover',
        danger:
          'border border-primary-30 bg-negative-75 hover:bg-highlight-hover text-primary-75 disabled:border-highlight-border',
        link: 'text-primary-75 hover:bg-highlight-hover hover:border-highlight-border',
        info: 'border border-highlight-border text-primary-75 bg-highlight-border hover:bg-highlight-hover hover:border-highlight-border disabled:bg-highlight-background disabled:border-highlight-background',
      },
      size: {
        lg: 'py-5 rounded-2xl b1', // Custom typography scale (b1/b2/b3)
        md: 'py-4 rounded-[0.875rem] b2',
        sm: 'py-3 rounded-xl b3',
      },
    },
    defaultVariants: {
      variant: 'success',
      size: 'lg',
    },
  }
);

const Button = ({
  onClick,
  children,
  className,
  variant,
  size,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      // Merges generated variants with custom classes using our custom cn utility
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
};

export default Button;
