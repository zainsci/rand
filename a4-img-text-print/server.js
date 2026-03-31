const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3456;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading page');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n✦ Diary Grid is running!`);
  console.log(`  Open: ${url}\n`);

  // Auto-open browser
  const platform = process.platform;
  const cmd =
    platform === 'darwin' ? `open ${url}` :
    platform === 'win32' ? `start ${url}` :
    `xdg-open ${url}`;

  exec(cmd, (err) => {
    if (err) console.log(`  → Could not auto-open browser. Please visit ${url}`);
  });
});
