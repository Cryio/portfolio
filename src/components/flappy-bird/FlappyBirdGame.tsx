import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";

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
  const runningRef = useRef(false);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const particles = useRef<Particle[]>([]);
  const menuRef = useRef(true);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const containerStyle = useMemo(
    () => ({
      width: "clamp(320px, 92vw, 760px)",
      aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`,
      maxHeight: "88vh",
    }),
    [],
  );

  const reset = (shouldRun = true) => {
    birdY.current = GAME_HEIGHT / 2;
    velocity.current = 0;
    pipes.current = [
      { x: GAME_WIDTH + 60, gapY: GAME_HEIGHT / 2, passed: false },
      { x: GAME_WIDTH + 60 + PIPE_SPACING, gapY: GAME_HEIGHT / 2 - 40, passed: false },
    ];
    particles.current = [];
    scoreRef.current = 0;
    setScore(0);
    runningRef.current = shouldRun;
    setIsRunning(shouldRun);
  };

  const startGame = () => {
    menuRef.current = false;
    setShowMenu(false);
    reset(true);
  };

  useEffect(() => {
    menuRef.current = showMenu;
  }, [showMenu]);

  const flap = () => {
    if (!runningRef.current) return;
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

      const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
      const hue = (performance.now() / 40) % 360;
      gradient.addColorStop(0, `hsl(${hue}, 60%, 16%)`);
      gradient.addColorStop(1, `hsl(${(hue + 40) % 360}, 70%, 9%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      ctx.fillStyle = "#111827";
      ctx.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT, GAME_WIDTH, GROUND_HEIGHT);

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

      for (const p of particles.current) {
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(120, birdY.current, 18, 0, Math.PI * 2);
      ctx.fill();

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

        pipes.current = pipes.current
          .map((pipe) => ({ ...pipe, x: pipe.x - pipeSpeed }))
          .filter((pipe) => pipe.x > -80);

        const lastPipe = pipes.current[pipes.current.length - 1];
        if (lastPipe && lastPipe.x < GAME_WIDTH - PIPE_SPACING) {
          addPipe();
        }

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

    reset(false);
    animationRef.current = requestAnimationFrame(update);

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (menuRef.current || !runningRef.current) {
          startGame();
        } else {
          flap();
        }
      } else if (e.code === "KeyR") {
        startGame();
      } else if (e.code === "Escape") {
        onBack();
      }
    };

    const handleClick = () => {
      if (menuRef.current || !runningRef.current) {
        startGame();
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
    <div className="w-full h-full flex items-center justify-center bg-background px-3 py-6">
      <div className="relative" style={containerStyle}>
        <div className="absolute inset-0 pointer-events-none">
          <Suspense fallback={null}>
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 14], fov: 40 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1.1} />
              <Environment preset="sunset" />
              <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.1}>
                <mesh position={[0, 0, -6]} rotation={[0.2, 0.6, 0.1]}>
                  <torusKnotGeometry args={[2.2, 0.5, 80, 12]} />
                  <meshStandardMaterial color="#22c55e" metalness={0.35} roughness={0.4} />
                </mesh>
              </Float>
              <Float speed={2} rotationIntensity={0.8} floatIntensity={1.4}>
                <mesh position={[-3.6, -2.4, -4]}>
                  <boxGeometry args={[2, 2.6, 2]} />
                  <meshStandardMaterial color="#facc15" metalness={0.25} roughness={0.35} />
                </mesh>
              </Float>
              <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
                <mesh position={[3.4, 2.8, -5]}>
                  <icosahedronGeometry args={[1.6, 0]} />
                  <meshStandardMaterial color="#38bdf8" metalness={0.3} roughness={0.5} />
                </mesh>
              </Float>
            </Canvas>
          </Suspense>
        </div>

        <div className="relative border-4 border-foreground bg-background/90 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden">
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />

          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2 text-xs sm:text-sm">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3 py-1 rounded-full font-semibold uppercase tracking-wide bg-foreground text-background shadow"
            >
              Score: {score}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-3 py-1 rounded-full font-semibold uppercase tracking-wide bg-background text-foreground border border-foreground shadow"
            >
              Best: {best}
            </motion.span>
          </div>

          {showMenu && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-5 text-center px-4">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm uppercase tracking-widest">Flappy Flight</p>
                <p className="text-2xl sm:text-3xl font-display">Tap / Space to fly</p>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                  Dodge the pipes, chase a high score. Restart anytime with Space or R. Press Esc to exit.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={startGame}
                  className="px-5 py-2 border-4 border-foreground bg-accent text-accent-foreground font-bold uppercase text-xs sm:text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform rounded"
                >
                  Start
                </button>
                <button
                  onClick={onBack}
                  className="px-5 py-2 border-4 border-foreground bg-background font-bold uppercase text-xs sm:text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform rounded"
                >
                  Exit
                </button>
              </div>
            </div>
          )}

          {!showMenu && !isRunning && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center px-4">
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-widest">Game Over</p>
                <p className="text-2xl sm:text-3xl font-display mt-1">You scored {score}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={startGame}
                  className="px-4 py-2 border-4 border-foreground bg-accent text-accent-foreground font-bold uppercase text-xs sm:text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform rounded"
                >
                  Restart (Space)
                </button>
                <button
                  onClick={onBack}
                  className="px-4 py-2 border-4 border-foreground bg-background font-bold uppercase text-xs sm:text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform rounded"
                >
                  Exit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
