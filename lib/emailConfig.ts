import { ActionCodeSettings } from 'firebase/auth';

// Get the base URL for email configurations
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // Use stable Vercel alias URL
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-mockprep-stable.vercel.app';
  }
  return 'http://localhost:3000';
};

// Email verification configuration
export const emailVerificationConfig: ActionCodeSettings = {
  // The URL to redirect to after email verification
  url: `${getBaseUrl()}/verify-email`,
  
  // This must be true for email verification
  handleCodeInApp: true,
  
  // Optional: iOS app bundle ID
  // iOS: {
  //   bundleId: 'com.example.aimockprep'
  // },
  
  // Optional: Android app package name
  // android: {
  //   packageName: 'com.example.aimockprep',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  
  // Optional: Dynamic links
  // dynamicLinkDomain: 'example.page.link'
};

// Email templates configuration (for Firebase console)
export const emailTemplateConfig = {
  verificationEmailSubject: 'Verify your email for AI MockPrep',
  verificationEmailBody: `
    Welcome to AI MockPrep!
    
    Please click the link below to verify your email address and activate your account:
    
    %LINK%
    
    If you didn't create an account with AI MockPrep, you can ignore this email.
    
    Thanks,
    The AI MockPrep Team
  `,
  
  passwordResetSubject: 'Reset your AI MockPrep password',
  passwordResetBody: `
    Hi there,
    
    You requested to reset your password for AI MockPrep. Click the link below to reset it:
    
    %LINK%
    
    If you didn't request this, you can ignore this email.
    
    Thanks,
    The AI MockPrep Team
  `
};
