const https = require("https");

const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

console.log("mrkt-alert-sniper started");
console.log("ENV CHECK:", TG_TOKEN ? "OK" : "NO TOKEN", TG_CHAT_ID ? "OK" : "NO CHAT ID");

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

  const req = https.request(options, res => {
    res.on("data", d => {});
  });

  req.on("error", error => {
    console.error("TG ERROR:", error);
  });

  req.write(data);
  req.end();
}

// heartbeat
setInterval(() => {
  console.log("heartbeat:", new Date().toISOString());
}, 15000);

// TEST ALERT
setInterval(() => {
  const price = (Math.random() * 5 + 1).toFixed(2);
  const msg = `🚨 ALERT\nPossible misprice detected\nPrice: ${price} TON`;
  console.log(msg);
  sendTelegram(msg);
}, 30000);
