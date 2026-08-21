import React from "react";
import Metadata from "next";
import Link from "next/link";
import {
  Calculator,
  CheckCircle2,
  ShieldCheck,
  Clock,
  ArrowRight,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactFormSection } from "@/components/ContactFormSection";
import { FaqAccordionItem } from "@/components/FaqAccordionItem";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Dịch Vụ Kế Toán Thuế Trọn Gói tại Sóc Sơn - Uy Tín, Đúng Luật",
  description:
    "Dịch vụ kế toán thuế trọn gói cho hộ kinh doanh và công ty tại Sóc Sơn. Thay thế bộ máy kế toán nội bộ, tối ưu 80% chi phí, cam kết nộp phạt 100% nếu sai sót.",
};

export default function KeToanThueTronGoiPage() {
  const service = siteConfig.services[0];

  const workItems = [
    {
      stage: "Hàng tháng / Hàng quý",
      tasks: [
        "Tiếp nhận và rà soát tính hợp lệ của hóa đơn chứng từ đầu vào, đầu ra",
        "Lập tờ khai thuế Giá trị gia tăng (GTGT) hàng tháng/quý",
        "Lập tờ khai thuế Thu nhập cá nhân (TNCN) hàng tháng/quý",
        "Báo cáo tình hình sử dụng hóa đơn điện tử",
        "Tạm tính thuế Thu nhập doanh nghiệp (TNDN) quý",
        "Gửi thông báo số thuế phải nộp và hỗ trợ nộp thuế điện tử",
      ],
    },
    {
      stage: "Cuối năm (Quyết toán thuế & BCTC)",
      tasks: [
        "Lập Báo cáo tài chính (BCTC) năm chuẩn theo Chế độ Kế toán Thông tư 133 / 200",
        "Lập Tờ khai quyết toán thuế TNDN và Quyết toán thuế TNCN năm",
        "In ấn, đóng quyển đầy đủ các loại sổ sách kế toán (Sổ cái, sổ chi tiết, nhật ký chung...)",
        "Lưu trữ file dữ liệu kế toán an toàn và bàn giao tận nơi cho chủ doanh nghiệp",
      ],
    },
    {
      stage: "Tư vấn & Trách nhiệm pháp lý",
      tasks: [
        "Cảnh báo rủi ro hóa đơn đầu vào, chi phí không hợp lệ",
        "Tư vấn giải pháp cân đối doanh thu - chi phí tối ưu thuế hợp pháp",
        "Trực tiếp giải trình và tiếp đoàn kiểm tra thuế thay cho doanh nghiệp",
        "Cam kết chịu trách nhiệm giải trình số liệu kế toán và xử lý nghiệp vụ theo đúng điều khoản hợp đồng (* PLACEHOLDER - cần xác nhận chính sách phạt thật với chủ DN trước khi launch)",
      ],
    },
  ];

  const targetAudience = [
    "Doanh nghiệp mới thành lập tại Sóc Sơn chưa có kế toán trưởng",
    "Công ty vừa và nhỏ (SMEs) muốn tiết kiệm 80% chi phí tuyển kế toán nội bộ",
    "Hộ kinh doanh cá thể đang muốn minh bạch sổ sách hoặc chuẩn bị chuyển đổi lên công ty",
    "Doanh nghiệp lo lắng rủi ro sổ sách cũ bị sai sót khi thanh kiểm tra thuế",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {/* Banner Hero */}
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
                  Dịch Vụ Kế Toán Thuế Trọn Gói Tại Sóc Sơn
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {service.shortDesc}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="#dang-ky-tuvam"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm hover:from-amber-500 hover:to-amber-600 shadow-lg"
                  >
                    Đăng Ký Tư Vấn Ngay
                  </Link>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="px-6 py-3.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-700 font-bold text-sm hover:bg-slate-800"
                  >
                    Gọi Hotline: {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900 p-6 rounded-2xl border border-amber-500/30 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center mx-auto">
                  <Calculator className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-white">Cam Kết Chất Lượng</h3>
                <p className="text-xs text-slate-300">
                  Bảo mật 100%, bàn giao sổ sách tận nơi Sóc Sơn, trực tiếp làm việc với cơ quan thuế.
                </p>
                <div className="text-amber-400 text-sm font-bold pt-2 border-t border-slate-800">
                  Phục vụ: Sóc Sơn, Mê Linh, Đông Anh
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breakdown Work Table */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Chi tiết hạng mục"
              title="Danh Mục Công Việc Kế Toán Thuế Bao Gồm"
              description="Toàn bộ quy trình kê khai, vào sổ sách và lập báo cáo tài chính đều được thực hiện trọn gói"
            />

            <div className="mt-10 space-y-8">
              {workItems.map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-navy-800 pb-3 border-b border-slate-200 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-amber-500" />
                    <span>{item.stage}</span>
                  </h3>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suitable Target Audience */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Đối tượng phục vụ"
              title="Dịch Vụ Kế Toán Thuế Trọn Gói Phù Hợp Với Ai?"
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {targetAudience.map((target, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {target}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service FAQ */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Hỏi đáp dịch vụ"
              title="Câu Hỏi Thường Gặp Về Kế Toán Thuế Trọn Gói"
            />
            <div className="mt-8 space-y-4">
              {siteConfig.faqs.slice(0, 4).map((faq, idx) => (
                <FaqAccordionItem key={idx} question={faq.question} answer={faq.answer} defaultOpen={idx === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="dang-ky-tuvan" className="py-16 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Tư vấn miễn phí"
              title="Đăng Ký Tư Vấn Dịch Vụ Kế Toán Thuế Trọn Gói"
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
