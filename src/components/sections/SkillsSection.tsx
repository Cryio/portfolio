import { Shield, Cloud, Code, Palette, ExternalLink } from "lucide-react";
import { skillCategories, projects } from "@/data/portfolio";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  Shield,
  Cloud,
  Code,
  Palette,
};

// Direct skill-to-project mapping for precise matching
const skillProjectMapping: Record<string, string[]> = {
  // Cybersecurity & Pentesting
  "Nessus": ["Vulnerability Assessment Report"],
  "Burp Suite": ["siNUsoid CTF", "CTF Q2023"],
  "Metasploit": ["Vulnerability Assessment in Docker & Podman", "siNUsoid CTF"],
  "Wireshark": ["TCP/IP Stack Implementation", "Vulnerability Assessment in Docker & Podman"],
  "Wazuh": [],
  "TheHive": [],
  "DFIR-IRIS": ["Qu1cksc0pe Reports"],
  "MISP": [],
  "Ghidra": ["Qu1cksc0pe Reports"],
  "Cuckoo Sandbox": ["Qu1cksc0pe Reports"],
  "SQLmap": ["siNUsoid CTF", "CTF Q2023"],
  "x64dbg": ["Qu1cksc0pe Reports"],
  
  // Cloud & DevOps
  "Microsoft Azure": [],
  "Docker": ["Vulnerability Assessment in Docker & Podman", "HealthMate AI", "siNUsoid CTF", "n8n Render Deployment"],
  "Jenkins": [],
  "Okta": [],
  "CATO Networks": [],
  "Podman": ["Vulnerability Assessment in Docker & Podman"],
  "QEMU": ["TinyLinux"],
  "VirtualBox": ["TinyLinux"],
  
  // Languages & Development
  "Python": ["Wifi-CSI Based Activity Recognition", "Vulnerability Assessment in Docker & Podman", "siNUsoid CTF", "HealthMate AI", "Practical Concepts", "CTF Q2023", "Qu1cksc0pe Reports"],
  "JavaScript": ["Zen Garden", "Karma Tech Website", "Maa Karmaa Website"],
  "TypeScript": [],
  "React": ["Zen Garden"],
  "Node.js": ["Zen Garden", "n8n Render Deployment"],
  "Express": [],
  "Git": [],
  "MySQL": [],
  "MongoDB": ["Zen Garden"],
  
  // Platforms & Design
  "Figma": ["Karma Tech Website", "Maa Karmaa Website"],
  "Blender": [],
  "Unreal Engine": [],
  "Adobe Photoshop": [],
  "Adobe Illustrator": [],
};

// Map skills to related projects - uses direct mapping with fallback to tech matching
function getRelatedProjects(skillName: string) {
  // First check direct mapping
  const directMatches = skillProjectMapping[skillName];
  if (directMatches && directMatches.length > 0) {
    return projects.filter(p => directMatches.includes(p.title));
  }
  
  // Fallback: exact match on tech array only
  return projects.filter((project) =>
    project.tech.some((tech) => tech.toLowerCase() === skillName.toLowerCase())
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; description: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSkillClick = (skill: { name: string; description: string }) => {
    setSelectedSkill(skill);
    setIsDialogOpen(true);
  };

  const relatedProjects = selectedSkill ? getRelatedProjects(selectedSkill.name) : [];

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.3)" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="section-subheading mx-auto">
            A comprehensive toolkit spanning cybersecurity, development, and creative design
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-gradient-primary text-primary-foreground shadow-lg"
                    : "glass hover:border-primary/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <button
              key={skill.name}
              onClick={() => handleSkillClick(skill)}
              className="skill-card animate-scale-in text-left hover:border-primary/50 transition-all cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {skill.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{skill.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {skill.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Skill Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">
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
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Related Projects
                </h4>
                <div className="space-y-3">
                  {relatedProjects.slice(0, 3).map((project) => (
                    <div
                      key={project.title}
                      className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-medium text-sm">{project.title}</h5>
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
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0"
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
    </section>
  );
}