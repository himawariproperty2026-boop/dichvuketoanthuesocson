import fs from "fs";
import os from "os";
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
const TMP_BLOG_STORE_PATH = path.join(os.tmpdir(), "ketoansocson-n8n-blogs.json");
export const KV_BLOG_HASH_KEY = "n8n_blog_posts";
const DEFAULT_N8N_STORAGE_WEBHOOK =
  process.env.N8N_STORAGE_WEBHOOK_URL ||
  "https://n8n.facebookflow.io.vn/webhook/ketoanthuesocson-blogs";

const globalForBlog = globalThis as unknown as {
  __n8nBlogStore?: Record<string, BlogPost>;
};

function getMemoryStore(): Record<string, BlogPost> {
  if (!globalForBlog.__n8nBlogStore) {
    globalForBlog.__n8nBlogStore = {};
  }
  return globalForBlog.__n8nBlogStore;
}

function readTmpStore(): Record<string, BlogPost> {
  try {
    if (fs.existsSync(TMP_BLOG_STORE_PATH)) {
      const raw = fs.readFileSync(TMP_BLOG_STORE_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, BlogPost>;
      }
    }
  } catch {
    // Ignore tmp read errors
  }
  return {};
}

function writeTmpStore(store: Record<string, BlogPost>): boolean {
  try {
    fs.writeFileSync(TMP_BLOG_STORE_PATH, JSON.stringify(store), "utf8");
    return true;
  } catch {
    return false;
  }
}

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
    category: String(data.category || "Kế toán - Thuế").split("|")[0].trim(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: data.readingTime || "6 phút đọc",
    isNew: Boolean(data.isNew),
    content,
    blocks,
    faqs,
  };
}

async function fetchKvBlogPosts(): Promise<BlogPost[]> {
  const kvUrl = process.env.KV_REST_API_URL?.replace(/\/$/, "");
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (!kvUrl || !kvToken) return [];

  try {
    const res = await fetch(`${kvUrl}/hgetall/${KV_BLOG_HASH_KEY}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
      next: { revalidate: 30 },
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

async function fetchN8nServerBlogPosts(): Promise<BlogPost[]> {
  if (!DEFAULT_N8N_STORAGE_WEBHOOK) return [];
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(DEFAULT_N8N_STORAGE_WEBHOOK, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data?.posts)
      ? data.posts
      : Array.isArray(data)
        ? data
        : [];
    return list.filter((p: unknown): p is BlogPost =>
      Boolean(p && typeof p === "object" && (p as BlogPost).slug && (p as BlogPost).title)
    );
  } catch {
    return [];
  }
}

/**
 * Save a published blog post directly to the website storage (Memory + Runtime Cache + Local Disk if writable + User's n8n Server)
 * without going through GitHub.
 */
export async function saveDirectPublishedPost(
  post: BlogPost,
  markdownFileContent: string
): Promise<{ savedTargets: string[]; warnings: string[] }> {
  const savedTargets: string[] = [];
  const warnings: string[] = [];

  // 1. Save to in-memory runtime store & /tmp store (works immediately on both Vercel & VPS)
  const memStore = getMemoryStore();
  const tmpStore = readTmpStore();
  const mergedStore: Record<string, BlogPost> = {
    ...tmpStore,
    ...memStore,
    [post.slug]: post,
  };
  globalForBlog.__n8nBlogStore = mergedStore;
  savedTargets.push("web_memory_cache");

  if (writeTmpStore(mergedStore)) {
    savedTargets.push("web_disk_cache");
  }

  // 2. If content/blog is writable (self-hosted VPS / local server), write .md file directly
  try {
    if (!fs.existsSync(BLOG_DIRECTORY)) {
      fs.mkdirSync(BLOG_DIRECTORY, { recursive: true });
    }
    fs.writeFileSync(
      path.join(BLOG_DIRECTORY, `${post.slug}.md`),
      markdownFileContent,
      "utf8"
    );
    savedTargets.push("content_blog_dir");
  } catch {
    // Expected on read-only serverless container (/var/task)
  }

  // 3. Optional Upstash KV if configured
  const kvUrl = process.env.KV_REST_API_URL?.replace(/\/$/, "");
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(kvUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          "HSET",
          KV_BLOG_HASH_KEY,
          post.slug,
          JSON.stringify(post),
        ]),
      });
      if (res.ok) {
        savedTargets.push("upstash_kv");
      }
    } catch (e) {
      warnings.push(e instanceof Error ? e.message : String(e));
    }
  }

  // 4. Sync back to user's n8n server storage webhook (if active) so user's server DB persists all posts
  if (DEFAULT_N8N_STORAGE_WEBHOOK) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      const syncRes = await fetch(DEFAULT_N8N_STORAGE_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", post }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (syncRes.ok) {
        savedTargets.push("n8n_server_db");
      }
    } catch {
      // Non-fatal if webhook is not yet activated
    }
  }

  return { savedTargets, warnings };
}

/**
 * Data Access Layer for Blog Posts
 * Reads local Markdown files + direct web runtime store + user's n8n server storage (Zero GitHub dependency).
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const postMap = new Map<string, BlogPost>();

  // 1. Built-in / local Markdown files
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

  // 2. Direct web disk cache (/tmp) & memory cache
  const tmpStore = readTmpStore();
  const memStore = getMemoryStore();
  for (const post of Object.values({ ...tmpStore, ...memStore })) {
    if (post?.slug && post?.title) {
      postMap.set(post.slug, post);
    }
  }

  // 3. User's n8n server persistent storage & optional KV
  const [n8nPosts, kvPosts] = await Promise.all([
    fetchN8nServerBlogPosts(),
    fetchKvBlogPosts(),
  ]);

  for (const n8nPost of n8nPosts) {
    postMap.set(n8nPost.slug, n8nPost);
    memStore[n8nPost.slug] = n8nPost;
  }

  for (const kvPost of kvPosts) {
    postMap.set(kvPost.slug, kvPost);
    memStore[kvPost.slug] = kvPost;
  }

  return Array.from(postMap.values()).sort((a, b) => {
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // 1. Check direct memory & /tmp store first (0ms latency for newly pushed articles)
    const memStore = getMemoryStore();
    if (memStore[slug]) {
      return memStore[slug];
    }
    const tmpStore = readTmpStore();
    if (tmpStore[slug]) {
      memStore[slug] = tmpStore[slug];
      return tmpStore[slug];
    }

    // 2. Check local content/blog directory
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

    // 3. Check user's n8n server storage & optional KV
    const allDynamic = await Promise.all([
      fetchN8nServerBlogPosts(),
      fetchKvBlogPosts(),
    ]);
    for (const list of allDynamic) {
      for (const item of list) {
        if (item.slug === slug) {
          memStore[slug] = item;
          writeTmpStore({ ...tmpStore, ...memStore });
          return item;
        }
      }
    }

    return null;
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
