import React from "react";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  centered = true,
  dark = false,
}) => {
  return (
    <div className={`space-y-3 ${centered ? "text-center max-w-3xl mx-auto" : "text-left"}`}>
      {subtitle && (
        <span
          className={`inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
            dark
              ? "bg-red-500/20 text-red-300 border border-red-500/30"
              : "bg-red-50 text-[#D7181F] border border-red-200"
          }`}
        >
          {subtitle}
        </span>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>

      {/* Decorative Red Accent Line */}
      <div className={`flex items-center gap-1.5 ${centered ? "justify-center" : "justify-start"}`}>
        <span className="w-12 h-1 rounded-full bg-[#D7181F]"></span>
        <span className="w-2.5 h-1 rounded-full bg-[#04266F]"></span>
      </div>

      {description && (
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
