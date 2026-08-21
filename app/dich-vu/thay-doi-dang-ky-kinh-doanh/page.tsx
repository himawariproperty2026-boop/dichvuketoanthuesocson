import React from "react";
import Metadata from "next";
import Link from "next/link";
import { FileEdit } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactFormSection } from "@/components/ContactFormSection";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Dịch Vụ Thay Đổi Đăng Ký Kinh Doanh tại Sóc Sơn - Nhanh Chóng 24h",
  description:
    "Thay đổi tên công ty, địa chỉ trụ sở Sóc Sơn, tăng vốn điều lệ, bổ sung ngành nghề kinh doanh, thay người đại diện pháp luật trọn gói.",
};

export default function ThayDoiDangKyKinhDoanhPage() {
  const service = siteConfig.services[3];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-1">
        <section className="bg-slate-950 text-white py-14 sm:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <Link href="/" className="hover:text-amber-400">Trang chủ</Link>
              <span>/</span>
              <Link href="/dich-vu" className="hover:text-amber-400">Dịch vụ</Link>
              <span>/</span>
              <span className="text-amber-400 font-semibold">{service.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  Giá từ: {service.priceStarting}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Thay Đổi Đăng Ký Kinh Doanh Tại Sóc Sơn
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {service.shortDesc}
                </p>
                <div className="pt-2">
                  <Link href="#dang-ky-tuvan" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm">
                    Đăng Ký Thay Đổi ĐKKD
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 bg-slate-900 p-6 rounded-2xl border border-amber-500/30 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center mx-auto">
                  <FileEdit className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-white">Soạn Hồ Sơ Trong 24h</h3>
                <p className="text-xs text-slate-300">
                  Giao nhận kết quả tận tay chủ doanh nghiệp tại Sóc Sơn.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="dang-ky-tuvan" className="py-16 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading subtitle="Tư vấn thay đổi" title="Đăng Ký Thay Đổi Giấy Phép Kinh Doanh" dark />
            <div className="mt-10">
              <ContactFormSection />
            </div>
          </div>
        </section>
      </main>
      <FloatingButtons />
      <ContactPopup />
      <Footer />
    </div>
  );
}
