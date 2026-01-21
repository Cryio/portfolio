import type { Metadata } from "next";
import { seoConfig } from "@/config/seo";

export const metadata: Metadata = {
  title: seoConfig.pages.projects.title,
  description: seoConfig.pages.projects.description,
  alternates: {
    canonical: `${seoConfig.siteUrl}${seoConfig.pages.projects.slug}`,
  },
  openGraph: {
    title: seoConfig.pages.projects.title,
    description: seoConfig.pages.projects.description,
    url: `${seoConfig.siteUrl}${seoConfig.pages.projects.slug}`,
    siteName: seoConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.pages.projects.title,
    description: seoConfig.pages.projects.description,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
