"use client";

import React, { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const FloatingButtons: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 pointer-events-none sm:bottom-6 sm:right-6">
      {/* Zalo Floating Button - 48x48px Touch Target */}
      <a
        href={siteConfig.social.zaloPage}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo hỗ trợ"
        className="pointer-events-auto w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform relative group"
      >
        <span className="font-black text-xs tracking-tighter">Zalo</span>
        <span className="hidden md:block absolute right-full mr-2 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Tư vấn Zalo 24/7
        </span>
      </a>

      {/* Phone Floating Button - 48x48px Touch Target */}
      <a
        href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
        aria-label="Gọi điện thoại ngay"
        className="pointer-events-auto w-12 h-12 rounded-full bg-[#D7181F] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform animate-pulse relative group"
      >
        <Phone className="w-6 h-6" />
        <span className="hidden md:block absolute right-full mr-2 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Hotline: {siteConfig.contact.phoneDisplay}
        </span>
      </a>

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="pointer-events-auto w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
