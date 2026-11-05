import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  required = false,
  disabled = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-charcoal uppercase tracking-wider"
        >
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-input">
        {IconLeft && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
            <IconLeft className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full rounded-input border bg-white px-3.5 py-2.5 text-sm text-charcoal
            placeholder:text-muted-light transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest
            ${IconLeft ? 'pl-10' : ''}
            ${IconRight ? 'pr-10' : ''}
            ${error ? 'border-status-error focus:border-status-error focus:ring-status-error/20' : 'border-border'}
            ${disabled ? 'bg-surface-subtle text-muted-text cursor-not-allowed opacity-75' : ''}
            ${className}
          `}
          {...props}
        />

        {IconRight && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-muted-text">
            <IconRight className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-status-error font-medium">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-text">{hint}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
