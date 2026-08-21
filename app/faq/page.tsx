import React from "react";
import Metadata from "next";
import Link from "next/link";
import { HelpCircle, Phone, ArrowRight } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordionItem } from "@/components/FaqAccordionItem";
import { ContactFormSection } from "@/components/ContactFormSection";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Câu Hỏi Thường Gặp (FAQ) Về Kế Toán Thuế Sóc Sơn",
  description:
    "Giải đáp chi tiết các thắc mắc về kế toán thuế trọn gói, thủ tục thành lập doanh nghiệp, quyết toán thuế và giao nhận chứng từ tại Sóc Sơn.",
};

export default function FaqPage() {
  const faqCategories = [
    {
      categoryName: "Về Dịch Vụ Kế Toán Thuế",
      items: siteConfig.faqs.slice(0, 4),
    },
    {
      categoryName: "Về Thủ Tục & Trách Nhiệm Pháp Lý",
      items: siteConfig.faqs.slice(4, 7),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {/* Banner Hero */}
        <section className="bg-slate-950 text-white py-14 sm:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-4">
              <Link href="/" className="hover:text-amber-400">Trang chủ</Link>
              <span>/</span>
              <span className="text-amber-400 font-semibold">FAQ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Câu Hỏi Thường Gặp <span className="text-amber-400">Về Thuế & Kế Toán</span>
            </h1>

            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Tổng hợp giải đáp thắc mắc phổ biến nhất của các doanh nghiệp và hộ kinh doanh tại Sóc Sơn, Mê Linh, Đông Anh.
            </p>
          </div>
        </section>

        {/* Main FAQ Accordion List */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
            {faqCategories.map((cat, cIdx) => (
              <div key={cIdx} className="space-y-4">
                <h2 className="text-xl font-extrabold text-navy-800 border-b border-slate-200 pb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  <span>{cat.categoryName}</span>
                </h2>
                <div className="space-y-3">
                  {cat.items.map((item, idx) => (
                    <FaqAccordionItem
                      key={idx}
                      question={item.question}
                      answer={item.answer}
                      defaultOpen={cIdx === 0 && idx === 0}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form CTA */}
        <section id="dang-ky" className="py-16 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Chưa tìm thấy câu trả lời?"
              title="Gửi Câu Hỏi Tư Vấn Trực Tiếp Cho Kế Toán Trưởng"
              description="Để lại thông tin, chuyên viên sẽ gọi lại hỗ trợ miễn phí trong 15 phút"
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
