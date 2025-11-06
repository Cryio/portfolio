import { getAllBlogSlugs, getBlogBySlug } from "@/lib/blogs";
import type { Metadata } from "next";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  return {
    title: post?.title ?? slug,
    description: post?.description,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-2xl font-semibold">Post not found</h1>
      </div>
    );
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


