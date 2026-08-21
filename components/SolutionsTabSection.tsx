"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const SolutionsTabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Filter Tabs Header */}
      <div className="mt-10 flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4">
        {siteConfig.services.slice(0, 3).map((svc, idx) => (
          <button
            key={svc.slug}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-3 rounded-xl font-extrabold text-sm transition-all ${
              activeTab === idx
                ? "bg-slate-900 text-amber-400 shadow-md border-2 border-amber-400"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {svc.title}
          </button>
        ))}
      </div>

      {/* Tab Active Content Card */}
      <div className="mt-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
              Gói dịch vụ khởi điểm từ: {siteConfig.services[activeTab].priceStarting}
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              {siteConfig.services[activeTab].title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {siteConfig.services[activeTab].shortDesc}
            </p>

            <div className="pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Hạng mục bao gồm:
              </h4>
              <ul className="space-y-2">
                {siteConfig.services[activeTab].highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-900 text-white p-6 rounded-2xl border border-amber-500/30 text-center space-y-4">
            <div className="text-xs text-amber-400 font-bold uppercase">
              Cam kết chất lượng
            </div>
            <div className="text-2xl font-extrabold text-white">
              {siteConfig.services[activeTab].priceStarting}
            </div>
            <p className="text-xs text-slate-300">
              Chi phí trọn gói minh bạch, không phát sinh thêm phụ phí đi lại hay nhận hồ sơ.
            </p>

            <Link
              href={`/dich-vu/${siteConfig.services[activeTab].slug}`}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm block shadow-lg hover:from-amber-500 hover:to-amber-600"
            >
              Xem chi tiết & Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
