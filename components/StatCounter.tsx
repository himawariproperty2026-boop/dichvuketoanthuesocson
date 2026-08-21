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
  suffix = "+",
  label,
  description,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={elementRef}
      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-2 group hover:border-red-200 hover:shadow-xl transition-all"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D7181F] tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="font-extrabold text-slate-900 text-sm sm:text-base">
        {label}
      </div>
      {description && (
        <p className="text-xs text-slate-500 line-clamp-1">{description}</p>
      )}
    </div>
  );
};
