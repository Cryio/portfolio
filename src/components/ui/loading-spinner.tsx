'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'dots' | 'pulse';
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '',
  variant = 'default'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'dots') {
    return (
      <div className={cn('flex space-x-1', className)}>
        <div className={cn('w-2 h-2 bg-primary rounded-full animate-bounce', sizeClasses.sm)} style={{ animationDelay: '0ms' }} />
        <div className={cn('w-2 h-2 bg-primary rounded-full animate-bounce', sizeClasses.sm)} style={{ animationDelay: '150ms' }} />
        <div className={cn('w-2 h-2 bg-primary rounded-full animate-bounce', sizeClasses.sm)} style={{ animationDelay: '300ms' }} />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className={cn('absolute inset-0 bg-primary rounded-full animate-ping opacity-20')} />
        <div className={cn('absolute inset-0 bg-primary rounded-full animate-pulse')} />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-2 border-muted-foreground border-t-primary',
        sizeClasses[size],
        className
      )}
    />
  );
}

interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  spinnerSize?: 'sm' | 'md' | 'lg';
}

export function LoadingButton({ 
  children, 
  loading = false, 
  disabled = false,
  className = '',
  spinnerSize = 'sm'
}: LoadingButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {loading && <LoadingSpinner size={spinnerSize} className="mr-2" />}
      {children}
    </button>
  );
}