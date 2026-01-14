import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllBlogs } from "@/lib/blogs";
import { features } from "@/config/features";

const normalizeUrl = (url: string) => {
  const trimmed = url.replace(/\/$/, "");
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
};

const getFileLastModified = (relativePath: string): Date | null => {
  try {
    const fullPath = path.join(process.cwd(), relativePath);
    const stats = fs.statSync(fullPath);
    return stats.mtime;
  } catch {
    return null;
  }
};

// Resolve the canonical site URL from environment (preferring explicit public var)
const envUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? // user-defined canonical URL
  "https://srachetrai.dev" ?? // Default to canonical domain
  process.env.URL ?? // Netlify production URL
  process.env.DEPLOY_PRIME_URL ?? // Netlify preview/branch deploy URL
  process.env.DEPLOY_URL ?? // Netlify deploy-specific URL
  process.env.SITE_URL ?? // fallback if user sets SITE_URL
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? // Vercel production URL
  process.env.VERCEL_URL; // Vercel preview URL

const siteUrl = envUrl ? normalizeUrl(envUrl) : "https://srachetrai.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Derive last-modified timestamps from actual source files where possible
  const homeLastMod =
    getFileLastModified("src/app/page.tsx") ?? now;

  const aboutLastMod =
    getFileLastModified("src/app/about/page.tsx") ?? now;

  const projectsLastMod =
    getFileLastModified("src/app/projects/page.tsx") ?? now;

  const certsLastMod =
    getFileLastModified("src/app/certifications/page.tsx") ??
    getFileLastModified("public/certificates") ??
    now;

  const rolesLastMod =
    getFileLastModified("src/app/roles/page.tsx") ?? now;

  const terminalLastMod =
    getFileLastModified("src/app/terminal/page.tsx") ?? now;

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: homeLastMod,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: aboutLastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: projectsLastMod,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/certifications`,
      lastModified: certsLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/roles`,
      lastModified: rolesLastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/terminal`,
      lastModified: terminalLastMod,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  if (features.blogsEnabled) {
    const blogSummaries = getAllBlogs();

    // Last modified based on newest blog file if available
    const blogIndexLastMod =
      getFileLastModified("src/app/blogs/page.tsx") ??
      (blogSummaries[0]?.date && !Number.isNaN(Date.parse(blogSummaries[0].date))
        ? new Date(blogSummaries[0].date)
        : now);

    routes.push({
      url: `${siteUrl}/blogs`,
      lastModified: blogIndexLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    blogSummaries.forEach((post) => {
      const fromDate =
        post.date && !Number.isNaN(Date.parse(post.date))
          ? new Date(post.date)
          : null;

      const fromFile = getFileLastModified(
        path.join("content", "blogs", `${post.slug}.md`),
      );

      const lastModified = fromFile ?? fromDate ?? blogIndexLastMod;

      routes.push({
        url: `${siteUrl}/blogs/${post.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    });
  }

  return routes;
}

