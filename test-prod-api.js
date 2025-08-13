const https = require('https');

const data = JSON.stringify({
  firstName: "Debug",
  lastName: "Test",
  email: "test@example.com", 
  subject: "Debug Test",
  message: "Testing debug functionality"
});

const options = {
  hostname: 'interview-ai-agent-luxx6fe3u-nikhilprataps66-gmailcoms-projects.vercel.app',
  port: 443,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('Response body:', body);
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.write(data);
req.end();
