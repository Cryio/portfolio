import type { Metadata } from "next";
import { seoConfig } from "@/config/seo";

export const metadata: Metadata = {
  title: seoConfig.pages.about.title,
  description: seoConfig.pages.about.description,
  alternates: {
    canonical: `${seoConfig.siteUrl}${seoConfig.pages.about.slug}`,
  },
  openGraph: {
    title: seoConfig.pages.about.title,
    description: seoConfig.pages.about.description,
    url: `${seoConfig.siteUrl}${seoConfig.pages.about.slug}`,
    siteName: seoConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.pages.about.title,
    description: seoConfig.pages.about.description,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
