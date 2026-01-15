"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TechnologyCard } from "@/components/TechnologyCard";
import {
  Download,
  Github,
  Linkedin,
  Terminal,
  Mail,
  Copy,
  Loader2,
  CheckCircle2, // NEW: Success Icon
  XCircle
} from "lucide-react";
import { Role } from "@/components/Experience";
import { Project } from "@/components/Project";
import { Certifications } from "@/components/Certifications";
import { portfolioData } from "@/data/portfolio";
import { SkillRadar } from "@/components/SkillRadar";

export default function Home() {
  // --- Existing State for Copy Functionality ---
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, itemName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemName);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  // --- Form State ---
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const quotes = [
    {
      text: "With great power comes great electricity bill.",
      author: "Dr. Who",
    },
    {
      text: "Passwords are like underwear—change them often and don’t share.",
      author: "Every Security Checklist Ever",
    },
    {
      text: "My threat model includes coffee outages and expired certs.",
      author: "A Tired Security Engineer",
    },
    {
      text: "In God we trust; all others must bring logs.",
      author: "A Friendly SOC",
    },
    {
      text: "If it’s not in version control, it’s already on fire.",
      author: "Build Pipeline Philosopher",
    },
    {
      text: "Never trust, always verify, frequently caffeinate.",
      author: "Zero Trust Barista",
    },
    {
      text: "My firewall rules are just my boundaries in YAML.",
      author: "Therapist for DevSecOps",
    },
    {
      text: "There is no cloud, only other people’s misconfigured servers.",
      author: "SRE on Call",
    },
    {
      text: "The most secure system is unplugged, encased in concrete, and asleep.",
      author: "Paranoid Architect",
    },
    {
      text: "Red team finds the door; blue team installs a hinge; purple team writes the doc.",
      author: "Team Player",
    },
    {
      text: "My favorite zero-day is a day with zero pages of new runbooks.",
      author: "Sleepy On-Call",
    },
    {
      text: "Never underestimate a well-placed log line or a poorly-placed semicolon.",
      author: "Incident Historian",
    },
    {
      text: "Security is just performance art for adversaries with more caffeine.",
      author: "Caffeine-Driven Defender",
    },
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setIsFading(false);
      }, 420);
    }, 9200);
    return () => clearInterval(id);
  }, [quotes.length]);

  const activeQuote = quotes[quoteIndex];

  // --- Handle Input Change ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Handle Form Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "home-contact",
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Column 1: Profile & Contact */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-40 h-40 mb-8 ring-4 ring-primary/20 rounded-full overflow-hidden">
              <Image
                src="/assets/profile.png"
                alt={portfolioData.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
              {portfolioData.name}
            </h1>
            
            {/* Contact Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button size="lg">
                  Contact Me
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={`
                  w-80 border-none rounded-xl p-4 shadow-2xl transition-all duration-300
                  bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 text-white
                  dark:from-white/80 dark:via-white/70 dark:to-gray-100/70 dark:text-gray-900
                  backdrop-blur-lg backdrop-saturate-150
                `}
              >
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    {/* Emails & Socials (Same as before) */}
                    <div className="grid grid-cols-[25px_1fr_auto] items-center gap-4">
                      <Mail className="h-4 w-4 text-inherit" />
                      <a href={`mailto:${portfolioData.contact.email}`} className="text-sm font-mono truncate hover:underline">
                        {portfolioData.contact.email}
                      </a>
                      <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/20 text-inherit" onClick={() => handleCopy(portfolioData.contact.email, "email")}>
                        {copiedItem === "email" ? <span className="text-xs text-primary font-semibold">Copied!</span> : <Copy className="h-4 w-4 text-inherit opacity-80 hover:opacity-100 transition" />}
                      </Button>
                    </div>
                    <div className="grid grid-cols-[25px_1fr_auto] items-center gap-4">
                      <Linkedin className="h-4 w-4 text-inherit" />
                      <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-mono truncate hover:underline">
                        {portfolioData.contact.linkedin.replace("https://www.linkedin.com/in/", "")}
                      </a>
                      <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/20 text-inherit" onClick={() => handleCopy(portfolioData.contact.linkedin, "linkedin")}>
                        {copiedItem === "linkedin" ? <span className="text-xs text-primary font-semibold">Copied!</span> : <Copy className="h-4 w-4 text-inherit opacity-80 hover:opacity-100 transition" />}
                      </Button>
                    </div>
                    <div className="grid grid-cols-[25px_1fr_auto] items-center gap-4">
                      <Github className="h-4 w-4 text-inherit" />
                      <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-sm font-mono truncate hover:underline">
                        {portfolioData.contact.github.replace("https://github.com/", "")}
                      </a>
                      <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/20 text-inherit" onClick={() => handleCopy(portfolioData.contact.github, "github")}>
                        {copiedItem === "github" ? <span className="text-xs text-primary font-semibold">Copied!</span> : <Copy className="h-4 w-4 text-inherit opacity-80 hover:opacity-100 transition" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Column 2: Bio & Downloads */}
          <div className="flex flex-col items-start text-left md:items-start md:text-left">
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              {portfolioData.title}
            </h2>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foreground/90 mb-6">
              {portfolioData.description}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button size="lg" asChild>
                <a href="/assets/Srachet Rai CV - Cyber Sec.pdf" download className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download CV
                </a>
              </Button>
              <Button size="lg" asChild>
                <Link href="/terminal" className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  <span>Try the Security Terminal</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Column 3: Skill Radar */}
          <div className="flex justify-center md:justify-end min-w-0 order-3 md:order-none">
            <div className="w-full max-w-md min-w-0">
              <SkillRadar title="" />
            </div>
          </div>
        </div>

        {/* Lighthearted Quotes Section */}
        <section className="mb-4">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
            <div className="relative space-y-6 px-6 text-center">

              <div className="max-w-3xl mx-auto">
                <div
                  key={activeQuote.text}
                  className={`relative rounded-lg px-4 py-6 transition-all duration-900 ease-in-out ${isFading ? "opacity-0 scale-95 blur-[2px]" : "opacity-100 scale-100 blur-0"}`}
                  aria-live="polite"
                >
                  <p className="text-base md:text-xl font-mono leading-relaxed text-foreground">
                    {activeQuote.text}
                  </p>
                  <div className="mt-4 text-sm md:text-base text-primary font-medium text-center">
                    — {activeQuote.author}
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* Technologies Section */}
        {portfolioData.technologies.map((section) => (
          <div key={section.title} className="mb-16">
            <h3 className="text-3xl font-semibold mb-8 text-center text-foreground">
              {section.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {section.items.map((tech) => (
                <TechnologyCard key={tech.name} technology={tech} />
              ))}
            </div>
          </div>
        ))}

        {/* Featured Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">
            Featured Projects
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {portfolioData.projects.slice(0, 2).map((project) => (
              <Project key={project.title} project={project} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <a href="/projects" className="flex items-center gap-2">
                View All Projects
              </a>
            </Button>
          </div>
        </section>

        {/* Role & Responsibilities Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">
            Role & Responsibilities
          </h2>
          <div className="space-y-8">
            {portfolioData.experiences.slice(0, 2).map((experience) => (
              <Role key={experience.title} experience={experience} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <a href="/roles" className="flex items-center gap-2">
                View All Roles
              </a>
            </Button>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">
            Certifications
          </h2>
          <Certifications
            certificationPaths={portfolioData.certificationPaths.slice(0, 2)}
            individualCertifications={portfolioData.individualCertifications.slice(0, 3)}
            achievements={portfolioData.achievements.slice(0, 3)}
          />
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <a href="/certifications" className="flex items-center gap-2">
                View All Certifications
              </a>
            </Button>
          </div>
        </section>

        {/* Contact Section - UPDATED FORM */}
        <section className="text-center space-y-6 mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Get in Touch
          </h2>
          <p className="text-xl text-foreground/80">
            Feel free to reach out.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto grid gap-4 text-left bg-background/70 border border-border/60 rounded-2xl p-6 shadow-lg backdrop-blur"
          >
            {/* Essential for Netlify Detection */}
            <input type="hidden" name="form-name" value="home-contact" />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="home-name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="home-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="home-email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="home-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="home-subject" className="text-sm font-medium text-foreground">
                Subject
              </label>
              <input
                id="home-subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="What would you like to discuss?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="home-message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="home-message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tell me more about your project or question"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm">
                {status === "success" && (
                  <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    Thank you! I&apos;ll get back to you shortly.
                  </span>
                )}
                {status === "error" && (
                  <span className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                    <XCircle className="h-4 w-4" />
                    Something went wrong. Please try again.
                  </span>
                )}
              </div>
              
              <Button type="submit" size="lg" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>

          {/* Social Links (Same as before) */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="outline" asChild>
              <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="h-5 w-5" /> GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin className="h-5 w-5" /> LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${portfolioData.contact.email}`} className="flex items-center gap-2">
                <Mail className="h-5 w-5" /> Email
              </a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}