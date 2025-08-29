// File: terminal.tsx

'use client';

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// --- Typing Animation Helper ---
function TypingAnimation({ text, speed = 17, onFinish }: { text: string, speed?: number, onFinish?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  
  const memoizedOnFinish = useCallback(() => {
    onFinish?.();
  }, [onFinish]);
  
  useEffect(() => {
    let i = 0;
    setDisplayed(""); // Reset for each new `text`
    const timeout = setInterval(() => {
      setDisplayed(text.slice(0, i++));
      if (i > text.length) {
        clearInterval(timeout);
        memoizedOnFinish();
      }
    }, speed);
    return () => clearInterval(timeout);
  }, [text, speed, memoizedOnFinish]);
  
  return <span>{displayed}<span className="animate-pulse text-green-400">|</span></span>;
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
      "Type &apos;help [command]&apos; for more information about a specific command."
    ]
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
      "to craft immersive user experiences."
    ]
  },
  skills: {
    description: "List my cybersecurity skills",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Security Skills                       │",
      "└───────────────────────────────────────┘",
      "Offensive Security: Penetration testing, Vulnerability assessment, Ethical hacking",
      "Defensive Security: SIEM, IDS/IPS, Threat hunting, Security monitoring",
      "Network Security: Firewall management, VPN, Zero Trust architecture",
      "Cloud Security: AWS, Azure, GCP security configurations",
      "Security Tools: Nessus, OpenVAS, Burp Suite, Metasploit, SQLmap",
      "Reverse Engineering: Ghidra, Frida, x64dbg, Cuckoo Sandbox",
      "Network Analysis: Wireshark, Nikto, Responder, ExifTool",
      "Programming: Python, JavaScript, Java, Bash scripting",
      "Certifications: Palo Alto Networks, Cisco, Google Cloud Security"
    ]
  },
  projects: {
    description: "Show my security portfolio projects",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Security Projects                     │",
      "└───────────────────────────────────────┘",
      "1. Wifi-CSI Based Activity Recognition",
      "   - Developed machine learning model using WiFi Channel State Information",
      "   - Recognizes human activities with high accuracy",
      "   - Technologies: Python, TensorFlow, NumPy, Pandas",
      "",
      "2. TinyLinux",
      "   - Created minimalist Linux distribution from scratch",
      "   - Implemented custom kernel configurations and security hardening",
      "   - Technologies: C, Assembly, Linux, Shell",
      "",
      "3. TCPIP Synergy",
      "   - Comprehensive networking toolkit implementing TCP/IP protocols",
      "   - Features packet analysis and network diagnostics",
      "   - Technologies: C++, Networking, TCP/IP, Embedded Systems",
      "",
      "4. Healthmate Zen Garden",
      "   - Wellness application combining meditation tracking and health monitoring",
      "   - Interactive garden grows based on user&apos;s meditation progress",
      "   - Technologies: React Native, Node.js, MongoDB, WebGL",
      "",
      "Type &apos;project [number]&apos; for more details."
    ]
  },
  contact: {
    description: "Display my contact information",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Contact Information                   │",
      "└───────────────────────────────────────┘",
      "Email: srachetrai@gmail.com",
      "GitHub: github.com/Cryio",
      "LinkedIn: linkedin.com/in/srachetrai",
      "",
      "PGP Key: 0xF721AC3D45BF1E89",
      "Signal: Available upon request",
      "",
      "Preferred contact method: Email"
    ]
  },
  experience: {
    description: "Show my work experience",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Work Experience                       │",
      "└───────────────────────────────────────┘",
      "Technology Intern – Cyber Security | Fluidech IT Services Private Limited",
      "Gurgaon, Haryana | July 2025 – Present",
      "- Undertaking internship focused on core cyber security operations",
      "- Working on threat intelligence and security operations",
      "- Participating in vulnerability assessment and incident response",
      "- Gaining hands-on experience in OT security and reverse engineering",
      "",
      "Junior Web Designer | Maa Karma Global Engineering LLP",
      "Remote | 2023",
      "- Designed and developed web interfaces in a remote internship",
      "- Created responsive and user-friendly website layouts",
      "- Implemented modern UI/UX principles in design solutions",
      "- Developed responsive and accessible web solutions",
      "",
      "Design Core | TEDxNIITUniversity",
      "Neemrana, Rajasthan | 2023 - 2024",
      "- Worked on visual storytelling and creative direction for TEDx events",
      "- Created engaging visual content for social media and event promotions",
      "- Collaborated with speakers to develop presentation visuals",
      "- Developed 3D designs and graphics for event branding"
    ]
  },
  education: {
    description: "Display my educational background and certifications",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Education & Certifications            │",
      "└───────────────────────────────────────┘",
      "BTech Computer Science & Engineering | NIIT University",
      "",
      "Key Certification Paths:",
      "• Palo Alto Networks Certified Cybersecurity Practitioner (2024)",
      "• Palo Alto Networks Certified Network Security Analyst (2024)",
      "• Cisco Networking & Cybersecurity Track (2025)",
      "• Google Cloud & AI Specialization (2023)",
      "• Ethical Hacking & Penetration Testing Track (2021)",
      "• Industrial Control Systems (ICS) Security - CISA (2024)",
      "",
      "Notable Individual Certifications:",
      "• ICS 300 - CISA (2024)",
      "• Cato Certified Associate (CCA) - Cato Networks (2025)",
      "• Machine Learning - Indian Institute of Technology, Bombay (2023)",
      "",
      "Type &apos;certifications&apos; for a more detailed list."
    ]
  },
  social: {
    description: "List my professional profiles",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Professional Profiles                 │",
      "└───────────────────────────────────────┘",
      "GitHub: github.com/Cryio",
      "LinkedIn: linkedin.com/in/srachetrai",
      "HackTheBox: hackthebox.eu/profile/srachetrai",
      "TryHackMe: tryhackme.com/p/srachetrai",
      "Google Cloud: cloudskillsboost.google/public_profiles/b93a9482-9eb5-4db0-8cc4-3aaf176705c2"
    ]
  },
  clear: {
    description: "Clear the terminal",
    execute: () => []
  },
  scan: {
    description: "Run a mock security scan",
    execute: () => [
      "Initializing security scan...",
      "Scanning network interfaces...",
      "Analyzing open ports...",
      "Checking for outdated software...",
      "Examining firewall rules...",
      "Searching for known vulnerabilities...",
      "Reviewing security configurations...",
      "",
      "Security scan complete.",
      "",
      "Issues found: 0",
      "Port scan: Clean",
      "Vulnerability assessment: No critical findings",
      "Software status: All up to date",
      "System integrity: Verified",
      "",
      "Terminal security status: SECURE"
    ]
  },
  date: {
    description: "Show current date and time",
    execute: () => [new Date().toString()]
  },
  certifications: {
    description: "List my certification details",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Certifications                        │",
      "└───────────────────────────────────────┘",
      "Palo Alto Networks:",
      "- Cloud Security Fundamentals",
      "- Cybersecurity Fundamentals",
      "- Endpoint Security",
      "- Network Security Fundamentals",
      "- Security Operations Fundamentals",
      "- Decryption - Features",
      "- PAN-OS",
      "- Panorama - Features",
      "- Strata Logging Service - Features",
      "",
      "Cisco Networking:",
      "- Introduction to Cybersecurity",
      "- Networking Basics",
      "- Networking Devices and Initial Configuration",
      "",
      "Google Cloud & AI:",
      "- Cloud Computing Fundamentals",
      "- Infrastructure in Google Cloud",
      "- Networking",
      "- Data, ML, and AI in Google Cloud",
      "- Generative AI Fundamentals",
      "- Prompt Engineering",
      "- Introduction to Large Language Models",
      "",
      "CISA ICS Security:",
      "- Differences in Deployments of Industrial Control Systems",
      "- Influence of IT Components on Industrial Control Systems",
      "- Common ICS Components",
      "- ICS 300",
      "",
      "Udemy Courses:",
      "- Learn Ethical Hacking By Hacking Real Websites Legally",
      "- Start Kali Linux, Ethical Hacking and Penetration Testing",
      "- Python Programming",
      "- Introduction to Blender"
    ]
  },
  banner: {
    description: "Display the welcome banner",
    execute: () => [
      "┌─────────────────────────────────────────────────────────────────────┐",
      "│                                                                     │",
      "│   ███████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗████████╗        │",
      "│   ██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║██╔════╝╚══██╔══╝        │",
      "│   ███████╗██████╔╝███████║██║     ███████║█████╗     ██║           │",
      "│   ╚════██║██╔══██╗██╔══██║██║     ██╔══██║██╔══╝     ██║           │",
      "│   ███████║██║  ██║██║  ██║╚██████╗██║  ██║███████╗   ██║           │",
      "│   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝           │",
      "│                                                                     │",
      "│   ██████╗  █████╗ ██╗                                              │",
      "│   ██╔══██╗██╔══██╗██║                                              │",
      "│   ██████╔╝███████║██║                                              │",
      "│   ██╔══██╗██╔══██║██║                                              │",
      "│   ██║  ██║██║  ██║██║                                              │",
      "│   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝                                              │",
      "│                                                                     │",
      "│               CYBERSECURITY PROFESSIONAL                            │",
      "│                                                                     │",
      "│               Type &apos;help&apos; to get started                            │",
      "│         (this page is still under development)                      │",
      "└─────────────────────────────────────────────────────────────────────┘"
    ]
  },
  matrix: {
    description: "Toggle Matrix rain background effect",
    execute: () => [
      "[Matrix effect toggled.]",
      "Welcome to the Matrix... Follow the green code.",
      "Run &apos;matrix&apos; again to disable the effect."
    ]
  }
};

