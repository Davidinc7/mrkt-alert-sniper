console.log("mrkt-alert-sniper started");

// ENV dan o‘qiymiz
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Telegram yuborish funksiyasi
async function sendTelegram(text) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log("Telegram ENV missing");
    return;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      }),
    });
  } catch (err) {
    console.log("Telegram send error:", err.message);
  }
}

// Heartbeat
setInterval(() => {
  console.log("heartbeat:", new Date().toISOString());
}, 15000);

// FAKE ALERT TEST (hozircha test)
setInterval(() => {
  const price = (Math.random() * 5 + 1).toFixed(2);
  const msg = `🚨 MRKT ALERT\nPossible misprice detected → ${price} TON`;

  console.log(msg);
  sendTelegram(msg);
}, 30000);
