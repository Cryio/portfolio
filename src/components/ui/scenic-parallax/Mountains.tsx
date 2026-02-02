import { motion, useTransform, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";

// ============= MOUNTAIN LAYER =============
interface MountainLayerProps {
  path: string;
  colorClass: string;
  parallaxOffset: number;
  scrollYProgress: MotionValue<number>;
}

export function MountainLayer({ path, colorClass, parallaxOffset, scrollYProgress }: MountainLayerProps) {
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

// ============= MOUNTAIN PATHS =============
export const mountainPaths = {
  far: "M0,400 L0,240 Q100,200 200,230 Q350,170 480,210 Q620,140 760,190 Q900,130 1040,170 Q1180,120 1300,160 Q1380,140 1440,170 L1440,400 Z",
  mid: "M0,400 L0,280 Q120,230 260,270 Q400,200 540,250 Q700,180 840,230 Q980,170 1120,210 Q1260,180 1360,210 Q1420,195 1440,230 L1440,400 Z",
  near: "M0,400 L0,310 Q150,265 300,300 Q480,240 650,280 Q830,220 1000,265 Q1180,230 1320,270 Q1400,255 1440,285 L1440,400 Z",
};
