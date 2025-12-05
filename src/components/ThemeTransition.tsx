"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState, useRef } from "react";

export function ThemeTransition() {
  const { transitionState } = useTheme();
  const [radius, setRadius] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (transitionState.isTransitioning) {
      // Calculate max distance
      const maxDistance = Math.max(
        Math.hypot(transitionState.x, transitionState.y),
        Math.hypot(window.innerWidth - transitionState.x, transitionState.y),
        Math.hypot(transitionState.x, window.innerHeight - transitionState.y),
        Math.hypot(window.innerWidth - transitionState.x, window.innerHeight - transitionState.y)
      ) * 1.5;

      setIsVisible(true);
      setRadius(0);
      
      // Cancel any existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Start animation smoothly
      const startTime = performance.now();
      const duration = 800; // ms
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (cubic-bezier equivalent)
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        setRadius(eased * maxDistance);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsVisible(false);
      setRadius(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [transitionState]);

  if (!transitionState.isTransitioning || !transitionState.newTheme || !isVisible) {
    return null;
  }

  const blurSize = 50;
  const innerRadius = Math.max(0, radius - blurSize);

  return (
    <>
      {/* Outer blurred edge */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          clipPath: `circle(${radius}px at ${transitionState.x}px ${transitionState.y}px)`,
          WebkitClipPath: `circle(${radius}px at ${transitionState.x}px ${transitionState.y}px)`,
          willChange: "clip-path",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/assets/${transitionState.newTheme === "dark" ? "bg-dark.png" : "bg-light.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: `blur(${blurSize}px)`,
          }}
        />
      </div>
      
      {/* Inner solid area */}
      <div
        className="fixed inset-0 pointer-events-none z-[10000]"
        style={{
          clipPath: `circle(${innerRadius}px at ${transitionState.x}px ${transitionState.y}px)`,
          WebkitClipPath: `circle(${innerRadius}px at ${transitionState.x}px ${transitionState.y}px)`,
          willChange: "clip-path",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/assets/${transitionState.newTheme === "dark" ? "bg-dark.png" : "bg-light.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </>
  );
}

