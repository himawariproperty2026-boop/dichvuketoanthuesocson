# HƯỚNG DẪN TRIỂN KHAI WEBSITE DỊCH VỤ KẾ TOÁN THUẾ SÓC SƠN
Website: `dichvuketoanthuesocson.com.vn`

---

## 1. TRIỂN KHAI LÊN VERCEL (KHUYÊN DÙNG CHO NEXT.JS)

Vercel là nền tảng điện toán đám mây tối ưu nhất dành cho Next.js App Router (tốc độ cao, miễn phí SSL, tự động nén ảnh Next/Image và hạ tầng CDN toàn cầu).

### Các bước thực hiện:
1. **Đẩy mã nguồn lên GitHub/GitLab:**
   - Tạo một repository riêng (Ví dụ: `dichvuketoanthuesocson`).
   - Push toàn bộ mã nguồn dự án lên repository.

2. **Kết nối dự án trên Vercel Dashboard:**
   - Truy cập [https://vercel.com](https://vercel.com) và đăng nhập.
   - Bấm **"Add New Project"** → Chọn Repository `dichvuketoanthuesocson` từ GitHub.
   - Framework Preset: Tự động nhận diện **Next.js**.

3. **Cấu hình Biến Môi Trường (Environment Variables):**
   Trong mục **Environment Variables** trên Vercel, sao chép các biến từ file `.env.example` sang:
   - `EMAIL_SERVER_HOST`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_TO_NOTIFY`
   - `NEXT_PUBLIC_GA_ID` (Mã Google Analytics 4)
   - `NEXT_PUBLIC_GTM_ID` (Mã Google Tag Manager)
   - `NEXT_PUBLIC_FB_PIXEL_ID` (Mã Facebook Pixel)
   - `KV_REST_API_URL` & `KV_REST_API_TOKEN` (Nếu sử dụng Vercel KV đếm lượt truy cập thật)

4. **Bấm Deploy:** Vercel sẽ tự động build và cấp domain chạy thử (ví dụ `dichvuketoanthuesocson.vercel.app`).

---

## 2. CẤU HÌNH DNS TRỎ TÊN MIỀN `dichvuketoanthuesocson.com.vn`

Đăng nhập vào trang quản lý nhà cung cấp tên miền của bạn (PA Việt Nam, Mắt Bão, INET, Cloudflare...) và cấu hình các bản ghi DNS sau:

| Loại bản ghi (Type) | Tên bản ghi (Host/Name) | Giá trị (Value / Target) | Mục đích |
|---|---|---|---|
| **A Record** | `@` | `76.76.21.21` | Trỏ domain chính `dichvuketoanthuesocson.com.vn` về Vercel |
| **CNAME Record** | `www` | `cname.vercel-dns.com` | Trỏ tên miền `www.dichvuketoanthuesocson.com.vn` |

*Lưu ý: Thời gian cập nhật DNS thường từ 5 - 30 phút. SSL (HTTPS) sẽ được Vercel tự động khởi tạo miễn phí 100%.*

---

## 3. CHECKLIST TRƯỚC KHI BẤM LAUNCH CHÍNH THỨC

- [ ] Cập nhật SĐT Hotline, Zalo, Email, MST và Địa chỉ Sóc Sơn thật tại `lib/siteConfig.ts`.
- [ ] Cập nhật bảng giá 3 gói và các dịch vụ bổ sung thật tại `lib/siteConfig.ts`.
- [ ] Thay thế các đánh giá mẫu (Testimonials) bằng phản hồi thực tế từ khách hàng.
- [ ] Rà soát nội dung 5 bài blog mẫu với chuyên gia kế toán/luật sư thật.
- [ ] Điền các biến môi trường cấu hình gửi mail thông báo form tư vấn (`.env.local` / Vercel Env).
- [ ] Kiểm tra hiển thị file `https://dichvuketoanthuesocson.com.vn/sitemap.xml` và `robots.txt`.
