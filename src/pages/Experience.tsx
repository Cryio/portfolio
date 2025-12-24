import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/portfolio";
import { AnimatedPage, FadeInOnScroll, StaggerContainer, StaggerItem } from "@/components/AnimatedPage";
import { motion } from "framer-motion";

export default function Experience() {
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
                Experience<span className="text-highlight-4">.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground border-l-4 border-foreground pl-4">
                Building expertise through hands-on industry experience and professional growth.
              </p>
            </FadeInOnScroll>

            {/* Timeline */}
            <StaggerContainer className="max-w-3xl mx-auto space-y-4 md:space-y-6">
              {experiences.map((exp, index) => (
                <StaggerItem key={exp.title}>
                  <motion.div
                    className="border-4 border-foreground p-4 md:p-6 lg:p-8 shadow-sm"
                    whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                      {exp.current && (
                        <Badge className="bg-accent text-accent-foreground border-2 border-foreground font-bold uppercase text-xs">
                          Current
                        </Badge>
                      )}
                      <Badge variant="outline" className="gap-1 border-2 border-foreground font-mono text-xs">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </Badge>
                    </div>

                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-tight mb-2">{exp.title}</h2>
                    
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground mb-3 md:mb-4 text-sm">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-semibold">{exp.company}</span>
                      {exp.location && (
                        <span className="text-xs font-mono">• {exp.location}</span>
                      )}
                    </div>

                    <ul className="space-y-1.5 md:space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 md:gap-3 text-muted-foreground text-sm">
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-foreground/20">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-2 border-foreground text-xs font-mono">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Looking for Opportunities */}
            <FadeInOnScroll className="max-w-3xl mx-auto mt-8 md:mt-12">
              <div className="border-4 border-foreground bg-secondary p-6 md:p-8 text-center shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2">Open to Opportunities</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  I'm always interested in discussing new cybersecurity challenges and opportunities.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-bold uppercase text-sm hover:text-accent transition-colors"
                >
                  Let's connect →
                </Link>
              </div>
            </FadeInOnScroll>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  );
}
