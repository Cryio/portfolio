"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeTransition() {
  const { transitionState } = useTheme();
  const [radius, setRadius] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (transitionState.isTransitioning) {
      // Calculate the maximum distance from the click point to any corner
      const maxDistance = Math.max(
        Math.hypot(transitionState.x, transitionState.y),
        Math.hypot(window.innerWidth - transitionState.x, transitionState.y),
        Math.hypot(transitionState.x, window.innerHeight - transitionState.y),
        Math.hypot(window.innerWidth - transitionState.x, window.innerHeight - transitionState.y)
      );

      // Start animation
      setIsVisible(true);
      setRadius(0);
      
      // Use setTimeout to ensure the initial state is rendered before animation starts
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          setRadius(maxDistance * 1.2); // Add some padding to ensure full coverage
        });
      }, 10);
      
      return () => clearTimeout(timeoutId);
    } else {
      setIsVisible(false);
      setRadius(0);
    }
  }, [transitionState]);

  if (!transitionState.isTransitioning || !transitionState.newTheme || !isVisible) {
    return null;
  }

  const isDark = transitionState.newTheme === "dark";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        clipPath: `circle(${radius}px at ${transitionState.x}px ${transitionState.y}px)`,
        transition: "clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "clip-path",
      }}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(/assets/${isDark ? "bg-dark.png" : "bg-light.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
        }}
      />
    </div>
  );
}

