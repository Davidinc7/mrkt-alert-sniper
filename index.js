const https = require("https");

const TOKEN = process.env.TG_TOKEN;
const CHAT_ID = process.env.TG_CHAT_ID;

console.log("mrkt-alert-sniper started");

function send(msg) {
  if (!TOKEN || !CHAT_ID) {
    console.log("Telegram env missing");
    return;
  }

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`;

  https.get(url, () => {});
}

send("✅ TEST OK: mrkt-alert-sniper online");

setInterval(() => {
  console.log("heartbeat", new Date().toISOString());
}, 15000);
