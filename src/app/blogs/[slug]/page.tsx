import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogBySlug } from "@/lib/blogs";
import { features } from "@/config/features";

type PageParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (!features.blogsEnabled) return [];
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  if (!features.blogsEnabled) {
    return {
      title: "Page not available",
      description: "Blog posts are not published yet.",
      robots: { index: false, follow: false },
    };
  }

  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  return {
    title: post?.title ?? slug,
    description: post?.description,
  };
}

export default async function BlogPostPage({ params }: PageParams) {
  if (!features.blogsEnabled) {
    notFound();
  }

  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="bg-card rounded-xl border shadow-sm p-6">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <article
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </div>
  );
}


