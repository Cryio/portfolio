import { Certifications } from "@/components/Certifications";
import { portfolioData } from "@/data/portfolio";

export default function CertificationsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center text-foreground">
        </h1>
        <div className="space-y-12">
          <Certifications 
            certificationPaths={portfolioData.certificationPaths}
            individualCertifications={portfolioData.individualCertifications}
            achievements={portfolioData.achievements}
          />
        </div>
      </div>
    </div>
  );
}
