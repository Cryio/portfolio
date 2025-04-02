import { Metadata } from "next";
import { Certifications } from "@/components/Certification";
import { portfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Certifications | Portfolio",
  description: "View my professional certifications and achievements",
};

export default function CertificationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Certifications
        </h1>
        <div className="space-y-12">
          <Certifications certifications={portfolioData.certifications} />
        </div>
      </div>
    </div>
  );
} 