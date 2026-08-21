import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Zap } from "lucide-react";
import { PricingPackage } from "@/lib/siteConfig";

interface PricingCardProps {
  pkg: PricingPackage;
}

export const PricingCard: React.FC<PricingCardProps> = ({ pkg }) => {
  return (
    <div
      className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        pkg.recommended
          ? "bg-slate-900 text-white border-2 border-amber-400 shadow-2xl shadow-amber-500/20 md:-translate-y-2"
          : "bg-white text-slate-800 border border-slate-200 hover:border-amber-400 hover:shadow-xl"
      }`}
    >
      {pkg.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{pkg.badge}</span>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800">
          <h3
            className={`text-xl font-black ${
              pkg.recommended ? "text-amber-400" : "text-navy-800"
            }`}
          >
            {pkg.name}
          </h3>
          <p
            className={`text-xs mt-2 min-h-[36px] flex items-center justify-center ${
              pkg.recommended ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {pkg.target}
          </p>

          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="text-3xl sm:text-4xl font-black tracking-tight">
              {pkg.price}
            </span>
            <span
              className={`text-sm font-semibold ${
                pkg.recommended ? "text-amber-300" : "text-slate-500"
              }`}
            >
              {pkg.period}
            </span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="py-6 space-y-3">
          <p
            className={`text-xs font-bold uppercase tracking-wider ${
              pkg.recommended ? "text-amber-400" : "text-slate-400"
            }`}
          >
            Quyền lợi bao gồm:
          </p>
          <ul className="space-y-2.5">
            {pkg.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                <div
                  className={`p-0.5 rounded-full mt-0.5 flex-shrink-0 ${
                    pkg.recommended
                      ? "bg-amber-400 text-slate-950"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span
                  className={
                    pkg.recommended ? "text-slate-200" : "text-slate-700"
                  }
                >
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href={`/lien-he?package=${pkg.id}`}
          className={`w-full py-3 px-4 rounded-xl font-extrabold text-sm block text-center transition-all ${
            pkg.recommended
              ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          Đăng ký gói này ngay
        </Link>
        <p className="text-[11px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Hợp đồng bảo mật & Không phát sinh phụ phí
        </p>
      </div>
    </div>
  );
};
