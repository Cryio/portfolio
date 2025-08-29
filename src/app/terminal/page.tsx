'use client';

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, Terminal as TerminalIcon } from "lucide-react";

interface CommandDefinition {
  description: string;
  execute: () => string | string[];
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
      "  cd [directory] - Change directory (simulation)",
      "  pwd - Print working directory",
      "",
      "Type 'help [command]' for more information about a specific command."
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
      "   - Interactive garden grows based on user's meditation progress",
      "   - Technologies: React Native, Node.js, MongoDB, WebGL",
      "",
      "Type 'project [number]' for more details."
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
      "Type 'certifications' for a more detailed list."
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
  encrypt: {
    description: "ROT13 encrypt provided text",
    execute: () => "Use: encrypt [text to encrypt]"
  },
  decrypt: {
    description: "ROT13 decrypt provided text",
    execute: () => "Use: decrypt [text to decrypt]"
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
  date: {
    description: "Show current date and time",
    execute: () => new Date().toString()
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
      "│               Type 'help' to get started                            │",
      "│                                                                     │",
      "└─────────────────────────────────────────────────────────────────────┘"
    ]
  }
};

interface TerminalLine {
  id: number;
  content: string;
  type: 'input' | 'output' | 'system' | 'warning' | 'success';
}

export default function Terminal() {
  // Get banner for initial display
  const bannerLines = COMMANDS.banner.execute();
  const initialBanner = Array.isArray(bannerLines) ? bannerLines : [bannerLines];

  // Terminal state
  const [lines, setLines] = useState<TerminalLine[]>([
    ...initialBanner.map((content, index) => ({
      id: index,
      content,
      type: 'output' as const
    })),
    { 
      id: initialBanner.length, 
      content: "Type 'help' to see available commands", 
      type: 'system' 
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lineCounter, setLineCounter] = useState(initialBanner.length + 1);
  
  // Path simulation state
  const [currentPath, setCurrentPath] = useState<string[]>(["~"]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // ROT13 implementation for encrypt/decrypt
  const rot13 = (text: string): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      return String.fromCharCode((char.charCodeAt(0) - base + 13) % 26 + base);
    });
  };

  // Add lines to terminal output
  const addLines = (newLines: string[], type: 'input' | 'output' | 'system' | 'warning' | 'success' = 'output') => {
    const linesToAdd = Array.isArray(newLines) ? newLines : [newLines];
    setLines(prev => [
      ...prev, 
      ...linesToAdd.map(line => ({ 
        id: lineCounter + prev.length, 
        content: line, 
        type 
      }))
    ]);
    setLineCounter(lineCounter + linesToAdd.length);
  };

  // Handle command execution
  const handleCommand = (cmd: string) => {
    // Add to command history if not empty and different from last command
    if (cmd.trim() && (commandHistory.length === 0 || commandHistory[0] !== cmd)) {
      setCommandHistory(prev => [cmd, ...prev.slice(0, 19)]); // Keep last 20 commands
    }
    setHistoryIndex(-1);

    // Handle empty command
    if (!cmd.trim()) {
      addLines([""], 'input');
      return;
    }

    // Add the command to terminal output
    addLines([`${cmd}`], 'input');

    // Parse command and arguments
    const [command, ...args] = cmd.trim().split(' ');
    const lowerCommand = command.toLowerCase();

    // Special command handlers
    if (lowerCommand === 'clear') {
      setLines([]);
      return;
    }
    
    // Directory navigation commands
    if (lowerCommand === 'cd') {
      if (args.length === 0 || args[0] === '~') {
        setCurrentPath(["~"]);
        addLines(["Changed directory to: ~"], 'system');
      } else if (args[0] === '..') {
        if (currentPath.length > 1) {
          setCurrentPath(prev => prev.slice(0, -1));
          addLines([`Changed directory to: ${currentPath.slice(0, -1).join('/')}`], 'system');
        } else {
          addLines(["Already at root directory"], 'warning');
        }
      } else {
        // Simulate directory change
        setCurrentPath(prev => [...prev, args[0]]);
        addLines([`Changed directory to: ${[...currentPath, args[0]].join('/')}`], 'system');
      }
      return;
    }
    
    // Show current directory
    if (lowerCommand === 'pwd') {
      addLines([`Current directory: ${currentPath.join('/')}`], 'system');
      return;
    }

    // Encrypt/decrypt handlers
    if (lowerCommand === 'encrypt') {
      const text = args.join(' ');
      if (text) {
        addLines([rot13(text)]);
      } else {
        addLines(["Usage: encrypt [text to encrypt]"], 'warning');
      }
      return;
    }

    if (lowerCommand === 'decrypt') {
      const text = args.join(' ');
      if (text) {
        addLines([rot13(text)]);
      } else {
        addLines(["Usage: decrypt [text to decrypt]"], 'warning');
      }
      return;
    }

    // Help command with topic
    if (lowerCommand === 'help' && args.length > 0) {
      const helpTopic = args[0].toLowerCase();
      if (COMMANDS[helpTopic]) {
        addLines([
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
            addLines(result);
        } else {
            addLines([result]);
        }
    } else {
        addLines([`Command not found: ${command}. Type 'help' for available commands.`], 'warning');
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input !== null) {
      handleCommand(input);
      setInput("");
    }
  };

  // Keyboard navigation handler
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
          addLines([`> ${input}`, 'Available completions:']);
          addLines(matches);
        }
      }
    }
  };

  // Color functions for terminal lines with theme-aware colors
  const getLineColor = (type: string) => {
    switch(type) {
      case 'input': return 'text-cyan-400 dark:text-cyan-300';
      case 'system': return 'text-purple-400 dark:text-purple-300';
      case 'warning': return 'text-yellow-500 dark:text-yellow-300';
      case 'success': return 'text-green-500 dark:text-green-300';
      default: return 'text-green-400 dark:text-green-300';
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 py-8 pt-24 transition-colors duration-200">
      {/* Theme-aware breadcrumbs and header */}
      <header className="w-full max-w-4xl px-4 mb-6">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                <span>Home</span>
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400 dark:text-gray-600" aria-hidden="true" />
              <Link 
                href="/projects" 
                className="hover:text-primary dark:hover:text-primary transition-colors"
              >
                Projects
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400 dark:text-gray-600" aria-hidden="true" />
              <span className="font-medium text-gray-800 dark:text-gray-300 flex items-center">
                <TerminalIcon className="h-4 w-4 mr-1 text-primary" />
                Terminal
              </span>
            </li>
          </ol>
        </nav>
        
        <div className="flex justify-between items-center">
          <div className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs rounded-full flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
            Connected
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Explore my background through an interactive command-line interface
        </p>
      </header>

      {/* Theme-aware terminal window */}
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        {/* Title Bar */}
        <div className="flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-900 text-white">
          <div className="flex space-x-2 mr-4">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <span className="flex-1 text-center font-mono text-sm opacity-90">
            srachet-rai@cybersec:{currentPath.join('/')} $
          </span>
          <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded">SECURE</span>
        </div>

        {/* Terminal Content - Always keep black background for authentic terminal look */}
        <div
          ref={terminalRef}
          className="relative p-6 bg-black font-mono text-sm text-green-400 h-[60vh] overflow-y-auto"
          onClick={() => inputRef.current?.focus()}
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "100% 24px",
          }}
        >
          {/* Terminal lines with animation */}
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                className={`mb-1 ${getLineColor(line.type)}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
              >
                {line.type === "input" && (
                  <span className="text-yellow-300 dark:text-yellow-200 font-semibold">$ </span>
                )}
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center mt-4 sticky bottom-0 bg-black py-2">
            <span className="text-yellow-300 dark:text-yellow-200 mr-2 font-semibold">$</span>
            <input
              ref={inputRef}
              className="flex-grow bg-transparent text-green-300 focus:outline-none text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>

        {/* Footer / Status Bar */}
        <div className="px-4 py-2 bg-gray-900 dark:bg-black border-t border-gray-700 text-xs text-gray-400 flex justify-between items-center">
          <div>
            Type <kbd className="px-1 bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-gray-200 rounded">help</kbd> for available commands
          </div>
          <div className="flex items-center space-x-3">
            <span>Use <kbd className="px-1 bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-gray-200 rounded">↑/↓</kbd> for history</span>
            <span>Press <kbd className="px-1 bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-gray-200 rounded">Tab</kbd> for autocompletion</span>
          </div>
        </div>
      </div>
    </div>
  );
}