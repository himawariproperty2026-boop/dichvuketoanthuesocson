"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, ArrowUp, Send } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const FloatingButtons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 items-end select-none pointer-events-none">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/90 text-amber-400 hover:bg-amber-400 hover:text-slate-950 shadow-lg border border-amber-500/30 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95"
          title="Lên đầu trang"
          aria-label="Lên đầu trang"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Messenger Button */}
      <a
        href={siteConfig.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group flex items-center"
        aria-label="Chat Messenger"
      >
        <span className="hidden sm:inline-block mr-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700">
          Facebook Messenger
        </span>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95 border-2 border-white/20">
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </a>

      {/* Zalo Button */}
      <a
        href={siteConfig.social.zaloPage}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group flex items-center"
        aria-label="Chat Zalo"
      >
        <span className="hidden sm:inline-block mr-2 px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 text-xs font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700">
          Tư vấn Zalo ngay
        </span>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-transform group-hover:scale-110 active:scale-95 border-2 border-white/20 relative">
          <span className="font-extrabold tracking-tighter">Zalo</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
        </div>
      </a>

      {/* Hotline Call Button */}
      <a
        href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
        className="pointer-events-auto group flex items-center"
        aria-label="Gọi điện thoại hotline"
      >
        <span className="hidden sm:inline-block mr-2 px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 text-xs font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700">
          {siteConfig.contact.phoneDisplay}
        </span>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95 border-2 border-amber-300 animate-pulse">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </div>
      </a>
    </div>
  );
};
