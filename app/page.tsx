import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Play,
  Quote,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlogCard } from "@/components/BlogCard";
import { FaqAccordionItem } from "@/components/FaqAccordionItem";
import { StatCounter } from "@/components/StatCounter";
import { StepItem } from "@/components/StepItem";
import { SolutionsTabSection } from "@/components/SolutionsTabSection";
import { ContactFormSection } from "@/components/ContactFormSection";

import { siteConfig } from "@/lib/siteConfig";
import { getAllBlogPosts } from "@/lib/blog";
import {
  getLocalBusinessSchema,
  getFaqSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";

export default async function HomePage() {
  const posts = await getAllBlogPosts();
  const recentPosts = posts.slice(0, 3);

  // Partner names list read from siteConfig (with PLACEHOLDER comments)
  const partnerLogos = siteConfig.partners;

  // Schema.org JSON-LD objects
  const localBusinessSchema = getLocalBusinessSchema();
  const faqSchema = getFaqSchema(siteConfig.faqs);
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Trang chủ", item: "/" }]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-950">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Shared Global Header */}
      <Header />

      <main className="flex-1">
        {/* ==================================================================== */}
        {/* SECTION 1: HERO SECTION                                             */}
        {/* ==================================================================== */}
        <section className="relative bg-slate-950 text-white pt-8 pb-16 md:py-20 lg:py-24 overflow-hidden border-b border-slate-800">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Text Content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Giải pháp Kế toán - Thuế hàng đầu tại Sóc Sơn</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  Dịch Vụ Kế Toán Thuế & Thành Lập Doanh Nghiệp{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                    Tại Sóc Sơn
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                  Thay thế hoàn toàn bộ máy kế toán nội bộ với chi phí chỉ bằng 1/5. Cam kết báo cáo chuẩn xác 100%, đúng luật và bảo vệ tối đa quyền lợi doanh nghiệp trước cơ quan thuế.
                </p>

                {/* 3 Key Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Tối Ưu 80%</div>
                      <div className="text-[11px] text-slate-400">Chi phí kế toán</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Cam Kết 100%</div>
                      <div className="text-[11px] text-slate-400">Nộp phạt nếu sai</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Hỗ Trợ 24/7</div>
                      <div className="text-[11px] text-slate-400">Zalo & Phone</div>
                    </div>
                  </div>
                </div>

                {/* 2 CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    href="#form-tuvan"
                    className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/bang-gia"
                    className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-base border border-slate-700 hover:border-amber-500/50 transition-all text-center"
                  >
                    Xem Bảng Giá 3 Gói
                  </Link>
                </div>
              </div>

              {/* Right Image Illustration */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop"
                      alt="Dịch vụ Kế toán Thuế Sóc Sơn"
                      className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-amber-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                          Phục vụ chính tại Sóc Sơn
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">
                          Đa Phúc, Phù Linh, Nội Bài, Kim Anh, Đông Anh
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">
                        10+ NĂM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 2: SLIDER DỊCH VỤ NỔI BẬT                                   */}
        {/* ==================================================================== */}
        <section className="py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Danh mục chính"
              title="Các Dịch Vụ Kế Toán & Pháp Lý Nổi Bật"
              description="Giải pháp toàn diện bảo vệ tối đa quyền lợi pháp lý và tài chính cho doanh nghiệp tại Sóc Sơn"
            />

            <div className="mt-12 flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-amber-500 snap-x snap-mandatory">
              {siteConfig.services.map((svc) => (
                <div
                  key={svc.slug}
                  className="min-w-[300px] sm:min-w-[350px] max-w-[380px] flex-shrink-0 snap-start"
                >
                  <ServiceCard service={svc} featured={svc.popular} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 3: GIỚI THIỆU CÔNG TY & TRÍCH DẪN SÁNG LẬP                  */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                    alt="Đội ngũ Kế toán Thuế Sóc Sơn"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
                  <Award className="w-4 h-4" />
                  <span>Về Chúng Tôi</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Tâm Huyết Đồng Hành Cùng Doanh Nghiệp Sóc Sơn Phát Triển Vững Mạnh
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Được thành lập bởi đội ngũ Kế toán trưởng và chuyên gia tư vấn thuế hơn 10 năm kinh nghiệm, chúng tôi mang tới giải pháp kế toán trọn gói chuyên nghiệp, minh bạch và tối ưu chi phí nhất trên địa bàn Sóc Sơn.
                </p>

                <div className="p-5 rounded-2xl bg-slate-800/90 border border-amber-500/30 relative">
                  <Quote className="w-8 h-8 text-amber-400/30 absolute top-3 right-3" />
                  <p className="text-sm italic text-slate-200 leading-relaxed">
                    "Sứ mệnh của chúng tôi không chỉ dừng lại ở việc làm sổ sách báo cáo thuế, mà là giúp các hộ kinh doanh và doanh nghiệp tại Sóc Sơn hoàn toàn yên tâm pháp lý để tập trung 100% vào hoạt động phát triển kinh doanh."
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400">
                      — Trưởng Ban Cố Vấn Kế Toán Thuế Sóc Sơn
                    </span>
                    <span className="text-slate-400">Hà Nội, 2026</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/gioi-thieu"
                    className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-500 transition-colors inline-flex items-center gap-2"
                  >
                    <span>Tìm hiểu về công ty</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 4: KHỐI TAB LỌC "GIẢI PHÁP THEO NHU CẦU"                    */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Giải pháp tối ưu"
              title="Lựa Chọn Dịch Vụ Phù Hợp Nhu Cầu Doanh Nghiệp"
              description="Tìm giải pháp phù hợp nhất theo quy mô và mô hình kinh doanh của bạn tại Sóc Sơn"
            />
            <SolutionsTabSection />
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 5: VÌ SAO CHỌN CHÚNG TÔI                                     */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Lý do tin chọn"
              title="6 Lý Do Doanh Nghiệp Sóc Sơn Tin Tưởng Chúng Tôi"
              description="Năng lực chuyên môn vững vàng, trách nhiệm cao và uy tín khẳng định hơn 10 năm qua"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteConfig.reasons.map((r, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-800 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow-md">
                    <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-navy-800 transition-colors mb-2">
                    {r.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 6: SỐ LIỆU THỐNG KÊ                                          */}
        {/* ==================================================================== */}
        <section className="py-16 bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 text-white border-y border-amber-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.stats.map((st) => (
                <StatCounter
                  key={st.id}
                  value={st.value}
                  suffix={st.suffix}
                  label={st.label}
                  description={st.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 7: DẢI LOGO ĐỐI TÁC MARQUEE                                 */}
        {/* ==================================================================== */}
        <section className="py-10 bg-slate-950 border-b border-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Đối Tác & Khách Hàng Đồng Hành Tại Sóc Sơn
            </span>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee whitespace-nowrap gap-8 flex items-center">
              {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                <div
                  key={idx}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs sm:text-sm whitespace-nowrap shadow-sm flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 8: QUY TRÌNH LÀM VIỆC STEPPER                                */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Quy trình chuẩn"
              title="4 Bước Làm Việc Đơn Giản & Minh Bạch"
              description="Quy trình tiếp nhận và thực hiện hồ sơ kế toán thuế chuyên nghiệp"
            />

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.workflow.map((wf) => (
                <StepItem
                  key={wf.step}
                  step={wf.step}
                  title={wf.title}
                  desc={wf.desc}
                  isLast={wf.step === 4}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 9: BẢNG GIÁ 3 GÓI                                            */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Bảng giá công khai"
              title="Bảng Giá Dịch Vụ Kế Toán Thuế Trọn Gói"
              description="Báo giá rõ ràng ngay từ đầu, không phí ẩn, hỗ trợ giao nhận chứng từ tận nơi tại Sóc Sơn"
            />

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {siteConfig.pricingPackages.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 10: ĐÁNH GIÁ KHÁCH HÀNG                                      */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Khách hàng nói gì"
              title="Đánh Giá Thực Tế Từ Chủ Doanh Nghiệp Sóc Sơn"
              description="Sự hài lòng và tin tưởng của Quý khách là thước đo uy tín lớn nhất của chúng tôi"
              dark
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteConfig.testimonials.map((t, idx) => (
                <TestimonialCard key={idx} testimonial={t} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 11: CÂU HỎI THƯỜNG GẶP FAQ                                   */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Giải đáp thắc mắc"
              title="Câu Hỏi Thường Gặp Về Thuế & Kế Toán"
              description="Những thắc mắc phổ biến nhất của các doanh nghiệp và hộ kinh doanh khi sử dụng dịch vụ"
            />

            <div className="mt-10 space-y-4">
              {siteConfig.faqs.map((faq, idx) => (
                <FaqAccordionItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  defaultOpen={idx === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 12: BÀI VIẾT BLOG MỚI NHẤT                                    */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                  Kinh nghiệm thuế
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  Bài Viết Kế Toán - Thuế Mới Nhất
                </h2>
              </div>

              <Link
                href="/blog"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
              >
                <span>Xem tất cả bài viết</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 13: FORM LIÊN HỆ + SIDEBAR + GOOGLE MAPS EMBED               */}
        {/* ==================================================================== */}
        <section id="form-tuvan" className="py-16 md:py-24 bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Liên hệ ngay"
              title="Đăng Ký Tư Vấn Kế Toán Thuế Sóc Sơn"
              description="Để lại thông tin dưới đây, chuyên viên tư vấn sẽ liên hệ lại hỗ trợ miễn phí trong 15 phút"
              dark
            />

            <div className="mt-12">
              <ContactFormSection />
            </div>
          </div>
        </section>
      </main>

      {/* Floating Buttons & Popups */}
      <FloatingButtons />
      <ContactPopup />
      <NewsletterPopup />

      {/* Shared Global Footer */}
      <Footer />
    </div>
  );
}
