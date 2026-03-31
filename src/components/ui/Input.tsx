import React from 'react';
import clsx from 'clsx';
import styles from './ui.module.css';

type BaseInputProps = {
  label?: string;
  error?: string;
  style?: React.CSSProperties;
};

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & BaseInputProps> = ({
  label,
  error,
  id,
  className,
  style,
  ...props
}) => {
  return (
    <div className={styles.field} style={style}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input id={id} className={clsx(styles.input, className)} {...props} />
      {error && <p className={clsx(styles.alert, styles.error)}>{error}</p>}
    </div>
  );
};

export const SelectInput: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & BaseInputProps> = ({
  label,
  error,
  id,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <div className={styles.field} style={style}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <select id={id} className={clsx(styles.input, className)} {...props}>
        {children}
      </select>
      {error && <p className={clsx(styles.alert, styles.error)}>{error}</p>}
    </div>
  );
};

export const TextareaInput: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & BaseInputProps> = ({
  label,
  error,
  id,
  className,
  style,
  ...props
}) => {
  return (
    <div className={styles.field} style={style}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <textarea id={id} className={clsx(styles.input, styles.textarea, className)} {...props} />
      {error && <p className={clsx(styles.alert, styles.error)}>{error}</p>}
    </div>
  );
};

export const DateTimeInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & BaseInputProps> = ({
  label,
  error,
  id,
  className,
  style,
  ...props
}) => {
  return (
    <div className={styles.field} style={style}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input id={id} type="datetime-local" className={clsx(styles.input, className)} {...props} />
      {error && <p className={clsx(styles.alert, styles.error)}>{error}</p>}
    </div>
  );
};
