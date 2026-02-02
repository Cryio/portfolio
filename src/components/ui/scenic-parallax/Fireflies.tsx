import { useMemo } from "react";
import { motion } from "framer-motion";

// ============= SINGLE FIREFLY =============
function Firefly({ 
  x, 
  y, 
  size, 
  delay, 
  duration 
}: { 
  x: number; 
  y: number; 
  size: number; 
  delay: number; 
  duration: number;
}) {
  // Random floating path
  const floatX = useMemo(() => Math.random() * 40 - 20, []);
  const floatY = useMemo(() => Math.random() * 30 - 15, []);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        x: [0, floatX, -floatX * 0.5, floatX * 0.7, 0],
        y: [0, floatY, -floatY * 0.8, floatY * 0.5, 0],
      }}
      transition={{
        duration: duration * 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: "hsl(60, 100%, 75%)",
          boxShadow: `0 0 ${size * 3}px ${size}px hsla(55, 100%, 70%, 0.6), 0 0 ${size * 6}px ${size * 2}px hsla(50, 100%, 60%, 0.3)`,
        }}
        animate={{
          opacity: [0, 0.9, 0.4, 1, 0.2, 0.8, 0],
          scale: [0.5, 1, 0.7, 1.1, 0.6, 1, 0.5],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// ============= FIREFLIES GROUP =============
export function Fireflies({ count = 25 }: { count?: number }) {
  const fireflies = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      // Concentrate fireflies in the forest area (bottom portion of screen)
      x: 5 + Math.random() * 90,
      y: 55 + Math.random() * 40, // Lower portion where forest is
      size: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-700">
      {fireflies.map((firefly) => (
        <Firefly key={firefly.id} {...firefly} />
      ))}
    </div>
  );
}
