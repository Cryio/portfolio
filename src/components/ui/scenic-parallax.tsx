import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ============= SHOOTING STARS (Night only) =============
function ShootingStar({ delay, duration, startX, startY }: { delay: number; duration: number; startX: number; startY: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showStar = () => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), duration * 1000);
    };

    const timeout = setTimeout(showStar, delay * 1000);
    const interval = setInterval(showStar, (delay + duration + 8 + Math.random() * 12) * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [delay, duration]);

  if (!isVisible) return null;

  // Angle: moving down-left (around 215 degrees)
  const angle = 215;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        left: `${startX}%`, 
        top: `${startY}%`,
        transform: `rotate(${angle - 180}deg)`, // Align the whole element with trajectory
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration, ease: "linear" }}
    >
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 400 }}
        transition={{ duration, ease: "linear" }}
        className="relative"
      >
        {/* Star head */}
        <div className="w-1.5 h-1.5 rounded-full bg-foreground shadow-[0_0_6px_3px_rgba(255,255,255,0.8)]" />
        {/* Tail - now properly aligned behind the head */}
        <div 
          className="absolute top-1/2 right-full w-24 h-[1.5px] -translate-y-1/2"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), rgba(255,255,255,0.9))",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function ShootingStars() {
  const stars = useMemo(() => [
    { id: 1, delay: 3, duration: 1.2, startX: 75, startY: 8 },
    { id: 2, delay: 10, duration: 0.9, startX: 55, startY: 5 },
    { id: 3, delay: 18, duration: 1.4, startX: 85, startY: 12 },
    { id: 4, delay: 28, duration: 1.0, startX: 65, startY: 6 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500">
      {stars.map(star => <ShootingStar key={star.id} {...star} />)}
    </div>
  );
}

// ============= TWINKLING STARS =============
function Stars({ count = 100 }: { count?: number }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 45,
      size: 0.8 + Math.random() * 2,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      brightness: 0.5 + Math.random() * 0.5,
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
            boxShadow: star.size > 1.8 ? `0 0 ${star.size * 3}px rgba(255,255,255,0.4)` : 'none',
          }}
          animate={{
            opacity: [star.brightness * 0.4, star.brightness, star.brightness * 0.4],
            scale: [0.85, 1.15, 0.85],
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

// ============= REALISTIC FLYING BIRDS =============
function Bird({ size, flapDuration, flapDelay }: { size: number; flapDuration: number; flapDelay: number }) {
  return (
    <motion.svg
      width={size}
      height={size * 0.35}
      viewBox="0 0 50 18"
      className="text-foreground/60"
      style={{ overflow: 'visible' }}
    >
      {/* Left wing */}
      <motion.path
        d="M25 9 Q18 9, 12 7 Q6 5, 0 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        animate={{
          d: [
            "M25 9 Q18 9, 12 7 Q6 5, 0 8",
            "M25 9 Q18 6, 12 3 Q6 0, 0 2",
            "M25 9 Q18 9, 12 7 Q6 5, 0 8",
            "M25 9 Q18 12, 12 11 Q6 10, 0 12",
            "M25 9 Q18 9, 12 7 Q6 5, 0 8",
          ]
        }}
        transition={{
          duration: flapDuration,
          repeat: Infinity,
          delay: flapDelay,
          ease: "easeInOut",
        }}
      />
      {/* Right wing */}
      <motion.path
        d="M25 9 Q32 9, 38 7 Q44 5, 50 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        animate={{
          d: [
            "M25 9 Q32 9, 38 7 Q44 5, 50 8",
            "M25 9 Q32 6, 38 3 Q44 0, 50 2",
            "M25 9 Q32 9, 38 7 Q44 5, 50 8",
            "M25 9 Q32 12, 38 11 Q44 10, 50 12",
            "M25 9 Q32 9, 38 7 Q44 5, 50 8",
          ]
        }}
        transition={{
          duration: flapDuration,
          repeat: Infinity,
          delay: flapDelay,
          ease: "easeInOut",
        }}
      />
      {/* Body hint */}
      <circle cx="25" cy="9" r="2" fill="currentColor" />
    </motion.svg>
  );
}

