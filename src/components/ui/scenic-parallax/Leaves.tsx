import { useMemo } from "react";
import { motion } from "framer-motion";

// ============= SINGLE LEAF =============
function Leaf({
  startX,
  startY,
  size,
  delay,
  duration,
  rotation,
  color,
}: {
  startX: number;
  startY: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  color: string;
}) {
  const swayAmount = useMemo(() => 30 + Math.random() * 50, []);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
      }}
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 0.8, 0.9, 0.7, 0],
        y: [0, 200, 400, 600, 800],
        x: [0, swayAmount, -swayAmount * 0.5, swayAmount * 0.8, -swayAmount * 0.3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={{
          rotate: [rotation, rotation + 360, rotation + 720],
        }}
        transition={{
          duration: duration * 0.8,
          repeat: Infinity,
          delay,
          ease: "linear",
        }}
      >
        {/* Leaf shape */}
        <svg
          width={size}
          height={size * 1.5}
          viewBox="0 0 20 30"
          fill="none"
        >
          <path
            d="M10 0C10 0 0 10 0 18C0 24 4 28 10 30C16 28 20 24 20 18C20 10 10 0 10 0Z"
            fill={color}
          />
          <path
            d="M10 5V25M10 10L6 14M10 15L14 19"
            stroke="rgba(80,30,0,0.2)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ============= FLOATING LEAVES =============
export function FloatingLeaves({ count = 15 }: { count?: number }) {
  const leaves = useMemo(() => {
    // Warm autumn palette to match the orange/yellow sunset theme
    const colors = [
      "hsl(32, 85%, 52%)",  // orange
      "hsl(42, 90%, 55%)",  // amber
      "hsl(24, 82%, 48%)",  // deep orange
      "hsl(48, 88%, 58%)",  // golden yellow
      "hsl(15, 78%, 50%)",  // burnt orange
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: -10 - Math.random() * 20,
      size: 8 + Math.random() * 10,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 8,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none dark:opacity-0 opacity-70 transition-opacity duration-700">
      {leaves.map((leaf) => (
        <Leaf key={leaf.id} {...leaf} />
      ))}
    </div>
  );
}
