import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

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
      className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative bg-white border ${
        pkg.recommended
          ? "border-amber-400 shadow-2xl scale-105 z-10 ring-4 ring-amber-400/20"
          : "border-slate-200 shadow-soft hover:shadow-xl hover:border-slate-300"
      }`}
    >
      {/* Top Banner Ribbon Badge for Recommended Package */}
      {pkg.recommended && (
        <div className="absolute top-4 right-0 translate-x-3 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider py-1 px-5 rotate-45 shadow-md z-20 pointer-events-none">
          {pkg.badge || "PHỔ BIẾN NHẤT"}
        </div>
      )}

      <div>
        {/* Card Header Block (Matching Image 2 Teal/Amber Header Style) */}
        <div
          className={`p-6 text-center text-white relative ${
            pkg.recommended
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950"
              : "bg-gradient-to-r from-[#04266F] to-[#124DB3]"
          }`}
        >
          <h3 className={`font-black text-lg sm:text-xl uppercase tracking-wider ${pkg.recommended ? "text-slate-950" : "text-white"}`}>
            {pkg.name}
          </h3>

          <div className="mt-3 flex items-baseline justify-center gap-1">
            <span className={`text-3xl sm:text-4xl font-black ${pkg.recommended ? "text-slate-950" : "text-white"}`}>
              {pkg.price}đ
            </span>
            <span className={`text-xs font-bold ${pkg.recommended ? "text-slate-900" : "text-blue-100"}`}>
              /{pkg.period.replace("đ/", "")}
            </span>
          </div>
        </div>

        {/* Features List */}
        <div className="p-6">
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 font-semibold divide-y divide-slate-100">
            {pkg.features.map((ft, idx) => (
              <li key={idx} className={`${idx > 0 ? "pt-3.5" : ""} flex items-start gap-3`}>
                <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-slate-800">{ft}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button CTA (Solid Amber/Red button as in Image 2) */}
      <div className="p-6 pt-0">
        <Link
          href={`/lien-he?package=${pkg.id}`}
          className={`w-full py-3.5 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer ${
            pkg.recommended
              ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
              : "bg-[#D7181F] hover:bg-[#B81117] text-white"
          }`}
        >
          <span>Đăng ký ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
