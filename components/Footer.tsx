import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  Send,
} from "lucide-react";

import { siteConfig } from "@/lib/siteConfig";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-white overflow-hidden border-t-4 border-[#D7181F] text-sm bg-gradient-to-r from-[#07193F] via-[#153478] via-60% to-[#990F16] to-100%">
      {/* Top Newsletter & Company Header Bar (Inspired by An Khang Image 2) */}
      <div className="border-b border-white/15 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#D7181F] flex items-center justify-center font-black text-xl shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg tracking-wide uppercase text-white">
                {siteConfig.companyName}
              </h2>
              <p className="text-xs text-slate-200">
                Uy tín - Chuyên nghiệp - Bảo mật - Chịu trách nhiệm 100%
              </p>
            </div>
          </div>

          {/* Newsletter Input Box */}
          <div className="w-full md:w-auto flex items-center gap-2 max-w-md">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Nhập email nhận thông tin..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white placeholder-slate-300 text-xs focus:outline-none focus:border-white"
              />
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-white text-[#D7181F] hover:bg-slate-100 font-black text-xs uppercase tracking-wider shadow-md whitespace-nowrap transition-transform hover:scale-105 cursor-pointer">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1: Headquarters Contact Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-bold text-white text-base border-b border-white/20 pb-2">
              Trụ Sở Sóc Sơn & Liên Hệ
            </h3>

            <div className="space-y-3 text-xs text-slate-200 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-300 flex-shrink-0 mt-0.5" />
                <span><strong>Địa chỉ:</strong> {siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-300 flex-shrink-0" />
                <span><strong>Email:</strong> {siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-300 flex-shrink-0" />
                <span>
                  <strong>Hotline:</strong>{" "}
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="text-white font-extrabold text-sm hover:underline"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-300 flex-shrink-0" />
                <span><strong>Mã số thuế:</strong> {siteConfig.contact.taxCode}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-bold text-white text-base border-b border-white/20 pb-2">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              <li>
                <Link href="/" className="hover:text-red-200 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-300" />
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-red-200 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-300" />
                  <span>Giới thiệu công ty</span>
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-red-200 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-300" />
                  <span>Dịch vụ trọn gói</span>
                </Link>
              </li>
              <li>
                <Link href="/bang-gia" className="hover:text-red-200 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-300" />
                  <span>Bảng giá 3 gói dịch vụ</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-200 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-300" />
                  <span>Blog tin tức & kinh nghiệm</span>
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-red-200 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-300" />
                  <span>Liên hệ trực tiếp</span>
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-red-200 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-300" />
                  <span>Chính sách bảo mật (NĐ 13/2023)</span>
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung" className="hover:text-red-200 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-300" />
                  <span>Điều khoản sử dụng</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For You / Key Services (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-white text-base border-b border-white/20 pb-2">
              Dành Cho Bạn
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {siteConfig.services.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/dich-vu/${svc.slug}`}
                    className="hover:text-red-200 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-300" />
                    <span>{svc.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Card CTA Feature Box (3 Cols - Inspired by An Khang Card) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white text-slate-900 p-5 shadow-2xl relative overflow-hidden space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                An tâm pháp lý & thuế
              </div>
              <h4 className="font-black text-slate-900 text-lg leading-tight">
                An tâm tài chính ngay từ hôm nay
              </h4>
              <p className="text-xs text-slate-600">
                Nhận tư vấn miễn phí từ đội ngũ Kế toán trưởng Sóc Sơn trong 15 phút.
              </p>

              <Link
                href="/lien-he"
                className="w-full py-2.5 rounded-xl bg-[#D7181F] hover:bg-[#B81117] text-white font-extrabold text-xs block text-center shadow-md transition-all uppercase tracking-wide"
              >
                Tư vấn miễn phí
              </Link>

              {/* Consultant Photo Background Overlay */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                <span>Miễn phí nhận hồ sơ Sóc Sơn</span>
                <span className="font-bold text-[#D7181F]">Hotline 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Certification Bar */}
      <div className="bg-black/30 py-4 border-t border-white/10 text-xs text-slate-300 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {currentYear} <strong>{siteConfig.companyName}</strong>. MST: {siteConfig.contact.taxCode}. Bản quyền thuộc về {siteConfig.domain}.
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-[11px] font-bold text-white border border-white/20">
              <Award className="w-3.5 h-3.5 text-red-300" />
              <span>Bộ Công Thương</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-[11px] font-bold text-white border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NĐ 13/2023 Schutz</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
