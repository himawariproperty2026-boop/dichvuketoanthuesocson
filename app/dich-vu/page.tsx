import React from "react";
import Metadata from "next";
import Link from "next/link";
import {
  FileText,
  Building2,
  Calculator,
  RefreshCw,
  Receipt,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
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
  const iconMap: Record<string, React.ReactNode> = {
    "ke-toan-thue-tron-goi": <FileText className="w-6 h-6 text-[#D7181F]" />,
    "thanh-lap-doanh-nghiep": <Building2 className="w-6 h-6 text-[#D7181F]" />,
    "quyet-toan-thue": <Calculator className="w-6 h-6 text-[#D7181F]" />,
    "thay-doi-dang-ky-kinh-doanh": <RefreshCw className="w-6 h-6 text-[#D7181F]" />,
    "hoan-thue-gtgt": <Receipt className="w-6 h-6 text-[#D7181F]" />,
    "tu-van-thue-ke-toan": <HelpCircle className="w-6 h-6 text-[#D7181F]" />,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {/* Banner Hero */}
        <section className="bg-pastel-hero py-14 sm:py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4 font-semibold">
              <Link href="/" className="hover:text-[#D7181F]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#D7181F] font-bold">Dịch vụ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Danh Mục Dịch Vụ <span className="text-[#D7181F]">Kế Toán Thuế Sóc Sơn</span>
            </h1>

            <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Giải pháp toàn diện từ thủ tục pháp lý ban đầu đến nghiệp vụ kế toán chuyên sâu và giải trình đoàn thanh tra thuế.
            </p>
          </div>
        </section>

        {/* 6 Core Services Grid */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteConfig.services.map((svc) => (
                <ServiceCard key={svc.slug} service={svc} icon={iconMap[svc.slug]} />
              ))}
            </div>
          </div>
        </section>

        {/* Quality Commitments Banner */}
        <section className="py-14 bg-slate-50 text-slate-900 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              {/* PLACEHOLDER - Cần xác nhận chính sách phạt/bồi thường thật với chủ doanh nghiệp trước khi launch */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-50 text-[#D7181F] font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Cam Kết Trách Nhiệm</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Chịu trách nhiệm giải trình và xử lý số liệu nghiệp vụ theo đúng hợp đồng dịch vụ.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-50 text-[#D7181F] font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Tiết Kiệm 80% Chi Phí</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Chi phí chỉ từ 500.000đ/tháng, không lo chi phí thưởng lễ tết hay bảo hiểm nhân sự.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-50 text-[#D7181F] font-bold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Nhận Chứng Từ Tận Nơi</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Chuyên viên chủ động đến tận kho/xưởng tại Sóc Sơn nhận chứng từ gốc hàng tháng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form CTA */}
        <section id="dang-ky" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Đăng ký dịch vụ"
              title="Nhận Báo Giá Trọn Gói Theo Yêu Cầu"
              description="Để lại thông tin, chuyên viên kế toán sẽ gửi báo giá trọn gói phù hợp nhất"
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
