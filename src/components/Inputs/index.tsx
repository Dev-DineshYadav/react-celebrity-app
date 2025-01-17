import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { generateId, getDateLimits } from '../../utils';
interface BaseFieldProps {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseFieldProps {}

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, BaseFieldProps {
  rows?: number;
  maxRows?: number;
}

const styles = {
  size: {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  },
  label: {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  },
  base: `border rounded-xl placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-opacity-50
    transition-colors duration-200`,
  disabled: 'bg-gray-50 cursor-not-allowed opacity-50',
  error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
  default: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
};

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = 'Enter your text here',
  value = '',
  label,
  error,
  disabled = false,
  className = '',
  onChange,
  required = false,
  size = 'md',
  id,
  name,
  ...props
}) => {
  const inputId = id || generateId();
  const dateLimits = type === 'date' ? getDateLimits() : null;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'date') {
      const selectedDate = new Date(e.target.value);
      const maxDate = new Date(dateLimits?.max || '');

      if (selectedDate > maxDate) {
        e.target.setCustomValidity('You must be at least 18 years old');
      } else {
        e.target.setCustomValidity('');
      }
    }
    onChange?.(e);
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className={`block font-medium mb-2 ${
            error ? 'text-red-500' : 'text-gray-700'
          } ${styles.label[size]}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleDateChange}
        disabled={disabled}
        required={required}
        max={type === 'date' ? dateLimits?.max : undefined}
        className={`
          ${styles.base}
          ${styles.size[size]}
          ${disabled ? styles.disabled : 'bg-white'}
          ${error ? styles.error : styles.default}
          ${className}
        `}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      
      {error && (
        <p 
          id={`${inputId}-error`}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export const Textarea: React.FC<TextareaProps> = ({
  placeholder = 'Enter your text here',
  value = '',
  label,
  error,
  disabled = false,
  className = '',
  onChange,
  required = false,
  size = 'md',
  id,
  name,
  rows = 3,
  maxRows = 6,
  ...props
}) => {
  const textareaId = id || generateId();

  // Handle auto-resize
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, rows * 24), // Assuming 24px line height
      maxRows * 24
    );
    textarea.style.height = `${newHeight}px`;
    onChange?.(e);
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={textareaId}
          className={`block font-medium mb-2 ${
            error ? 'text-red-500' : 'text-gray-700'
          } ${styles.label[size]}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          ${styles.base}
          ${styles.size[size]}
          ${disabled ? styles.disabled : 'bg-white'}
          ${error ? styles.error : styles.default}
          resize-none overflow-hidden
          ${className}
        `}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      
      {error && (
        <p 
          id={`${textareaId}-error`}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};