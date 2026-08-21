"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Building2, Store, Factory, Rocket } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const SolutionsTabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "ho-kinh-doanh",
      label: "Hộ Kinh Doanh Cá Thể",
      icon: <Store className="w-4 h-4" />,
      title: "Giải Pháp Kế Toán Thuế Cho Hộ Kinh Doanh Sóc Sơn",
      desc: "Phù hợp cho các hộ kinh doanh buôn bán, nhà hàng, cửa hàng dịch vụ tại Sóc Sơn chuẩn hóa sổ sách hóa đơn điện tử máy tính tiền.",
      benefits: [
        "Kê khai thuế khoán, thuế theo phương pháp kê khai",
        "Lập sổ sách theo Chế độ kế toán hộ kinh doanh",
        "Tư vấn hóa đơn điện tử khởi tạo từ máy tính tiền",
        "Chuyển đổi hộ kinh doanh lên công ty khi phát triển",
      ],
      price: "Từ 500.000 đ / tháng",
      ctaUrl: "/lien-he?target=ho-kinh-doanh",
    },
    {
      id: "startup",
      label: "Công Ty Mới Thành Lập",
      icon: <Rocket className="w-4 h-4" />,
      title: "Dịch Vụ Kế Toán Thuế Ban Đầu Cho Startup",
      desc: "Giải pháp trọn gói từ thành lập công ty, mở tài khoản ngân hàng, chữ ký số đến khai thuế ban đầu không lo bị phạt nộp chậm.",
      benefits: [
        "Thành lập công ty cấp tốc 3-5 ngày tận nơi Sóc Sơn",
        "Đăng ký phương pháp kê khai thuế & hóa đơn điện tử",
        "Kê khai lệ phí môn bài và lập báo cáo thuế quý",
        "Tư vấn tối ưu chi phí hợp pháp ngay từ ngày đầu",
      ],
      price: "Từ 500.000 đ / tháng",
      ctaUrl: "/lien-he?target=startup",
    },
    {
      id: "doanh-nghiep-nho",
      label: "Doanh Nghiệp Nhỏ & Vừa (SMEs)",
      icon: <Building2 className="w-4 h-4" />,
      title: "Kế Toán Thuế Trọn Gói Cho Công Ty SMEs",
      desc: "Thay thế hoàn toàn bộ máy kế toán nội bộ. Chịu trách nhiệm 100% giải trình số liệu với cơ quan thuế Sóc Sơn.",
      benefits: [
        "Kê khai thuế GTGT, TNCN, TNDN hàng tháng/quý",
        "Lập Báo cáo tài chính & Quyết toán thuế năm",
        "Cảnh báo rủi ro hóa đơn đầu vào tự động",
        "Miễn phí nhận chứng từ tận nhà tại Sóc Sơn",
      ],
      price: "Từ 1.000.000 đ / tháng",
      ctaUrl: "/lien-he?target=smes",
    },
    {
      id: "san-xuat-kcn",
      label: "Công Ty Sản Xuất / KCN",
      icon: <Factory className="w-4 h-4" />,
      title: "Dịch Vụ Kế Toán Chuyên Sâu Cho Xưởng & KCN Nội Bài",
      desc: "Dành riêng cho doanh nghiệp sản xuất, gia công, kho bãi gần KCN Nội Bài, KCN Quang Minh cần tính giá thành chi tiết.",
      benefits: [
        "Tính giá thành sản phẩm & công trình chuẩn xác",
        "Hồ sơ hoàn thuế GTGT hàng xuất khẩu / KCN",
        "Kế toán trưởng riêng trực tiếp giải trình thuế",
        "Lập báo cáo quản trị chi phí định kỳ cho Sếp",
      ],
      price: "Từ 2.000.000 đ / tháng",
      ctaUrl: "/lien-he?target=kcn",
    },
  ];

  const current = tabs[activeTab];

  return (
    <div className="space-y-8">
      {/* Tab Selector Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === idx
                ? "bg-[#D7181F] text-white shadow-lg scale-105"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Panel Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {current.desc}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              {current.benefits.map((b, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Chi Phí Trọn Gói
            </span>
            <div className="text-xl sm:text-2xl font-black text-[#D7181F]">
              {current.price}
            </div>
            <p className="text-[11px] text-slate-500">
              Không chi phí ẩn • Miễn phí nhận hồ sơ Sóc Sơn
            </p>

            <Link
              href={current.ctaUrl}
              className="w-full py-3 rounded-xl bg-[#D7181F] hover:bg-[#B81117] text-white font-extrabold text-xs block text-center shadow-md transition-all"
            >
              Đăng ký tư vấn mô hình này
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
