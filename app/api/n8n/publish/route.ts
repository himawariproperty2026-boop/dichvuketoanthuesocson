import fs from "fs";
import path from "path";
import crypto from "crypto";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { siteConfig } from "@/lib/siteConfig";
import {
  BlogContentBlock,
  BlogPost,
  KV_BLOG_HASH_KEY,
  blocksToMarkdown,
  extractFaqsFromBlocks,
} from "@/lib/blog";

const DEFAULT_N8N_API_KEY = "n8n_secret_token_2026_ketoansocson";
const DEFAULT_GITHUB_REPO = "himawariproperty2026-boop/dichvuketoanthuesocson";
const DEFAULT_GITHUB_BRANCH = "main";

function toSafeSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidApiKey(provided: string | null): boolean {
  if (!provided) return false;
  const expected = process.env.N8N_API_KEY || DEFAULT_N8N_API_KEY;
  const a = Buffer.from(provided.trim());
  const b = Buffer.from(expected.trim());
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

async function saveToUpstashKv(post: BlogPost): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL?.replace(/\/$/, "");
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (!kvUrl || !kvToken) return false;

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

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upstash KV HSET failed (${res.status}): ${errText}`);
  }
  return true;
}

async function commitMarkdownToGitHub(
  slug: string,
  markdownFileContent: string,
  title: string,
  headerGithubToken?: string | null
): Promise<{ committed: boolean; commitUrl?: string }> {
  const githubToken = process.env.GITHUB_TOKEN || headerGithubToken?.trim();
  if (!githubToken) return { committed: false };

  const repo = process.env.GITHUB_REPO || DEFAULT_GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || DEFAULT_GITHUB_BRANCH;
  const filePath = `content/blog/${slug}.md`;
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  const commonHeaders: Record<string, string> = {
    Authorization: `Bearer ${githubToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "MinhHoaProtax-n8n-Publisher",
  };

  // Check if file already exists to retrieve SHA for idempotent update
  let existingSha: string | undefined;
  const checkRes = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, {
    method: "GET",
    headers: commonHeaders,
    cache: "no-store",
  });

  if (checkRes.ok) {
    const existingData = await checkRes.json();
    if (existingData?.sha) {
      existingSha = existingData.sha;
    }
  }

  const putBody: Record<string, unknown> = {
    message: `feat(blog): auto-publish SEO article "${title}" (${slug})`,
    content: Buffer.from(markdownFileContent, "utf8").toString("base64"),
    branch,
  };
  if (existingSha) {
    putBody.sha = existingSha;
  }

  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      ...commonHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(putBody),
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    throw new Error(`GitHub Contents API PUT failed (${putRes.status}): ${errText}`);
  }

  const putJson = await putRes.json();
  return {
    committed: true,
    commitUrl: putJson?.commit?.html_url,
  };
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/n8n/publish",
    website: siteConfig.url,
    storageConfigured: {
      github: Boolean(process.env.GITHUB_TOKEN),
      upstashKv: Boolean(
        process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
      ),
      localFilesystem: process.env.VERCEL !== "1",
    },
  });
}

