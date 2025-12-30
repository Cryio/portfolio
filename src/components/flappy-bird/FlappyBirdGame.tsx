import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

interface FlappyBirdGameProps {
  onBack: () => void;
}

const GAME_WIDTH = 480;
const GAME_HEIGHT = 640;
const GROUND_HEIGHT = 40;
const GRAVITY = 0.35;
const FLAP_STRENGTH = -7.5;
const BASE_PIPE_SPEED = 2.8;
const PIPE_SPACING = 210;
const PIPE_GAP = 155;
const MIN_PIPE_GAP = 115;
const MAX_SPEED_BONUS = 3.5;
const PARTICLE_FADE = 0.02;

export function FlappyBirdGame({ onBack }: FlappyBirdGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();
  const birdY = useRef(GAME_HEIGHT / 2);
  const velocity = useRef(0);
  const pipes = useRef<Pipe[]>([]);
  const runningRef = useRef(true);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const particles = useRef<Particle[]>([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const reset = () => {
    birdY.current = GAME_HEIGHT / 2;
    velocity.current = 0;
    pipes.current = [
      { x: GAME_WIDTH + 60, gapY: GAME_HEIGHT / 2, passed: false },
      { x: GAME_WIDTH + 60 + PIPE_SPACING, gapY: GAME_HEIGHT / 2 - 40, passed: false },
    ];
    particles.current = [];
    scoreRef.current = 0;
    setScore(0);
    setIsRunning(true);
    runningRef.current = true;
  };

  const flap = () => {
    if (!isRunning) return;
    velocity.current = FLAP_STRENGTH;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let lastTime = performance.now();

    const addPipe = () => {
      const dynamicGap = Math.max(MIN_PIPE_GAP, PIPE_GAP - scoreRef.current * 4);
      const gapY = 120 + Math.random() * (GAME_HEIGHT - GROUND_HEIGHT - dynamicGap - 120);
      const x = (pipes.current[pipes.current.length - 1]?.x ?? GAME_WIDTH) + PIPE_SPACING;
      pipes.current.push({ x, gapY, passed: false });
    };

    const draw = () => {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Background hue shift
      const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
      const hue = (performance.now() / 40) % 360;
      gradient.addColorStop(0, `hsl(${hue}, 60%, 16%)`);
      gradient.addColorStop(1, `hsl(${(hue + 40) % 360}, 70%, 9%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Ground
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT, GAME_WIDTH, GROUND_HEIGHT);

      // Pipes
      for (const pipe of pipes.current) {
        const pipeHeightTop = pipe.gapY - PIPE_GAP / 2;
        const pipeHeightBottom = GAME_HEIGHT - pipe.gapY - PIPE_GAP / 2 - GROUND_HEIGHT;
        const pipeGradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + 70, 0);
        pipeGradient.addColorStop(0, "#16a34a");
        pipeGradient.addColorStop(1, "#22c55e");
        ctx.fillStyle = pipeGradient;
        ctx.fillRect(pipe.x, 0, 70, pipeHeightTop);
        ctx.fillRect(pipe.x, pipe.gapY + PIPE_GAP / 2, 70, pipeHeightBottom);
      }

      // Particles
      for (const p of particles.current) {
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bird
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(120, birdY.current, 18, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(126, birdY.current - 5, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const update = () => {
      const now = performance.now();
      const delta = Math.min(1 / 20, (now - lastTime) / 1000);
      lastTime = now;

      const speedBonus = Math.min(scoreRef.current * 0.08, MAX_SPEED_BONUS);
      const pipeSpeed = (BASE_PIPE_SPEED + speedBonus) * (delta * 60);

      if (runningRef.current) {
        velocity.current += GRAVITY * (delta * 60);
        birdY.current += velocity.current * (delta * 60);

        // Move pipes
        pipes.current = pipes.current
          .map((pipe) => ({ ...pipe, x: pipe.x - pipeSpeed }))
          .filter((pipe) => pipe.x > -80);

        // Add pipes as needed
        const lastPipe = pipes.current[pipes.current.length - 1];
        if (lastPipe && lastPipe.x < GAME_WIDTH - PIPE_SPACING) {
          addPipe();
        }

        // Collision detection
        for (const pipe of pipes.current) {
          const withinX = 120 + 18 > pipe.x && 120 - 18 < pipe.x + 70;
          const hitsTop = birdY.current - 18 < pipe.gapY - PIPE_GAP / 2;
          const hitsBottom = birdY.current + 18 > pipe.gapY + PIPE_GAP / 2;
          if (withinX && (hitsTop || hitsBottom)) {
            runningRef.current = false;
            setIsRunning(false);
            if (scoreRef.current > bestRef.current) {
              bestRef.current = scoreRef.current;
              setBest(scoreRef.current);
            }
          }
          if (!pipe.passed && pipe.x + 70 < 120) {
            pipe.passed = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
          }
        }

        particles.current = particles.current
          .map((p) => ({ ...p, x: p.x - pipeSpeed * 0.45, alpha: p.alpha - PARTICLE_FADE }))
          .filter((p) => p.alpha > 0);
        particles.current.push({
          x: 120 - 4,
          y: birdY.current,
          alpha: 0.8,
          size: 3 + Math.random() * 2,
        });

        // Ground / ceiling collision
        if (birdY.current + 18 >= GAME_HEIGHT - GROUND_HEIGHT || birdY.current - 18 <= 0) {
          runningRef.current = false;
          setIsRunning(false);
          if (scoreRef.current > bestRef.current) {
            bestRef.current = scoreRef.current;
            setBest(scoreRef.current);
          }
        }
      }

      draw();
      animationRef.current = requestAnimationFrame(update);
    };

    addPipe();
    addPipe();
    animationRef.current = requestAnimationFrame(update);

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!runningRef.current) {
          reset();
        } else {
          flap();
        }
      } else if (e.code === "KeyR") {
        reset();
      } else if (e.code === "Escape") {
        onBack();
      }
    };

    const handleClick = () => {
      if (!runningRef.current) {
        reset();
      } else {
        flap();
      }
    };

    window.addEventListener("keydown", handleKey);
    canvas.addEventListener("pointerdown", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKey);
      canvas.removeEventListener("pointerdown", handleClick);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [onBack]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <div className="relative border-4 border-foreground bg-background shadow-lg">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="bg-background"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-foreground text-background"
          >
            Score: {score}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-background text-foreground border border-foreground"
          >
            Best: {best}
          </motion.span>
        </div>

        {!isRunning && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center">
            <div>
              <p className="text-sm uppercase tracking-widest">Game Over</p>
              <p className="text-3xl font-display mt-1">You scored {score}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="px-4 py-2 border-4 border-foreground bg-accent text-accent-foreground font-bold uppercase text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform"
              >
                Restart (Space)
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 border-4 border-foreground bg-background font-bold uppercase text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform"
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
