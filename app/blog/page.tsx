import React from "react";
import Metadata from "next";
import Link from "next/link";
import { Search, Sparkles, BookOpen } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogCard } from "@/components/BlogCard";
import { getAllBlogPosts, getBlogCategories } from "@/lib/blog";

export const metadata = {
  title: "Blog Kinh Nghiệm Kế Toán - Thuế Sóc Sơn Mới Nhất",
  description:
    "Tổng hợp bài viết hướng dẫn thuế, luật doanh nghiệp, kinh nghiệm làm sổ sách kế toán và thủ tục thành lập công ty tại Sóc Sơn.",
};

export default async function BlogListPage() {
  const posts = await getAllBlogPosts();
  const categories = await getBlogCategories();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-slate-950 text-white py-14 sm:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-4">
              <Link href="/" className="hover:text-amber-400">Trang chủ</Link>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Blog Tin tức</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Tin Tức & Kinh Nghiệm <span className="text-amber-400">Kế Toán Thuế Sóc Sơn</span>
            </h1>

            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Cập nhật các chính sách thuế mới nhất năm 2026, hướng dẫn thủ tục pháp lý và mẹo tối ưu chi phí hợp pháp cho doanh nghiệp tại Sóc Sơn.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Category Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    idx === 0
                      ? "bg-slate-900 text-amber-400 shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <FloatingButtons />
      <ContactPopup />
      <Footer />
    </div>
  );
}
