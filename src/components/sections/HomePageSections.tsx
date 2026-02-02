import { ArrowRight, Download, Terminal, Github, Linkedin, Mail, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { personalInfo, skillCategories, projects, experiences } from "@/data/portfolio";
import { certifications, getYear, getCertificationWithBadge } from "@/data/certifications";
import { getProjectImage } from "@/lib/assetLoader";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Parallax, FloatingParallax, ParallaxSection } from "@/components/ui/parallax";

// Mapping of project titles to their asset file names
const projectImageMap: Record<string, string> = {
  "Wifi-CSI Based Activity Recognition": "wifi-csi",
  "TinyLinux": "tinylinux",
};

// Helper to get project image by title
const getProjectImageByTitle = (title: string): string | undefined => {
  const mappedId = projectImageMap[title];
  if (mappedId) {
    return getProjectImage(mappedId);
  }
  // Fallback to generating ID from title
  const generatedId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return getProjectImage(generatedId);
};

// Animated floating shape with more dynamic movement + parallax
function FloatingShape({ className, color, delay = 0, parallaxSpeed = 0.5 }: { className?: string; color: string; delay?: number; parallaxSpeed?: number }) {
  return (
    <FloatingParallax floatRange={30 * parallaxSpeed} rotateRange={8} scaleRange={[0.9, 1.1]} className={className}>
      <div 
        className="pointer-events-none"
        style={{ 
          width: "80px", 
          height: "80px", 
          backgroundColor: `hsl(var(--${color}))`,
          transform: "rotate(12deg)",
          animation: `float 6s ease-in-out infinite, wiggle 4s ease-in-out infinite`,
          animationDelay: `${delay}s`
        }}
      />
    </FloatingParallax>
  );
}

function CircleShape({ className, color, size = 60, delay = 0, parallaxSpeed = 0.3 }: { className?: string; color: string; size?: number; delay?: number; parallaxSpeed?: number }) {
  return (
    <FloatingParallax floatRange={40 * parallaxSpeed} rotateRange={0} scaleRange={[0.95, 1.05]} className={className}>
      <div 
        className="pointer-events-none rounded-full"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: `hsl(var(--${color}))`,
          animation: `float 5s ease-in-out infinite, pulse 3s ease-in-out infinite`,
          animationDelay: `${delay}s`
        }}
      />
    </FloatingParallax>
  );
}

function ZigzagLine({ className, parallaxSpeed = 0.2 }: { className?: string; parallaxSpeed?: number }) {
  return (
    <Parallax speed={parallaxSpeed} className={className}>
      <svg className="pointer-events-none" width="120" height="40" viewBox="0 0 120 40">
        <path 
          d="M0 20 L20 5 L40 20 L60 5 L80 20 L100 5 L120 20" 
          stroke="currentColor" 
          strokeWidth="4" 
          fill="none"
          className="text-foreground"
          style={{
            strokeDasharray: 200,
            animation: 'dash 3s ease-in-out infinite alternate'
          }}
        />
      </svg>
    </Parallax>
  );
}

// Animated text with typing effect
function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 80);
    
    return () => clearInterval(timer);
  }, [text]);
  
  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
}

// Magnetic hover effect for social icons
function MagneticIcon({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };
  
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };
  
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`transition-transform duration-200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

// Parallax background grid
function ParallaxGrid() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      className="absolute inset-0 opacity-5 transition-transform duration-300 ease-out"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px),
                         repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px)`,
        transform: `translate(${offset.x}px, ${offset.y}px)`
      }}
    />
  );
}

