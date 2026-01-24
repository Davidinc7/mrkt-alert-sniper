// Node 18+ da fetch BOR
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_IDS = (process.env.CHAT_IDS || "").split(",").filter(Boolean);

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN yo‘q");
  process.exit(1);
}
if (CHAT_IDS.length === 0) {
  console.error("❌ CHAT_IDS yo‘q");
  process.exit(1);
}

async function send(text) {
  for (const chatId of CHAT_IDS) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      })
    });
  }
}

(async () => {
  console.log("✅ BOT ISHGA TUSHDI");
  await send("✅ Mrkt sniper backend LIVE. Keyingi bosqich: FEED ulanadi.");
})();
