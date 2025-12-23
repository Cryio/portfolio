import { useState, useEffect, useRef, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Theme transition overlay component
function ThemeTransitionOverlay({ isTransitioning, isDark }: { isTransitioning: boolean; isDark: boolean }) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{
            background: isDark 
              ? 'linear-gradient(to bottom, hsl(220 25% 6% / 0.3), hsl(220 25% 6% / 0.1))'
              : 'linear-gradient(to bottom, hsl(60 9% 98% / 0.3), hsl(60 9% 98% / 0.1))'
          }}
        />
      )}
    </AnimatePresence>
  );
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored ? stored === "dark" : prefersDark;
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (isAnimating) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y)
    );

    const newIsDark = !isDark;
    
    setIsAnimating(true);
    setIsTransitioning(true);

    // Create morphing overlay with smooth fade
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      pointer-events: none;
      overflow: hidden;
    `;
    
    // Create expanding circle with gradient
    const circle = document.createElement('div');
    const bgColor = newIsDark ? 'hsl(220 25% 6%)' : 'hsl(60 9% 98%)';
    circle.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(1);
      background: radial-gradient(circle, ${bgColor} 0%, ${bgColor} 80%, transparent 100%);
      opacity: 0.95;
    `;
    
    overlay.appendChild(circle);

    // Add sparkle particles
    const sparkleCount = 16;
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      const angle = (i / sparkleCount) * Math.PI * 2;
      const distance = 30 + Math.random() * 50;
      const size = 2 + Math.random() * 3;
      
      sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${newIsDark ? 'hsl(45 100% 70%)' : 'hsl(220 80% 60%)'};
        transform: translate(-50%, -50%);
        opacity: 0;
        box-shadow: 0 0 ${4 + Math.random() * 4}px ${newIsDark ? 'hsl(45 100% 70%)' : 'hsl(220 80% 60%)'};
      `;
      
      overlay.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        sparkle.style.opacity = '1';
        sparkle.style.transform = `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px))`;
        
        setTimeout(() => {
          sparkle.style.opacity = '0';
          sparkle.style.transform = `translate(calc(-50% + ${Math.cos(angle) * distance * 2.5}px), calc(-50% + ${Math.sin(angle) * distance * 2.5}px)) scale(0)`;
        }, 350);
      }, 50 + Math.random() * 150);
    }
    
    document.body.appendChild(overlay);

    // Animate the circle expansion with smooth easing
    requestAnimationFrame(() => {
      circle.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease-out';
      circle.style.transform = `translate(-50%, -50%) scale(${maxDistance * 2.5})`;
    });

    // Toggle theme at optimal timing
    setTimeout(() => {
      setIsDark(newIsDark);
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
      
      // Add smooth transition to body
      document.documentElement.style.transition = 'background-color 0.3s ease-out, color 0.3s ease-out';
      
      if (newIsDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      // Remove transition after it's done
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 300);
    }, 300);

    // Clean up after animation
    setTimeout(() => {
      circle.style.opacity = '0';
    }, 500);

    setTimeout(() => {
      overlay.remove();
      setIsAnimating(false);
      setIsTransitioning(false);
    }, 800);
  }, [isDark, isAnimating]);

  return (
    <>
      <ThemeTransitionOverlay isTransitioning={isTransitioning} isDark={isDark} />
      <motion.button
        ref={buttonRef}
        onClick={toggleTheme}
        disabled={isAnimating}
        className="relative p-2 border-4 border-foreground bg-background hover:shadow-sm hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-70 overflow-hidden group"
        aria-label="Toggle theme"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Rotating background glow */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: isAnimating ? 0.3 : 0,
            rotate: isAnimating ? 360 : 0
          }}
          transition={{ duration: 0.8, ease: "linear" }}
          style={{
            background: `conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.4), transparent)`,
          }}
        />
        
        <div className="relative w-5 h-5">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Sun
                  className="w-5 h-5"
                  style={{ filter: 'drop-shadow(0 0 4px hsl(45 100% 60%))' }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Moon
                  className="w-5 h-5"
                  style={{ filter: 'drop-shadow(0 0 4px hsl(220 80% 60%))' }}
                />
                {/* Floating stars */}
                <motion.span 
                  className="absolute -top-1 -right-1 w-1 h-1 rounded-full bg-foreground/60"
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.span 
                  className="absolute top-0 -left-1 w-0.5 h-0.5 rounded-full bg-foreground/40"
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, hsl(var(--primary) / 0.15), transparent 70%)`
          }}
        />
      </motion.button>
    </>
  );
}
