"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "Kế toán thuế trọn gói",
    message: "",
    website_url: "", // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Đã ghi nhận thông tin! Đang tự động kết nối mở ứng dụng Zalo 0979 065 067...");

        // Auto open Zalo chat 0979065067
        setTimeout(() => {
          window.open(siteConfig.social.zaloPage, "_blank");
        }, 600);

        setFormData({
          fullName: "",
          phone: "",
          email: "",
          service: "Kế toán thuế trọn gói",
          message: "",
          website_url: "",
        });
      } else {
        setErrorMsg(data.error || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (err) {
      setErrorMsg("Không thể gửi dữ liệu. Vui lòng kiểm tra lại kết nối mạng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Sidebar Info */}
      <div className="lg:col-span-5 bg-[#04266F] text-white rounded-3xl p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-xl">
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase border border-red-500/30">
            Hỗ trợ tức thì
          </span>
          <h3 className="text-2xl font-black tracking-tight leading-tight">
            Liên Hệ Với Kế Toán Thuế Sóc Sơn
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Chuyên viên kế toán trưởng sẽ gọi lại tư vấn miễn phí giải pháp tối ưu chi phí thuế tốt nhất cho doanh nghiệp của bạn trong 15 phút.
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-200 border-t border-blue-800/80 pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/30 text-red-400 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Hotline 24/7</div>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="font-extrabold text-base text-white hover:text-red-400"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/30 text-red-400 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Địa chỉ Sóc Sơn</div>
              <div className="font-semibold text-white">
                {siteConfig.contact.address}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/30 text-red-400 mt-0.5">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Email làm việc</div>
              <div className="font-semibold text-white">
                {siteConfig.contact.email}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 text-xs text-slate-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-red-400" />
          <span>Bảo mật dữ liệu chuẩn Nghị định 13/2023</span>
        </div>
      </div>

      {/* Main Form */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot Spam Trap */}
          <input
            type="text"
            name="website_url"
            value={formData.website_url}
            onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {successMsg && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
              <a
                href={siteConfig.social.zaloPage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm transition-all"
              >
                <span>💬 Bấm VÀO ĐÂY ĐỂ TRỰC TIẾP CHAT ZALO (0979 065 067)</span>
              </a>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Họ và tên <span className="text-[#D7181F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Văn An"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#D7181F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Số điện thoại / Zalo <span className="text-[#D7181F]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="Ví dụ: 0979065067"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#D7181F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email (không bắt buộc)
              </label>
              <input
                type="email"
                placeholder="email@doanhnghiep.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#D7181F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Dịch vụ quan tâm
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#D7181F]"
              >
                <option value="Kế toán thuế trọn gói">Kế toán thuế trọn gói</option>
                <option value="Thành lập doanh nghiệp">Thành lập doanh nghiệp</option>
                <option value="Quyết toán thuế">Quyết toán thuế BCTC</option>
                <option value="Thay đổi ĐKKD">Thay đổi ĐKKD</option>
                <option value="Hoàn thuế GTGT">Hoàn thuế GTGT</option>
                <option value="Tư vấn kế toán thuế">Tư vấn thuế kế toán</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tình trạng doanh nghiệp / Lời nhắn
            </label>
            <textarea
              rows={3}
              placeholder="Mô tả sơ lược quy mô hóa đơn hoặc thắc mắc của bạn..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#D7181F]"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#D7181F] hover:bg-[#B81117] text-white font-black text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? "Đang gửi thông tin..." : "GỬI YÊU CẦU TƯ VẤN MIỄN PHÍ"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
