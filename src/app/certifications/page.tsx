"use client";

import { Certifications } from "@/components/Certifications";
import { portfolioData } from "@/data/portfolio";
import { FadeInWrapper } from "@/components/FadeInWrapper";

export default function CertificationsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <FadeInWrapper duration={600} delay={0}>
          <h1 className="text-4xl font-bold mb-12 text-center text-foreground">
            Certifications
          </h1>
        </FadeInWrapper>
        <FadeInWrapper duration={600} delay={100}>
          <div className="space-y-12">
            <Certifications 
              certificationPaths={portfolioData.certificationPaths}
              individualCertifications={portfolioData.individualCertifications}
              achievements={portfolioData.achievements}
            />
          </div>
        </FadeInWrapper>
      </div>
    </div>
  );
}
