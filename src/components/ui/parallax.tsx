import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // Positive = slower, Negative = faster
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function Parallax({ 
  children, 
  speed = 0.5, 
  className = "",
  direction = "up" 
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const yRange = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const xRange = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  
  const y = useSpring(yRange, springConfig);
  const x = useSpring(xRange, springConfig);

  const getTransform = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: direction === "down" ? useTransform(y, v => -v) : y };
      case "left":
      case "right":
        return { x: direction === "right" ? useTransform(x, v => -v) : x };
      default:
        return { y };
    }
  };

  return (
    <motion.div
      ref={ref}
      style={getTransform()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxLayer({ children, offset = 0, className = "" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  backgroundSpeed?: number;
  backgroundClassName?: string;
  backgroundContent?: ReactNode;
}

export function ParallaxSection({ 
  children, 
  className = "",
  backgroundSpeed = 0.3,
  backgroundClassName = "",
  backgroundContent
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useTransform(scrollYProgress, [0, 1], [100 * backgroundSpeed, -100 * backgroundSpeed]);
  const smoothY = useSpring(y, springConfig);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {backgroundContent && (
        <motion.div
          style={{ y: smoothY }}
          className={`absolute inset-0 pointer-events-none ${backgroundClassName}`}
        >
          {backgroundContent}
        </motion.div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Floating parallax element that responds to scroll
interface FloatingParallaxProps {
  children: ReactNode;
  className?: string;
  floatRange?: number;
  rotateRange?: number;
  scaleRange?: [number, number];
}

export function FloatingParallax({
  children,
  className = "",
  floatRange = 50,
  rotateRange = 10,
  scaleRange = [0.95, 1.05]
}: FloatingParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [floatRange, 0, -floatRange]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-rotateRange, 0, rotateRange]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);
  
  const smoothY = useSpring(y, springConfig);
  const smoothRotate = useSpring(rotate, springConfig);
  const smoothScale = useSpring(scale, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ 
        y: smoothY, 
        rotate: smoothRotate,
        scale: smoothScale
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
