import React from "react";
import { Star, Quote, Building2 } from "lucide-react";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    location: string;
    content: string;
    rating: number;
  };
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col justify-between relative group">
      <Quote className="w-8 h-8 text-red-100 absolute top-4 right-4 pointer-events-none" />

      <div className="space-y-3">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>

        {/* Comment */}
        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
          "{testimonial.content}"
        </p>
      </div>

      {/* Author & Service Info */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 text-[#D7181F] font-black flex items-center justify-center text-sm border border-red-200">
            {testimonial.name[0]}
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
              {testimonial.name}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#D7181F]" />
              <span>{testimonial.role} • {testimonial.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
