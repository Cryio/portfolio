import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Cloud, Code, Palette, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { skillCategories, projects } from "@/data/portfolio";
import { AnimatedPage, FadeInOnScroll, StaggerContainer, StaggerItem } from "@/components/AnimatedPage";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const iconMap = {
  Shield,
  Cloud,
  Code,
  Palette,
};

// Map skills to related projects
function getRelatedProjects(skillName: string) {
  return projects.filter((project) =>
    project.tech.some((tech) =>
      tech.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(tech.toLowerCase())
    )
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; description: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSkillClick = (skill: { name: string; description: string }) => {
    setSelectedSkill(skill);
    setIsDialogOpen(true);
  };

  const relatedProjects = selectedSkill ? getRelatedProjects(selectedSkill.name) : [];
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
            <FadeInOnScroll className="max-w-4xl mx-auto mb-8 md:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tight">
                Skills<span className="text-highlight-2">.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground border-l-4 border-foreground pl-4">
                A comprehensive toolkit spanning cybersecurity, cloud infrastructure, development, and creative design.
              </p>
            </FadeInOnScroll>

            {/* Category Tabs */}
            <FadeInOnScroll delay={0.1} className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
              {skillCategories.map((category, index) => {
                const Icon = iconMap[category.icon as keyof typeof iconMap];
                return (
                  <motion.button
                    key={category.name}
                    onClick={() => setActiveCategory(index)}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-3 font-bold uppercase text-xs md:text-sm tracking-wide border-4 border-foreground transition-colors ${
                      activeCategory === index
                        ? "bg-foreground text-background"
                        : "bg-background text-foreground hover:bg-secondary"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                  </motion.button>
                );
              })}
            </FadeInOnScroll>

            {/* Skills Grid */}
            <div className="max-w-5xl mx-auto">
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4" key={activeCategory}>
                {skillCategories[activeCategory].skills.map((skill) => (
                  <StaggerItem key={skill.name}>
                    <motion.button
                      onClick={() => handleSkillClick(skill)}
                      className="border-4 border-foreground p-4 md:p-5 shadow-sm w-full text-left cursor-pointer hover:border-primary/50 transition-colors"
                      whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-foreground bg-accent flex items-center justify-center flex-shrink-0">
                          <span className="text-base md:text-lg font-bold">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold uppercase text-xs md:text-sm mb-1 truncate">
                            {skill.name}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* All Categories Summary */}
            <FadeInOnScroll className="max-w-5xl mx-auto mt-12 md:mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 uppercase tracking-tight">All Categories</h2>
              <StaggerContainer className="grid md:grid-cols-2 gap-4 md:gap-6">
                {skillCategories.map((category, i) => {
                  const Icon = iconMap[category.icon as keyof typeof iconMap];
                  const colors = ["highlight-1", "highlight-2", "highlight-3", "highlight-4"];
                  return (
                    <StaggerItem key={category.name}>
                      <motion.div 
                        className="border-4 border-foreground p-4 md:p-6 shadow-sm"
                        whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                          <div 
                            className="w-8 h-8 md:w-10 md:h-10 border-4 border-foreground flex items-center justify-center"
                            style={{ backgroundColor: `hsl(var(--${colors[i % 4]}))` }}
                          >
                            <Icon className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold uppercase text-xs md:text-sm">{category.name}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground font-mono">{category.skills.length} skills</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {category.skills.map((skill) => (
                            <Badge key={skill.name} variant="outline" className="border-2 border-foreground text-xs font-mono">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </FadeInOnScroll>
          </div>
        </main>

        <Footer />

        {/* Skill Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 border-4 border-foreground bg-accent flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {selectedSkill?.name.charAt(0)}
                  </span>
                </div>
                {selectedSkill?.name}
              </DialogTitle>
              <DialogDescription>
                {selectedSkill?.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              {relatedProjects.length > 0 ? (
                <>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">
                    Related Projects
                  </h4>
                  <div className="space-y-3">
                    {relatedProjects.slice(0, 3).map((project) => (
                      <div
                        key={project.title}
                        className="p-3 border-2 border-foreground hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-bold text-sm">{project.title}</h5>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tech.slice(0, 4).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-[10px] px-1.5 py-0 border-foreground"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  No related projects found for this skill yet.
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}
