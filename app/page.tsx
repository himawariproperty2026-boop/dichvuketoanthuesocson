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
import { BlogCard } from "@/components/BlogCard";
import { ContactFormSection } from "@/components/ContactFormSection";

import { siteConfig } from "@/lib/siteConfig";
import { getAllBlogPosts } from "@/lib/blog";
import {
  getLocalBusinessSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";

export const metadata = {
  title: "Dich Vu Ke Toan Thue Soc Son - Thanh Lap Doanh Nghiep Tron Goi",
  description:
    "Don vi dich vu ke toan thue tron goi, quyet toan thue BCTC, thanh lap cong ty uy tin hang dau tai Soc Son, Me Linh, Dong Anh. Tiet kiem 80% chi phi.",
};

export default async function HomePage() {
  const posts = await getAllBlogPosts();
  const recentPosts = posts.slice(0, 3);
  const partnerLogos = siteConfig.partners;

  // Schema.org Structured Data
  const localBusinessSchema = getLocalBusinessSchema();
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Shared Global Header */}
      <Header />

      <main className="flex-1">
        {/* BLOCK 1: Hero Section - Light Theme with Pastel Gradient */}
        <section className="relative bg-pastel-hero py-12 sm:py-24 overflow-hidden border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headlines & CTAs */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#D7181F] text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                  <Zap className="w-4 h-4 fill-current text-[#D7181F]" />
                  <span>Giai Phap Ke Toan - Thue Hang Dau Tai Soc Son</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.18] text-[#131313]">
                  Dich Vu Ke Toan Thue & <br />
                  Thanh Lap Doanh Nghiep <br />
                  <span className="text-[#04266F]">Tai </span>
                  <span className="text-[#D7181F]">Soc Son</span>
                </h1>

                <p className="text-slate-700 text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                  Thay the hoan toan bo may ke toan noi bo voi chi phi chi bang 1/5. Cam ket bao cao chuan xac 100%, dung luat va bao ve toi da quyen loi doanh nghiep truoc co quan thue.
                </p>

                {/* 3 Value Proposition Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                  <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-0.5 sm:space-y-1">
                    <div className="text-[#D7181F] font-black text-xs sm:text-base">Toi Uu 80%</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-600 font-semibold">Chi phi ke toan</div>
                  </div>
                  <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-0.5 sm:space-y-1">
                    <div className="text-[#04266F] font-black text-xs sm:text-base">Cam Ket 100%</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-600 font-semibold">Trach nhiem hop dong</div>
                  </div>
                  <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-slate-200 shadow-soft text-center space-y-0.5 sm:space-y-1">
                    <div className="text-[#D7181F] font-black text-xs sm:text-base">Ho Tro 24/7</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-600 font-semibold">Zalo & Dien thoai</div>
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                  <Link
                    href="/lien-he"
                    className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#D7181F] hover:bg-[#B81117] text-white font-extrabold text-xs sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>DANG KY TU VAN MIEN PHI</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>

                  <Link
                    href="/bang-gia"
                    className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border-2 border-[#D7181F] text-[#D7181F] hover:bg-red-50 font-extrabold text-xs sm:text-base text-center transition-all active:scale-98"
                  >
                    Xem Bang Gia 3 Goi
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual Frame */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 p-2.5 sm:p-3 shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop"
                    alt="Dich vu ke toan thue Soc Son"
                    className="w-full h-72 sm:h-96 object-cover rounded-2xl"
                  />

                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-5 left-5 right-5 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex items-center justify-between">
                    <div>
                      <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Phuc vu chinh tai Soc Son</div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                        Da Phuc, Phu Lo, Noi Bai, Kim Anh, Dong Anh
                      </div>
                    </div>
                    <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-[#D7181F] text-white text-[10px] sm:text-xs font-black whitespace-nowrap">
                      10+ NAM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 2: 6 Featured Services Carousel/Grid Section */}
        <section className="py-14 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Dich vu cot loi"
              title="6 Dich Vu Ke Toan Thue & Phap Ly Chuyen Nghiep"
              description="Dap ung dai du moi nhu cau nghiep vu tu khi moi thanh lap den quyet toan thue dinh ky"
            />

            <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {siteConfig.services.map((svc) => (
                <ServiceCard key={svc.slug} service={svc} />
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 3: About Us & Video Intro Section */}
        <section className="py-14 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="px-3.5 py-1.5 rounded-full bg-red-50 text-[#D7181F] text-xs font-bold uppercase border border-red-200">
                  Ve chung toi
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                  Doi Tac Ke Toan Thue <br />
                  <span className="text-[#04266F]">Tin Cay Cua Doanh Nghiep</span> Soc Son
                </h2>
                <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                  Duoc thanh lap voi muc tieu ho tro cac chu doanh nghiep nho va ho kinh doanh tai Soc Son giai quyet triet de bai toan rui ro so sach bao cao thue.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Am hieu dia ban Soc Son & Dong Anh</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Nam vung cac quy dinh va phong cach lam viec cua co quan thue dia phuong.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Trach nhiem hop dong minh bach</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Cam ket chịu trach nhiem giai trinh va xu ly so lieu nghiep vu theo dung hop dong.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/gioi-thieu"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#04266F] hover:bg-blue-900 text-white font-bold text-xs"
                  >
                    <span>Xem them ve nang luc cong ty</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative bg-white p-2.5 sm:p-3">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                    alt="Doi ngu co van Ke toan Soc Son"
                    className="w-full h-72 sm:h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center rounded-2xl">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#D7181F] text-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 4: Solutions Tab By Target Business Type */}
        <section className="py-14 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Giai phap theo nhu cau"
              title="Lua Chon Mo Hinh Dich Vu Phu Hop Cho Doanh Nghiep"
              description="Thiet ke goi giai phap toi uu theo dung quy mo va loai hinh hoat dong"
            />
            <div className="mt-10 sm:mt-12">
              <SolutionsTabSection />
            </div>
          </div>
        </section>

        {/* BLOCK 5: 6 Key Reasons Why Choose Us */}
        <section className="py-14 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Uu diem vuot troi"
              title="6 Ly Do Doanh Nghiep Soc Son Tin Chon Chung Toi"
            />

            <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {rs.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 6: Dynamic Animated Stats Counter Section */}
        <section className="py-14 bg-[#04266F] text-white border-b border-blue-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
        <section className="py-10 bg-white border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 text-center">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
              Duoc Tin Tuong Boi Cac Thuong Hieu Tai Soc Son & Ha Noi
            </span>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap">
              {partnerLogos.concat(partnerLogos).map((partnerName, idx) => (
                <div
                  key={idx}
                  className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-xs shadow-xs hover:border-red-300 transition-colors"
                >
                  {partnerName}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 8: Workflow Stepper 4 Steps Section */}
        <section className="py-14 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Quy trinh lam viec"
              title="4 Buoc Hop Tac Ke Toan Thue Don Gian & Toc Do"
            />

            <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.workflow.map((st) => (
                <StepItem key={st.step} step={st} />
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 9: Pricing Packages Summary Table Section */}
        <section className="py-14 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Bang gia cong khai"
              title="Bang Gia Dich Vu Ke Toan Thue Tron Goi"
              description="Bao gia minh bach ngay tu dau, khong phi an. Mien phi nhan chung tu tan nha tai Soc Son."
            />

            <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {siteConfig.pricingPackages.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 10: Customer Testimonials Cards Section */}
        <section className="py-14 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Danh gia khach hang"
              title="Khach Hang Noi Gi Ve Ke Toan Thue Soc Son?"
            />

            <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {siteConfig.testimonials.map((t, idx) => (
                <TestimonialCard key={idx} testimonial={t} />
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 11: Latest Blog Articles Grid Section */}
        <section className="py-14 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <span className="px-3 py-1 rounded-full bg-red-50 text-[#D7181F] text-xs font-bold uppercase border border-red-200">
                  Tin tuc & Kien thuc
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900 mt-2">
                  Bai Viet Ke Toan Thue Moi Nhat 2026
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D7181F] hover:text-red-700"
              >
                <span>Xem tat ca bai viet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 12: Contact Form Section */}
        <section id="lien-he" className="py-14 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              subtitle="Tu van truc tiep"
              title="Dang Ky Nhan Tu Van Ke Toan Thue Soc Son"
              description="De lai thong tin, chuyen vien ke toan truong se goi lai tu van giai phap toi uu cho doanh nghiep cua ban"
            />
            <div className="mt-10 sm:mt-12">
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
