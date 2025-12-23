import { personalInfo } from "@/data/portfolio";

export function AboutSection() {
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
                    SR
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full text-sm font-medium animate-float">
                🔐 Security First
              </div>
              <div className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-full text-sm font-medium animate-float" style={{ animationDelay: "1s" }}>
                💻 Full Stack
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div>
                <h2 className="section-heading">
                  About <span className="text-gradient">Me</span>
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate cybersecurity enthusiast and creative designer with a strong foundation in computer science. Currently pursuing my B.Tech in CSE, I combine technical expertise with creative problem-solving.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                My journey in cybersecurity began with a fascination for understanding how systems work — and how they can be made more secure. From penetration testing to building secure applications, I thrive on the challenge of staying one step ahead.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-gradient">15+</div>
                  <div className="text-sm text-muted-foreground">Certifications</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-gradient">5+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-gradient">2+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-gradient">∞</div>
                  <div className="text-sm text-muted-foreground">Curiosity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}