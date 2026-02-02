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

// ============= FOREST LAYER =============
interface ForestLayerProps {
  scrollYProgress: MotionValue<number>;
}

export function ForestLayer({ scrollYProgress }: ForestLayerProps) {
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const trees = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const baseX = (i / 40) * 1440;
      const x = baseX + (Math.sin(i * 1.7) * 15) + (Math.random() - 0.5) * 10;
      const height = 55 + Math.sin(i * 0.8) * 20 + Math.random() * 25;
      const width = 24 + Math.random() * 14;
      return { 
        x, 
        height, 
        width, 
        id: i, 
        swayDelay: Math.random() * 2, 
        swayAmount: 1.5 + Math.random() * 2,
        zIndex: Math.random() > 0.5 ? 1 : 0,
      };
    }).sort((a, b) => a.zIndex - b.zIndex); // Layer trees for depth
  }, []);

  return (
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
  );
}
