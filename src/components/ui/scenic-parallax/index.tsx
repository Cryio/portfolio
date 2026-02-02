import { useRef } from "react";
import { useScroll } from "framer-motion";
import { Stars, ShootingStars } from "./Stars";
import { BirdFlocks } from "./Birds";
import { Clouds } from "./Clouds";
import { Moon, MoonlightOverlay } from "./Moon";
import { MountainLayer, mountainPaths } from "./Mountains";
import { ForestLayer } from "./Forest";

// ============= MAIN COMPONENT =============
export function ScenicParallax({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Sky gradient - warmer and more colorful in light mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200,60%,85%)] via-[hsl(210,50%,88%)] via-40% to-[hsl(35,45%,90%)] dark:from-[hsl(220,35%,6%)] dark:via-[hsl(220,30%,9%)] dark:to-[hsl(220,25%,13%)] transition-colors duration-700" />
      
      {/* Stars (night) */}
      <Stars count={100} />
      
      {/* Shooting stars (night) */}
      <ShootingStars />
      
      {/* Clouds */}
      <Clouds />
      
      {/* Moon (night) */}
      <Moon />
      
      {/* Moonlight effect overlay */}
      <MoonlightOverlay />
      
      {/* Far mountains - distant purple/blue tones */}
      <MountainLayer
        path={mountainPaths.far}
        colorClass="text-[hsl(250,25%,70%)]/25 dark:text-[hsl(250,30%,40%)]/15 transition-colors duration-700"
        parallaxOffset={20}
        scrollYProgress={scrollYProgress}
        showBirds
        baseY={170}
      />
      
      {/* Mid mountains - muted blue-purple */}
      <MountainLayer
        path={mountainPaths.mid}
        colorClass="text-[hsl(230,20%,55%)]/35 dark:text-[hsl(230,25%,30%)]/20 transition-colors duration-700"
        parallaxOffset={50}
        scrollYProgress={scrollYProgress}
        showTexture
        baseY={220}
      />
      
      {/* Near hills - deeper tones */}
      <MountainLayer
        path={mountainPaths.near}
        colorClass="text-[hsl(210,18%,45%)]/45 dark:text-[hsl(220,20%,25%)]/25 transition-colors duration-700"
        parallaxOffset={80}
        scrollYProgress={scrollYProgress}
        showTexture
        baseY={270}
      />
      
      {/* Forest with wind sway */}
      <ForestLayer scrollYProgress={scrollYProgress} />
      
      {/* Flying birds (day) */}
      <BirdFlocks />
    </div>
  );
}
