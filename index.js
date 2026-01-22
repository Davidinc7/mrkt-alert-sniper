console.log("BOOT OK - TELEGRAM TEST STARTED");
sendTelegram("TEST MESSAGE FROM RAILWAY");
function sendTelegram(text) {
  const data = JSON.stringify({
    chat_id: TG_CHAT_ID,
    text
  });

  const options = {
    hostname: "api.telegram.org",
    path: `/bot${TG_TOKEN}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const req = https.request(options, res => {
    console.log("TG STATUS:", res.statusCode);

    res.on("data", d => {
      console.log("TG RESPONSE:", d.toString());
    });
  });

  req.on("error", err => {
    console.error("TG ERROR:", err);
  });

  req.write(data);
  req.end();
}
