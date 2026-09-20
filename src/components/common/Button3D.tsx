import React from 'react';
import { cn } from '../../utils/cn';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

export const Button3D: React.FC<Button3DProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 uppercase rounded-lg active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-embta-navy cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-embta-green hover:bg-embta-green-light text-white shadow-[0_4px_14px_0_rgba(27,135,63,0.39)] hover:shadow-[0_6px_20px_rgba(27,135,63,0.45)] hover:-translate-y-0.5 border border-embta-green-light/40 focus:ring-embta-green',
    secondary:
      'bg-embta-navy-light hover:bg-embta-blue text-embta-light shadow-[0_4px_14px_0_rgba(0,21,42,0.5)] hover:shadow-[0_6px_20px_rgba(0,21,42,0.7)] hover:-translate-y-0.5 border border-embta-surface-border focus:ring-embta-slate',
    outline:
      'bg-transparent hover:bg-embta-navy-light/60 text-embta-light border border-embta-surface-border hover:border-embta-green/60 hover:-translate-y-0.5 focus:ring-embta-green',
    accent:
      'bg-embta-red hover:bg-embta-red-dark text-white shadow-[0_4px_14px_0_rgba(201,42,42,0.39)] hover:shadow-[0_6px_20px_rgba(201,42,42,0.45)] hover:-translate-y-0.5 border border-red-400/30 focus:ring-embta-red',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
