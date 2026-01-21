console.log("BOT_TOKEN:", !!process.env.BOT_TOKEN);
console.log("CHAT_ID:", !!process.env.CHAT_ID);
const https = require("https");

console.log("mrkt-alert-sniper started");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

function sendTelegram(text) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log("Telegram ENV missing");
    return;
  }

  const data = JSON.stringify({
    chat_id: CHAT_ID,
    text: text,
  });

  const options = {
    hostname: "api.telegram.org",
    path: `/bot${BOT_TOKEN}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  const req = https.request(options, (res) => {
    res.on("data", () => {});
  });

  req.on("error", (err) => {
    console.log("Telegram error:", err.message);
  });

  req.write(data);
  req.end();
}

// BOT START TEST
sendTelegram("✅ MRKT ALERT BOT IS ONLINE");

// heartbeat
setInterval(() => {
  console.log("heartbeat:", new Date().toISOString());
}, 15000);

// test alert
setInterval(() => {
  const price = (Math.random() * 5 + 1).toFixed(2);
  const msg = `🚨 MRKT ALERT\nPossible misprice detected → ${price} TON`;
  console.log(msg);
  sendTelegram(msg);
}, 30000);
