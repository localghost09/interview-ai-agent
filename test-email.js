// Simple email test script
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('🧪 Testing Gmail SMTP directly...');
  
  // You'll need to manually set these values
  const GMAIL_USER = 'localghost678@gmail.com';
  const GMAIL_APP_PASSWORD = 'sihg hcuv kcfk irsy'; // Replace with actual password
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
    debug: true,
    logger: true,
  });

  try {
    console.log('📧 Verifying connection...');
    await transporter.verify();
    console.log('✅ Connection verified!');
    
    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: `"Test Sender" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: '🧪 Direct Test Email',
      html: '<h1>Test Email</h1><p>This is a direct test of the email system.</p>',
      text: 'Test Email - This is a direct test of the email system.'
    });
    
    console.log('✅ Email sent successfully!');
    console.log('📧 Info:', info);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testEmail();
