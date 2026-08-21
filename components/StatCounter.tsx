"use client";

import React, { useState, useEffect, useRef } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = "",
  label,
  description,
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000; // 2 seconds
          const steps = 40;
          const stepTime = duration / steps;
          const increment = value / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div
      ref={counterRef}
      className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-center shadow-xl backdrop-blur-md hover:border-amber-400/50 transition-all duration-300 group"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 tracking-tight group-hover:scale-105 transition-transform duration-300">
        {count}
        <span>{suffix}</span>
      </div>
      <div className="mt-2 text-sm sm:text-base font-bold text-white leading-snug">
        {label}
      </div>
      {description && (
        <div className="mt-1 text-xs text-slate-400">{description}</div>
      )}
    </div>
  );
};
