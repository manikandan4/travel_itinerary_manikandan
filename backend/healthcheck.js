// Simple health check for Docker
const http = require('http');

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 3001,
  path: '/health',
  method: 'GET',
  timeout: 3000
};

const healthCheck = http.request(options, (res) => {
  console.log(`HEALTH CHECK STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

healthCheck.on('error', (err) => {
  console.error('HEALTH CHECK ERROR:', err.message);
  process.exit(1);
});

healthCheck.on('timeout', () => {
  console.error('HEALTH CHECK TIMEOUT');
  healthCheck.destroy();
  process.exit(1);
});

healthCheck.end();
