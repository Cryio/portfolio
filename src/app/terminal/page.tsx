'use client';

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
      "I'm a passionate Cybersecurity Professional with expertise in protecting",
      "critical infrastructure and data from evolving digital threats.",
      "",
      "My focus areas include network security, penetration testing, security",
      "operations, and vulnerability management. I take a proactive approach",
      "to security, believing that a strong defense requires understanding",
      "the offensive side as well.",
      "",
      "I regularly contribute to the cybersecurity community through knowledge",
      "sharing, research, and participating in CTF competitions. My goal is to",
      "make digital environments safer for everyone.",
      "",
      "When not hunting threats, I enjoy exploring new security tools, participating",
      "in bug bounty programs, and mentoring aspiring security professionals."
    ]
  },
  skills: {
    description: "List my cybersecurity skills",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Security Skills                       │",
      "└───────────────────────────────────────┘",
      "Offensive Security: Penetration testing, Vulnerability assessment, Red teaming",
      "Defensive Security: SIEM, IDS/IPS, Threat hunting, Security monitoring",
      "Network Security: Firewall management, VPN, Zero Trust architecture",
      "Cloud Security: AWS, Azure, GCP security configurations",
      "Application Security: OWASP methodology, SAST/DAST implementation",
      "Compliance: ISO 27001, NIST, GDPR, PCI DSS",
      "Tools: Metasploit, Wireshark, Burp Suite, Nmap, Kali Linux, Splunk",
      "Programming: Python, Bash scripting, PowerShell",
      "Certifications: CISSP, CEH, Security+, OSCP"
    ]
  },
  projects: {
    description: "Show my security portfolio projects",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Security Projects                     │",
      "└───────────────────────────────────────┘",
      "1. Enterprise SOC Implementation",
      "   - Designed and deployed SIEM solution for large enterprise",
      "   - Reduced incident response time by 67%",
      "   - Integrated threat intelligence feeds and custom detections",
      "",
      "2. IoT Security Framework",
      "   - Developed security assessment methodology for IoT devices",
      "   - Created automated vulnerability scanning pipeline",
      "   - Discovered critical vulnerabilities in popular smart home devices",
      "",
      "3. Zero Trust Implementation",
      "   - Led migration from perimeter-based to Zero Trust architecture",
      "   - Implemented microsegmentation and continuous verification",
      "   - Reduced attack surface by 80%",
      "",
      "4. Security Awareness Training Platform",
      "   - Built interactive phishing simulation and training platform",
      "   - Decreased successful phishing attempts by 92%",
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
      "Email: srachet.rai@securemail.com",
      "Phone: +1 (555) 123-4567",
      "Location: San Francisco, CA",
      "",
      "PGP Key: 0xF721AC3D45BF1E89",
      "Signal: Available upon request",
      "",
      "Preferred contact method: Encrypted email"
    ]
  },
  experience: {
    description: "Show my work experience",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Work Experience                       │",
      "└───────────────────────────────────────┘",
      "Senior Security Engineer | CyberDefend Inc. | 2021 - Present",
      "- Lead security operations and incident response team",
      "- Conduct regular penetration tests and vulnerability assessments",
      "- Architect cloud security solutions for enterprise clients",
      "- Develop security policies and compliance frameworks",
      "",
      "Security Analyst | TechShield Solutions | 2018 - 2021",
      "- Performed threat hunting and security monitoring",
      "- Implemented SIEM solution and custom detection rules",
      "- Conducted security awareness training for staff",
      "- Led breach simulations and tabletop exercises",
      "",
      "IT Security Specialist | FinSecure Corp | 2016 - 2018",
      "- Managed security infrastructure including firewalls and IDS/IPS",
      "- Performed vulnerability scans and coordinated remediation",
      "- Assisted with PCI DSS and SOX compliance efforts",
      "- Implemented multi-factor authentication enterprise-wide"
    ]
  },
  education: {
    description: "Display my educational background and certifications",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Education & Certifications            │",
      "└───────────────────────────────────────┘",
      "M.S. Cybersecurity | Cyber University | 2014 - 2016",
      "- Thesis: Advanced Threat Detection in ICS Environments",
      "- GPA: 3.9/4.0",
      "",
      "B.S. Computer Science | Tech State University | 2010 - 2014",
      "- Specialization: Network Security",
      "- Minor: Digital Forensics",
      "",
      "Certifications:",
      "- Offensive Security Certified Professional (OSCP)",
      "- Certified Information Systems Security Professional (CISSP)",
      "- Certified Ethical Hacker (CEH)",
      "- CompTIA Security+",
      "- AWS Certified Security - Specialty",
      "- Cisco Certified Network Professional Security (CCNP Security)"
    ]
  },
  social: {
    description: "List my professional profiles",
    execute: () => [
      "┌───────────────────────────────────────┐",
      "│ Professional Profiles                 │",
      "└───────────────────────────────────────┘",
      "GitHub: github.com/srachetrai",
      "LinkedIn: linkedin.com/in/srachetrai",
      "Twitter: twitter.com/srachet_security",
      "HackTheBox: hackthebox.eu/profile/srachetrai",
      "TryHackMe: tryhackme.com/p/srachetrai",
      "Bug Crowd: bugcrowd.com/srachetrai",
      "Personal Blog: securityinsights.srachetrai.com"
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
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, content: "Type 'banner' to display welcome message or 'help' to see available commands.", type: 'system' },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lineCounter, setLineCounter] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // Auto-scroll to bottom when lines change
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // ROT13 encryption/decryption function
  const rot13 = (text: string): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      return String.fromCharCode((char.charCodeAt(0) - base + 13) % 26 + base);
    });
  };

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
      addLines(result);
    } else {
      addLines([`Command not found: ${command}. Type 'help' for available commands.`], 'warning');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input !== null) {
      handleCommand(input);
      setInput("");
    }
  };

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

  const getLineColor = (type: string) => {
    switch(type) {
      case 'input': return 'text-cyan-400';
      case 'system': return 'text-purple-400';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <div 
        className="w-full max-w-4xl bg-gray-950 rounded-md overflow-hidden shadow-2xl border border-gray-800"
        style={{
          boxShadow: "0 0 30px rgba(0, 255, 144, 0.15)",
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
                {line.type === 'input' ? <span className="text-yellow-500">$ </span> : null}
                {line.content}
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
      <div className="mt-4 text-gray-400 text-xs text-center">
        <p>Type 'help' for available commands • 'scan' to run security check • Use Up/Down arrows for command history</p>
      </div>
    </div>
  );
}