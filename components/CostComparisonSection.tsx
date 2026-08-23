import React from "react";
import { X, Check, PiggyBank, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export const CostComparisonSection: React.FC = () => {
  const internalAccountantCosts = [
    "Lương kế toán viên: 10 - 12 triệu/tháng",
    "BHXH, BHYT, BHTN (21.5%): 2.5 triệu/tháng",
    "Phần mềm kế toán: 500k - 1 triệu/tháng",
    "Không gian làm việc: 1 - 2 triệu/tháng",
    "Đào tạo, cập nhật quy định: 500k/tháng",
    "Lương 13, thưởng tết, nghỉ phép",
    "Rủi ro nghỉ việc, tuyển mới",
  ];

  const servicePackageBenefits = [
    "Phí trọn gói: 1.5 - 4.5 triệu/tháng",
    "Không BHXH, BHYT, BHTN",
    "Phần mềm chuyên nghiệp đã bao gồm",
    "Không tốn không gian làm việc",
    "Cập nhật quy định liên tục",
    "Đội ngũ chuyên gia 17+ năm kinh nghiệm",
    "Cam kết đúng hạn 100%, chịu trách nhiệm pháp lý",
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          subtitle="So sánh chi phí thực tế: Thuê dịch vụ trọn gói VS Tuyển kế toán nội bộ"
          title="Vì sao thuê dịch vụ tiết kiệm 60% so với tuyển kế toán?"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Internal Accountant */}
          <div className="bg-white rounded-3xl border border-red-200 p-6 sm:p-8 shadow-soft flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-sm font-black flex-shrink-0">
                  ✕
                </span>
                <h3 className="font-black text-lg sm:text-xl text-slate-900">
                  Tuyển kế toán nội bộ
                </h3>
              </div>

              <ul className="space-y-3.5 py-6 text-xs sm:text-sm text-slate-700 font-medium">
                {internalAccountantCosts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-sm flex-shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="text-slate-700 font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Tổng chi phí dự kiến
              </span>
              <span className="font-black text-red-600 text-lg sm:text-xl">
                Tổng: 15 - 20 triệu/tháng
              </span>
            </div>
          </div>

          {/* Card 2: Service Package */}
          <div className="bg-white rounded-3xl border-2 border-emerald-500 p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>GIẢI PHÁP TỐI ƯU CHI PHÍ</span>
            </div>

            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 pt-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-black flex-shrink-0">
                  ✓
                </span>
                <h3 className="font-black text-lg sm:text-xl text-slate-900">
                  Thuê dịch vụ trọn gói
                </h3>
              </div>

              <ul className="space-y-3.5 py-6 text-xs sm:text-sm text-slate-700 font-medium">
                {servicePackageBenefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-800 font-semibold leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Tổng chi phí dịch vụ
              </span>
              <span className="font-black text-emerald-700 text-lg sm:text-xl">
                Tổng: 1.5 - 4.5 triệu/tháng
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Savings Badge Pill */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-50 via-amber-50 to-emerald-50 border border-amber-200 shadow-soft text-xs sm:text-base font-extrabold text-slate-900">
            <PiggyBank className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>Tiết kiệm:</span>
            <span className="text-[#D7181F] font-black text-sm sm:text-lg">
              10 - 16 triệu/tháng
            </span>
            <span className="text-slate-400 font-normal sm:inline hidden">=</span>
            <span className="text-emerald-700 font-black text-sm sm:text-lg">
              120 - 192 triệu/năm
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
