import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

interface BirdProps {
  startX: number;
  startY: number;
  size: number;
  speed: number;
  delay: number;
  amplitude: number;
}

function Bird({ startX, startY, size, speed, delay, amplitude }: BirdProps) {
  const [x, setX] = useState(startX);
  
  useEffect(() => {
    const animate = () => {
      setX(prev => {
        if (prev > window.innerWidth + 100) {
          return -100;
        }
        return prev + speed;
      });
    };
    
    const timeout = setTimeout(() => {
      const interval = setInterval(animate, 50);
      return () => clearInterval(interval);
    }, delay);
    
    const interval = setInterval(animate, 50);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [speed, delay]);

  const y = startY + Math.sin((x / 50) + delay) * amplitude;
  const wingPhase = Math.sin((Date.now() / 100) + delay) * 0.3;

  return (
    <motion.svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 24 12"
      className="absolute text-foreground/60 dark:text-foreground/40"
      style={{ left: x, top: y }}
      animate={{ 
        scaleY: [1, 0.7, 1],
        rotateZ: wingPhase * 10 
      }}
      transition={{ 
        duration: 0.3, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path
        d="M12 6 Q8 2 2 4 Q6 6 12 6 Q18 6 22 4 Q16 2 12 6"
        fill="currentColor"
      />
    </motion.svg>
  );
}

function BirdFlock({ count = 12 }: { count?: number }) {
  const birds = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) - 200,
      startY: 80 + Math.random() * 150,
      size: 16 + Math.random() * 12,
      speed: 0.8 + Math.random() * 1.2,
      delay: Math.random() * 2000,
      amplitude: 5 + Math.random() * 10,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none dark:opacity-0 transition-opacity duration-500">
      {birds.map(bird => (
        <Bird key={bird.id} {...bird} />
      ))}
    </div>
  );
}

function Stars({ count = 50 }: { count?: number }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-foreground/80"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Clouds() {
  const clouds = useMemo(() => [
    { id: 1, x: 10, y: 15, scale: 1, speed: 20 },
    { id: 2, x: 30, y: 8, scale: 0.8, speed: 25 },
    { id: 3, x: 60, y: 20, scale: 1.2, speed: 30 },
    { id: 4, x: 80, y: 12, scale: 0.7, speed: 22 },
    { id: 5, x: 45, y: 25, scale: 0.9, speed: 28 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none dark:opacity-0 transition-opacity duration-500">
      {clouds.map(cloud => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{ left: `${cloud.x}%`, top: `${cloud.y}%` }}
          animate={{ x: [0, 50, 0] }}
          transition={{
            duration: cloud.speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width={80 * cloud.scale}
            height={40 * cloud.scale}
            viewBox="0 0 80 40"
            className="text-foreground/10 dark:text-foreground/5"
          >
            <ellipse cx="30" cy="25" rx="25" ry="12" fill="currentColor" />
            <ellipse cx="50" cy="20" rx="20" ry="15" fill="currentColor" />
            <ellipse cx="45" cy="28" rx="18" ry="10" fill="currentColor" />
            <ellipse cx="25" cy="18" rx="15" ry="10" fill="currentColor" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function Sun() {
  return (
    <motion.div
      className="absolute dark:opacity-0 transition-opacity duration-500"
      style={{ right: "15%", top: "10%" }}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative">
        {/* Sun glow */}
        <div className="absolute inset-0 w-20 h-20 rounded-full bg-highlight-4/30 blur-xl" />
        {/* Sun body */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-highlight-4 to-highlight-1" />
        {/* Sun rays */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 bg-highlight-4/40"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-40px)`,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function Moon() {
  return (
    <motion.div
      className="absolute opacity-0 dark:opacity-100 transition-opacity duration-500"
      style={{ right: "15%", top: "10%" }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative">
        {/* Moon glow */}
        <div className="absolute -inset-4 w-24 h-24 rounded-full bg-foreground/10 blur-xl" />
        {/* Moon body */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-foreground/90 to-foreground/70 relative overflow-hidden">
          {/* Craters */}
          <div className="absolute w-3 h-3 rounded-full bg-foreground/50 top-2 left-3" />
          <div className="absolute w-2 h-2 rounded-full bg-foreground/50 top-6 left-7" />
          <div className="absolute w-4 h-4 rounded-full bg-foreground/50 top-8 left-2" />
        </div>
      </div>
    </motion.div>
  );
}

interface MountainLayerProps {
  color: string;
  darkColor: string;
  points: string;
  parallaxOffset: number;
  scrollYProgress: any;
}

function MountainLayer({ color, darkColor, points, parallaxOffset, scrollYProgress }: MountainLayerProps) {
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxOffset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      style={{ y: smoothY }}
    >
      <polygon
        points={points}
        className={`${color} dark:${darkColor} transition-colors duration-500`}
        fill="currentColor"
      />
    </motion.svg>
  );
}

interface ScenicParallaxProps {
  className?: string;
}

export function ScenicParallax({ className = "" }: ScenicParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-highlight-3/20 via-highlight-2/10 to-highlight-1/5 dark:from-background dark:via-background dark:to-secondary/50 transition-colors duration-500" />
      
      {/* Stars (night only) */}
      <Stars count={60} />
      
      {/* Clouds (day only) */}
      <Clouds />
      
      {/* Sun / Moon */}
      <Sun />
      <Moon />
      
      {/* Far mountains - slowest parallax */}
      <MountainLayer
        color="text-highlight-2/20"
        darkColor="text-highlight-2/10"
        points="0,400 0,280 100,240 200,260 350,200 500,240 650,180 800,220 950,160 1100,200 1250,170 1350,210 1440,180 1440,400"
        parallaxOffset={30}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Mid mountains */}
      <MountainLayer
        color="text-highlight-1/25"
        darkColor="text-highlight-1/15"
        points="0,400 0,300 80,270 180,290 280,250 420,280 550,230 700,270 850,220 1000,260 1150,210 1280,250 1380,220 1440,250 1440,400"
        parallaxOffset={60}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Near hills */}
      <MountainLayer
        color="text-highlight-3/30"
        darkColor="text-highlight-3/20"
        points="0,400 0,320 120,300 250,330 400,290 550,320 720,280 900,310 1050,270 1200,300 1350,280 1440,310 1440,400"
        parallaxOffset={90}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Trees/Forest layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        style={{ 
          y: useSpring(
            useTransform(scrollYProgress, [0, 1], [0, 120]),
            { stiffness: 100, damping: 30 }
          )
        }}
      >
        <svg
          className="w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          {/* Tree silhouettes */}
          <g className="text-secondary dark:text-muted transition-colors duration-500" fill="currentColor">
            {/* Generate procedural trees */}
            {[...Array(30)].map((_, i) => {
              const x = (i / 30) * 1440 + Math.sin(i * 0.5) * 20;
              const height = 80 + Math.sin(i * 0.7) * 40;
              const width = 30 + Math.cos(i * 0.3) * 15;
              return (
                <polygon
                  key={i}
                  points={`${x},200 ${x + width / 2},${200 - height} ${x + width},200`}
                />
              );
            })}
          </g>
          {/* Ground */}
          <rect x="0" y="180" width="1440" height="20" className="text-secondary dark:text-muted transition-colors duration-500" fill="currentColor" />
        </svg>
      </motion.div>
      
      {/* Flying birds (day only) */}
      <BirdFlock count={12} />
    </div>
  );
}
