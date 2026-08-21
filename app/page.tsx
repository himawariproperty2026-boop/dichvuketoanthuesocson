import React from "react";
import Metadata from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Phone,
  Clock,
  Building2,
  FileCheck2,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Play,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { SolutionsTabSection } from "@/components/SolutionsTabSection";
import { StatCounter } from "@/components/StatCounter";
import { StepItem } from "@/components/StepItem";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FaqAccordionItem } from "@/components/FaqAccordionItem";
import { BlogCard } from "@/components/BlogCard";
import { ContactFormSection } from "@/components/ContactFormSection";

import { siteConfig } from "@/lib/siteConfig";
import { getAllBlogPosts } from "@/lib/blog";
import {
  getLocalBusinessSchema,
  getFaqSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";

export const metadata = {
  title: "Dịch Vụ Kế Toán Thuế Sóc Sơn - Thành Lập Doanh Nghiệp Trọn Gói",
  description:
    "Đơn vị dịch vụ kế toán thuế trọn gói, quyết toán thuế BCTC, thành lập công ty uy tín hàng đầu tại Sóc Sơn, Mê Linh, Đông Anh. Tiết kiệm 80% chi phí, miễn phí nhận hồ sơ tận nơi.",
};

export default async function HomePage() {
  const posts = await getAllBlogPosts();
  const recentPosts = posts.slice(0, 3);
  const partnerLogos = siteConfig.partners;

  // Schema.org Structured Data
  const localBusinessSchema = getLocalBusinessSchema();
  const faqSchema = getFaqSchema(siteConfig.faqs);
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Trang chủ", item: "/" }]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-[#D7181F] selection:text-white">
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
        {/* BLOCK 1: Hero Section - Light Theme with Pastel Gradient */}
        <section className="relative bg-pastel-hero py-16 sm:py-24 overflow-hidden border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#D7181F] text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                  <Zap className="w-4 h-4 fill-current text-[#D7181F]" />
                  <span>Giải Pháp Kế Toán - Thuế Hàng Đầu Tại Sóc Sơn</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-[#131313]">
                  Dịch Vụ Kế Toán Thuế & <br />
                  Thành Lập Doanh Nghiệp <br />
                  <span className="text-[#04266F]">Tại </span>
                  <span className="text-[#D7181F]">Sóc Sơn</span>
                </h1>

                <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                  Thay thế hoàn toàn bộ máy kế toán nội bộ với chi phí chỉ bằng 1/5. Cam kết báo cáo chuẩn xác 100%, đúng luật và bảo vệ tối đa quyền lợi doanh nghiệp trước cơ quan thuế.
                </p>

                {/* 3 Value Proposition Cards */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-1">
                    <div className="text-[#D7181F] font-black text-sm sm:text-base">Tối Ưu 80%</div>
                    <div className="text-[11px] text-slate-600 font-semibold">Chi phí kế toán</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-1">
                    <div className="text-[#04266F] font-black text-sm sm:text-base">Cam Kết 100%</div>
                    <div className="text-[11px] text-slate-600 font-semibold">Trách nhiệm hợp đồng</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-1">
                    <div className="text-[#D7181F] font-black text-sm sm:text-base">Hỗ Trợ 24/7</div>
                    <div className="text-[11px] text-slate-600 font-semibold">Zalo & Điện thoại</div>
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/lien-he"
                    className="px-7 py-4 rounded-2xl bg-[#D7181F] hover:bg-[#B81117] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <span>ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/bang-gia"
                    className="px-7 py-4 rounded-2xl bg-white border-2 border-[#D7181F] text-[#D7181F] hover:bg-red-50 font-extrabold text-sm sm:text-base transition-all"
                  >
                    Xem Bảng Giá 3 Gói
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual Frame */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 p-3 shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop"
                    alt="Dịch vụ kế toán thuế Sóc Sơn"
                    className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                  />

                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">Phục vụ chính tại Sóc Sơn</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                        Đa Phúc, Phủ Lỗ, Nội Bài, Kim Anh, Đông Anh
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-[#D7181F] text-white text-xs font-black">
                      10+ NĂM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 2: 6 Featured Services Carousel/Grid Section */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Dịch vụ cốt lõi"
              title="6 Dịch Vụ Kế Toán Thuế & Pháp Lý Chuyên Nghiệp"
              description="Đáp ứng đầy đủ mọi nhu cầu nghiệp vụ từ khi mới thành lập đến quyết toán thuế định kỳ"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteConfig.services.map((svc) => (
                <ServiceCard key={svc.slug} service={svc} />
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 3: About Us & Video Intro Section */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="px-3.5 py-1.5 rounded-full bg-red-50 text-[#D7181F] text-xs font-bold uppercase border border-red-200">
                  Về chúng tôi
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                  Đối Tác Kế Toán Thuế <br />
                  <span className="text-[#04266F]">Tin Cậy Của Doanh Nghiệp</span> Sóc Sơn
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Được thành lập với mục tiêu hỗ trợ các chủ doanh nghiệp nhỏ và hộ kinh doanh tại Sóc Sơn giải quyết triệt để bài toán rủi ro sổ sách báo cáo thuế. Đội ngũ Kế toán trưởng của chúng tôi trực tiếp kiểm soát chất lượng từng hồ sơ.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Am hiểu địa bàn Sóc Sơn & Đông Anh</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Nắm vững các quy định và phong cách làm việc của cơ quan thuế địa phương.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Trách nhiệm hợp đồng minh bạch</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Cam kết chịu trách nhiệm giải trình và xử lý số liệu nghiệp vụ theo đúng hợp đồng.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/gioi-thieu"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#04266F] hover:bg-blue-900 text-white font-bold text-xs"
                  >
                    <span>Xem thêm về năng lực công ty</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative bg-white p-3">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                    alt="Đội ngũ cố vấn Kế toán Sóc Sơn"
                    className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-[#D7181F] text-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 4: Solutions Tab By Target Business Type */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Giải pháp theo nhu cầu"
              title="Lựa Chọn Mô Hình Dịch Vụ Phù Hợp Cho Doanh Nghiệp"
              description="Thiết kế gói giải pháp tối ưu theo đúng quy mô và loại hình hoạt động"
            />
            <div className="mt-12">
              <SolutionsTabSection />
            </div>
          </div>
        </section>

        {/* BLOCK 5: 6 Key Reasons Why Choose Us */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Ưu điểm vượt trội"
              title="6 Lý Do Doanh Nghiệp Sóc Sơn Tin Chọn Chúng Tôi"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteConfig.reasons.map((rs, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft hover:shadow-xl hover:border-red-200 transition-all duration-300 space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D7181F] font-black flex items-center justify-center text-lg group-hover:bg-[#D7181F] group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#D7181F] transition-colors">
                    {rs.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {rs.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 6: Dynamic Animated Stats Counter Section - Deep Navy Contrast */}
        <section className="py-16 bg-[#04266F] text-white border-b border-blue-900">
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

        {/* BLOCK 7: Partner Logos Marquee Section */}
        <section className="py-12 bg-white border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Được Tin Tưởng Bởi Các Thương Hiệu Tại Sóc Sơn & Hà Nội
            </span>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
              {partnerLogos.concat(partnerLogos).map((partnerName, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm shadow-xs hover:border-red-300 transition-colors"
                >
                  {partnerName}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 8: Workflow Stepper 4 Steps Section */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Quy trình làm việc"
              title="4 Bước Hợp Tác Kế Toán Thuế Đơn Giản & Tốc Độ"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.workflow.map((st) => (
                <StepItem key={st.step} step={st} />
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 9: Pricing Packages Summary Table Section */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Bảng giá công khai"
              title="Bảng Giá Dịch Vụ Kế Toán Thuế Trọn Gói"
              description="Báo giá minh bạch ngay từ đầu, không phí ẩn. Miễn phí nhận chứng từ tận nhà tại Sóc Sơn."
            />

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {siteConfig.pricingPackages.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 10: Customer Testimonials Cards Section */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Đánh giá khách hàng"
              title="Khách Hàng Nói Gì Về Kế Toán Thuế Sóc Sơn?"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteConfig.testimonials.map((t, idx) => (
                <TestimonialCard key={idx} testimonial={t} />
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 11: FAQ Accordion Section */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Giải đáp thắc mắc"
              title="Các Câu Hỏi Thường Gặp Về Thuế & Kế Toán"
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

        {/* BLOCK 12: Latest Blog Articles Grid Section */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
              <div>
                <span className="px-3 py-1 rounded-full bg-red-50 text-[#D7181F] text-xs font-bold uppercase border border-red-200">
                  Tin tức & Kiến thức
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Bài Viết Kế Toán Thuế Mới Nhất 2026
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D7181F] hover:text-red-700"
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

        {/* BLOCK 13: Contact Form & Google Maps Embedded Section */}
        <section id="lien-he" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Tư vấn trực tiếp"
              title="Đăng Ký Nhận Tư Vấn Kế Toán Thuế Sóc Sơn"
              description="Để lại thông tin, chuyên viên kế toán trưởng sẽ gọi lại tư vấn giải pháp tối ưu cho doanh nghiệp của bạn"
            />
            <div className="mt-12">
              <ContactFormSection />
            </div>
          </div>
        </section>
      </main>

      {/* Shared Global Floating Action Buttons & Popups */}
      <FloatingButtons />
      <ContactPopup />

      {/* Shared Global Footer */}
      <Footer />
    </div>
  );
}
