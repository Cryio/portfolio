import { useMemo } from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";

// ============= REALISTIC PINE TREE =============
function PineTree({ x, height, width, swayDelay, swayAmount }: {
  x: number; height: number; width: number; swayDelay: number; swayAmount: number;
}) {
  // Create a more realistic pine tree with layered branches
  const trunkWidth = width * 0.12;
  const trunkHeight = height * 0.25;
  const branchLayers = 5;
  
  return (
    <motion.g
      style={{ transformOrigin: `${x + width / 2}px 160px` }}
      animate={{ rotate: [-swayAmount, swayAmount, -swayAmount] }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: swayDelay,
        ease: "easeInOut",
      }}
    >
      {/* Trunk */}
      <rect
        x={x + width / 2 - trunkWidth / 2}
        y={160 - trunkHeight}
        width={trunkWidth}
        height={trunkHeight}
        className="text-muted-foreground/40 dark:text-muted-foreground/25"
        fill="currentColor"
      />
      
      {/* Branch layers - creates realistic pine silhouette */}
      {Array.from({ length: branchLayers }, (_, i) => {
        const layerProgress = i / (branchLayers - 1);
        const layerY = 160 - trunkHeight - (height - trunkHeight) * layerProgress;
        const layerWidth = width * (1 - layerProgress * 0.7) * (0.9 + Math.random() * 0.2);
        const layerHeight = (height - trunkHeight) / branchLayers * 1.4;
        
        // Slightly irregular branch shape for realism
        const leftOffset = (Math.random() - 0.5) * 4;
        const rightOffset = (Math.random() - 0.5) * 4;
        
        return (
          <path
            key={i}
            d={`
              M${x + width / 2},${layerY - layerHeight * 0.3}
              Q${x + width / 2 - layerWidth * 0.2},${layerY}
              ${x + width / 2 - layerWidth / 2 + leftOffset},${layerY + layerHeight * 0.5}
              Q${x + width / 2 - layerWidth * 0.3},${layerY + layerHeight * 0.7}
              ${x + width / 2},${layerY + layerHeight * 0.4}
              Q${x + width / 2 + layerWidth * 0.3},${layerY + layerHeight * 0.7}
              ${x + width / 2 + layerWidth / 2 + rightOffset},${layerY + layerHeight * 0.5}
              Q${x + width / 2 + layerWidth * 0.2},${layerY}
              ${x + width / 2},${layerY - layerHeight * 0.3}
              Z
            `}
            className="text-secondary dark:text-muted transition-colors duration-700"
            fill="currentColor"
          />
        );
      })}
    </motion.g>
  );
}

// ============= MIST LAYER =============
function MistLayer() {
  const mistPatches = useMemo(() => [
    { id: 1, x: 0, width: 400, opacity: 0.4, speed: 80, delay: 0 },
    { id: 2, x: 300, width: 350, opacity: 0.3, speed: 90, delay: 5 },
    { id: 3, x: 600, width: 450, opacity: 0.35, speed: 70, delay: 10 },
    { id: 4, x: 900, width: 380, opacity: 0.25, speed: 85, delay: 3 },
    { id: 5, x: 1150, width: 400, opacity: 0.4, speed: 75, delay: 8 },
    { id: 6, x: 150, width: 300, opacity: 0.2, speed: 95, delay: 15 },
    { id: 7, x: 750, width: 320, opacity: 0.3, speed: 88, delay: 12 },
  ], []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden">
      {mistPatches.map(patch => (
        <motion.div
          key={patch.id}
          className="absolute bottom-0"
          style={{
            left: patch.x,
            width: patch.width,
            height: '100%',
          }}
          animate={{
            x: [-20, 40, -20],
            opacity: [patch.opacity * 0.7, patch.opacity, patch.opacity * 0.7],
          }}
          transition={{
            duration: patch.speed,
            repeat: Infinity,
            delay: patch.delay,
            ease: "easeInOut",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 120"
            preserveAspectRatio="none"
            className="text-background dark:text-background"
          >
            <defs>
              <linearGradient id={`mistGrad-${patch.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="40%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <ellipse
              cx="200"
              cy="100"
              rx="200"
              ry="60"
              fill={`url(#mistGrad-${patch.id})`}
            />
          </svg>
        </motion.div>
      ))}
      
      {/* Base mist gradient */}
      <div 
        className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background/40 via-background/20 to-transparent dark:from-background/30 dark:via-background/15"
      />
    </div>
  );
}

// ============= FOREST LAYER =============
interface ForestLayerProps {
  scrollYProgress: MotionValue<number>;
}

export function ForestLayer({ scrollYProgress }: ForestLayerProps) {
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const trees = useMemo(() => {
    return Array.from({ length: 65 }, (_, i) => {
      const baseX = (i / 65) * 1480 - 20;
      const x = baseX + (Math.sin(i * 1.7) * 12) + (Math.random() - 0.5) * 8;
      const height = 50 + Math.sin(i * 0.8) * 18 + Math.random() * 28;
      const width = 22 + Math.random() * 12;
      return { 
        x, 
        height, 
        width, 
        id: i, 
        swayDelay: Math.random() * 2, 
        swayAmount: 1.2 + Math.random() * 1.8,
        zIndex: Math.random() > 0.5 ? 1 : 0,
      };
    }).sort((a, b) => a.zIndex - b.zIndex);
  }, []);

  return (
    <>
      <motion.svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        style={{ y: smoothY }}
      >
        {/* Ground base */}
        <rect 
          x="0" 
          y="145" 
          width="1440" 
          height="15" 
          className="text-secondary dark:text-muted transition-colors duration-700" 
          fill="currentColor" 
        />
        
        {/* Trees */}
        {trees.map(tree => (
          <PineTree
            key={tree.id}
            x={tree.x}
            height={tree.height}
            width={tree.width}
            swayDelay={tree.swayDelay}
            swayAmount={tree.swayAmount}
          />
        ))}
      </motion.svg>
      
      {/* Mist overlay */}
      <MistLayer />
    </>
  );
}
