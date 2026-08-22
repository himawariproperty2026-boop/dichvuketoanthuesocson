import { NextResponse } from "next/server";

// Store last detected Zalo Chat ID in memory for active runtime
export let lastDetectedZaloChatId: string | null = null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("=== INCOMING ZALO BOT WEBHOOK ===", JSON.stringify(body, null, 2));

    // Extract chat_id from Zalo Bot Platform webhook payload
    const chatId =
      body?.message?.chat?.id ||
      body?.message?.from?.id ||
      body?.chat_id ||
      body?.recipient?.id;

    if (chatId) {
      lastDetectedZaloChatId = String(chatId);
      console.log("✅ CAPTURED ZALO CHAT ID:", lastDetectedZaloChatId);

      // Send instant confirmation message back to the Zalo Group using Zalo Bot API
      const token = process.env.ZALO_BOT_TOKEN || "15841953902216267:mHnNxKmCdDaWQOIFASXIIqPamobUEFSYChnzTZhhcCuiPArjqGaOPxNdiNvCwZBB";
      try {
        await fetch(`https://bot-api.zaloplatforms.com/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: String(chatId),
            text: `🎉 *KẾT NỐI ZALO BOT THÀNH CÔNG!*\n\n` +
              `Mã *ZALO_CHAT_ID* của nhóm này là: \`${chatId}\`\n\n` +
              `Từ bây giờ, mọi thông tin khách hàng đăng ký tư vấn trên website sẽ tự động nổ thông báo vào nhóm Zalo này!`,
            parse_mode: "markdown",
          }),
        });
      } catch (replyErr) {
        console.error("Zalo Bot reply error:", replyErr);
      }
    }

    return NextResponse.json({ ok: true, received: true, chatId });
  } catch (error: any) {
    console.error("Error processing Zalo Webhook:", error);
    return NextResponse.json({ ok: true, error: error.message });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Zalo Webhook Active",
    lastDetectedZaloChatId,
  });
}
