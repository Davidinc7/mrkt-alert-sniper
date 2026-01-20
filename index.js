// index.js
console.log('[SNIPER] service started');

// Railway o‘chirmasligi uchun kichik server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('[SNIPER] listening on port', PORT);
});

