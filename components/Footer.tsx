import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Users,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

import { siteConfig } from "@/lib/siteConfig";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#04266F] text-slate-200 border-t-4 border-[#D7181F] text-sm">
      {/* Upper Footer Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Info & Address */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D7181F] text-white flex items-center justify-center font-black text-xl shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight text-white leading-none">
                  KẾ TOÁN THUẾ <span className="text-red-400">SÓC SƠN</span>
                </span>
                <span className="text-[10px] text-slate-300 font-semibold tracking-wider uppercase mt-1">
                  Chuyên Nghiệp - Uy Tín - Trọn Gói
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed">
              Đơn vị cung cấp giải pháp kế toán thuế, quyết toán BCTC và thành lập công ty hàng đầu cho doanh nghiệp nhỏ và hộ kinh doanh tại khu vực Sóc Sơn, Mê Linh, Đông Anh.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Trụ sở: {siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Hotline: <strong className="text-white">{siteConfig.contact.phoneDisplay}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Email: {siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Mã số thuế: {siteConfig.contact.taxCode}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base border-b border-blue-800 pb-2">
              Dịch Vụ Trọng Tâm
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {siteConfig.services.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/dich-vu/${svc.slug}`}
                    className="hover:text-red-300 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                    <span>{svc.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation & Legal */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base border-b border-blue-800 pb-2">
              Thông Tin & Pháp Lý
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/gioi-thieu" className="hover:text-red-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                  <span>Về chúng tôi</span>
                </Link>
              </li>
              <li>
                <Link href="/bang-gia" className="hover:text-red-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                  <span>Bảng giá 3 gói dịch vụ</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                  <span>Blog kinh nghiệm thuế</span>
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-red-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                  <span>Chính sách bảo mật (NĐ 13/2023)</span>
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung" className="hover:text-red-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                  <span>Điều khoản sử dụng</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Commitments & Certification */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base border-b border-blue-800 pb-2">
              Cam Kết Dịch Vụ
            </h3>
            <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span>Trách Nhiệm Hợp Đồng</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Trực tiếp làm việc và chịu trách nhiệm giải trình số liệu nghiệp vụ theo đúng điều khoản hợp đồng dịch vụ.
              </p>
            </div>

            {/* Ministry of Industry and Trade Mock Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-bold text-white">
                <Award className="w-4 h-4 text-red-400" />
                <span>Đã thông báo Bộ Công Thương</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-blue-950 py-4 border-t border-blue-900 text-xs text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {currentYear} <strong>{siteConfig.companyName}</strong>. Bản quyền thuộc về {siteConfig.domain}.
          </div>
          <div className="text-[11px] text-slate-400">
            Phục vụ khu vực Sóc Sơn, Mê Linh, Đông Anh, Nội Bài & Hà Nội
          </div>
        </div>
      </div>
    </footer>
  );
};
