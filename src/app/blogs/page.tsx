import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogs } from "@/lib/blogs";
import { features } from "@/config/features";
import { seoConfig } from "@/config/seo";
import type { Metadata } from "next";

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

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>
      {posts.length === 0 ? (
        <p>No posts yet. Add .md files to <code>content/blogs</code>.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="block rounded-lg border border-primary/20 bg-card p-6 shadow-sm hover:border-primary/40 transition"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(post.date).toLocaleDateString()}
              </p>
              {post.description && (
                <p className="mt-3 text-foreground/80">{post.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


