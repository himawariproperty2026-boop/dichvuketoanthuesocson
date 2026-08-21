import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, service, message, source, website_url, recaptchaToken } = body;

    // 1. Anti-spam Honeypot Check
    // If the hidden 'website_url' field is filled, it's a spam bot.
    if (website_url && website_url.trim() !== "") {
      console.warn("Spam bot detected via honeypot field:", website_url);
      // Return 200 OK to trick the bot into thinking it succeeded
      return NextResponse.json({
        success: true,
        message: "Cảm ơn bạn đã gửi thông tin liên hệ!",
      });
    }

    // 2. Server-side Input Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Họ và tên không hợp lệ." },
        { status: 400 }
      );
    }

    // Validate Vietnamese Phone Number
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    const cleanPhone = phone ? phone.replace(/[\s\.\-\(\)]/g, "") : "";
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: "Số điện thoại không đúng định dạng (Ví dụ: 0987654321)." },
        { status: 400 }
      );
    }

    // 3. Optional Google reCAPTCHA v3 Verification (if RECAPTCHA_SECRET_KEY is provided)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && recaptchaToken) {
      try {
        const recaptchaRes = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`,
          { method: "POST" }
        );
        const recaptchaData = await recaptchaRes.json();
        if (!recaptchaData.success || recaptchaData.score < 0.5) {
          return NextResponse.json(
            { success: false, error: "Xác thực chống spam reCAPTCHA thất bại." },
            { status: 400 }
          );
        }
      } catch (recaptchaErr) {
        console.error("reCAPTCHA verification error:", recaptchaErr);
      }
    }

    // 4. Log Contact Submission in Server Console
    const submissionData = {
      fullName: fullName.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : "",
      service: service || "Kế toán thuế trọn gói",
      message: message ? message.trim() : "",
      source: source || "WebsiteForm",
      createdAt: new Date().toISOString(),
    };

    console.log("=== NEW CONTACT SUBMISSION RECEIVED ===");
    console.log(submissionData);

    // 5. Optional Webhook Notification (e.g. Telegram / Zalo OA / CRM)
    const webhookUrl = process.env.WEBHOOK_NOTIFICATION_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });
      } catch (webhookErr) {
        console.error("Webhook notification failed:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Cảm ơn bạn đã gửi thông tin liên hệ! Chuyên viên Sóc Sơn sẽ gọi lại trong 15 phút.",
      data: submissionData,
    });
  } catch (error) {
    console.error("Error processing contact form API:", error);
    return NextResponse.json(
      { success: false, error: "Đã có lỗi hệ thống xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
