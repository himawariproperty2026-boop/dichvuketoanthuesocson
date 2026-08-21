import React from "react";
import Link from "next/link";
import { Check, Zap, ArrowRight, ShieldCheck } from "lucide-react";

interface PricingPackage {
  id: string;
  name: string;
  target: string;
  price: string;
  period: string;
  recommended: boolean;
  badge?: string;
  features: string[];
}

interface PricingCardProps {
  pkg: PricingPackage;
}

export const PricingCard: React.FC<PricingCardProps> = ({ pkg }) => {
  return (
    <div
      className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
        pkg.recommended
          ? "bg-white border-2 border-[#D7181F] shadow-2xl scale-105 z-10"
          : "bg-white border border-slate-200 shadow-soft hover:shadow-xl hover:border-slate-300"
      }`}
    >
      {/* Recommended Badge */}
      {pkg.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D7181F] text-white text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{pkg.badge || "Phổ biến nhất"}</span>
        </div>
      )}

      <div>
        <div className="text-center pb-6 border-b border-slate-100">
          <h3 className="font-black text-xl text-slate-900">{pkg.name}</h3>
          <p className="text-xs text-slate-500 mt-1 min-h-[32px] flex items-center justify-center">
            {pkg.target}
          </p>

          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="text-3xl sm:text-4xl font-black text-[#D7181F]">
              {pkg.price}
            </span>
            <span className="text-xs font-bold text-slate-500">{pkg.period}</span>
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-3 py-6 text-xs sm:text-sm text-slate-700 font-medium">
          {pkg.features.map((ft, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{ft}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button CTA */}
      <div className="pt-4 border-t border-slate-100">
        <Link
          href={`/lien-he?package=${pkg.id}`}
          className={`w-full py-3 rounded-xl font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 transition-all ${
            pkg.recommended
              ? "bg-[#D7181F] hover:bg-[#B81117] text-white shadow-md hover:shadow-lg"
              : "bg-white border-2 border-[#D7181F] text-[#D7181F] hover:bg-red-50"
          }`}
        >
          <span>Đăng ký gói này</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
