const https = require("https");

console.log("mrkt-alert-sniper started");

const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

if (!TG_TOKEN || !TG_CHAT_ID) {
  console.error("❌ TG_TOKEN yoki TG_CHAT_ID yo‘q");
  process.exit(1);
}

function sendTelegram(text) {
  const data = JSON.stringify({
    chat_id: TG_CHAT_ID,
    text: text,
  });

  const options = {
    hostname: "api.telegram.org",
    path: `/bot${TG_TOKEN}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = https.request(options, (res) => {
    res.on("data", () => {});
  });

  req.on("error", (e) => {
    console.error("Telegram error:", e.message);
  });

  req.write(data);
  req.end();
}

/* HEARTBEAT — crash bo‘lmasligi uchun */
setInterval(() => {
  console.log("heartbeat:", new Date().toISOString());
}, 15000);

/* TEST MESSAGE — 1 marta */
setTimeout(() => {
  sendTelegram("✅ MRKT ALERT BOT ONLINE (CommonJS mode)");
}, 5000);
