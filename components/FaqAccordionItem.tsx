"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqAccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
  question,
  answer,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200/90 rounded-2xl bg-white shadow-sm overflow-hidden transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-slate-900 hover:text-navy-800 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3 text-base sm:text-lg">
          <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <span>{question}</span>
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
            isOpen
              ? "bg-amber-400 text-slate-950 rotate-180"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <ChevronDown className="w-5 h-5 stroke-[2.5]" />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn">
          {answer}
        </div>
      )}
    </div>
  );
};
