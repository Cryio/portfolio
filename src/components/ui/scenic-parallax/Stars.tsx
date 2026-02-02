import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";

// ============= SHOOTING STAR =============
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

  // Angle for down-left direction (like natural meteor shower)
  const angle = 35;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        left: `${startX}%`, 
        top: `${startY}%`,
        transform: `rotate(${angle}deg)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration, ease: "linear" }}
    >
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{ x: -300, y: 200 }}
        transition={{ duration, ease: "linear" }}
        className="relative"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-foreground shadow-[0_0_6px_3px_rgba(255,255,255,0.8)]" />
        <div 
          className="absolute top-1/2 left-full w-24 h-[1.5px] -translate-y-1/2"
          style={{
            background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.3), rgba(255,255,255,0.9))",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============= SHOOTING STARS =============
export function ShootingStars() {
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
export function Stars({ count = 100 }: { count?: number }) {
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
