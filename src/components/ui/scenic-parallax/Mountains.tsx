import { useMemo } from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";

// ============= SNOW CAP =============
function SnowCap({ peakX, peakY, width }: { peakX: number; peakY: number; width: number }) {
  return (
    <path
      d={`
        M${peakX},${peakY}
        Q${peakX - width * 0.15},${peakY + 15} ${peakX - width * 0.3},${peakY + 25}
        Q${peakX - width * 0.1},${peakY + 20} ${peakX},${peakY + 18}
        Q${peakX + width * 0.1},${peakY + 20} ${peakX + width * 0.3},${peakY + 25}
        Q${peakX + width * 0.15},${peakY + 15} ${peakX},${peakY}
        Z
      `}
      className="text-foreground/20 dark:text-foreground/15"
      fill="currentColor"
    />
  );
}

// ============= MOUNTAIN TEXTURE =============
function MountainTexture({ baseY, opacity }: { baseY: number; opacity: number }) {
  const ridges = useMemo(() => [
    { x1: 180, y1: baseY + 30, x2: 250, y2: baseY + 80 },
    { x1: 450, y1: baseY + 20, x2: 520, y2: baseY + 90 },
    { x1: 720, y1: baseY + 25, x2: 800, y2: baseY + 85 },
    { x1: 1000, y1: baseY + 15, x2: 1080, y2: baseY + 75 },
    { x1: 1280, y1: baseY + 35, x2: 1350, y2: baseY + 95 },
  ], [baseY]);

  return (
    <g className="text-foreground" style={{ opacity: opacity * 0.08 }}>
      {ridges.map((ridge, i) => (
        <path
          key={i}
          d={`M${ridge.x1},${ridge.y1} Q${(ridge.x1 + ridge.x2) / 2 + 10},${(ridge.y1 + ridge.y2) / 2} ${ridge.x2},${ridge.y2}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

// ============= ANIMATED MOUNTAIN BIRDS =============
function MountainBirds({ baseY }: { baseY: number }) {
  const birds = useMemo(() => [
    { id: 1, x: 300, y: baseY + 40, size: 6, delay: 0 },
    { id: 2, x: 320, y: baseY + 50, size: 5, delay: 0.2 },
    { id: 3, x: 800, y: baseY + 30, size: 7, delay: 1 },
    { id: 4, x: 1100, y: baseY + 55, size: 5, delay: 2 },
  ], [baseY]);

  return (
    <g className="text-foreground/30 dark:text-foreground/20 dark:opacity-0 transition-opacity duration-500">
      {birds.map(bird => (
        <motion.g
          key={bird.id}
          animate={{ x: [0, 100, 200] }}
          transition={{ duration: 30, repeat: Infinity, delay: bird.delay, ease: "linear" }}
        >
          <path
            d={`M${bird.x},${bird.y} Q${bird.x + bird.size / 2},${bird.y - bird.size / 2} ${bird.x + bird.size},${bird.y} Q${bird.x + bird.size * 1.5},${bird.y - bird.size / 2} ${bird.x + bird.size * 2},${bird.y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </motion.g>
      ))}
    </g>
  );
}

// ============= ENHANCED MOUNTAIN LAYER =============
interface MountainLayerProps {
  path: string;
  colorClass: string;
  parallaxOffset: number;
  scrollYProgress: MotionValue<number>;
  showSnowCaps?: boolean;
  showTexture?: boolean;
  showBirds?: boolean;
  baseY?: number;
}

export function MountainLayer({ 
  path, 
  colorClass, 
  parallaxOffset, 
  scrollYProgress,
  showSnowCaps = false,
  showTexture = false,
  showBirds = false,
  baseY = 200,
}: MountainLayerProps) {
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxOffset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // Peak positions for snow caps
  const peaks = useMemo(() => [
    { x: 480, y: 210, width: 80 },
    { x: 760, y: 190, width: 100 },
    { x: 1040, y: 170, width: 90 },
  ], []);

  return (
    <motion.svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      style={{ y: smoothY }}
    >
      {/* Main mountain shape */}
      <path d={path} className={colorClass} fill="currentColor" />
      
      {/* Snow caps on peaks */}
      {showSnowCaps && peaks.map((peak, i) => (
        <SnowCap key={i} peakX={peak.x} peakY={peak.y} width={peak.width} />
      ))}
      
      {/* Ridge texture lines */}
      {showTexture && <MountainTexture baseY={baseY} opacity={0.5} />}
      
      {/* Distant birds */}
      {showBirds && <MountainBirds baseY={baseY} />}
    </motion.svg>
  );
}

// ============= MOUNTAIN PATHS =============
export const mountainPaths = {
  far: "M0,400 L0,240 Q100,200 200,230 Q350,170 480,210 Q620,140 760,190 Q900,130 1040,170 Q1180,120 1300,160 Q1380,140 1440,170 L1440,400 Z",
  mid: "M0,400 L0,280 Q120,230 260,270 Q400,200 540,250 Q700,180 840,230 Q980,170 1120,210 Q1260,180 1360,210 Q1420,195 1440,230 L1440,400 Z",
  near: "M0,400 L0,310 Q150,265 300,300 Q480,240 650,280 Q830,220 1000,265 Q1180,230 1320,270 Q1400,255 1440,285 L1440,400 Z",
};
