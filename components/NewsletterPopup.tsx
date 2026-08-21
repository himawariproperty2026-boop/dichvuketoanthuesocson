"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, CheckCircle2 } from "lucide-react";

export const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter_popup_dismissed");
    if (dismissed) return;

    // Show after 25 seconds of browsing
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 25000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("newsletter_popup_dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 z-10">
        {/* Easy to Tap Close Button on Mobile */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors border border-slate-700 active:scale-95"
          aria-label="Đóng newsletter popup"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Đăng ký thành công!</h4>
            <p className="text-xs text-slate-300">
              Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gửi bản tin chính sách thuế mới nhất qua email {email}.
            </p>
            <button
              onClick={handleClose}
              className="mt-3 px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Đóng lại
            </button>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">
                Đăng Ký Nhận Bản Tin Thuế 2026
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Cập nhật nhanh nhất các thay đổi về luật thuế, chính sách ưu đãi cho hộ kinh doanh và doanh nghiệp tại Sóc Sơn.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Nhập email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 text-white placeholder-slate-500 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20"
              >
                Nhận bản tin miễn phí
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
