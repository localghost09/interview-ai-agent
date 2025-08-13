import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  console.log('🚀 Contact API called - POST method');
  
  try {
    // First, verify that the user is authenticated
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      console.log('❌ User not authenticated');
      return NextResponse.json(
        { error: 'You must be signed in to send a message' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, email, subject, message, newsletter } = body;

    // Validate that the email matches the authenticated user's email
    if (email !== currentUser.email) {
      console.log('❌ Email mismatch - Form:', email, 'User:', currentUser.email);
      return NextResponse.json(
        { error: 'Email must match your registered account email' },
        { status: 403 }
      );
    }

    // Enhanced environment check with explicit logging
    const envCheck = {
      hasGmailUser: !!process.env.GMAIL_USER,
      hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
      gmailUser: process.env.GMAIL_USER,
      gmailPasswordLength: process.env.GMAIL_APP_PASSWORD ? process.env.GMAIL_APP_PASSWORD.length : 0,
      timestamp: new Date().toISOString(),
      authenticatedUser: currentUser.email
    };
    
    console.log('📋 Environment check:', envCheck);

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log submission details
    console.log('📝 Contact form submission:', {
      name: `${firstName} ${lastName}`,
      email,
      subject,
      messageLength: message.length,
      newsletter,
      timestamp: new Date().toISOString(),
    });

    // Send email using Gmail SMTP (if configured)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      console.log('✅ Environment variables found, attempting email send...');
      
      try {
        console.log('Attempting to send email...');
        
        // Create transporter with enhanced debugging
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
          debug: true,
          logger: true,
          tls: {
            rejectUnauthorized: false
          }
        });

        console.log('📧 Verifying SMTP connection...');
        // Test connection first
        try {
          await transporter.verify();
          console.log('✅ SMTP connection verified successfully');
        } catch (verifyError) {
          console.error('❌ SMTP verification failed:', verifyError);
          throw new Error(`SMTP verification failed: ${verifyError instanceof Error ? verifyError.message : 'Unknown error'}`);
        }

        // Enhanced email content
        const mailOptions = {
          from: `"AI MockPrep Contact" <${process.env.GMAIL_USER}>`,
          to: 'localghost678@gmail.com',
          subject: `[AI MockPrep Contact] ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
                🔔 New Contact Form Submission
              </h2>
              
              <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
                <h4 style="color: #28a745; margin: 0 0 10px 0;">✅ Verified User</h4>
                <p style="margin: 0; font-size: 14px; color: #155724;">
                  This message was sent by an authenticated user with verified email address.
                </p>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #4F46E5; margin-top: 0;">Contact Information</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Newsletter:</strong> ${newsletter ? 'Yes' : 'No'}</p>
                <p><strong>User ID:</strong> ${currentUser.uid}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h3 style="color: #333; margin-top: 0;">Message</h3>
                <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #f0f4ff; border-radius: 8px;">
                <p style="margin: 0; font-size: 12px; color: #666;">
                  📧 This message was sent from the AI MockPrep contact form by a verified user.<br>
                  Reply directly to this email to respond to ${firstName}.<br>
                  🔒 User authentication verified: ${currentUser.email}
                </p>
              </div>
            </div>
          `,
          text: `
🔔 NEW CONTACT FORM SUBMISSION

✅ VERIFIED USER - Email authentication confirmed

Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}
Newsletter: ${newsletter ? 'Yes' : 'No'}
User ID: ${currentUser.uid}
Time: ${new Date().toLocaleString()}

MESSAGE:
${message}

---
Sent from AI MockPrep Contact Form
User authentication verified: ${currentUser.email}
          `,
          replyTo: email,
        };

        console.log('📤 Attempting to send email with config:', {
          from: mailOptions.from,
          to: mailOptions.to,
          subject: mailOptions.subject,
          replyTo: mailOptions.replyTo,
          timestamp: new Date().toISOString()
        });

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully!');
        console.log('📧 Email delivery info:', {
          messageId: info.messageId,
          response: info.response,
          accepted: info.accepted,
          rejected: info.rejected,
          pending: info.pending,
          envelope: info.envelope
        });
        
        return NextResponse.json(
          { 
            success: true, 
            message: 'Message sent successfully! We\'ll get back to you soon.',
            emailSent: true,
            messageId: info.messageId,
            debug: {
              accepted: info.accepted,
              rejected: info.rejected,
              environment: {
                hasGmailUser: !!process.env.GMAIL_USER,
                hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD
              }
            }
          },
          { status: 200 }
        );
        
      } catch (emailError: unknown) {
        console.error('❌ Email sending error:', emailError);
        
        const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
        const errorStack = emailError instanceof Error ? emailError.stack : undefined;
        
        console.log('📧 Email error details:', {
          error: errorMessage,
          stack: errorStack,
          environment: {
            hasGmailUser: !!process.env.GMAIL_USER,
            hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
            gmailUser: process.env.GMAIL_USER
          }
        });
        
        // Return error details for debugging
        return NextResponse.json(
          { 
            success: false, 
            message: 'Email sending failed',
            emailSent: false,
            error: errorMessage,
            debug: {
              environment: {
                hasGmailUser: !!process.env.GMAIL_USER,
                hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD
              }
            }
          },
          { status: 500 }
        );
      }
    } else {
      console.log('❌ Missing environment variables');
      console.log('Environment status:', {
        GMAIL_USER: process.env.GMAIL_USER ? 'Set' : 'Missing',
        GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Missing'
      });
      
      // Return environment error
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email configuration missing',
          emailSent: false,
          error: 'Environment variables not configured',
          debug: {
            environment: {
              hasGmailUser: !!process.env.GMAIL_USER,
              hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD
            }
          }
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Add GET method for testing
export async function GET() {
  console.log('🧪 Contact API test - GET method');
  
  return NextResponse.json({
    status: 'Contact API is working',
    timestamp: new Date().toISOString(),
    environment: {
      GMAIL_USER: process.env.GMAIL_USER || 'Not set',
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? 'Set (hidden)' : 'Not set'
    }
  });
}
