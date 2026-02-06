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

  // Calculate tail angle: meteor moves (-250, 180), so tail points opposite (+250, -180)
  // Angle = atan2(-180, 250) ≈ -36 degrees (up and to the right)
  const tailAngle = -36;

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
        {/* Trail - extends behind the head (up-right direction) */}
        <div 
          className="absolute"
          style={{
            left: "4px",
            top: "4px",
            width: "120px",
            height: "3px",
            transformOrigin: "left center",
            transform: `rotate(${tailAngle}deg)`,
            background: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(200,220,255,0.6) 40%, transparent 100%)",
            borderRadius: "2px",
          }}
        />
        {/* Secondary glow trail */}
        <div 
          className="absolute"
          style={{
            left: "4px",
            top: "4px",
            width: "80px",
            height: "6px",
            transformOrigin: "left center",
            transform: `rotate(${tailAngle}deg)`,
            background: "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(180,200,255,0.4) 50%, transparent 100%)",
            filter: "blur(2px)",
            borderRadius: "3px",
          }}
        />
        
        {/* Glowing head */}
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_4px_rgba(255,255,255,0.9),0_0_20px_8px_rgba(200,220,255,0.5)]" />
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
    return Array.from({ length: count }, (_, i) => {
      // Implement LOD: Larger stars are more important
      const sizePriority = Math.random();
      const size = sizePriority > 0.7 ? 0.8 + Math.random() * 1.2 : // Large stars (30%)
                  sizePriority > 0.3 ? 0.5 + Math.random() * 0.5 : // Medium stars (40%)
                  0.2 + Math.random() * 0.3; // Small stars (30%)
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 45,
        size,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
        brightness: 0.3 + sizePriority * 0.7, // Larger stars are brighter
      };
    });
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
