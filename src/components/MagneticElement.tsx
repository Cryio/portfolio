'use client';

import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function useMagneticEffect<T extends HTMLElement = HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      const animate = () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        
        setPosition({
          x: deltaX,
          y: deltaY
        });
      };
      
      animate();
    };

    const handleMouseLeave = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      const animateBack = () => {
        setPosition(prev => ({
          x: prev.x * 0.9,
          y: prev.y * 0.9
        }));
        
        if (Math.abs(position.x) > 0.1 || Math.abs(position.y) > 0.1) {
          animationRef.current = requestAnimationFrame(animateBack);
        } else {
          setPosition({ x: 0, y: 0 });
        }
      };
      
      animateBack();
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [strength, position.x, position.y]);

  return { ref, position };
}

export function MagneticElement({ 
  children, 
  strength = 0.3, 
  className = '' 
}: MagneticElementProps) {
  const { ref, position } = useMagneticEffect<HTMLDivElement>(strength);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {children}
    </div>
  );
}

export function MagneticButton({ 
  children, 
  strength = 0.5,
  className = '',
  ...props 
}: MagneticElementProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ref, position } = useMagneticEffect<HTMLButtonElement>(strength);

  return (
    <button
      ref={ref}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function MagneticCard({ 
  children, 
  strength = 0.2,
  className = '',
  ...props 
}: MagneticElementProps & React.HTMLAttributes<HTMLDivElement>) {
  const { ref, position } = useMagneticEffect<HTMLDivElement>(strength);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
      {...props}
    >
      {children}
    </div>
  );
}