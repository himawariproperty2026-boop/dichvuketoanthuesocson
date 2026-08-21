import React from "react";
import Metadata from "next";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ContactPopup } from "@/components/ContactPopup";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Chính Sách Bảo Mật Dữ Liệu Cá Nhân - Tuân Thủ Nghị Định 13/2023/NĐ-CP",
  description:
    "Chính sách bảo vệ và xử lý dữ liệu cá nhân của Dịch vụ Kế toán Thuế Sóc Sơn tuân thủ đầy đủ tinh thần Nghị định 13/2023/NĐ-CP của Chính phủ Việt Nam.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {/* Banner Hero */}
        <section className="bg-pastel-hero py-14 sm:py-20 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4 font-semibold">
              <Link href="/" className="hover:text-[#D7181F]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#D7181F] font-bold">Chính sách bảo mật</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#D7181F] text-xs font-bold mb-3 border border-red-200">
              <ShieldCheck className="w-4 h-4" />
              <span>Tuân thủ Nghị định 13/2023/NĐ-CP</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Chính Sách Bảo Mật & Bảo Vệ Dữ Liệu Cá Nhân
            </h1>
            <p className="mt-3 text-slate-600 text-sm">
              Cập nhật và có hiệu lực áp dụng tại {siteConfig.companyName}
            </p>
          </div>
        </section>

        {/* Legal Text Body strictly following Decree 13/2023/NĐ-CP */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
            <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 text-slate-900 text-xs sm:text-sm">
              <strong>Thông báo tuân thủ pháp luật:</strong> Bản Chính sách bảo mật này được xây dựng và áp dụng nghiêm ngặt theo quy định tại <strong>Nghị định số 13/2023/NĐ-CP</strong> của Chính phủ ban hành ngày 17/04/2023 về Bảo vệ dữ liệu cá nhân tại Việt Nam.
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                1. Loại Dữ Liệu Cá Nhân Thu Thập
              </h2>
              <p>
                Khi Quý khách truy cập website hoặc gửi form đăng ký tư vấn tại <strong>{siteConfig.domain}</strong>, chúng tôi chỉ thu thập các dữ liệu cá nhân cơ bản cần thiết bao gồm:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                <li>Họ và tên người đại diện / người liên hệ.</li>
                <li>Số điện thoại liên lạc (Di động / Zalo).</li>
                <li>Địa chỉ Email cá nhân hoặc Email công ty.</li>
                <li>Tên doanh nghiệp, mã số thuế (MST) và địa chỉ đăng ký kinh doanh tại Sóc Sơn (nếu có).</li>
                <li>Nội dung lời nhắn hoặc yêu cầu tư vấn cụ thể do Quý khách tự nguyện cung cấp.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                2. Mục Đích Xử Lý & Sử Dụng Dữ Liệu
              </h2>
              <p>
                Toàn bộ dữ liệu cá nhân thu thập được chỉ được sử dụng cho các mục đích hợp pháp sau đây:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                <li>Liên hệ lại để tư vấn các giải pháp kế toán, thuế, thành lập doanh nghiệp theo đúng yêu cầu của Quý khách.</li>
                <li>Soạn thảo hợp đồng dịch vụ kế toán thuế và thực hiện báo cáo thuế với cơ quan nhà nước có thẩm quyền.</li>
                <li>Gửi thông báo cập nhật về hạn nộp báo cáo thuế, thay đổi chính sách thuế mới hoặc bản tin kinh nghiệm thuế.</li>
                <li>Nâng cao chất lượng dịch vụ và bảo vệ quyền lợi hợp pháp của Quý khách theo cam kết hợp đồng.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                3. Quyền Của Chủ Thể Dữ Liệu (Theo Quy Định Tại Nghị Định 13/2023/NĐ-CP)
              </h2>
              <p>
                Quý khách có đầy đủ các quyền đối với dữ liệu cá nhân của mình theo quy định tại Nghị định số 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                <li><strong>Quyền được biết & đồng ý:</strong> Được biết rõ mục đích thu thập và chỉ xử lý khi được Quý khách cho phép.</li>
                <li><strong>Quyền truy cập & chỉnh sửa:</strong> Có quyền yêu cầu kiểm tra, cập nhật hoặc điều chỉnh thông tin cá nhân sai lệch.</li>
                <li><strong>Quyền yêu cầu xóa / hủy bỏ dữ liệu:</strong> Quý khách có quyền yêu cầu chúng tôi xóa vĩnh viễn dữ liệu cá nhân khỏi hệ thống bất kỳ lúc nào nếu không còn nhu cầu sử dụng dịch vụ.</li>
                <li><strong>Quyền rút lại sự đồng ý:</strong> Quý khách có thể yêu cầu ngừng nhận email bản tin hoặc cuộc gọi tư vấn bằng cách liên hệ với chúng tôi.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                4. Cam Kết Bảo Mật & Thời Gian Lưu Trữ
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                <li><strong>Không mua bán hay chia sẻ:</strong> Chúng tôi cam kết tuyệt đối KHÔNG bán, chia sẻ hay tiết lộ dữ liệu cá nhân của Quý khách cho bất kỳ bên thứ ba nào vì mục đích thương mại.</li>
                <li><strong>Biện pháp kỹ thuật:</strong> Thông tin lưu trữ được bảo mật bằng mã hóa SSL/TLS và các biện pháp tường lửa kỹ thuật an toàn.</li>
                <li><strong>Thời gian lưu trữ:</strong> Dữ liệu được lưu trữ trong suốt thời gian thực hiện hợp đồng hoặc cho đến khi Quý khách gửi yêu cầu hủy bỏ theo quy định.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                5. Thông Tin Liên Hệ Tiếp Nhận Yêu Cầu Về Dữ Liệu
              </h2>
              <p>
                Nếu Quý khách muốn thực hiện quyền điều chỉnh, truy cập hoặc xóa dữ liệu cá nhân, xin vui lòng liên hệ với Bộ phận Bảo vệ Dữ liệu của chúng tôi qua:
              </p>
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-1 text-xs sm:text-sm font-semibold text-slate-900">
                <p>• <strong>CÔNG TY TNHH TƯ VẤN KẾ TOÁN & THUẾ SÓC SƠN</strong></p>
                <p>• <strong>Địa chỉ:</strong> {siteConfig.contact.address}</p>
                <p>• <strong>Hotline/Zalo:</strong> {siteConfig.contact.phoneDisplay}</p>
                <p>• <strong>Email tiếp nhận:</strong> {siteConfig.contact.email}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingButtons />
      <ContactPopup />
      <Footer />
    </div>
  );
}