export async function POST(request: Request) {
  try {
    const apiKeyHeader =
      request.headers.get("x-api-key") ||
      request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
      null;

    if (!isValidApiKey(apiKeyHeader)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid or missing x-api-key." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const payload = body?.data && typeof body.data === "object" ? body.data : body;

    const title = typeof payload?.title === "string" ? payload.title.trim() : "";
    const excerpt =
      typeof payload?.excerpt === "string" ? payload.excerpt.trim() : "";
    const rawSlug =
      typeof payload?.slug === "string" && payload.slug.trim()
        ? payload.slug.trim()
        : title;
    const slug = toSafeSlug(rawSlug);

    if (!title || !slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: 'title' and valid 'slug'.",
        },
        { status: 400 }
      );
    }

    const rawContent = payload?.content;
    const blocks: BlogContentBlock[] | undefined = Array.isArray(rawContent)
      ? (rawContent as BlogContentBlock[])
      : undefined;
    const markdownBody = blocks
      ? blocksToMarkdown(blocks)
      : typeof rawContent === "string"
        ? rawContent.trim()
        : "";

    if (!markdownBody) {
      return NextResponse.json(
        {
          success: false,
          error: "Article content is empty (expected block array or markdown string).",
        },
        { status: 400 }
      );
    }

    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const coverImage =
      typeof payload?.image === "string" && payload.image.trim()
        ? payload.image.trim()
        : typeof payload?.coverImage === "string" && payload.coverImage.trim()
          ? payload.coverImage.trim()
          : "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&h=630&q=80";

    const category =
      typeof payload?.category === "string" && payload.category.trim()
        ? payload.category.trim()
        : "Kinh nghiệm kế toán";

    const authorName =
      typeof payload?.author === "string" && payload.author.trim()
        ? payload.author.trim()
        : payload?.author?.name || "Ban Biên Tập Minh Hoá Protax";

    const readingTime =
      typeof payload?.read_time === "string" && payload.read_time.trim()
        ? payload.read_time.trim()
        : typeof payload?.readingTime === "string" && payload.readingTime.trim()
          ? payload.readingTime.trim()
          : "7 phút đọc";

    const tags: string[] = Array.isArray(payload?.tags)
      ? payload.tags.map((t: unknown) => String(t).trim()).filter(Boolean)
      : [category, "Kế toán Thuế Sóc Sơn", "Minh Hoá Protax"];

    const faqs = Array.isArray(payload?.faqs)
      ? payload.faqs
      : extractFaqsFromBlocks(blocks);

    const post: BlogPost = {
      slug,
      title,
      excerpt:
        excerpt ||
        `Cập nhật hướng dẫn thực tế về ${title.toLowerCase()} dành cho doanh nghiệp và hộ kinh doanh tại Sóc Sơn, Hà Nội.`,
      coverImage,
      date: today,
      author: {
        name: authorName,
        role: "Chuyên gia Kế toán - Thuế Minh Hoá Protax",
        avatar: "/images/team/author-default.jpg",
      },
      category,
      tags,
      readingTime,
      isNew: true,
      content: markdownBody,
      blocks,
      faqs,
    };

    const frontmatterData: Record<string, unknown> = {
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      category: post.category,
      author: post.author,
      coverImage: post.coverImage,
      readingTime: post.readingTime,
      isNew: true,
      tags: post.tags,
    };
    if (blocks && blocks.length > 0) {
      frontmatterData.blocks = blocks;
    }
    if (faqs && faqs.length > 0) {
      frontmatterData.faqs = faqs;
    }

    const markdownFileContent = matter.stringify(markdownBody, frontmatterData);

    const savedTargets: string[] = [];
    const storageErrors: string[] = [];

    // 1. Save to Upstash KV (instant live availability)
    try {
      const savedKv = await saveToUpstashKv(post);
      if (savedKv) savedTargets.push("upstash_kv");
    } catch (kvErr) {
      storageErrors.push(
        kvErr instanceof Error ? kvErr.message : String(kvErr)
      );
    }

    // 2. Commit Markdown file to GitHub repository (permanent Git storage + Vercel build)
    let commitUrl: string | undefined;
    try {
      const ghResult = await commitMarkdownToGitHub(
        slug,
        markdownFileContent,
        title,
        request.headers.get("x-github-token")
      );
      if (ghResult.committed) {
        savedTargets.push("github_repo");
        commitUrl = ghResult.commitUrl;
      }
    } catch (ghErr) {
      storageErrors.push(
        ghErr instanceof Error ? ghErr.message : String(ghErr)
      );
    }

    // 3. Write directly to local/VPS filesystem if writable (non-Vercel or dev)
    if (process.env.VERCEL !== "1") {
      try {
        const blogDir = path.join(process.cwd(), "content/blog");
        if (!fs.existsSync(blogDir)) {
          fs.mkdirSync(blogDir, { recursive: true });
        }
        fs.writeFileSync(
          path.join(blogDir, `${slug}.md`),
          markdownFileContent,
          "utf8"
        );
        savedTargets.push("local_fs");
      } catch (fsErr) {
        storageErrors.push(
          fsErr instanceof Error ? fsErr.message : String(fsErr)
        );
      }
    }

    if (savedTargets.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Không thể lưu bài viết trên môi trường Serverless vì chưa cấu hình biến môi trường lưu trữ. Vui lòng thêm GITHUB_TOKEN (khuyên dùng) hoặc KV_REST_API_URL + KV_REST_API_TOKEN trên Vercel.",
          details: storageErrors,
        },
        { status: 500 }
      );
    }

    // Revalidate Next.js cached routes
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");

    const articleUrl = `${siteConfig.url}/blog/${slug}`;

    return NextResponse.json({
      success: true,
      message: "Published blog post successfully.",
      slug,
      url: articleUrl,
      savedTargets,
      commitUrl,
      warnings: storageErrors.length > 0 ? storageErrors : undefined,
      publishedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in POST /api/n8n/publish:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal server error while publishing blog post.",
      },
      { status: 500 }
    );
  }
}
