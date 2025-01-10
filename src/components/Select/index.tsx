import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  options: Array<{ value: string | number; label: string }>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  placeholder = 'Select an option',
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
  options,
  ...props
}) => {
  // Generate a unique ID if none provided
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={selectId}
          className={`block font-medium mb-2 ${
            error ? 'text-red-500' : 'text-gray-700'
          } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-sm'}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          border rounded-xl
          appearance-none
          bg-white
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
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p 
          id={`${selectId}-error`}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;