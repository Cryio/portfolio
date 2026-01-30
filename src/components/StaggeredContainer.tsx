'use client';

import { AnimatedWrapper } from './AnimatedWrapper';

interface StaggeredContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'rotate';
  duration?: number;
  className?: string;
}

export function StaggeredContainer({
  children,
  staggerDelay = 100,
  animation = 'fade-up',
  duration = 600,
  className
}: StaggeredContainerProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <AnimatedWrapper
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          duration={duration}
        >
          {child}
        </AnimatedWrapper>
      ))}
    </div>
  );
}