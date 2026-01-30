"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimate, useInView } from "framer-motion";
import { useTheme } from "./ThemeProvider";

// Parallax layer configuration
const PARALLAX_LAYERS = [
  { name: "background", image: "/assets/bg-light_parallax/bg-light.jpg", factor: 0.2, zIndex: 1 },
  { name: "layer2", image: "/assets/bg-light_parallax/layer2.png", factor: 0.5, zIndex: 2 },
  { name: "layer1.5", image: "/assets/bg-light_parallax/layer1.5.png", factor: 0.7, zIndex: 3 },
  { name: "foreground", image: "/assets/bg-light_parallax/foreground.png", factor: 1.2, zIndex: 4 },
];

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

export function Background() {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const [scope, animate] = useAnimate();

  // Setup motion values for mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Optimized spring physics - smoother with better damping
  const springConfig = isMobile ? 
    { stiffness: 30, damping: 35 } : 
    { stiffness: 40, damping: 30 };
  
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform calculations for different parallax modes
  const mobileFactor = isMobile ? -60 : -40;
  const singleLayerX = useTransform(smoothX, (value) => value / mobileFactor);
  const singleLayerY = useTransform(smoothY, (value) => value / mobileFactor);

  // Pre-calculate layer transforms
  const layer1TransformX = useTransform(smoothX, (value) => value / (50 / PARALLAX_LAYERS[0].factor));
  const layer1TransformY = useTransform(smoothY, (value) => value / (50 / PARALLAX_LAYERS[0].factor));
  const layer2TransformX = useTransform(smoothX, (value) => value / (50 / PARALLAX_LAYERS[1].factor));
  const layer2TransformY = useTransform(smoothY, (value) => value / (50 / PARALLAX_LAYERS[1].factor));
  const layer3TransformX = useTransform(smoothX, (value) => value / (50 / PARALLAX_LAYERS[2].factor));
  const layer3TransformY = useTransform(smoothY, (value) => value / (50 / PARALLAX_LAYERS[2].factor));
  const layer4TransformX = useTransform(smoothX, (value) => value / (50 / PARALLAX_LAYERS[3].factor));
  const layer4TransformY = useTransform(smoothY, (value) => value / (50 / PARALLAX_LAYERS[3].factor));

  // Throttled scroll handler for better performance
  const throttledHandleScroll = useThrottledCallback(() => {
    if (isInView) {
      setScrollY(window.scrollY);
    }
  }, 16); // ~60fps

  // Throttled mouse move handler
  const throttledHandleMouseMove = useThrottledCallback((e: MouseEvent) => {
    if (!isInView || isMobile) return;
    
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
  }, [throttledHandleScroll, throttledHandleMouseMove, isInView, isMobile]);

  // Optimized blur and opacity calculations
  const blurAmount = Math.min(1 + scrollY / 300, 80);
  const opacityAmount = Math.max(0.85 - scrollY / 15000, 0.4);
  
  // Dynamic gradient overlay based on scroll
  const gradientOpacity = Math.min(scrollY / 1000, 0.7);

  // Check if we should use parallax layers
  const useParallaxLayers = theme === "light" && !isMobile;
  const backgroundImage = theme === "dark" ? "/assets/bg-dark.png" : "/assets/bg-light.jpg";

  // Animate gradient overlay on theme change
  useEffect(() => {
    if (scope.current) {
      animate(scope.current, { opacity: [0, 1] }, { duration: 0.8 });
    }
  }, [theme, animate, scope]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {useParallaxLayers ? (
        // Multi-layer parallax for light theme
        <div className="relative w-full h-full scale-110" style={{ willChange: 'transform' }}>
          {PARALLAX_LAYERS.map((layer, index) => {
            let xTransform, yTransform;
            switch(index) {
              case 0:
                xTransform = layer1TransformX;
                yTransform = layer1TransformY;
                break;
              case 1:
                xTransform = layer2TransformX;
                yTransform = layer2TransformY;
                break;
              case 2:
                xTransform = layer3TransformX;
                yTransform = layer3TransformY;
                break;
              case 3:
                xTransform = layer4TransformX;
                yTransform = layer4TransformY;
                break;
              default:
                xTransform = layer1TransformX;
                yTransform = layer1TransformY;
            }
            
            return (
              <motion.div
                key={layer.name}
                style={{ 
                  x: xTransform, 
                  y: yTransform, 
                  zIndex: layer.zIndex,
                  willChange: 'transform'
                }}
                className="absolute inset-0"
              >
                <img
                  src={layer.image}
                  alt={`${layer.name} parallax layer`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ 
                    opacity: opacityAmount,
                    filter: `blur(${blurAmount * layer.factor}px)`,
                  }}
                />
              </motion.div>
            );
          })}
          
          {/* Animated gradient overlay */}
          <motion.div 
            ref={scope}
            className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background/5"
            style={{
              backdropFilter: `blur(${blurAmount}px)`,
              WebkitBackdropFilter: `blur(${blurAmount}px)`,
              opacity: 0.3 + gradientOpacity,
            }}
            animate={{
              background: scrollY > 100 
                ? "linear-gradient(to bottom, rgba(var(--background), 0.7), rgba(var(--background), 0.3), rgba(var(--background), 0.1))"
                : "linear-gradient(to bottom, rgba(var(--background), 0.5), rgba(var(--background), 0.2), rgba(var(--background), 0.05))"
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      ) : (
        // Single layer for dark theme or mobile
        <motion.div 
          style={{ 
            x: singleLayerX,
            y: singleLayerY,
            willChange: 'transform'
          }} 
          className="relative w-full h-full scale-110" 
        >
          <img
            src={backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: opacityAmount }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/10"
            style={{
              backdropFilter: `blur(${blurAmount}px)`,
              WebkitBackdropFilter: `blur(${blurAmount}px)`,
            }}
            animate={{
              opacity: 0.6 + gradientOpacity * 0.4,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </div>
  );
}
