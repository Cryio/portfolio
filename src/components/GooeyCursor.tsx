"use client";

import { useEffect, useState, useRef } from "react";

const TAIL_LENGTH = 40;
const CURSOR_SIZE = 42;

export function GooeyCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorHistory = useRef<Array<{ x: number; y: number }>>(
    Array.from({ length: TAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  );
  const cursorCirclesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    // Hide default cursor
    const style = document.createElement("style");
    style.textContent = `
      * {
        cursor: none !important;
      }
      a, button, [role="button"], input, textarea, select {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // Initialize cursor circles - use setTimeout to ensure DOM is ready
    const initCircles = () => {
      if (!cursorRef.current) {
        setTimeout(initCircles, 10);
        return;
      }

      if (cursorCirclesRef.current.length === 0) {
        for (let i = 0; i < TAIL_LENGTH; i++) {
          const div = document.createElement("div");
          div.className = "cursor-circle";
          div.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: ${CURSOR_SIZE}px;
            height: ${CURSOR_SIZE}px;
            border-radius: ${CURSOR_SIZE}px;
            background: white;
            transform-origin: center center;
            will-change: transform;
            pointer-events: none;
          `;
          cursorRef.current.appendChild(div);
          cursorCirclesRef.current.push(div);
        }
      }
    };

    // Initialize after a short delay to ensure ref is ready
    setTimeout(initCircles, 50);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = () => {
      // Add random displacement on click for effect
      for (let i = 0; i < TAIL_LENGTH; i++) {
        cursorHistory.current[i] = {
          x: cursorHistory.current[i].x + (Math.random() * 100 - 50),
          y: cursorHistory.current[i].y + (Math.random() * 100 - 50),
        };
      }
    };

    const updateCursor = () => {
      // Only update if circles are initialized
      if (cursorCirclesRef.current.length === 0) {
        animationFrameRef.current = requestAnimationFrame(updateCursor);
        return;
      }

      // Shift history and add new mouse position
      cursorHistory.current.shift();
      cursorHistory.current.push({ x: mousePosition.current.x, y: mousePosition.current.y });

      // Update each circle position
      for (let i = 0; i < TAIL_LENGTH; i++) {
        const current = cursorHistory.current[i];
        const next = cursorHistory.current[i + 1] || cursorHistory.current[TAIL_LENGTH - 1];

        const xDiff = next.x - current.x;
        const yDiff = next.y - current.y;

        cursorHistory.current[i] = {
          x: current.x + xDiff * 0.35,
          y: current.y + yDiff * 0.35,
        };

        // Scale from 0.2 to 1.0 to ensure visibility (avoid scale(0))
        const scale = Math.max(0.2, 0.2 + (i / TAIL_LENGTH) * 0.8);
        const circle = cursorCirclesRef.current[i];
        if (circle) {
          circle.style.transform = `translate(${cursorHistory.current[i].x}px, ${cursorHistory.current[i].y}px) scale(${scale})`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    animationFrameRef.current = requestAnimationFrame(updateCursor);

    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Clean up circles
      if (cursorRef.current) {
        cursorRef.current.innerHTML = "";
      }
      cursorCirclesRef.current = [];
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <svg className="absolute w-0 h-0" style={{ position: "fixed" }}>
        <defs>
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div
        ref={cursorRef}
        id="cursor"
        className="fixed pointer-events-none z-[9999]"
        style={{
          top: `calc(${CURSOR_SIZE}px * -0.5)`,
          left: `calc(${CURSOR_SIZE}px * -0.5)`,
          mixBlendMode: "difference",
          filter: "url(#goo)",
        }}
      />
    </>
  );
}
