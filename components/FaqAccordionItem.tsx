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
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? "text-[#D7181F]" : "text-slate-400"}`} />
          <span className={`font-bold text-sm sm:text-base ${isOpen ? "text-[#D7181F]" : "text-slate-900"}`}>
            {question}
          </span>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#D7181F]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
          {answer}
        </div>
      )}
    </div>
  );
};
