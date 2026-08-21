"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Phone, ShieldCheck, CheckCircle2 } from "lucide-react";
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
          fullName: fullName || "Khách Hàng Popup",
          phone,
          service: "Nhận báo giá nhanh 8s",
          website_url,
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 2500);
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#D7181F] text-xs font-bold border border-red-200">
              <ShieldCheck className="w-4 h-4" />
              <span>Tư vấn miễn phí tại Sóc Sơn</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 leading-tight">
              Nhận Báo Giá Kế Toán Thuế Trọn Gói Trong 15 Phút
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Để lại số điện thoại, Kế toán trưởng Sóc Sơn sẽ gọi lại báo giá trọn gói miễn phí không phát sinh chi phí ẩn.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
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
                placeholder="Họ và tên của bạn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#D7181F]"
              />

              <input
                type="tel"
                required
                placeholder="Số điện thoại / Zalo *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#D7181F]"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#D7181F] hover:bg-[#B81117] text-white font-extrabold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>GỬI YÊU CẦU BÁO GIÁ NGAY</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-lg">Đã Gửi Thành Công!</h4>
            <p className="text-xs text-slate-600">
              Chuyên viên Sóc Sơn sẽ gọi lại cho bạn qua số {phone} trong 15 phút.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
