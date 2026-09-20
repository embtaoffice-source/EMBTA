import React from 'react';
import { cn } from '../../utils/cn';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  badgeVariant?: 'green' | 'red' | 'navy';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
  badgeVariant = 'green',
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const badgeStyles = {
    green: 'bg-embta-green/15 text-embta-green-light border-embta-green/30',
    red: 'bg-embta-red/15 text-red-300 border-embta-red/30',
    navy: 'bg-embta-blue/40 text-embta-slate border-embta-surface-border',
  };

  return (
    <div className={cn('flex flex-col mb-10 max-w-3xl', alignStyles[align], className)}>
      {badge && (
        <div
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border mb-3 shadow-sm',
            badgeStyles[badgeVariant]
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-embta-slate-dim leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'h-1 w-16 bg-gradient-to-r from-embta-green to-embta-green-light rounded-full mt-4',
          align === 'center' ? 'mx-auto' : ''
        )}
      />
    </div>
  );
};
