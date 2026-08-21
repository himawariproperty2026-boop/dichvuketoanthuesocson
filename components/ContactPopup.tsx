"use client";

import React, { useState, useEffect } from "react";
import { X, Phone, Send, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const ContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    service: siteConfig.services[0].title,
  });

  useEffect(() => {
    // Check session storage so we don't annoy users who already closed it
    const popupDismissed = sessionStorage.getItem("contact_popup_dismissed");
    if (popupDismissed) return;

    // Show popup after 8 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("contact_popup_dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Anti-spam bot trap
    if (!formData.fullName || !formData.phone) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "ContactPopup",
          website_url: honeypot, // Honeypot field
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      {/* Overlay Backdrop click to close */}
      <div
        className="absolute inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Main Popup Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 animate-scaleUp">
        {/* Prominent Mobile-Friendly Close Button X */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors border border-slate-700 shadow-md active:scale-95"
          aria-label="Đóng popup"
          title="Đóng popup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-navy-800 to-navy-900 p-5 pr-14 border-b border-amber-500/20">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Chuyên viên hỗ trợ trong 15 phút</span>
          </div>
          <h3 className="text-xl font-bold text-white leading-snug">
            Nhận Tư Vấn Kế Toán & Thuế Sóc Sơn Miễn Phí
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Để lại thông tin, kế toán trưởng của chúng tôi sẽ gọi lại tư vấn giải pháp tối ưu chi phí nhất.
          </p>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">
                Gửi Thông Tin Thành Công!
              </h4>
              <p className="text-sm text-slate-300">
                Chuyên viên Kế toán Sóc Sơn sẽ gọi lại cho quý khách qua SĐT{" "}
                <strong className="text-amber-400">{formData.phone}</strong> trong vòng 15 phút.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-500"
              >
                Đã hiểu
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam Honeypot field (hidden from real users) */}
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Họ và tên của bạn <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full bg-slate-800 text-white placeholder-slate-500 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Số điện thoại Zalo / Gọi <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0987 654 321"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-slate-800 text-white placeholder-slate-500 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Dịch vụ quan tâm
                </label>
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full bg-slate-800 text-white text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
                >
                  {siteConfig.services.map((svc) => (
                    <option key={svc.slug} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="Dịch vụ khác">Dịch vụ khác / Tư vấn chung</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {loading ? (
                  <span>Đang gửi...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ĐĂNG KÝ TƯ VẤN NGAY</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between gap-2 pt-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Bảo mật 100% theo Nghị định 13
                </span>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  Gọi nhanh: {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
