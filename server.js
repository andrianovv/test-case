const http = require('http');
const pathUtils = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 9000;
const appDir = pathUtils.resolve(__dirname, 'dist');

app.use(express.static(appDir));

app.get('/**', (req, res) => {
  res.sendFile(pathUtils.resolve(appDir, 'index.html'));
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
