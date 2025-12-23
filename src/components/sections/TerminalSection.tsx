import { useState, useRef, useEffect } from "react";
import { terminalCommands, personalInfo } from "@/data/portfolio";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export function TerminalSection() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Srachet's Terminal" },
    { type: "output", content: "Type 'help' to see available commands" },
    { type: "output", content: "" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
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
    }
  };

  return (
    <section id="terminal" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Interactive <span className="text-gradient">Terminal</span>
          </h2>
          <p className="section-subheading mx-auto">
            Explore my portfolio through a command-line interface
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-up border border-border">
            {/* Title Bar */}
            <div className="bg-secondary px-4 py-3 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm font-mono text-muted-foreground flex-1 text-center">
                srachet@cybersec: ~
              </span>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="bg-background p-6 h-[400px] overflow-y-auto font-mono text-sm cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, index) => (
                <div
                  key={index}
                  className={`whitespace-pre-wrap ${
                    line.type === "input" ? "text-primary" : "text-foreground"
                  }`}
                >
                  {line.content}
                </div>
              ))}

              {/* Current Input Line */}
              <div className="flex items-center">
                <span className="text-primary">srachet@cybersec:~$&nbsp;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none border-none text-foreground"
                  autoFocus
                />
                <span className="w-2 h-5 bg-primary terminal-cursor" />
              </div>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["help", "about", "skills", "projects", "contact"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  handleCommand(cmd);
                  inputRef.current?.focus();
                }}
                className="px-4 py-2 rounded-lg glass text-sm font-mono hover:border-primary/50 transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}