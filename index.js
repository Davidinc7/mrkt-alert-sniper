// Node 18+ da fetch avtomatik mavjud

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_IDS = process.env.CHAT_IDS.split(",");

// MRKT feed endpoint (mini‑app backend)
const FEED_URL = "https://tgmrkt.io/api/gifts/feed";

let seen = new Set();

async function sendTG(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  for (const chatId of CHAT_IDS) {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text,
        disable_web_page_preview: true
      })
    });
  }
}

async function pollFeed() {
  try {
    const res = await fetch(FEED_URL, { cache: "no-store" });
    if (!res.ok) return;

    const data = await res.json();
    if (!Array.isArray(data.items)) return;

    for (const g of data.items) {
      // ❌ pre‑marketni o‘tkazib yuboramiz
      if (g.is_premarket || g.is_premarket_sale) continue;
      if (g.status !== "ACTIVE") continue;
      if (seen.has(g.id)) continue;

      seen.add(g.id);

      // floor bilan solishtiramiz
      if (g.floor_price && g.price < g.floor_price * 0.75) {
        const discount = Math.round(
          100 - (g.price / g.floor_price) * 100
        );

        await sendTG(
          `⚡️ ARZON GIFT\n` +
          `🎁 ${g.title || g.name}\n` +
          `🆔 #${g.id}\n` +
          `💰 ${g.price} TON\n` +
          `📉 Floor: ${g.floor_price} TON\n` +
          `🔥 -${discount}%\n` +
          `🔗 https://t.me/mrkt`
        );
      }
    }
  } catch (e) {
    console.error("FEED ERROR", e.message);
  }
}

console.log("🚀 MRKT REAL FEED SNIPER ISHLADI");

setInterval(pollFeed, 400); // 0.4s — tez, lekin o‘lmaydi
