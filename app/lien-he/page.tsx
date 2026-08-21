import React from "react";
import Metadata from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactFormSection } from "@/components/ContactFormSection";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Liên Hệ Dịch Vụ Kế Toán Thuế Sóc Sơn - Văn Phòng Trụ Sở Sóc Sơn",
  description:
    "Thông tin liên hệ, hotline, Zalo, địa chỉ văn phòng trụ sở Dịch vụ Kế toán Thuế Sóc Sơn. Tư vấn giải pháp thuế trọn gói miễn phí.",
};

export default function ContactPage() {
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
              <span className="text-[#D7181F] font-bold">Liên hệ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Liên Hệ Với <span className="text-[#D7181F]">Kế Toán Thuế Sóc Sơn</span>
            </h1>

            <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe, tư vấn và mang đến giải pháp kế toán thuế tối ưu nhất cho doanh nghiệp của bạn.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 shadow-soft hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D7181F] font-bold flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Hotline Tư Vấn 24/7</h3>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="text-[#D7181F] font-extrabold text-lg block hover:underline"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <p className="text-xs text-slate-500">Phản hồi cuộc gọi và Zalo trong 15 phút</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 shadow-soft hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D7181F] font-bold flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Địa Chỉ Văn Phòng</h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {siteConfig.contact.address}
                </p>
                <p className="text-xs text-slate-500">Giao nhận chứng từ tận nơi tại Sóc Sơn</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 shadow-soft hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D7181F] font-bold flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Email & MST</h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-slate-800 text-sm font-semibold block hover:text-[#D7181F]"
                >
                  {siteConfig.contact.email}
                </a>
                <p className="text-xs text-slate-500">Mã số thuế: {siteConfig.contact.taxCode}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Gửi thông tin"
              title="Đăng Ký Nhận Tư Vấn Trực Tiếp"
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