// Staggered entrance animation wrapper
function StaggeredEntrance({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-8 blur-sm'
      }`}
    >
      {children}
    </div>
  );
}

// Scroll-triggered animation
function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Counter animation for stats
function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const numericPart = value.replace(/[^0-9]/g, '');
          const suffix = value.replace(/[0-9]/g, '');
          
          if (numericPart && !isNaN(parseInt(numericPart))) {
            const target = parseInt(numericPart);
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                setDisplayValue(value);
                clearInterval(timer);
              } else {
                setDisplayValue(Math.floor(current) + suffix);
              }
            }, 16);
          } else {
            setDisplayValue(value);
          }
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);
  
  return <div ref={ref}>{displayValue}</div>;
}

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const smoothY = useSpring(y, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Parallax Background */}
      <ParallaxGrid />
      
      {/* Mouse follower glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.06), transparent 40%)`
        }}
      />

      {/* Animated Floating Illustrations with parallax */}
      <FloatingShape className="absolute top-32 left-[10%]" color="highlight-1" delay={0} parallaxSpeed={0.8} />
      <CircleShape className="absolute top-40 right-[15%]" color="highlight-2" size={50} delay={0.5} parallaxSpeed={0.6} />
      <FloatingShape className="absolute bottom-40 left-[20%]" color="highlight-3" delay={1} parallaxSpeed={0.4} />
      <CircleShape className="absolute bottom-32 right-[25%]" color="highlight-4" size={70} delay={1.5} parallaxSpeed={0.7} />
      <ZigzagLine className="absolute top-60 left-[5%]" parallaxSpeed={0.3} />
      <ZigzagLine className="absolute bottom-60 right-[5%] rotate-180" parallaxSpeed={0.5} />
      
      {/* Extra floating elements */}
      <CircleShape className="absolute top-1/2 left-[8%] opacity-40" color="highlight-1" size={30} delay={2} parallaxSpeed={0.9} />
      <CircleShape className="absolute top-1/3 right-[8%] opacity-40" color="highlight-3" size={25} delay={2.5} parallaxSpeed={0.5} />

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y: smoothY, scale: smoothScale, opacity }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <StaggeredEntrance delay={0.1}>
              <div className="inline-block mb-6">
                <span className="inline-flex items-center gap-2 border-4 border-foreground bg-accent text-accent-foreground px-4 py-2 font-mono text-sm uppercase tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <Zap className="w-4 h-4 animate-pulse" />
                  Cybersecurity Enthusiast
                </span>
              </div>
            </StaggeredEntrance>
            
            <StaggeredEntrance delay={0.3}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display uppercase leading-none mb-6">
                <AnimatedTitle text="Srachet" />
                <br />
                <span className="text-stroke inline-block hover:scale-105 transition-transform duration-300">Rai</span>
              </h1>
            </StaggeredEntrance>
            
            <StaggeredEntrance delay={0.5}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-sans">
                {personalInfo.tagline}
              </p>
            </StaggeredEntrance>

            <StaggeredEntrance delay={0.7}>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <a
                  href={personalInfo.cvUrl}
                  className="brutalist-button flex items-center gap-2 px-6 py-3 group"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download CV
                </a>
                <Link
                  to="/terminal"
                  className="border-4 border-foreground bg-foreground text-background px-6 py-3 font-bold uppercase tracking-wide shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex items-center gap-2 group"
                >
                  <Terminal className="w-5 h-5 group-hover:animate-pulse" />
                  Try Terminal
                </Link>
              </div>
            </StaggeredEntrance>

            <StaggeredEntrance delay={0.9}>
              <div className="flex gap-4 justify-center">
                <MagneticIcon
                  href={personalInfo.github}
                  className="border-4 border-foreground p-3 shadow-xs hover:shadow-sm hover:bg-foreground hover:text-background transition-all duration-150"
                >
                  <Github className="w-6 h-6" />
                </MagneticIcon>
                <MagneticIcon
                  href={personalInfo.linkedin}
                  className="border-4 border-foreground p-3 shadow-xs hover:shadow-sm hover:bg-foreground hover:text-background transition-all duration-150"
                >
                  <Linkedin className="w-6 h-6" />
                </MagneticIcon>
                <MagneticIcon
                  href={`mailto:${personalInfo.email}`}
                  className="border-4 border-foreground p-3 shadow-xs hover:shadow-sm hover:bg-foreground hover:text-background transition-all duration-150"
                >
                  <Mail className="w-6 h-6" />
                </MagneticIcon>
              </div>
            </StaggeredEntrance>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-highlight-1/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-highlight-2/5 blur-3xl" />
      </motion.div>
      
      <CircleShape className="absolute top-20 right-[10%] opacity-50" color="highlight-1" size={100} delay={0} parallaxSpeed={0.6} />
      <FloatingShape className="absolute bottom-20 left-[5%] opacity-50" color="highlight-2" delay={0.5} parallaxSpeed={0.4} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <ScrollReveal>
              <div>
                <h2 className="section-heading">
                  About<span className="text-highlight-1">.</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 border-l-4 border-foreground pl-4">
                  A passionate cybersecurity enthusiast and creative designer with expertise in penetration testing, 
                  vulnerability assessment, and secure coding practices.
                </p>
                
                <Button variant="outline" className="gap-2 border-4 border-foreground font-bold uppercase group" asChild>
                  <Link to="/about">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "15+", label: "Certifications" },
                { value: "5+", label: "Projects" },
                { value: "2+", label: "Years Exp" },
                { value: "∞", label: "Curiosity" },
              ].map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i + 1}>
                  <div 
                    className="border-4 border-foreground p-4 shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 group"
                  >
                    <div className="text-3xl md:text-4xl font-display group-hover:scale-110 transition-transform origin-left">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkillsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const patternY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  
  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-secondary">
      {/* Subtle parallax pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
          y: patternY,
          backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--foreground)) 0, hsl(var(--foreground)) 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px"
        }}
      />
      
      <ZigzagLine className="absolute top-10 left-10" parallaxSpeed={0.4} />
      <ZigzagLine className="absolute bottom-10 right-10 rotate-180" parallaxSpeed={0.3} />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <h2 className="section-heading">
            Skills<span className="text-highlight-2">.</span>
          </h2>
          <p className="section-subheading mx-auto">
            A comprehensive toolkit spanning cybersecurity, development, and design
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {skillCategories.map((category, i) => {
            const colors = ["highlight-1", "highlight-2", "highlight-3", "highlight-4"];
            return (
              <ScrollReveal key={category.name} delay={i + 1}>
                <div 
                  className="border-4 border-foreground bg-background p-5 shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 h-full group"
                >
                  <div 
                    className="w-4 h-4 mb-3 group-hover:scale-125 transition-transform" 
                    style={{ backgroundColor: `hsl(var(--${colors[i % 4]}))` }} 
                  />
                  <h3 className="font-bold uppercase text-sm mb-3">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 4).map((skill, si) => (
                      <Badge 
                        key={skill.name} 
                        variant="outline" 
                        className="border-2 border-foreground text-xs font-mono hover:bg-foreground hover:text-background transition-colors"
                        style={{ transitionDelay: `${si * 50}ms` }}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                    {category.skills.length > 4 && (
                      <Badge variant="outline" className="border-2 border-foreground text-xs font-mono">
                        +{category.skills.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={5} className="text-center">
          <Button variant="outline" className="gap-2 border-4 border-foreground font-bold uppercase group" asChild>
            <Link to="/skills">
              View All Skills
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function ProjectsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const leftY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Parallax decorative blobs */}
      <motion.div 
        className="absolute -left-20 top-1/4 w-[300px] h-[300px] rounded-full bg-highlight-3/10 blur-3xl pointer-events-none"
        style={{ y: leftY }}
      />
      <motion.div 
        className="absolute -right-20 bottom-1/4 w-[400px] h-[400px] rounded-full bg-highlight-4/10 blur-3xl pointer-events-none"
        style={{ y: rightY }}
      />
      
      <FloatingShape className="absolute top-20 left-[5%] opacity-30" color="highlight-3" delay={0} parallaxSpeed={0.5} />
      <CircleShape className="absolute bottom-20 right-[10%] opacity-30" color="highlight-4" size={80} delay={0.5} parallaxSpeed={0.7} />
      
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <h2 className="section-heading">
            Projects<span className="text-highlight-3">.</span>
          </h2>
          <p className="section-subheading mx-auto">
            Innovative solutions at the intersection of security and technology
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {projects.slice(0, 2).map((project, i) => {
            const imageUrl = getProjectImageByTitle(project.title);
            
            
            return (
              <ScrollReveal key={project.title} delay={i + 1}>
                <Link
                  to="/projects"
                  className="group block border-4 border-foreground overflow-hidden shadow-sm hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                >
                  <div 
                    className="h-40 relative overflow-hidden" 
                    style={{ backgroundColor: `hsl(var(--highlight-${(i % 4) + 1}) / 0.2)` }}
                  >
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-7xl font-display text-foreground/20 group-hover:scale-125 transition-transform duration-500">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                  </div>
                  <div className="p-5 border-t-4 border-foreground">
                    <h3 className="font-bold uppercase mb-2 group-hover:text-highlight-1 transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <Badge key={t} variant="outline" className="border-2 border-foreground text-xs font-mono">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={3} className="text-center">
          <Button variant="outline" className="gap-2 border-4 border-foreground font-bold uppercase group" asChild>
            <Link to="/projects">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function ExperiencePreview() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const gridY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <section ref={sectionRef} className="py-24 relative bg-foreground text-background overflow-hidden">
      {/* Parallax grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ 
          y: gridY,
          backgroundImage: `linear-gradient(to right, hsl(var(--background)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--background)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <h2 className="section-heading text-background">
            Experience<span className="text-accent">.</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-6 mb-8">
          {experiences.slice(0, 2).map((exp, i) => (
            <ScrollReveal key={exp.title} delay={i + 1}>
              <div
                className="border-4 border-background p-6 shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <h3 className="font-bold uppercase text-lg group-hover:text-accent transition-colors">{exp.title}</h3>
                  <span className="text-sm font-mono opacity-70">{exp.period}</span>
                </div>
                <p className="font-semibold mb-2">{exp.company}</p>
                <p className="text-background/70 text-sm">{exp.description[0]}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={3} className="text-center">
          <Button variant="outline" className="gap-2 border-4 border-background text-background hover:bg-background hover:text-foreground font-bold uppercase group" asChild>
            <Link to="/experience">
              View Experience
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function CertificationsPreview() {
  const featured = certifications.filter(c => c.featured).slice(0, 2);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const decorY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  
  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Parallax decoration */}
      <motion.div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-highlight-4/5 blur-3xl pointer-events-none"
        style={{ y: decorY }}
      />
      
      <ZigzagLine className="absolute top-20 right-20" parallaxSpeed={0.4} />
      
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <h2 className="section-heading">
            Certifications<span className="text-highlight-4">.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
          {featured.map((cert, i) => {
            const certWithBadge = getCertificationWithBadge(cert);
            
            return (
              <ScrollReveal key={cert.id} delay={i + 1}>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-4 border-foreground p-5 shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 h-full group bg-background"
                >
                  <div className="flex items-start gap-4">
                    {certWithBadge.badgeUrl ? (
                      <img 
                        src={certWithBadge.badgeUrl} 
                        alt={`${cert.title} badge`}
                        className="w-12 h-12 object-contain flex-shrink-0 border-4 border-foreground p-0.5 bg-background group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <div 
                        className="w-12 h-12 flex items-center justify-center flex-shrink-0 border-4 border-foreground group-hover:scale-110 transition-transform" 
                        style={{ backgroundColor: `hsl(var(--highlight-${(i % 4) + 1}))` }}
                      >
                        <Award className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-sm uppercase mb-1 group-hover:text-highlight-1 transition-colors">{cert.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2 font-mono">{cert.issuer} • {getYear(cert.issueDate)}</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 2).map((s) => (
                          <Badge key={s} variant="outline" className="border-2 border-foreground text-xs font-mono">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={3} className="text-center">
          <Button variant="outline" className="gap-2 border-4 border-foreground font-bold uppercase group" asChild>
            <Link to="/certifications">
              View All Certifications
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const leftX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  
  return (
    <section ref={sectionRef} className="py-24 relative bg-accent overflow-hidden">
      {/* Parallax moving elements */}
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-accent-foreground/10 blur-2xl"
        style={{ x: leftX }}
      />
      <motion.div 
        className="absolute right-0 top-1/3 w-[300px] h-[300px] rounded-full bg-accent-foreground/10 blur-2xl"
        style={{ x: rightX }}
      />
      
      <FloatingShape className="absolute top-10 left-10 opacity-30" color="foreground" delay={0} parallaxSpeed={0.6} />
      <CircleShape className="absolute bottom-10 right-10 opacity-30" color="foreground" size={60} delay={0.5} parallaxSpeed={0.4} />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-display uppercase mb-6 text-accent-foreground">
              Let's Work Together
            </h2>
            <p className="text-accent-foreground/80 mb-8 text-lg">
              Have a project in mind or want to discuss cybersecurity? I'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="border-4 border-accent-foreground bg-accent-foreground text-accent px-6 py-3 font-bold uppercase tracking-wide shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex items-center gap-2 group"
              >
                <Mail className="w-5 h-5 group-hover:animate-pulse" />
                Get in Touch
              </Link>
              <Link
                to="/blog"
                className="border-4 border-accent-foreground bg-transparent text-accent-foreground px-6 py-3 font-bold uppercase tracking-wide shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex items-center gap-2 group"
              >
                Read My Blog
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
