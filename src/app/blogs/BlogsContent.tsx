"use client";

import Link from "next/link";
import { FadeInWrapper } from "@/components/FadeInWrapper";
import type { BlogSummary } from "@/lib/blogs";

interface BlogsContentProps {
  posts: BlogSummary[];
}

export function BlogsContent({ posts }: BlogsContentProps) {
  return (
    <div className="container mx-auto px-4 py-24">
      <FadeInWrapper duration={600} delay={0}>
        <h1 className="text-3xl font-bold mb-8">Blogs</h1>
      </FadeInWrapper>
      {posts.length === 0 ? (
        <FadeInWrapper duration={600} delay={100}>
          <p>No posts yet. Add .md files to <code>content/blogs</code>.</p>
        </FadeInWrapper>
      ) : (
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <FadeInWrapper key={post.slug} duration={600} delay={100 + index * 50}>
              <Link
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
            </FadeInWrapper>
          ))}
        </div>
      )}
    </div>
  );
}