// --- TerminalLine Model ---
interface TerminalLine {
  id: number;
  content: string;
  type: 'input' | 'output' | 'system' | 'warning' | 'success' | 'typing';
}

// --- Matrix Rain Visual (Enhanced SVG Effect) ---
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
              animationDuration: `${3 + Math.random() * 2}s`
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
  // --- State ---
  const bannerLines = COMMANDS.banner.execute();
  const initialBanner = Array.isArray(bannerLines) ? bannerLines : [bannerLines];

  const [lines, setLines] = useState<TerminalLine[]>([
    ...initialBanner.map((content, index) => ({
      id: index,
      content,
      type: 'output' as const
    })),
    { 
      id: initialBanner.length, 
      content: "Type &apos;help&apos; to see available commands", 
      type: 'system' 
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lineCounter, setLineCounter] = useState(initialBanner.length + 1);
  const [matrixOn, setMatrixOn] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // --- Focus and Scroll on Output Change ---
  useEffect(() => {
    inputRef.current?.focus();
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // --- ROT13 Encryption/Decryption ---
  const rot13 = (text: string): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      return String.fromCharCode((char.charCodeAt(0) - base + 13) % 26 + base);
    });
  };

  // --- Add Lines Helper ---
  const addLines = useCallback((newLines: string[], type: 'input' | 'output' | 'system' | 'warning' | 'success' = 'output') => {
    const linesToAdd = Array.isArray(newLines) ? newLines : [newLines];
    setLines(prev => [
      ...prev, 
      ...linesToAdd.map((line, index) => ({ 
        id: prev.length + index + 1, 
        content: line, 
        type 
      }))
    ]);
    setLineCounter(prev => prev + linesToAdd.length);
  }, []);

  // --- Typing Animation Handler ---
  const typingOutput = useCallback(async (texts: string[], delay = 5) => {
    for (const text of texts) {
      setLines(prev => [
        ...prev,
        { id: prev.length + 1, content: text, type: "typing" }
      ]);
      await new Promise(res => setTimeout(res, text.length * delay + 100));
      setLines(prev => prev.map(line =>
        line.type === "typing" && line.content === text
          ? { ...line, type: "output" }
          : line
      ));
    }
    setLineCounter(prev => prev + texts.length);
  }, []);

  // --- Core Command Handling Logic ---
  const handleCommand = useCallback(async (cmd: string) => {
    // Add to command history if not empty and different from last command
    if (cmd.trim() && (commandHistory.length === 0 || commandHistory[0] !== cmd)) {
      setCommandHistory(prev => [cmd, ...prev.slice(0, 19)]); // Keep last 20 commands
    }
    setHistoryIndex(-1);

    // Handle empty command
    if (!cmd.trim()) {
      addLines([`$ `], 'input');
      return;
    }

    // Add the command to terminal output
    addLines([`$ ${cmd}`], 'input');

    // Parse command and arguments
    const [command, ...args] = cmd.trim().split(' ');
    const lowerCommand = command.toLowerCase();

    // Special command handlers
    if (lowerCommand === 'clear') {
      setLines([]);
      return;
    }

    if (lowerCommand === 'matrix') {
      setMatrixOn(e => !e);
      await typingOutput(COMMANDS["matrix"].execute() as string[]);
      return;
    }

    if (lowerCommand === 'encrypt') {
      const text = args.join(' ');
      if (text) {
        await typingOutput([rot13(text)]);
      } else {
        await typingOutput(["Usage: encrypt [text to encrypt]"], 10);
      }
      return;
    }

    if (lowerCommand === 'decrypt') {
      const text = args.join(' ');
      if (text) {
        await typingOutput([rot13(text)]);
      } else {
        await typingOutput(["Usage: decrypt [text to decrypt]"], 10);
      }
      return;
    }

    if (lowerCommand === 'help' && args.length > 0) {
      const helpTopic = args[0].toLowerCase();
      if (COMMANDS[helpTopic]) {
        await typingOutput([
          `Command: ${helpTopic}`,
          `Description: ${COMMANDS[helpTopic].description}`,
          `Usage: ${helpTopic}`
        ]);
        return;
      }
    }

    // Execute standard commands
    if (COMMANDS[lowerCommand]) {
      const result = COMMANDS[lowerCommand].execute();
      if (Array.isArray(result)) {
        await typingOutput(result);
      } else {
        await typingOutput([result]);
      }
    } else {
      await typingOutput([`Command not found: ${command}. Type &apos;help&apos; for available commands.`], 10);
    }
  }, [commandHistory, addLines, typingOutput, rot13]);

  // --- Handle Submit (Enter) ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input !== null) {
      handleCommand(input);
      setInput("");
    }
  };

  // --- Arrow Up/Down & Tab for Command Navigation/Completion ---
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle up arrow for command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
    
    // Handle down arrow for command history navigation
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
    
    // Handle tab for command completion
    else if (e.key === 'Tab') {
      e.preventDefault();
      if (input.trim()) {
        const matches = Object.keys(COMMANDS).filter(cmd => 
          cmd.startsWith(input.trim().toLowerCase())
        );
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          addLines([`Available completions: ${matches.join(', ')}`], 'system');
        }
      }
    }
  };

  // --- Line Color Mapper ---
  const getLineColor = (type: string) => {
    switch(type) {
      case 'input': return 'text-cyan-400';
      case 'system': return 'text-purple-400';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      case 'typing': return 'text-green-400 flicker';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 relative overflow-hidden">
      {/* Matrix Rain Visual Effect */}
      <MatrixRain show={matrixOn} />

      <div 
        className="w-full max-w-4xl bg-gray-950 rounded-md overflow-hidden shadow-2xl border border-gray-800 relative z-10"
        style={{
          boxShadow: matrixOn ? "0 0 50px #00FF41, 0 0 20px #00FF41" : "0 0 30px rgba(0, 255, 144, 0.15)",
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-2 bg-gray-800 text-gray-400 border-b border-gray-700">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-sm font-mono">srachet-rai@cybersec-terminal ~ $</div>
          <div className="text-xs opacity-50">ENCRYPTED CONNECTION</div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="p-4 h-[70vh] overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
          onClick={() => inputRef.current?.focus()}
          style={{
            backgroundColor: "#0F0F0F", 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px)",
            backgroundSize: "100% 2px",
          }}
        >
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div 
                key={line.id}
                className={`mb-1 ${getLineColor(line.type)}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line.type === 'typing' 
                  ? <TypingAnimation text={line.content} />
                  : line.content
                }
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-yellow-500 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent text-green-400 outline-none border-none"
              spellCheck="false"
              autoComplete="off"
              autoFocus
            />
            <span className="w-2 h-5 bg-green-400 animate-pulse opacity-70 ml-0.5"></span>
          </form>
        </div>
      </div>
      
      {/* Terminal Info */}
      <div className="mt-4 text-gray-400 text-xs text-center relative z-10">
        <p>Type &apos;help&apos; for available commands • &apos;scan&apos; to run security check • &apos;matrix&apos; for effects • Use Up/Down arrows for command history</p>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .flicker {
          animation: flickerAnim 2s infinite;
        }
        @keyframes flickerAnim {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 22%, 24%, 55% { opacity: 0.6; }
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
          color: #00FF41;
          font-family: monospace;
          font-size: 14px;
          animation: matrixFall linear infinite;
        }
        
        @keyframes matrixFall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
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
