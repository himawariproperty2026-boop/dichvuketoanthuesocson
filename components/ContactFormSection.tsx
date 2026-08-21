"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, Send, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const ContactFormSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactForm, setContactForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: siteConfig.services[0].title,
    message: "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Anti-spam bot trap
    if (!contactForm.fullName || !contactForm.phone) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactForm,
          source: "HomepageForm",
          website_url: honeypot,
        }),
      });

      if (res.ok) {
        setFormSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Form Input Container */}
      <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl">
        {formSubmitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">
              Cảm ơn Quý khách đã gửi thông tin!
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Đội ngũ chuyên viên Kế toán Thuế Sóc Sơn đã nhận được yêu cầu. Chúng tôi sẽ gọi điện hỗ trợ tư vấn qua SĐT{" "}
              <strong className="text-amber-400">{contactForm.phone}</strong> sớm nhất.
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm"
            >
              Gửi thêm yêu cầu khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Anti-spam honeypot field */}
            <input
              type="text"
              name="website_url"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Họ và tên <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn Hùng"
                  value={contactForm.fullName}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full bg-slate-900 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Số điện thoại <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0987 654 321"
                  value={contactForm.phone}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      phone: e.target.value,
                    })
                  }
                  className="w-full bg-slate-900 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Dịch vụ cần tư vấn
              </label>
              <select
                value={contactForm.service}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    service: e.target.value,
                  })
                }
                className="w-full bg-slate-900 text-white text-sm px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
              >
                {siteConfig.services.map((svc) => (
                  <option key={svc.slug} value={svc.title}>
                    {svc.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ghi chú / Yêu cầu cụ thể
              </label>
              <textarea
                rows={3}
                placeholder="Mô tả sơ qua tình hình doanh nghiệp hoặc câu hỏi của bạn..."
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    message: e.target.value,
                  })
                }
                className="w-full bg-slate-900 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Đang gửi thông tin...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>GỬI YÊU CẦU TƯ VẤN NGAY</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-400 pt-1">
              🔒 Thông tin của bạn được bảo mật tuyệt đối theo Nghị định 13/2023/NĐ-CP.
            </p>
          </form>
        )}
      </div>

      {/* Sidebar Channels & Google Maps Embed */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-400" />
            Kênh Tư Vấn Trực Tiếp
          </h4>

          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
            className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Hotline 24/7</div>
              <div className="text-base font-bold text-amber-400">
                {siteConfig.contact.phoneDisplay}
              </div>
            </div>
          </a>

          <a
            href={siteConfig.social.zaloPage}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500 text-white font-bold flex items-center justify-center text-xs">
              ZALO
            </div>
            <div>
              <div className="text-xs text-slate-400">Chat Zalo Official</div>
              <div className="text-sm font-bold text-white">
                Hỗ trợ nhanh trong 15 phút
              </div>
            </div>
          </a>

          <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{siteConfig.contact.address}</span>
            </p>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 h-60 shadow-lg">
          <iframe
            src={siteConfig.contact.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Văn phòng Dịch vụ Kế toán Thuế Sóc Sơn"
          />
        </div>
      </div>
    </div>
  );
};
