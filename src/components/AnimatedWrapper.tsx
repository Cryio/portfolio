'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animationClasses = {
  'fade-up': 'translate-y-8 opacity-0',
  'fade-down': '-translate-y-8 opacity-0',
  'fade-left': 'translate-x-8 opacity-0',
  'fade-right': '-translate-x-8 opacity-0',
  'scale': 'scale-95 opacity-0',
  'rotate': 'rotate-3 opacity-0'
};

const visibleClasses = {
  'fade-up': 'translate-y-0 opacity-100',
  'fade-down': '-translate-y-0 opacity-100',
  'fade-left': 'translate-x-0 opacity-100',
  'fade-right': '-translate-x-0 opacity-100',
  'scale': 'scale-100 opacity-100',
  'rotate': 'rotate-0 opacity-100'
};

export function AnimatedWrapper({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className,
  threshold = 0.1
}: AnimatedWrapperProps) {
  const { ref, shouldAnimate } = useIntersectionObserver({ threshold });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        animationClasses[animation],
        shouldAnimate && visibleClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}