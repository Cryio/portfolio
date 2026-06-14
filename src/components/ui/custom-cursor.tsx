import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const hoverCountRef = useRef(0);
  const elementsRef = useRef<Set<HTMLElement>>(new Set());

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  const handleElementEnter = useCallback((text?: string) => {
    hoverCountRef.current += 1;
    setIsHovering(true);
    if (text) setCursorText(text);
  }, []);

  const handleElementLeave = useCallback(() => {
    hoverCountRef.current -= 1;
    // Only reset when no elements are being hovered
    if (hoverCountRef.current <= 0) {
      hoverCountRef.current = 0;
      setIsHovering(false);
      setCursorText("");
    }
  }, []);

  const setupListeners = useCallback(() => {
    // Clear previous count and references
    hoverCountRef.current = 0;
    
    // Clean up existing listeners
    elementsRef.current.forEach((element) => {
      const el = element as any;
      if (el._cursorEnterHandler) {
        element.removeEventListener("mouseenter", el._cursorEnterHandler);
        element.removeEventListener("mouseleave", el._cursorLeaveHandler);
        delete el._cursorEnterHandler;
        delete el._cursorLeaveHandler;
      }
    });
    elementsRef.current.clear();
    
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], .cursor-pointer'
    );

    interactiveElements.forEach((el) => {
      const element = el as HTMLElement;
      const isLink = element.tagName === 'A' || element.closest('a');
      const isButton = element.tagName === 'BUTTON' || element.getAttribute('role') === 'button';
      
      const text = isLink ? "→" : isButton ? "•" : "";
      
      const enterHandler = () => handleElementEnter(text);
      const leaveHandler = () => handleElementLeave();
      
      element.addEventListener("mouseenter", enterHandler, { passive: true });
      element.addEventListener("mouseleave", leaveHandler, { passive: true });
      
      // Store handlers for cleanup
      (element as any)._cursorEnterHandler = enterHandler;
      (element as any)._cursorLeaveHandler = leaveHandler;
      elementsRef.current.add(element);
    });

    return interactiveElements;
  }, [handleElementEnter, handleElementLeave]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Initial setup
    const elements = setupListeners();

    // Debounce DOM mutation callbacks to avoid excessive re-querying
    let mutationTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(setupListeners, 200);
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false, // Don't observe attributes for better performance
      characterData: false // Don't observe text changes
    });

    return () => {
      clearTimeout(mutationTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();

      // Cleanup all listeners
      elementsRef.current.forEach((element) => {
        const el = element as any;
        if (el._cursorEnterHandler) {
          element.removeEventListener("mouseenter", el._cursorEnterHandler);
          element.removeEventListener("mouseleave", el._cursorLeaveHandler);
        }
      });
      elementsRef.current.clear();
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave, setupListeners]);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Inner dot - uses primary color for visibility in both themes */}
          <motion.div
            className="absolute rounded-full bg-primary dark:bg-primary"
            animate={{
              width: isHovering ? 40 : 8,
              height: isHovering ? 40 : 8,
              x: isHovering ? -20 : -4,
              y: isHovering ? -20 : -4,
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Cursor text */}
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute text-primary-foreground font-bold text-sm"
              style={{ 
                transform: 'translate(-50%, -50%)',
                left: 0,
                top: 0
              }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="border-2 rounded-full"
          animate={{
            width: isHovering ? 60 : 32,
            height: isHovering ? 60 : 32,
            x: isHovering ? -30 : -16,
            y: isHovering ? -30 : -16,
            opacity: isVisible ? 0.6 : 0,
            borderColor: isHovering ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)',
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}