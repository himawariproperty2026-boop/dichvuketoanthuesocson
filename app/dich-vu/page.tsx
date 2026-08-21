import React from "react";
import Metadata from "next";
import Link from "next/link";
import {
  Calculator,
  Building2,
  FileCheck2,
  FileEdit,
  Coins,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactFormSection } from "@/components/ContactFormSection";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Dịch Vụ Kế Toán Thuế Sóc Sơn - Thành Lập Công Ty & Quyết Toán Thuế",
  description:
    "Tổng hợp 6 dịch vụ kế toán thuế trọn gói, thành lập doanh nghiệp, quyết toán thuế, hoàn thuế GTGT uy tín hàng đầu tại Sóc Sơn, Đông Anh, Mê Linh, KCN Nội Bài.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {/* Banner Hero Services */}
        <section className="bg-slate-950 text-white py-14 sm:py-20 border-b border-slate-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-4">
              <Link href="/" className="hover:text-amber-400">
                Trang chủ
              </Link>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Dịch vụ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Tất Cả Dịch Vụ Kế Toán Thuế & Pháp Lý{" "}
              <span className="text-amber-400">Tại Sóc Sơn</span>
            </h1>

            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Giải pháp kế toán thuế trọn gói chuyên nghiệp, minh bạch, tối ưu chi phí giúp hộ kinh doanh và doanh nghiệp tại Sóc Sơn hoàn toàn yên tâm phát triển.
            </p>
          </div>
        </section>

        {/* 6 Services Grid */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Giải pháp toàn diện"
              title="6 Dịch Vụ Kế Toán Thuế Trọn Gói Sóc Sơn"
              description="Báo giá công khai minh bạch, cam kết nộp phạt 100% nếu phát sinh lỗi từ nghiệp vụ kế toán"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {siteConfig.services.map((svc) => (
                <ServiceCard key={svc.slug} service={svc} featured={svc.popular} />
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Banner */}
        <section className="py-14 bg-slate-900 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              {/* PLACEHOLDER - Cần xác nhận chính sách phạt/bồi thường thật với chủ doanh nghiệp trước khi launch */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-400 text-slate-950 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Cam Kết Trách Nhiệm</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Chịu trách nhiệm giải trình và xử lý số liệu nghiệp vụ theo đúng hợp đồng dịch vụ.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-400 text-slate-950 font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Nhận Hồ Sơ Tận Nơi</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Nhân viên giao nhận chứng từ hóa đơn tận nơi tại Sóc Sơn, Mê Linh, Đông Anh.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-400 text-slate-950 font-bold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Tư Vấn 24/7</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Phản hồi giải đáp rủi ro thuế cho chủ doanh nghiệp qua Zalo trong 15 phút.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="dang-ky" className="py-16 md:py-24 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Tư vấn nhanh"
              title="Đăng Ký Tư Vấn Dịch Vụ Kế Toán Sóc Sơn"
              description="Để lại thông tin, chuyên viên sẽ liên hệ lại hỗ trợ miễn phí trong 15 phút"
              dark
            />
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
