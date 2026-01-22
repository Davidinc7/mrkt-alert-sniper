const https = require("https");

const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

if (!TG_TOKEN || !TG_CHAT_ID) {
  console.error("TG_TOKEN yoki TG_CHAT_ID yo‘q");
  process.exit(1);
}

function sendTelegram(text) {
  const data = JSON.stringify({
    chat_id: TG_CHAT_ID,
    text: text,
  });

  const options = {
    hostname: "api.telegram.org",
    path: /bot${TG_TOKEN}/sendMessage,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  const req = https.request(options, (res) => {
    let body = "";
    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      console.log("TG RESPONSE:", body);
    });
  });

  req.on("error", (err) => {
    console.error("TG ERROR:", err.message);
  });

  req.write(data);
  req.end();
}

console.log("mrkt-alert-sniper started");

// heartbeat – Railway o‘chirmasligi uchun
setInterval(() => {
  console.log("heartbeat:", new Date().toISOString());
}, 15000);

// ALERT SIMULYATSIYA (TEST)
setInterval(() => {
  const price = (Math.random() * 5 + 1).toFixed(2);
  const msg = 🚨 ALERT: Possible misprice → ${price} TON;
  console.log(msg);
  sendTelegram(msg);
}, 30000);
