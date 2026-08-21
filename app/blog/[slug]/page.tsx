import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { BlogCard } from "@/components/BlogCard";
import { ContactFormSection } from "@/components/ContactFormSection";
import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogPosts } from "@/lib/blog";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  return {
    title: `${post.title} | Kế Toán Thuế Sóc Sơn`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(slug, post.category, 3);

  const articleSchema = getArticleSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Trang chủ", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="flex-1">
        {/* Article Hero */}
        <section className="bg-pastel-hero py-12 sm:py-16 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4 font-semibold">
              <Link href="/" className="hover:text-[#D7181F]">Trang chủ</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#D7181F]">Blog</Link>
              <span>/</span>
              <span className="text-[#D7181F] font-bold line-clamp-1">{post.title}</span>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#D7181F] text-xs font-extrabold mb-3 border border-red-200">
              {post.category}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Post Metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D7181F] text-white font-bold flex items-center justify-center text-xs">
                  {post.author.name[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{post.author.name}</div>
                  <div className="text-[11px] text-slate-500">{post.author.role}</div>
                </div>
              </div>

              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5 font-semibold">
                <Calendar className="w-4 h-4 text-[#D7181F]" />
                <span>{post.date}</span>
              </div>

              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-4 h-4 text-[#D7181F]" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Body */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Cover Image */}
            <div className="rounded-2xl overflow-hidden mb-10 border border-slate-200 shadow-md">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full max-h-[450px] object-cover"
              />
            </div>

            {/* Markdown Body Content Render */}
            <div className="prose prose-lg max-w-none text-slate-800 leading-relaxed whitespace-pre-line space-y-4">
              {post.content}
            </div>

            {/* Post Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Thẻ bài viết:
                </span>
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Back Button */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#04266F] hover:bg-blue-900 text-white font-bold text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại danh sách bài viết</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-14 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Bài Viết Liên Quan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <BlogCard key={rPost.slug} post={rPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Form CTA */}
        <section id="dang-ky" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900">
                Cần Tư Vấn Kế Toán Thuế Trực Tiếp Tại Sóc Sơn?
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Để lại thông tin, chuyên viên tư vấn sẽ liên hệ lại hỗ trợ miễn phí trong 15 phút
              </p>
            </div>
            <ContactFormSection />
          </div>
        </section>
      </main>

      <FloatingButtons />
      <ContactPopup />
      <Footer />
    </div>
  );
}
