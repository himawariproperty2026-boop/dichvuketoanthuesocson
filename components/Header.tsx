"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  MapPin,
  Clock,
  Search,
  Menu,
  X,
  ChevronDown,
  FileText,
  Building2,
  Calculator,
  RefreshCw,
  Receipt,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { siteConfig } from "@/lib/siteConfig";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const iconMap: Record<string, React.ReactNode> = {
    "ke-toan-thue-tron-goi": <FileText className="w-5 h-5 text-[#D7181F]" />,
    "thanh-lap-doanh-nghiep": <Building2 className="w-5 h-5 text-[#D7181F]" />,
    "quyet-toan-thue": <Calculator className="w-5 h-5 text-[#D7181F]" />,
    "thay-doi-dang-ky-kinh-doanh": <RefreshCw className="w-5 h-5 text-[#D7181F]" />,
    "hoan-thue-gtgt": <Receipt className="w-5 h-5 text-[#D7181F]" />,
    "tu-van-thue-ke-toan": <HelpCircle className="w-5 h-5 text-[#D7181F]" />,
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* TopBar Header - Mobile Touch Optimized */}
      <div className="bg-slate-100 border-b border-slate-200 text-xs text-slate-700 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 font-extrabold text-[#D7181F] hover:underline text-xs sm:text-sm"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Hotline 24/7: {siteConfig.contact.phoneDisplay}</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-[#04266F] flex-shrink-0" />
              <span className="line-clamp-1">Sóc Sơn: {siteConfig.contact.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="hidden sm:inline text-slate-500">
              MST: {siteConfig.contact.taxCode}
            </span>
            <a
              href={siteConfig.social.zaloPage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[11px] hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <span>Zalo Official</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo Mobile Scaled */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#D7181F] text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-xl tracking-tight text-[#04266F] leading-tight">
                KẾ TOÁN THUẾ <span className="text-[#D7181F]">SÓC SƠN</span>
              </span>
              <span className="text-[9px] sm:text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                Uy Tín - Chuyên Nghiệp - Trọn Gói
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                pathname === "/"
                  ? "text-[#D7181F] bg-red-50"
                  : "text-slate-800 hover:text-[#D7181F] hover:bg-slate-50"
              }`}
            >
              Trang chủ
            </Link>

            <Link
              href="/gioi-thieu"
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                pathname === "/gioi-thieu"
                  ? "text-[#D7181F] bg-red-50"
                  : "text-slate-800 hover:text-[#D7181F] hover:bg-slate-50"
              }`}
            >
              Giới thiệu
            </Link>

            {/* Dropdown Mega Menu for Services */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/dich-vu"
                className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors ${
                  pathname.startsWith("/dich-vu")
                    ? "text-[#D7181F] bg-red-50"
                    : "text-slate-800 hover:text-[#D7181F] hover:bg-slate-50"
                }`}
              >
                <span>Dịch vụ</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-[#D7181F]" : ""
                  }`}
                />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-2 space-y-1">
                    {siteConfig.services.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/dich-vu/${svc.slug}`}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-red-50 text-[#D7181F] group-hover:bg-[#D7181F] group-hover:text-white transition-colors">
                          {iconMap[svc.slug] || <FileText className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#D7181F]">
                            {svc.title}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {svc.shortDesc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/bang-gia"
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                pathname === "/bang-gia"
                  ? "text-[#D7181F] bg-red-50"
                  : "text-slate-800 hover:text-[#D7181F] hover:bg-slate-50"
              }`}
            >
              Bảng giá
            </Link>

            <Link
              href="/blog"
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                pathname.startsWith("/blog")
                  ? "text-[#D7181F] bg-red-50"
                  : "text-slate-800 hover:text-[#D7181F] hover:bg-slate-50"
              }`}
            >
              Blog / Tin tức
            </Link>

            <Link
              href="/lien-he"
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                pathname === "/lien-he"
                  ? "text-[#D7181F] bg-red-50"
                  : "text-slate-800 hover:text-[#D7181F] hover:bg-slate-50"
              }`}
            >
              Liên hệ
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/lien-he"
              className="px-5 py-2.5 rounded-xl bg-[#D7181F] hover:bg-[#B81117] text-white font-extrabold text-xs tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Tư vấn giải pháp</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button - Optimized 44x44px Touch Area */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden w-11 h-11 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[96px] z-50 bg-white/95 backdrop-blur-md overflow-y-auto pb-20 border-t border-slate-200 animate-fade-in lg:hidden">
          <div className="max-w-md mx-auto p-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-extrabold text-slate-900 hover:bg-red-50 hover:text-[#D7181F] transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="/gioi-thieu"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-extrabold text-slate-900 hover:bg-red-50 hover:text-[#D7181F] transition-colors"
            >
              Giới thiệu
            </Link>

            {/* Mobile Services Submenu */}
            <div className="space-y-1 pt-1">
              <Link
                href="/dich-vu"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 rounded-xl text-base font-extrabold text-[#D7181F] bg-red-50/70"
              >
                Dịch vụ trọn gói (6 Dịch vụ)
              </Link>
              <div className="pl-4 space-y-1 border-l-2 border-red-200 my-1">
                {siteConfig.services.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/dich-vu/${svc.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg text-xs font-bold text-slate-700 hover:text-[#D7181F] hover:bg-slate-50"
                  >
                    • {svc.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/bang-gia"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-extrabold text-slate-900 hover:bg-red-50 hover:text-[#D7181F] transition-colors"
            >
              Bảng giá 3 gói
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-extrabold text-slate-900 hover:bg-red-50 hover:text-[#D7181F] transition-colors"
            >
              Blog / Tin tức
            </Link>
            <Link
              href="/lien-he"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-extrabold text-slate-900 hover:bg-red-50 hover:text-[#D7181F] transition-colors"
            >
              Liên hệ
            </Link>

            {/* Mobile Call & Consultation CTA Buttons */}
            <div className="pt-4 space-y-3">
              <Link
                href="/lien-he"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[#D7181F] text-white font-extrabold text-center block text-sm shadow-md uppercase tracking-wider"
              >
                Đăng ký tư vấn miễn phí
              </Link>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="w-full py-3 rounded-xl bg-slate-100 text-slate-900 font-extrabold text-center block text-xs border border-slate-200"
              >
                Hotline: {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
