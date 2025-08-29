// File: terminal.tsx

'use client';

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// --- Typing Animation Helper ---
function TypingAnimation({
  text,
  speed = 17,
  onFinish,
}: {
  text: string;
  speed?: number;
  onFinish?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");

  const memoizedOnFinish = useCallback(() => {
    onFinish?.();
  }, [onFinish]);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const timeout = setInterval(() => {
      setDisplayed(text.slice(0, i++));
      if (i > text.length) {
        clearInterval(timeout);
        memoizedOnFinish();
      }
    }, speed);
    return () => clearInterval(timeout);
  }, [text, speed, memoizedOnFinish]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-green-400">|</span>
    </span>
  );
}

// --- Command Registry ---
interface CommandDefinition {
  description: string;
  execute: (args?: string[]) => string | string[];
  usage?: string;
}

const COMMANDS: Record<string, CommandDefinition> = {
  help: {
    description: "Show available commands",
    execute: () => [
      "Available commands:",
      "  help - Show this help message",
      "  about - Display information about me",
      "  skills - List my cybersecurity skills",
      "  projects - Show my security portfolio projects",
      "  contact - Display my contact information",
      "  experience - Show my work experience",
      "  education - Display my educational background and certifications",
      "  social - List my professional profiles",
      "  clear - Clear the terminal",
      "  scan - Run a mock security scan",
      "  encrypt [text] - ROT13 encrypt provided text",
      "  decrypt [text] - ROT13 decrypt provided text",
      "  date - Show current date and time",
      "  banner - Display the welcome banner",
      "  matrix - Toggle Matrix rain effect",
      "",
      "Type &apos;help [command]&apos; for more information about a specific command.",
    ],
  },
  about: {
    description: "Display information about me",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ About Srachet Rai                     │",
      "└───────────────────────────────────────┘",
      "I am a Cybersecurity Enthusiast with a solid foundation in web development",
      "and ethical hacking. As a Computer Science student, I am dedicated to",
      "securing digital infrastructures and addressing emerging cyber threats.",
      "",
      "I have contributed to impactful projects—including developing a mobile",
      "application that tackles real-world health challenges—and earned certifications",
      "in Ethical Hacking and Machine Learning. My goal is to deliver innovative,",
      "practical solutions that blend creativity with technical expertise.",
      "",
      "In my leadership roles with the Google Developers Student Club and",
      "TEDxNIITUniversity, I drive innovation and leverage my animation skills",
      "to craft immersive user experiences.",
    ],
  },
  // ... other commands ...
  matrix: {
    description: "Toggle Matrix rain background effect",
    execute: () => [
      "[Matrix effect toggled.]",
      "Welcome to the Matrix... Follow the green code.",
      "Run &apos;matrix&apos; again to disable the effect.",
    ],
  },
};

// --- TerminalLine Model ---
interface TerminalLine {
  id: number;
  content: string;
  type: "input" | "output" | "system" | "warning" | "success" | "typing";
}

