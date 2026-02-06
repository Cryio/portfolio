import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  connectDistance?: number;
}

// Debounce utility
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export function Particles({
  className = "",
  quantity = 50, // Reduced from 80 for better performance
  color = "var(--primary)",
  connectDistance = 100, // Reduced from 120
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const frameCountRef = useRef(0);

  // Intersection Observer to pause animation when not visible
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    const handleResize = debounce(() => {
      const parent = canvas.parentElement;
      if (parent) {
        setDimensions({
          width: parent.offsetWidth,
          height: parent.offsetHeight,
        });
      }
    }, 250); // Debounced resize

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize particles
    particlesRef.current = Array.from({ length: quantity }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const particles = particlesRef.current;
      frameCountRef.current++;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${color} / ${particle.opacity})`;
        ctx.fill();

        // Optimized connection calculations - limit connections per particle
        let connectionCount = 0;
        const maxConnections = 3; // Limit connections for performance
        
        for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance) {
            const opacity = (1 - distance / connectDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsl(${color} / ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            connectionCount++;
          }
        }

        // Connect to mouse (reduced frequency for performance)
        if (frameCountRef.current % 2 === 0) { // Only check every other frame
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const mouseDistance = Math.sqrt(dx * dx + dy * dy);

          if (mouseDistance < 120) { // Reduced from 150
            const opacity = (1 - mouseDistance / 120) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `hsl(${color} / ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Attract particles slightly toward mouse
            particle.vx += (mouseRef.current.x - particle.x) * 0.00005; // Reduced attraction
            particle.vy += (mouseRef.current.y - particle.y) * 0.00005;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, quantity, color, connectDistance, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}