const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

console.log("BOOT OK - TELEGRAM TEST STARTED");

async function sendTelegram(text) {
  const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TG_CHAT_ID,
      text: text
    })
  });

  const data = await res.text();
  console.log("TG STATUS:", res.status);
  console.log("TG RESPONSE:", data);
}

sendTelegram("✅ TEST MESSAGE FROM RAILWAY (NO node-fetch)");
