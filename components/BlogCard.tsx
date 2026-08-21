import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full">
      <div>
        {/* Cover Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-amber-400 text-xs font-bold border border-amber-500/30">
              {post.category}
            </span>
            {post.isNew && (
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3 fill-current" />
                MỚI
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {post.readingTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-navy-800 transition-colors line-clamp-2 mb-2.5 leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Author & Link */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-[10px]">
            {post.author.name[0]}
          </div>
          <span className="font-medium text-slate-700 truncate max-w-[120px]">
            {post.author.name}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-bold text-navy-800 group-hover:text-amber-600 flex items-center gap-1 transition-colors"
        >
          <span>Đọc bài viết</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
