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

// --- Command Registry (complete) ---
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
      "  help       - Show this help message",
      "  about      - Display information about me",
      "  skills     - List my cybersecurity skills",
      "  projects   - Show my security portfolio projects",
      "  contact    - Display my contact information",
      "  experience - Show my work experience",
      "  education  - Display my educational background and certifications",
      "  social     - List my professional profiles",
      "  clear      - Clear the terminal",
      "  scan       - Run a mock security scan",
      "  encrypt    - ROT13 encrypt provided text",
      "  decrypt    - ROT13 decrypt provided text",
      "  date       - Show current date and time",
      "  banner     - Display the welcome banner",
      "  matrix     - Toggle Matrix rain effect",
      "",
      "Type 'help [command]' for more information about a specific command.",
    ],
    usage: "help [command]",
  },
  banner: {
    description: "Display the welcome banner",
    execute: () => [
      "┌─────────────────────────────────────────────────────────────────────┐",
      "│                       CYBERSEC TERMINAL                           │",
      "│           Type 'help' to see available commands                   │",
      "└─────────────────────────────────────────────────────────────────────┘",
    ],
  },
  about: {
    description: "Display information about me",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ About Srachet Rai                     │",
      "└───────────────────────────────────────┘",
      "Cybersecurity Enthusiast • Web Developer • Ethical Hacker",
    ],
  },
  skills: {
    description: "List my cybersecurity skills",
    execute: () => [
      "Offensive Security: Penetration testing, Ethical hacking",
      "Defensive Security: SIEM, IDS/IPS, Threat hunting",
      "Network Security: Firewalls, VPN, Zero Trust",
      "Cloud Security: AWS, Azure, GCP",
      "Tools: Nessus, Burp Suite, Metasploit, Wireshark",
      "Programming: Python, JavaScript, Bash",
      "Certifications: Palo Alto, Cisco, CISA",
    ],
  },
  projects: {
    description: "Show my security portfolio projects",
    execute: () => [
      "1. Wifi-CSI Activity Recognition (Python, TensorFlow)",
      "2. TinyLinux Distro (C, Assembly, Linux Kernel)",
      "3. TCPIP Synergy Toolkit (C++, Networking)",
      "4. Healthmate Zen Garden App (React Native, Node.js)",
    ],
  },
  contact: {
    description: "Display my contact information",
    execute: () => [
      "Email: srachetrai@gmail.com",
      "GitHub: github.com/Cryio",
      "LinkedIn: linkedin.com/in/srachetrai",
      "PGP Key: 0xF721AC3D45BF1E89",
    ],
  },
  experience: {
    description: "Show my work experience",
    execute: () => [
      "Intern – Cyber Security @ Fluidech IT Services (July 2025–Present)",
      "Junior Web Designer @ Maa Karma Global (2023)",
      "Design Core @ TEDxNIITUniversity (2023–2024)",
    ],
  },
  education: {
    description: "Display my educational background and certifications",
    execute: () => [
      "BTech Computer Science & Engineering | NIIT University",
      "Certifications: Palo Alto Networks, Cisco, CISA, Google Cloud",
    ],
  },
  social: {
    description: "List my professional profiles",
    execute: () => [
      "GitHub: github.com/Cryio",
      "LinkedIn: linkedin.com/in/srachetrai",
      "HackTheBox: hackthebox.eu/profile/srachetrai",
      "TryHackMe: tryhackme.com/p/srachetrai",
    ],
  },
  clear: {
    description: "Clear the terminal",
    execute: () => [],
  },
  scan: {
    description: "Run a mock security scan",
    execute: () => [
      "Security scan started...",
      "No issues found. System secure.",
    ],
  },
  encrypt: {
    description: "ROT13 encrypt provided text",
    execute: () => ["Usage: encrypt [text]"],
    usage: "encrypt [text]",
  },
  decrypt: {
    description: "ROT13 decrypt provided text",
    execute: () => ["Usage: decrypt [text]"],
    usage: "decrypt [text]",
  },
  date: {
    description: "Show current date and time",
    execute: () => [new Date().toString()],
  },
  matrix: {
    description: "Toggle Matrix rain background effect",
    execute: () => ["[Matrix toggled]"],
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
    <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
      {/* same column/rain code */}
    </div>
  );
}

