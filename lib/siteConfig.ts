// Centralized Site Configuration for Dịch vụ Kế toán Thuế Sóc Sơn
// Website: dichvuketoanthuesocson.com.vn

export const siteConfig = {
  name: "Dịch vụ Kế toán Thuế Sóc Sơn - Minh Hoá Protax",
  companyName: "CÔNG TY TNHH DỊCH VỤ DOANH NGHIỆP MINH HOÁ PROTAX",
  domain: "dichvuketoanthuesocson.com.vn",
  url: "https://dichvuketoanthuesocson.com.vn",
  description: "Dịch vụ kế toán thuế trọn gói, thành lập công ty, thành lập hộ kinh doanh chuyên nghiệp, uy tín hàng đầu của Công ty TNHH Dịch Vụ Doanh Nghiệp Minh Hoá Protax tại Hà Nội & Sóc Sơn.",
  
  // Comprehensive SEO Keywords Dictionary
  seoKeywords: [
    "Minh Hoá Protax",
    "kế toán Minh Hoá Protax",
    "dịch vụ kế toán Sóc Sơn",
    "kế toán thuế Sóc Sơn",
    "thành lập công ty Sóc Sơn",
    "thành lập hộ kinh doanh Sóc Sơn",
    "kế toán Trung Giã Sóc Sơn",
    "kế toán trọn gói Sóc Sơn",
    "báo cáo tài chính Sóc Sơn",
    "quyết toán thuế Sóc Sơn",
    "dịch vụ kế toán thuế Đông Anh",
    "dịch vụ kế toán thuế Mê Linh",
    "kế toán thuế KCN Nội Bài",
    "thuê kế toán ngoài Sóc Sơn",
    "bảng giá dịch vụ kế toán Sóc Sơn",
    "tư vấn thuế Sóc Sơn",
    "hoàn thuế GTGT Sóc Sơn",
    "thay đổi đăng ký kinh doanh Sóc Sơn",
    "kế toán hộ kinh doanh Sóc Sơn",
    "kế toán thuế uy tín Hà Nội"
  ],
  contact: {
    phone: "0979 065 067",
    phoneDisplay: "0979.065.067",
    zalo: "0979065067",
    messenger: "dichvuketoanthuesocson",
    email: "ngochoa621987@gmail.com",
    taxCode: "0111330444",
    representative: "Lê Thị Hoá",
    
    // Primary Headquarters in Trung Gia, Soc Son, Ha Noi
    address: "Số nhà 26, Đường 418, Phổ Nỷ, Xã Trung Giã, Thành phố Hà Nội",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.3854124976!2d105.86411231533664!3d21.28679998588307!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313503b879c5222b%3A0xb35a0928db64b2d3!2zVHLung5nIEdpw6MsIFPDs2MgU8ahbiwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
    workingHours: "Thứ 2 - Thứ 7: 08:00 - 17:30 (Hỗ trợ khẩn cấp 24/7)",
  },

  // Social Links
  social: {
    facebook: "https://www.facebook.com/share/1CZwZSpzcc/?mibextid=wwXIfr",
    zaloPage: "https://zalo.me/0979065067",
    youtube: "https://youtube.com/@ketoanthuesocson",
  },

  // Statistics & Counter configuration (Official from Minh Hoá Protax)
  stats: [
    { id: "clients", value: 100, suffix: "+", label: "Doanh nghiệp & HKD đồng hành", description: "Tại Sóc Sơn, Đông Anh & Hà Nội" },
    { id: "experience", value: 17, suffix: "+", label: "Năm kinh nghiệm", description: "Chuyên sâu kế toán - thuế & pháp lý" },
    { id: "satisfaction", value: 100, suffix: "%", label: "Trách nhiệm hợp đồng", description: "Cam kết đúng hạn & bảo vệ số liệu" },
    { id: "experts", value: 20, suffix: "+", label: "Chuyên viên kế toán", description: "Am hiểu sâu luật thuế địa phương" },
  ],

  // Navigation Menus
  navigation: [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "/gioi-thieu" },
    {
      name: "Dịch vụ",
      href: "/dich-vu",
      children: [
        { name: "Kế toán thuế trọn gói", href: "/dich-vu/ke-toan-thue-tron-goi", desc: "Giải pháp tối ưu chi phí cho công ty vừa & nhỏ" },
        { name: "Thành lập doanh nghiệp", href: "/dich-vu/thanh-lap-doanh-nghiep", desc: "Thành lập công ty cấp tốc chỉ từ 3-5 ngày" },
        { name: "Quyết toán thuế", href: "/dich-vu/quyet-toan-thue", desc: "Bảo vệ tối đa quyền lợi doanh nghiệp khi thanh tra" },
        { name: "Thay đổi đăng ký kinh doanh", href: "/dich-vu/thay-doi-dang-ky-kinh-doanh", desc: "Thay đổi địa chỉ, tên, tăng vốn, ngành nghề" },
        { name: "Hoàn thuế GTGT", href: "/dich-vu/hoan-thue-gtgt", desc: "Hồ sơ chuẩn xác, giải ngân nhanh chóng" },
        { name: "Tư vấn thuế & Kế toán", href: "/dich-vu/tu-van-thue-ke-toan", desc: "Tư vấn rủi ro & hoạch định chi phí hợp lý" },
      ],
    },
    { name: "Bảng giá", href: "/bang-gia" },
    { name: "Blog / Tin tức", href: "/blog" },
    { name: "Liên hệ", href: "/lien-he" },
  ],

  // 6 Main Services Definition
  services: [
    {
      slug: "ke-toan-thue-tron-goi",
      title: "Kế toán Thuế Trọn gói",
      shortDesc: "Thay thế hoàn toàn bộ máy kế toán nội bộ với chi phí chỉ bằng 1/5. Đảm bảo đúng luật, báo cáo chính xác, nộp bù đắp nghĩa vụ thuế đúng hạn.",
      priceStarting: "1.000.000 đ/tháng",
      popular: true,
      iconName: "Calculator",
      highlights: [
        "Kê khai thuế GTGT, TNCN, TNDN hàng tháng/quý",
        "Lập báo cáo tài chính & quyết toán thuế năm",
        "Tư vấn tối ưu chi phí hợp lý hợp lệ",
        "Cam kết chịu 100% trách nhiệm theo hợp đồng"
      ],
    },
    {
      slug: "thanh-lap-doanh-nghiep",
      title: "Thành lập Doanh nghiệp & HKD",
      shortDesc: "Tư vấn chọn mô hình công ty, lập hồ sơ trọn gói, giao GPKD & con dấu tận nơi tại Sóc Sơn trong 3-5 ngày làm việc.",
      priceStarting: "500.000 đ",
      popular: false,
      iconName: "Building2",
      highlights: [
        "Thành lập Hộ kinh doanh: 500.000 đ/bộ",
        "Thành lập Doanh nghiệp: 1.500.000 đ/bộ",
        "Cấp GPKD + Con dấu tròn công ty tận nơi",
        "Miễn phí kê khai thuế ban đầu"
      ],
    },
    {
      slug: "quyet-toan-thue",
      title: "Dịch vụ Quyết toán Thuế",
      shortDesc: "Rà soát toàn bộ sổ sách, phát hiện và khắc phục rủi ro trước khi cơ quan thuế Sóc Sơn/Hà Nội thanh kiểm tra.",
      priceStarting: "2.000.000 đ",
      popular: false,
      iconName: "FileCheck2",
      highlights: [
        "Rà soát đối chiếu hóa đơn chứng từ",
        "Lập lại BCTC chuẩn xác nhất",
        "Trực tiếp giải trình làm việc với Cục/Chi cục Thuế",
        "Tối thiểu rủi ro bị truy thu & nộp phạt"
      ],
    },
    {
      slug: "thay-doi-dang-ky-kinh-doanh",
      title: "Thay đổi Đăng ký Kinh doanh",
      shortDesc: "Thủ tục nhanh chóng khi thay đổi tên công ty, địa chỉ trụ sở, bổ sung ngành nghề, thay đổi người đại diện, tăng giảm vốn điều lệ.",
      priceStarting: "500.000 đ",
      popular: false,
      iconName: "FileEdit",
      highlights: [
        "Thay đổi ĐKKD chỉ từ 500.000 đ",
        "Soạn thảo hồ sơ chuẩn trong 24h",
        "Nộp & nhận kết quả tận tay",
        "Cập nhật thông tin thuế tự động"
      ],
    },
    {
      slug: "hoan-thue-gtgt",
      title: "Dịch vụ Hoàn thuế GTGT",
      shortDesc: "Tư vấn & lập hồ sơ hoàn thuế GTGT cho doanh nghiệp xuất khẩu, dự án đầu tư tại các KCN Sóc Sơn, Mê Linh, Đông Anh.",
      priceStarting: "Thỏa thuận theo hồ sơ",
      popular: false,
      iconName: "Coins",
      highlights: [
        "Kiểm tra tính hợp lệ hóa đơn chứng từ đầu vào",
        "Lập hồ sơ hoàn thuế theo quy định mới nhất",
        "Bảo vệ số liệu trước cơ quan thuế",
        "Thời gian giải ngân nhanh chóng"
      ],
    },
    {
      slug: "tu-van-thue-ke-toan",
      title: "Tư vấn Thuế & Chuyên sâu",
      shortDesc: "Tư vấn cấu trúc chi phí doanh nghiệp, lập kế hoạch thuế dài hạn, xử lý hóa đơn rủi ro, chuyển đổi hộ kinh doanh lên doanh nghiệp.",
      priceStarting: "800.000 đ",
      popular: false,
      iconName: "ShieldAlert",
      highlights: [
        "Phân tích chuyên sâu tình hình tài chính - thuế",
        "Hoạch định chiến lược thuế hợp pháp",
        "Tư vấn giải pháp quản trị rủi ro dòng tiền",
        "Đồng hành hỗ trợ chủ doanh nghiệp"
      ],
    },
  ],

  // Official Pricing Packages configuration from Minh Hoá Protax
  pricingPackages: [
    {
      id: "co-ban",
      name: "GÓI CƠ BẢN",
      target: "Dành cho Hộ kinh doanh & Doanh nghiệp phát sinh dưới 10 hóa đơn/tháng",
      price: "1.000.000",
      period: "đ/tháng",
      recommended: false,
      features: [
        "Dưới 10 hóa đơn/tháng",
        "Ghi sổ kế toán chi tiết",
        "Khai thuế GTGT, TNCN quý",
        "Báo cáo tài chính năm",
        "Quyết toán thuế TNDN",
        "Hỗ trợ qua Zalo, Email",
      ],
    },
    {
      id: "chuyen-nghiep",
      name: "GÓI CHUYÊN NGHIỆP",
      target: "Dành cho doanh nghiệp vừa phát sinh từ 10-50 hóa đơn/tháng",
      price: "3.000.000",
      period: "đ/tháng",
      recommended: true,
      badge: "PHỔ BIẾN NHẤT",
      features: [
        "10-50 hóa đơn/tháng",
        "Tất cả gói Cơ bản",
        "Khai thuế TNDN quý",
        "Tư vấn tối ưu thuế",
        "Đại diện làm việc CQ thuế",
        "Hỗ trợ qua điện thoại 24/7",
      ],
    },
    {
      id: "doanh-nghiep",
      name: "GÓI DOANH NGHIỆP LỚN",
      target: "Dành cho doanh nghiệp sản xuất, KCN phát sinh trên 50 hóa đơn/tháng",
      price: "Từ 5.000.000",
      period: "đ/tháng",
      recommended: false,
      features: [
        "Trên 50 hóa đơn/tháng (Sản xuất, KCN)",
        "Tất cả gói Chuyên nghiệp",
        "Kế toán trưởng phụ trách",
        "Báo cáo quản trị định kỳ",
        "Tư vấn tài chính chiến lược",
        "Ưu tiên xử lý hồ sơ",
      ],
    },
    {
      id: "premium",
      name: "GÓI PREMIUM",
      target: "Trên 100 hóa đơn/tháng. DN lớn, đa chi nhánh.",
      price: "Liên hệ",
      period: "báo giá theo nhu cầu",
      recommended: false,
      buttonText: "Gọi tư vấn",
      features: [
        "Trên 100 hóa đơn/tháng. DN lớn, đa chi nhánh.",
        "Tất cả gói Doanh nghiệp",
        "Tư vấn pháp lý DN",
        "Lập kế hoạch thuế năm",
        "Hỗ trợ thanh tra thuế",
        "Báo cáo hợp nhất & M&A",
        "SLA cam kết riêng",
      ],
    },
  ],

  // Official Add-on Services configuration
  addOnServices: [
    { name: "Thành lập Hộ kinh doanh trọn gói", price: "500.000 đ/bộ", note: "Cấp GPKD + Miễn phí thủ tục thuế ban đầu" },
    { name: "Thành lập Doanh nghiệp trọn gói", price: "1.500.000 đ/bộ", note: "Cấp GPKD + Con dấu tròn tận nơi" },
    { name: "Thay đổi giấy phép đăng ký kinh doanh", price: "Từ 500.000 đ", note: "Thay đổi địa chỉ, tên, tăng vốn, ngành nghề" },
    { name: "Chữ ký số (Token) & Hóa đơn điện tử", price: "Theo gói đối tác", note: "Hỗ trợ đăng ký khởi tạo & tích hợp hệ thống" },
  ],

  // 6 Key Reasons Why Choose Us
  reasons: [
    {
      title: "Chuyên môn sâu & Am hiểu Sóc Sơn",
      desc: "Hơn 17 năm hoạt động tại Sóc Sơn, thông thạo quy trình làm việc với Chi cục Thuế và cơ quan quản lý trên địa bàn.",
      icon: "Award"
    },
    {
      title: "Tối ưu Chi phí Hợp pháp",
      desc: "Hoạch định và cân đối thu chi chuẩn xác, giúp doanh nghiệp tiết kiệm tối đa số thuế phải nộp đúng pháp luật.",
      icon: "TrendingUp"
    },
    {
      title: "Cam kết Bảo mật & Chịu trách nhiệm",
      desc: "Bảo mật tuyệt đối thông tin tài chính. Đền bù 100% tổn thất nếu xảy ra sai sót do vi phạm nghiệp vụ.",
      icon: "ShieldCheck"
    },
    {
      title: "Chi phí Minh bạch - Không phát sinh",
      desc: "Báo giá trọn gói rõ ràng ngay từ đầu, không thu phụ phí ẩn hay chi phí đi lại làm hồ sơ.",
      icon: "CheckCircle2"
    },
    {
      title: "Đồng hành 24/7 & Nhanh chóng",
      desc: "Đội ngũ nhân sự phản hồi giải đáp thắc mắc của chủ doanh nghiệp qua Zalo/Phone trong vòng 15 phút.",
      icon: "Clock"
    },
    {
      title: "Sổ sách Chuẩn chỉ & Giao tận tay",
      desc: "Hệ thống sổ sách in ấn khoa học, lưu trữ cẩn thận và bàn giao định kỳ tận nơi cho doanh nghiệp.",
      icon: "FileSpreadsheet"
    }
  ],

  // Stepper Process (4 Steps)
  workflow: [
    {
      step: 1,
      title: "Tiếp nhận & Khảo sát nhu cầu",
      desc: "Chuyên viên trao đổi chi tiết về tình hình kinh doanh, số lượng hóa đơn và yêu cầu thực tế của doanh nghiệp."
    },
    {
      step: 2,
      title: "Tư vấn giải pháp & Báo giá",
      desc: "Phân tích rủi ro, đưa ra phương án tối ưu thuế và thống nhất chi phí dịch vụ trọn gói không phát sinh."
    },
    {
      step: 3,
      title: "Ký hợp đồng & Tiếp nhận chứng từ",
      desc: "Ký kết hợp đồng bảo mật, nhận hóa đơn chứng từ giao tận nơi hoặc qua file số bảo mật."
    },
    {
      step: 4,
      title: "Thực hiện & Báo cáo định kỳ",
      desc: "Kê khai thuế, vào sổ sách, lập BCTC, báo cáo số liệu và sẵn sàng giải trình với cơ quan thuế khi cần."
    }
  ],

  // IMPORTANT: Testimonials configuration (Chỉ dùng làm dữ liệu mẫu hiển thị giao diện)
  // PLACEHOLDER - thay bằng đánh giá khách hàng thật trước khi launch, không dùng đánh giá mẫu khi lên production
  testimonials: [
    {
      name: "Anh Nguyễn Văn Hùng", // PLACEHOLDER - Thay bằng tên thật
      role: "Chủ Xưởng Cơ Khí Hùng Phát", // PLACEHOLDER - Thay bằng chức vụ/doanh nghiệp thật
      location: "Thị trấn Sóc Sơn, Hà Nội",
      content: "Từ khi dùng dịch vụ kế toán trọn gói ở đây, xưởng cơ khí của tôi hoàn toàn yên tâm về sổ sách hóa đơn. Các bạn tư vấn chi tiết, giải thích rõ ràng và giúp xưởng tiết kiệm chi phí thuế đáng kể.",
      rating: 5,
    },
    {
      name: "Chị Trần Thị Thanh", // PLACEHOLDER - Thay bằng tên thật
      role: "Giám đốc Công ty TNHH Nông Nghiệp Sạch Sóc Sơn", // PLACEHOLDER - Thay bằng chức vụ/doanh nghiệp thật
      location: "Xã Phù Linh, Sóc Sơn",
      content: "Dịch vụ thành lập công ty rất nhanh! Chỉ sau 3 ngày tôi đã nhận được ĐKKD và con dấu tận nơi. Các thủ tục thuế ban đầu cũng được hỗ trợ trọn gói không cần tôi đi lại nhiều.",
      rating: 5,
    },
    {
      name: "Anh Lê Hoàng Nam", // PLACEHOLDER - Thay bằng tên thật
      role: "Chủ Chuỗi Cửa Hàng Vật Tư Đa Phúc", // PLACEHOLDER - Thay bằng chức vụ/doanh nghiệp thật
      location: "KCN Nội Bài, Sóc Sơn",
      content: "Đội ngũ kế toán làm việc rất có trách nhiệm. Lần vừa rồi quyết toán thuế, nhờ sổ sách chuẩn bị kỹ lưỡng nên công ty tôi làm việc với đoàn kiểm tra rất nhanh chóng và thuận lợi.",
      rating: 5,
    },
  ],

  // IMPORTANT: Partner Logotypes configuration
  // PLACEHOLDER - thay bằng danh sách đối tác/khách hàng thật trước khi launch
  partners: [
    "CÔNG TY CP TẬP ĐOÀN NỘI BÀI",
    "XƯỞNG CƠ KHÍ HÙNG PHÁT SÓC SƠN",
    "NÔNG NGHIỆP SẠCH PHÙ LINH",
    "CHUỖI VẬT TƯ ĐA PHÚC",
    "GIA CÔNG THƯƠNG MẠI MÊ LINH",
    "CÔNG TY VẬN TẢI ĐÔ NGHĨA",
  ],

  // FAQ Items
  faqs: [
    {
      question: "Doanh nghiệp mới thành lập tại Sóc Sơn cần làm những thủ tục thuế gì ban đầu?",
      answer: "Doanh nghiệp mới cần mở tài khoản ngân hàng, mua chữ ký số (token), nộp tờ khai lề phí môn bài, đăng ký phương pháp kê khai thuế GTGT và phát hành hóa đơn điện tử. Khi dùng dịch vụ của chúng tôi, tất cả thủ tục ban đầu này đều được hỗ trợ 100% miễn phí."
    },
    {
      question: "Công ty không có hóa đơn đầu ra/đầu vào phát sinh thì có phải nộp báo cáo thuế không?",
      answer: "Có! Dù không phát sinh doanh thu hay chi phí, doanh nghiệp vẫn phải nộp tờ khai thuế GTGT, TNCN hàng quý và Báo cáo tài chính, Quyết toán thuế hàng năm đúng hạn. Nếu không nộp sẽ bị phạt chậm nộp rất nặng từ 2-25 triệu đồng."
    },
    {
      question: "Thuê dịch vụ kế toán ngoài có an toàn và bảo mật hơn kế toán nội bộ không?",
      answer: "Rất an toàn! Chúng tôi ký cam kết bảo mật thông tin (NDA) và chịu trách nhiệm pháp lý trong hợp đồng. Với kinh nghiệm xử lý hàng trăm doanh nghiệp, chúng tôi nắm rõ quy định thuế và rủi ro hơn một kế toán nội bộ ít kinh nghiệm."
    },
    {
      question: "Chi phí dịch vụ kế toán thuế tại Sóc Sơn được tính như thế nào?",
      answer: "Chi phí phụ thuộc vào ngành nghề (thương mại, dịch vụ, sản xuất, xây dựng) và số lượng hóa đơn chứng từ phát sinh thực tế hàng tháng. Giá khởi điểm chỉ từ 500.000 đ/tháng cho hộ kinh doanh và doanh nghiệp nhỏ."
    },
    {
      question: "Nếu xảy ra sai sót do lỗi của dịch vụ kế toán thì xử lý ra sao?",
      answer: "Chúng tôi cam kết 100% trong hợp đồng: Nếu phát sinh phạt do chậm nộp tờ khai hay sai sót nghiệp vụ từ phía kế toán chúng tôi, công ty sẽ chịu hoàn toàn tiền phạt và trực tiếp làm việc giải trình với cơ quan thuế."
    },
    {
      question: "Hồ sơ chứng từ được giao nhận bằng cách nào tại Sóc Sơn?",
      answer: "Chuyên viên của chúng tôi sẽ đến nhận chứng từ hóa đơn gốc tận nơi tại văn phòng/xưởng của bạn trên địa bàn Sóc Sơn, Mê Linh, Đông Anh, hoặc bạn có thể gửi bản chụp/file mềm qua Zalo/Email bảo mật."
    },
    {
      question: "Tôi ở Đông Anh hoặc Mê Linh có dùng dịch vụ kế toán Sóc Sơn được không?",
      answer: "Hoàn toàn được! Chúng tôi phục vụ toàn bộ khu vực Sóc Sơn và các huyện phụ cận như Đông Anh, Mê Linh, Nội Bài. Khoảng cách địa lý không ảnh hưởng vì hồ sơ được hỗ trợ nhận tận nơi hoặc xử lý điện tử."
    }
  ]
};

export type ServiceItem = (typeof siteConfig.services)[0];
export type PricingPackage = (typeof siteConfig.pricingPackages)[0];
