import React from 'react';
import clsx from 'clsx';
import styles from './ui.module.css';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'card' | 'section';
  style?: React.CSSProperties;
};

export const Card: React.FC<CardProps> = ({ children, className, variant = 'card', style }) => {
  return (
    <div className={clsx(styles[variant], className)} style={style}>
      {children}
    </div>
  );
};
