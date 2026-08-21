"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronDown,
  Calculator,
  Building2,
  FileCheck2,
  FileEdit,
  Coins,
  ShieldAlert,
  Search,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Building2,
  FileCheck2,
  FileEdit,
  Coins,
  ShieldAlert,
};

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300">
      {/* Top Header Contact Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium text-amber-300"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Hotline 24/7: {siteConfig.contact.phoneDisplay}</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span className="truncate max-w-xs xl:max-w-none">
                Sóc Sơn: {siteConfig.contact.address.split(",")[0]}
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{siteConfig.contact.workingHours}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-slate-400">
              MST: {siteConfig.contact.taxCode}
            </span>
            <a
              href={siteConfig.social.zaloPage}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors border border-amber-500/30"
            >
              Zalo Official
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-amber-500/20 py-2.5"
            : "bg-slate-900 border-b border-slate-800 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Calculator className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                KẾ TOÁN THUẾ <span className="text-amber-400">SÓC SƠN</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wider uppercase">
                Uy Tín - Chuyên Nghiệp - Trọn Gói
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              const hasChildren = Boolean(item.children);

              if (hasChildren) {
                return (
                  <div key={item.name} className="relative group py-2">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        isActive || pathname.startsWith("/dich-vu")
                          ? "text-amber-400 bg-slate-800/80"
                          : "text-slate-200 hover:text-amber-400 hover:bg-slate-800/50"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-amber-400" />
                    </Link>

                    {/* Mega Dropdown Menu */}
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-80 z-50">
                      <div className="bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-3 grid gap-1 backdrop-blur-xl">
                        <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 mb-1">
                          Danh mục dịch vụ
                        </div>
                        {item.children?.map((sub) => {
                          const IconComponent =
                            sub.name.includes("Kế toán")
                              ? Calculator
                              : sub.name.includes("Thành lập")
                              ? Building2
                              : sub.name.includes("Quyết toán")
                              ? FileCheck2
                              : sub.name.includes("Thay đổi")
                              ? FileEdit
                              : sub.name.includes("Hoàn thuế")
                              ? Coins
                              : ShieldAlert;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800 transition-colors group/sub"
                            >
                              <div className="p-2 rounded-md bg-slate-800 text-amber-400 group-hover/sub:bg-amber-500 group-hover/sub:text-slate-950 transition-colors mt-0.5">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-100 group-hover/sub:text-amber-400 transition-colors">
                                  {sub.name}
                                </div>
                                <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                  {sub.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-amber-400 bg-slate-800/80"
                      : "text-slate-200 hover:text-amber-400 hover:bg-slate-800/50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              title="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Primary CTA Button */}
            <Link
              href="/lien-he"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 group"
            >
              <span>Tư vấn giải pháp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-amber-400 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay Bar */}
        {searchOpen && (
          <div className="max-w-7xl mx-auto px-4 pt-3 pb-2 border-t border-slate-800 animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ, bài viết kế toán thuế..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 text-white placeholder-slate-400 text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-2.5 text-xs text-amber-400 font-semibold px-2 py-0.5 rounded bg-slate-700"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col overflow-y-auto animate-fadeIn">
          {/* Mobile Drawer Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black">
                <Calculator className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-white text-base">
                Kế toán Thuế <span className="text-amber-400">Sóc Sơn</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Drawer Body */}
          <div className="p-4 flex-1 space-y-3">
            {siteConfig.navigation.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.name}
                    className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden"
                  >
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full p-3.5 flex items-center justify-between text-slate-100 font-bold text-base"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-amber-400 transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileServicesOpen && (
                      <div className="p-2 pt-0 space-y-1 border-t border-slate-800 bg-slate-950/50">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block p-2.5 rounded-lg text-sm text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 font-medium"
                          >
                            <div className="font-bold text-slate-200">
                              {sub.name}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {sub.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block p-3.5 rounded-xl font-bold text-base transition-colors ${
                    pathname === item.href
                      ? "bg-amber-400 text-slate-950"
                      : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Drawer Footer CTA */}
          <div className="p-4 border-t border-slate-800 bg-slate-900 space-y-3">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="w-full py-3 rounded-xl bg-slate-800 text-amber-400 font-bold text-center flex items-center justify-center gap-2 border border-amber-500/30"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              <span>Gọi tư vấn: {siteConfig.contact.phoneDisplay}</span>
            </a>

            <Link
              href="/lien-he"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-center block shadow-lg"
            >
              Đăng ký tư vấn giải pháp
            </Link>

            <div className="text-center text-xs text-slate-400 pt-1">
              Địa chỉ: {siteConfig.contact.address}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
