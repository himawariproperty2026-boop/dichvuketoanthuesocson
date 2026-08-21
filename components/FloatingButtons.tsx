"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, ArrowUp, Send } from "lucide-react";
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
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Zalo Floating Button */}
      <a
        href={siteConfig.social.zaloPage}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo hỗ trợ"
        className="pointer-events-auto w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
      >
        <span className="font-extrabold text-xs">Zalo</span>
        <span className="absolute right-full mr-2 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Tư vấn Zalo 24/7
        </span>
      </a>

      {/* Phone Floating Button */}
      <a
        href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
        aria-label="Gọi điện thoại ngay"
        className="pointer-events-auto w-12 h-12 rounded-full bg-[#D7181F] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse relative group"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-full mr-2 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Hotline: {siteConfig.contact.phoneDisplay}
        </span>
      </a>

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="pointer-events-auto w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md hover:bg-slate-700 transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
