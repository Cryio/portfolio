import { Metadata } from "next";
import { CertificationAdapter } from "@/components/Certifications";
import portfolioData from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Certifications | Portfolio",
  description: "View my professional certifications and achievements",
};

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Certifications & Achievements
        </h1>
        <div className="space-y-12">
          <CertificationAdapter certifications={portfolioData.certifications || []} />
        </div>
      </div>
    </div>
  );
}