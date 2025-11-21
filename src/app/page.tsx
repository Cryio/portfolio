"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
} from "lucide-react";
import { Role } from "@/components/Experience";
import { Project } from "@/components/Project";
import { Certifications } from "@/components/Certifications";
import { portfolioData } from "@/data/portfolio";
import { SkillRadar } from "@/components/SkillRadar";

export default function Home() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, itemName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemName);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        {/* Hero Section reordered: 1) Profile+Contact 2) Bio+Designation 3) Skills */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Column 1: profile photo, name, contact info */}
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
            {/* Contact info */}
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

                    {/* PRIMARY EMAIL */}
                    <div className="grid grid-cols-[25px_1fr_auto] items-center gap-4">
                      <Mail className="h-4 w-4 text-inherit" />
                      <a
                        href={`mailto:${portfolioData.contact.email}`}
                        className="text-sm font-mono truncate hover:underline"
                      >
                        {portfolioData.contact.email}
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-primary/20 text-inherit"
                        onClick={() => handleCopy(portfolioData.contact.email, "primary-email")}
                      >
                        {copiedItem === "primary-email" ? (
                          <span className="text-xs text-primary font-semibold">Copied!</span>
                        ) : (
                          <Copy className="h-4 w-4 text-inherit opacity-80 hover:opacity-100 transition" />
                        )}
                      </Button>
                    </div>
                    {/* ALT EMAIL */}
                    <div className="grid grid-cols-[25px_1fr_auto] items-center gap-4">
                      <Mail className="h-4 w-4 text-inherit" />
                      <a
                        href={`mailto:${portfolioData.contact.altEmail}`}
                        className="text-sm font-mono truncate hover:underline"
                      >
                        {portfolioData.contact.altEmail}
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-primary/20 text-inherit"
                        onClick={() => handleCopy(portfolioData.contact.altEmail, "alt-email")}
                      >
                        {copiedItem === "alt-email" ? (
                          <span className="text-xs text-primary font-semibold">Copied!</span>
                        ) : (
                          <Copy className="h-4 w-4 text-inherit opacity-80 hover:opacity-100 transition" />
                        )}
                      </Button>
                    </div>
                    {/* LINKEDIN */}
                    <div className="grid grid-cols-[25px_1fr_auto] items-center gap-4">
                      <Linkedin className="h-4 w-4 text-inherit" />
                      <a
                        href={portfolioData.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono truncate hover:underline"
                      >
                        {portfolioData.contact.linkedin.replace("https://www.linkedin.com/in/", "")}
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-primary/20 text-inherit"
                        onClick={() => handleCopy(portfolioData.contact.linkedin, "linkedin")}
                      >
                        {copiedItem === "linkedin" ? (
                          <span className="text-xs text-primary font-semibold">Copied!</span>
                        ) : (
                          <Copy className="h-4 w-4 text-inherit opacity-80 hover:opacity-100 transition" />
                        )}
                      </Button>
                    </div>

                    {/* GITHUB */}
                    <div className="grid grid-cols-[25px_1fr_auto] items-center gap-4">
                      <Github className="h-4 w-4 text-inherit" />
                      <a
                        href={portfolioData.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono truncate hover:underline"
                      >
                        {portfolioData.contact.github.replace("https://github.com/", "")}
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-primary/20 text-inherit"
                        onClick={() => handleCopy(portfolioData.contact.github, "github")}
                      >
                        {copiedItem === "github" ? (
                          <span className="text-xs text-primary font-semibold">Copied!</span>
                        ) : (
                          <Copy className="h-4 w-4 text-inherit opacity-80 hover:opacity-100 transition" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>

            </Popover>
          </div>

          {/* Column 2: bio and designation (title and description) with actions */}
          <div className="flex flex-col items-start text-left md:items-start md:text-left">
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              {portfolioData.title}
            </h2>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foreground/90 mb-6">
              {portfolioData.description}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button size="lg" asChild>
                <a
                  href="/assets/Srachet Rai CV - Cyber Sec.pdf"
                  download
                  className="flex items-center gap-2"
                >
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

          {/* Column 3: skill radar */}
          <div className="flex justify-center md:justify-end min-w-0 order-3 md:order-none">
            <div className="w-full max-w-md min-w-0">
              <SkillRadar title="" />
            </div>
          </div>
        </div>

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

        {/* Removed live GitHub activity widget as requested */}

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
            individualCertifications={portfolioData.individualCertifications.slice(
              0,
              3
            )}
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

        {/* Contact Section */}
        <section className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Get in Touch
          </h2>
          <p className="text-xl text-foreground/80">
            Feel free to reach out.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="flex items-center gap-2"
              >
                Primary Email
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={`mailto:${portfolioData.contact.altEmail}`}
                className="flex items-center gap-2"
              >
                Alt Email
              </a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
