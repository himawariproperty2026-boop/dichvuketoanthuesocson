import React from "react";
import Metadata from "next";
import Link from "next/link";
import { Award, ShieldCheck, TrendingUp, Users, CheckCircle2, Building2 } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { StatCounter } from "@/components/StatCounter";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Giới Thiệu Về Dịch Vụ Kế Toán Thuế Sóc Sơn - 10+ Năm Uy Tín",
  description:
    "Tìm hiểu tầm nhìn, sứ mệnh, đội ngũ nhân sự và năng lực chuyên môn 10+ năm kinh nghiệm của Dịch vụ Kế toán Thuế Sóc Sơn.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-slate-950 text-white py-14 sm:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-4">
              <Link href="/" className="hover:text-amber-400">Trang chủ</Link>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Giới thiệu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Giới Thiệu <span className="text-amber-400">Kế Toán Thuế Sóc Sơn</span>
            </h1>

            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Hơn 10 năm đồng hành cùng hàng trăm hộ kinh doanh và doanh nghiệp tại Sóc Sơn, Mê Linh, Đông Anh. Uy tín - Chuyên nghiệp - Bảo mật.
            </p>
          </div>
        </section>

        {/* Company Vision & Mission */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                  Giá trị cốt lõi
                </span>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  Tận Tâm - Tốc Độ - Minh Bạch - Bảo Mật
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Chúng tôi hiểu rõ những rủi ro và khó khăn về sổ sách báo cáo thuế mà các doanh nghiệp nhỏ phải đối mặt. Vì vậy, giải pháp dịch vụ trọn gói của chúng tôi được thiết kế để mang đến sự an tâm tuyệt đối với chi phí hợp lý nhất.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Đội ngũ Kế toán trưởng am hiểu sâu địa bàn và luật thuế</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Nhận chứng từ và bàn giao sổ sách tận nhà tại Sóc Sơn</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Chịu trách nhiệm pháp lý giải trình số liệu với cơ quan thuế</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                    alt="Đội ngũ Kế toán Thuế Sóc Sơn"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.stats.map((st) => (
                <StatCounter
                  key={st.id}
                  value={st.value}
                  suffix={st.suffix}
                  label={st.label}
                  description={st.description}
                />
              ))}
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
