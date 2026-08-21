import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

interface StepItemProps {
  step: number;
  title: string;
  desc: string;
  isLast?: boolean;
}

export const StepItem: React.FC<StepItemProps> = ({
  step,
  title,
  desc,
  isLast = false,
}) => {
  return (
    <div className="relative group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
            0{step}
          </div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Bước {step}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-navy-800 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
        <CheckCircle className="w-4 h-4" />
        <span>Cam kết chuẩn xác 100%</span>
      </div>
    </div>
  );
};
