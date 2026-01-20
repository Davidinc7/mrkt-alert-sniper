const http = require('http');

const PORT = process.env.PORT || 3000;

console.log('BOOTING...');
console.log('PORT =', PORT);

const server = http.createServer((req, res) => {
  console.log('REQ:', req.method, req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ALIVE');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('SERVER LISTENING ON', PORT);
});

// MUHIM: process o‘chib ketmasligi uchun
setInterval(() => {
  console.log('HEARTBEAT', new Date().toISOString());
}, 10000);
