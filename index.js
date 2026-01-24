import fetch from "node-fetch";

// ================== CONFIG ==================
const MRKT_API_BASE = "https://tgmrkt.io/api"; // mini‑app backend relay
const POLL_INTERVAL_MS = 500; // 0.5s (tez + barqaror)
const PRICE_DISCOUNT_PCT = 25; // floor’dan 25% arzon bo‘lsa alert

// Telegram (Railway ENV’da allaqachon BOR deb hisoblayman)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_IDS = process.env.CHAT_IDS.split(","); // "id1,id2,id3"

// ================== STATE ==================
let lastCursor = null;
const seen = new Set(); // gift_id dedupe

// ================== HELPERS ==================
async function tgSend(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await Promise.all(
    CHAT_IDS.map(id =>
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: id, text, disable_web_page_preview: true })
      })
    )
  );
}

function isActiveGift(g) {
  return (
    g &&
    g.status === "ACTIVE" &&
    !g.is_premarket &&           // ❌ pre-market-listing
    !g.is_premarket_sale &&      // ❌ pre-market-sale
    g.price > 0
  );
}

function isMispriced(g) {
  if (!g.floor_price || g.floor_price <= 0) return false;
  const discount = 100 - Math.round((g.price / g.floor_price) * 100);
  return discount >= PRICE_DISCOUNT_PCT;
}

// ================== CORE ==================
async function pollMrktFeed() {
  try {
    const url =
      `${MRKT_API_BASE}/gifts/feed` +
      (lastCursor ? `?cursor=${encodeURIComponent(lastCursor)}` : "");

    const res = await fetch(url, { timeout: 8000 });
    if (!res.ok) return;

    const data = await res.json();
    if (!data || !Array.isArray(data.items)) return;

    lastCursor = data.next_cursor || lastCursor;

    for (const g of data.items) {
      if (!isActiveGift(g)) continue;
      if (seen.has(g.id)) continue;
      seen.add(g.id);

      if (isMispriced(g)) {
        const discount =
          100 - Math.round((g.price / g.floor_price) * 100);

        const msg =
`⚡️ MISPRICED GIFT
🎁 ${g.title || g.name}
🆔 #${g.id}
💰 Price: ${g.price} TON
📉 Floor: ${g.floor_price} TON
🔥 Discount: -${discount}%
🔗 https://t.me/mrkt`;

        await tgSend(msg);
      }
    }

    // RAM nazorati
    if (seen.size > 5000) {
      const arr = Array.from(seen).slice(-2000);
      seen.clear();
      arr.forEach(x => seen.add(x));
    }
  } catch (e) {
    // jim ishlaydi, Railway yiqilmaydi
  }
}

// ================== START ==================
console.log("🚀 MRKT FEED SNIPER STARTED (ACTIVE ONLY)");
setInterval(pollMrktFeed, POLL_INTERVAL_MS);
