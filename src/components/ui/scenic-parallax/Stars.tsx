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

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        left: `${startX}%`, 
        top: `${startY}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration, ease: "linear" }}
    >
      {/* Shooting star moving down-left */}
      <motion.div
        className="relative"
        initial={{ x: 0, y: 0 }}
        animate={{ x: -250, y: 180 }}
        transition={{ duration, ease: "linear" }}
      >
        {/* Glowing head */}
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_4px_rgba(255,255,255,0.9),0_0_20px_8px_rgba(200,220,255,0.5)]" />
        
        {/* Trail - positioned behind the head, pointing back up-right */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-y-1/2 origin-left"
          style={{
            width: "100px",
            height: "2px",
            transform: "rotate(-144deg) translateY(-50%)",
            background: "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(200,220,255,0.5) 30%, transparent 100%)",
          }}
        />
        {/* Secondary trail for depth */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-y-1/2 origin-left"
          style={{
            width: "60px",
            height: "4px",
            transform: "rotate(-144deg) translateY(-50%)",
            background: "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(180,200,255,0.3) 40%, transparent 100%)",
            filter: "blur(1px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============= SHOOTING STARS =============
export function ShootingStars() {
  const stars = useMemo(() => [
    { id: 1, delay: 2, duration: 1.0, startX: 80, startY: 5 },
    { id: 2, delay: 8, duration: 0.8, startX: 60, startY: 8 },
    { id: 3, delay: 15, duration: 1.2, startX: 90, startY: 3 },
    { id: 4, delay: 24, duration: 0.9, startX: 70, startY: 10 },
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
