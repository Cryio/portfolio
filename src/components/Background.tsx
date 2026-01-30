"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "./ThemeProvider";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

function useThrottledCallback<T extends unknown[]>(callback: (...args: T) => void, delay: number) {
  const lastRun = useRef(Date.now());
  
  return useCallback((...args: T) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
}

// Parallax layer configuration
const PARALLAX_LAYERS = {
  light: [
    { name: "background", image: "/assets/bg_light_parallax/bg-light.jpg", factor: 0.2, zIndex: 1 },
    { name: "foreground", image: "/assets/bg_light_parallax/foreground.png", factor: 0.8, zIndex: 2 },
  ],
  dark: [
    { name: "background", image: "/assets/bg_dark_parallax/bg-dark.png", factor: 0.2, zIndex: 1 },
    { name: "foreground", image: "/assets/bg_dark_parallax/1.png", factor: 0.8, zIndex: 2 },
  ]
};

export function Background() {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  // Setup motion values for mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Optimized spring physics - smoother with better damping
  const springConfig = isMobile ? 
    { stiffness: 30, damping: 35 } : 
    { stiffness: 40, damping: 30 };
  
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Pre-calculate layer transforms manually
  const currentLayers = PARALLAX_LAYERS[theme as keyof typeof PARALLAX_LAYERS] || PARALLAX_LAYERS.light;
  const layer1X = useTransform(smoothX, (value) => value / (50 / currentLayers[0].factor));
  const layer1Y = useTransform(smoothY, (value) => value / (50 / currentLayers[0].factor));
  const layer2X = useTransform(smoothX, (value) => value / (50 / currentLayers[1].factor));
  const layer2Y = useTransform(smoothY, (value) => value / (50 / currentLayers[1].factor));

  // Throttled scroll handler
  const throttledHandleScroll = useThrottledCallback(() => {
    setScrollY(window.scrollY);
  }, 16);

  // Throttled mouse move handler
  const throttledHandleMouseMove = useThrottledCallback((e: MouseEvent) => {
    if (isMobile) return;
    
    const { innerWidth, innerHeight } = window;
    const xPos = (e.clientX - innerWidth / 2) * (isMobile ? 0.3 : 1);
    const yPos = (e.clientY - innerHeight / 2) * (isMobile ? 0.3 : 1);

    mouseX.set(xPos);
    mouseY.set(yPos);
  }, 16);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    window.addEventListener("mousemove", throttledHandleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      window.removeEventListener("mousemove", throttledHandleMouseMove);
    };
  }, [throttledHandleScroll, throttledHandleMouseMove, isMobile]);

  // Optimized blur and opacity calculations
  const blurAmount = Math.min(1 + scrollY / 300, 80);
  const opacityAmount = Math.max(0.85 - scrollY / 15000, 0.4);



  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div 
        className="relative w-full h-full scale-110" 
      >
        {/* Background layer */}
        <motion.div 
          style={{ 
            x: layer1X,
            y: layer1Y,
            willChange: 'transform'
          }}
          className="absolute inset-0"
        >
          <img
            src={currentLayers[0].image}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: opacityAmount }}
            loading="lazy"
          />
        </motion.div>
        
        {/* Foreground layer */}
        <motion.div 
          style={{ 
            x: layer2X,
            y: layer2Y,
            willChange: 'transform'
          }}
          className="absolute inset-0"
        >
          <img
            src={currentLayers[1].image}
            alt="Foreground"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: opacityAmount }}
            loading="lazy"
          />
        </motion.div>
        
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/10"
          style={{
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
          }}
        />
      </motion.div>
    </div>
  );
}