import { useMemo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// ============= SINGLE BIRD =============
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
      {/* Body */}
      <circle cx="25" cy="9" r="2" fill="currentColor" />
    </motion.svg>
  );
}

// ============= BIRD FLOCK =============
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

// ============= BIRD FLOCKS =============
export function BirdFlocks() {
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
