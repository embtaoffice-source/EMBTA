import React from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'navy' | 'interactive' | 'outline';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'glass-panel rounded-xl shadow-glass-sm',
    navy: 'glass-panel-navy rounded-xl shadow-glass',
    interactive: 'glass-card-interactive rounded-xl shadow-glass-sm',
    outline: 'border border-embta-surface-border bg-embta-navy/40 backdrop-blur-md rounded-xl',
  };

  return (
    <div className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
};
