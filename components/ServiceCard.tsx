import React from "react";
import Link from "next/link";
import {
  Calculator,
  Building2,
  FileCheck2,
  FileEdit,
  Coins,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ServiceItem } from "@/lib/siteConfig";

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Building2,
  FileCheck2,
  FileEdit,
  Coins,
  ShieldAlert,
};

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  featured = false,
}) => {
  const IconComponent = iconMap[service.iconName] || Calculator;

  return (
    <div
      className={`group relative rounded-2xl transition-all duration-300 flex flex-col justify-between h-full p-6 ${
        featured
          ? "bg-slate-900 text-white border-2 border-amber-500 shadow-xl shadow-amber-500/10 scale-102"
          : "bg-white text-slate-800 border border-slate-200/80 hover:border-amber-400 hover:shadow-xl"
      }`}
    >
      {service.popular && (
        <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
          Khuyên dùng
        </div>
      )}

      <div>
        {/* Card Header & Icon */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              featured
                ? "bg-amber-400 text-slate-950"
                : "bg-navy-50 text-navy-800 group-hover:bg-amber-400 group-hover:text-slate-950"
            }`}
          >
            <IconComponent className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
              featured
                ? "bg-slate-800 text-amber-300 border border-slate-700"
                : "bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-800"
            }`}
          >
            Giá từ: {service.priceStarting}
          </span>
        </div>

        {/* Title & Short Description */}
        <h3
          className={`text-xl font-bold mb-2 transition-colors ${
            featured
              ? "text-white group-hover:text-amber-400"
              : "text-slate-900 group-hover:text-navy-800"
          }`}
        >
          {service.title}
        </h3>
        <p
          className={`text-sm leading-relaxed mb-4 line-clamp-3 ${
            featured ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {service.shortDesc}
        </p>

        {/* Bullet Highlights */}
        <ul className="space-y-2 mb-6 pt-3 border-t border-slate-100 dark:border-slate-800">
          {service.highlights.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs">
              <CheckCircle2
                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  featured ? "text-amber-400" : "text-emerald-500"
                }`}
              />
              <span className={featured ? "text-slate-200" : "text-slate-700"}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA */}
      <Link
        href={`/dich-vu/${service.slug}`}
        className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          featured
            ? "bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md"
            : "bg-navy-800 hover:bg-navy-900 text-white group-hover:bg-amber-500 group-hover:text-slate-950"
        }`}
      >
        <span>Xem chi tiết dịch vụ</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