// --- Main Terminal Component ---
export default function Terminal() {
  // Safe banner
  const bannerLines = COMMANDS.banner.execute();
  const initialBanner = Array.isArray(bannerLines) ? bannerLines : [bannerLines];

  const [lines, setLines] = useState<TerminalLine[]>([
    ...initialBanner.map((content, idx) => ({ id: idx, content, type: "output" })),
    { id: initialBanner.length, content: "Type 'help' to see available commands", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [idx, setIdx] = useState(-1);
  const [matrixOn, setMatrixOn] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  const addLines = useCallback((newLines: string[], type: TerminalLine["type"] = "output") => {
    setLines((p) => [
      ...p,
      ...newLines.map((c, i) => ({ id: p.length + i, content: c, type })),
    ]);
  }, []);

  const typeOut = useCallback(async (texts: string[]) => {
    for (const t of texts) {
      setLines((p) => [...p, { id: p.length, content: t, type: "typing" }]);
      // await small delay
      // then convert to output...
      setLines((p) => p.map((ln) => (ln.content === t && ln.type === "typing" ? { ...ln, type: "output" } : ln)));
    }
  }, []);

  const handleCmd = useCallback(async (cmd: string) => {
    addLines([`$ ${cmd}`], "input");
    setHistory((h) => (h[0] === cmd ? h : [cmd, ...h.slice(0, 19)]));
    setIdx(-1);

    // inline rot13
    const rot13 = (s: string) =>
      s.replace(/[A-Za-z]/g, (c) => String.fromCharCode(((c.charCodeAt(0) & 31) + 12) % 26 + (c < "a" ? 65 : 97)));

    const [c, ...a] = cmd.trim().split(" ");
    const lc = c.toLowerCase();

    if (lc === "clear") return setLines([]);
    if (lc === "matrix") {
      setMatrixOn((m) => !m);
      return typeOut(COMMANDS.matrix.execute());
    }
    if (lc === "encrypt" || lc === "decrypt") {
      if (!a.length) return typeOut([`Usage: ${lc} [text]`]);
      return typeOut([rot13(a.join(" "))]);
    }
    if (lc === "help" && a.length) {
      const k = a[0].toLowerCase();
      if (COMMANDS[k]) return typeOut([
        `Command: ${k}`,
        `Description: ${COMMANDS[k].description}`,
        `Usage: ${COMMANDS[k].usage || k}`,
      ]);
    }
    if (COMMANDS[lc]) return typeOut(COMMANDS[lc].execute(a));

    return typeOut([`Command not found: ${c}. Type 'help' for available commands.`]);
  }, [addLines, typeOut]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) handleCmd(input);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx < history.length - 1) {
        const ni = idx + 1;
        setIdx(ni);
        setInput(history[ni]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (idx > 0) {
        const ni = idx - 1;
        setIdx(ni);
        setInput(history[ni]);
      } else {
        setIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = Object.keys(COMMANDS).filter((k) => k.startsWith(input.trim()));
      if (m.length === 1) setInput(m[0]);
      else if (m.length > 1) addLines([`Available: ${m.join(", ")}`], "system");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <MatrixRain show={matrixOn} />
      <div className="w-full max-w-3xl bg-gray-800 rounded overflow-hidden shadow">
        {/* header */}
        <div className="p-2 bg-gray-700 text-gray-300 font-mono flex justify-between">
          <div className="flex space-x-1"><span className="w-3 h-3 bg-red-500 rounded-full"/><span className="w-3 h-3 bg-yellow-500 rounded-full"/><span className="w-3 h-3 bg-green-500 rounded-full"/></div>
          <div>srachet-rai@cybersec-terminal ~ $</div>
          <div className="opacity-50 text-xs">ENCRYPTED</div>
        </div>
        {/* body */}
        <div ref={termRef} className="p-4 bg-black text-green-400 font-mono h-[60vh] overflow-y-auto">
          <AnimatePresence>
            {lines.map((ln) => (
              <motion.div key={ln.id} className={`${ln.type === "input" ? "text-cyan-400" : ""} mb-1`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                {ln.type === "typing" ? <TypingAnimation text={ln.content} /> : ln.content}
              </motion.div>
            ))}
          </AnimatePresence>
          <form onSubmit={onSubmit} className="flex mt-2">
            <span className="text-yellow-400">$</span>
            <input
              ref={inputRef}
              className="flex-1 bg-transparent ml-2 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </form>
        </div>
        {/* footer */}
        <div className="p-2 text-gray-400 text-xs text-center">
          Type 'help' • 'scan' • 'matrix' • Arrow keys for history
        </div>
      </div>
    </div>
  );
}
