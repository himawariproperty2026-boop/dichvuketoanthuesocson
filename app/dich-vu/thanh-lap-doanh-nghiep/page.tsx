import React from "react";
import Metadata from "next";
import Link from "next/link";
import { Building2, CheckCircle2, ShieldCheck, Clock, ArrowRight, FileCheck } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactFormSection } from "@/components/ContactFormSection";
import { FaqAccordionItem } from "@/components/FaqAccordionItem";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Dịch Vụ Thành Lập Doanh Nghiệp tại Sóc Sơn - Cấp Tốc 3-5 Ngày",
  description:
    "Thành lập công ty TNHH, Cổ phần trọn gói tại Sóc Sơn. Cấp GPKD, con dấu tận nơi trong 3-5 ngày. Tặng chữ ký số, hóa đơn điện tử và kê khai thuế ban đầu.",
};

export default function ThanhLapDoanhNghiepPage() {
  const service = siteConfig.services[1];

  const processSteps = [
    { step: 1, title: "Tư vấn ban đầu", desc: "Tư vấn đặt tên công ty, chọn ngành nghề kinh doanh, mức vốn điều lệ và mô hình công ty (TNHH 1TV, 2TV, Cổ phần)." },
    { step: 2, title: "Soạn hồ sơ trọn gói", desc: "Chuyên viên soạn thảo đầy đủ bộ hồ sơ chuẩn quy định trong 24h và gửi bạn ký tận nơi tại Sóc Sơn." },
    { step: 3, title: "Nộp & Nhận kết quả", desc: "Nộp hồ sơ lên Sở Kế hoạch & Đầu tư Hà Nội, theo dõi cấp GPKD và khắc con dấu tròn công ty." },
    { step: 4, title: "Giao kết quả & Khai thuế", desc: "Giao ĐKKD + Con dấu tận nơi Sóc Sơn, mở TK ngân hàng, cài chữ ký số và hỗ trợ thủ tục thuế ban đầu miễn phí." }
  ];

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
                  Giá trọn gói từ: {service.priceStarting}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Thành Lập Công Ty Trọn Gói Tại Sóc Sơn (3-5 Ngày)
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {service.shortDesc}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="#dang-ky-tuvan"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm hover:from-amber-500 hover:to-amber-600 shadow-lg"
                  >
                    Đăng Ký Thành Lập Công Ty
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900 p-6 rounded-2xl border border-amber-500/30 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center mx-auto">
                  <Building2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-white">Giao Kết Quả Tận Nơi</h3>
                <p className="text-xs text-slate-300">
                  Giao Giấy ĐKKD + Con dấu tròn tận nhà tại Sóc Sơn, Mê Linh, Đông Anh.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Stepper */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Quy trình 4 bước"
              title="Quy Trình Thành Lập Doanh Nghiệp Nhanh Chóng"
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {processSteps.map((p) => (
                <div key={p.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center">
                    0{p.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="dang-ky-tuvan" className="py-16 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading subtitle="Tư vấn miễn phí" title="Đăng Ký Thành Lập Doanh Nghiệp Sóc Sơn" dark />
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
