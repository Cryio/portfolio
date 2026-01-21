import type { Metadata } from "next";
import { seoConfig } from "@/config/seo";
import { Certifications } from "@/components/Certifications";
import { portfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: seoConfig.pages.certifications.title,
  description: seoConfig.pages.certifications.description,
  alternates: {
    canonical: `${seoConfig.siteUrl}${seoConfig.pages.certifications.slug}`,
  },
  openGraph: {
    title: seoConfig.pages.certifications.title,
    description: seoConfig.pages.certifications.description,
    url: `${seoConfig.siteUrl}${seoConfig.pages.certifications.slug}`,
    siteName: seoConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.pages.certifications.title,
    description: seoConfig.pages.certifications.description,
  },
};

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
