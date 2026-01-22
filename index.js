const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

console.log("BOOT OK - SEND TEST");

fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: TG_CHAT_ID,
    text: "✅ TEST MESSAGE FROM RAILWAY"
  })
})
.then(r => r.json())
.then(d => console.log("TG RESPONSE:", d))
.catch(e => console.error("TG ERROR:", e));
