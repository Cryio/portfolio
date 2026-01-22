import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogs } from "@/lib/blogs";
import { features } from "@/config/features";
import { seoConfig } from "@/config/seo";
import type { Metadata } from "next";
import { BlogsContent } from "./BlogsContent";

export const metadata: Metadata = {
  title: seoConfig.pages.blogs.title,
  description: seoConfig.pages.blogs.description,
  alternates: {
    canonical: `${seoConfig.siteUrl}${seoConfig.pages.blogs.slug}`,
  },
  openGraph: {
    title: seoConfig.pages.blogs.title,
    description: seoConfig.pages.blogs.description,
    url: `${seoConfig.siteUrl}${seoConfig.pages.blogs.slug}`,
    siteName: seoConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.pages.blogs.title,
    description: seoConfig.pages.blogs.description,
  },
};

export default function BlogsPage() {
  if (!features.blogsEnabled) {
    notFound();
  }

  const posts = getAllBlogs();

  return <BlogsContent posts={posts} />;
}


