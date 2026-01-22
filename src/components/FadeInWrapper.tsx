"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface FadeInWrapperProps {
  children: ReactNode;
  duration?: number; // Animation duration in milliseconds
  delay?: number; // Delay before animation starts in milliseconds
  className?: string; // Additional CSS classes
}

/**
 * A reusable wrapper component that fades in elements when they come into view.
 * Uses Intersection Observer to detect visibility and applies a smooth fade-in animation.
 * 
 * @param children - The content to wrap and animate
 * @param duration - Animation duration in milliseconds (default: 600ms)
 * @param delay - Delay before animation starts in milliseconds (default: 0ms)
 * @param className - Additional CSS classes to apply
 */
export function FadeInWrapper({ 
  children, 
  duration = 600, 
  delay = 0,
  className = "" 
}: FadeInWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay if specified
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }
            // Once visible, we can stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Start animation slightly before element enters viewport
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}