function BirdFlock({ startX, startY, birdCount, speed, delay, formation }: {
  startX: number; startY: number; birdCount: number; speed: number; delay: number; formation: 'v' | 'line' | 'scattered';
}) {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [isActive, setIsActive] = useState(false);
  const baseY = useRef(startY);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isActive) return;
    const animate = () => {
      setPosition(prev => {
        const newX = prev.x + speed;
        // Gentle sine wave for natural flight path
        const newY = baseY.current + Math.sin(newX / 80) * 15;
        if (newX > window.innerWidth + 250) {
          baseY.current = startY + (Math.random() - 0.5) * 80;
          return { x: -250, y: baseY.current };
        }
        return { x: newX, y: newY };
      });
    };
    const interval = setInterval(animate, 40);
    return () => clearInterval(interval);
  }, [isActive, speed, startY]);

  const birds = useMemo(() => {
    return Array.from({ length: birdCount }, (_, i) => {
      let offsetX = 0, offsetY = 0;
      if (formation === 'v') {
        const side = i % 2 === 0 ? 1 : -1;
        const row = Math.floor((i + 1) / 2);
        offsetX = -row * 40;
        offsetY = side * row * 25;
      } else if (formation === 'line') {
        offsetX = -i * 45;
        offsetY = Math.sin(i * 0.6) * 12;
      } else {
        offsetX = -Math.random() * 100 - i * 25;
        offsetY = (Math.random() - 0.5) * 70;
      }
      return {
        id: i,
        offsetX,
        offsetY,
        size: 28 + Math.random() * 12,
        flapDuration: 0.4 + Math.random() * 0.15,
        flapDelay: Math.random() * 0.3,
      };
    });
  }, [birdCount, formation]);

  if (!isActive) return null;

  return (
    <div className="absolute pointer-events-none">
      {birds.map(bird => (
        <div
          key={bird.id}
          className="absolute"
          style={{ left: position.x + bird.offsetX, top: position.y + bird.offsetY }}
        >
          <Bird size={bird.size} flapDuration={bird.flapDuration} flapDelay={bird.flapDelay} />
        </div>
      ))}
    </div>
  );
}

