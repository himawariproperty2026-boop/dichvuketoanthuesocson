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
      message: "Chưa tìm thấy tin nhắn từ Nhóm Zalo. Vui lòng bấm mở link Zalo Bot (https://bot.zaloplatforms.com/groups/invite/bot.DTyrkYnP) để THÊM BOT VÀO NHÓM ZALO và gõ 1 tin nhắn (Ví dụ: Hi), sau đó tải lại trang này (https://dichvuketoanthuesocson.vercel.app/api/zalo-chat-id)!",
      vercel_url: "https://dichvuketoanthuesocson.vercel.app/api/zalo-chat-id",
      rawResponse: data,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "Lỗi kết nối Zalo Bot Platform",
    });
  }
}
