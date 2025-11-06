import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface BlogFrontmatter {
  title: string;
  date: string; // ISO string or YYYY-MM-DD
  description?: string;
  tags?: string[];
}

export interface BlogSummary {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export interface BlogPost extends BlogSummary {
  contentHtml: string;
}

const blogsDirectory = path.join(process.cwd(), "content", "blogs");

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogsDirectory)) return [];
  return fs
    .readdirSync(blogsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllBlogs(): BlogSummary[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => {
      const fullPath = path.join(blogsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const fm = data as Partial<BlogFrontmatter>;
      return {
        slug,
        title: fm.title ?? slug,
        date: fm.date ?? "1970-01-01",
        description: fm.description,
        tags: fm.tags,
      } as BlogSummary;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const fm = data as Partial<BlogFrontmatter>;
  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date ?? "1970-01-01",
    description: fm.description,
    tags: fm.tags,
    contentHtml,
  };
}


