const https = require('https');

console.log('Testing contact form API...');

const testData = {
  firstName: "Test",
  lastName: "User", 
  email: "testuser@example.com",
  subject: "Test Message from Contact Form",
  message: "This is a test message sent from the contact form to verify email delivery.",
  newsletter: false
};

const data = JSON.stringify(testData);

const options = {
  hostname: 'ai-mockprep-stable.vercel.app',
  port: 443,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('Sending request to:', `https://${options.hostname}${options.path}`);
console.log('Request data:', testData);

const req = https.request(options, (res) => {
  console.log(`\n✅ Response Status: ${res.statusCode}`);
  console.log(`📋 Response Headers:`, res.headers);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('\n📨 Response Body:');
    try {
      const parsed = JSON.parse(body);
      console.log(JSON.stringify(parsed, null, 2));
      
      if (parsed.success && parsed.messageId) {
        console.log('\n🎉 SUCCESS! Email should be delivered to localghost678@gmail.com');
        console.log(`📧 Message ID: ${parsed.messageId}`);
      } else {
        console.log('\n❌ FAILED! Check the error message above.');
      }
    } catch (e) {
      console.log('Raw response:', body);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error);
});

req.write(data);
req.end();
