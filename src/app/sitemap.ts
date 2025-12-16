import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blogs";
import { features } from "@/config/features";

const normalizeUrl = (url: string) => {
  const trimmed = url.replace(/\/$/, "");
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
};

// Resolve the canonical site URL from environment (preferring explicit public var)
const envUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? // user-defined canonical URL
  process.env.URL ?? // Netlify production URL
  process.env.DEPLOY_PRIME_URL ?? // Netlify preview/branch deploy URL
  process.env.DEPLOY_URL ?? // Netlify deploy-specific URL
  process.env.SITE_URL ?? // fallback if user sets SITE_URL
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? // Vercel production URL
  process.env.VERCEL_URL; // Vercel preview URL

const siteUrl = envUrl ? normalizeUrl(envUrl) : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/certifications`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/roles`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/terminal`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  if (features.blogsEnabled) {
    const blogSummaries = getAllBlogs();
    const blogLastModified =
      blogSummaries[0]?.date && !Number.isNaN(Date.parse(blogSummaries[0].date))
        ? new Date(blogSummaries[0].date)
        : now;

    routes.push({
      url: `${siteUrl}/blogs`,
      lastModified: blogLastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });

    blogSummaries.forEach((post) => {
      const lastModified =
        post.date && !Number.isNaN(Date.parse(post.date))
          ? new Date(post.date)
          : blogLastModified;

      routes.push({
        url: `${siteUrl}/blogs/${post.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  }

  return routes;
}

