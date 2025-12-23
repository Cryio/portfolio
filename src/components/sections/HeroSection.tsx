import { ArrowDown, Download, Terminal, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, radarData } from "@/data/portfolio";
import { SkillRadar } from "@/components/ui/skill-radar";
import { Particles } from "@/components/ui/particles";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark" />
      
      {/* Particle Animation */}
      <div className="absolute inset-0">
        <Particles 
          quantity={100} 
          color="175 80% 50%" 
          connectDistance={100}
        />
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ background: "hsl(var(--primary) / 0.4)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse-glow"
          style={{ background: "hsl(var(--accent) / 0.3)", animationDelay: "1.5s" }}
        />
      </div>
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium glass border-primary/30">
                👋 Welcome to my portfolio
              </span>
            </div>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Hi, I'm{" "}
              <span className="text-gradient">{personalInfo.name}</span>
            </h1>
            
            <h2 
              className="text-xl md:text-2xl text-muted-foreground animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              {personalInfo.title}
            </h2>
            
            <p 
              className="text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              {personalInfo.tagline}
            </p>

            <div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Button variant="default" className="gap-2">
                <Download className="w-4 h-4" />
                Download CV
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-primary/50 hover:bg-primary/10"
                onClick={() => {
                  document.querySelector("#terminal")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Terminal className="w-4 h-4" />
                Try Terminal
              </Button>
            </div>

            <div 
              className="flex gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 rounded-xl glass hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Skill Radar */}
          <div 
            className="flex justify-center animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <SkillRadar data={radarData} />
          </div>
        </div>


        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}