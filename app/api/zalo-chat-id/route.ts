import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.ZALO_BOT_TOKEN || "15841953902216267:mHnNxKmCdDaWQOIFASXIIqPamobUEFSYChnzTZhhcCuiPArjqGaOPxNdiNvCwZBB";

  try {
    const res = await fetch(`https://bot-api.zaloplatforms.com/bot${token}/getUpdates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timeout: 1 }),
    });

    const data = await res.json();

    if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
      const lastUpdate = data.result[data.result.length - 1];
      const chatId = lastUpdate?.message?.chat?.id || lastUpdate?.message?.from?.id;

      return NextResponse.json({
        success: true,
        zaloChatId: chatId,
        instructions: `Mã ZALO_CHAT_ID của bạn là: ${chatId}`,
        rawMessage: lastUpdate,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Chưa tìm thấy tin nhắn mới. Vui lòng mở Zalo Bot (https://bot.zaloplatforms.com/groups/invite/bot.DTyrkYnP) và gửi 1 tin nhắn bất kỳ (Ví dụ: Hi), sau đó tải lại trang này!",
      rawResponse: data,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "Lỗi kết nối Zalo Bot Platform",
    });
  }
}
