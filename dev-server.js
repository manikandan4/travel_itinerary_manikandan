const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Serve static files from current directory
app.use(express.static('.'));

// Proxy API and auth requests to backend
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  logLevel: 'debug'
}));

app.use('/auth', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  logLevel: 'debug'
}));

// Serve main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/langkawi', (req, res) => {
  res.sendFile(path.join(__dirname, 'langkawi.html'));
});

app.get('/langkawi.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'langkawi.html'));
});

// Handle SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend dev server running at http://localhost:${PORT}`);
  console.log(`📱 Main app: http://localhost:${PORT}`);
  console.log(`🔐 Login page: http://localhost:${PORT}/login`);
});
