"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Background() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blurAmount = Math.min(1 + scrollY / 200, 100);
  const opacityAmount = Math.max(0.8 - scrollY / 10000, 0.3);

  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/assets/bg.png"
        alt="Background"
        fill
        className="object-cover transition-opacity duration-300"
        style={{ opacity: opacityAmount }}
        priority
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/10 transition-all duration-300"
        style={{
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
        }}
      />
    </div>
  );
} 