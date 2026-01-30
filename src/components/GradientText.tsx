'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  gradientType?: 'primary' | 'rainbow' | 'sunset' | 'ocean' | 'aurora';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  as?: React.ElementType;
}

const gradients = {
  primary: 'from-primary via-primary/80 to-primary/60',
  rainbow: 'from-red-500 via-yellow-500 to-blue-500',
  sunset: 'from-orange-500 via-pink-500 to-purple-500',
  ocean: 'from-blue-500 via-cyan-500 to-teal-500',
  aurora: 'from-purple-400 via-pink-500 to-red-500'
};

const gradientVariants = {
  static: '',
  animated: 'animate-gradient bg-clip-text text-transparent bg-gradient-to-r',
  shimmer: 'animate-shimmer bg-clip-text text-transparent bg-gradient-to-r',
  pulse: 'animate-pulse bg-clip-text text-transparent bg-gradient-to-r'
};

export function GradientText({
  children,
  className = '',
  animated = true,
  gradientType = 'primary',
  size = 'xl',
  as: Component = 'h1'
}: GradientTextProps) {
  const [animationVariant, setAnimationVariant] = useState<'static' | 'animated' | 'shimmer' | 'pulse'>('static');
  const { theme } = useTheme();

  useEffect(() => {
    if (animated) {
      // Randomly select animation variant for variety
      const variants: Array<'static' | 'animated' | 'shimmer' | 'pulse'> = ['animated', 'shimmer', 'pulse'];
      setAnimationVariant(variants[Math.floor(Math.random() * variants.length)]);
    }
  }, [animated]);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const props = {
    className: `
      font-bold 
      ${sizeClasses[size]} 
      ${gradientVariants[animationVariant]} 
      ${gradients[gradientType]}
      ${className}
      ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
    `.trim()
  };

  return <Component {...props}>{children}</Component>;
}

interface AnimatedHeadingProps extends Omit<GradientTextProps, 'as'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function AnimatedHeading({ 
  children, 
  level = 1, 
  className = '',
  size,
  ...props 
}: AnimatedHeadingProps) {
  const headingComponents: Record<number, React.ElementType> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6'
  };

  const headingSizes: Record<number, GradientTextProps['size']> = {
    1: '4xl',
    2: '3xl',
    3: '2xl',
    4: 'xl',
    5: 'lg',
    6: 'md'
  };

  return (
    <GradientText
      as={headingComponents[level]}
      size={size || headingSizes[level]}
      className={className}
      {...props}
    >
      {children}
    </GradientText>
  );
}