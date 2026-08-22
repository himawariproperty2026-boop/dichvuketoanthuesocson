"use client";

import React, { useState, useEffect } from "react";
import { X, Gift, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const ContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [website_url, setWebsiteUrl] = useState(""); // Honeypot
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 8 seconds if not previously closed
    const timer = setTimeout(() => {
      const closed = sessionStorage.getItem("contact_popup_closed");
      if (!closed) {
        setIsOpen(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("contact_popup_closed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName || "Khách Hàng Popup Ưu Đãi",
          phone,
          service: "Đăng ký nhận ưu đãi 24h",
          website_url,
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitted(true);
      setTimeout(() => {
        window.open(siteConfig.social.zaloPage, "_blank");
      }, 500);
      setTimeout(() => {
        handleClose();
      }, 4000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 relative overflow-hidden">
        {/* Large Close Button Easy to Click on Mobile */}
        <button
          onClick={handleClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-lg cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-4">
            {/* Gift Icon & Header */}
            <div className="text-center pt-1">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D7181F] border border-red-200 flex items-center justify-center mx-auto text-2xl mb-3 shadow-xs">
                🎁
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">
                Khoan đã, <span className="text-[#D7181F]">đừng đi vội!</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5 font-medium">
                Đăng ký tư vấn ngay hôm nay để nhận ưu đãi đặc biệt:
              </p>
            </div>

            {/* Checklist items styled to match Image 1 design language */}
            <div className="space-y-2 py-1">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-50/60 border border-red-200 text-xs font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-[#D7181F] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                  ✓
                </span>
                <span>Giảm 10% phí dịch vụ tháng đầu</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-50/60 border border-red-200 text-xs font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-[#D7181F] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                  ✓
                </span>
                <span>Tặng Checklist thành lập công ty 2026 (PDF)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-50/60 border border-red-200 text-xs font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-[#D7181F] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                  ✓
                </span>
                <span>Tư vấn 1-1 với chuyên gia 17+ năm kinh nghiệm</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <input
                type="text"
                name="website_url"
                value={website_url}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="hidden"
                tabIndex={-1}
              />

              <input
                type="text"
                placeholder="Họ và tên *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#D7181F]"
              />

              <input
                type="tel"
                required
                placeholder="Số điện thoại *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#D7181F]"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#D7181F] hover:bg-[#B81117] text-white font-extrabold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                <span>🎁 NHẬN ƯU ĐÃI NGAY</span>
              </button>
            </form>

            <p className="text-[11px] text-center text-[#D7181F] font-extrabold flex items-center justify-center gap-1 pt-1">
              <span>⚡</span>
              <span>Ưu đãi chỉ có hiệu lực trong 24h</span>
            </p>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-lg">Đã Đăng Ký Thành Công!</h4>
            <p className="text-xs text-slate-600">
              Đang tự động chuyển hướng mở chat Zalo <span className="font-bold text-[#D7181F]">0979 065 067</span>...
            </p>
            <a
              href={siteConfig.social.zaloPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all mt-2"
            >
              💬 BẤM VÀO ĐÂY ĐỂ MỞ ZALO NGAY
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

