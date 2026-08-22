import { NextResponse } from "next/server";
import { lastDetectedZaloChatId } from "../zalo-webhook/route";

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

    // 5. Send Instant Zalo Bot Platform Notification (bot.zaloplatforms.com)
    const zaloBotToken = process.env.ZALO_BOT_TOKEN || "15841953902216267:mHnNxKmCdDaWQOIFASXIIqPamobUEFSYChnzTZhhcCuiPArjqGaOPxNdiNvCwZBB";
    const zaloChatId = process.env.ZALO_CHAT_ID || lastDetectedZaloChatId || "zgr-cac417836eef87b1defe";
    if (zaloBotToken && zaloChatId) {
      try {
        const textMessage = `🔔 *KHÁCH HÀNG MỚI ĐĂNG KÝ TƯ VẤN* 🔔\n\n` +
          `👤 *Họ và tên:* ${submissionData.fullName}\n` +
          `📞 *Số điện thoại:* \`${submissionData.phone}\`\n` +
          `📧 *Email:* ${submissionData.email || "Không có"}\n` +
          `💼 *Dịch vụ quan tâm:* ${submissionData.service}\n` +
          `📝 *Lời nhắn:* ${submissionData.message || "Không có"}\n` +
          `⏰ *Thời gian:* ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`;

        await fetch(`https://bot-api.zaloplatforms.com/bot${zaloBotToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: zaloChatId,
            text: textMessage,
            parse_mode: "markdown",
          }),
        });
      } catch (zaloBotErr) {
        console.error("Zalo Bot notification error:", zaloBotErr);
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

    // 6. Send Zalo OA Platform Chatbot Notification (if ZALO_OA_ACCESS_TOKEN & ZALO_RECEIVER_ID exist)
    const zaloAccessToken = process.env.ZALO_OA_ACCESS_TOKEN;
    const zaloReceiverId = process.env.ZALO_RECEIVER_ID;
    if (zaloAccessToken && zaloReceiverId) {
      try {
        const zaloMessageText = `🔔 KHÁCH HÀNG MỚI ĐĂNG KÝ TƯ VẤN 🔔\n\n` +
          `👤 Họ và tên: ${submissionData.fullName}\n` +
          `📞 Số điện thoại: ${submissionData.phone}\n` +
          `📧 Email: ${submissionData.email || "Không có"}\n` +
          `💼 Dịch vụ quan tâm: ${submissionData.service}\n` +
          `📝 Lời nhắn: ${submissionData.message || "Không có"}\n` +
          `⏰ Thời gian: ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`;

        await fetch("https://openapi.zalo.me/v3.0/oa/message/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access_token": zaloAccessToken,
          },
          body: JSON.stringify({
            recipient: { user_id: zaloReceiverId },
            message: { text: zaloMessageText },
          }),
        });
      } catch (zaloErr) {
        console.error("Zalo OA API notification error:", zaloErr);
      }
    }

    // 7. Send Zalo Chatbot Platform Webhook (Ahachat / Fchat / Botcake / n8n / Custom Webhook)
    const webhookUrl = process.env.ZALO_WEBHOOK_URL || process.env.WEBHOOK_NOTIFICATION_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_name: "new_lead_registration",
            source: "MinhHoaProtaxWebsite",
            lead: submissionData,
          }),
        });
      } catch (webhookErr) {
        console.error("Zalo Webhook notification failed:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Cảm ơn bạn đã gửi thông tin liên hệ! Chuyên viên kế toán trưởng sẽ gọi lại tư vấn trong 15 phút.",
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
