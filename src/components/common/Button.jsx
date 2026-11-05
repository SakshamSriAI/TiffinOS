import React from 'react';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-forest hover:bg-forest-hover text-white shadow-subtle focus:ring-forest/20',
  secondary: 'bg-white hover:bg-surface-subtle text-charcoal border border-border shadow-subtle focus:ring-forest/10',
  mint: 'bg-mint hover:bg-mint-dark text-forest-deep font-semibold focus:ring-mint/40',
  amber: 'bg-amber-accent hover:bg-amber-dark text-white shadow-subtle focus:ring-amber-accent/20',
  danger: 'bg-status-error hover:bg-red-700 text-white shadow-subtle focus:ring-status-error/20',
  ghost: 'bg-transparent hover:bg-surface-muted text-charcoal hover:text-forest-deep focus:ring-charcoal/10',
  outline: 'bg-transparent border border-forest text-forest hover:bg-mint-light focus:ring-forest/20',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-button gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-button gap-2',
  lg: 'px-6 py-3 text-base rounded-button gap-2.5',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft: IconLeft,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyles = SIZES[size] || SIZES.md;
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center font-medium transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-1 select-none active:scale-[0.98]
        ${variantStyles}
        ${sizeStyles}
        ${isDisabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : IconLeft ? (
        <IconLeft className="w-4 h-4 text-current" />
      ) : null}
      
      {children}
      
      {!loading && IconRight && (
        <IconRight className="w-4 h-4 text-current" />
      )}
    </button>
  );
};

export default Button;
