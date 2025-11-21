import React from 'react';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn('glass-effect rounded-2xl p-6 shadow-2xl', className)}>
      {children}
    </div>
  );
};
