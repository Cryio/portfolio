import { Link } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";
import { getProjectImage } from "@/lib/assetLoader";
import { AnimatedPage, FadeInOnScroll, StaggerContainer, StaggerItem } from "@/components/AnimatedPage";
import { motion } from "framer-motion";

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
export default function Projects() {
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

            {/* Header */}
            <FadeInOnScroll className="max-w-4xl mx-auto mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tight">
                Projects<span className="text-highlight-3">.</span>
              </h1>
              <p className="text-lg text-muted-foreground border-l-4 border-foreground pl-4">
                Innovative solutions at the intersection of security, technology, and creativity.
              </p>
            </FadeInOnScroll>

            {/* Projects Grid */}
            <StaggerContainer className="max-w-5xl mx-auto space-y-8">
              {projects.map((project, index) => (
                <StaggerItem key={project.title}>
                  <motion.div
                    className="border-4 border-foreground overflow-hidden shadow-sm"
                    whileHover={{ y: -4, boxShadow: "var(--shadow-lg)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Project Image - auto-loaded from assets */}
                      {(() => {
                        const imageUrl = getProjectImageByTitle(project.title);
                        return (
                          <div 
                            className="h-64 md:h-auto relative flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-foreground overflow-hidden"
                            style={{ backgroundColor: `hsl(var(--highlight-${(index % 4) + 1}) / 0.2)` }}
                          >
                            {imageUrl ? (
                              <img 
                                src={imageUrl} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-9xl font-display text-foreground/20">
                                {project.title.charAt(0)}
                              </div>
                            )}
                            {project.featured && (
                              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-2 border-foreground font-bold uppercase">
                                Featured
                              </Badge>
                            )}
                          </div>
                        );
                      })()}

                      {/* Content */}
                      <div className="p-8">
                        <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">{project.title}</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-6">
                          <h3 className="text-sm font-bold uppercase tracking-wide mb-2 text-muted-foreground">Tech Stack</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="border-2 border-foreground font-mono text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <Button variant="default" className="gap-2" asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* More Coming Soon */}
            <FadeInOnScroll className="max-w-5xl mx-auto mt-12">
              <div className="border-4 border-foreground p-8 text-center shadow-sm">
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">More Projects Coming Soon</h3>
                <p className="text-muted-foreground">
                  I'm always working on something new. Check back soon or follow me on GitHub!
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  );
}
