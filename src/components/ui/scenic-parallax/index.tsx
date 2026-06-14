import { useRef } from "react";
import { useScroll, useTransform, useSpring, useMotionValue, motion } from "framer-motion";
import { Stars, ShootingStars } from "./Stars";
import { Moon } from "./Moon";
import { Fireflies } from "./Fireflies";
import { FloatingLeaves } from "./Leaves";
import { FW_LAYERS } from "./Firewatch";

// ============= FIREWATCH PARALLAX =============
// The original codepen's exact layer assets, masked + recolored to this site's
// palette, drifting with the mouse and scroll over a themed sky + sun.
export function ScenicParallax({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Pointer position, normalized to ~[-1, 1] and spring-smoothed.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const smoothX = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const smoothY = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    py.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  // One x/y transform per layer (FW_LAYERS length is constant → stable hook order).
  const layerX = FW_LAYERS.map((l) => useTransform(smoothX, (v) => v * l.shift));
  const layerY = FW_LAYERS.map((l) => {
    const scroll = useTransform(scrollYProgress, [0, 1], [0, l.scroll]);
    const mouse = useTransform(smoothY, (v) => v * l.shift * 0.25);
    return useTransform([scroll, mouse], ([a, b]: number[]) => a + b);
  });

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`fw-scene absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Palette — warm orange/yellow sunset (light) / deep plum dusk (dark) via CSS vars */}
      <style>{`
        .fw-scene {
          --fw-sky: linear-gradient(180deg, #2c2350 0%, #5e3563 26%, #9c4759 48%, #cd6242 68%, #e98f48 85%, #f4b25c 100%);
          --fw-sun: radial-gradient(circle at center, #ffe7a8 0%, #ffd06a 28%, #ffae4d 48%, rgba(255,150,70,0.45) 66%, rgba(255,150,70,0) 78%);
          --fw-haze: linear-gradient(180deg, rgba(255,196,110,0) 0%, rgba(255,178,92,0.28) 60%, rgba(245,150,80,0.42) 100%);
          --fw-r0: #f3a85a;
          --fw-r1: #e8884a;
          --fw-r2: #d76a44;
          --fw-r3: #b14f49;
          --fw-r4: #823f56;
          --fw-r5: #4d2f49;
        }
        .dark .fw-scene {
          --fw-sky: linear-gradient(180deg, #08060f 0%, #14101f 34%, #221733 60%, #311d3a 82%, #3c2340 100%);
          --fw-sun: radial-gradient(circle at center, rgba(180,160,210,0.18) 0%, rgba(150,130,190,0.10) 45%, rgba(150,130,190,0) 70%);
          --fw-haze: linear-gradient(180deg, rgba(40,30,60,0) 0%, rgba(30,20,48,0.4) 60%, rgba(22,15,36,0.7) 100%);
          --fw-r0: #4a3a55;
          --fw-r1: #3f3350;
          --fw-r2: #342a48;
          --fw-r3: #28213c;
          --fw-r4: #1c1730;
          --fw-r5: #110c1f;
        }
      `}</style>

      {/* Sky */}
      <div className="absolute inset-0 transition-[background] duration-700" style={{ background: "var(--fw-sky)" }} />

      {/* Stars + shooting stars (night) */}
      <Stars count={48} />
      <ShootingStars />

      {/* Moon (night) */}
      <Moon />

      {/* Horizon haze sitting behind the ridges */}
      <div className="absolute inset-x-0 bottom-0 h-[52%] pointer-events-none transition-[background] duration-700" style={{ background: "var(--fw-haze)" }} />

      {/* Firewatch layer assets — masked silhouettes filled with the palette */}
      {FW_LAYERS.map((layer, i) => {
        const maskedLayer = (
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-[-6%] w-[112%] h-full transition-[background-color] duration-700"
            style={{
              x: layerX[i],
              y: layerY[i],
              backgroundColor: `var(${layer.colorVar})`,
              WebkitMaskImage: `url(${layer.src})`,
              maskImage: `url(${layer.src})`,
              WebkitMaskSize: "cover",
              maskSize: "cover",
              WebkitMaskPosition: "center bottom",
              maskPosition: "center bottom",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
        );

        // Blur must be applied on a wrapper so it acts on the masked result, not
        // the solid fill (filters are applied before masking on a single element).
        return layer.blur ? (
          <div key={i} className="absolute inset-0" style={{ filter: `blur(${layer.blur}px)` }}>
            {maskedLayer}
          </div>
        ) : (
          <div key={i}>{maskedLayer}</div>
        );
      })}

      {/* Falling leaves (day) */}
      <FloatingLeaves count={10} />

      {/* Fireflies drifting in the foreground (night) */}
      <Fireflies count={12} />
    </div>
  );
}
