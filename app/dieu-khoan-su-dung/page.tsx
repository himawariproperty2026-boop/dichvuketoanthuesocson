import React from "react";
import Metadata from "next";
import Link from "next/link";
import { FileText, ShieldCheck } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Điều Khoản Sử Dụng Dịch Vụ Kế Toán Thuế Sóc Sơn",
  description:
    "Điều khoản sử dụng website và quy định dịch vụ của Dịch vụ Kế toán Thuế Sóc Sơn. Quyền và nghĩa vụ hai bên khi ký kết hợp đồng hợp tác.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {/* Banner Hero */}
        <section className="bg-pastel-hero py-14 sm:py-20 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4 font-semibold">
              <Link href="/" className="hover:text-[#D7181F]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#D7181F] font-bold">Điều khoản sử dụng</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Điều Khoản Sử Dụng Dịch Vụ
            </h1>
            <p className="mt-3 text-slate-600 text-sm">
              Quy định quyền và nghĩa vụ hợp tác giữa {siteConfig.companyName} và Quý khách hàng
            </p>
          </div>
        </section>

        {/* Terms Body */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                1. Quy Định Chung
              </h2>
              <p>
                Khi truy cập website <strong>{siteConfig.domain}</strong> hoặc sử dụng bất kỳ dịch vụ kế toán - thuế - thành lập công ty nào do chúng tôi cung cấp, Quý khách đồng ý tuân thủ các điều khoản dịch vụ dưới đây và quy định pháp luật Việt Nam hiện hành.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                2. Quyền Và Nghĩa Vụ Của Khách Hàng
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                <li>Cung cấp đầy đủ, kịp thời và chính xác các hóa đơn, chứng từ gốc phục vụ công tác kế toán thuế.</li>
                <li>Chịu trách nhiệm trước pháp luật về tính hợp pháp của hàng hóa, dịch vụ và tính chân thật của hóa đơn chứng từ đã giao cho chúng tôi.</li>
                <li>Thanh toán phí dịch vụ đúng hạn theo cam kết hợp đồng.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                3. Trách Nhiệm Của Dịch Vụ Kế Toán Thuế Sóc Sơn
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                <li>Thực hiện báo cáo thuế, sổ sách kế toán chuẩn xác theo quy định Chế độ Kế toán ban hành.</li>
                <li>Nộp các báo cáo đúng thời hạn quy định của cơ quan thuế.</li>
                <li>Trực tiếp giải trình và bảo vệ số liệu kế toán khi cơ quan thuế thanh kiểm tra.</li>
                <li>Bảo mật 100% dữ liệu tài chính của khách hàng.</li>
              </ul>
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
