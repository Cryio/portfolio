import { Certifications } from "@/components/Certifications";
import { getAllCertifications } from "@/data/portfolio";

export default function CertificationsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          <Certifications certifications={getAllCertifications()} />
        </div>
      </div>
    </div>
  );
}