// --- Matrix Rain Visual ---
function MatrixRain({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      <div className="matrix-rain">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{
              left: `${i * 2}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <span key={j} className="matrix-char">
                {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Terminal Component ---
export default function Terminal() {
  // Initial banner from COMMANDS.banner.execute()
  const bannerLines = COMMANDS.banner?.execute() ?? [];
  const initialBanner = Array.isArray(bannerLines) ? bannerLines : [bannerLines];

  // State
  const [lines, setLines] = useState<TerminalLine[]>([
    ...initialBanner.map((content, idx) => ({
      id: idx,
      content,
      type: "output" as const,
    })),
    { id: initialBanner.length, content: "Type &apos;help&apos; to see available commands", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixOn, setMatrixOn] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Scroll and focus
  useEffect(() => {
    inputRef.current?.focus();
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [lines]);

  // Add lines helper
  const addLines = useCallback((newLines: string[], type: TerminalLine["type"] = "output") => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((content, i) => ({ id: prev.length + i, content, type })),
    ]);
  }, []);

  // Typing animation output
  const typingOutput = useCallback(async (texts: string[], delay = 5) => {
    for (const text of texts) {
      setLines((prev) => [...prev, { id: prev.length, content: text, type: "typing" }]);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, text.length * delay + 100));
      setLines((prev) =>
        prev.map((line) =>
          line.type === "typing" && line.content === text ? { ...line, type: "output" } : line
        )
      );
    }
  }, []);

  // Command handler
  const handleCommand = useCallback(
    async (cmd: string) => {
      if (!cmd.trim()) {
        addLines([""], "input");
        return;
      }

      // Echo input
      addLines([`$ ${cmd}`], "input");
      // Save history
      setHistory((h) => (h[0] === cmd ? h : [cmd, ...h.slice(0, 19)]));
      setHistoryIndex(-1);

      // Inline ROT13
      const rot13 = (text: string) =>
        text.replace(/[a-zA-Z]/g, (c) => {
          const base = c <= "Z" ? 65 : 97;
          return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
        });

      const [command, ...args] = cmd.trim().split(" ");
      const lc = command.toLowerCase();

      if (lc === "clear") {
        setLines([]);
        return;
      }
      if (lc === "matrix") {
        setMatrixOn((m) => !m);
        await typingOutput(COMMANDS.matrix.execute() as string[]);
        return;
      }
      if (lc === "encrypt" || lc === "decrypt") {
        if (!args.length) {
          await typingOutput([`Usage: ${lc} [text]`], 10);
        } else {
          await typingOutput([rot13(args.join(" "))]);
        }
        return;
      }
      if (lc === "help" && args.length) {
        const topic = args[0].toLowerCase();
        if (COMMANDS[topic]) {
          await typingOutput([
            `Command: ${topic}`,
            `Description: ${COMMANDS[topic].description}`,
            `Usage: ${COMMANDS[topic].usage || topic}`,
          ]);
          return;
        }
      }

      if (COMMANDS[lc]) {
        const out = COMMANDS[lc].execute(args);
        await typingOutput(Array.isArray(out) ? out : [out]);
      } else {
        await typingOutput([`Command not found: ${command}. Type 'help' for available commands.`], 10);
      }
    },
    [addLines, typingOutput]
  );

  // Submit & navigation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const ni = historyIndex + 1;
        setHistoryIndex(ni);
        setInput(history[ni]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const ni = historyIndex - 1;
        setHistoryIndex(ni);
        setInput(history[ni]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(input.trim()));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) addLines([`Available: ${matches.join(", ")}`], "system");
    }
  };

  // Line color
  const getColor = (t: TerminalLine["type"]) => {
    switch (t) {
      case "input":
        return "text-cyan-400";
      case "system":
        return "text-purple-400";
      case "warning":
        return "text-yellow-500";
      case "success":
        return "text-green-500";
      case "typing":
        return "text-green-400 flicker";
      default:
        return "text-green-400";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 relative overflow-hidden">
      <MatrixRain show={matrixOn} />
      <div
        className="w-full max-w-4xl bg-gray-950 rounded-md overflow-hidden shadow-2xl border border-gray-800 relative z-10"
        style={{
          boxShadow: matrixOn ? "0 0 50px #00FF41, 0 0 20px #00FF41" : "0 0 30px rgba(0,255,144,0.15)",
        }}
      >
        <div className="flex items-center px-4 py-2 bg-gray-800 text-gray-400 border-b border-gray-700">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-sm font-mono">srachet-rai@cybersec-terminal ~ $</div>
          <div className="text-xs opacity-50">ENCRYPTED CONNECTION</div>
        </div>
        <div
          ref={terminalRef}
          className="p-4 h-[70vh] overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 bg-black/90"
          onClick={() => inputRef.current?.focus()}
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "100% 2px",
          }}
        >
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                className={`mb-1 ${getColor(line.type)}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line.type === "typing" ? <TypingAnimation text={line.content} /> : line.content}
              </motion.div>
            ))}
          </AnimatePresence>
          <form onSubmit={handleSubmit} className="flex items-center mt-2 sticky bottom-0 bg-gray-950 z-10">
            <span className="text-yellow-500 mr-2">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent text-green-400 outline-none"
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
            <span className="w-2 h-5 bg-green-400 animate-pulse opacity-70 ml-0.5" />
          </form>
        </div>
      </div>
      <div className="mt-4 text-gray-400 text-xs text-center relative z-10">
        Type &apos;help&apos; • &apos;scan&apos; • &apos;matrix&apos; • Arrow keys for history
      </div>
      <style jsx>{`
        .flicker {
          animation: flickerAnim 2s infinite;
        }
        @keyframes flickerAnim {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 22%, 24%, 55% {
            opacity: 0.6;
          }
        }
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .matrix-column {
          position: absolute;
          top: -100px;
          width: 20px;
          height: 100vh;
          color: #00ff41;
          font-family: monospace;
          font-size: 14px;
          animation: matrixFall linear infinite;
        }
        @keyframes matrixFall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .matrix-char {
          display: block;
          line-height: 1.2;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
