import React from "react";
import { Star, Quote, MapPin } from "lucide-react";

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
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative">
      <Quote className="w-10 h-10 text-amber-100 absolute top-4 right-4 stroke-[1]" />

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4 text-amber-400">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>

        {/* Content */}
        <p className="text-slate-700 text-sm leading-relaxed italic relative z-10 mb-6">
          "{testimonial.content}"
        </p>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 text-amber-300 font-bold text-sm flex items-center justify-center border border-amber-500/30">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .slice(-2)
            .join("")}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">
            {testimonial.name}
          </h4>
          <p className="text-xs text-slate-500 font-medium">
            {testimonial.role}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>{testimonial.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
