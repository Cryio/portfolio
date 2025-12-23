import { Link } from "react-router-dom";
import { ArrowLeft, Award, CheckCircle, ExternalLink, Shield, Cloud, Code, Palette } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { certifications, getYear, categoryConfig, getCertificationWithBadge, type CertificationWithBadge } from "@/data/certifications";
import { AnimatedPage, FadeInOnScroll, StaggerContainer, StaggerItem } from "@/components/AnimatedPage";
import { motion } from "framer-motion";

const categoryIcons = {
  security: Shield,
  cloud: Cloud,
  development: Code,
  design: Palette,
  other: Award,
};

export default function Certifications() {
  // Auto-resolve badge URLs from assets
  const certsWithBadges = certifications.map(getCertificationWithBadge);
  const featured = certsWithBadges.filter((c) => c.featured);
  const others = certsWithBadges.filter((c) => !c.featured);

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
                Certs<span className="text-highlight-1">.</span>
              </h1>
              <p className="text-lg text-muted-foreground border-l-4 border-foreground pl-4">
                Industry-recognized credentials validating expertise across cybersecurity domains.
              </p>
            </FadeInOnScroll>

            {/* Featured Certifications */}
            <FadeInOnScroll className="max-w-5xl mx-auto mb-16">
              <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Featured Certifications
              </h2>
              <StaggerContainer className="grid md:grid-cols-2 gap-6">
                {featured.map((cert, index) => {
                  const CategoryIcon = categoryIcons[cert.category];
                  const config = categoryConfig[cert.category];
                  
                  return (
                    <StaggerItem key={cert.id}>
                      <motion.a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border-4 border-foreground p-6 shadow-sm bg-background group"
                        whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          {cert.badgeUrl ? (
                            <img 
                              src={cert.badgeUrl} 
                              alt={`${cert.title} badge`}
                              className="w-16 h-16 object-contain flex-shrink-0 border-4 border-foreground p-1 bg-background group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div 
                              className="w-16 h-16 border-4 border-foreground flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                              style={{ backgroundColor: `hsl(var(--${config.color}))` }}
                            >
                              <CategoryIcon className="w-8 h-8" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-bold uppercase text-sm mb-1 group-hover:text-primary transition-colors">
                              {cert.title}
                            </h3>
                            <p className="text-muted-foreground text-sm font-mono">
                              {cert.issuer} • {getYear(cert.issueDate)}
                              {cert.totalCertificates && cert.totalCertificates > 1 && (
                                <span className="ml-2">({cert.totalCertificates} certs)</span>
                              )}
                            </p>
                          </div>
                          <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                        </div>

                        {cert.description && (
                          <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                        )}

                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Skills Validated</h4>
                          <div className="flex flex-wrap gap-2">
                            {cert.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="border-2 border-foreground font-mono text-xs"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.a>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </FadeInOnScroll>

            {/* Other Certifications */}
            <FadeInOnScroll className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Additional Certifications</h2>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((cert) => {
                  const CategoryIcon = categoryIcons[cert.category];
                  const config = categoryConfig[cert.category];
                  
                  return (
                    <StaggerItem key={cert.id}>
                      <motion.a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border-4 border-foreground p-5 shadow-sm bg-background group"
                        whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start gap-3">
                          {cert.badgeUrl ? (
                            <img 
                              src={cert.badgeUrl} 
                              alt={`${cert.title} badge`}
                              className="w-10 h-10 object-contain flex-shrink-0 border-4 border-foreground p-0.5 bg-background"
                            />
                          ) : (
                            <div 
                              className="w-10 h-10 border-4 border-foreground flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `hsl(var(--${config.color}) / 0.2)` }}
                            >
                              <CategoryIcon className="w-5 h-5" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-bold text-sm uppercase mb-1 group-hover:text-primary transition-colors">{cert.title}</h3>
                            <p className="text-xs text-muted-foreground mb-2 font-mono">
                              {cert.issuer} • {getYear(cert.issueDate)}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {cert.skills.slice(0, 2).map((skill) => (
                                <Badge key={skill} variant="outline" className="border-2 border-foreground text-xs font-mono">
                                  {skill}
                                </Badge>
                              ))}
                              {cert.skills.length > 2 && (
                                <Badge variant="outline" className="border-2 border-foreground text-xs font-mono">
                                  +{cert.skills.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                        </div>
                      </motion.a>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </FadeInOnScroll>

            {/* Stats */}
            <FadeInOnScroll className="max-w-5xl mx-auto mt-16">
              <div className="border-4 border-foreground p-8 shadow-sm">
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 text-center">Certification Journey</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: certifications.length, label: "Total Certs" },
                    { value: featured.length, label: "Featured" },
                    { value: "5+", label: "Issuers" },
                    { value: "2025", label: "Most Recent" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-4xl font-display">{stat.value}</div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  );
}
