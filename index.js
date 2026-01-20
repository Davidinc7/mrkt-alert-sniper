console.log("mrkt-alert-sniper started");

setInterval(() => {
  console.log("heartbeat:", new Date().toISOString());
}, 15000);

// FAKE ALERT TEST
setInterval(() => {
  const price = (Math.random() * 5 + 1).toFixed(2);
  console.log("ALERT: Possible misprice detected →", price, "TON");
}, 30000);
