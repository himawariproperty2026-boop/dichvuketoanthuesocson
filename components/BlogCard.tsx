import React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Cover Image & Category Tag */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D7181F] text-white text-[11px] font-extrabold shadow-md">
            {post.category}
          </div>
          {post.isNew && (
            <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              MỚI
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D7181F]" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D7181F]" />
              {post.readingTime}
            </span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#D7181F] transition-colors line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">
          {post.author.name}
        </span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-extrabold text-[#D7181F] group-hover:text-red-700 flex items-center gap-1"
        >
          <span>Đọc tiếp</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
