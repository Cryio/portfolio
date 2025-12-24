import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const hoverCountRef = useRef(0);

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

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleElementEnter = (text?: string) => {
      hoverCountRef.current += 1;
      setIsHovering(true);
      if (text) setCursorText(text);
    };

    const handleElementLeave = () => {
      hoverCountRef.current -= 1;
      // Only reset when no elements are being hovered
      if (hoverCountRef.current <= 0) {
        hoverCountRef.current = 0;
        setIsHovering(false);
        setCursorText("");
      }
    };

    const setupListeners = () => {
      // Clear previous count
      hoverCountRef.current = 0;
      
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
        
        element.addEventListener("mouseenter", enterHandler);
        element.addEventListener("mouseleave", leaveHandler);
        
        // Store handlers for cleanup
        (element as any)._cursorEnterHandler = enterHandler;
        (element as any)._cursorLeaveHandler = leaveHandler;
      });

      return interactiveElements;
    };

    const elements = setupListeners();

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      // Reset hover state on DOM changes
      hoverCountRef.current = 0;
      setIsHovering(false);
      setCursorText("");
      
      // Cleanup old listeners
      elements.forEach((el) => {
        const element = el as any;
        if (element._cursorEnterHandler) {
          element.removeEventListener("mouseenter", element._cursorEnterHandler);
          element.removeEventListener("mouseleave", element._cursorLeaveHandler);
        }
      });
      
      // Setup new listeners
      setupListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();

      document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], .cursor-pointer').forEach((el) => {
        const element = el as any;
        if (element._cursorEnterHandler) {
          element.removeEventListener("mouseenter", element._cursorEnterHandler);
          element.removeEventListener("mouseleave", element._cursorLeaveHandler);
        }
      });
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

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