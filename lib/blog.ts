import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  readingTime: string;
  isNew?: boolean;
  content: string;
}

const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");

/**
 * Data Access Layer for Blog Posts
 * Current implementation: Reads local Markdown (.md / .mdx) files from /content/blog/
 * Future upgrade path: Swap internal logic to fetch from Headless CMS (Sanity / Strapi / Decap)
 */

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOG_DIRECTORY);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(BLOG_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Bài viết kế toán thuế",
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "/images/blog/placeholder.jpg",
        date: data.date || new Date().toISOString().split("T")[0],
        author: {
          name: data.author?.name || "Ban Biên Tập Sóc Sơn",
          avatar: data.author?.avatar || "/images/team/author-default.jpg",
          role: data.author?.role || "Chuyên gia Kế toán Thuế",
        },
        category: data.category || "Kế toán - Thuế",
        tags: data.tags || [],
        readingTime: data.readingTime || "5 phút đọc",
        isNew: data.isNew || false,
        content,
      } as BlogPost;
    });

  // Sort posts by date descending
  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPathMd = path.join(BLOG_DIRECTORY, `${slug}.md`);
    const fullPathMdx = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
    
    let fullPath = fullPathMd;
    if (!fs.existsSync(fullPathMd)) {
      if (fs.existsSync(fullPathMdx)) {
        fullPath = fullPathMdx;
      } else {
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "/images/blog/placeholder.jpg",
      date: data.date || "",
      author: {
        name: data.author?.name || "Ban Biên Tập Sóc Sơn",
        avatar: data.author?.avatar || "/images/team/author-default.jpg",
        role: data.author?.role || "Chuyên gia Kế toán Thuế",
      },
      category: data.category || "Kế toán - Thuế",
      tags: data.tags || [],
      readingTime: data.readingTime || "5 phút đọc",
      isNew: data.isNew || false,
      content,
    };
  } catch (error) {
    console.error(`Error loading blog post [${slug}]:`, error);
    return null;
  }
}

export async function getBlogCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  return ["Tất cả", ...categories];
}

export async function getRelatedBlogPosts(currentSlug: string, category: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}
