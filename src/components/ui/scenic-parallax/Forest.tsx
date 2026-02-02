import { useMemo } from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";

// ============= DETAILED PINE TREE =============
function PineTree({ x, height, width, swayDelay, swayAmount, variant }: {
  x: number; height: number; width: number; swayDelay: number; swayAmount: number; variant: number;
}) {
  const trunkWidth = width * 0.1;
  const trunkHeight = height * 0.2;
  const branchLayers = 6 + (variant % 2);
  
  return (
    <motion.g
      style={{ transformOrigin: `${x + width / 2}px 160px` }}
      animate={{ rotate: [-swayAmount, swayAmount, -swayAmount] }}
      transition={{
        duration: 3.5 + Math.random() * 2,
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
        className="text-[hsl(30,30%,25%)] dark:text-[hsl(30,20%,15%)]"
        fill="currentColor"
      />
      
      {/* Branch layers */}
      {Array.from({ length: branchLayers }, (_, i) => {
        const layerProgress = i / (branchLayers - 1);
        const layerY = 160 - trunkHeight - (height - trunkHeight) * layerProgress;
        const layerWidth = width * (1 - layerProgress * 0.65) * (0.85 + (variant % 3) * 0.05);
        const layerHeight = (height - trunkHeight) / branchLayers * 1.5;
        const wobble = Math.sin(i * 1.3 + variant) * 2;
        
        return (
          <path
            key={i}
            d={`
              M${x + width / 2},${layerY - layerHeight * 0.25}
              C${x + width / 2 - layerWidth * 0.3},${layerY + layerHeight * 0.1}
               ${x + width / 2 - layerWidth * 0.5 + wobble},${layerY + layerHeight * 0.4}
               ${x + width / 2 - layerWidth * 0.45},${layerY + layerHeight * 0.55}
              Q${x + width / 2},${layerY + layerHeight * 0.35}
               ${x + width / 2 + layerWidth * 0.45},${layerY + layerHeight * 0.55}
              C${x + width / 2 + layerWidth * 0.5 - wobble},${layerY + layerHeight * 0.4}
               ${x + width / 2 + layerWidth * 0.3},${layerY + layerHeight * 0.1}
               ${x + width / 2},${layerY - layerHeight * 0.25}
              Z
            `}
            className="text-[hsl(150,35%,25%)] dark:text-[hsl(160,25%,12%)] transition-colors duration-700"
            fill="currentColor"
          />
        );
      })}
    </motion.g>
  );
}

// ============= DECIDUOUS TREE =============
function DeciduousTree({ x, height, width, swayDelay, swayAmount }: {
  x: number; height: number; width: number; swayDelay: number; swayAmount: number;
}) {
  const trunkWidth = width * 0.15;
  const trunkHeight = height * 0.35;
  const canopyRadius = width * 0.5;
  
  return (
    <motion.g
      style={{ transformOrigin: `${x + width / 2}px 160px` }}
      animate={{ rotate: [-swayAmount * 0.7, swayAmount * 0.7, -swayAmount * 0.7] }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay: swayDelay,
        ease: "easeInOut",
      }}
    >
      {/* Trunk */}
      <path
        d={`
          M${x + width / 2 - trunkWidth / 2},160
          L${x + width / 2 - trunkWidth / 3},${160 - trunkHeight}
          Q${x + width / 2},${160 - trunkHeight - 5}
           ${x + width / 2 + trunkWidth / 3},${160 - trunkHeight}
          L${x + width / 2 + trunkWidth / 2},160
          Z
        `}
        className="text-[hsl(30,30%,25%)] dark:text-[hsl(30,20%,15%)]"
        fill="currentColor"
      />
      
      {/* Foliage clusters */}
      {[
        { cx: 0, cy: 0, r: canopyRadius },
        { cx: -canopyRadius * 0.5, cy: canopyRadius * 0.3, r: canopyRadius * 0.7 },
        { cx: canopyRadius * 0.5, cy: canopyRadius * 0.25, r: canopyRadius * 0.75 },
        { cx: 0, cy: canopyRadius * 0.5, r: canopyRadius * 0.6 },
      ].map((cluster, i) => (
        <ellipse
          key={i}
          cx={x + width / 2 + cluster.cx}
          cy={160 - trunkHeight - canopyRadius * 0.3 + cluster.cy}
          rx={cluster.r}
          ry={cluster.r * 0.85}
          className="text-[hsl(130,30%,30%)] dark:text-[hsl(140,20%,15%)] transition-colors duration-700"
          fill="currentColor"
        />
      ))}
    </motion.g>
  );
}

// ============= BUSH =============
function Bush({ x, width, height }: { x: number; width: number; height: number }) {
  return (
    <g>
      {[0, 0.3, 0.6].map((offset, i) => (
        <ellipse
          key={i}
          cx={x + width * (0.3 + offset * 0.5)}
          cy={158 - height * 0.3}
          rx={width * (0.35 - i * 0.05)}
          ry={height * (0.5 - i * 0.1)}
          className="text-[hsl(140,30%,28%)] dark:text-[hsl(150,20%,14%)] transition-colors duration-700"
          fill="currentColor"
        />
      ))}
    </g>
  );
}

// ============= GROUND DETAIL =============
function GroundDetail() {
  const details = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (i / 30) * 1440 + Math.random() * 40,
      width: 8 + Math.random() * 15,
      height: 3 + Math.random() * 6,
    }))
  , []);

  return (
    <g>
      {details.map(d => (
        <ellipse
          key={d.id}
          cx={d.x}
          cy={152}
          rx={d.width}
          ry={d.height}
          className="text-[hsl(140,25%,22%)] dark:text-[hsl(150,18%,10%)] transition-colors duration-700"
          fill="currentColor"
        />
      ))}
    </g>
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
          style={{ left: patch.x, width: patch.width, height: '100%' }}
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
          <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none" className="text-background">
            <defs>
              <linearGradient id={`mistGrad-${patch.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="40%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <ellipse cx="200" cy="100" rx="200" ry="60" fill={`url(#mistGrad-${patch.id})`} />
          </svg>
        </motion.div>
      ))}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background/40 via-background/20 to-transparent dark:from-background/30 dark:via-background/15" />
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

  const { pines, deciduous, bushes } = useMemo(() => {
    // Generate pine trees - LARGER sizes
    const pines = Array.from({ length: 55 }, (_, i) => {
      const baseX = (i / 55) * 1500 - 30;
      return { 
        x: baseX + Math.sin(i * 1.7) * 10 + (Math.random() - 0.5) * 15,
        height: 70 + Math.sin(i * 0.8) * 25 + Math.random() * 40,
        width: 32 + Math.random() * 18,
        id: i, 
        swayDelay: Math.random() * 2.5, 
        swayAmount: 1 + Math.random() * 1.5,
        zIndex: Math.floor(Math.random() * 3),
        variant: i % 5,
      };
    });

    // Generate deciduous trees - LARGER sizes
    const deciduous = Array.from({ length: 12 }, (_, i) => {
      const baseX = 80 + (i / 12) * 1300;
      return {
        x: baseX + (Math.random() - 0.5) * 60,
        height: 75 + Math.random() * 35,
        width: 50 + Math.random() * 20,
        id: i,
        swayDelay: Math.random() * 3,
        swayAmount: 0.8 + Math.random() * 1,
        zIndex: 1,
      };
    });

    // Generate bushes
    const bushes = Array.from({ length: 20 }, (_, i) => ({
      x: (i / 20) * 1440 + Math.random() * 50,
      width: 15 + Math.random() * 20,
      height: 8 + Math.random() * 10,
      id: i,
    }));

    return { 
      pines: pines.sort((a, b) => a.zIndex - b.zIndex),
      deciduous,
      bushes,
    };
  }, []);

  return (
    <>
      <motion.svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        style={{ y: smoothY }}
      >
        {/* Ground with texture */}
        <rect x="0" y="145" width="1440" height="15" className="text-[hsl(140,20%,20%)] dark:text-[hsl(150,15%,8%)] transition-colors duration-700" fill="currentColor" />
        <GroundDetail />
        
        {/* Bushes in back */}
        {bushes.slice(0, 10).map(bush => (
          <Bush key={`bush-back-${bush.id}`} x={bush.x} width={bush.width} height={bush.height} />
        ))}
        
        {/* Back layer trees */}
        {pines.filter(t => t.zIndex === 0).map(tree => (
          <PineTree key={`pine-${tree.id}`} {...tree} />
        ))}
        
        {/* Mid layer - deciduous and pines */}
        {deciduous.map(tree => (
          <DeciduousTree key={`dec-${tree.id}`} {...tree} />
        ))}
        {pines.filter(t => t.zIndex === 1).map(tree => (
          <PineTree key={`pine-${tree.id}`} {...tree} />
        ))}
        
        {/* Front bushes */}
        {bushes.slice(10).map(bush => (
          <Bush key={`bush-front-${bush.id}`} x={bush.x} width={bush.width * 1.2} height={bush.height * 1.1} />
        ))}
        
        {/* Front layer trees */}
        {pines.filter(t => t.zIndex === 2).map(tree => (
          <PineTree key={`pine-${tree.id}`} {...tree} />
        ))}
      </motion.svg>
      
      <MistLayer />
    </>
  );
}
