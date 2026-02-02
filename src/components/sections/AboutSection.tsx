import {
  personalInfo,
  certifications,
  projects,
  experiences,
  achievements,
} from "@/data/portfolio";

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const totalCertifications = certifications.reduce(
  (sum, cert) => sum + ((cert as { totalCertificates?: number }).totalCertificates ?? 1),
  0,
);

export function AboutSection() {
  const paragraphs = personalInfo.aboutDescription
    ?.trim()
    .split(/\n\n+/)
    .filter(Boolean) ?? [];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image/Avatar Side */}
            <div className="relative animate-fade-up">
              <div className="aspect-square rounded-2xl overflow-hidden glass p-2">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-4 left-4 w-20 h-20 border border-primary/30 rounded-full" />
                    <div className="absolute bottom-8 right-8 w-32 h-32 border border-accent/30 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-primary/20 rounded-full animate-pulse" />
                  </div>
                  
                  {/* Initials */}
                  <div className="text-8xl font-bold text-gradient relative z-10">
                    {initialsFromName(personalInfo.name)}
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full text-sm font-medium animate-float">
                🔐 {personalInfo.title}
              </div>
              <div className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-full text-sm font-medium animate-float" style={{ animationDelay: "1s" }}>
                💡 {personalInfo.name}
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div>
                <h2 className="section-heading">
                  About <span className="text-gradient">Me</span>
                </h2>
                <p className="text-muted-foreground mt-2">{personalInfo.tagline}</p>
              </div>

              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-gradient">{totalCertifications}+</div>
                  <div className="text-sm text-muted-foreground">Certifications & badges</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-gradient">{projects.length}</div>
                  <div className="text-sm text-muted-foreground">Projects built</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-gradient">{experiences.length}</div>
                  <div className="text-sm text-muted-foreground">Roles & internships</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-gradient">{achievements.length}</div>
                  <div className="text-sm text-muted-foreground">Talks & achievements</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}