import { useMemo } from "react";
import { motion } from "framer-motion";

// ============= SINGLE CLOUD =============
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

// ============= CLOUDS =============
export function Clouds() {
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
