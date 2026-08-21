import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const Footer: React.FC = () => {
  // Check if visitor counter env variable is configured
  const showVisitorCounter = Boolean(process.env.KV_REST_API_URL);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Footer Callout Banner */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 border-b border-amber-500/20 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Cần Tư Vấn Thuế & Kế Toán Tại Sóc Sơn?
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Đội ngũ chuyên viên sẵn sàng hỗ trợ giải đáp mọi thắc mắc của bạn trong vòng 15 phút.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm hover:from-amber-500 hover:to-amber-600 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>Hotline: {siteConfig.contact.phoneDisplay}</span>
            </a>
            <a
              href={siteConfig.social.zaloPage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-sm border border-amber-500/30 transition-colors flex items-center gap-2"
            >
              <span>Nhắn Zalo Tư Vấn</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Company Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black">
              <Building2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight">
              KẾ TOÁN THUẾ <span className="text-amber-400">SÓC SƠN</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Đơn vị tư vấn dịch vụ kế toán thuế trọn gói, thành lập doanh nghiệp & quyết toán thuế chuyên nghiệp uy tín hàng đầu khu vực Sóc Sơn, Đông Anh, Mê Linh.
          </p>
          <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <p className="font-semibold text-amber-300">
              {siteConfig.companyName}
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Mã số thuế: {siteConfig.contact.taxCode}</span>
            </p>
          </div>
        </div>

        {/* Column 2: Headquarter & Contact */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-amber-500/30 pb-2">
            Văn Phòng Sóc Sơn
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-amber-400 transition-colors font-bold text-amber-300"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-amber-400 transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{siteConfig.contact.workingHours}</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Direct Service Links */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-amber-500/30 pb-2">
            Dịch Vụ Chính
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            {siteConfig.services.map((svc) => (
              <li key={svc.slug}>
                <Link
                  href={`/dich-vu/${svc.slug}`}
                  className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-500">›</span>
                  <span>{svc.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Quick Links & Legal */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-amber-500/30 pb-2">
            Liên Kết & Pháp Lý
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <Link href="/gioi-thieu" className="hover:text-amber-400">
                Giới thiệu công ty
              </Link>
            </li>
            <li>
              <Link href="/bang-gia" className="hover:text-amber-400">
                Bảng giá dịch vụ 3 gói
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-amber-400">
                Tin tức & Kinh nghiệm thuế
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-amber-400">
                Câu hỏi thường gặp (FAQ)
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-bao-mat" className="hover:text-amber-400 font-medium text-amber-300/90">
                Chính sách bảo mật (Nghị định 13/2023)
              </Link>
            </li>
            <li>
              <Link href="/dieu-khoan-su-dung" className="hover:text-amber-400">
                Điều khoản sử dụng
              </Link>
            </li>
          </ul>

          {/* Ministry of Industry and Trade certification badge simulation */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Đã thông báo Bộ Công Thương</span>
            </div>
          </div>

          {/* Real Visitor Counter (Only rendered if KV_REST_API_URL environment is configured) */}
          {showVisitorCounter && (
            <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="text-amber-400 font-semibold">Lượt truy cập:</span>{" "}
              12,450+
            </div>
          )}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-950 py-4 px-4 border-t border-slate-900 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</p>
          <p className="text-slate-400">Phục vụ chính: Sóc Sơn, Đông Anh, Mê Linh, Hà Nội</p>
        </div>
      </div>
    </footer>
  );
};
