import React from 'react';

export const Card = ({
  children,
  className = '',
  onClick,
  hover = false,
  surface = 'white', // 'white' | 'warm' | 'forest'
  as: Component = 'div',
  ...props
}) => {
  const surfaceStyles = {
    white: 'bg-white border-border text-charcoal',
    warm: 'bg-surface-subtle border-border text-charcoal',
    forest: 'bg-forest-deep border-forest-light text-white',
  }[surface] || 'bg-white border-border text-charcoal';

  const hoverStyles = hover
    ? 'transition-all duration-200 hover:shadow-card hover:border-forest/20 cursor-pointer'
    : '';

  return (
    <Component
      onClick={onClick}
      className={`rounded-card border shadow-subtle ${surfaceStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardHeader = ({ children, className = '', action }) => {
  return (
    <div className={`p-5 sm:p-6 pb-3 flex items-start justify-between gap-4 border-b border-border/40 ${className}`}>
      <div className="space-y-1">{children}</div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

export const CardTitle = ({ children, className = '', as: Component = 'h3' }) => {
  return (
    <Component className={`text-base font-semibold tracking-tight text-inherit ${className}`}>
      {children}
    </Component>
  );
};

export const CardDescription = ({ children, className = '' }) => {
  return (
    <p className={`text-sm text-muted-text ${className}`}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`p-5 sm:p-6 pt-3 border-t border-border/40 flex items-center justify-between gap-3 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
