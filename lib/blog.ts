import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogContentBlock {
  type: "heading" | "subheading" | "paragraph" | "list" | "alert";
  text?: string;
  items?: string[];
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

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
  blocks?: BlogContentBlock[];
  faqs?: BlogFaqItem[];
}

const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");
export const KV_BLOG_HASH_KEY = "n8n_blog_posts";
const DEFAULT_GITHUB_REPO =
  process.env.GITHUB_REPO || "himawariproperty2026-boop/dichvuketoanthuesocson";
const DEFAULT_GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

/**
 * Convert structured JSON content blocks (from n8n workflow) into clean Markdown
 */
export function blocksToMarkdown(blocks: BlogContentBlock[]): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";

  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
          return `## ${(block.text || "").trim()}`;
        case "subheading":
          return `### ${(block.text || "").trim()}`;
        case "list":
          if (!Array.isArray(block.items) || block.items.length === 0) return "";
          return block.items.map((item) => `- ${String(item).trim()}`).join("\n");
        case "alert":
          return `> **Lưu ý quan trọng:** ${(block.text || "").trim()}`;
        case "paragraph":
        default:
          return (block.text || "").trim();
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Extract FAQ pairs from structured blocks (under "Câu hỏi thường gặp (FAQ)" heading)
 */
export function extractFaqsFromBlocks(blocks?: BlogContentBlock[]): BlogFaqItem[] {
  if (!Array.isArray(blocks) || blocks.length === 0) return [];

  const faqs: BlogFaqItem[] = [];
  let inFaqSection = false;
  let currentQuestion = "";

  for (const block of blocks) {
    if (block.type === "heading") {
      const headingText = (block.text || "").toLowerCase();
      inFaqSection =
        headingText.includes("faq") || headingText.includes("câu hỏi thường gặp");
      currentQuestion = "";
      continue;
    }

    if (!inFaqSection) continue;

    if (block.type === "subheading" && block.text) {
      currentQuestion = block.text.replace(/^\d+[\.\)]\s*/, "").trim();
    } else if (block.type === "paragraph" && currentQuestion && block.text) {
      faqs.push({
        question: currentQuestion,
        answer: block.text.trim(),
      });
      currentQuestion = "";
    }
  }

  return faqs;
}

function parsePostFromMarkdown(slug: string, fileContents: string): BlogPost {
  const { data, content } = matter(fileContents);
  const blocks = Array.isArray(data.blocks) ? (data.blocks as BlogContentBlock[]) : undefined;
  const faqs = Array.isArray(data.faqs)
    ? (data.faqs as BlogFaqItem[])
    : extractFaqsFromBlocks(blocks);

  return {
    slug,
    title: data.title || "Bài viết kế toán thuế",
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "/images/blog/placeholder.jpg",
    date: data.date || new Date().toISOString().split("T")[0],
    author: {
      name:
        typeof data.author === "string"
          ? data.author
          : data.author?.name || "Ban Biên Tập Minh Hoá Protax",
      avatar: data.author?.avatar || "/images/team/author-default.jpg",
      role: data.author?.role || "Chuyên gia Kế toán Thuế",
    },
    category: data.category || "Kế toán - Thuế",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: data.readingTime || "6 phút đọc",
    isNew: Boolean(data.isNew),
    content,
    blocks,
    faqs,
  };
}

/**
 * Optional Upstash Redis / Vercel KV reader so posts published via /api/n8n/publish
 * appear immediately even before a static rebuild finishes.
 */