function BirdFlocks() {
  const flocks = useMemo(() => [
    { id: 1, startX: -150, startY: 100, birdCount: 7, speed: 1.4, delay: 500, formation: 'v' as const },
    { id: 2, startX: -300, startY: 160, birdCount: 5, speed: 1.1, delay: 8000, formation: 'v' as const },
    { id: 3, startX: -200, startY: 70, birdCount: 4, speed: 1.7, delay: 15000, formation: 'line' as const },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none dark:opacity-0 transition-opacity duration-500">
      {flocks.map(flock => <BirdFlock key={flock.id} {...flock} />)}
    </div>
  );
}

// ============= IMPROVED CLOUDS =============
function Cloud({ x, y, scale, speed, variant }: { x: number; y: number; scale: number; speed: number; variant: number }) {
  const cloudPaths = [
    // Fluffy cumulus
    "M20,45 Q10,45 10,38 Q5,35 10,30 Q8,25 15,23 Q15,15 28,15 Q35,10 45,15 Q55,12 62,18 Q72,15 78,22 Q88,20 90,28 Q98,30 95,38 Q100,42 90,45 Z",
    // Stretched cloud
    "M15,40 Q5,38 8,32 Q5,28 12,25 Q10,18 25,18 Q35,12 50,16 Q65,10 75,18 Q88,15 92,25 Q100,28 95,35 Q100,40 88,42 Q70,45 50,43 Q30,45 15,40 Z",
    // Puffy cloud
    "M18,42 Q8,40 12,33 Q6,30 12,25 Q10,18 22,17 Q30,8 45,14 Q58,8 68,16 Q80,12 85,22 Q95,25 92,34 Q98,38 88,42 Q60,46 18,42 Z",
  ];

  return (
    <motion.svg
      className="absolute text-foreground/[0.06] dark:text-foreground/[0.025]"
      style={{ left: `${x}%`, top: `${y}%` }}
      width={120 * scale}
      height={50 * scale}
      viewBox="0 0 100 50"
      animate={{ x: [0, 60, 0] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <path d={cloudPaths[variant % 3]} fill="currentColor" />
    </motion.svg>
  );
}

function Clouds() {
  const clouds = useMemo(() => [
    { id: 1, x: 5, y: 6, scale: 1.4, speed: 50, variant: 0 },
    { id: 2, x: 28, y: 12, scale: 0.9, speed: 65, variant: 1 },
    { id: 3, x: 52, y: 4, scale: 1.1, speed: 45, variant: 2 },
    { id: 4, x: 78, y: 14, scale: 0.8, speed: 70, variant: 0 },
    { id: 5, x: 38, y: 20, scale: 1.0, speed: 55, variant: 1 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map(cloud => <Cloud key={cloud.id} {...cloud} />)}
    </div>
  );
}

// ============= ANIMATED WATERFALL =============
function Waterfall() {
  return (
    <div className="absolute dark:opacity-70 transition-opacity duration-700" style={{ left: '8%', top: '25%' }}>
      <svg width="80" height="200" viewBox="0 0 80 200" className="overflow-visible">
        {/* Cliff/rock on sides */}
        <path
          d="M0,0 L15,0 L18,20 L12,50 L15,80 L10,120 L14,160 L8,200 L0,200 Z"
          className="text-highlight-1/30 dark:text-highlight-1/20"
          fill="currentColor"
        />
        <path
          d="M80,0 L65,0 L62,25 L68,55 L64,90 L70,130 L66,170 L72,200 L80,200 Z"
          className="text-highlight-1/30 dark:text-highlight-1/20"
          fill="currentColor"
        />
        
        {/* Water streams */}
        {[0, 1, 2, 3, 4].map(i => (
          <motion.path
            key={i}
            d={`M${25 + i * 8},0 Q${28 + i * 7},50 ${24 + i * 8},100 Q${27 + i * 7},150 ${25 + i * 8},200`}
            fill="none"
            className="text-highlight-3/40 dark:text-highlight-3/25"
            stroke="currentColor"
            strokeWidth={3 - i * 0.3}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1],
              opacity: [0, 0.8, 0],
              y: [0, 10, 20],
            }}
            transition={{
              duration: 1.5 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeIn",
            }}
          />
        ))}
        
        {/* Mist/spray at bottom */}
        <motion.ellipse
          cx="40"
          cy="195"
          rx="35"
          ry="12"
          className="text-highlight-3/20 dark:text-highlight-3/10"
          fill="currentColor"
          animate={{ 
            rx: [30, 40, 30],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Water droplets */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={`drop-${i}`}
            cx={20 + Math.random() * 40}
            cy={180}
            r={1.5}
            className="text-highlight-3/50 dark:text-highlight-3/30"
            fill="currentColor"
            animate={{
              y: [-20, 20],
              x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
              opacity: [0.6, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// ============= MOON =============
function Moon() {
  return (
    <motion.div
      className="absolute opacity-0 dark:opacity-100 transition-opacity duration-700"
      style={{ right: "12%", top: "8%" }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative">
        <div className="absolute -inset-8 rounded-full bg-foreground/8 blur-2xl" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-foreground/95 via-foreground/75 to-foreground/55 shadow-[0_0_50px_15px_rgba(255,255,255,0.15)] relative overflow-hidden">
          <div className="absolute w-4 h-4 rounded-full bg-foreground/30 top-2 left-4" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-foreground/25 top-6 left-9" />
          <div className="absolute w-5 h-5 rounded-full bg-foreground/20 top-8 left-2" />
        </div>
      </div>
    </motion.div>
  );
}

// ============= MOUNTAIN LAYERS =============
function MountainLayer({ path, colorClass, parallaxOffset, scrollYProgress }: {
  path: string; colorClass: string; parallaxOffset: number; scrollYProgress: any;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxOffset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      style={{ y: smoothY }}
    >
      <path d={path} className={colorClass} fill="currentColor" />
    </motion.svg>
  );
}

// ============= FOREST WITH WIND SWAY =============
function ForestLayer({ scrollYProgress }: { scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const trees = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => {
      const x = (i / 35) * 1440 + (Math.sin(i * 1.2) * 20);
      const height = 50 + Math.sin(i * 0.9) * 25 + Math.random() * 20;
      const width = 20 + Math.random() * 12;
      return { x, height, width, id: i, swayDelay: Math.random() * 2, swayAmount: 2 + Math.random() * 3 };
    });
  }, []);

  return (
    <motion.svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      style={{ y: smoothY }}
    >
      {/* Ground base */}
      <rect x="0" y="145" width="1440" height="15" className="text-secondary dark:text-muted transition-colors duration-700" fill="currentColor" />
      
      {/* Trees with wind sway */}
      {trees.map(tree => (
        <motion.g
          key={tree.id}
          style={{ transformOrigin: `${tree.x + tree.width / 2}px 160px` }}
          animate={{ 
            rotate: [-tree.swayAmount, tree.swayAmount, -tree.swayAmount],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: tree.swayDelay,
            ease: "easeInOut",
          }}
        >
          {/* Pine tree silhouette */}
          <path
            d={`
              M${tree.x + tree.width * 0.45},160 
              L${tree.x + tree.width * 0.55},160
              L${tree.x + tree.width * 0.55},${160 - tree.height * 0.2}
              L${tree.x + tree.width * 0.75},${160 - tree.height * 0.2}
              L${tree.x + tree.width * 0.5},${160 - tree.height * 0.45}
              L${tree.x + tree.width * 0.72},${160 - tree.height * 0.45}
              L${tree.x + tree.width * 0.5},${160 - tree.height * 0.7}
              L${tree.x + tree.width * 0.68},${160 - tree.height * 0.7}
              L${tree.x + tree.width * 0.5},${160 - tree.height}
              L${tree.x + tree.width * 0.32},${160 - tree.height * 0.7}
              L${tree.x + tree.width * 0.5},${160 - tree.height * 0.7}
              L${tree.x + tree.width * 0.28},${160 - tree.height * 0.45}
              L${tree.x + tree.width * 0.5},${160 - tree.height * 0.45}
              L${tree.x + tree.width * 0.25},${160 - tree.height * 0.2}
              L${tree.x + tree.width * 0.45},${160 - tree.height * 0.2}
              Z
            `}
            className="text-secondary dark:text-muted transition-colors duration-700"
            fill="currentColor"
          />
        </motion.g>
      ))}
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

  const mountainPaths = {
    far: "M0,400 L0,240 Q100,200 200,230 Q350,170 480,210 Q620,140 760,190 Q900,130 1040,170 Q1180,120 1300,160 Q1380,140 1440,170 L1440,400 Z",
    mid: "M0,400 L0,280 Q120,230 260,270 Q400,200 540,250 Q700,180 840,230 Q980,170 1120,210 Q1260,180 1360,210 Q1420,195 1440,230 L1440,400 Z",
    near: "M0,400 L0,310 Q150,265 300,300 Q480,240 650,280 Q830,220 1000,265 Q1180,230 1320,270 Q1400,255 1440,285 L1440,400 Z",
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-highlight-3/12 via-highlight-2/6 via-60% to-highlight-1/4 dark:from-[hsl(220,35%,6%)] dark:via-[hsl(220,30%,9%)] dark:to-[hsl(220,25%,13%)] transition-colors duration-700" />
      
      {/* Stars (night) */}
      <Stars count={100} />
      
      {/* Shooting stars (night) */}
      <ShootingStars />
      
      {/* Clouds */}
      <Clouds />
      
      {/* Waterfall (replaces sun) */}
      <Waterfall />
      
      {/* Moon (night) */}
      <Moon />
      
      {/* Far mountains */}
      <MountainLayer
        path={mountainPaths.far}
        colorClass="text-highlight-2/12 dark:text-highlight-2/6 transition-colors duration-700"
        parallaxOffset={20}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Mid mountains */}
      <MountainLayer
        path={mountainPaths.mid}
        colorClass="text-highlight-1/18 dark:text-highlight-1/10 transition-colors duration-700"
        parallaxOffset={50}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Near hills */}
      <MountainLayer
        path={mountainPaths.near}
        colorClass="text-highlight-3/22 dark:text-highlight-3/12 transition-colors duration-700"
        parallaxOffset={80}
        scrollYProgress={scrollYProgress}
      />
      
      {/* Forest with wind sway */}
      <ForestLayer scrollYProgress={scrollYProgress} />
      
      {/* Flying birds (day) */}
      <BirdFlocks />
    </div>
  );
}
