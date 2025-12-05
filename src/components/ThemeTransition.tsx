"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeTransition() {
  const { transitionState } = useTheme();
  const [radius, setRadius] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const blurRadius = 80; // Blur radius for smooth edge

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
          setRadius(maxDistance * 1.2 + blurRadius); // Add padding and blur radius
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

  // Create a radial gradient mask for smooth blurred edge
  // The mask creates a soft transition from opaque to transparent
  const innerRadius = Math.max(0, radius - blurRadius);
  const outerRadius = radius;
  const maskImage = `radial-gradient(circle ${outerRadius}px at ${transitionState.x}px ${transitionState.y}px, 
    black ${innerRadius}px, 
    rgba(0, 0, 0, 0.8) ${innerRadius + blurRadius * 0.2}px,
    rgba(0, 0, 0, 0.4) ${innerRadius + blurRadius * 0.5}px,
    rgba(0, 0, 0, 0.1) ${innerRadius + blurRadius * 0.8}px,
    transparent ${outerRadius}px)`;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        // Use clip-path for the main reveal, and mask for the blurred edge
        clipPath: `circle(${innerRadius}px at ${transitionState.x}px ${transitionState.y}px)`,
        WebkitClipPath: `circle(${innerRadius}px at ${transitionState.x}px ${transitionState.y}px)`,
        transition: "clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1), -webkit-clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "clip-path",
      }}
    >
      {/* Blurred edge layer */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
          maskSize: `${window.innerWidth * 2}px ${window.innerHeight * 2}px`,
          WebkitMaskSize: `${window.innerWidth * 2}px ${window.innerHeight * 2}px`,
          maskPosition: `${transitionState.x - window.innerWidth}px ${transitionState.y - window.innerHeight}px`,
          WebkitMaskPosition: `${transitionState.x - window.innerWidth}px ${transitionState.y - window.innerHeight}px`,
          transition: "mask-image 0.8s cubic-bezier(0.4, 0, 0.2, 1), -webkit-mask-image 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "mask-image",
          filter: "blur(20px)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* This div shows the new theme's background */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(/assets/${transitionState.newTheme === "dark" ? "bg-dark.png" : "bg-light.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
      {/* Solid center - shows the transformed page content */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `circle(${innerRadius}px at ${transitionState.x}px ${transitionState.y}px)`,
          WebkitClipPath: `circle(${innerRadius}px at ${transitionState.x}px ${transitionState.y}px)`,
          transition: "clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1), -webkit-clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Background for the revealed area */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(/assets/${transitionState.newTheme === "dark" ? "bg-dark.png" : "bg-light.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}

