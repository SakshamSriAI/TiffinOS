import React from 'react';

const BADGE_VARIANTS = {
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  error: 'bg-rose-50 text-rose-800 border-rose-200',
  forest: 'bg-[#EBF1EE] text-forest font-medium border-forest/15',
  mint: 'bg-mint text-forest-deep border-mint-dark font-medium',
  neutral: 'bg-surface-subtle text-muted-text border-border',
  charcoal: 'bg-charcoal text-white border-charcoal',
};

const SIZES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs font-medium',
  lg: 'px-3 py-1.5 text-sm font-medium',
};

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  dotColor,
  icon: Icon,
  className = '',
}) => {
  const variantStyles = BADGE_VARIANTS[variant] || BADGE_VARIANTS.neutral;
  const sizeStyles = SIZES[size] || SIZES.md;

  const defaultDotColor = {
    success: 'bg-[#27845D]',
    pending: 'bg-[#D49A34]',
    error: 'bg-[#C94F4F]',
    forest: 'bg-[#173D35]',
    mint: 'bg-[#172E2A]',
    neutral: 'bg-[#737A75]',
    charcoal: 'bg-white',
  }[variant] || 'bg-current';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border leading-none tracking-wide select-none
        ${variantStyles}
        ${sizeStyles}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColor || defaultDotColor}`}
          aria-hidden="true"
        />
      )}
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};

export default Badge;
