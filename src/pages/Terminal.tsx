import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { terminalCommands } from "@/data/portfolio";
import { AnimatedPage, FadeInOnScroll } from "@/components/AnimatedPage";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export default function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "╔══════════════════════════════════════════════════════════╗" },
    { type: "output", content: "║  Welcome to Srachet's Interactive Terminal               ║" },
    { type: "output", content: "║  Type 'help' to see available commands                   ║" },
    { type: "output", content: "╚══════════════════════════════════════════════════════════╝" },
    { type: "output", content: "" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();

    if (cmd) {
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
    }

    setLines((prev) => [
      ...prev,
      { type: "input", content: `srachet@cybersec:~$ ${command}` },
    ]);

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const output = terminalCommands[cmd as keyof typeof terminalCommands];

    if (output) {
      setLines((prev) => [
        ...prev,
        { type: "output", content: output },
        { type: "output", content: "" },
      ]);
    } else if (cmd) {
      setLines((prev) => [
        ...prev,
        { type: "output", content: `Command not found: ${cmd}. Type 'help' for available commands.` },
        { type: "output", content: "" },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="max-w-4xl mx-auto">
              <FadeInOnScroll className="text-center mb-8">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tight">
                  Terminal<span className="text-highlight-3">.</span>
                </h1>
                <p className="text-muted-foreground">
                  Explore my portfolio through a command-line interface
                </p>
              </FadeInOnScroll>

              {/* Terminal Window */}
              <FadeInOnScroll delay={0.2}>
                <div className="border-4 border-foreground overflow-hidden shadow-lg">
                  {/* Title Bar */}
                  <div className="bg-foreground text-background px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-highlight-1" />
                      <div className="w-3 h-3 bg-highlight-3" />
                      <div className="w-3 h-3 bg-highlight-2" />
                    </div>
                    <span className="text-sm font-mono flex-1 text-center">
                      srachet@cybersec: ~
                    </span>
                  </div>

                  {/* Terminal Content */}
                  <div
                    ref={terminalRef}
                    className="bg-background p-6 h-[500px] overflow-y-auto font-mono text-sm cursor-text"
                    onClick={() => inputRef.current?.focus()}
                  >
                    {lines.map((line, index) => (
                      <div
                        key={index}
                        className={`whitespace-pre-wrap ${
                          line.type === "input" ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {line.content}
                      </div>
                    ))}

                    {/* Current Input Line */}
                    <div className="flex items-center">
                      <span className="text-accent">srachet@cybersec:~$&nbsp;</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none border-none text-foreground font-mono"
                        autoFocus
                        spellCheck={false}
                      />
                      <motion.span 
                        className="w-2 h-5 bg-accent"
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>

              {/* Quick Commands */}
              <FadeInOnScroll delay={0.3} className="flex flex-wrap justify-center gap-3 mt-6">
                {["help", "about", "skills", "projects", "contact", "clear"].map((cmd) => (
                  <motion.button
                    key={cmd}
                    onClick={() => {
                      handleCommand(cmd);
                      inputRef.current?.focus();
                    }}
                    className="px-4 py-2 border-4 border-foreground text-sm font-mono uppercase bg-background shadow-sm"
                    whileHover={{ y: -2, boxShadow: "var(--shadow-md)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cmd}
                  </motion.button>
                ))}
              </FadeInOnScroll>

              {/* Tips */}
              <FadeInOnScroll delay={0.4} className="mt-8 border-4 border-foreground p-6 shadow-sm">
                <h3 className="font-bold uppercase mb-3">Pro Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use <kbd className="px-2 py-0.5 border-2 border-foreground bg-secondary text-foreground font-mono">↑</kbd> and <kbd className="px-2 py-0.5 border-2 border-foreground bg-secondary text-foreground font-mono">↓</kbd> to navigate command history</li>
                  <li>• Type <code className="text-accent font-mono">clear</code> to reset the terminal</li>
                  <li>• Try <code className="text-accent font-mono">social</code> to get my social links</li>
                </ul>
              </FadeInOnScroll>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  );
}
