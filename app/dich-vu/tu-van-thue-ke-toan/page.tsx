import React from "react";
import Metadata from "next";
import Link from "next/link";
import { HelpCircle, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactFormSection } from "@/components/ContactFormSection";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Dịch Vụ Tư Vấn Thuế & Kế Toán Chuyên Sâu tại Sóc Sơn",
  description:
    "Tư vấn hoạch định chiến lược thuế, cấu trúc chi phí hợp pháp, xử lý rủi ro hóa đơn và chuyển đổi hộ kinh doanh lên doanh nghiệp tại Sóc Sơn.",
};

export default function TuVanThueKeToanPage() {
  const service = siteConfig.services[5];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {/* Banner Hero */}
        <section className="bg-pastel-hero py-14 sm:py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-semibold">
              <Link href="/" className="hover:text-[#D7181F]">Trang chủ</Link>
              <span>/</span>
              <Link href="/dich-vu" className="hover:text-[#D7181F]">Dịch vụ</Link>
              <span>/</span>
              <span className="text-[#D7181F] font-bold">{service.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="px-3.5 py-1 rounded-full bg-red-50 text-[#D7181F] text-xs font-bold border border-red-200">
                  Giá: {service.priceStarting}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                  Tư Vấn Thuế & Kế Toán <span className="text-[#D7181F]">Chuyên Sâu Sóc Sơn</span>
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="pt-2">
                  <Link
                    href="#dang-ky-tuvan"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D7181F] hover:bg-[#B81117] text-white font-extrabold text-sm shadow-md transition-all"
                  >
                    <span>Tư Vấn Trực Tiếp Với Kế Toán Trưởng</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-soft text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#D7181F] font-bold flex items-center justify-center mx-auto">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Chiến Lược An Toàn</h3>
                <p className="text-xs text-slate-600">
                  Hoạch định chi phí hợp lý hợp lệ, phòng ngừa triệt để rủi ro bị truy thu thuế.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Nội dung tư vấn"
              title="Phạm Vi Tư Vấn Thuế & Quản Trị Chi Phí"
            />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.highlights.map((h, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-800 text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form CTA */}
        <section id="dang-ky-tuvan" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading subtitle="Đặt lịch tư vấn" title="Đăng Ký Tư Vấn Trực Tiếp Với Chuyên Gia" />
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
