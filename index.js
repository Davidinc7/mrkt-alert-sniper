const https = require("https");

const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

if (!TG_TOKEN || !TG_CHAT_ID) {
  console.error("TG_TOKEN yoki TG_CHAT_ID topilmadi");
  process.exit(1);
}

console.log("mrkt-alert-sniper started");

function sendTelegram(text) {
  const data = JSON.stringify({
    chat_id: TG_CHAT_ID,
    text: text
  });

  const options = {
    hostname: "api.telegram.org",
    path: `/bot${TG_TOKEN}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data)
    }
  };

  const req = https.request(options, res => {
    res.on("data", () => {});
  });

  req.on("error", err => {
    console.error("Telegram error:", err.message);
  });

  req.write(data);
  req.end();
}

// HEARTBEAT
setInterval(() => {
  console.log("heartbeat:", new Date().toISOString());
}, 15000);

// ALERT TEST
setInterval(() => {
  const price = (Math.random() * 5 + 1).toFixed(2);
  const msg = `🚨 MRKT ALERT\nPossible misprice → ${price} TON`;
  console.log(msg);
  sendTelegram(msg);
}, 30000);
console.log("ENV CHECK:", TG_TOKEN, TG_CHAT_ID);
console.log("mrkt-alert-sniper started");
