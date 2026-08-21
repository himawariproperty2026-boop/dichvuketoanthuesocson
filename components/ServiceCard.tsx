import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ServiceCardProps {
  service: {
    id?: string;
    slug: string;
    title: string;
    shortDesc: string;
    priceStarting: string;
    highlights: string[];
  };
  icon?: React.ReactNode;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, icon }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-soft hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col justify-between group">
      <div className="space-y-4">
        {/* Header Icon & Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D7181F] flex items-center justify-center font-bold text-xl group-hover:bg-[#D7181F] group-hover:text-white transition-colors">
            {icon || "❖"}
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-[#D7181F] transition-colors line-clamp-1">
              {service.title}
            </h3>
            <span className="text-xs font-bold text-[#D7181F]">
              Khởi điểm: {service.priceStarting}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
          {service.shortDesc}
        </p>

        {/* Highlights List */}
        <ul className="space-y-2 pt-2 border-t border-slate-100">
          {service.highlights.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Footer */}
      <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          href={`/dich-vu/${service.slug}`}
          className="text-xs font-extrabold text-[#D7181F] group-hover:text-red-700 flex items-center gap-1.5"
        >
          <span>Xem chi tiết dịch vụ</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
