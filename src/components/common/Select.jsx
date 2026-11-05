import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(({
  label,
  id,
  options = [],
  value,
  onChange,
  error,
  hint,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-charcoal uppercase tracking-wider"
        >
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-input">
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full appearance-none rounded-input border bg-white px-3.5 py-2.5 pr-10 text-sm text-charcoal
            transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest
            ${error ? 'border-status-error focus:border-status-error focus:ring-status-error/20' : 'border-border'}
            ${disabled ? 'bg-surface-subtle text-muted-text cursor-not-allowed opacity-75' : 'cursor-pointer'}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-muted-text">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-status-error font-medium">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-text">{hint}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
