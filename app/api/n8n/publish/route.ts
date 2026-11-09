import crypto from "crypto";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { siteConfig } from "@/lib/siteConfig";
import {
  BlogContentBlock,
  BlogPost,
  blocksToMarkdown,
  extractFaqsFromBlocks,
  saveDirectPublishedPost,
} from "@/lib/blog";

const DEFAULT_N8N_API_KEY = "n8n_secret_token_2026_ketoansocson";

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

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/n8n/publish",
    website: siteConfig.url,
    mode: "direct_web_publish_no_github",
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
        ? payload.category.split("|")[0].trim()
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

    const { savedTargets, warnings } = await saveDirectPublishedPost(
      post,
      markdownFileContent
    );

    // Revalidate Next.js cached routes immediately
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");

    const articleUrl = `${siteConfig.url}/blog/${slug}`;

    return NextResponse.json({
      success: true,
      message: "Published blog post directly to website.",
      slug,
      url: articleUrl,
      savedTargets,
      warnings: warnings.length > 0 ? warnings : undefined,
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
