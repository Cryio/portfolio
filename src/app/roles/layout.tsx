import type { Metadata } from "next";
import { seoConfig } from "@/config/seo";

export const metadata: Metadata = {
  title: seoConfig.pages.roles.title,
  description: seoConfig.pages.roles.description,
  alternates: {
    canonical: `${seoConfig.siteUrl}${seoConfig.pages.roles.slug}`,
  },
  openGraph: {
    title: seoConfig.pages.roles.title,
    description: seoConfig.pages.roles.description,
    url: `${seoConfig.siteUrl}${seoConfig.pages.roles.slug}`,
    siteName: seoConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.pages.roles.title,
    description: seoConfig.pages.roles.description,
  },
};

export default function RolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
