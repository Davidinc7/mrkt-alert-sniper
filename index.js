import https from "https";

const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

if (!TG_TOKEN || !TG_CHAT_ID) {
  console.error("TG_TOKEN yoki TG_CHAT_ID yo‘q");
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
      "Content-Length": data.length
    }
  };

  const req = https.request(options);
  req.write(data);
  req.end();
}

// HEARTBEAT
setInterval(() => {
  console.log("heartbeat:", new Date().toISOString());
}, 15000);

// ALERT
setInterval(() => {
  const price = (Math.random() * 5 + 1).toFixed(2);
  const msg = `🚨 MRKT ALERT\nPossible misprice → ${price} TON`;
  console.log(msg);
  sendTelegram(msg);
}, 30000);
