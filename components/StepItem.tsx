import React from "react";
import { CheckCircle2 } from "lucide-react";

interface StepItemProps {
  step: {
    step: number;
    title: string;
    desc: string;
  };
  icon?: React.ReactNode;
}

export const StepItem: React.FC<StepItemProps> = ({ step, icon }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft hover:shadow-xl hover:border-red-200 transition-all duration-300 relative group flex flex-col justify-between">
      {/* Step Number Badge */}
      <div className="absolute -top-3.5 left-6 px-3.5 py-0.5 rounded-full bg-[#D7181F] text-white font-black text-xs shadow-md">
        BƯỚC {step.step}
      </div>

      <div className="pt-2 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D7181F] flex items-center justify-center font-bold">
            {icon || <CheckCircle2 className="w-5 h-5" />}
          </div>
          <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#D7181F] transition-colors">
            {step.title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {step.desc}
        </p>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-semibold text-[#D7181F] flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D7181F]"></span>
        <span>Quy trình chuẩn Sóc Sơn</span>
      </div>
    </div>
  );
};
