import React, { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
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
  // Generate a unique ID if none provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className={`block font-medium mb-2 ${
            error ? 'text-red-500' : 'text-gray-700'
          } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-sm'}`}
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
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
        w-full border rounded-xl placeholder:text-gray-400
          ${sizeStyles[size]}
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-50' : 'bg-white'}
          ${error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          transition-colors duration-200
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

export default Input;