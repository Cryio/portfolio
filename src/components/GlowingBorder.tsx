'use client';

import { cn } from '@/lib/utils';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'intense';
  borderRadius?: string;
}

const variantClasses = {
  default: 'glow-border',
  subtle: 'glow-border-subtle',
  intense: 'glow-border-intense'
};

export function GlowingBorder({ 
  children, 
  className = '',
  variant = 'default',
  borderRadius = '0.5rem'
}: GlowingBorderProps) {
  return (
    <div 
      className={cn(
        'relative',
        variantClasses[variant],
        className
      )}
      style={{ borderRadius }}
    >
      {children}
    </div>
  );
}