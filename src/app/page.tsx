import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TechnologyCard } from "@/components/TechnologyCard";
import { Download, Github, Linkedin } from "lucide-react";
import { Role } from "@/components/Experience";
import { Project } from "@/components/Project";
import { Certifications } from "@/components/Certifications";
import portfolioData from "@/data/portfolio";

export default function Home() {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
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
          <h2 className="text-3xl font-medium text-foreground/80 mb-6">{portfolioData.title}</h2>
          <p className="max-w-2xl font-medium text-xl mb-8">
            {portfolioData.description}
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <a href="/assets/Srachet Rai CV - Cyber Sec.pdf" download className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download CV
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`mailto:${portfolioData.contact.email}`}>
                Contact Me
              </a>
            </Button>
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
          <Certifications certifications={portfolioData.certifications.slice(5, 9)} />
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
              <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${portfolioData.contact.email}`} className="flex items-center gap-2">
                Email
              </a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