async function fetchKvBlogPosts(): Promise<BlogPost[]> {
  const kvUrl = process.env.KV_REST_API_URL?.replace(/\/$/, "");
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (!kvUrl || !kvToken) return [];

  try {
    const res = await fetch(`${kvUrl}/hgetall/${KV_BLOG_HASH_KEY}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const payload = await res.json();
    const rawList: string[] = Array.isArray(payload?.result) ? payload.result : [];

    const posts: BlogPost[] = [];
    for (let i = 0; i < rawList.length; i += 2) {
      const rawJson = rawList[i + 1];
      if (!rawJson) continue;
      try {
        const parsed = JSON.parse(rawJson) as BlogPost;
        if (parsed?.slug && parsed?.title) {
          posts.push(parsed);
        }
      } catch {
        // Ignore malformed entry
      }
    }
    return posts;
  } catch {
    return [];
  }
}

async function fetchKvBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const kvUrl = process.env.KV_REST_API_URL?.replace(/\/$/, "");
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (!kvUrl || !kvToken) return null;

  try {
    const res = await fetch(
      `${kvUrl}/hget/${KV_BLOG_HASH_KEY}/${encodeURIComponent(slug)}`,
      {
        headers: { Authorization: `Bearer ${kvToken}` },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const payload = await res.json();
    if (!payload?.result || typeof payload.result !== "string") return null;
    return JSON.parse(payload.result) as BlogPost;
  } catch {
    return null;
  }
}

async function fetchGithubBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const safeSlug = String(slug || "").replace(/[^a-z0-9-]/gi, "");
  if (!safeSlug) return null;

  const ghHeaders: Record<string, string> = {
    Accept: "application/vnd.github.raw+json",
    "User-Agent": "MinhHoaProtax-Blog-Reader",
  };
  if (process.env.GITHUB_TOKEN) {
    ghHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  // 1. Try GitHub Contents API (instant 0-second update after /api/n8n/publish commits)
  try {
    const apiUrl = `https://api.github.com/repos/${DEFAULT_GITHUB_REPO}/contents/content/blog/${encodeURIComponent(
      safeSlug
    )}.md?ref=${encodeURIComponent(DEFAULT_GITHUB_BRANCH)}`;
    const res = await fetch(apiUrl, {
      headers: ghHeaders,
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const markdownText = await res.text();
      if (markdownText && markdownText.includes("---")) {
        return parsePostFromMarkdown(safeSlug, markdownText);
      }
    }
  } catch {
    // Fallback to raw.githubusercontent.com below
  }

  // 2. Fallback to raw.githubusercontent.com
  try {
    const rawUrl = `https://raw.githubusercontent.com/${DEFAULT_GITHUB_REPO}/${encodeURIComponent(
      DEFAULT_GITHUB_BRANCH
    )}/content/blog/${encodeURIComponent(safeSlug)}.md`;
    const res = await fetch(rawUrl, { next: { revalidate: 30 } });
    if (res.ok) {
      const markdownText = await res.text();
      if (markdownText && markdownText.includes("---")) {
        return parsePostFromMarkdown(safeSlug, markdownText);
      }
    }
  } catch {
    // Ignore
  }

  return null;
}

async function fetchGithubMissingBlogPosts(
  existingSlugs: Set<string>
): Promise<BlogPost[]> {
  try {
    const ghHeaders: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "MinhHoaProtax-Blog-Reader",
    };
    if (process.env.GITHUB_TOKEN) {
      ghHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const listUrl = `https://api.github.com/repos/${DEFAULT_GITHUB_REPO}/contents/content/blog?ref=${encodeURIComponent(
      DEFAULT_GITHUB_BRANCH
    )}`;
    const res = await fetch(listUrl, {
      headers: ghHeaders,
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];

    const items = await res.json();
    if (!Array.isArray(items)) return [];

    const missingSlugs: string[] = [];
    for (const item of items) {
      if (
        item &&
        typeof item.name === "string" &&
        (item.name.endsWith(".md") || item.name.endsWith(".mdx"))
      ) {
        const slug = item.name.replace(/\.mdx?$/, "");
        if (!existingSlugs.has(slug)) {
          missingSlugs.push(slug);
        }
      }
    }

    if (missingSlugs.length === 0) return [];

    const fetched = await Promise.all(
      missingSlugs.slice(0, 15).map((slug) => fetchGithubBlogPostBySlug(slug))
    );
    return fetched.filter((p): p is BlogPost => p !== null);
  } catch {
    return [];
  }
}

/**
 * Data Access Layer for Blog Posts
 * Reads local Markdown (.md / .mdx) files from /content/blog/, merges live KV posts,
 * and falls back to GitHub repository contents so newly published n8n posts go live immediately.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const postMap = new Map<string, BlogPost>();

  if (fs.existsSync(BLOG_DIRECTORY)) {
    const fileNames = fs.readdirSync(BLOG_DIRECTORY);
    for (const fileName of fileNames) {
      if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) continue;
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(BLOG_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      postMap.set(slug, parsePostFromMarkdown(slug, fileContents));
    }
  }

  const kvPosts = await fetchKvBlogPosts();
  for (const kvPost of kvPosts) {
    postMap.set(kvPost.slug, kvPost);
  }

  const githubPosts = await fetchGithubMissingBlogPosts(new Set(postMap.keys()));
  for (const ghPost of githubPosts) {
    postMap.set(ghPost.slug, ghPost);
  }

  return Array.from(postMap.values()).sort((a, b) => {
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const kvPost = await fetchKvBlogPostBySlug(slug);
    if (kvPost) {
      return kvPost;
    }

    const fullPathMd = path.join(BLOG_DIRECTORY, `${slug}.md`);
    const fullPathMdx = path.join(BLOG_DIRECTORY, `${slug}.mdx`);

    if (fs.existsSync(fullPathMd)) {
      const fileContents = fs.readFileSync(fullPathMd, "utf8");
      return parsePostFromMarkdown(slug, fileContents);
    }
    if (fs.existsSync(fullPathMdx)) {
      const fileContents = fs.readFileSync(fullPathMdx, "utf8");
      return parsePostFromMarkdown(slug, fileContents);
    }

    // Live fallback to GitHub for articles published after the current Vercel build
    return await fetchGithubBlogPostBySlug(slug);
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

export async function getRelatedBlogPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  const sameCategory = posts.filter(
    (post) => post.slug !== currentSlug && post.category === category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = posts.filter(
    (post) => post.slug !== currentSlug && post.category !== category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
