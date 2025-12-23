import { Award, ExternalLink, Shield, Cloud, Code, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  certifications, 
  categoryConfig, 
  getYear, 
  getCertificationWithBadge,
  type CertificationWithBadge 
} from "@/data/certifications";

const categoryIcons = {
  security: Shield,
  cloud: Cloud,
  development: Code,
  design: Palette,
  other: Award,
};

function CertificationCard({ cert, index, featured = false }: { cert: CertificationWithBadge; index: number; featured?: boolean }) {
  const CategoryIcon = categoryIcons[cert.category];
  const config = categoryConfig[cert.category];
  
  if (featured) {
    return (
      <div
        className="border-4 border-foreground p-6 shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 group h-full flex flex-col bg-background"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-start gap-4 flex-1">
          {cert.badgeUrl ? (
            <img 
              src={cert.badgeUrl} 
              alt={`${cert.title} badge`}
              className="w-14 h-14 object-contain flex-shrink-0 border-4 border-foreground p-1 bg-background"
            />
          ) : (
            <div 
              className="w-14 h-14 flex items-center justify-center flex-shrink-0 border-4 border-foreground"
              style={{ backgroundColor: `hsl(var(--${config.color}))` }}
            >
              <CategoryIcon className="w-7 h-7 text-foreground" />
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <h3 className="font-bold text-lg mb-1 uppercase group-hover:text-primary transition-colors">
              {cert.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2 font-mono">
              {cert.issuer} • {getYear(cert.issueDate)}
              {cert.totalCertificates && cert.totalCertificates > 1 && (
                <span className="ml-2 text-xs">({cert.totalCertificates} certs)</span>
              )}
            </p>
            {cert.description && (
              <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-3 flex-1">
              {cert.skills.slice(0, 4).map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-2 border-foreground text-xs font-mono h-fit"
                >
                  {skill}
                </Badge>
              ))}
              {cert.skills.length > 4 && (
                <Badge variant="outline" className="border-2 border-foreground text-xs font-mono h-fit">
                  +{cert.skills.length - 4} more
                </Badge>
              )}
            </div>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:underline mt-auto group/link"
            >
              View Credential 
              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={cert.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="border-4 border-foreground p-4 shadow-xs hover:shadow-sm hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 group block bg-background"
      style={{ animationDelay: `${(index + 2) * 0.1}s` }}
    >
      <div className="flex items-center gap-3">
        {cert.badgeUrl ? (
          <img 
            src={cert.badgeUrl} 
            alt={`${cert.title} badge`}
            className="w-10 h-10 object-contain flex-shrink-0 border-2 border-foreground p-0.5 bg-background"
          />
        ) : (
          <div 
            className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-2 border-foreground"
            style={{ backgroundColor: `hsl(var(--${config.color}) / 0.2)` }}
          >
            <CategoryIcon className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm uppercase truncate group-hover:text-primary transition-colors">
            {cert.title}
          </h4>
          <p className="text-xs text-muted-foreground font-mono">
            {cert.issuer} • {getYear(cert.issueDate)}
          </p>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
      </div>
    </a>
  );
}

export function CertificationsSection() {
  // Auto-resolve badge URLs from assets
  const certsWithBadges = certifications.map(getCertificationWithBadge);
  const featuredCerts = certsWithBadges.filter((c) => c.featured);
  const otherCerts = certsWithBadges.filter((c) => !c.featured);

  return (
    <section id="certifications" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Certifications<span className="text-highlight-4">.</span>
          </h2>
          <p className="section-subheading mx-auto">
            Industry-recognized credentials validating expertise in cybersecurity
          </p>
        </div>

        {/* Featured Certifications */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {featuredCerts.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} featured />
          ))}
        </div>

        {/* Other Certifications */}
        {otherCerts.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-6 text-center uppercase tracking-wide">
              Additional Certifications
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCerts.map((cert, index) => (
                <CertificationCard key={cert.id} cert={cert} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}