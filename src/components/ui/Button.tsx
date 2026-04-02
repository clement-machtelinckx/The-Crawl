import React from 'react';
import clsx from 'clsx';
import styles from './ui.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
