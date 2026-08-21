import React from "react";
import Metadata from "next";
import Link from "next/link";
import { Check, ShieldCheck, Phone, ArrowRight } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { PricingCard } from "@/components/PricingCard";
import { ContactFormSection } from "@/components/ContactFormSection";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Bảng Giá Dịch Vụ Kế Toán Thuế Sóc Sơn 2026 - Công Khai, Trọn Gói",
  description:
    "Bảng giá dịch vụ kế toán thuế trọn gói cho hộ kinh doanh và doanh nghiệp tại Sóc Sơn. Giá chỉ từ 500k/tháng, báo giá công khai, không phát sinh chi phí ẩn.",
};

export default function PricingPage() {
  const comparisonMatrix = [
    {
      feature: "Số lượng hóa đơn chứng từ / tháng",
      coBan: "Dưới 10 hóa đơn",
      chuyenNghiep: "Từ 10 - 50 hóa đơn",
      doanhNghiep: "Không giới hạn",
    },
    {
      feature: "Kê khai thuế GTGT, TNCN quý",
      coBan: true,
      chuyenNghiep: true,
      doanhNghiep: true,
    },
    {
      feature: "Báo cáo tình hình sử dụng hóa đơn",
      coBan: true,
      chuyenNghiep: true,
      doanhNghiep: true,
    },
    {
      feature: "Lập sổ sách kế toán chi tiết",
      coBan: "Sổ tổng hợp",
      chuyenNghiep: "Sổ chi tiết (Kho, TSCĐ, Thu/Chi)",
      doanhNghiep: "Sổ chi tiết + Tính giá thành",
    },
    {
      feature: "Lập Báo cáo tài chính & Quyết toán năm",
      coBan: true,
      chuyenNghiep: true,
      doanhNghiep: true,
    },
    {
      feature: "Giao nhận chứng từ tận nơi Sóc Sơn",
      coBan: "Gửi file / Nhận tại VP",
      chuyenNghiep: "Miễn phí nhận tận nơi",
      doanhNghiep: "Miễn phí nhận tận nơi",
    },
    {
      feature: "Giải trình khi cơ quan thuế kiểm tra",
      coBan: "Hỗ trợ số liệu kê khai",
      chuyenNghiep: "Trực tiếp giải trình",
      doanhNghiep: "Bảo vệ 100% khi thanh tra",
    },
    {
      feature: "Kế toán trưởng riêng phụ trách",
      coBan: false,
      chuyenNghiep: false,
      doanhNghiep: true,
    },
  ];

  const addOnServices = siteConfig.addOnServices;

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
              <span className="text-[#D7181F] font-bold">Bảng giá</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Bảng Giá Dịch Vụ Kế Toán Thuế <span className="text-[#D7181F]">Tại Sóc Sơn</span>
            </h1>

            <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Chi phí công khai minh bạch, báo giá trọn gói ngay từ đầu. Không phí ẩn, miễn phí nhận hồ sơ chứng từ tận nơi cho doanh nghiệp tại Sóc Sơn.
            </p>
          </div>
        </section>

        {/* 3 Main Pricing Cards */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Lựa chọn gói dịch vụ"
              title="3 Gói Dịch Vụ Kế Toán Thuế Phổ Biến"
              description="Phù hợp với từng quy mô hộ kinh doanh và công ty vừa & nhỏ"
            />

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {siteConfig.pricingPackages.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Features Comparison Matrix */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="So sánh chi tiết"
              title="Bảng So Sánh Quyền Lợi Chi Tiết Giữa Các Gói"
            />

            <div className="mt-10 overflow-x-auto">
              <table className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft text-left border-collapse">
                <thead>
                  <tr className="bg-[#04266F] text-white text-xs sm:text-sm">
                    <th className="p-4 sm:p-5 font-bold w-1/3">Hạng mục so sánh</th>
                    <th className="p-4 sm:p-5 font-bold text-center">Gói Cơ Bản</th>
                    <th className="p-4 sm:p-5 font-bold text-center text-amber-300">Gói Chuyên Nghiệp ⭐</th>
                    <th className="p-4 sm:p-5 font-bold text-center">Gói Doanh Nghiệp Lớn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                  {comparisonMatrix.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <td className="p-4 font-semibold text-slate-900">{row.feature}</td>
                      <td className="p-4 text-center text-slate-700">
                        {typeof row.coBan === "boolean" ? (
                          row.coBan ? (
                            <Check className="w-5 h-5 text-emerald-500 mx-auto stroke-[3]" />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )
                        ) : (
                          row.coBan
                        )}
                      </td>
                      <td className="p-4 text-center font-bold text-slate-900 bg-red-50/30">
                        {typeof row.chuyenNghiep === "boolean" ? (
                          row.chuyenNghiep ? (
                            <Check className="w-5 h-5 text-emerald-600 mx-auto stroke-[3]" />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )
                        ) : (
                          row.chuyenNghiep
                        )}
                      </td>
                      <td className="p-4 text-center text-slate-700">
                        {typeof row.doanhNghiep === "boolean" ? (
                          row.doanhNghiep ? (
                            <Check className="w-5 h-5 text-emerald-500 mx-auto stroke-[3]" />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )
                        ) : (
                          row.doanhNghiep
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Add-on Services Table */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Dịch vụ bổ sung"
              title="Bảng Giá Dịch Vụ Pháp Lý & Thiết Bị Thuế Đi Kèm"
            />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {addOnServices.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4 shadow-xs">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{item.note}</p>
                  </div>
                  <div className="text-[#D7181F] font-black text-sm whitespace-nowrap bg-red-50 px-3 py-1 rounded-lg border border-red-200">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="dang-ky" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Đăng ký tư vấn"
              title="Nhận Báo Giá Chi Tiết Theo Số Lượng Hóa Đơn"
              description="Để lại thông tin, chuyên viên kế toán sẽ gửi báo giá trọn gói chuẩn xác cho doanh nghiệp của bạn"
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
