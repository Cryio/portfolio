import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

// ============= SHOOTING STARS (Night only) =============
interface ShootingStarProps {
  delay: number;
  duration: number;
  startX: number;
  startY: number;
}

function ShootingStar({ delay, duration, startX, startY }: ShootingStarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showStar = () => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), duration * 1000);
    };

    const timeout = setTimeout(showStar, delay * 1000);
    const interval = setInterval(showStar, (delay + duration + Math.random() * 10) * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [delay, duration]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        x: -300,
        y: 150,
      }}
      transition={{ duration, ease: "linear" }}
    >
      {/* Star head */}
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-foreground/90 shadow-[0_0_10px_4px_rgba(255,255,255,0.6)]" />
        {/* Star tail */}
        <div 
          className="absolute top-1/2 left-1/2 w-32 h-[2px] origin-left -translate-y-1/2"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0.8), transparent)",
            transform: "rotate(215deg) translateY(-50%)",
          }}
        />
      </div>
    </motion.div>
  );
}

function ShootingStars() {
  const stars = useMemo(() => [
    { id: 1, delay: 2, duration: 1.5, startX: 80, startY: 10 },
    { id: 2, delay: 8, duration: 1.2, startX: 60, startY: 5 },
    { id: 3, delay: 15, duration: 1.8, startX: 90, startY: 15 },
    { id: 4, delay: 22, duration: 1.3, startX: 70, startY: 8 },
    { id: 5, delay: 30, duration: 1.6, startX: 85, startY: 12 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500">
      {stars.map(star => (
        <ShootingStar key={star.id} {...star} />
      ))}
    </div>
  );
}

// ============= TWINKLING STARS =============
function Stars({ count = 80 }: { count?: number }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      size: 0.5 + Math.random() * 2.5,
      delay: Math.random() * 5,
      duration: 1.5 + Math.random() * 3,
      brightness: 0.4 + Math.random() * 0.6,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-700">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: `rgba(255, 255, 255, ${star.brightness})`,
            boxShadow: star.size > 1.5 ? `0 0 ${star.size * 2}px rgba(255,255,255,0.5)` : 'none',
          }}
          animate={{
            opacity: [star.brightness * 0.5, star.brightness, star.brightness * 0.5],
            scale: [0.9, 1.1, 0.9],
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

// ============= V-FORMATION BIRDS =============
interface BirdProps {
  x: number;
  y: number;
  size: number;
  flapSpeed: number;
  flapOffset: number;
}

function Bird({ x, y, size, flapSpeed, flapOffset }: BirdProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 40 16"
      className="absolute text-foreground/70"
      style={{ left: x, top: y }}
      animate={{
        scaleY: [1, 0.6, 1],
      }}
      transition={{
        duration: flapSpeed,
        repeat: Infinity,
        ease: "easeInOut",
        delay: flapOffset,
      }}
    >
      {/* More elegant bird shape */}
      <path
        d="M20 8 
           Q12 2, 2 6 
           Q8 7, 12 8 
           Q8 9, 2 10 
           Q12 14, 20 8
           Q28 2, 38 6 
           Q32 7, 28 8 
           Q32 9, 38 10 
           Q28 14, 20 8"
        fill="currentColor"
      />
    </motion.svg>
  );
}

interface BirdFlockProps {
  startX: number;
  startY: number;
  birdCount: number;
  speed: number;
  delay: number;
  formation: 'v' | 'line' | 'scattered';
}

function BirdFlock({ startX, startY, birdCount, speed, delay, formation }: BirdFlockProps) {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const startTimer = setTimeout(() => setIsActive(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      setPosition(prev => {
        const newX = prev.x + speed;
        const newY = prev.y + Math.sin(newX / 100) * 0.5; // Gentle wave motion
        
        // Reset when off screen
        if (newX > window.innerWidth + 200) {
          return { x: -200, y: startY + (Math.random() - 0.5) * 100 };
        }
        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [isActive, speed, startY]);

  // Generate bird positions based on formation
  const birds = useMemo(() => {
    const result = [];
    for (let i = 0; i < birdCount; i++) {
      let offsetX = 0, offsetY = 0;
      
      if (formation === 'v') {
        // V formation
        const side = i % 2 === 0 ? 1 : -1;
        const row = Math.floor((i + 1) / 2);
        offsetX = -row * 35;
        offsetY = side * row * 20;
      } else if (formation === 'line') {
        offsetX = -i * 40;
        offsetY = Math.sin(i * 0.5) * 10;
      } else {
        offsetX = -Math.random() * 80 - i * 20;
        offsetY = (Math.random() - 0.5) * 60;
      }

      result.push({
        id: i,
        offsetX,
        offsetY,
        size: 20 + Math.random() * 10,
        flapSpeed: 0.3 + Math.random() * 0.2,
        flapOffset: Math.random() * 0.3,
      });
    }
    return result;
  }, [birdCount, formation]);

  if (!isActive) return null;

  return (
    <div className="absolute pointer-events-none">
      {birds.map(bird => (
        <Bird
          key={bird.id}
          x={position.x + bird.offsetX}
          y={position.y + bird.offsetY}
          size={bird.size}
          flapSpeed={bird.flapSpeed}
          flapOffset={bird.flapOffset}
        />
      ))}
    </div>
  );
}

function BirdFlocks() {
  const flocks = useMemo(() => [
    { id: 1, startX: -100, startY: 120, birdCount: 7, speed: 1.2, delay: 0, formation: 'v' as const },
    { id: 2, startX: -300, startY: 80, birdCount: 5, speed: 0.9, delay: 5000, formation: 'v' as const },
    { id: 3, startX: -200, startY: 180, birdCount: 4, speed: 1.5, delay: 12000, formation: 'line' as const },
    { id: 4, startX: -150, startY: 140, birdCount: 6, speed: 1.1, delay: 20000, formation: 'v' as const },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none dark:opacity-0 transition-opacity duration-500">
      {flocks.map(flock => (
        <BirdFlock key={flock.id} {...flock} />
      ))}
    </div>
  );
}

// ============= CLOUDS =============
function Cloud({ x, y, scale, speed }: { x: number; y: number; scale: number; speed: number }) {
  return (
    <motion.svg
      className="absolute text-foreground/[0.07] dark:text-foreground/[0.03]"
      style={{ left: `${x}%`, top: `${y}%` }}
      width={150 * scale}
      height={60 * scale}
      viewBox="0 0 150 60"
      animate={{ x: [0, 80, 0] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <ellipse cx="45" cy="40" rx="40" ry="18" fill="currentColor" />
      <ellipse cx="80" cy="30" rx="35" ry="25" fill="currentColor" />
      <ellipse cx="110" cy="38" rx="30" ry="18" fill="currentColor" />
      <ellipse cx="65" cy="45" rx="25" ry="12" fill="currentColor" />
      <ellipse cx="95" cy="42" rx="28" ry="15" fill="currentColor" />
    </motion.svg>
  );
}

function Clouds() {
  const clouds = useMemo(() => [
    { id: 1, x: 5, y: 8, scale: 1.2, speed: 45 },
    { id: 2, x: 25, y: 15, scale: 0.8, speed: 55 },
    { id: 3, x: 55, y: 5, scale: 1, speed: 40 },
    { id: 4, x: 75, y: 18, scale: 0.7, speed: 60 },
    { id: 5, x: 40, y: 22, scale: 0.9, speed: 50 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map(cloud => (
        <Cloud key={cloud.id} {...cloud} />
      ))}
    </div>
  );
}

// ============= SUN & MOON =============
function Sun() {
  return (
    <motion.div
      className="absolute dark:opacity-0 transition-opacity duration-700"
      style={{ right: "12%", top: "8%" }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute -inset-8 rounded-full bg-gradient-radial from-highlight-4/30 via-highlight-4/10 to-transparent blur-xl" />
        {/* Sun body with gradient */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-highlight-4 via-highlight-1/80 to-highlight-4/60 shadow-[0_0_60px_20px_rgba(255,200,100,0.3)]" />
        {/* Sun rays */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-t from-highlight-4/60 to-transparent rounded-full"
              style={{ transform: `rotate(${i * 30}deg) translateY(-52px)` }}
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
      className="absolute opacity-0 dark:opacity-100 transition-opacity duration-700"
      style={{ right: "12%", top: "8%" }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative">
        {/* Moon glow */}
        <div className="absolute -inset-6 rounded-full bg-foreground/10 blur-2xl" />
        {/* Moon body */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-foreground/95 via-foreground/80 to-foreground/60 shadow-[0_0_40px_10px_rgba(255,255,255,0.2)] relative overflow-hidden">
          {/* Craters with better styling */}
          <div className="absolute w-4 h-4 rounded-full bg-foreground/40 top-2 left-4 shadow-inner" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-foreground/35 top-7 left-9 shadow-inner" />
          <div className="absolute w-5 h-5 rounded-full bg-foreground/30 top-9 left-2 shadow-inner" />
          <div className="absolute w-2 h-2 rounded-full bg-foreground/40 top-4 left-10 shadow-inner" />
        </div>
      </div>
    </motion.div>
  );
}

// ============= MOUNTAIN LAYERS =============
interface MountainLayerProps {
  path: string;
  colorLight: string;
  colorDark: string;
  parallaxOffset: number;
  scrollYProgress: any;
  className?: string;
}

function MountainLayer({ path, colorLight, colorDark, parallaxOffset, scrollYProgress, className = "" }: MountainLayerProps) {
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxOffset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.svg
      className={`absolute bottom-0 left-0 w-full ${className}`}
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      style={{ y: smoothY }}
    >
      <defs>
        <linearGradient id={`mountain-gradient-${parallaxOffset}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className={`${colorLight} dark:${colorDark}`} stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" className={`${colorLight} dark:${colorDark}`} stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path
        d={path}
        className={`${colorLight} dark:${colorDark} transition-colors duration-700`}
        fill="currentColor"
      />
    </motion.svg>
  );
}

// ============= TREES/FOREST =============
function ForestLayer({ scrollYProgress }: { scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // Generate procedural pine trees
  const trees = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const x = (i / 40) * 1440 + (Math.sin(i * 1.5) * 15);
      const height = 60 + Math.sin(i * 0.8) * 30 + Math.random() * 20;
      const width = 25 + Math.random() * 15;
      return { x, height, width, id: i };
    });
  }, []);

  return (
    <motion.svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      style={{ y: smoothY }}
    >
      <defs>
        <linearGradient id="forest-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className="text-secondary dark:text-muted" stopColor="currentColor" />
          <stop offset="100%" className="text-muted dark:text-muted/80" stopColor="currentColor" />
        </linearGradient>
      </defs>
      
      {/* Tree silhouettes */}
      <g className="text-secondary dark:text-muted transition-colors duration-700">
        {trees.map(tree => (
          <g key={tree.id}>
            {/* Pine tree shape */}
            <path
              d={`
                M${tree.x},180 
                L${tree.x + tree.width * 0.4},180
                L${tree.x + tree.width * 0.4},${180 - tree.height * 0.15}
                L${tree.x + tree.width * 0.7},${180 - tree.height * 0.15}
                L${tree.x + tree.width * 0.5},${180 - tree.height * 0.4}
                L${tree.x + tree.width * 0.8},${180 - tree.height * 0.4}
                L${tree.x + tree.width * 0.5},${180 - tree.height * 0.65}
                L${tree.x + tree.width * 0.75},${180 - tree.height * 0.65}
                L${tree.x + tree.width * 0.5},${180 - tree.height}
                L${tree.x + tree.width * 0.25},${180 - tree.height * 0.65}
                L${tree.x + tree.width * 0.5},${180 - tree.height * 0.65}
                L${tree.x + tree.width * 0.2},${180 - tree.height * 0.4}
                L${tree.x + tree.width * 0.5},${180 - tree.height * 0.4}
                L${tree.x + tree.width * 0.3},${180 - tree.height * 0.15}
                L${tree.x + tree.width * 0.6},${180 - tree.height * 0.15}
                L${tree.x + tree.width * 0.6},180
                Z
              `}
              fill="currentColor"
            />
          </g>
        ))}
      </g>
      
      {/* Ground */}
      <rect 
        x="0" y="165" width="1440" height="15" 
        className="text-secondary dark:text-muted transition-colors duration-700" 
        fill="currentColor" 
      />
    </motion.svg>
  );
}

// ============= MAIN COMPONENT =============
export function ScenicParallax({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth mountain paths with artistic curves
  const mountainPaths = {
    far: "M0,400 L0,260 Q80,220 160,250 Q280,200 380,230 Q500,160 620,200 Q740,140 860,180 Q980,120 1100,160 Q1200,130 1280,170 Q1360,140 1440,160 L1440,400 Z",
    mid: "M0,400 L0,290 Q100,250 200,280 Q320,220 440,260 Q560,200 680,240 Q800,180 920,220 Q1040,170 1160,210 Q1280,180 1360,200 Q1420,190 1440,220 L1440,400 Z",
    near: "M0,400 L0,320 Q120,280 240,310 Q380,260 500,290 Q640,240 780,280 Q920,230 1060,270 Q1200,250 1320,280 Q1400,260 1440,290 L1440,400 Z",
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-highlight-3/15 via-highlight-2/8 via-50% to-highlight-1/5 dark:from-[hsl(220,30%,8%)] dark:via-[hsl(220,25%,10%)] dark:to-[hsl(220,20%,14%)] transition-colors duration-700" />
      
      {/* Stars (night only) */}
      <Stars count={80} />
      
      {/* Shooting stars (night only) */}
      <ShootingStars />
      
      {/* Clouds */}
      <Clouds />
      
      {/* Sun / Moon */}
      <Sun />
      <Moon />
      
      {/* Far mountains - slowest parallax */}
      <MountainLayer
        path={mountainPaths.far}
        colorLight="text-highlight-2/15"
        colorDark="text-highlight-2/8"
        parallaxOffset={25}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Mid mountains */}
      <MountainLayer
        path={mountainPaths.mid}
        colorLight="text-highlight-1/20"
        colorDark="text-highlight-1/12"
        parallaxOffset={55}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Near hills */}
      <MountainLayer
        path={mountainPaths.near}
        colorLight="text-highlight-3/25"
        colorDark="text-highlight-3/15"
        parallaxOffset={85}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Trees/Forest layer */}
      <ForestLayer scrollYProgress={scrollYProgress} />
      
      {/* Flying birds (day only) */}
      <BirdFlocks />
    </div>
  );
}
