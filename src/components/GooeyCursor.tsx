"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A lightweight, spring-eased cursor: a snappy dot plus a softer ring that
// lags slightly behind for a smooth trailing feel. Uses mix-blend-difference
// so it stays visible over any background in both themes.
export function GooeyCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Dot tracks tightly; ring follows with a softer spring (the lag = the trail).
  const dotX = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 170, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 170, damping: 22, mass: 0.6 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const style = document.createElement("style");
    style.textContent = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown, { passive: true });
    window.addEventListener("mouseup", handleUp, { passive: true });

    return () => {
      if (style.parentNode) document.head.removeChild(style);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [x, y]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "difference" }}
      aria-hidden
    >
      {/* Trailing ring */}
      <motion.div
        className="absolute rounded-full border-2 border-white"
        style={{ x: ringX, y: ringY, width: 36, height: 36, marginLeft: -18, marginTop: -18 }}
        animate={{ scale: isClicking ? 1.35 : 1, opacity: isClicking ? 0.8 : 0.6 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      {/* Center dot */}
      <motion.div
        className="absolute rounded-full bg-white"
        style={{ x: dotX, y: dotY, width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
        animate={{ scale: isClicking ? 0.6 : 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </div>
  );
}
