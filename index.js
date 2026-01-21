import http from "http";

const PORT = process.env.PORT || 3000;

console.log("mrkt-alert-sniper started");

// --- HTTP SERVER (Railway uchun MUHIM) ---
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("MRKT ALERT BOT IS RUNNING\n");
});

server.listen(PORT, () => {
  console.log("HTTP server listening on port", PORT);
});

// --- ENV CHECK ---
console.log("BOT_TOKEN:", !!process.env.BOT_TOKEN);
console.log("CHAT_ID:", !!process.env.CHAT_ID);

// --- HEARTBEAT ---
setInterval(() => {
  console.log("heartbeat:", new Date().toISOString());
}, 15000);

// --- FAKE ALERT TEST ---
setInterval(() => {
  const price = (Math.random() * 5 + 1).toFixed(2);
  console.log("ALERT: Possible misprice detected →", price, "TON");
}, 30000);
