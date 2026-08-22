import React from "react";
import { BookOpen, Receipt, PieChart, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export const IncludedFeaturesSection: React.FC = () => {
  const featureGroups = [
    {
      title: "Kế toán hàng tháng",
      icon: <BookOpen className="w-5 h-5 text-[#04266F]" />,
      iconBg: "bg-blue-50 text-[#04266F] border-blue-200",
      items: [
        "Ghi sổ chi tiết, sổ cái",
        "Bảng cân đối tài khoản",
        "Kế toán thu chi",
        "Kế toán công nợ",
        "Kế toán hàng tồn kho",
      ],
    },
    {
      title: "Khai thuế",
      icon: <Receipt className="w-5 h-5 text-[#D7181F]" />,
      iconBg: "bg-red-50 text-[#D7181F] border-red-200",
      items: [
        "Tờ khai thuế GTGT",
        "Tờ khai thuế TNCN",
        "Khai thuế môn bài",
        "Báo cáo tình hình HĐ",
        "Nộp tờ khai online",
      ],
    },
    {
      title: "Báo cáo cuối kỳ",
      icon: <PieChart className="w-5 h-5 text-emerald-600" />,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      items: [
        "Báo cáo tài chính năm",
        "Quyết toán thuế TNDN",
        "Quyết toán thuế TNCN",
        "Báo cáo lưu chuyển tiền",
        "Thuyết minh BCTC",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          subtitle="15+ nghiệp vụ kế toán - thuế cốt lõi không phát sinh phụ phí"
          title="Tất cả các gói đều bao gồm"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {featureGroups.map((group, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-soft hover:shadow-xl hover:border-slate-300 transition-all duration-300 space-y-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${group.iconBg} shrink-0`}
                  >
                    {group.icon}
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    {group.title}
                  </h3>
                </div>

                <ul className="space-y-3 pt-5 text-xs sm:text-sm text-slate-700 font-medium">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#D7181F] shrink-0" />
                      <span className="text-slate-800 font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
