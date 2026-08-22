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
        { success: false, error: "Số điện thoại không đúng định dạng (Ví dụ: 0979065067)." },
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

    // 5. Send Instant Zalo OA Chatbot Notification (if ZALO_OA_ACCESS_TOKEN & ZALO_ADMIN_USER_ID exist)
    const zaloToken = process.env.ZALO_OA_ACCESS_TOKEN;
    const zaloUserId = process.env.ZALO_ADMIN_USER_ID;
    if (zaloToken && zaloUserId) {
      try {
        const zaloMsg = `🔔 KHÁCH HÀNG MỚI ĐĂNG KÝ TƯ VẤN 🔔\n\n` +
          `👤 Họ và tên: ${submissionData.fullName}\n` +
          `📞 Số điện thoại: ${submissionData.phone}\n` +
          `📧 Email: ${submissionData.email || "Không có"}\n` +
          `💼 Dịch vụ: ${submissionData.service}\n` +
          `📝 Lời nhắn: ${submissionData.message || "Không có"}\n` +
          `⏰ Thời gian: ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`;

        await fetch("https://openapi.zalo.me/v2.0/oa/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access_token": zaloToken,
          },
          body: JSON.stringify({
            recipient: { user_id: zaloUserId },
            message: { text: zaloMsg },
          }),
        });
      } catch (zaloErr) {
        console.error("Zalo OA Notification error:", zaloErr);
      }
    }

    // 6. Send Instant Telegram Bot Notification (if TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID exist)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramToken && telegramChatId) {
      try {
        const textMessage = `🔔 *KHÁCH HÀNG MỚI ĐĂNG KÝ TƯ VẤN* 🔔\n\n` +
          `👤 *Họ và tên:* ${submissionData.fullName}\n` +
          `📞 *Số điện thoại:* \`${submissionData.phone}\`\n` +
          `📧 *Email:* ${submissionData.email || "Không có"}\n` +
          `💼 *Dịch vụ quan tâm:* ${submissionData.service}\n` +
          `📝 *Lời nhắn:* ${submissionData.message || "Không có"}\n` +
          `⏰ *Thời gian:* ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`;

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: textMessage,
            parse_mode: "Markdown",
          }),
        });
      } catch (tgErr) {
        console.error("Telegram notification error:", tgErr);
      }
    }

    // 6. Send Zalo Webhook / Custom Notification (if WEBHOOK_NOTIFICATION_URL exists)
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
      message: "Cảm ơn bạn đã gửi thông tin liên hệ! Chuyên viên sẽ gọi lại tư vấn trong 15 phút.",
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
